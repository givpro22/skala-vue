<script setup>
import { ref } from 'vue'
import LifecycleChild from './LifecycleChild.vue'

const isVisible = ref(true)
</script>

<template>
  <div class="practice-section">
    <h2>Component Lifecycle Hook</h2>

    <button @click="isVisible = !isVisible">
      {{ isVisible ? '자식 컴포넌트 제거 (onUnmounted 확인)' : '자식 컴포넌트 생성 (setup, onMounted 확인)' }}
    </button>

    <LifecycleChild v-if="isVisible" />

    <small style="color: gray">브라우저 콘솔에서 생성, 부착, 갱신, 소멸 순서를 확인</small>
  </div>
</template>
