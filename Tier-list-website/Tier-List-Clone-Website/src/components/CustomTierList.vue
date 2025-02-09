<script setup>
import { computed, ref, watch, onMounted } from 'vue'
import { tier_list } from '../store/tierlist'
import { add_new_tier, custom_tier_list } from '../front-end-code/customize_screen_functions'
import ModifyTierList from '../components/ModifyTierList.vue'
// import CreateCustomTierList from '../views/CreateCustomTierList.vue'

const props = defineProps({
    open_custom_tier_list_dialog: Boolean,
})

// Validation rules
const rules = ref([value => !!value || 'Must have at least one tier', value => Number.isInteger(Number(value))  || 'Please enter a number'])

// Used for incrementing and decrementing number of tiers to add
var num_of_tiers = ref(1)

// Open ModifyTierList Component
var open_mod_tier_list_dialog = ref(false)

// Contains Tier List store
var store = tier_list()

// Clear custom tier list structure if page refreshes
onMounted(() => {
    store.custom_list.length = 1
})

</script>

<template>
    <v-app class="bg-black">
        <v-container>
            <v-card-title class="mt-4 text-center"> How many Tiers would you like to add? </v-card-title>
            <v-row>
                <v-spacer></v-spacer>
                <v-responsive max-width="350" class="mt-5">
                    <v-text-field :rules="rules" v-model="num_of_tiers" bg-color="white">
                        <template v-slot:append>
                            <v-btn variant="text" @click="num_of_tiers += 1, add_new_tier(store.custom_list)">
                                <v-icon color="red">
                                    mdi-plus
                                </v-icon>
                            </v-btn>
                            
                        </template>
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

        <div v-if="custom_tier_list.length >= 1">
            <ModifyTierList :tier_list="store.custom_list"/> 
        </div>
    </v-app>
</template>

<style lang="css">
</style>