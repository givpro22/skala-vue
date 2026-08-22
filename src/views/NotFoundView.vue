<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

// 한글 주소가 퍼센트 인코딩된 채로 보이지 않게 되돌린다
const shownPath = computed(() => {
  try {
    return decodeURIComponent(route.path)
  } catch {
    return route.path
  }
})
</script>

<template>
  <div class="not-found-view">
    <h1>404</h1>
    <p>"{{ shownPath }}" 경로에 연결된 페이지가 없습니다.</p>
    <router-link to="/lessons">실습 아카이브로</router-link>
  </div>
</template>

<style scoped>
.not-found-view {
  padding: 40px 0;
}

.not-found-view a {
  color: var(--color-accent);
}
</style>
