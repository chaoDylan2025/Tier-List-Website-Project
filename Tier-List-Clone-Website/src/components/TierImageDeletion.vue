<script setup>
import TierListDisplay from './TierListDisplay.vue'

const props = defineProps({
    tier_image_deletion_dialog: Boolean,
    current_tier: Object,
})

</script>

<template>
    <v-app class="bg-black">
        <v-dialog
        v-model="props.tier_image_deletion_dialog"
        height="800"
        width="800">
            <v-card>
                <div class="mt-4 ml-4">
                    <v-btn
                    @click="$emit('close', false)"
                    icon="$close"
                    size="medium"
                    variant="text"
                    >
                    </v-btn>
                </div>
                <!-- Contains the default tier list structure -->
                <v-container class="d-flex ml-10 mb-8">
                    <v-row class="mb-12">
                        <TierListDisplay :current_tier="current_tier" :show_clear_button="true" :show_trashcan="true"/>
                    </v-row>
                </v-container>
            </v-card>
        </v-dialog>
    </v-app>
</template>