<script setup>
import { ref, provide } from 'vue'
import ProvideMiddle from './ProvideMiddle.vue'

const themeColor = ref('dark-mode')

provide('globalTheme', themeColor)

const toggleTheme = () => {
  themeColor.value = themeColor.value === 'dark-mode' ? 'light-mode' : 'dark-mode'
}
</script>

<template>
  <div class="practice-section">
    <h2>Provide &amp; Inject</h2>

    <p>props로 넘기면 중간 컴포넌트가 쓰지도 않는 값을 계속 받아 넘겨야 한다. provide는 그 단계를 건너뛴다.</p>

    <h3>최상위 컴포넌트 (GrandParent)</h3>
    <button @click="toggleTheme">테마 전환</button>

    <ProvideMiddle />
  </div>
</template>
