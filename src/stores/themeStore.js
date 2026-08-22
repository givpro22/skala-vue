import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

const STORAGE_KEY = 'skala-theme'
const MODES = ['system', 'light', 'dark']

export const useThemeStore = defineStore('theme', () => {
  const darkQuery = window.matchMedia('(prefers-color-scheme: dark)')

  const mode = ref(localStorage.getItem(STORAGE_KEY) || 'system')
  // 크롬 설정이 도중에 바뀌어도 따라가려면 미디어 쿼리 결과를 상태로 들고 있어야 한다
  const systemDark = ref(darkQuery.matches)

  const isDark = computed(() =>
    mode.value === 'system' ? systemDark.value : mode.value === 'dark',
  )

  const apply = () => {
    const root = document.documentElement
    if (mode.value === 'system') {
      root.removeAttribute('data-theme')
    } else {
      root.setAttribute('data-theme', mode.value)
    }
    // Element Plus는 자기 변수를 html.dark에서 찾는다
    root.classList.toggle('dark', isDark.value)
  }

  const setMode = (next) => {
    mode.value = next
    localStorage.setItem(STORAGE_KEY, next)
    apply()
  }

  const start = () => {
    darkQuery.addEventListener('change', (event) => {
      systemDark.value = event.matches
      apply()
    })
    apply()
  }

  return { mode, isDark, modes: MODES, setMode, start }
})
