<script setup>
import { useRoute } from 'vue-router'

// 디렉티브는 1일차에 시작해 2일차에 끝나서 라우터에 경로가 두 개 걸려 있다.
// 목록 화면과 같은 방식으로 2일차 쪽을 이어서 항목으로 따로 적는다
const days = [
  {
    id: 'day1',
    label: '1일차',
    items: [
      { path: '/lessons/day1/practice/basic', label: '기본' },
      { path: '/lessons/day1/practice/directive', label: '디렉티브' },
    ],
  },
  {
    id: 'day2',
    label: '2일차',
    items: [
      { path: '/lessons/day2/practice/directive', label: '디렉티브 (이어서)' },
      { path: '/lessons/day2/practice/event', label: '이벤트' },
      { path: '/lessons/day2/practice/form', label: '폼과 스타일' },
      { path: '/lessons/day2/practice/composition', label: 'Composition' },
    ],
  },
  {
    id: 'day3',
    label: '3일차',
    items: [{ path: '/lessons/day3/practice/component', label: '컴포넌트와 슬롯' }],
  },
  {
    id: 'day4',
    label: '4일차',
    items: [
      { path: '/lessons/day4/practice/pinia', label: 'Pinia' },
      { path: '/lessons/day4/practice/axios', label: 'Axios' },
      { path: '/lessons/day4/practice/element', label: 'Element Plus' },
    ],
  },
]

const route = useRoute()
</script>

<template>
  <nav class="practice-nav">
    <router-link to="/lessons" class="archive-link">아카이브</router-link>

    <div v-for="day in days" :key="day.id" class="day">
      <span class="day-label">{{ day.label }}</span>
      <router-link
        v-for="item in day.items"
        :key="item.path"
        :to="item.path"
        :class="{ current: item.path === route.path }"
      >
        {{ item.label }}
      </router-link>
    </div>
  </nav>
</template>

<style scoped>
.practice-nav {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px 14px;
  margin-bottom: 20px;
  padding: 8px 12px;
  border: 1px solid var(--color-border);
  border-radius: 6px;
  background: var(--color-surface);
  font-size: 14px;
}

.archive-link {
  padding-right: 14px;
  border-right: 1px solid var(--color-border-strong);
  color: var(--color-text);
  font-weight: bold;
  text-decoration: none;
}

.day {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 4px 10px;
}

.day-label {
  padding: 1px 7px;
  border-radius: 10px;
  background-color: var(--color-surface-mute);
  color: var(--color-text-muted);
  font-size: 12px;
  white-space: nowrap;
}

.practice-nav a {
  color: var(--color-text-soft);
  text-decoration: none;
  white-space: nowrap;
}

.practice-nav a:hover {
  color: var(--color-accent-hover);
}

.practice-nav a.current {
  color: var(--color-accent);
  font-weight: bold;
}
</style>
