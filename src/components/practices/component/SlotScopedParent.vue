<script setup>
import SlotScopedChild from './SlotScopedChild.vue'
</script>

<template>
  <div class="practice-section">
    <h2>Scoped Slot</h2>

    <p>슬롯은 부모가 마크업을 주지만, 그릴 데이터는 자식이 가지고 있다. 자식이 slot 속성으로 값을 올려 주면 부모가 받아 배치한다.</p>

    <h3>상위 컴포넌트 (Parent)</h3>

    <SlotScopedChild v-slot="slotBag">
      <div class="display-panel">
        <p>알림 메시지: {{ slotBag.text }}</p>
        <p>접속자 수: {{ slotBag.count }}명</p>
      </div>
    </SlotScopedChild>

    <SlotScopedChild></SlotScopedChild>
  </div>
</template>

<style scoped>
.display-panel {
  padding: 10px;
  border-radius: 4px;
  background-color: var(--color-surface-mute);
}
</style>
