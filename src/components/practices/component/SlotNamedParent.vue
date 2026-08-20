<script setup>
import SlotNamedChild from './SlotNamedChild.vue'
</script>

<template>
  <div class="practice-section">
    <h2>Named Slot</h2>

    <p>자리가 여러 개면 slot에 이름을 붙이고, 부모는 template에 v-slot으로 어느 자리인지 지정한다.</p>

    <SlotNamedChild>
      <template v-slot:header>
        <h3>Child 주입 제목</h3>
      </template>

      <p>이름 없는 slot으로 들어가는 본문이다. header로 지정하지 않은 마크업은 전부 여기로 모인다.</p>
    </SlotNamedChild>
  </div>
</template>
