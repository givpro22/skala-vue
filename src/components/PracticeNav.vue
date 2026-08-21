<script setup>
import { useRoute } from 'vue-router'

const groups = [
  { path: '/lessons', label: '아카이브' },
  { path: '/lessons/day1/practice/basic', label: '기본' },
  { path: '/lessons/day1/practice/directive', label: '디렉티브' },
  { path: '/lessons/day2/practice/event', label: '이벤트' },
  { path: '/lessons/day2/practice/form', label: '폼과 스타일' },
  { path: '/lessons/day2/practice/composition', label: 'Composition' },
  { path: '/lessons/day3/practice/component', label: '컴포넌트와 슬롯' },
  { path: '/lessons/day4/practice/pinia', label: 'Pinia' },
  { path: '/lessons/day4/practice/axios', label: 'Axios' },
  { path: '/lessons/day4/practice/element', label: 'Element Plus' },
]

const route = useRoute()

// 디렉티브는 1일차와 2일차 두 경로가 같은 화면을 가리킨다.
// 색인은 1일차 쪽만 걸고 있어서 주소를 통째로 비교하면 2일차에서 강조가 풀린다
const unitOf = (path) => path.split('/').pop()
</script>

<template>
  <nav class="practice-nav">
    <router-link
      v-for="group in groups"
      :key="group.path"
      :to="group.path"
      :class="{ current: unitOf(group.path) === unitOf(route.path) }"
    >
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

.practice-nav a.current {
  color: #42b883;
  font-weight: bold;
}
</style>
