<script setup>
import draggable from 'vuedraggable'
import { ref, computed, watch } from 'vue'
import {default_tier_list, open_modal_dialog, delete_tiers_modal_dialog, files_arr} from '../front-end-code/customize_screen_functions'
import {add_new_tier, updateTierList, deleteTiers, uploadToImageContainer} from '../front-end-code/customize_screen_functions'

const emit = defineEmits(['open_tier_name_mod', 'open_tier_color_mod', 'delete_tiers', 'update_tier_images'])
const props = defineProps({
    tier_list: Object,
    current_tier_images: Array,
    show_mod_buttons: Boolean,
    show_checkboxes: Boolean,
    delete_tiers_arr: Array
})

var tiers_to_delete_arr = ref([])
const drag = ref(false)

// Executes emit event when user clicks on button that modifies selected tier's name
function open_tier_name_mod_dialog(index, props){
    emit('open_tier_name_mod', index, props)
}

// Executes emit event when user clicks on button that modifies selected tier's color
function open_tier_color_mod_dialog(index, props){
    emit('open_tier_color_mod', index, props)
}

// Executes emit event when user selects a tier that they want to delete or remove from array
function update_delete_tiers_arr(arr, index){
    emit('delete_tiers', arr, index)
}

// Executes emit event when user drags image into a tier
function update_tier_imgs(img_arr){
    emit('update_tier_images', img_arr)
}

// Watches for 
watch (() => tiers_to_delete_arr.value, (new_arr) => {
    update_delete_tiers_arr(new_arr)
})
</script>

<template>
    <!-- Contains tier list structure -->
    <v-container class="ml-5 mt-10 d-print-inline px-10 mb-10 h-auto">
        <!-- Iterates through an object that contains tier list -->
        <v-row class="d-flex flex-row" v-for="(tier, index) in props.tier_list" :key="tier.tier_name" :class="`d-print-flex h-auto w-100 overflow-hidden`">
            <div class="mr-5" v-if="props.show_checkboxes === true">
                <v-row>
                    <v-checkbox
                        v-model="tiers_to_delete_arr"
                        label=""
                        :value="tier">
                    </v-checkbox>
                </v-row>
            </div>
            
            <!-- Contains tier name and its color -->
            <v-col>
                <!-- Iterates through an object that contains default tier list -->
                <v-row :key="tier.tier_name" :class="`d-print-flex h-auto w-auto tier-border overflow-hidden`" :style="`background-color: ${tier.color}`">
                    <!-- Contains tier name and its color -->
                    <v-col class="h-auto w-auto"> 
                        <p class="text-center text-break font-weight-bold" :style="`color: black`"> {{ tier.tier_name }} </p>
                    </v-col>
                    <v-col class="d-flex flex-wrap align-end overflow-hidden h-auto w-100 bg-grey-darken-4">
                        <draggable
                        group="tier_list"
                        v-model="tier.tier_image_container"
                        @end="update_tier_imgs(tier.tier_image_container, index)"
                        >
                            <template #item="{ element }">
                                <img :src="element" height="85" width="85"></img>
                            </template>
                        </draggable>
                    </v-col>
                </v-row>
            </v-col>
                
            <v-col v-if="props.show_mod_buttons === true">
                <v-row>
                    <v-col>
                        <v-btn @click="open_tier_name_mod_dialog(index, props.tier_list)" size="x-small" variant="plain" prepend-icon="mdi-pencil">Change Name</v-btn> 
                    </v-col>

                    <v-col>
                        <v-btn @click="open_tier_color_mod_dialog(index, props.tier_list)" size="x-small" variant="plain" prepend-icon="mdi-format-color-fill"> Change Color</v-btn>
                    </v-col>
                </v-row>
            </v-col>
        </v-row>
    </v-container>
</template>

<style lang="css">
/* Styling for Default Tier List border */
.tier-border{
    border-style: solid;
    border-color: black;
    border-width: 2px;
}
</style>