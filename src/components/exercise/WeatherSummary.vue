<script setup>
defineProps({
  query: {
    type: String,
    default: '',
  },
  visibleCount: {
    type: Number,
    required: true,
  },
  averageTemp: {
    type: Number,
    required: true,
  },
  favoriteCount: {
    type: Number,
    required: true,
  },
  unitSymbol: {
    type: String,
    default: '°C',
  },
})
</script>

<template>
  <ul class="summary">
    <li>검색어: {{ query === '' ? '없음 (전체 표시)' : query }}</li>
    <li>표시 중인 도시: {{ visibleCount }}곳</li>
    <li>평균 기온: {{ averageTemp }}{{ unitSymbol }}</li>
    <li>즐겨찾기: {{ favoriteCount }}곳</li>
  </ul>
</template>

<style scoped>
.summary {
  margin: 0 0 16px;
  padding-left: 18px;
  font-size: 14px;
  color: #555;
}
</style>
