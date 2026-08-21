<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import WeatherSubNav from '../../../components/exercise/WeatherSubNav.vue'
import BaseDashboardCard from '../../../components/exercise/BaseDashboardCard.vue'
import { weatherList } from '../../../data/weatherList.js'

const route = useRoute()
const router = useRouter()

const city = ref(null)
const prevCity = ref(null)
const nextCity = ref(null)

const selectCity = (cityId) => {
  const index = weatherList.findIndex((item) => item.id === cityId)
  city.value = index === -1 ? null : weatherList[index]
  prevCity.value = index > 0 ? weatherList[index - 1] : null
  nextCity.value = index !== -1 && index < weatherList.length - 1 ? weatherList[index + 1] : null
}

onMounted(() => {
  selectCity(route.params.cityId)
})

// 같은 화면에서 옆 도시로 넘어갈 때는 컴포넌트가 다시 만들어지지 않아 파라미터를 따로 감시한다
watch(
  () => route.params.cityId,
  (newId) => {
    selectCity(newId)
  },
)

const goHome = () => {
  router.push('/exercise/4')
}
</script>

<template>
  <div class="weather-detail-view">
    <h1>⛅ 과제 4: 지역별 상세 기상 관측 정보</h1>
    <hr />

    <WeatherSubNav base-path="/exercise/4" />

    <BaseDashboardCard v-if="city" :title="`${city.name} 상세 기상 관측 정보`">
      <ul class="detail">
        <li>지정 지역: {{ city.name }}</li>
        <li>실시간 기온: {{ city.temp }}°C</li>
        <li>기상 현황: {{ city.status }}</li>
        <li>체감 온도: {{ city.feelsLike }}°C</li>
        <li>대기 습도: {{ city.humidity }}%</li>
        <li>현재 풍속: {{ city.wind }}m/s</li>
        <li>주소 파라미터 cityId: {{ route.params.cityId }}</li>
      </ul>
    </BaseDashboardCard>

    <BaseDashboardCard v-else title="도시를 찾을 수 없습니다">
      <p class="empty">cityId가 "{{ route.params.cityId }}"인 도시는 Mock Data에 없습니다.</p>
    </BaseDashboardCard>

    <div class="move-bar">
      <router-link v-if="prevCity" :to="`/exercise/4/weather/${prevCity.id}`" class="move">
        ← {{ prevCity.name }}
      </router-link>
      <span v-else class="move disabled">← 이전 없음</span>

      <button class="to-home" @click="goHome">메인 대시보드로 돌아가기</button>

      <router-link v-if="nextCity" :to="`/exercise/4/weather/${nextCity.id}`" class="move">
        {{ nextCity.name }} →
      </router-link>
      <span v-else class="move disabled">다음 없음 →</span>
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
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-top: 16px;
}

.move {
  color: #42b883;
}

.move.disabled {
  color: #bbb;
}

.to-home {
  padding: 6px 12px;
  cursor: pointer;
}
</style>
