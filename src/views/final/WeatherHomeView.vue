<script setup>
import WeatherSubNav from '../../components/exercise/WeatherSubNav.vue'
import UnitToggler from '../../components/exercise/UnitToggler.vue'
import WeatherFinal from '../../components/exercise/WeatherFinal.vue'
</script>

<template>
  <div class="weather-final-home">
    <h1>⛅ 최종본: 날씨 대시보드</h1>
    <hr />

    <WeatherSubNav base-path="/">
      <UnitToggler />
    </WeatherSubNav>

    <WeatherFinal />
  </div>
</template>
