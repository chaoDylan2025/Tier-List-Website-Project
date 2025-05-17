<script setup>
import { onMounted, ref } from 'vue'
import TierListDisplay from '../components/TierListDisplay.vue'
import ModifyTierList from '../components/ModifyTierList.vue'
import DeleteTiers from '../components/DeleteTiers.vue'
import { open_modal_dialog, delete_tiers_modal_dialog, files_arr } from '../front-end-code/customize_screen_functions'
import { add_new_tier, updateTierList, deleteTiers } from '../front-end-code/customize_screen_functions'
import { saveToSessionStorage, updateSessionStorage } from '../front-end-code/customize_screen_functions.js'

const props = defineProps({
    tier_list_name: String,
    tier_list: Object,
    show_files_arr: Boolean,
})

var current_tier_list_name = ref(props.tier_list_name)
var current_tier_list = ref(props.tier_list)

// Access sessionStorage everytime user refreshes page
onMounted(() => {
    //console.log("Before accessing session storage: ", current_tier_list.value)
    saveToSessionStorage(current_tier_list_name.value, current_tier_list.value)
    const parsed = JSON.parse(sessionStorage.getItem(current_tier_list_name.value))
    current_tier_list.value = parsed
    //console.log("After accessing session storage: ", current_tier_list.value)
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
                        <v-btn @click="open_modal_dialog = true" size="small"> Modify Tiers </v-btn>
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
                <ModifyTierList :open_dialog="open_modal_dialog" :tier_list="current_tier_list" :show_exit_button="true" @close="(state) => open_modal_dialog = state"
                    @update="updateTierList"/>
            </v-container>
        </v-dialog>

        <!-- Displays if user wants to delete any tier(s) -->
        <DeleteTiers :tier_delete_dialog="delete_tiers_modal_dialog" :tier_list="current_tier_list" @close="(state) =>  delete_tiers_modal_dialog = state"
            @deleteTiers="deleteTiers"/>
    </v-app>
</template>