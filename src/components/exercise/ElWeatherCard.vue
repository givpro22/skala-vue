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

const toDisplay = (celsius) =>
  configStore.unit === 'fahrenheit' ? Math.round((celsius * 9) / 5 + 32) : celsius

const displayTemp = computed(() => toDisplay(props.cityItem.temp))
// 체감도 섭씨로 들어온다. 기호만 갈아 끼우면 24가 24℉로 나가서 기온과 앞뒤가 안 맞는다
const displayFeelsLike = computed(() => toDisplay(props.cityItem.feelsLike))
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

    <figure v-if="cityItem.photo" class="card-photo">
      <img :src="cityItem.photo" :alt="`${cityItem.name} ${cityItem.place}`" loading="lazy" />
      <figcaption>{{ cityItem.place }}</figcaption>
    </figure>

    <p class="temp">{{ displayTemp }}{{ configStore.unitSymbol }}</p>

    <el-descriptions :column="1" size="small" border>
      <el-descriptions-item label="체감">
        {{ displayFeelsLike }}{{ configStore.unitSymbol }}
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

.card-photo {
  position: relative;
  margin: 0 0 12px;
  overflow: hidden;
  border-radius: 8px;
  aspect-ratio: 16 / 9;
}

.card-photo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.card-photo figcaption {
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  padding: 12px 10px 6px;
  background: linear-gradient(
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 0.4) 45%,
    rgba(0, 0, 0, 0.85) 100%
  );
  color: #fff;
  /* 밝은 사진 위에서는 그라데이션만으로 흰 글씨가 묻힌다 */
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.8);
  font-size: 12px;
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
