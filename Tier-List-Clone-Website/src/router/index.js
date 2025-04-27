import { custom_tier_list, default_tier_list } from '../front-end-code/customize_screen_functions'
import { createRouter, createWebHistory } from 'vue-router'

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      // Navigates to the CustomTierList Component
      path: '/CreateCustomTierList',
      name: 'Customization',
      component: () => import('../components/CustomTierList.vue'),
    },
    {
      // Navigates to the CustomizeScreen Component with custom_tier_list passed as a prop
      path: '/CustomTierList',
      name: 'CustomTierList',
      component: () => import('../views/CustomizeScreen.vue'),
      props: {tier_list_name: 'custom_tier_list', tier_list: custom_tier_list.value}
    },
    {
      // Navigates to the CustomizeScreen Component with default_tier_list passed as a prop
      path: '/DefaultList',
      name: 'DefaultTierList',
      component: () => import('../views/CustomizeScreen.vue'),
      props: {tier_list_name: 'default_tier_list', tier_list: default_tier_list.value}
    },
  ],
})


export default router