<script setup>
import { ref } from 'vue'
import PropsCard from './PropsCard.vue'

const selectCityName = ref('수원시 영통구')
const areaCode = ref(103)
</script>

<template>
  <div class="practice-section">
    <h2>defineProps()</h2>

    <p>스크립트 변수는 camelCase, 태그 속성은 kebab-case로 적으면 Vue가 이어 준다.</p>
    <p>status와 coordinates는 넘기지 않아 자식의 기본값이 그대로 쓰인다.</p>

    <PropsCard
      :city-name="selectCityName"
      :area-id="areaCode"
      :temperature="24"
      :is-active="true"
      :weekly-forecast="['맑음', '비', '구름']"
      :score="88"
    />

    <button @click="selectCityName = '광주시 북구'">부모 데이터 변경</button>
  </div>
</template>
