<script setup>
import TierListDisplay from '../components/TierListDisplay.vue'
import { watch, ref } from 'vue'

const props = defineProps({
    tier_delete_dialog: Boolean,
    tier_list: Object,
})

var arr_of_tiers_to_delete = ref([])

function update_delete_tiers_arr(arr){
    console.log("arr = ", arr)
    arr_of_tiers_to_delete.value = arr
    console.log("Current tiers to be deleted: ", arr_of_tiers_to_delete)
}

watch (() => arr_of_tiers_to_delete.value, () => {
    console.log("arr_of_tiers_to_delete = ", arr_of_tiers_to_delete.value)
})
</script>

<template>
    <v-app class="bg-black">
        <v-dialog
        v-model="props.tier_delete_dialog"
        height="auto"
        width="1200">
            <v-card>
               <!-- Title for dialog -->
               <v-card-title class="mt-4 text-center"> Select Tier(s) to delete </v-card-title>
               <v-container>
                    <!-- Displays the tier list -->
                    <v-row>
                        <TierListDisplay :tier_list="props.tier_list" :tier_list_width="1125" :show_checkboxes="props.tier_delete_dialog"
                        @delete_tiers="update_delete_tiers_arr"/>
                    </v-row>

                    <!-- Displays the Back and Confirm Buttons -->
                    <v-row>
                        <v-col class="d-flex justify-center">
                            <v-btn class="mr-8" @click="$emit('close', false)">Back</v-btn>
                        </v-col>
                        <v-col class="d-flex justify-center">
                            <v-btn class="ml-8" @click="$emit('deleteTiers', false, arr_of_tiers_to_delete)">Confirm</v-btn>
                        </v-col>
                    </v-row>
               </v-container>
            </v-card>
        </v-dialog>
    </v-app>
</template>