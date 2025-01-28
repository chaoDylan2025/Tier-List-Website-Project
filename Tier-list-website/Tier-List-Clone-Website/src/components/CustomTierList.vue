<script setup>
import {ref, computed} from 'vue'

const props = defineProps({
    open_custom_tier_list_dialog: Boolean,
    tier_list: Object,
})

// Validation rules
const rules = ref([value => !!value || 'Please add at least one tier', value => Number.isInteger(Number(value))  || 'Please enter a number'])
// Used for incrementing and decrementing number of tiers to add
var num_of_tiers = ref(0)

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
                    <v-responsive max-width="300" class="mt-5">
                        <v-text-field :rules="rules" v-model="num_of_tiers">
                            <template v-slot:append>
                                <v-icon color="red">
                                    mdi-plus
                                </v-icon>
                            </template>
                            <template v-slot:prepend>
                                <v-icon color="green">
                                    mdi-minus
                                </v-icon>
                            </template>
                        </v-text-field>
                    </v-responsive>
                    <v-spacer></v-spacer>
                    
                </v-row>
                <v-row class="mt-8">
                    <v-spacer></v-spacer>
                    <v-btn class="mr-5" @click="$emit('close', false)">Back</v-btn>
                    <v-btn class="mr-5" @click="$emit('deleteTiers', false)">Confirm</v-btn>
                </v-row>
            </v-card>
        </v-dialog>
    </v-app>
</template>

<style lang="css">
</style>