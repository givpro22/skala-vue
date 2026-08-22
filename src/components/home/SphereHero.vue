<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import * as THREE from 'three'
import { heroCities } from '../../data/heroCities.js'
import { useFinalWeatherStore } from '../../stores/finalWeatherStore.js'
import { useConfigStore } from '../../stores/configStore.js'

const GOLDEN_ANGLE = Math.PI * (3 - Math.sqrt(5))
const CARD_COUNT = heroCities.length
const INTRO_COUNT = 10
const SPHERE_RADIUS = 4.6
const CARD_SIZE = 1.7
const LABEL_BASE_PX = 120
const AUTO_SPIN = 0.00018
const INTRO_MS = 1000
const COLLAPSE_MS = 700
const EXPAND_MS = 900
const DRAG_SENSITIVITY = 0.007
// 좌우는 끝없이 돌아서 미끄러져도 티가 안 나는데 세로는 69도에서 벽에 닿는다.
// 같은 감쇠를 쓰면 가벼운 손짓 하나로 한계까지 붙어 버려서 세로만 빨리 잦아들게 한다
const SPIN_DECAY_MS = 220
const PITCH_DECAY_MS = 70
// 세로로 기울일 수 있는 한계. 90도가 극을 정면으로 보는 각도인데, 거기까지 가면
// 자전축이 화면 쪽을 향해 카드가 팔랑개비처럼 돌고 어느 쪽이 위인지 사라진다.
// 69도에서 끊으면 구의 위아래 카드는 다 보이면서 위쪽이 위로 남는다
const MAX_TILT = 1.2
const SWAY = 0.12
// 이만큼 넘게 끌었으면 카드를 고른 것이 아니라 구를 돌린 것으로 본다
const CLICK_SLOP = 5

const router = useRouter()
const store = useFinalWeatherStore()
const configStore = useConfigStore()

// 카드 좌표는 Three.js 객체가 들고 있다. 반응성에 태우는 것은 단계와 커서 모양뿐이다
const phase = ref('intro')
const grabbing = ref(false)
const stageEl = ref(null)
const canvasEl = ref(null)

let renderer = null
let scene = null
let camera = null
let group = null
let rafId = 0
let startedAt = 0
let lastFrameAt = 0
let viewWidth = 0
let viewHeight = 0
let hoveredIndex = -1

let dragging = false
let pressedIndex = -1
let downX = 0
let downY = 0
let lastX = 0
let lastY = 0
let pendingYaw = 0
let pendingPitch = 0
let spinYaw = 0
let spinPitch = 0
let tilt = 0

const sprites = []
const introPoints = []
const spherePoints = []
const labelEls = []
const hoverAmount = []

// 루프 안에서 만들면 초당 수백 개가 쌓인다. 밖에서 하나씩 만들어 돌려 쓴다
const worldPos = new THREE.Vector3()
const projected = new THREE.Vector3()

const clamp01 = (value) => Math.min(Math.max(value, 0), 1)
const easeOut = (t) => 1 - Math.pow(1 - t, 3)

// 카드 이름표는 °만 붙일 만큼 좁아서 기호로는 단위를 못 밝힌다. 대신 숫자를 단위에 맞춰
// 바꿔 둔다. 아래 요약 줄이 ℃와 ℉를 달고 나오므로 어느 단위인지는 거기서 읽힌다
const tempOf = (cityId) => {
  const celsius = store.tempByCity[cityId]
  if (celsius === undefined) {
    return undefined
  }
  return configStore.unit === 'fahrenheit' ? Math.round((celsius * 9) / 5 + 32) : celsius
}

const setLabelEl = (el, index) => {
  labelEls[index] = el
}

const halfFovTangent = () => Math.tan((camera.fov * Math.PI) / 180 / 2)

// 세로가 좁든 가로가 좁든 구 전체가 들어오는 거리를 잡는다
const fitDistance = () => {
  const t = halfFovTangent()
  return Math.max(SPHERE_RADIUS / t, SPHERE_RADIUS / (t * camera.aspect)) * 1.3
}

const buildSpherePoints = () => {
  for (let i = 0; i < CARD_COUNT; i += 1) {
    const y = 1 - (i / (CARD_COUNT - 1)) * 2
    const r = Math.sqrt(1 - y * y)
    const theta = GOLDEN_ANGLE * i
    spherePoints.push(
      new THREE.Vector3(
        Math.cos(theta) * r * SPHERE_RADIUS,
        y * SPHERE_RADIUS,
        Math.sin(theta) * r * SPHERE_RADIUS,
      ),
    )
  }
}

