<script setup>
import { computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import PageHero from '../../../components/home/PageHero.vue'
import ElWeatherSubNav from '../../../components/exercise/ElWeatherSubNav.vue'
import { useFinalWeatherStore } from '../../../stores/finalWeatherStore.js'
import { useConfigStore } from '../../../stores/configStore.js'

const route = useRoute()
const router = useRouter()
const live = useFinalWeatherStore()
const configStore = useConfigStore()

// 메인홈에서 스무 곳이 도착하는 대로 채워지므로, 늦게 오는 도시도 여기서 저절로 잡힌다
const city = computed(() => live.findCity(route.params.cityId))

const air = computed(() => live.airByCity[route.params.cityId])
const forecast = computed(() => live.forecastByCity[route.params.cityId])

const aqiLabel = ['', '좋음', '보통', '나쁨', '매우 나쁨', '최악']
const aqiTagType = ['', 'success', 'primary', 'warning', 'danger', 'danger']

const load = async (cityId) => {
  live.loadStream()
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
    <PageHero
      eyebrow="최종본"
      title="지역별 상세 기상 관측 정보"
      lead="현재 날씨와 대기질, 사흘 예보를 한 화면에 모았다."
    />

    <ElWeatherSubNav base-path="/lessons/final" />

    <el-page-header title="뒤로" @back="router.push('/lessons/final')">
      <template #content>{{ city ? `${city.name} 상세 기상 관측 정보` : '도시 상세' }}</template>
    </el-page-header>

    <el-card v-if="city" class="detail-card">
      <figure v-if="city.photo" class="detail-photo">
        <img :src="city.photo" :alt="`${city.name} ${city.place}`" />
        <figcaption>{{ city.place }}</figcaption>
      </figure>

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

    <el-skeleton v-else-if="live.isFilling" class="detail-card" :rows="4" animated />

    <template v-else>
      <el-alert v-if="live.errorMessage" :title="live.errorMessage" type="error" :closable="false" />
      <el-empty v-else description="해당 cityId의 도시를 찾을 수 없습니다." />
    </template>

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
.detail-photo {
  position: relative;
  margin: 0 0 16px;
  overflow: hidden;
  border-radius: 10px;
  aspect-ratio: 21 / 9;
}

.detail-photo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.detail-photo figcaption {
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  padding: 20px 14px 8px;
  background: linear-gradient(
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 0.4) 45%,
    rgba(0, 0, 0, 0.85) 100%
  );
  color: #fff;
  /* 밝은 사진 위에서는 그라데이션만으로 흰 글씨가 묻힌다 */
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.8);
  font-size: 13px;
}

.weather-detail-view {
  margin-bottom: 40px;
}

.page-hero {
  margin-bottom: 24px;
}

.detail-card {
  margin-top: 16px;
}

.air {
  margin-top: 12px;
}
</style>
