<script setup>
import CustomizeScreen from './views/CustomizeScreen.vue'
</script>

<template>
    <v-app class="bg-black">
        <div class="mt-5">
            <!-- Title area -->
            <div class="text-h5 text-center">
                <span>Welcome to Tier List Clone!</span>
            </div>
            <!-- Button area -->
            <div class="mt-3">
                <!-- Displays customization page for default tier list -->
                <v-container>
                    <CustomizeScreen />
                </v-container>
            </div>
        </div>
    </v-app>
</template>