// 인트로 링 반지름은 보이는 높이의 30%다. 창 크기가 바뀌면 다시 잡는다
const layoutIntroRing = () => {
  const radius = 2 * halfFovTangent() * camera.position.z * 0.3
  for (let i = 0; i < INTRO_COUNT; i += 1) {
    const angle = (i / INTRO_COUNT) * Math.PI * 2
    introPoints[i].set(Math.cos(angle) * radius, Math.sin(angle) * radius, 0)
  }
}

// 카드는 정사각인데 사진은 가로세로가 제각각이다. 그냥 붙이면 늘어나 보여서
// 긴 쪽을 잘라 내고 가운데 정사각만 쓴다
const cropToSquare = (texture) => {
  const { width, height } = texture.image
  if (width > height) {
    texture.repeat.set(height / width, 1)
    texture.offset.set((1 - height / width) / 2, 0)
  } else {
    texture.repeat.set(1, width / height)
    texture.offset.set(0, (1 - width / height) / 2)
  }
}

const loadSprites = () => {
  const loader = new THREE.TextureLoader()
  heroCities.forEach((city) => {
    // 실패를 넘기면 카드가 빈 채로 남는데 콘솔은 깨끗해서 원인을 못 찾는다.
    // 위키미디어가 허용하지 않는 썸네일 폭을 쓰다 400을 받았을 때 이걸로 걸렀다
    const texture = loader.load(city.photo, cropToSquare, undefined, () => {
      console.error('도시 사진 로드 실패:', city.name, city.photo)
    })
    // 지정하지 않으면 사진이 뿌옇게 나온다
    texture.colorSpace = THREE.SRGBColorSpace
    const sprite = new THREE.Sprite(
      new THREE.SpriteMaterial({ map: texture, transparent: true, opacity: 0 }),
    )
    sprite.scale.set(CARD_SIZE, CARD_SIZE, 1)
    group.add(sprite)
    sprites.push(sprite)
    hoverAmount.push(0)
  })
}

const initScene = () => {
  viewWidth = stageEl.value.clientWidth
  viewHeight = stageEl.value.clientHeight

  scene = new THREE.Scene()
  group = new THREE.Group()
  scene.add(group)

  camera = new THREE.PerspectiveCamera(45, viewWidth / viewHeight, 0.1, 200)
  camera.position.z = fitDistance()

  // alpha를 켜야 뒤에 깔린 배경이 비친다
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.setSize(viewWidth, viewHeight)
  canvasEl.value.appendChild(renderer.domElement)

  for (let i = 0; i < INTRO_COUNT; i += 1) {
    introPoints.push(new THREE.Vector3())
  }
  buildSpherePoints()
  layoutIntroRing()
  loadSprites()
}

const updatePhase = (elapsed) => {
  if (elapsed >= INTRO_MS + COLLAPSE_MS) {
    phase.value = 'sphere'
  } else if (elapsed >= INTRO_MS) {
    phase.value = 'collapse'
  }
}

const layoutSprites = (elapsed, spread) => {
  const introT = clamp01(elapsed / INTRO_MS)
  const collapseT = clamp01((elapsed - INTRO_MS) / COLLAPSE_MS)
  const collapseEase = collapseT * collapseT * collapseT

  for (let i = 0; i < CARD_COUNT; i += 1) {
    const sprite = sprites[i]
    hoverAmount[i] += ((i === hoveredIndex ? 1 : 0) - hoverAmount[i]) * 0.12

    if (spread > 0) {
      const to = spherePoints[i]
      sprite.position.set(to.x * spread, to.y * spread, to.z * spread)
      const size = CARD_SIZE * (0.25 + 0.75 * spread) * (1 + hoverAmount[i] * 0.3)
      sprite.scale.set(size, size, 1)
      continue
    }

    if (i >= INTRO_COUNT) {
      sprite.material.opacity = 0
      continue
    }

    const from = introPoints[i]
    const shrink = 1 - collapseEase
    sprite.position.set(from.x * shrink, from.y * shrink, 0)
    sprite.material.opacity = introT * (1 - collapseEase * 0.6)
    const size = CARD_SIZE * (0.35 + 0.65 * introT) * (1 - collapseEase * 0.75)
    sprite.scale.set(size, size, 1)
  }
}

