<script setup>
import {ref, onMounted} from 'vue'
// Contains the initial default tier list
var default_tier_list = ref([
    {
        tier_name: "S", 
        color: "red-lighten-3"
    },
    {
        tier_name: "A", 
        color: "yellow-darken-3"
    },
    {
        tier_name: "B", 
        color: "yellow-darken-1"
    },
    {
        tier_name: "C", 
        color: "yellow-lighten-1"
    },
    {
        tier_name: "D", 
        color: "lime-accent-2"
    },
    {
        tier_name: "F", 
        color: "lime-accent-4"
    },
    ])
</script>

<template>
    <v-app class="bg-black">
        <v-container>
            <v-row>
                <v-col>
                    <v-btn> Create new Tier </v-btn>
                </v-col>
                <v-col>
                    <v-btn> Modify Tiers </v-btn>
                </v-col>
                <v-col>
                    <v-btn> Delete Tiers </v-btn>
                </v-col>
            </v-row>
        
        </v-container>

        <!-- Contains the default tier list structure -->
        <v-container class="d-print-inline px-10 mb-10" width="80vw" height="70vh">
            <!-- Iterates through an object that contains default tier list -->
            <v-row v-for="tier in default_tier_list" :key="tier.tier_name" :class="`bg-${tier.color} d-print-flex h-auto w-100 tier-border overflow-hidden`">
                <!-- Contains tier name and its color -->
                <v-col class="h-auto w-auto"> 
                    <p class="text-center text-break font-weight-bold"> {{ tier.tier_name }} </p>
                </v-col>
                <v-col class="bg-grey-darken-4"></v-col>
            </v-row>
        </v-container>

        <h3> Image Container </h3>
        <v-container>

        </v-container>
    </v-app>
</template>

<style lang="css">
/* Styling for Default Tier List border */
.tier-border{
    border-style: solid;
    border-width: 2px;
}
</style>
