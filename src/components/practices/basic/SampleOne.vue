<script setup>
import { ref } from 'vue'

// ref 로 감싸지 않은 변수는 값이 바뀌어도 화면이 갱신되지 않는다
let normalCount = 0
const vueCount = ref(0)
</script>

<template>
  <div class="practice-section">
    <h2>Hello Skala-Vue</h2>

    <h3>일반 변수 클릭: {{ normalCount }}</h3>
    <button @click="normalCount++">일반 변수 증가</button>
    <br />

    <h3>Vue 반응성 변수 클릭: {{ vueCount }}</h3>
    <button @click="vueCount++">Vue 변수 증가</button>
  </div>
</template>
