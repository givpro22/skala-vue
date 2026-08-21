<script setup>
import { storeToRefs } from 'pinia'
import { useOptionCounterStore } from '../../../stores/optionCounter.js'

const counter = useOptionCounterStore()

// 그냥 구조분해하면 값만 복사돼 반응성이 끊긴다
const { count: brokenCount } = counter

// storeToRefs로 꺼내면 ref 상태를 유지한다
const { count: liveCount, doubleCount } = storeToRefs(counter)
</script>

<template>
  <div class="practice-section">
    <h2>storeToRefs()</h2>

    <p>store를 그대로 구조분해하면 그 순간의 값만 떨어져 나온다. 화면이 갱신되지 않는 쪽과 갱신되는 쪽을 나란히 두고 비교한다.</p>

    <p>store.count: {{ counter.count }}</p>
    <p>구조분해한 값: {{ brokenCount }} (증가시켜도 그대로다)</p>
    <p>storeToRefs로 꺼낸 값: {{ liveCount }}</p>
    <p>storeToRefs로 꺼낸 getter: {{ doubleCount }}</p>

    <button @click="counter.increment()">증가</button>
  </div>
</template>
