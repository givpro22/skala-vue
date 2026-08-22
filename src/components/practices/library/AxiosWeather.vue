<script setup>
import { ref } from 'vue'
import axios from 'axios'

const weatherData = ref(null)
const isLoading = ref(false)
const errorMessage = ref('')

const handleFetchWeather = async () => {
  isLoading.value = true
  errorMessage.value = ''

  const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY
  const URL = `https://api.openweathermap.org/data/2.5/weather?lat=35.158582&lon=126.804975&appid=${API_KEY}&units=metric&lang=kr`

  try {
    // 비동기 통신이라 서버 응답이 도착할 때까지 await로 기다린다
    const response = await axios.get(URL)
    console.log('Axios 통신 응답 전체 객체:', response)
    console.log('백엔드가 준 핵심 날씨 데이터(JSON):', response.data)
    weatherData.value = response.data
  } catch (error) {
    // 4xx, 5xx 에러나 네트워크 오프라인이면 reject되어 여기로 온다
    console.error('통신 중 에러가 발생했습니다:', error)
    errorMessage.value = '데이터를 가져오지 못했습니다. API 키 활성화 여부나 주소를 확인하세요.'
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="practice-section">
    <h2>Axios 통신 검증</h2>

    <p>.env.local에 VITE_OPENWEATHER_API_KEY를 넣어야 통신이 된다. 키가 없으면 catch로 떨어진다.</p>

    <button :disabled="isLoading" @click="handleFetchWeather">
      {{ isLoading ? '데이터 로딩 중...' : '실시간 날씨 데이터 당겨오기' }}
    </button>

    <div v-if="weatherData" class="result-card">
      <p>
        위치: <strong>{{ weatherData.name }}</strong>
      </p>
      <p>
        현재 기온: <strong>{{ weatherData.main.temp }}°C</strong> (정상 섭씨 변환 완료)
      </p>
      <p>
        날씨 상태: <strong>{{ weatherData.weather[0].description }}</strong>
      </p>
      <p>
        습도: <strong>{{ weatherData.main.humidity }}%</strong>
      </p>
    </div>

    <p v-else-if="errorMessage" class="error">{{ errorMessage }}</p>

    <p v-else>아직 가져온 데이터가 없습니다. 버튼을 눌러 통신을 가동하세요.</p>
  </div>
</template>

<style scoped>
.result-card {
  margin-top: 10px;
  padding: 12px;
  border: 1px solid var(--color-border);
  border-radius: 6px;
}

.error {
  color: var(--color-danger);
}
</style>
