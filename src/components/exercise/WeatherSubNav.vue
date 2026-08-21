<script setup>
defineProps({
  basePath: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <nav class="weather-sub-nav">
    <router-link :to="basePath">날씨 대시보드</router-link>
    <router-link :to="`${basePath === '/' ? '' : basePath}/about`">서비스 소개</router-link>
    <slot />
  </nav>
</template>

<style scoped>
.weather-sub-nav {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 16px;
  padding: 10px 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 14px;
}

.weather-sub-nav a {
  color: #555;
  text-decoration: none;
}

.weather-sub-nav a.router-link-exact-active {
  color: #42b883;
  font-weight: bold;
}
</style>
