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
        width="auto">
            <v-card>
               <TierListDisplay :tier_list="props.tier_list" :show_checkboxes="props.tier_delete_dialog" :tiers_to_delete="arr_of_tiers_to_delete"
               @delete_tiers="update_delete_tiers_arr"/>

                <v-row class="mt-8">
                    <v-btn @click="$emit('close', false)">Back</v-btn>
                    <v-btn @click="$emit('changeTierName', false)">Confirm</v-btn>
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