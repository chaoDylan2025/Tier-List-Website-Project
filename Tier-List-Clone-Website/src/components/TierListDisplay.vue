<script setup>
import draggable from 'vuedraggable'
import { ref, watch } from 'vue'

const emit = defineEmits(['open_tier_name_mod', 'open_tier_color_mod', 'delete_tiers', 'update_tier_images'])
const props = defineProps({
    tier_list: Object,
    image_list: Array,
    current_tier_images: Array,
    show_mod_buttons: Boolean,
    show_checkboxes: Boolean,
    delete_tiers_arr: Array
})

// Executes emit event when user clicks on button that modifies selected tier's name
function open_tier_name_mod_dialog(index, props){
    emit('open_tier_name_mod', index, props)
}

// Executes emit event when user clicks on button that modifies selected tier's color
function open_tier_color_mod_dialog(index, props){
    emit('open_tier_color_mod', index, props)
}

// Executes emit event when tiers_to_delete_arr updates
function update_delete_tiers_arr(arr, index){
    emit('delete_tiers', arr, index)
}

// Tiers to delete
var tiers_to_delete_arr = ref([])

// Adds or removes any tiers from tiers_to_delete_arr
watch (() => tiers_to_delete_arr.value, (new_arr) => {
    update_delete_tiers_arr(new_arr)
})
</script>

<template>
    <!-- Contains tier list structure -->
    <v-container class="ml-5 mt-10 d-print-inline px-10 mb-10 h-auto">
        <!-- Iterates through the tier list -->
        <v-row class="d-flex flex-row" v-for="(tier, index) in props.tier_list" :key="tier.tier_name" :class="`d-print-flex h-auto w-100 overflow-hidden`">
            <!-- Displays when user wants to delete any tier(s) -->
            <div class="mr-5" v-if="props.show_checkboxes === true">
                <v-row>
                    <v-checkbox
                        v-model="tiers_to_delete_arr"
                        label=""
                        :value="tier">
                    </v-checkbox>
                </v-row>
            </div>
            
            <!-- Contains the tier's name and color -->
            <v-col>
                <!-- Tier color -->
                <v-row :key="tier.tier_name" :class="`d-print-flex h-auto w-auto tier-border overflow-hidden`" :style="`background-color: ${tier.color}`">
                    <!-- Tier name -->
                    <v-col class="h-auto w-auto"> 
                        <p class="text-center text-break font-weight-bold" :style="`color: black`"> {{ tier.tier_name }} </p>
                    </v-col>
                    <!-- Images for the Tier -->
                    <v-col class="d-flex flex-wrap align-end overflow-hidden h-auto w-100 bg-grey-darken-4">
                        <draggable
                        group="tier_list"
                        v-model="tier.tier_image_container"
                        >
                            <template #item="{ element }">
                                <img :src="element.src" height="85" width="85"></img>
                            </template>
                        </draggable>
                    </v-col>
                </v-row>
            </v-col>
                
            <!-- Displays when user wants to modify any tier(s) -->
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