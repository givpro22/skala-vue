<script setup>
import InjectLeaf from './InjectLeaf.vue'
</script>

<template>
  <div class="middle">
    <h4>중간 컴포넌트 (Parent)</h4>
    <p>이 컴포넌트는 테마 값을 받지도 넘기지도 않는다. 그냥 자식을 품고만 있다.</p>

    <InjectLeaf />
  </div>
</template>

<style scoped>
.middle {
  margin-top: 10px;
  padding: 12px;
  border: 1px dashed var(--color-border);
  border-radius: 6px;
}
</style>
