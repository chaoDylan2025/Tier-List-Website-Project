import { createRouter, createWebHistory } from 'vue-router'
import CustomizeScreen from '../views/CustomizeScreen.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/CustomizeTierList',
      name: 'CustomizeTierList',
      component: () => import('../views/CustomizeScreen.vue')
    },
  ],
})

export default router
