<script setup>
import { ref, computed, watch, watchEffect } from 'vue'
import BaseDashboardCard from './BaseDashboardCard.vue'
import SearchBar from './SearchBar.vue'
import WeatherCard from './WeatherCard.vue'
import WeatherSummary from './WeatherSummary.vue'

const weatherList = ref([
  { id: 'city_01', name: '서울', temp: 28, status: '맑음', feelsLike: 30, humidity: 45, wind: 2.1, favorite: false },
  { id: 'city_02', name: '수원', temp: 24, status: '비', feelsLike: 25, humidity: 82, wind: 3.4, favorite: false },
  { id: 'city_03', name: '부산', temp: 26, status: '구름', feelsLike: 28, humidity: 70, wind: 4.8, favorite: false },
  { id: 'city_04', name: '광주', temp: 29, status: '맑음', feelsLike: 32, humidity: 52, wind: 1.6, favorite: false },
  { id: 'city_05', name: '강릉', temp: 22, status: '흐림', feelsLike: 21, humidity: 65, wind: 5.2, favorite: false },
  { id: 'city_06', name: '제주', temp: 27, status: '소나기', feelsLike: 30, humidity: 78, wind: 6.1, favorite: false },
])

const searchQuery = ref('')
const selectedCityInfo = ref('도시 카드를 선택해 주세요.')
const selectedCityId = ref('')
const hotOnly = ref(false)

const filteredWeatherList = computed(() =>
  weatherList.value.filter((city) => {
    const matchName = city.name.includes(searchQuery.value)
    const matchTemp = hotOnly.value ? city.temp >= 25 : true
    return matchName && matchTemp
  }),
)

const favoriteCount = computed(() => weatherList.value.filter((city) => city.favorite).length)

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

watch(favoriteCount, (newCount, oldCount) => {
  console.log(`[즐겨찾기] ${oldCount}개에서 ${newCount}개로 변경`)
})

watchEffect(() => {
  console.log(`[검색어 추적] 현재 입력값: "${searchQuery.value}"`)
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

const clickDetail = (city) => {
  window.alert(`${city.name}의 현재 날씨는 [${city.status}] 상태입니다.`)
}

const toggleFavorite = (city) => {
  city.favorite = !city.favorite
}
</script>

<template>
  <div class="weather-parent">
    <h2>지역별 날씨 현황 (Component)</h2>

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

    <BaseDashboardCard title="날씨 현황">
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
          @click-detail="clickDetail"
          @toggle-favorite="toggleFavorite"
        />
      </div>
    </BaseDashboardCard>

    <div class="status-bar">{{ selectedCityInfo }}</div>
  </div>
</template>

<style scoped>
.weather-parent {
  margin-bottom: 40px;
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

.status-bar {
  margin-top: 16px;
  padding: 10px;
  border-radius: 6px;
  background-color: #333;
  color: white;
}
</style>
