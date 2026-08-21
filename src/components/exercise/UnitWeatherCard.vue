<script setup>
import { computed } from 'vue'
import { useConfigStore } from '../../stores/configStore.js'

const props = defineProps({
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

const configStore = useConfigStore()

// 원본 데이터는 섭씨 숫자다. 화씨 설정일 때만 변환해서 보여준다
const displayTemp = computed(() => {
  const rawTemp = props.cityItem.temp
  if (configStore.unit === 'fahrenheit') {
    return Math.round((rawTemp * 9) / 5 + 32)
  }
  return rawTemp
})
</script>

<template>
  <div class="weather-card" :class="{ selected }" @click="emit('select-card', cityItem)">
    <div class="card-head">
      <h3>{{ cityItem.name }} ({{ cityItem.status }})</h3>
      <button class="favorite" @click.stop="emit('toggle-favorite', cityItem)">
        {{ cityItem.favorite ? '★' : '☆' }}
      </button>
    </div>

    <p class="temp">현재 기온: {{ displayTemp }}{{ configStore.unitSymbol }}</p>

    <p v-if="cityItem.temp >= 25" class="label hot">🔥 더움 (25도 이상)</p>
    <p v-else class="label cool">❄️ 선선함 (25도 미만)</p>

    <ul class="detail">
      <li>습도 {{ cityItem.humidity }}%</li>
      <li>풍속 {{ cityItem.wind }}m/s</li>
    </ul>

    <button class="detail-button" @click.stop="emit('click-detail', cityItem)">상세보기</button>
  </div>
</template>

<style scoped>
.weather-card {
  padding: 14px;
  border: 1px solid #ccc;
  border-radius: 8px;
  cursor: pointer;
}

.weather-card.selected {
  border-color: #42b883;
  background-color: #f2fbf7;
}

.card-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.card-head h3 {
  margin: 0;
  font-size: 16px;
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
  color: #d63031;
}

.label.cool {
  color: #0984e3;
}

.detail {
  margin: 0 0 10px;
  padding-left: 18px;
  font-size: 14px;
  color: #555;
}
</style>
