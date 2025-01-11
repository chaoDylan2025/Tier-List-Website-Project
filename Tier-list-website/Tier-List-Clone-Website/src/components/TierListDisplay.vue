<script setup>
import draggable from 'vuedraggable'

const emit = defineEmits(['open_tier_name_mod', 'open_tier_color_mod'])
const props = defineProps({
    tier_list: Object,
    show_mod_buttons: Boolean,
    show_checkboxes: Boolean,
})

// Executes emit event when user clicks on button that modifies selected tier's name
function open_tier_name_mod_dialog(index){
    emit('open_tier_name_mod', index)
}

// Executes emit event when user clicks on button that modifies selected tier's color
function open_tier_color_mod_dialog(index){
    emit('open_tier_color_mod', index)
}

</script>

<template>
    <!-- Contains tier list structure -->
    <v-container class="ml-5 mt-10 d-print-inline px-10 mb-10 h-auto">
        <!-- Iterates through an object that contains tier list -->
        <v-row class="d-flex flex-row" v-for="(tier, index) in props.tier_list" :key="tier.tier_name" :class="`d-print-flex h-auto w-100 overflow-hidden`">
            <!-- Contains tier name and its color -->
            <v-col>
                <!-- Iterates through an object that contains default tier list -->
                <v-row :key="tier.tier_name" :class="`d-print-flex h-auto w-auto tier-border overflow-hidden`" :style="`background-color: ${tier.color}`">
                    <!-- Contains tier name and its color -->
                    <v-col class="h-auto w-auto"> 
                        <p class="text-center text-break font-weight-bold" :style="`color: black`"> {{ tier.tier_name }} </p>
                    </v-col>
                    <v-col class="d-flex flex-wrap align-end overflow-hidden h-auto w-100 bg-grey-darken-4">
                    </v-col>
                </v-row>
            </v-col>
                
            <v-col v-if="props.show_mod_buttons === true">
                <v-row>
                    <v-col>
                        <v-btn @click="open_tier_name_mod_dialog(index)" size="x-small" variant="plain" prepend-icon="mdi-pencil">Change Name</v-btn> 
                    </v-col>

                    <v-col>
                        <v-btn @click="open_tier_color_mod_dialog(index)" size="x-small" variant="plain" prepend-icon="mdi-format-color-fill"> Change Color</v-btn>
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