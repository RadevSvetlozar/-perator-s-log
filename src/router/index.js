import { createWebHistory, createRouter } from 'vue-router'

import Home from '../components/Home.vue'
import Logs from '../components/Logs.vue'
import Log from '../components/LogVue.vue'

const routes = [
  { path: '/', component: Logs },
  { path: '/logs', component: Logs },
  { path: '/new-log', component: Log },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router;