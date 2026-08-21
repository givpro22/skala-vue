<script setup>
const groups = [
  { path: '/practice/basic', label: '기본' },
  { path: '/practice/directive', label: '디렉티브' },
  { path: '/practice/event', label: '이벤트' },
  { path: '/practice/form', label: '폼·스타일' },
  { path: '/practice/composition', label: 'Composition' },
  { path: '/practice/component', label: '컴포넌트·슬롯' },
]
</script>

<template>
  <nav class="practice-nav">
    <router-link v-for="group in groups" :key="group.path" :to="group.path">
      {{ group.label }}
    </router-link>
  </nav>
</template>

<style scoped>
.practice-nav {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 20px;
  padding: 10px 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 14px;
}

.practice-nav a {
  color: #555;
  text-decoration: none;
}

.practice-nav a.router-link-active {
  color: #42b883;
  font-weight: bold;
}
</style>
