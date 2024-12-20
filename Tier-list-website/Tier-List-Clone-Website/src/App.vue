<script setup>
import {ref, onMounted} from "vue"
import { useRouter } from "vue-router"

const hide_home_page = ref(false)

</script>

<template>
    <v-app class="bg-black">
        <v-container class="bg-black">
        </v-container>
        <v-container v-if="hide_home_page == false">
            <v-row class="bg-grey-darken-3">
                <v-col></v-col>
                <v-col>
                    <div>
                        <p>Welcome to Tier List Clone!</p>
                    </div>
                </v-col>
                <v-col></v-col>
            </v-row>
            <v-row class="bg-grey-darken-4">
                <v-col>
                    <v-btn>Create a Tier List</v-btn>
                </v-col>
                
                <v-col>
                    <v-spacer></v-spacer>
                </v-col>
    
                <v-col>
                    <v-btn @click="hide_home_page = true" to="/CustomizeTierList">Use a Default Tier List</v-btn>
                </v-col>                 
            </v-row>
        </v-container>

        <v-main>
            <router-view v-slot="{ Component }">
                <component :is="Component" />
            </router-view>
        </v-main>
    </v-app>
</template>
