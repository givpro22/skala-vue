<script setup>
import { useRouter } from 'vue-router'
import ElWeatherSubNav from '../../../../components/exercise/ElWeatherSubNav.vue'

const router = useRouter()
</script>

<template>
  <div class="weather-about-view">
    <h1>⛅ 과제 7: 서비스 소개</h1>
    <hr />

    <ElWeatherSubNav base-path="/lessons/day4/exercise-7" />

    <el-card>
      <template #header>서비스 소개</template>

      <p>과제 6의 실시간 데이터 화면을 Element Plus 컴포넌트로 다시 그린 것이다.</p>

      <el-timeline>
        <el-timeline-item timestamp="레이아웃" placement="top">
          el-row와 el-col의 24분할 그리드로 카드를 배치한다
        </el-timeline-item>
        <el-timeline-item timestamp="입력" placement="top">
          검색창은 el-input, 필터는 el-switch로 바꿨다
        </el-timeline-item>
        <el-timeline-item timestamp="데이터 표시" placement="top">
          수치는 el-descriptions, 날씨 상태는 el-tag, 예보는 el-timeline으로 그린다
        </el-timeline-item>
        <el-timeline-item timestamp="피드백" placement="top">
          로딩은 el-skeleton, 빈 결과는 el-empty, 알림은 ElMessage가 맡는다
        </el-timeline-item>
      </el-timeline>

      <el-button type="primary" @click="router.push('/lessons/day4/exercise-7')">
        대시보드 홈으로 이동
      </el-button>
    </el-card>
  </div>
</template>

<style scoped>
.weather-about-view {
  margin-bottom: 40px;
}
</style>
