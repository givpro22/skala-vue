<script setup>
import { useOptionCounterStore } from '../../../stores/optionCounter.js'

const counter = useOptionCounterStore()
</script>

<template>
  <div class="practice-section">
    <h2>defineStore() Option 스타일</h2>

    <p>state는 데이터, getters는 계산된 값, actions는 state를 고치는 함수다. 컴포넌트 밖에 있어서 어느 화면에서 꺼내 써도 같은 값을 본다.</p>

    <p>count: {{ counter.count }} (step {{ counter.step }})</p>
    <p>doubleCount: {{ counter.doubleCount }}</p>
    <p>isEven: {{ counter.isEven }}</p>

    <button @click="counter.increment()">증가</button>
    <button @click="counter.decrement()">감소</button>
    <button @click="counter.reset()">초기화</button>
    <button @click="counter.step = counter.step === 1 ? 5 : 1">step 바꾸기</button>
  </div>
</template>
