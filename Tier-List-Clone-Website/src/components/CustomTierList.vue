<script setup>
import { ref, onMounted } from 'vue'
import { add_new_tier, custom_tier_list, updateCustomTierList } from '../front-end-code/customize_screen_functions'
import ModifyTierList from '../components/ModifyTierList.vue'

const props = defineProps({
    open_custom_tier_list_dialog: Boolean,
})

// Validation rule
const rules = ref([value => !!value || 'Must have at least one tier', value => Number.isInteger(Number(value))  || 'Please enter a number'])

// Used for incrementing and decrementing number of tiers to add
var num_of_tiers = ref(1)

// Clear custom tier list if page refreshes
onMounted(() => {
    custom_tier_list.length = 0
    add_new_tier(custom_tier_list.value)
})
</script>

<template>
    <v-app class="bg-black">
        <v-container>
            <v-card-title class="mt-4 text-center"> How many Tiers would you like to add? </v-card-title>
            <v-row>
                <v-spacer></v-spacer>
                <!-- Displays current number of tiers -->
                <v-responsive max-width="350" class="mt-5">
                    <v-text-field :rules="rules" v-model="num_of_tiers" bg-color="white">
                        <!-- Increases number of tiers -->
                        <template v-slot:append>
                            <v-btn variant="text" @click="num_of_tiers += 1, add_new_tier(custom_tier_list)">
                                <v-icon color="red">
                                    mdi-plus
                                </v-icon>
                            </v-btn>
                        </template>
                        <!-- Decreases number of tiers -->
                        <template v-slot:prepend>
                            <v-btn variant="text" @click="num_of_tiers < 1 ? num_of_tiers = 0: num_of_tiers -= 1, custom_tier_list.length -= 1">
                                <v-icon color="green">
                                    mdi-minus
                                </v-icon>
                            </v-btn>
                        </template>
                    </v-text-field>
                </v-responsive>
                <v-spacer></v-spacer>
            </v-row>
        </v-container>

        <v-container>
            <!-- Displays if user has at least 1 tier in their customizable tier list -->
            <div class="justify-center" v-if="custom_tier_list.length >= 1">
                <ModifyTierList :tier_list="custom_tier_list" :show_exit_button="false" :show_confirm_button="true" @updateCustomTierList="updateCustomTierList(custom_tier_list)"/> 
            </div>
        </v-container>
    </v-app>
</template>