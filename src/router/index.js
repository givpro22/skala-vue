import { createRouter, createWebHistory } from 'vue-router'
import WeatherHomeView from '../views/final/WeatherHomeView.vue'

// 첫 화면만 미리 싣고 나머지는 지연 로딩으로 걸어 둔다.
// 해당 경로에 처음 들어갈 때 그 화면의 청크만 따로 내려받는다
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: WeatherHomeView },
    { path: '/about', name: 'about', component: () => import('../views/final/WeatherAboutView.vue') },
    {
      path: '/weather/:cityId',
      name: 'weather-detail',
      component: () => import('../views/final/WeatherDetailView.vue'),
    },

    {
      path: '/exercise/1',
      name: 'exercise-1',
      component: () => import('../views/exercise/Exercise1View.vue'),
    },
    {
      path: '/exercise/2',
      name: 'exercise-2',
      component: () => import('../views/exercise/Exercise2View.vue'),
    },
    {
      path: '/exercise/3',
      name: 'exercise-3',
      component: () => import('../views/exercise/Exercise3View.vue'),
    },

    {
      path: '/exercise/4',
      name: 'exercise-4',
      component: () => import('../views/exercise/ex4/WeatherHomeView.vue'),
    },
    {
      path: '/exercise/4/about',
      name: 'exercise-4-about',
      component: () => import('../views/exercise/ex4/WeatherAboutView.vue'),
    },
    {
      path: '/exercise/4/weather/:cityId',
      name: 'exercise-4-detail',
      component: () => import('../views/exercise/ex4/WeatherDetailView.vue'),
    },

    {
      path: '/exercise/5',
      name: 'exercise-5',
      component: () => import('../views/exercise/ex5/WeatherHomeView.vue'),
    },
    {
      path: '/exercise/5/about',
      name: 'exercise-5-about',
      component: () => import('../views/exercise/ex5/WeatherAboutView.vue'),
    },
    {
      path: '/exercise/5/weather/:cityId',
      name: 'exercise-5-detail',
      component: () => import('../views/exercise/ex5/WeatherDetailView.vue'),
    },

    { path: '/practice', redirect: '/practice/basic' },
    {
      path: '/practice/basic',
      name: 'practice-basic',
      component: () => import('../views/practice/BasicView.vue'),
    },
    {
      path: '/practice/directive',
      name: 'practice-directive',
      component: () => import('../views/practice/DirectiveView.vue'),
    },
    {
      path: '/practice/event',
      name: 'practice-event',
      component: () => import('../views/practice/EventView.vue'),
    },
    {
      path: '/practice/form',
      name: 'practice-form',
      component: () => import('../views/practice/FormStyleView.vue'),
    },
    {
      path: '/practice/composition',
      name: 'practice-composition',
      component: () => import('../views/practice/CompositionView.vue'),
    },
    {
      path: '/practice/component',
      name: 'practice-component',
      component: () => import('../views/practice/ComponentView.vue'),
    },
    {
      path: '/practice/pinia',
      name: 'practice-pinia',
      component: () => import('../views/practice/PiniaView.vue'),
    },
    {
      path: '/practice/axios',
      name: 'practice-axios',
      component: () => import('../views/practice/AxiosView.vue'),
    },

    // 위 라우트와 매칭되지 않는 모든 경로를 NotFoundView로 보낸다
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('../views/NotFoundView.vue'),
    },
  ],
})

export default router
