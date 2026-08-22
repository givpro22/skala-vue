<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import WeatherSubNav from '../../../../components/exercise/WeatherSubNav.vue'
import UnitToggler from '../../../../components/exercise/UnitToggler.vue'
import BaseDashboardCard from '../../../../components/exercise/BaseDashboardCard.vue'
import SearchBar from '../../../../components/exercise/SearchBar.vue'
import UnitWeatherCard from '../../../../components/exercise/UnitWeatherCard.vue'
import WeatherSummary from '../../../../components/exercise/WeatherSummary.vue'
import { useLiveWeatherStore } from '../../../../stores/liveWeatherStore.js'
import { useConfigStore } from '../../../../stores/configStore.js'

const router = useRouter()
const live = useLiveWeatherStore()
const configStore = useConfigStore()

const {
  searchQuery,
  hotOnly,
  selectedCityId,
  selectedCityInfo,
  filteredList,
  favoriteCount,
  averageTemp,
  isLoading,
  errorMessage,
  loadedAt,
} = storeToRefs(live)

onMounted(() => {
  if (live.cityList.length === 0) {
    live.loadAll()
  }
})

const goDetail = (city) => {
  router.push(`/lessons/day4/exercise-6/weather/${city.id}`)
}
</script>

<template>
  <div class="weather-home-view">
    <h1>⛅ 과제 6: 날씨 (실시간 데이터)</h1>
    <hr />

    <WeatherSubNav base-path="/lessons/day4/exercise-6">
      <UnitToggler />
    </WeatherSubNav>

    <BaseDashboardCard title="도시 검색">
      <SearchBar
        :query="searchQuery"
        :hot-only="hotOnly"
        @update-query="live.setQuery"
        @toggle-hot="live.toggleHot"
      />
      <div class="reload-row">
        <button :disabled="isLoading" @click="live.loadAll()">
          {{ isLoading ? '불러오는 중...' : '다시 불러오기' }}
        </button>
        <span v-if="loadedAt" class="loaded-at">{{ loadedAt }} 기준</span>
      </div>
    </BaseDashboardCard>

    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>

    <WeatherSummary
      :query="searchQuery"
      :visible-count="filteredList.length"
      :average-temp="
        configStore.unit === 'fahrenheit'
          ? Math.round((averageTemp * 9) / 5 + 32)
          : averageTemp
      "
      :unit-symbol="configStore.unitSymbol"
      :favorite-count="favoriteCount"
    />

    <BaseDashboardCard title="지역별 날씨 현황">
      <p v-if="isLoading" class="empty">OpenWeatherMap에서 여섯 도시를 불러오는 중이다.</p>

      <p v-else-if="filteredList.length === 0" class="empty">
        검색 결과와 일치하는 도시가 없습니다.
      </p>

      <div v-else class="card-list">
        <UnitWeatherCard
          v-for="city in filteredList"
          :key="city.id"
          :city-item="city"
          :selected="selectedCityId === city.id"
          @select-card="live.selectCity"
          @click-detail="goDetail"
          @toggle-favorite="live.toggleFavorite"
        />
      </div>
    </BaseDashboardCard>

    <div class="status-bar">{{ selectedCityInfo }}</div>
  </div>
</template>

<style scoped>
.weather-home-view {
  margin-bottom: 40px;
}

.reload-row {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 10px;
}

.reload-row button {
  padding: 5px 12px;
  cursor: pointer;
}

.loaded-at {
  font-size: 13px;
  color: var(--color-text-muted);
}

.card-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 12px;
}

.empty {
  padding: 20px;
  color: var(--color-text-muted);
  text-align: center;
}

.error {
  color: var(--color-danger);
}

.status-bar {
  margin-top: 16px;
  padding: 10px;
  border-radius: 6px;
  background-color: #333;
  color: white;
}
</style>
