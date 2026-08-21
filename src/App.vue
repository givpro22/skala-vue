<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const menus = [
  { path: '/', label: '메인홈' },
  { path: '/lessons', label: '실습 아카이브' },
  { path: '/lessons/final', label: '최종본' },
  { path: '/troubleshooting', label: '트러블슈팅' },
]

const route = useRoute()

// router-link-active는 현재 라우트의 matched에 그 링크의 레코드가 있는지를 본다.
// 아카이브 안쪽 화면은 /lessons와 형제 라우트라 안에 들어가면 색인이 전부 꺼진다.
// 주소를 직접 보되 구간 단위로 끊어 비교하고, 걸리는 것 중 가장 긴 하나만 켠다.
// 그냥 앞부분만 보면 모든 주소에 걸리는 /가 항상 켜지고 /lessonsfoo 같은 것도 걸린다
const activePath = computed(() => {
  let active = ''
  for (const menu of menus) {
    const hit = route.path === menu.path || route.path.startsWith(`${menu.path}/`)
    if (hit && menu.path.length > active.length) {
      active = menu.path
    }
  }
  return active
})
</script>

<template>
  <div class="app-shell">
    <nav class="main-nav">
      <router-link
        v-for="menu in menus"
        :key="menu.path"
        :to="menu.path"
        :class="{ current: menu.path === activePath }"
      >
        {{ menu.label }}
      </router-link>
    </nav>

    <router-view />
  </div>
</template>

<style scoped>
.app-shell {
  padding: 20px;
}

.main-nav {
  display: flex;
  flex-wrap: wrap;
  gap: 18px;
  margin-bottom: 20px;
  padding-bottom: 12px;
  border-bottom: 1px solid #ddd;
}

.main-nav a {
  color: #555;
  text-decoration: none;
}

.main-nav a.current {
  color: #42b883;
  font-weight: bold;
}
</style>
