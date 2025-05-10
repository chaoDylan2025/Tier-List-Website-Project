<script setup>
import {ref} from 'vue'
import TierListDisplay from './TierListDisplay.vue'

const props = defineProps({
    tier_image_deletion_dialog: Boolean,
    tier_list: Object,
})

</script>

<template>
    <v-app class="bg-black">
        <v-dialog
        v-model="props.tier_image_deletion_dialog"
        height="800"
        width="800">
            <v-card>
                <!-- Contains the default tier list structure -->
                <v-container class="ml-5 mt-10 d-print-inline px-10 mb-10 h-auto">
                    <v-row>
                        <TierListDisplay :tier_list="props.tier_list" :show_clear_button="true" :show_trashcan="true"/>
                    </v-row>

                    <v-row class="mt-8">
                        <v-btn @click="$emit('close', false)">Back</v-btn>
                        <v-btn @click="">Confirm</v-btn>
                    </v-row>
                </v-container>
            </v-card>
        </v-dialog>
    </v-app>
</template>