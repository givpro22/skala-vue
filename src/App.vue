<script setup>
const menus = [
  { path: '/', label: '최종본' },
  { path: '/exercise/1', label: '과제 1' },
  { path: '/exercise/2', label: '과제 2' },
  { path: '/exercise/3', label: '과제 3' },
  { path: '/exercise/4', label: '과제 4' },
  { path: '/exercise/5', label: '과제 5' },
  { path: '/practice', label: '문법 실습' },
]
</script>

<template>
  <div class="app-shell">
    <nav class="main-nav">
      <router-link v-for="menu in menus" :key="menu.path" :to="menu.path">
        {{ menu.label }}
      </router-link>
    </nav>

    <router-view />
  </div>
</template>

<style scoped>
.app-shell {
  padding: 20px;
}

.main-nav {
  display: flex;
  flex-wrap: wrap;
  gap: 18px;
  margin-bottom: 20px;
  padding-bottom: 12px;
  border-bottom: 1px solid #ddd;
}

.main-nav a {
  color: #555;
  text-decoration: none;
}

.main-nav a.router-link-active {
  color: #42b883;
  font-weight: bold;
}
</style>
