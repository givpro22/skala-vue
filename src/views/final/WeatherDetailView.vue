<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import WeatherSubNav from '../../components/exercise/WeatherSubNav.vue'
import UnitToggler from '../../components/exercise/UnitToggler.vue'
import BaseDashboardCard from '../../components/exercise/BaseDashboardCard.vue'
import { useFinalWeatherStore } from '../../stores/finalWeatherStore.js'
import { useConfigStore } from '../../stores/configStore.js'

const route = useRoute()
const router = useRouter()
const weather = useFinalWeatherStore()
const configStore = useConfigStore()

const city = ref(null)
const prevCity = ref(null)
const nextCity = ref(null)

const selectCity = (cityId) => {
  const index = weather.findIndex(cityId)
  const list = weather.cityList
  city.value = index === -1 ? null : list[index]
  prevCity.value = index > 0 ? list[index - 1] : null
  nextCity.value = index !== -1 && index < list.length - 1 ? list[index + 1] : null
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

const displayTemp = computed(() => {
  if (city.value === null) {
    return 0
  }
  if (configStore.unit === 'fahrenheit') {
    return Math.round((city.value.temp * 9) / 5 + 32)
  }
  return city.value.temp
})
</script>

<template>
  <div class="weather-final-detail">
    <h1>⛅ 최종본: 지역별 상세 기상 관측 정보</h1>
    <hr />

    <WeatherSubNav base-path="/">
      <UnitToggler />
    </WeatherSubNav>

    <BaseDashboardCard v-if="city" :title="`${city.name} 상세 기상 관측 정보`">
      <p class="temp">{{ displayTemp }}{{ configStore.unitSymbol }}, {{ city.status }}</p>

      <p v-if="city.temp >= 25" class="label hot">🔥 더움 (25도 이상)</p>
      <p v-else class="label cool">❄️ 선선함 (25도 미만)</p>

      <ul class="detail">
        <li>체감온도 {{ city.feelsLike }}°C</li>
        <li>습도 {{ city.humidity }}%</li>
        <li>풍속 {{ city.wind }}m/s</li>
        <li>주소 파라미터 cityId: {{ route.params.cityId }}</li>
      </ul>

      <button class="favorite" @click="weather.toggleFavorite(city)">
        {{ city.favorite ? '★ 즐겨찾기 해제' : '☆ 즐겨찾기 추가' }}
      </button>
    </BaseDashboardCard>

    <BaseDashboardCard v-else title="도시를 찾을 수 없습니다">
      <p class="empty">cityId가 "{{ route.params.cityId }}"인 도시는 스토어에 없습니다.</p>
    </BaseDashboardCard>

    <div class="move-bar">
      <router-link v-if="prevCity" :to="`/weather/${prevCity.id}`" class="move">
        ← {{ prevCity.name }}
      </router-link>
      <span v-else class="move disabled">← 이전 없음</span>

      <button class="to-home" @click="router.push('/')">메인 대시보드로 돌아가기</button>

      <router-link v-if="nextCity" :to="`/weather/${nextCity.id}`" class="move">
        {{ nextCity.name }} →
      </router-link>
      <span v-else class="move disabled">다음 없음 →</span>
    </div>
  </div>
</template>

<style scoped>
.weather-final-detail {
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

.to-home {
  padding: 6px 12px;
  cursor: pointer;
}
</style>
