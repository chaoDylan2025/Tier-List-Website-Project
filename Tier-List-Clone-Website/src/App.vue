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
                <v-container>
                    <CustomizeScreen />
                </v-container>
            </div>
        </div>

        <!-- Displays current view -->
        <v-main>
        </v-main>
    </v-app>
</template>