import { createRouter, createWebHistory } from 'vue-router'
import MainHomeView from '../views/MainHomeView.vue'

// 첫 화면만 미리 싣고 나머지는 지연 로딩으로 걸어 둔다.
// 해당 경로에 처음 들어갈 때 그 화면의 청크만 따로 내려받는다
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: MainHomeView },

    {
      path: '/lessons',
      name: 'lessons',
      component: () => import('../views/lessons/LessonsView.vue'),
    },

    { path: '/lessons/day1', redirect: '/lessons#day1' },
    { path: '/lessons/day2', redirect: '/lessons#day2' },
    { path: '/lessons/day3', redirect: '/lessons#day3' },
    { path: '/lessons/day4', redirect: '/lessons#day4' },

    {
      path: '/lessons/final',
      name: 'final',
      component: () => import('../views/lessons/final/WeatherHomeView.vue'),
    },
    {
      path: '/lessons/final/about',
      name: 'final-about',
      component: () => import('../views/lessons/final/WeatherAboutView.vue'),
    },
    {
      path: '/lessons/final/weather/:cityId',
      name: 'final-detail',
      component: () => import('../views/lessons/final/WeatherDetailView.vue'),
    },

    {
      path: '/lessons/day1/practice/basic',
      name: 'day1-basic',
      component: () => import('../views/lessons/practice/BasicView.vue'),
    },
    // 디렉티브는 1일차에 시작해 2일차에 끝나서 두 경로가 같은 화면을 가리킨다
    {
      path: '/lessons/day1/practice/directive',
      name: 'day1-directive',
      component: () => import('../views/lessons/practice/DirectiveView.vue'),
    },
    {
      path: '/lessons/day2/practice/directive',
      name: 'day2-directive',
      component: () => import('../views/lessons/practice/DirectiveView.vue'),
    },
    {
      path: '/lessons/day2/practice/event',
      name: 'day2-event',
      component: () => import('../views/lessons/practice/EventView.vue'),
    },
    {
      path: '/lessons/day2/practice/form',
      name: 'day2-form',
      component: () => import('../views/lessons/practice/FormStyleView.vue'),
    },
    {
      path: '/lessons/day2/practice/composition',
      name: 'day2-composition',
      component: () => import('../views/lessons/practice/CompositionView.vue'),
    },
    {
      path: '/lessons/day2/exercise-1',
      name: 'exercise-1',
      component: () => import('../views/lessons/exercise/Exercise1View.vue'),
    },

    {
      path: '/lessons/day3/practice/component',
      name: 'day3-component',
      component: () => import('../views/lessons/practice/ComponentView.vue'),
    },
    {
      path: '/lessons/day3/exercise-2',
      name: 'exercise-2',
      component: () => import('../views/lessons/exercise/Exercise2View.vue'),
    },
    {
      path: '/lessons/day3/exercise-3',
      name: 'exercise-3',
      component: () => import('../views/lessons/exercise/Exercise3View.vue'),
    },

    {
      path: '/lessons/day4/practice/pinia',
      name: 'day4-pinia',
      component: () => import('../views/lessons/practice/PiniaView.vue'),
    },
    {
      path: '/lessons/day4/practice/axios',
      name: 'day4-axios',
      component: () => import('../views/lessons/practice/AxiosView.vue'),
    },
    {
      path: '/lessons/day4/practice/element',
      name: 'day4-element',
      component: () => import('../views/lessons/practice/ElementView.vue'),
    },

    {
      path: '/lessons/day4/exercise-4',
      name: 'exercise-4',
      component: () => import('../views/lessons/exercise/ex4/WeatherHomeView.vue'),
    },
    {
      path: '/lessons/day4/exercise-4/about',
      name: 'exercise-4-about',
      component: () => import('../views/lessons/exercise/ex4/WeatherAboutView.vue'),
    },
    {
      path: '/lessons/day4/exercise-4/weather/:cityId',
      name: 'exercise-4-detail',
      component: () => import('../views/lessons/exercise/ex4/WeatherDetailView.vue'),
    },

    {
      path: '/lessons/day4/exercise-5',
      name: 'exercise-5',
      component: () => import('../views/lessons/exercise/ex5/WeatherHomeView.vue'),
    },
    {
      path: '/lessons/day4/exercise-5/about',
      name: 'exercise-5-about',
      component: () => import('../views/lessons/exercise/ex5/WeatherAboutView.vue'),
    },
    {
      path: '/lessons/day4/exercise-5/weather/:cityId',
      name: 'exercise-5-detail',
      component: () => import('../views/lessons/exercise/ex5/WeatherDetailView.vue'),
    },

    {
      path: '/lessons/day4/exercise-6',
      name: 'exercise-6',
      component: () => import('../views/lessons/exercise/ex6/WeatherHomeView.vue'),
    },
    {
      path: '/lessons/day4/exercise-6/about',
      name: 'exercise-6-about',
      component: () => import('../views/lessons/exercise/ex6/WeatherAboutView.vue'),
    },
    {
      path: '/lessons/day4/exercise-6/weather/:cityId',
      name: 'exercise-6-detail',
      component: () => import('../views/lessons/exercise/ex6/WeatherDetailView.vue'),
    },

    {
      path: '/lessons/day4/exercise-7',
      name: 'exercise-7',
      component: () => import('../views/lessons/exercise/ex7/WeatherHomeView.vue'),
    },
    {
      path: '/lessons/day4/exercise-7/about',
      name: 'exercise-7-about',
      component: () => import('../views/lessons/exercise/ex7/WeatherAboutView.vue'),
    },
    {
      path: '/lessons/day4/exercise-7/weather/:cityId',
      name: 'exercise-7-detail',
      component: () => import('../views/lessons/exercise/ex7/WeatherDetailView.vue'),
    },

    {
      path: '/troubleshooting',
      name: 'troubleshooting',
      component: () => import('../views/TroubleshootingView.vue'),
    },

    // 위 라우트와 매칭되지 않는 모든 경로를 NotFoundView로 보낸다
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('../views/NotFoundView.vue'),
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    if (to.hash) return { el: to.hash, behavior: 'smooth' }
    return { top: 0 }
  },
})

export default router
