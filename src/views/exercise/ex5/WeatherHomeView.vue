<script setup>
import { useRouter } from 'vue-router'
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import WeatherSubNav from '../../../components/exercise/WeatherSubNav.vue'
import UnitToggler from '../../../components/exercise/UnitToggler.vue'
import BaseDashboardCard from '../../../components/exercise/BaseDashboardCard.vue'
import SearchBar from '../../../components/exercise/SearchBar.vue'
import UnitWeatherCard from '../../../components/exercise/UnitWeatherCard.vue'
import WeatherSummary from '../../../components/exercise/WeatherSummary.vue'
import StoreStatusBar from '../../../components/exercise/StoreStatusBar.vue'
import { useWeatherStore } from '../../../stores/weatherStore.js'
import { useConfigStore } from '../../../stores/configStore.js'

const router = useRouter()
const weather = useWeatherStore()
const configStore = useConfigStore()

const { searchQuery, hotOnly, selectedCityId, filteredList, favoriteCount, averageTemp } =
  storeToRefs(weather)

const displayAverage = computed(() =>
  configStore.unit === 'fahrenheit'
    ? Math.round((averageTemp.value * 9) / 5 + 32)
    : averageTemp.value,
)

const goDetail = (city) => {
  router.push(`/exercise/5/weather/${city.id}`)
}
</script>

<template>
  <div class="weather-home-view">
    <h1>⛅ 과제 5: 날씨 (스토어 적용)</h1>
    <hr />

    <WeatherSubNav base-path="/exercise/5">
      <UnitToggler />
    </WeatherSubNav>

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

    <BaseDashboardCard title="지역별 날씨 현황">
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

    <StoreStatusBar />
  </div>
</template>

<style scoped>
.weather-home-view {
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
</style>
