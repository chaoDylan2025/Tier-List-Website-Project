<script setup>
import { useRoute } from 'vue-router';
const route = useRoute()
</script>

<template>
    <v-app class="bg-black">
        <div class="mt-5" v-if="$route.fullPath == '/'">
            <!-- Title area -->
            <div class="text-h5 text-center">
                <span>Welcome to Tier List Clone!</span>
            </div>
            <!-- Button area -->
            <div class="mt-3">
                <v-container>
                    <v-row>
                        <v-col class="text-center">
                            <v-btn rounded="lg" :to="{ name: `Customization`}">Create a Tier List</v-btn>
                        </v-col>

                        <v-col class="text-center">
                            <v-btn rounded="lg" :to="{ name: `DefaultTierList`}">Use a Default Tier List</v-btn>
                        </v-col>                 
                    </v-row>
                </v-container>
            </div>
        </div>

        <!-- Displays current view -->
        <v-main>
            <router-view v-slot="{ Component }">
                <component :is="Component" />
            </router-view>
        </v-main>
    </v-app>
</template>