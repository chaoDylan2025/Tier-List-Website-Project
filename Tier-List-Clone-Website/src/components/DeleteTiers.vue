<script setup>
import TierListDisplay from '../components/TierListDisplay.vue'
import {ref, computed} from 'vue'

const props = defineProps({
    tier_delete_dialog: Boolean,
    tier_list: Object,
})

var arr_of_tiers_to_delete = ref([])

function update_delete_tiers_arr(arr){
    arr_of_tiers_to_delete.value = arr
}
</script>

<template>
    <v-app class="bg-black">
        <v-dialog
        v-model="props.tier_delete_dialog"
        height="auto"
        width="500">
            <v-card>
               <v-card-title class="mt-4 text-center"> Select Tier(s) to delete </v-card-title>
               <TierListDisplay :tier_list="props.tier_list" :show_checkboxes="props.tier_delete_dialog" :tiers_to_delete="arr_of_tiers_to_delete"
               @delete_tiers="update_delete_tiers_arr"/>

                <v-row class="mt-8">
                    <v-spacer></v-spacer>
                    <v-btn class="mr-5" @click="$emit('close', false)">Back</v-btn>
                    <v-btn class="mr-5" @click="$emit('deleteTiers', false, arr_of_tiers_to_delete)">Confirm</v-btn>
                </v-row>
            </v-card>
        </v-dialog>
    </v-app>
</template>

<style lang="css">
/* Styling for Default Tier List border */
.tier-border{
    border-style: solid;
    border-color: black;
    border-width: 2px;
}
</style>