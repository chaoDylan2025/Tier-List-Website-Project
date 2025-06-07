<script setup>
import { onMounted, ref } from 'vue'
import TierListDisplay from '../components/TierListDisplay.vue'
import ModifyTierList from '../components/ModifyTierList.vue'
import DeleteTiers from '../components/DeleteTiers.vue'
import { open_modal_dialog, delete_tiers_modal_dialog, files_arr } from '../front-end-code/customize_screen_functions'
import { add_new_tier, updateTierList } from '../front-end-code/customize_screen_functions'
import { createSessionStorage, updateSessionStorage } from '../front-end-code/customize_screen_functions.js'

const props = defineProps({
    tier_list_name: String,
    tier_list: Object,
    show_files_arr: Boolean,
})

var current_tier_list_name = ref(props.tier_list_name)
var current_tier_list = ref(props.tier_list)

// Deletes selected tiers from current tier list
function deleteTiers(state, deleted_tiers){
    const new_tier_list = current_tier_list.value.filter((tier) => {
        if(!deleted_tiers.includes(tier)){
            return tier
        }
    })
    current_tier_list.value = new_tier_list
    updateSessionStorage(current_tier_list_name.value, current_tier_list.value)
    delete_tiers_modal_dialog.value = state
}

// Access sessionStorage everytime user refreshes page
onMounted(() => {
    if(sessionStorage.getItem(current_tier_list_name.value) == null){
        createSessionStorage(current_tier_list_name, current_tier_list)
    }
    else{
        const parsed = JSON.parse(sessionStorage.getItem(current_tier_list_name.value))
        current_tier_list.value = parsed
    }
})
</script>

<template>
    <v-app class="bg-black">
        <div style="width: 100%;">
            <v-container>
                <v-row>
                    <v-col class="text-center">
                        <v-btn @click="add_new_tier(current_tier_list)" size="small"> Create new Tier </v-btn>
                    </v-col>
                    <v-col class="text-center">
                        <v-btn @click="delete_tiers_modal_dialog = true" size="small"> Delete Tiers </v-btn>
                    </v-col>
                </v-row>
            </v-container>

            <TierListDisplay :tier_list_name="current_tier_list_name" v-model:tier_list="current_tier_list"  v-model:files_arr="files_arr" show_files_arr="props.show_files_arr"/>
        </div>

        <!-- Displays if user wants to customize tier list -->
        <v-dialog
        v-model="open_modal_dialog"
        scrim="white"
        height="auto"
        width="1000">
            <v-container style="background-color: white">
                <ModifyTierList :open_dialog="open_modal_dialog" :tier_list="current_tier_list" :tier_list_name="current_tier_list_name" :show_exit_button="true" @close="(state) => open_modal_dialog = state"/>
            </v-container>
        </v-dialog>

        <!-- Displays if user wants to delete any tier(s) -->
        <DeleteTiers :tier_list_name="props.tier_list_name" :tier_delete_dialog="delete_tiers_modal_dialog" :tier_list="current_tier_list" @close="(state) =>  delete_tiers_modal_dialog = state"
            @deleteTiers="deleteTiers"/>
    </v-app>
</template>