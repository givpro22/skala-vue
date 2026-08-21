<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import ElWeatherSubNav from '../../../components/exercise/ElWeatherSubNav.vue'
import { useFinalWeatherStore } from '../../../stores/finalWeatherStore.js'
import { useConfigStore } from '../../../stores/configStore.js'

const route = useRoute()
const router = useRouter()
const live = useFinalWeatherStore()
const configStore = useConfigStore()

const city = ref(null)

const air = computed(() => live.airByCity[route.params.cityId])
const forecast = computed(() => live.forecastByCity[route.params.cityId])

const aqiLabel = ['', '좋음', '보통', '나쁨', '매우 나쁨', '최악']
const aqiTagType = ['', 'success', 'primary', 'warning', 'danger', 'danger']

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
</script>

<template>
  <div class="weather-detail-view">
    <h1>⛅ 최종본: 지역별 상세 기상 관측 정보</h1>
    <hr />

    <ElWeatherSubNav base-path="/lessons/final" />

    <el-page-header title="뒤로" @back="router.push('/lessons/final')">
      <template #content>{{ city ? `${city.name} 상세 기상 관측 정보` : '도시 상세' }}</template>
    </el-page-header>

    <el-card v-if="city" class="detail-card">
      <el-descriptions :column="2" border>
        <el-descriptions-item label="지정 지역">{{ city.name }}</el-descriptions-item>
        <el-descriptions-item label="기상 현황">
          <el-tag :type="city.temp >= 25 ? 'danger' : 'primary'" size="small">
            {{ city.status }}
          </el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="실시간 기온">
          {{ toDisplay(city.temp) }}{{ configStore.unitSymbol }}
        </el-descriptions-item>
        <el-descriptions-item label="체감 온도">
          {{ toDisplay(city.feelsLike) }}{{ configStore.unitSymbol }}
        </el-descriptions-item>
        <el-descriptions-item label="대기 습도">{{ city.humidity }}%</el-descriptions-item>
        <el-descriptions-item label="현재 풍속">{{ city.wind }}m/s</el-descriptions-item>
      </el-descriptions>
    </el-card>

    <el-empty v-else description="해당 cityId의 도시를 찾을 수 없습니다." />

    <el-card class="detail-card">
      <template #header>대기질 (OpenWeatherMap Air Pollution)</template>

      <div v-if="air">
        <el-tag :type="aqiTagType[air.aqi]">{{ air.aqi }}단계 {{ aqiLabel[air.aqi] }}</el-tag>
        <el-descriptions class="air" :column="2" size="small" border>
          <el-descriptions-item label="미세먼지 PM10">{{ air.pm10 }}µg/m³</el-descriptions-item>
          <el-descriptions-item label="초미세먼지 PM2.5">{{ air.pm25 }}µg/m³</el-descriptions-item>
        </el-descriptions>
      </div>

      <el-skeleton v-else :rows="2" animated />
    </el-card>

    <el-card class="detail-card">
      <template #header>사흘 예보 (Open-Meteo)</template>

      <el-timeline v-if="forecast">
        <el-timeline-item v-for="day in forecast" :key="day.day" :timestamp="day.day" placement="top">
          최고 {{ toDisplay(day.max) }}{{ configStore.unitSymbol }} / 최저
          {{ toDisplay(day.min) }}{{ configStore.unitSymbol }}
        </el-timeline-item>
      </el-timeline>

      <el-skeleton v-else :rows="3" animated />
    </el-card>
  </div>
</template>

<style scoped>
.weather-detail-view {
  margin-bottom: 40px;
}

.detail-card {
  margin-top: 16px;
}

.air {
  margin-top: 12px;
}
</style>
