<script setup>
import {ref, computed} from 'vue'
import { create_custom_tier_list } from '../front-end-code/custom_tier_list'
import CreateCustomTierList from '../views/CreateCustomTierList.vue'

const props = defineProps({
    open_custom_tier_list_dialog: Boolean,
    tier_list: Object,
})

// Validation rules
const rules = ref([value => !!value || 'Must have at least one tier', value => Number.isInteger(Number(value))  || 'Please enter a number'])

// Used for incrementing and decrementing number of tiers to add
var num_of_tiers = ref(2)

// Open ModifyTierList Component
var open_mod_tier_list_dialog = ref(false)

// Contains custom tier list
var custom_tier_list = ref([])
</script>

<template>
    <v-app class="bg-black">
        <v-dialog
        v-model="props.open_custom_tier_list_dialog"
        height="300"
        width="500">
            <v-card>
               <v-card-title class="mt-4 text-center"> How many Tiers would you like to add? </v-card-title>
                <v-row>
                    <v-spacer></v-spacer>
                    <v-responsive max-width="350" class="mt-5">
                        <v-text-field :rules="rules" v-model="num_of_tiers">
                            <template v-slot:append>
                                <v-btn variant="text" @click="num_of_tiers += 1">
                                    <v-icon color="red">
                                        mdi-plus
                                    </v-icon>
                                </v-btn>
                                
                            </template>
                            <template v-slot:prepend>
                                <v-btn variant="text" @click="num_of_tiers < 1 ? num_of_tiers = 0: num_of_tiers -= 1">
                                    <v-icon color="green">
                                        mdi-minus
                                    </v-icon>
                                </v-btn>
                            </template>
                        </v-text-field>
                    </v-responsive>
                    <v-spacer></v-spacer>
                    
                </v-row>
                <v-row class="mt-8">
                    <v-spacer></v-spacer>
                    <v-btn class="mr-5" @click="$emit('close', false)">Back</v-btn>
                    <v-btn class="mr-5" @click="create_custom_tier_list(custom_tier_list, num_of_tiers, open_mod_tier_list_dialog)">Confirm</v-btn>
                </v-row>
                <p> {{ custom_tier_list }}</p>
            </v-card>
        </v-dialog>

        <CreateCustomTierList :open_mod_tier_list="open_mod_tier_list_dialog" :tier_list="custom_tier_list"/>
    </v-app>
</template>

<style lang="css">
</style>