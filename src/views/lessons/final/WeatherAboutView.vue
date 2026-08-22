<script setup>
import { useRouter } from 'vue-router'
import PageHero from '../../../components/home/PageHero.vue'
import ElWeatherSubNav from '../../../components/exercise/ElWeatherSubNav.vue'

const router = useRouter()
</script>

<template>
  <div class="weather-about-view">
    <PageHero
      eyebrow="최종본"
      title="서비스 소개"
      lead="화면부터 상태와 경로, 통신, UI까지 강의를 따라가며 무엇을 얹었는지 적어 둔다."
    />

    <ElWeatherSubNav base-path="/lessons/final" />

    <el-card>
      <template #header>쌓아 온 순서</template>

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

.page-hero {
  margin-bottom: 24px;
}
</style>
