<script setup>
import { watch } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import BaseDashboardCard from '../../components/exercise/BaseDashboardCard.vue'
import SearchBar from '../../components/exercise/SearchBar.vue'
import WeatherCard from '../../components/exercise/WeatherCard.vue'
import WeatherSummary from '../../components/exercise/WeatherSummary.vue'
import StoreStatusBar from '../../components/exercise/StoreStatusBar.vue'
import { useWeatherStore } from '../../stores/weatherStore.js'

const router = useRouter()
const weather = useWeatherStore()

// 화면에서 쓸 state와 getter는 storeToRefs로 꺼내야 반응성이 살아 있다
const { searchQuery, hotOnly, selectedCityId, filteredList, favoriteCount, averageTemp } =
  storeToRefs(weather)

watch(favoriteCount, (newCount, oldCount) => {
  console.log(`[즐겨찾기] ${oldCount}개에서 ${newCount}개로 변경`)
})

const goDetail = (city) => {
  router.push(`/exercise/5/${city.id}`)
}
</script>

<template>
  <div class="exercise5-view">
    <h1>⛅ 과제 5: 날씨 (Pinia)</h1>
    <hr />

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
      :average-temp="averageTemp"
      :favorite-count="favoriteCount"
    />

    <BaseDashboardCard title="날씨 현황">
      <p v-if="filteredList.length === 0" class="empty">검색 결과와 일치하는 도시가 없습니다.</p>

      <div v-else class="card-list">
        <WeatherCard
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
.exercise5-view {
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
