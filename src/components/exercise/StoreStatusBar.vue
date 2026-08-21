<script setup>
import { useWeatherStore } from '../../stores/weatherStore.js'

// 부모가 props로 내려 주지 않아도 store에서 직접 꺼내 쓴다
const weather = useWeatherStore()
</script>

<template>
  <div class="status-bar">{{ weather.selectedCityInfo }}</div>
</template>

<style scoped>
.status-bar {
  margin-top: 16px;
  padding: 10px;
  border-radius: 6px;
  background-color: #333;
  color: white;
}
</style>
