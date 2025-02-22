import { defineStore } from 'pinia'
import { custom_tier_list, default_tier_list } from '../front-end-code/customize_screen_functions'

export const tier_list = defineStore('user', {
  state: () => ({
    default_list: default_tier_list,
    custom_list: custom_tier_list,
  }),
  persist: {
    storage: sessionStorage
  },
})