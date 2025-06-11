<script setup>
import {ref, watch} from 'vue'

const props = defineProps({
    tier_color_dialog: Boolean,
    current_tier: Object,
})

const current_tier_to_modify = ref(props.current_tier)
console.log("Current tier in TierColorChange: ", current_tier_to_modify.value.color)
var change_selected_tier_color = ref(current_tier_to_modify.value.color)

// Watch for changes to selected tier's color
watch (() => current_tier_to_modify .color, (color) => {
    change_selected_tier_color.value = color  
})
</script>

<template>
    <v-app class="bg-black">
        <v-dialog
        v-model="props.tier_color_dialog"
        height="auto"
        width="auto">
            <v-card>
                <!-- Contains the default tier list structure -->
                <v-container class="ml-5 mt-10 px-10 mb-10">
                    <v-row>
                        <v-col>
                            <!-- Iterates through an object that contains default tier list -->
                            <v-row :class="`d-flex w-100 tier-border`" :style="`background-color: ${change_selected_tier_color}`">
                                <!-- Contains tier name and its color -->
                                <v-col> 
                                    <span> {{ current_tier_to_modify.tier_name }} </span>
                                </v-col>
                            </v-row>
                            <v-row class="mt-8">
                                <v-color-picker class="w-100" v-model="change_selected_tier_color"></v-color-picker>
                            </v-row>
                        </v-col>
                    </v-row>

                    <v-row class="mt-8">
                        <v-col>
                            <v-btn @click="$emit('close', false), change_selected_tier_color=current_tier_to_modify.color">Back</v-btn>
                        </v-col>
                    
                        <v-col>
                            <v-btn @click="$emit('changeTierColor', false, change_selected_tier_color, props.current_tier)">Confirm</v-btn>  
                        </v-col>
                    </v-row>
                </v-container>
            </v-card>
        </v-dialog>
    </v-app>
</template>

<style lang="css">
/* Styling for Default Tier List border */
.tier-border{
    border-style: solid;
    border-width: 2px;
}

/** Styling for image container that contains images to be inserted in tier list */
#image-place-holder{
    background-color: rgba(40, 40, 40, 0.927);
    border-style: solid;
}

/* Styling for Image Container */
#place-holder{
    background-color: rgba(27, 27, 27, 0.927);
    border-style: solid;
    border-width: 1px;
}

#place-holder img{
    width: 85px;
}
</style>