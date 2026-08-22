<script setup>
defineProps({
  cityItem: {
    type: Object,
    required: true,
  },
  selected: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['select-card', 'click-detail', 'toggle-favorite'])
</script>

<template>
  <div class="weather-card" :class="{ selected }" @click="emit('select-card', cityItem)">
    <div class="card-head">
      <h3>{{ cityItem.name }}</h3>
      <button class="favorite" @click.stop="emit('toggle-favorite', cityItem)">
        {{ cityItem.favorite ? '★' : '☆' }}
      </button>
    </div>

    <p class="temp">{{ cityItem.temp }}°C, {{ cityItem.status }}</p>

    <p v-if="cityItem.temp >= 25" class="label hot">🔥 더움 (25도 이상)</p>
    <p v-else class="label cool">❄️ 선선함 (25도 미만)</p>

    <ul class="detail">
      <li>체감온도 {{ cityItem.feelsLike }}°C</li>
      <li>습도 {{ cityItem.humidity }}%</li>
      <li>풍속 {{ cityItem.wind }}m/s</li>
    </ul>

    <button class="detail-button" @click.stop="emit('click-detail', cityItem)">상세보기</button>
  </div>
</template>

<style scoped>
.weather-card {
  padding: 14px;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  cursor: pointer;
}

.weather-card.selected {
  border-color: var(--color-accent);
  background-color: var(--color-accent-soft);
}

.card-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.card-head h3 {
  margin: 0;
}

.favorite {
  border: none;
  background: none;
  font-size: 18px;
  cursor: pointer;
}

.temp {
  font-size: 18px;
  font-weight: bold;
}

.label {
  margin: 6px 0;
}

.label.hot {
  color: var(--color-temp-hot);
}

.label.cool {
  color: var(--color-temp-cold);
}

.detail {
  margin: 0 0 10px;
  padding-left: 18px;
  font-size: 14px;
  color: var(--color-text-soft);
}
</style>
