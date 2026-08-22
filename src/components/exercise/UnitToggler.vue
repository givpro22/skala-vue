<script setup>
import { computed } from 'vue'
import { useConfigStore } from '../../stores/configStore.js'

const configStore = useConfigStore()

const unitLabel = computed(() => (configStore.unit === 'fahrenheit' ? '화씨' : '섭씨'))
</script>

<template>
  <div class="unit-toggler">
    <span>날씨단위: {{ unitLabel }}({{ configStore.unitSymbol }})</span>
    <button @click="configStore.toggleUnit()">단위변경</button>
  </div>
</template>

<style scoped>
.unit-toggler {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-left: auto;
  font-size: 14px;
  color: var(--color-text-soft);
}

.unit-toggler button {
  padding: 4px 10px;
  cursor: pointer;
}
</style>
