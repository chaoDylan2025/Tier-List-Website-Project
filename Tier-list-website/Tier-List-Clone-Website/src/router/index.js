import { custom_tier_list, default_tier_list } from '../front-end-code/customize_screen_functions'
import { createRouter, createWebHistory, useRoute } from 'vue-router'

const route = useRoute()

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/CustomizeTierList',
      name: 'CustomTierList',
      component: () => import('../components/CustomTierList.vue'),
      props: {open_custom_tier_list_dialog: true, tier_list: custom_tier_list}
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