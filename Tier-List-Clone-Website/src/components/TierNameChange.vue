<script setup>
import {ref} from 'vue'

const props = defineProps({
    tier_name_dialog: Boolean,
    current_tier: Object,
    index: Number
})

// Change selected tier's name
var change_selected_tier_name = ref("")
</script>

<template>
    <v-app class="bg-black">
        <v-dialog
        v-model="props.tier_name_dialog"
        height="auto"
        width="auto">
            <v-card>
                <!-- Contains the current tier's structure -->
                <v-container class="mt-10 px-10 mb-10">
                    <!-- Contains tier name and its color -->
                    <v-row class="tier-border" :style="`background-color: ${props.current_tier.color}`">
                        <v-col class="d-flex justify-center align-center"> 
                            <!-- For entering the current tier's new name -->
                            <div class="w-100">
                                <v-text-field
                                class="placeholder-text"
                                v-model="change_selected_tier_name"
                                :placeholder="props.current_tier.tier_name">                          
                                </v-text-field>
                            </div>
                        </v-col>
                    </v-row>

                    <!-- Displays the Back and Confirm Buttons -->
                    <v-row class="mt-8">
                        <v-col>
                            <v-btn @click="$emit('close', false), change_selected_tier_name=''">Back</v-btn>
                        </v-col>
                        <v-col></v-col>
                        <v-col>
                            <v-btn @click="$emit('changeTierName', false, change_selected_tier_name, props.index, props.current_tier), change_selected_tier_name=''">Confirm</v-btn>
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
</style>