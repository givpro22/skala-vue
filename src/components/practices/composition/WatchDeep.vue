<script setup>
import { ref, watch } from 'vue'

const user = ref({
  name: '홍길동',
  age: 20,
})

const logDeep = ref('아직 반응 없음')
const logTarget = ref('아직 반응 없음')

watch(
  user,
  (newVal) => {
    logDeep.value = `[deep 감지] 현재 이름: ${newVal.name}, 나이: ${newVal.age}`
  },
  { deep: true },
)

// deep 대신 특정 속성을 조준하면 이전 값이 보존된다
watch(
  () => user.value.age,
  (newAge, oldAge) => {
    logTarget.value = `[타겟 감지] 나이가 ${oldAge}세에서 ${newAge}세로 변경됨`
  },
)
</script>

<template>
  <div class="practice-section">
    <h2>ref 객체/배열 감시</h2>

    <h3>회원 데이터 조작 패널</h3>
    <p>이름: {{ user.name }} / 나이: {{ user.age }}세</p>
    <button @click="user.name = '이순신'">이름만 변경</button> &nbsp;
    <button @click="user.age++">나이만 변경 (age++)</button>

    <div class="monitor">
      <p>1) deep: true 모니터 (전체 감시)</p>
      <p>{{ logDeep }}</p>
    </div>

    <div class="monitor">
      <p>2) 화살표 함수 모니터 (나이만 타겟 감시)</p>
      <p>{{ logTarget }}</p>
    </div>
  </div>
</template>

<style scoped>
.monitor {
  margin-top: 10px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 6px;
}
</style>
