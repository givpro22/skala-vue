<script setup>
import { useCounterStore } from '../../../stores/counter.js'

const counter = useCounterStore()
</script>

<template>
  <div class="practice-section">
    <h2>defineStore() Setup 스타일</h2>

    <p>ref가 state, computed가 getters, 일반 함수가 actions 자리를 대신한다. script setup을 쓰던 방식 그대로 store를 짤 수 있다.</p>

    <p>count: {{ counter.count }}</p>
    <p>doubleCount: {{ counter.doubleCount }}</p>

    <button @click="counter.increment()">증가</button>
  </div>
</template>
