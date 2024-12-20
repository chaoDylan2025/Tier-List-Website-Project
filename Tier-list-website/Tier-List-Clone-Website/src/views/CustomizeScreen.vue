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
        <v-container class="center">
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

        <v-container>
            <!-- Iterates through an object that contains default tier list -->
            <v-container v-for="tier in default_tier_list" :key="tier.tier_name">
                <!-- Contains tier name and its color -->
                <v-col :class="`bg-${tier.color}`"> {{ tier.tier_name }} </v-col>
            </v-container>

        </v-container>

        <h3> Image Container </h3>
        <v-container>

        </v-container>
    </v-app>
</template>
