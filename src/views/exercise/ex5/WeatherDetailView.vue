<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import WeatherSubNav from '../../../components/exercise/WeatherSubNav.vue'
import UnitToggler from '../../../components/exercise/UnitToggler.vue'
import BaseDashboardCard from '../../../components/exercise/BaseDashboardCard.vue'
import { useWeatherStore } from '../../../stores/weatherStore.js'
import { useConfigStore } from '../../../stores/configStore.js'

const route = useRoute()
const router = useRouter()
const weather = useWeatherStore()
const configStore = useConfigStore()

const city = ref(null)

const selectCity = (cityId) => {
  city.value = weather.findCity(cityId) ?? null
}

onMounted(() => {
  selectCity(route.params.cityId)
})

watch(
  () => route.params.cityId,
  (newId) => {
    selectCity(newId)
  },
)

// 목록 카드와 같은 변환을 상세에도 적용한다
const displayTemp = computed(() => {
  if (city.value === null) {
    return 0
  }
  if (configStore.unit === 'fahrenheit') {
    return Math.round((city.value.temp * 9) / 5 + 32)
  }
  return city.value.temp
})

const goHome = () => {
  router.push('/exercise/5')
}
</script>

<template>
  <div class="weather-detail-view">
    <h1>⛅ 과제 5: 지역별 상세 기상 관측 정보</h1>
    <hr />

    <WeatherSubNav base-path="/exercise/5">
      <UnitToggler />
    </WeatherSubNav>

    <BaseDashboardCard v-if="city" :title="`${city.name} 상세 기상 관측 정보`">
      <ul class="detail">
        <li>지정 지역: {{ city.name }}</li>
        <li>실시간 기온: {{ displayTemp }}{{ configStore.unitSymbol }}</li>
        <li>기상 현황: {{ city.status }}</li>
        <li>대기 습도: {{ city.humidity }}%</li>
        <li>현재 풍속: {{ city.wind }}m/s</li>
        <li>스토어에 담긴 즐겨찾기 수: {{ weather.favoriteCount }}</li>
      </ul>

      <button class="favorite" @click="weather.toggleFavorite(city)">
        {{ city.favorite ? '★ 즐겨찾기 해제' : '☆ 즐겨찾기 추가' }}
      </button>
    </BaseDashboardCard>

    <BaseDashboardCard v-else title="도시를 찾을 수 없습니다">
      <p class="empty">cityId가 "{{ route.params.cityId }}"인 도시는 스토어에 없습니다.</p>
    </BaseDashboardCard>

    <div class="move-bar">
      <button class="to-home" @click="goHome">메인 대시보드로 돌아가기</button>
    </div>
  </div>
</template>

<style scoped>
.weather-detail-view {
  margin-bottom: 40px;
}

.detail {
  margin: 0 0 12px;
  padding-left: 18px;
  color: #555;
}

.favorite {
  padding: 6px 12px;
  cursor: pointer;
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
