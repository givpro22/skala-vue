<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()
</script>

<template>
  <div class="not-found-view">
    <h1>404</h1>
    <p>"{{ route.path }}" 경로에 연결된 페이지가 없습니다.</p>
    <router-link to="/">실습 모음으로</router-link>
  </div>
</template>

<style scoped>
.not-found-view {
  padding: 40px 0;
}

.not-found-view a {
  color: #42b883;
}
</style>
