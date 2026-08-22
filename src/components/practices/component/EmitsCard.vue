<script setup>
defineProps({
  cityName: String,
  status: String,
})

const emit = defineEmits(['select-city', 'send-message'])

const handleCardClick = (name) => {
  emit('select-city', name)
}

const sendToParent = () => {
  emit('send-message', '안녕하세요, 부모 컴포넌트!')
}
</script>

<template>
  <div class="emits-card" @click="handleCardClick(cityName)">
    <h4>{{ cityName }} ({{ status }})</h4>
    <p>카드를 누르면 부모에게 도시 이름을 실어 보낸다.</p>
    <button @click.stop="sendToParent">메시지만 따로 보내기</button>
  </div>
</template>

<style scoped>
.emits-card {
  margin-top: 10px;
  padding: 12px;
  border: 1px solid var(--color-border);
  border-radius: 6px;
  cursor: pointer;
}
</style>
