<script setup>
import { useRouter } from 'vue-router'
import WeatherSubNav from '../../../../components/exercise/WeatherSubNav.vue'
import UnitToggler from '../../../../components/exercise/UnitToggler.vue'
import BaseDashboardCard from '../../../../components/exercise/BaseDashboardCard.vue'

const router = useRouter()

const goHome = () => {
  router.push('/lessons/day4/exercise-5')
}
</script>

<template>
  <div class="weather-about-view">
    <h1>⛅ 과제 5: 서비스 소개</h1>
    <hr />

    <WeatherSubNav base-path="/lessons/day4/exercise-5">
      <UnitToggler />
    </WeatherSubNav>

    <BaseDashboardCard title="서비스 소개">
      <p>과제 4의 라우터 구조에 Pinia 스토어를 얹은 화면이다.</p>

      <ul class="intro">
        <li>날씨 단위는 configStore가 쥐고 있어 어느 화면에서 바꿔도 함께 따라온다</li>
        <li>도시 목록과 검색 상태는 추가 스토어인 weatherStore가 맡는다</li>
        <li>이 소개 화면에서 단위를 바꾸고 대시보드로 넘어가면 바뀐 단위가 그대로 보인다</li>
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
  color: var(--color-text-soft);
}

.to-home {
  padding: 8px 14px;
  cursor: pointer;
}
</style>
