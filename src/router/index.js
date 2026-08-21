import { createRouter, createWebHistory } from 'vue-router'
import WeatherFinalView from '../views/WeatherFinalView.vue'
import WeatherFinalDetailView from '../views/WeatherFinalDetailView.vue'
import Exercise1View from '../views/exercise/Exercise1View.vue'
import Exercise2View from '../views/exercise/Exercise2View.vue'
import Exercise3View from '../views/exercise/Exercise3View.vue'
import WeatherListView from '../views/exercise/WeatherListView.vue'
import WeatherDetailView from '../views/exercise/WeatherDetailView.vue'
import Exercise5ListView from '../views/exercise/Exercise5ListView.vue'
import Exercise5DetailView from '../views/exercise/Exercise5DetailView.vue'
import BasicView from '../views/practice/BasicView.vue'
import DirectiveView from '../views/practice/DirectiveView.vue'
import EventView from '../views/practice/EventView.vue'
import FormStyleView from '../views/practice/FormStyleView.vue'
import CompositionView from '../views/practice/CompositionView.vue'
import ComponentView from '../views/practice/ComponentView.vue'
import PiniaView from '../views/practice/PiniaView.vue'
import NotFoundView from '../views/NotFoundView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'final', component: WeatherFinalView },
    { path: '/final/:id', name: 'final-detail', component: WeatherFinalDetailView },

    { path: '/exercise/1', name: 'exercise-1', component: Exercise1View },
    { path: '/exercise/2', name: 'exercise-2', component: Exercise2View },
    { path: '/exercise/3', name: 'exercise-3', component: Exercise3View },
    { path: '/exercise/4', name: 'exercise-4', component: WeatherListView },
    { path: '/exercise/4/:id', name: 'exercise-4-detail', component: WeatherDetailView },
    { path: '/exercise/5', name: 'exercise-5', component: Exercise5ListView },
    { path: '/exercise/5/:id', name: 'exercise-5-detail', component: Exercise5DetailView },

    { path: '/practice', redirect: '/practice/basic' },
    { path: '/practice/basic', name: 'practice-basic', component: BasicView },
    { path: '/practice/directive', name: 'practice-directive', component: DirectiveView },
    { path: '/practice/event', name: 'practice-event', component: EventView },
    { path: '/practice/form', name: 'practice-form', component: FormStyleView },
    { path: '/practice/composition', name: 'practice-composition', component: CompositionView },
    { path: '/practice/component', name: 'practice-component', component: ComponentView },
    { path: '/practice/pinia', name: 'practice-pinia', component: PiniaView },

    { path: '/:pathMatch(.*)*', name: 'not-found', component: NotFoundView },
  ],
})

export default router
