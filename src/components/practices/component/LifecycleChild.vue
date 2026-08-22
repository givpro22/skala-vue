<script setup>
import { ref, onMounted, onUpdated, onUnmounted } from 'vue'

const count = ref(0)
let timerId = null

console.log('1. [setup] 컴포넌트가 메모리에 생성되었습니다. (DOM 접근 불가능)')

onMounted(() => {
  console.log('2. [onMounted] 화면에 부착되었습니다. (API 호출, DOM 조작 적기)')
  timerId = setInterval(() => {
    count.value++
  }, 3000)
})

onUpdated(() => {
  console.log(`3. [onUpdated] 데이터가 변경되어 화면을 새로 그렸습니다. (현재 count: ${count.value})`)
})

onUnmounted(() => {
  // 여기서 타이머를 끄지 않으면 컴포넌트가 사라져도 백그라운드에서 계속 돈다
  clearInterval(timerId)
  console.log('4. [onUnmounted] 컴포넌트가 소멸했습니다. 타이머 청소 완료')
})
</script>

<template>
  <div class="lifecycle-child">
    <p>3초마다 자동으로 증가하는 카운트: {{ count }}</p>
    <button @click="count++">직접 증가</button>
  </div>
</template>

<style scoped>
.lifecycle-child {
  margin-top: 10px;
  padding: 10px;
  border: 1px solid var(--color-accent);
  border-radius: 6px;
}
</style>
