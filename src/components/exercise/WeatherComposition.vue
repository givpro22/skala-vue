<script setup>
import { ref, computed, watch, watchEffect } from 'vue'

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

// v-model 대신 분해한 형태를 쓰면 한글 조합 중에도 입력이 끊기지 않는다
const updateSearch = (e) => {
  searchQuery.value = e.target.value
}

const selectCity = (city) => {
  selectedCityId.value = city.id
  selectedCityInfo.value = `${city.name}이 선택되었습니다.`
}

const showDetail = (cityName, status) => {
  window.alert(`${cityName}의 현재 날씨는 [${status}] 상태입니다.`)
}

const toggleFavorite = (city) => {
  city.favorite = !city.favorite
}
</script>

<template>
  <div class="weather-composition">
    <h2>지역별 날씨 현황 (Composition)</h2>

    <div class="search-box">
      <label for="composition-search">도시 검색 </label>
      <input
        id="composition-search"
        type="text"
        :value="searchQuery"
        @input="updateSearch"
        placeholder="도시 이름을 한글로 입력하세요"
      />
      <label class="hot-only">
        <input type="checkbox" v-model="hotOnly" /> 25도 이상만 보기
      </label>
    </div>

    <ul class="summary">
      <li>검색어: {{ searchQuery === '' ? '없음 (전체 표시)' : searchQuery }}</li>
      <li>표시 중인 도시: {{ filteredWeatherList.length }}곳</li>
      <li>평균 기온: {{ averageTemp }}°C</li>
      <li>즐겨찾기: {{ favoriteCount }}곳</li>
    </ul>

    <p v-if="filteredWeatherList.length === 0" class="empty">검색 결과와 일치하는 도시가 없습니다.</p>

    <div v-else class="card-list">
      <div
        v-for="city in filteredWeatherList"
        :key="city.id"
        class="weather-card"
        :class="{ selected: selectedCityId === city.id }"
        @click="selectCity(city)"
      >
        <div class="card-head">
          <h3>{{ city.name }}</h3>
          <button class="favorite" @click.stop="toggleFavorite(city)">
            {{ city.favorite ? '★' : '☆' }}
          </button>
        </div>

        <p class="temp">{{ city.temp }}°C, {{ city.status }}</p>

        <p v-if="city.temp >= 25" class="label hot">🔥 더움 (25도 이상)</p>
        <p v-else class="label cool">❄️ 선선함 (25도 미만)</p>

        <ul class="detail">
          <li>체감온도 {{ city.feelsLike }}°C</li>
          <li>습도 {{ city.humidity }}%</li>
          <li>풍속 {{ city.wind }}m/s</li>
        </ul>

        <button class="detail-button" @click.stop="showDetail(city.name, city.status)">
          상세보기
        </button>
      </div>
    </div>

    <div class="status-bar">{{ selectedCityInfo }}</div>
  </div>
</template>

<style scoped>
.weather-composition {
  margin-bottom: 40px;
}

.search-box {
  margin-bottom: 12px;
}

.search-box input[type='text'] {
  padding: 6px 10px;
  width: 240px;
}

.hot-only {
  margin-left: 12px;
}

.summary {
  margin: 0 0 16px;
  padding-left: 18px;
  font-size: 14px;
  color: var(--color-text-soft);
}

.empty {
  padding: 20px;
  border: 1px dashed var(--color-border);
  border-radius: 8px;
  color: var(--color-text-muted);
  text-align: center;
}

.card-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 12px;
}

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

.status-bar {
  margin-top: 16px;
  padding: 10px;
  border-radius: 6px;
  background-color: #333;
  color: white;
}
</style>
