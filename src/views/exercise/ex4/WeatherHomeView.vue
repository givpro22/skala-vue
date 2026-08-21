<script setup>
import { ref, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import WeatherSubNav from '../../../components/exercise/WeatherSubNav.vue'
import BaseDashboardCard from '../../../components/exercise/BaseDashboardCard.vue'
import SearchBar from '../../../components/exercise/SearchBar.vue'
import WeatherCard from '../../../components/exercise/WeatherCard.vue'
import WeatherSummary from '../../../components/exercise/WeatherSummary.vue'
import { weatherList } from '../../../data/weatherList.js'

const router = useRouter()

const searchQuery = ref('')
const selectedCityId = ref('')
const selectedCityInfo = ref('도시 카드를 선택해 주세요.')
const hotOnly = ref(false)

const filteredWeatherList = computed(() =>
  weatherList.filter((city) => {
    const matchName = city.name.includes(searchQuery.value)
    const matchTemp = hotOnly.value ? city.temp >= 25 : true
    return matchName && matchTemp
  }),
)

const favoriteCount = computed(() => weatherList.filter((city) => city.favorite).length)

const averageTemp = computed(() => {
  const list = filteredWeatherList.value
  if (list.length === 0) {
    return 0
  }
  let sum = 0
  list.forEach((city) => {
    sum += city.temp
  })
  return Math.round(sum / list.length)
})

watch(selectedCityInfo, (newInfo, oldInfo) => {
  console.log(`[선택 변경] ${oldInfo} -> ${newInfo}`)
})

const updateQuery = (value) => {
  searchQuery.value = value
}

const toggleHot = () => {
  hotOnly.value = !hotOnly.value
}

const selectCard = (city) => {
  selectedCityId.value = city.id
  selectedCityInfo.value = `${city.name}이 선택되었습니다.`
}

// window.alert()을 걷어내고 Programmatic Navigation으로 상세 페이지를 연다
const goDetail = (city) => {
  router.push(`/exercise/4/weather/${city.id}`)
}

const toggleFavorite = (city) => {
  city.favorite = !city.favorite
}
</script>

<template>
  <div class="weather-home-view">
    <h1>⛅ 과제 4: 날씨 (라우터)</h1>
    <hr />

    <WeatherSubNav base-path="/exercise/4" />

    <BaseDashboardCard title="도시 검색">
      <SearchBar
        :query="searchQuery"
        :hot-only="hotOnly"
        @update-query="updateQuery"
        @toggle-hot="toggleHot"
      />
    </BaseDashboardCard>

    <WeatherSummary
      :query="searchQuery"
      :visible-count="filteredWeatherList.length"
      :average-temp="averageTemp"
      :favorite-count="favoriteCount"
    />

    <BaseDashboardCard title="지역별 날씨 현황">
      <p v-if="filteredWeatherList.length === 0" class="empty">
        검색 결과와 일치하는 도시가 없습니다.
      </p>

      <div v-else class="card-list">
        <WeatherCard
          v-for="city in filteredWeatherList"
          :key="city.id"
          :city-item="city"
          :selected="selectedCityId === city.id"
          @select-card="selectCard"
          @click-detail="goDetail"
          @toggle-favorite="toggleFavorite"
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
