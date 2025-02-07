<script setup>
import router from '@/router';
import ModifyTierList from '../components/ModifyTierList.vue';
import { ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()


const props = defineProps({
    tier_list: Object
})

// Opens dialog for further customization of tier list
var open_customization_screen_dialog = ref(true)
// Contains custom tier list prop
var custom_tier_list = props.tier_list

// Navigates back to the initial screen of creating the custom tier list
function navigateBackToInitialScreen(state){
    open_customization_screen_dialog.value = state
    router.replace('/CustomizeTierList')
}

</script>

<template>
    <ModifyTierList :open_dialog="open_customization_screen_dialog" :tier_list="custom_tier_list" @close="(state) => navigateBackToInitialScreen(state)"/> 
</template>