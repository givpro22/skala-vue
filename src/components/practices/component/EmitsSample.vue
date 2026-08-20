<script setup>
import { ref } from 'vue'
import EmitsCard from './EmitsCard.vue'

const selectedCityInfo = ref('카드를 클릭해 보세요.')
const receivedMessage = ref('아직 받은 메시지가 없습니다.')

const receiveCitySignal = (cityName) => {
  selectedCityInfo.value = `${cityName}이(가) 선택되었습니다.`
}

const receiveMessage = (message) => {
  receivedMessage.value = message
  console.log('자식으로부터 받은 메시지:', message)
}
</script>

<template>
  <div class="practice-section">
    <h2>defineEmits()</h2>

    <p>이벤트 이름은 kebab-case로 등록하고, 부모는 골뱅이로 받는다.</p>

    <EmitsCard
      city-name="서울"
      status="맑음"
      @select-city="receiveCitySignal"
      @send-message="receiveMessage"
    />
    <EmitsCard
      city-name="수원"
      status="비"
      @select-city="receiveCitySignal"
      @send-message="receiveMessage"
    />

    <div class="status-bar">
      <p>{{ selectedCityInfo }}</p>
      <p>{{ receivedMessage }}</p>
    </div>
  </div>
</template>

<style scoped>
.status-bar {
  margin-top: 12px;
  padding: 10px;
  border-radius: 6px;
  background-color: #333;
  color: white;
}
</style>
