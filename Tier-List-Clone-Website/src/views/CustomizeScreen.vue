<script setup>
import { onMounted, ref } from 'vue'
import TierListDisplay from '../components/TierListDisplay.vue'
import ModifyTierList from '../components/ModifyTierList.vue'
import DeleteTiers from '../components/DeleteTiers.vue'
import { open_modal_dialog, delete_tiers_modal_dialog, default_tier_list, files_arr, add_new_tier } from '../front-end-code/customize_screen_functions'
import { createSessionStorage, updateSessionStorage } from '../front-end-code/customize_screen_functions.js'

var current_tier = ref([])

// Sets up variables for modifying current tier
function setUpTierModificationData(state, index){
    open_modal_dialog.value = state
    current_tier.value = default_tier_list.value[index]
}

// Deletes selected tiers from current tier list
function deleteTiers(state, deleted_tiers){
    const new_tier_list = default_tier_list.value.filter((tier) => {
        if(!deleted_tiers.includes(tier)){
            return tier
        }
    })
    default_tier_list.value = new_tier_list
    updateSessionStorage(default_tier_list.value)
    delete_tiers_modal_dialog.value = state
}

// Access sessionStorage everytime user refreshes page
onMounted(() => {
    if(sessionStorage.getItem("default_tier_list") == null){
        createSessionStorage(default_tier_list.value)
    }
    else{
        const parsed = JSON.parse(sessionStorage.getItem("default_tier_list"))
        default_tier_list.value = parsed
    }
})
</script>

<template>
    <v-app class="bg-black">
        <div style="width: 100%;">
            <v-container>
                <v-row>
                    <v-col class="text-center">
                        <v-btn @click="add_new_tier(default_tier_list)" size="small"> Create new Tier </v-btn>
                    </v-col>
                    <v-col class="text-center">
                        <v-btn @click="delete_tiers_modal_dialog = true" size="small"> Delete Tiers </v-btn>
                    </v-col>
                </v-row>
            </v-container>

            <TierListDisplay v-model:tier_list="default_tier_list"  v-model:files_arr="files_arr" :tier_list_width="1200" :show_files_arr="true" :show_arrow_buttons="true" :show_mod_buttons="true"
            @modify_current_tier="setUpTierModificationData"/>
        </div>

        <!-- Displays if user wants to customize tier list -->
        <v-dialog
        v-model="open_modal_dialog"
        scrollable="true"
        scrim="white"
        height="auto"
        width="1200">
            <v-container style="background-color: white">
                <ModifyTierList :open_dialog="open_modal_dialog" :current_tier="current_tier" :show_exit_button="true" @close="(state) => open_modal_dialog = state"/>
            </v-container>
        </v-dialog>

        <!-- Displays if user wants to delete any tier(s) -->
        <DeleteTiers :tier_delete_dialog="delete_tiers_modal_dialog" :tier_list="default_tier_list" @close="(state) =>  delete_tiers_modal_dialog = state"
            @deleteTiers="deleteTiers"/>
    </v-app>
</template>