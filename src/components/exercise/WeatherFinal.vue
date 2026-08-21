<script setup>
import { computed, watch, watchEffect } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import BaseDashboardCard from './BaseDashboardCard.vue'
import SearchBar from './SearchBar.vue'
import UnitWeatherCard from './UnitWeatherCard.vue'
import WeatherSummary from './WeatherSummary.vue'
import { useFinalWeatherStore } from '../../stores/finalWeatherStore.js'
import { useConfigStore } from '../../stores/configStore.js'

const router = useRouter()
const weather = useFinalWeatherStore()
const configStore = useConfigStore()

// state와 getter를 구조분해할 때는 storeToRefs를 거쳐야 반응성이 끊기지 않는다
const {
  searchQuery,
  hotOnly,
  selectedCityId,
  selectedCityInfo,
  filteredList,
  favoriteCount,
  averageTemp,
} = storeToRefs(weather)

watch(selectedCityInfo, (newInfo, oldInfo) => {
  console.log(`[선택 변경] ${oldInfo} -> ${newInfo}`)
})

watch(favoriteCount, (newCount, oldCount) => {
  console.log(`[즐겨찾기] ${oldCount}개에서 ${newCount}개로 변경`)
})

watchEffect(() => {
  console.log(`[검색어 추적] 현재 입력값: "${searchQuery.value}"`)
})

const displayAverage = computed(() =>
  configStore.unit === 'fahrenheit'
    ? Math.round((averageTemp.value * 9) / 5 + 32)
    : averageTemp.value,
)

const goDetail = (city) => {
  router.push(`/weather/${city.id}`)
}
</script>

<template>
  <div class="weather-final">
    <BaseDashboardCard title="도시 검색">
      <SearchBar
        :query="searchQuery"
        :hot-only="hotOnly"
        @update-query="weather.setQuery"
        @toggle-hot="weather.toggleHot"
      />
    </BaseDashboardCard>

    <WeatherSummary
      :query="searchQuery"
      :visible-count="filteredList.length"
      :average-temp="displayAverage"
      :unit-symbol="configStore.unitSymbol"
      :favorite-count="favoriteCount"
    />

    <BaseDashboardCard title="날씨 현황">
      <p v-if="filteredList.length === 0" class="empty">검색 결과와 일치하는 도시가 없습니다.</p>

      <div v-else class="card-list">
        <UnitWeatherCard
          v-for="city in filteredList"
          :key="city.id"
          :city-item="city"
          :selected="selectedCityId === city.id"
          @select-card="weather.selectCity"
          @click-detail="goDetail"
          @toggle-favorite="weather.toggleFavorite"
        />
      </div>
    </BaseDashboardCard>

    <div class="status-bar">{{ selectedCityInfo }}</div>
  </div>
</template>

<style scoped>
.weather-final {
  margin-bottom: 40px;
}

.card-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 12px;
}

.empty {
  padding: 20px;
  color: #888;
  text-align: center;
}

.status-bar {
  margin-top: 16px;
  padding: 10px;
  border-radius: 6px;
  background-color: #333;
  color: white;
}
</style>
