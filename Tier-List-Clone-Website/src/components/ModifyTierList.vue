<script setup>
import TierNameChange from './TierNameChange.vue'
import TierColorChange from './TierColorChange.vue'
import TierListDisplay from './TierListDisplay.vue'
import { open_tier_modification_dialog, open_tier_color_dialog, index_of_current_tier } from '../front-end-code/modify_tier_list_functions'
import { open_tier_name_mod_dialog, open_tier_color_mod_dialog, confirm_tier_name_change, confirm_tier_color_change } from '../front-end-code/modify_tier_list_functions'

const props = defineProps({
    tier_list: Object,
    no_back_button: Boolean,
})
</script>

<template>
        <!-- Contains tier list structure -->
        <v-row>
            <TierListDisplay :tier_list= props.tier_list :show_mod_buttons="true" @open_tier_name_mod="open_tier_name_mod_dialog" @open_tier_color_mod="open_tier_color_mod_dialog"/>
        </v-row>

        <v-row class="mt-8" v-if="props.no_back_button == false">
            <v-spacer></v-spacer>
            <v-col>
                <v-btn @click="$emit('close', false)">Back</v-btn>
            </v-col>
            <v-col>
                <v-btn @click="$emit('update', false, props.tier_list)" class="ml-10">Confirm</v-btn>
            </v-col>
            <v-spacer></v-spacer>
        </v-row>

        <v-row class="mt-8 justify-center" v-else>
            <v-btn @click="$emit('updateCustomTierList', props.tier_list)">Confirm</v-btn>
        </v-row>

        <v-container v-show="false">
            <TierNameChange :tier_name_dialog="open_tier_modification_dialog" :tier_list="props.tier_list" :index="index_of_current_tier"
            @close="(state) => open_tier_modification_dialog = state" @changeTierName="confirm_tier_name_change"/>
            <TierColorChange :tier_color_dialog="open_tier_color_dialog" :tier_list="props.tier_list" :index="index_of_current_tier" 
            @close="(state) => open_tier_color_dialog = state" @changeTierColor="confirm_tier_color_change"/>
        </v-container>
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