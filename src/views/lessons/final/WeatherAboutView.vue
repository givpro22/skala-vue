<script setup>
import { useRouter } from 'vue-router'
import ElWeatherSubNav from '../../../components/exercise/ElWeatherSubNav.vue'

const router = useRouter()
</script>

<template>
  <div class="weather-about-view">
    <h1>⛅ 최종본: 서비스 소개</h1>
    <hr />

    <ElWeatherSubNav base-path="/lessons/final" />

    <el-card>
      <template #header>서비스 소개</template>

      <p>강의에서 배운 것을 순서대로 얹어 온 누적본이다.</p>

      <el-timeline>
        <el-timeline-item timestamp="화면" placement="top">
          디렉티브와 이벤트, 폼 바인딩으로 뼈대를 짜고 컴포넌트와 슬롯으로 쪼갰다
        </el-timeline-item>
        <el-timeline-item timestamp="상태" placement="top">
          Composition API로 정리한 상태를 Pinia 스토어로 옮겼다
        </el-timeline-item>
        <el-timeline-item timestamp="경로" placement="top">
          Vue Router로 대시보드와 소개, 상세를 나누고 지연 로딩을 걸었다
        </el-timeline-item>
        <el-timeline-item timestamp="통신" placement="top">
          axios로 OpenWeatherMap의 현재 날씨와 대기질, Open-Meteo의 예보를 받아 온다
        </el-timeline-item>
        <el-timeline-item timestamp="UI" placement="top">
          Element Plus 컴포넌트로 화면을 다시 그렸다
        </el-timeline-item>
      </el-timeline>

      <el-button type="primary" @click="router.push('/lessons/final')"
        >대시보드 홈으로 이동</el-button
      >
    </el-card>
  </div>
</template>

<style scoped>
.weather-about-view {
  margin-bottom: 40px;
}
</style>
