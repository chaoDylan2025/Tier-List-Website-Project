import { custom_tier_list, default_tier_list } from '../front-end-code/customize_screen_functions'
import { createRouter, createWebHistory } from 'vue-router'

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/CustomTierList',
      name: 'Customization',
      component: () => import('../components/CustomTierList.vue'),
    },
    {
      path: '/CustomizeTierList',
      name: 'CustomTierList',
      component: () => import('../views/CustomizeScreen.vue'),
      props: {tier_list: custom_tier_list}
    },
    {
      path: '/CustomizeTierList',
      name: 'DefaultTierList',
      component: () => import('../views/CustomizeScreen.vue'),
      props: {tier_list: default_tier_list}
    },
  ],
})


export default router