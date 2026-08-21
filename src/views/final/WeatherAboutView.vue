<script setup>
import { useRouter } from 'vue-router'
import WeatherSubNav from '../../components/exercise/WeatherSubNav.vue'
import UnitToggler from '../../components/exercise/UnitToggler.vue'
import BaseDashboardCard from '../../components/exercise/BaseDashboardCard.vue'

const router = useRouter()

const goHome = () => {
  router.push('/')
}
</script>

<template>
  <div class="weather-final-about">
    <h1>⛅ 최종본: 서비스 소개</h1>
    <hr />

    <WeatherSubNav base-path="/">
      <UnitToggler />
    </WeatherSubNav>

    <BaseDashboardCard title="서비스 소개">
      <p>강의에서 배운 것을 순서대로 얹어 온 누적본이다.</p>

      <ul class="intro">
        <li>디렉티브와 이벤트, 폼 바인딩으로 화면을 짰다</li>
        <li>Composition API로 상태와 계산, 감시를 정리했다</li>
        <li>컴포넌트와 슬롯으로 화면을 쪼개고 props와 emits로 연결했다</li>
        <li>Vue Router로 대시보드와 소개, 상세를 경로로 나눴다</li>
        <li>Pinia로 날씨 데이터와 단위 설정을 전역 스토어에 담았다</li>
      </ul>

      <button class="to-home" @click="goHome">대시보드 홈으로 이동</button>
    </BaseDashboardCard>
  </div>
</template>

<style scoped>
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
