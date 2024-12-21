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

        <v-container class="d-print-inline px-10 mb-10" width="80vw" height="70vh">
            <!-- Iterates through an object that contains default tier list -->
            <v-row v-for="tier in default_tier_list" :key="tier.tier_name" :class="`bg-${tier.color} d-print-flex h-auto w-100 tier-border`">
                <!-- Contains tier name and its color -->
                <v-col> 
                    <p> {{ tier.tier_name }} </p>
                </v-col>
                <v-col class="bg-grey-darken-4 border-thin"></v-col>
            </v-row>

        </v-container>

        <h3> Image Container </h3>
        <v-container>

        </v-container>
    </v-app>
</template>

<style lang="css">
.tier-border{
    border-style: solid;
    border-width: 2px;
}
/** Header for tier name */
.tier{
    display: flex;
    height: auto; 
    width: 100%;
    border-style: solid;
    border-width: 2px;
    overflow: hidden;
}
.tier-name{
    align-content: center;
    text-align: center;
    font-weight: bold;
    min-height: 85px;
    width: 85px;
}

/** Styling for each tier's image container */
.image-container{
    background-color: rgb(16, 16, 16);
    height: auto;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    align-items: flex-end;
    overflow: hidden;
}
.image-container img{
    height: 85px;
    width: 85px;
    object-fit: cover;
}
</style>
