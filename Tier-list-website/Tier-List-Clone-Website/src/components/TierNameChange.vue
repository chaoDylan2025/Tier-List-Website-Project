<script setup>
import {ref, onMounted} from 'vue'

const props = defineProps({
    tier_name_dialog: Boolean,
    current_tier: Object,
})

// Change selected tier's name
var change_selected_tier_name = ref("")

</script>

<template>
    <v-app class="bg-black">
        <v-dialog
        v-model="props.tier_name_dialog"
        height="auto"
        width="auto">
            <v-card>
                <!-- Contains the default tier list structure -->
                <v-container class="ml-5 mt-10 d-print-inline px-10 mb-10 h-auto">
                    <v-row>
                        <v-col>
                            <!-- Iterates through an object that contains default tier list -->
                            <v-row :class="`d-print-flex h-auto w-auto tier-border overflow-hidden`" :style="`background-color: ${props.current_tier.color}`">
                                <!-- Contains tier name and its color -->
                                <v-col class="h-auto w-auto"> 
                                    <v-text-field
                                    v-model="change_selected_tier_name"
                                    :placeholder="props.current_tier.tier_name"
                                    </v-text-field>
                                </v-col>
                                <v-col class="d-flex flex-wrap align-end overflow-hidden h-auto w-100 bg-grey-darken-4">
                                </v-col>
                            </v-row>
                        </v-col>
                    </v-row>

                    <v-row class="mt-8">
                        <v-btn @click="$emit('close', false), change_selected_tier_name=''">Back</v-btn>
                        <v-btn @click="$emit('changeTierName', false, change_selected_tier_name)">Confirm</v-btn>
                    </v-row>
                </v-container>
            </v-card>
        </v-dialog>
    </v-app>
</template>

<style lang="css">
/* Styling for Default Tier List border */
.tier-border{
    border-style: solid;
    border-width: 2px;
}

/** Styling for image container that contains images to be inserted in tier list */
#image-place-holder{
    background-color: rgba(40, 40, 40, 0.927);
    border-style: solid;
}

/* Styling for Image Container */
#place-holder{
    background-color: rgba(27, 27, 27, 0.927);
    border-style: solid;
    border-width: 1px;
}

#place-holder img{
    width: 85px;
}
</style>