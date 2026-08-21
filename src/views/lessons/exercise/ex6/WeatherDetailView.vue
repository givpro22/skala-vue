<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import WeatherSubNav from '../../../../components/exercise/WeatherSubNav.vue'
import UnitToggler from '../../../../components/exercise/UnitToggler.vue'
import BaseDashboardCard from '../../../../components/exercise/BaseDashboardCard.vue'
import { useLiveWeatherStore } from '../../../../stores/liveWeatherStore.js'
import { useConfigStore } from '../../../../stores/configStore.js'

const route = useRoute()
const router = useRouter()
const live = useLiveWeatherStore()
const configStore = useConfigStore()

const city = ref(null)

const air = computed(() => live.airByCity[route.params.cityId])
const forecast = computed(() => live.forecastByCity[route.params.cityId])

const aqiLabel = ['', '좋음', '보통', '나쁨', '매우 나쁨', '최악']

const load = async (cityId) => {
  if (live.cityList.length === 0) {
    await live.loadAll()
  }
  const found = live.findCity(cityId)
  city.value = found === undefined ? null : found
  await live.loadDetail(cityId)
}

onMounted(() => {
  load(route.params.cityId)
})

watch(
  () => route.params.cityId,
  (newId) => {
    load(newId)
  },
)

const toDisplay = (celsius) =>
  configStore.unit === 'fahrenheit' ? Math.round((celsius * 9) / 5 + 32) : celsius

const displayTemp = computed(() => (city.value === null ? 0 : toDisplay(city.value.temp)))
</script>

<template>
  <div class="weather-detail-view">
    <h1>⛅ 과제 6: 지역별 상세 기상 관측 정보</h1>
    <hr />

    <WeatherSubNav base-path="/lessons/day4/exercise-6">
      <UnitToggler />
    </WeatherSubNav>

    <BaseDashboardCard v-if="city" :title="`${city.name} 상세 기상 관측 정보`">
      <ul class="detail">
        <li>지정 지역: {{ city.name }}</li>
        <li>실시간 기온: {{ displayTemp }}{{ configStore.unitSymbol }}</li>
        <li>기상 현황: {{ city.status }}</li>
        <li>체감 온도: {{ toDisplay(city.feelsLike) }}{{ configStore.unitSymbol }}</li>
        <li>대기 습도: {{ city.humidity }}%</li>
        <li>현재 풍속: {{ city.wind }}m/s</li>
      </ul>
    </BaseDashboardCard>

    <BaseDashboardCard v-else title="도시를 찾을 수 없습니다">
      <p class="empty">cityId가 "{{ route.params.cityId }}"인 도시는 목록에 없습니다.</p>
    </BaseDashboardCard>

    <BaseDashboardCard title="대기질 (OpenWeatherMap Air Pollution)">
      <ul v-if="air" class="detail">
        <li>대기질 지수: {{ air.aqi }}단계 ({{ aqiLabel[air.aqi] }})</li>
        <li>미세먼지 PM10: {{ air.pm10 }}µg/m³</li>
        <li>초미세먼지 PM2.5: {{ air.pm25 }}µg/m³</li>
      </ul>
      <p v-else class="empty">대기질을 불러오는 중이다.</p>
    </BaseDashboardCard>

    <BaseDashboardCard title="사흘 예보 (Open-Meteo)">
      <ul v-if="forecast" class="detail">
        <li v-for="day in forecast" :key="day.day">
          {{ day.day }} 최고 {{ toDisplay(day.max) }}{{ configStore.unitSymbol }} / 최저
          {{ toDisplay(day.min) }}{{ configStore.unitSymbol }}
        </li>
      </ul>
      <p v-else class="empty">예보를 불러오는 중이다.</p>
    </BaseDashboardCard>

    <div class="move-bar">
      <button class="to-home" @click="router.push('/lessons/day4/exercise-6')">
        메인 대시보드로 돌아가기
      </button>
    </div>
  </div>
</template>

<style scoped>
.weather-detail-view {
  margin-bottom: 40px;
}

.detail {
  margin: 0;
  padding-left: 18px;
  color: #555;
}

.empty {
  color: #888;
}

.move-bar {
  margin-top: 16px;
}

.to-home {
  padding: 6px 12px;
  cursor: pointer;
}
</style>
