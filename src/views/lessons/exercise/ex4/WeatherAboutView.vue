<script setup>
import { useRouter } from 'vue-router'
import WeatherSubNav from '../../../../components/exercise/WeatherSubNav.vue'
import BaseDashboardCard from '../../../../components/exercise/BaseDashboardCard.vue'

const router = useRouter()

const goHome = () => {
  router.push('/lessons/day4/exercise-4')
}
</script>

<template>
  <div class="weather-about-view">
    <h1>⛅ 과제 4: 서비스 소개</h1>
    <hr />

    <WeatherSubNav base-path="/lessons/day4/exercise-4" />

    <BaseDashboardCard title="서비스 소개">
      <p>Vue 3와 Vue Router로 만든 실습용 기상 관측 대시보드다.</p>

      <ul class="intro">
        <li>도시별 현재 기온과 날씨 상태를 카드로 보여준다</li>
        <li>화면 전환은 클라이언트 사이드 라우팅이라 새로고침이 일어나지 않는다</li>
        <li>도시 상세는 주소의 cityId로 찾아 들어간다</li>
        <li>정의되지 않은 주소는 Catch-all Route가 받는다</li>
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
