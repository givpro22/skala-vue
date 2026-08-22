<script setup>
import { ref, watchEffect } from 'vue'

const username = ref('홍길동')
const age = ref(20)
const logMessage = ref('대기 중...')

// 감시 대상을 지정하지 않아도 내부에서 접근한 반응형 데이터를 자동으로 추적한다
watchEffect(() => {
  logMessage.value = `[자동 감지] 이름: ${username.value} / 나이: ${age.value}세`
  console.log('watchEffect가 내부 변수 변경을 감지하여 실행되었습니다')
})
</script>

<template>
  <div class="practice-section">
    <h2>자동 감시자 watchEffect()</h2>

    <p>이름: {{ username }} / 나이: {{ age }}세</p>
    <button @click="username = '이순신'">이름을 '이순신'으로 변경</button> &nbsp;
    <button @click="age++">나이 한 살 추가 (age++)</button>

    <div class="monitor">
      <h3>watchEffect 자동 모니터링</h3>
      <p>{{ logMessage }}</p>
      <small style="color: gray">새로고침하자마자 버튼을 안 눌러도 로그가 이미 찍혀 있다</small>
    </div>
  </div>
</template>

<style scoped>
.monitor {
  margin-top: 10px;
  padding: 10px;
  border: 1px solid var(--color-border);
  border-radius: 6px;
}
</style>
