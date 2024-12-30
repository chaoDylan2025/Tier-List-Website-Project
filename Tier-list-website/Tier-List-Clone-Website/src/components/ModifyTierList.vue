<script setup>
import {ref, onMounted} from 'vue'

const props = defineProps({
    open_dialog: Boolean,
    tier_list: Object
})

// Contains a reference to the open_dialog prop
const dialog_opened = ref(props.open_dialog)

</script>

<template>
    <v-app class="bg-black">
        <v-dialog
        v-model="props.open_dialog"
        height="auto"
        width="auto">
            <v-card>
                <!-- Contains the default tier list structure -->
                <v-container class="ml-5 mt-10 d-print-inline px-10 mb-10 h-auto">
                    <v-row v-for="tier in props.tier_list">
                        <v-col>
                            <!-- Iterates through an object that contains default tier list -->
                            <v-row :key="tier.tier_name" :class="`bg-${tier.color} d-print-flex h-auto w-auto tier-border overflow-hidden`">
                                <!-- Contains tier name and its color -->
                                <v-col class="h-auto w-auto"> 
                                    <p class="text-center text-break font-weight-bold"> {{ tier.tier_name }} </p>
                                </v-col>
                                <v-col class="d-flex flex-wrap align-end overflow-hidden h-auto w-100 bg-grey-darken-4">
                                </v-col>
                            </v-row>
                        </v-col>
                        
                        <v-col>
                            <v-btn size="x-small" variant="plain" prepend-icon="mdi-pencil">Change Name</v-btn> 
                        </v-col>

                        <v-col>
                            <v-btn size="x-small" variant="plain" prepend-icon="mdi-format-color-fill"> Change Color</v-btn>
                        </v-col>
                    </v-row>

                    <v-row class="mt-8">
                        <v-btn @click="$emit('close', false)">Back</v-btn>
                        <v-btn>Confirm</v-btn>
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