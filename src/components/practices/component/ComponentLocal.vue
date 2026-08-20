<script setup>
import BaseButton from './BaseButton.vue'
</script>

<template>
  <div class="practice-section">
    <h2>Component 지역(Local) 등록</h2>

    <p>부모가 import한 자식 컴포넌트는 PascalCase와 kebab-case 두 형태로 쓸 수 있다.</p>

    <BaseButton />
    <base-button></base-button>
  </div>
</template>