const spinGroup = (delta, elapsed) => {
  if (dragging) {
    // 끈 만큼만 정확히 돌린다. 마지막 프레임 이동량이 그대로 놓았을 때의 관성이 된다
    spinYaw = pendingYaw
    spinPitch = pendingPitch
    pendingYaw = 0
    pendingPitch = 0
  } else {
    // 프레임 간격이 들쭉날쭉해도 잦아드는 속도가 같아야 한다
    spinYaw *= Math.exp(-delta / SPIN_DECAY_MS)
    spinPitch *= Math.exp(-delta / PITCH_DECAY_MS)
    group.rotation.y += AUTO_SPIN * delta
  }

  group.rotation.y += spinYaw

  const nextTilt = tilt + spinPitch
  tilt = Math.min(Math.max(nextTilt, -MAX_TILT), MAX_TILT)
  if (tilt !== nextTilt) {
    spinPitch = 0
  }

  // 사용자가 기울여 둔 각도가 우선이다. 기운 만큼 기본 흔들림을 접는다
  const swayWeight = 1 - Math.abs(tilt) / MAX_TILT
  group.rotation.x = Math.sin(elapsed * 0.0002) * SWAY * swayWeight + tilt
}

// 렌더가 끝난 뒤라야 회전이 반영된 월드 좌표를 읽을 수 있다
const paintDepth = (spread) => {
  const halfW = viewWidth / 2
  const halfH = viewHeight / 2
  const pxPerUnit = viewHeight / (2 * halfFovTangent())

  for (let i = 0; i < CARD_COUNT; i += 1) {
    const sprite = sprites[i]
    sprite.getWorldPosition(worldPos)

    const depth = (worldPos.z + SPHERE_RADIUS) / (SPHERE_RADIUS * 2)
    sprite.material.opacity = (0.25 + depth * 0.75) * spread

    const el = labelEls[i]
    if (!el) {
      continue
    }

    projected.copy(worldPos).project(camera)
    const x = (projected.x + 1) * halfW
    const y = (1 - projected.y) * halfH
    const px = (sprite.scale.x * pxPerUnit) / camera.position.distanceTo(worldPos)

    el.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%) scale(${px / LABEL_BASE_PX})`
    el.style.opacity = String(depth * depth * spread)
    el.style.zIndex = String(Math.round(depth * 100))
    el.style.pointerEvents = depth > 0.5 ? 'auto' : 'none'
  }
}

const animate = (now) => {
  rafId = requestAnimationFrame(animate)

  const delta = Math.min(now - lastFrameAt, 64)
  lastFrameAt = now
  const elapsed = now - startedAt
  const spread = easeOut(clamp01((elapsed - INTRO_MS - COLLAPSE_MS) / EXPAND_MS))

  updatePhase(elapsed)
  layoutSprites(elapsed, spread)
  if (spread > 0) {
    spinGroup(delta, elapsed)
  } else {
    // 인트로 도중에 끈 만큼을 쌓아 두면 구가 퍼지는 순간 그게 한꺼번에 튄다
    pendingYaw = 0
    pendingPitch = 0
  }
  renderer.render(scene, camera)
  if (spread > 0) {
    paintDepth(spread)
  }
}

const onResize = () => {
  viewWidth = stageEl.value.clientWidth
  viewHeight = stageEl.value.clientHeight
  camera.aspect = viewWidth / viewHeight
  camera.position.z = fitDistance()
  camera.updateProjectionMatrix()
  renderer.setSize(viewWidth, viewHeight)
  layoutIntroRing()
}

const goToCity = (cityId) => {
  router.push(`/lessons/final/weather/${cityId}`)
}

// 포인터를 붙잡으면 마우스 이벤트도 스테이지로 넘어와 카드의 click이 안 터진다.
// 그래서 누른 카드를 직접 기억해 두고 놓을 때 직접 보낸다
const cardIndexAt = (target) => {
  if (!(target instanceof Element)) {
    return -1
  }
  const card = target.closest('.city-card')
  return card === null ? -1 : labelEls.indexOf(card)
}

const onPointerDown = (event) => {
  stageEl.value.setPointerCapture(event.pointerId)
  dragging = true
  grabbing.value = true
  pressedIndex = cardIndexAt(event.target)
  downX = event.clientX
  downY = event.clientY
  lastX = event.clientX
  lastY = event.clientY
  pendingYaw = 0
  pendingPitch = 0
  spinYaw = 0
  spinPitch = 0
}

const onPointerMove = (event) => {
  if (!dragging) {
    return
  }
  pendingYaw += (event.clientX - lastX) * DRAG_SENSITIVITY
  pendingPitch += (event.clientY - lastY) * DRAG_SENSITIVITY
  lastX = event.clientX
  lastY = event.clientY
}

const endDrag = (event) => {
  if (!dragging) {
    return false
  }
  dragging = false
  grabbing.value = false
  if (stageEl.value.hasPointerCapture(event.pointerId)) {
    stageEl.value.releasePointerCapture(event.pointerId)
  }
  return true
}

const onPointerUp = (event) => {
  if (!endDrag(event)) {
    return
  }
  const moved = Math.hypot(event.clientX - downX, event.clientY - downY)
  if (moved <= CLICK_SLOP && pressedIndex >= 0) {
    goToCity(heroCities[pressedIndex].id)
  }
  pressedIndex = -1
}

const onPointerCancel = (event) => {
  endDrag(event)
  pressedIndex = -1
}

const onCardEnter = (index) => {
  hoveredIndex = index
}

const onCardLeave = () => {
  hoveredIndex = -1
}

onMounted(() => {
  store.loadStream()
  initScene()
  window.addEventListener('resize', onResize)
  startedAt = performance.now()
  lastFrameAt = startedAt
  rafId = requestAnimationFrame(animate)
})

onUnmounted(() => {
  cancelAnimationFrame(rafId)
  window.removeEventListener('resize', onResize)
  // 자바스크립트 객체를 버려도 GPU 쪽은 남는다. traverse로 훑어 하나씩 지운다
  scene.traverse((object) => {
    if (object.material) {
      if (object.material.map) {
        object.material.map.dispose()
      }
      object.material.dispose()
    }
    if (object.geometry) {
      object.geometry.dispose()
    }
  })
  renderer.dispose()
  renderer.domElement.remove()
})
</script>

<template>
  <div
    ref="stageEl"
    class="sphere-stage"
    :class="{ grabbing }"
    @pointerdown="onPointerDown"
    @pointermove="onPointerMove"
    @pointerup="onPointerUp"
    @pointercancel="onPointerCancel"
  >
    <div ref="canvasEl" class="sphere-canvas"></div>

    <div v-if="phase === 'sphere'" class="sphere-labels">
      <el-tooltip
        v-for="(city, index) in heroCities"
        :key="city.id"
        :content="`${city.name} ${city.place}`"
        :show-after="120"
        placement="top"
      >
        <div
          :ref="(el) => setLabelEl(el, index)"
          class="city-card"
          @mouseenter="onCardEnter(index)"
          @mouseleave="onCardLeave"
        >
          <span v-if="tempOf(city.id) !== undefined" class="city-temp">
            {{ tempOf(city.id) }}°
          </span>
          <el-skeleton v-else class="city-temp-loading" :rows="0" animated />
        </div>
      </el-tooltip>
    </div>
  </div>
</template>

<style scoped>
.sphere-stage {
  position: relative;
  width: 100%;
  height: min(72vh, 620px);
  min-height: 380px;
  overflow: hidden;
  border-radius: 16px;
  background: radial-gradient(
    circle at 50% 42%,
    var(--hero-sky-1) 0%,
    var(--hero-sky-2) 55%,
    var(--hero-sky-3) 100%
  );
  cursor: grab;
  /* 이걸 빼면 모바일에서 끄는 동작이 페이지 스크롤로 새어 나간다 */
  touch-action: none;
  user-select: none;
}

.sphere-stage.grabbing,
.sphere-stage.grabbing .city-card {
  cursor: grabbing;
}

.sphere-canvas {
  position: absolute;
  inset: 0;
}

.sphere-labels {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.city-card {
  position: absolute;
  top: 0;
  left: 0;
  width: 120px;
  height: 120px;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding-bottom: 6px;
  opacity: 0;
  cursor: pointer;
  will-change: transform;
}

/* 사진 위에 얹히는 이름표라 배경과 글자를 두 테마에서 같은 값으로 둔다 */
.city-temp {
  padding: 2px 10px;
  border-radius: 999px;
  background: rgba(16, 24, 34, 0.66);
  color: #fff;
  font-size: 15px;
  font-weight: 600;
  line-height: 1.5;
}

.city-temp-loading {
  width: 48px;
}

.city-temp-loading :deep(.el-skeleton__title) {
  height: 14px;
  margin: 0;
  border-radius: 999px;
}
</style>
