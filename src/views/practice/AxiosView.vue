<script setup>
import PracticeNav from '../../components/PracticeNav.vue'
import AxiosWeather from '../../components/practices/library/AxiosWeather.vue'
import AxiosJson from '../../components/practices/library/AxiosJson.vue'
</script>

<template>
  <div class="practice-view">
    <PracticeNav />

    <h1>문법 실습: Axios</h1>
    <hr />

    <AxiosWeather />
    <AxiosJson />
  </div>
</template>
