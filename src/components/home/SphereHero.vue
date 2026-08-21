<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import * as THREE from 'three'
import { heroCities } from '../../data/heroCities.js'
import { useHeroWeatherStore } from '../../stores/heroWeatherStore.js'

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

const router = useRouter()
const store = useHeroWeatherStore()

// 카드 좌표는 Three.js 객체가 들고 있다. 반응성에 태우는 것은 단계뿐이다
const phase = ref('intro')
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
let spinScale = 1

const sprites = []
const introPoints = []
const spherePoints = []
const labelEls = []
const hoverAmount = []
const pointer = { x: 0, y: 0 }
const pointerTarget = { x: 0, y: 0 }

// 루프 안에서 만들면 초당 수백 개가 쌓인다. 밖에서 하나씩 만들어 돌려 쓴다
const worldPos = new THREE.Vector3()
const projected = new THREE.Vector3()

const clamp01 = (value) => Math.min(Math.max(value, 0), 1)
const easeOut = (t) => 1 - Math.pow(1 - t, 3)

const tempOf = (cityId) => store.tempByCity[cityId]

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

const loadSprites = () => {
  const loader = new THREE.TextureLoader()
  heroCities.forEach((city) => {
    const texture = loader.load(city.photo)
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
  pointer.x += (pointerTarget.x - pointer.x) * 0.05
  pointer.y += (pointerTarget.y - pointer.y) * 0.05
  // 카드를 잡고 있는 동안 계속 돌면 커서 밑에서 빠져나가 이름표와 클릭이 흔들린다
  spinScale += ((hoveredIndex < 0 ? 1 : 0.08) - spinScale) * 0.08
  group.rotation.y += (AUTO_SPIN + pointer.x * 0.0009) * spinScale * delta
  group.rotation.x = Math.sin(elapsed * 0.0002) * 0.12 - pointer.y * 0.45
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

// 마우스가 가운데면 목표가 0이라 저절로 자동 회전으로 돌아온다
const aimPointer = (clientX, clientY) => {
  pointerTarget.x = (clientX / window.innerWidth - 0.5) * 2
  pointerTarget.y = (clientY / window.innerHeight - 0.5) * 2
}

const onMouseMove = (event) => {
  aimPointer(event.clientX, event.clientY)
}

const onTouchMove = (event) => {
  aimPointer(event.touches[0].clientX, event.touches[0].clientY)
}

const onStageLeave = () => {
  pointerTarget.x = 0
  pointerTarget.y = 0
}

const onCardEnter = (index) => {
  hoveredIndex = index
}

const onCardLeave = () => {
  hoveredIndex = -1
}

const goToCity = (cityId) => {
  router.push(`/lessons/final/weather/${cityId}`)
}

onMounted(() => {
  store.loadTemps()
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
    @mousemove="onMouseMove"
    @mouseleave="onStageLeave"
    @touchmove.passive="onTouchMove"
  >
    <div ref="canvasEl" class="sphere-canvas"></div>

    <div v-if="phase === 'sphere'" class="sphere-labels">
      <el-tooltip
        v-for="(city, index) in heroCities"
        :key="city.id"
        :content="city.name"
        :show-after="120"
        placement="top"
      >
        <div
          :ref="(el) => setLabelEl(el, index)"
          class="city-card"
          @mouseenter="onCardEnter(index)"
          @mouseleave="onCardLeave"
          @click="goToCity(city.id)"
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
  background: radial-gradient(circle at 50% 42%, #f7f9fc 0%, #e9eef5 55%, #dde4ee 100%);
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
