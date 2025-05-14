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
                <v-row class="mt-4 ml-4">
                    <v-btn
                    @click="$emit('close', false)"
                    icon="$close"
                    size="medium"
                    variant="text"
                    >
                    </v-btn>
                </v-row>
                <!-- Contains the default tier list structure -->
                <v-container class="ml-8 mb-8 px-10">
                    <v-row class="mb-12">
                        <TierListDisplay :tier_list="props.tier_list" :show_clear_button="true" :show_trashcan="true"/>
                    </v-row>
                </v-container>
            </v-card>
        </v-dialog>
    </v-app>
</template>