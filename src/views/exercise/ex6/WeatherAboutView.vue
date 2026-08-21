<script setup>
import { useRouter } from 'vue-router'
import WeatherSubNav from '../../../components/exercise/WeatherSubNav.vue'
import UnitToggler from '../../../components/exercise/UnitToggler.vue'
import BaseDashboardCard from '../../../components/exercise/BaseDashboardCard.vue'

const router = useRouter()

const goHome = () => {
  router.push('/exercise/6')
}
</script>

<template>
  <div class="weather-about-view">
    <h1>⛅ 과제 6: 서비스 소개</h1>
    <hr />

    <WeatherSubNav base-path="/exercise/6">
      <UnitToggler />
    </WeatherSubNav>

    <BaseDashboardCard title="서비스 소개">
      <p>OpenWeatherMap에서 받아온 실제 관측 데이터로 그리는 화면이다.</p>

      <ul class="intro">
        <li>도시 여섯 곳의 현재 날씨를 axios로 한꺼번에 받아 온다</li>
        <li>상세 화면에서는 대기질과 사흘 예보를 API 두 곳에서 더 받는다</li>
        <li>받아온 데이터는 스토어에 담아 두고 화면을 옮겨도 다시 요청하지 않는다</li>
      </ul>

      <button class="to-home" @click="goHome">대시보드 홈으로 이동</button>
    </BaseDashboardCard>
  </div>
</template>

<style scoped>
.weather-about-view {
  margin-bottom: 40px;
}

.intro {
  margin: 0 0 14px;
  padding-left: 18px;
  color: #555;
}

.to-home {
  padding: 8px 14px;
  cursor: pointer;
}
</style>
