<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import BaseDashboardCard from '../../components/exercise/BaseDashboardCard.vue'
import { weatherList } from '../../data/weatherList.js'

const route = useRoute()
const router = useRouter()

// 주소의 :id가 바뀌면 화면도 따라 바뀌어야 해서 computed로 잡는다
const cityIndex = computed(() => weatherList.findIndex((city) => city.id === route.params.id))
const city = computed(() => (cityIndex.value === -1 ? null : weatherList[cityIndex.value]))

const prevCity = computed(() => (cityIndex.value > 0 ? weatherList[cityIndex.value - 1] : null))
const nextCity = computed(() =>
  cityIndex.value !== -1 && cityIndex.value < weatherList.length - 1
    ? weatherList[cityIndex.value + 1]
    : null,
)

const goList = () => {
  router.push('/exercise/4')
}

const toggleFavorite = () => {
  city.value.favorite = !city.value.favorite
}
</script>

<template>
  <div class="weather-detail-view">
    <h1>⛅ 과제 4: 도시 상세</h1>
    <hr />

    <BaseDashboardCard v-if="city" :title="`${city.name} 상세 정보`">
      <p class="temp">{{ city.temp }}°C, {{ city.status }}</p>

      <p v-if="city.temp >= 25" class="label hot">🔥 더움 (25도 이상)</p>
      <p v-else class="label cool">❄️ 선선함 (25도 미만)</p>

      <ul class="detail">
        <li>체감온도 {{ city.feelsLike }}°C</li>
        <li>습도 {{ city.humidity }}%</li>
        <li>풍속 {{ city.wind }}m/s</li>
        <li>주소 파라미터 id: {{ route.params.id }}</li>
      </ul>

      <button class="favorite" @click="toggleFavorite">
        {{ city.favorite ? '★ 즐겨찾기 해제' : '☆ 즐겨찾기 추가' }}
      </button>
    </BaseDashboardCard>

    <BaseDashboardCard v-else title="도시를 찾을 수 없습니다">
      <p class="empty">id가 "{{ route.params.id }}"인 도시는 목록에 없습니다.</p>
    </BaseDashboardCard>

    <div class="move-bar">
      <router-link v-if="prevCity" :to="`/exercise/4/${prevCity.id}`" class="move">
        ← {{ prevCity.name }}
      </router-link>
      <span v-else class="move disabled">← 이전 없음</span>

      <button class="to-list" @click="goList">목록으로</button>

      <router-link v-if="nextCity" :to="`/exercise/4/${nextCity.id}`" class="move">
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

.temp {
  font-size: 22px;
  font-weight: bold;
}

.label {
  margin: 6px 0;
}

.label.hot {
  color: #d63031;
}

.label.cool {
  color: #0984e3;
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
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.move {
  color: #42b883;
}

.move.disabled {
  color: #bbb;
}

.to-list {
  padding: 6px 12px;
  cursor: pointer;
}
</style>
