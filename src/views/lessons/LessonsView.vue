<script setup>
const groups = [
  {
    id: 'final',
    title: '최종본',
    note: '새 단원이 끝날 때마다 고쳐 온 누적본. 실시간 관측값과 Element Plus가 들어가 있다.',
    items: [
      {
        path: '/lessons/final',
        kind: '누적본',
        label: 'Weather Dashboard',
        pages: '',
        desc: '대시보드와 서비스 소개, 도시 상세 세 경로를 스토어 하나로 묶었다',
        source: 'src/views/lessons/final/',
      },
    ],
  },
  {
    id: 'day1',
    title: '1일차',
    note: '2026-08-18',
    items: [
      {
        path: '/lessons/day1/practice/basic',
        kind: '문법 실습',
        label: '기본 문법',
        pages: 'p70-71',
        desc: '일반 변수와 ref의 화면 갱신 차이, 텍스트 보간법 안의 표현식',
        source: 'src/components/practices/basic/',
      },
      {
        path: '/lessons/day1/practice/directive',
        kind: '문법 실습',
        label: '디렉티브',
        pages: 'p74-92',
        desc: 'v-html과 v-text로 시작해 v-bind, 클래스와 스타일 바인딩까지. 2일차로 이어진다',
        source: 'src/components/practices/directive/',
      },
    ],
  },
  {
    id: 'day2',
    title: '2일차',
    note: '2026-08-19',
    items: [
      {
        path: '/lessons/day2/practice/directive',
        kind: '문법 실습',
        label: '디렉티브 (이어서)',
        pages: 'p83-92',
        desc: '단축 문법과 v-if, v-show, v-for, 렌더링을 건너뛰는 네 가지',
        source: 'src/components/practices/directive/',
      },
      {
        path: '/lessons/day2/practice/event',
        kind: '문법 실습',
        label: '이벤트 핸들링',
        pages: 'p94-105',
        desc: '인라인과 메서드 방식, 이벤트 객체, prevent와 stop 수식어',
        source: 'src/components/practices/event/',
      },
      {
        path: '/lessons/day2/practice/form',
        kind: '문법 실습',
        label: '폼 바인딩과 스타일',
        pages: 'p106-115',
        desc: 'v-model 양방향 바인딩과 요소별 초기값 타입, lazy와 number와 trim, scoped',
        source: 'src/components/practices/form/',
      },
      {
        path: '/lessons/day2/exercise-1',
        kind: '과제 1',
        label: 'Weather Mockup',
        pages: 'p116',
        desc: '배운 디렉티브를 한 화면에 모았다. 도시 카드 v-for와 기온 분기, 검색 입력',
        source: 'src/components/exercise/WeatherMockup.vue',
      },
      {
        path: '/lessons/day2/practice/composition',
        kind: '문법 실습',
        label: 'Composition API',
        pages: 'p117-144',
        desc: 'ref와 reactive로 상태를 만들고 computed, watch, watchEffect로 지켜본다',
        source: 'src/components/practices/composition/',
      },
    ],
  },
  {
    id: 'day3',
    title: '3일차',
    note: '2026-08-20',
    items: [
      {
        path: '/lessons/day3/exercise-2',
        kind: '과제 2',
        label: 'Weather Composition',
        pages: 'p145',
        desc: '검색어로 거른 목록을 computed로 만들고 선택 도시와 입력을 watch로 따라간다',
        source: 'src/components/exercise/WeatherComposition.vue',
      },
      {
        path: '/lessons/day3/practice/component',
        kind: '문법 실습',
        label: '컴포넌트와 슬롯',
        pages: 'p146-177',
        desc: '지역과 전역 등록, 라이프사이클 훅, Props와 Emits와 Provide, 슬롯 세 가지',
        source: 'src/components/practices/component/',
      },
      {
        path: '/lessons/day3/exercise-3',
        kind: '과제 3',
        label: 'Weather Component',
        pages: 'p178',
        desc: '한 화면을 다섯 파일로 쪼갰다. 상태는 부모가 쥐고 자식은 이벤트로 올려보낸다',
        source: 'src/components/exercise/WeatherParent.vue',
      },
    ],
  },
  {
    id: 'day4',
    title: '4일차',
    note: '2026-08-21',
    items: [
      {
        path: '/lessons/day4/exercise-4',
        kind: '과제 4',
        label: 'Weather Router',
        pages: 'p196',
        desc: '한 페이지에 쌓아 두던 화면을 경로로 떼어냈다. 지연 로딩과 Catch-all Route',
        source: 'src/views/lessons/exercise/ex4/',
      },
      {
        path: '/lessons/day4/practice/pinia',
        kind: '문법 실습',
        label: 'Pinia 상태 관리',
        pages: 'p197-211',
        desc: 'state와 getters와 actions, Option과 Setup 두 스타일, storeToRefs',
        source: 'src/components/practices/pinia/',
      },
      {
        path: '/lessons/day4/exercise-5',
        kind: '과제 5',
        label: 'Weather Store',
        pages: 'p212',
        desc: '온도 단위를 스토어로 올려 화면 사이를 건너다녀도 설정이 붙어 있게 했다',
        source: 'src/views/lessons/exercise/ex5/',
      },
      {
        path: '/lessons/day4/practice/axios',
        kind: '문법 실습',
        label: 'Axios',
        pages: 'p213-229',
        desc: 'Fetch와 비교한 뒤 GET, POST, PUT, DELETE를 await와 try catch로 돌린다',
        source: 'src/components/practices/library/',
      },
      {
        path: '/lessons/day4/exercise-6',
        kind: '과제 6',
        label: 'Weather Axios',
        pages: 'p230',
        desc: 'Mock Data를 걷어내고 도시 여섯 곳을 axios.all로 한꺼번에 받아 온다',
        source: 'src/views/lessons/exercise/ex6/',
      },
      {
        path: '/lessons/day4/practice/element',
        kind: '문법 실습',
        label: 'Element Plus',
        pages: 'p232-248',
        desc: '폼 검증과 입력 부품, 확인창과 진행률을 라이브러리 컴포넌트로 그린다',
        source: 'src/components/practices/library/',
      },
      {
        path: '/lessons/day4/exercise-7',
        kind: '과제 7',
        label: 'Weather UI Library',
        pages: 'p249',
        desc: '과제 6의 화면을 Element Plus로 다시 그렸다. 24분할 그리드와 스켈레톤',
        source: 'src/views/lessons/exercise/ex7/',
      },
    ],
  },
]
</script>

