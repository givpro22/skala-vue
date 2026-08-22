<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useThemeStore } from './stores/themeStore.js'

const menus = [
  { path: '/', label: '메인홈' },
  { path: '/lessons/final', label: '최종본' },
  { path: '/lessons', label: '실습 아카이브' },
  { path: '/troubleshooting', label: '트러블슈팅' },
]

const route = useRoute()
const theme = useThemeStore()

const themeLabels = { system: '시스템', light: '라이트', dark: '다크' }

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

      <div class="theme-switch" role="group" aria-label="화면 테마">
        <button
          v-for="option in theme.modes"
          :key="option"
          type="button"
          :class="{ on: option === theme.mode }"
          :aria-pressed="option === theme.mode"
          @click="theme.setMode(option)"
        >
          {{ themeLabels[option] }}
        </button>
      </div>
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
  align-items: center;
  flex-wrap: wrap;
  gap: 18px;
  margin-bottom: 20px;
  padding-bottom: 12px;
  border-bottom: 1px solid var(--color-border);
}

.main-nav a {
  color: var(--color-text-soft);
  text-decoration: none;
}

.main-nav a.current {
  color: var(--color-accent);
  font-weight: bold;
}

/* 색인과 같은 줄에 두되 오른쪽 끝으로 민다 */
.theme-switch {
  display: flex;
  margin-left: auto;
  border: 1px solid var(--color-border);
  border-radius: 6px;
  overflow: hidden;
}

.theme-switch button {
  padding: 4px 10px;
  border: 0;
  background: var(--color-surface);
  color: var(--color-text-muted);
  font-size: 12px;
  cursor: pointer;
}

.theme-switch button.on {
  background: var(--color-accent-soft);
  color: var(--color-accent);
  font-weight: bold;
}
</style>
