<script setup>
import SlotDefaultChild from './SlotDefaultChild.vue'
</script>

<template>
  <div class="practice-section">
    <h2>Default Slot</h2>

    <p>자식이 비워 둔 자리에 부모가 마크업을 밀어 넣는다. 아무것도 안 넣으면 slot 태그 안의 내용이 그대로 남는다.</p>

    <SlotDefaultChild>
      <p>단순한 텍스트 문장을 주입합니다.</p>
    </SlotDefaultChild>

    <SlotDefaultChild>
      <h3 style="color: #e74c3c">경고 상태</h3>
      <button>확인</button>
    </SlotDefaultChild>

    <SlotDefaultChild></SlotDefaultChild>
  </div>
</template>