<template>
  <div class="lessons-view">
    <h1>실습 아카이브</h1>
    <p class="intro">SKALA Vue.js 강의에서 만든 화면을 날짜순으로 모아 뒀다.</p>

    <nav class="day-nav">
      <a v-for="group in groups" :key="group.id" :href="`#${group.id}`">
        {{ group.title }}
        <span class="count">{{ group.items.length }}</span>
      </a>
    </nav>

    <section v-for="group in groups" :id="group.id" :key="group.id" class="day-group">
      <h2>{{ group.title }}</h2>
      <p class="day-note">{{ group.note }}</p>

      <ul class="item-list">
        <li v-for="item in group.items" :key="item.path" class="item">
          <div class="item-head">
            <span class="kind">{{ item.kind }}</span>
            <router-link :to="item.path" class="item-link">{{ item.label }}</router-link>
            <span v-if="item.pages" class="pages">{{ item.pages }}</span>
          </div>
          <p class="desc">{{ item.desc }}</p>
          <p class="source">{{ item.source }}</p>
        </li>
      </ul>
    </section>
  </div>
</template>

<style scoped>
.lessons-view {
  max-width: 900px;
}

.intro {
  margin: 8px 0 20px;
  color: var(--color-text-soft);
}

.day-nav {
  display: flex;
  gap: 14px;
  margin-bottom: 28px;
  padding: 10px 12px;
  border: 1px solid var(--color-border);
  border-radius: 6px;
  background: var(--color-surface);
  font-size: 14px;
}

.day-nav a {
  color: var(--color-text-soft);
  text-decoration: none;
}

.count {
  margin-left: 4px;
  padding: 1px 6px;
  border-radius: 10px;
  background-color: var(--color-surface-mute);
  color: var(--color-text-muted);
  font-size: 12px;
}

.day-group {
  margin-bottom: 36px;
  scroll-margin-top: 20px;
}

.day-group h2 {
  margin-bottom: 2px;
  padding-bottom: 8px;
  border-bottom: 1px solid var(--color-border);
}

.day-note {
  margin: 8px 0 16px;
  color: var(--color-text-muted);
  font-size: 14px;
}

.item-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 12px;
}

.item {
  padding: 14px 16px;
  border: 1px solid var(--color-border);
  border-radius: 6px;
  background: var(--color-surface);
}

.item-head {
  display: flex;
  align-items: baseline;
  flex-wrap: wrap;
  gap: 10px;
}

.kind {
  padding: 2px 8px;
  border-radius: 4px;
  background-color: var(--color-surface-mute);
  color: var(--color-text-soft);
  font-size: 12px;
}

.item-link {
  color: var(--color-accent);
  font-weight: bold;
  text-decoration: none;
}

.pages {
  color: var(--color-text-muted);
  font-size: 13px;
}

.desc {
  margin: 8px 0 0;
  color: var(--color-text-soft);
  font-size: 14px;
}

.source {
  margin: 6px 0 0;
  color: var(--color-text-muted);
  font-family: monospace;
  font-size: 12px;
}
</style>
