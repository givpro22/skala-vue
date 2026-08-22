<script setup>
const props = defineProps({
  cityName: String,
  areaId: [String, Number],
  temperature: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    default: '맑음',
  },
  isActive: {
    type: Boolean,
    default: false,
  },
  weeklyForecast: {
    type: Array,
    // 배열과 객체의 기본값은 함수 형태로 반환해야 한다
    default: () => [],
  },
  coordinates: {
    type: Object,
    default: () => ({ lat: 37.5, lng: 126.9 }),
  },
  score: {
    type: Number,
    validator(value) {
      return value >= 0 && value <= 100
    },
  },
})

const checkPopularity = () => {
  console.log(`${props.cityName} 점수: ${props.score}`)
}
</script>

<template>
  <div class="props-card">
    <h3>{{ cityName }} (지역코드 {{ areaId }})</h3>
    <p>기온 {{ temperature }}°C, {{ status }}</p>
    <p>활성 여부: {{ isActive }}</p>
    <p>주간 예보: {{ weeklyForecast.join(', ') }}</p>
    <p>좌표: {{ coordinates.lat }}, {{ coordinates.lng }}</p>
    <button @click="checkPopularity">점수 콘솔 출력</button>
  </div>
</template>

<style scoped>
.props-card {
  margin-top: 10px;
  padding: 12px;
  border: 1px solid var(--color-border);
  border-radius: 6px;
}
</style>
