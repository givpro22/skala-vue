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

const displayTemp = computed(() => {
  const rawTemp = props.cityItem.temp
  if (configStore.unit === 'fahrenheit') {
    return Math.round((rawTemp * 9) / 5 + 32)
  }
  return rawTemp
})
</script>

<template>
  <el-card
    :class="['el-weather-card', { selected }]"
    shadow="hover"
    @click="emit('select-card', cityItem)"
  >
    <template #header>
      <div class="card-head">
        <span class="city-name">{{ cityItem.name }}</span>
        <el-tag :type="cityItem.temp >= 25 ? 'danger' : 'primary'" size="small">
          {{ cityItem.status }}
        </el-tag>
      </div>
    </template>

    <p class="temp">{{ displayTemp }}{{ configStore.unitSymbol }}</p>

    <el-descriptions :column="1" size="small" border>
      <el-descriptions-item label="체감">
        {{ cityItem.feelsLike }}{{ configStore.unitSymbol }}
      </el-descriptions-item>
      <el-descriptions-item label="습도">{{ cityItem.humidity }}%</el-descriptions-item>
      <el-descriptions-item label="풍속">{{ cityItem.wind }}m/s</el-descriptions-item>
    </el-descriptions>

    <div class="card-foot">
      <el-button size="small" @click.stop="emit('click-detail', cityItem)">상세보기</el-button>
      <el-button
        size="small"
        :type="cityItem.favorite ? 'warning' : 'info'"
        plain
        @click.stop="emit('toggle-favorite', cityItem)"
      >
        {{ cityItem.favorite ? '즐겨찾기 해제' : '즐겨찾기' }}
      </el-button>
    </div>
  </el-card>
</template>

<style scoped>
.el-weather-card {
  cursor: pointer;
}

.el-weather-card.selected {
  border-color: var(--el-color-success);
}

.card-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.city-name {
  font-weight: bold;
}

.temp {
  margin: 0 0 10px;
  font-size: 26px;
  font-weight: bold;
}

.card-foot {
  display: flex;
  gap: 8px;
  margin-top: 12px;
}
</style>
