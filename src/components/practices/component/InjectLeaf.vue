<script setup>
import { inject } from 'vue'

const theme = inject('globalTheme')
</script>

<template>
  <div class="leaf" :class="theme">
    <h4>최하위 컴포넌트 (GrandChild)</h4>
    <p>조상이 provide한 값: {{ theme }}</p>
  </div>
</template>

<style scoped>
.leaf {
  padding: 12px;
  border-radius: 6px;
}

.leaf.dark-mode {
  background-color: #333;
  color: white;
}

.leaf.light-mode {
  background-color: #f4f4f4;
  color: #333;
}
</style>
