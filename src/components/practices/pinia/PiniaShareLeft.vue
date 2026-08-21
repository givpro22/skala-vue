<script setup>
import { useOptionCounterStore } from '../../../stores/optionCounter.js'

const counter = useOptionCounterStore()
</script>

<template>
  <div class="share-box">
    <h4>왼쪽 컴포넌트</h4>
    <p>여기서 본 count: {{ counter.count }}</p>
    <button @click="counter.increment()">여기서 증가</button>
  </div>
</template>

<style scoped>
.share-box {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 6px;
}

.share-box h4 {
  margin: 0 0 8px;
}
</style>
