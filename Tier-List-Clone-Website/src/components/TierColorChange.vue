<script setup>
import { watch } from 'vue'

const props = defineProps({
    tier_color_dialog: Boolean,
    current_tier: Object,
    index: Number
})

// Contains old color of current tier
var old_color = JSON.stringify(props.current_tier.color)

// Update selected tier's color
watch (() => props.current_tier.color, (color) => {
    props.current_tier.color = color  
})
</script>

<template>
    <v-app class="bg-black">
        <v-dialog
        v-model="props.tier_color_dialog"
        height="auto"
        width="auto">
            <v-card>
                <!-- Contains the current tier's structure -->
                <v-container class="ml-5 mt-10 px-10 mb-10">
                    <v-row>
                        <v-col>
                            <!-- Contains tier name and its color -->
                            <v-row :class="`d-flex w-100 tier-border`" :style="`background-color: ${props.current_tier.color}`">
                                <v-col> 
                                    <span> {{ props.current_tier.tier_name }} </span>
                                </v-col>
                            </v-row>

                            <!-- Displays option for changing current tier's color -->
                            <v-row class="mt-8">
                                <v-color-picker class="w-100" v-model="props.current_tier.color"></v-color-picker>
                            </v-row>
                        </v-col>
                    </v-row>

                    <!-- Displays the Back and Confirm Buttons -->
                    <v-row class="mt-8">
                        <v-col>
                            <v-btn @click="$emit('close', false), props.current_tier.color = JSON.parse(old_color)">Back</v-btn>
                        </v-col>
                    
                        <v-col>
                            <v-btn @click="$emit('changeTierColor', false, props.index, props.current_tier)">Confirm</v-btn>  
                        </v-col>
                    </v-row>
                </v-container>
            </v-card>
        </v-dialog>
    </v-app>
</template>

<style lang="css">
/* Styling for current tier's border */
.tier-border{
    border-style: solid;
    border-width: 2px;
}
</style>