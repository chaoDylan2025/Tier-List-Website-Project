<script setup>
import { reactive, ref } from 'vue'
import TierListDisplay from '../components/TierListDisplay.vue'
import ModifyTierList from '../components/ModifyTierList.vue'
import DeleteTiers from '../components/DeleteTiers.vue'
import { open_modal_dialog, delete_tiers_modal_dialog, files_arr } from '../front-end-code/customize_screen_functions'
import { add_new_tier, updateTierList, deleteTiers } from '../front-end-code/customize_screen_functions'

const props = defineProps({
    tier_list: Object
})

var current_tier_list = reactive(props.tier_list)
</script>

<template>
    <v-app class="bg-black">
        <v-container>
            <v-row>
                <v-col>
                    <v-btn @click="add_new_tier(current_tier_list)" size="small"> Create new Tier </v-btn>
                </v-col>
                <v-col>
                    <v-btn @click="open_modal_dialog = true" size="small"> Modify Tiers </v-btn>
                </v-col>
                <v-col>
                    <v-btn @click="delete_tiers_modal_dialog = true" size="small"> Delete Tiers </v-btn>
                </v-col>
            </v-row>
        </v-container>

        <TierListDisplay v-model:tier_list="current_tier_list"  v-model:files_arr="files_arr"/>

        <!-- Displays if user wants to customize tier list -->
        <v-dialog
        v-model="open_modal_dialog"
        scrim="white"
        height="auto"
        width="1000">
            <v-container style="background-color: white">
                <ModifyTierList :open_dialog="open_modal_dialog" :tier_list="current_tier_list" @close="(state) => open_modal_dialog = state"
                    @update="updateTierList"/>
            </v-container>
        </v-dialog>

        <!-- Displays if user wants to delete any tier(s) -->
        <DeleteTiers :tier_delete_dialog="delete_tiers_modal_dialog" :tier_list="current_tier_list" @close="(state) =>  delete_tiers_modal_dialog = state"
            @deleteTiers="deleteTiers"/>
    </v-app>
</template>