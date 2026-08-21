<script setup>
import PiniaShareLeft from './PiniaShareLeft.vue'
import PiniaShareRight from './PiniaShareRight.vue'
</script>

<template>
  <div class="practice-section">
    <h2>여러 컴포넌트가 store 공유</h2>

    <p>두 컴포넌트는 부모 자식 관계가 아니고 props도 주고받지 않는다. 같은 store를 꺼내 쓰기 때문에 한쪽에서 고치면 다른 쪽이 따라 바뀐다.</p>

    <div class="share-row">
      <PiniaShareLeft />
      <PiniaShareRight />
    </div>
  </div>
</template>

<style scoped>
.share-row {
  display: flex;
  gap: 12px;
}
</style>
