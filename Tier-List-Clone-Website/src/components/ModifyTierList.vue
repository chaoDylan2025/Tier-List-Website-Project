<script setup>
import TierNameChange from './TierNameChange.vue'
import TierColorChange from './TierColorChange.vue'
import TierImageDeletion from './TierImageDeletion.vue'
import TierListDisplay from './TierListDisplay.vue'
import { open_tier_modification_dialog, open_tier_color_dialog, current_tier } from '../front-end-code/modify_tier_list_functions'
import { open_tier_name_mod_dialog, open_tier_color_mod_dialog, open_tier_image_deletion_dialog, confirm_tier_name_change, confirm_tier_color_change } from '../front-end-code/modify_tier_list_functions'

const props = defineProps({
    current_tier: Object,
    current_tier_index: Number,
    show_exit_button: Boolean,
    show_confirm_button: Boolean,
    mod_tier_dialog: Boolean
})

var current_tier_to_modify = props.current_tier
var current_tier_index = props.current_tier_index

</script>

<template>
    <v-row v-if="props.show_exit_button" class="ml-2 mt-2">
        <v-btn
        @click="$emit('close', false)"
        icon="$close"
        size="medium"
        variant="text"
        >
        </v-btn>
    </v-row>
    <!-- Contains tier list structure -->
    <v-row>
        <TierListDisplay :current_tier="props.current_tier" :tier_list_width="1004" :show_mods="true" :show_mod_buttons="true" :show_arrow_buttons="true" @open_tier_name_mod="open_tier_name_mod_dialog" @open_tier_color_mod="open_tier_color_mod_dialog"/>
    </v-row>

    <v-container v-if="current_tier != undefined" v-show="false">
        <TierNameChange :tier_name_dialog="open_tier_modification_dialog" :current_tier="current_tier_to_modify" :index="current_tier_index"
        @close="(state) => open_tier_modification_dialog = state" @changeTierName="confirm_tier_name_change"/>
        <TierColorChange :tier_color_dialog="open_tier_color_dialog" :current_tier="current_tier_to_modify" :index="current_tier_index"
        @close="(state) => open_tier_color_dialog = state" @changeTierColor="confirm_tier_color_change"/>
        <TierImageDeletion :tier_image_deletion_dialog="open_tier_image_deletion_dialog" :current_tier="current_tier" 
        @close="(state) => open_tier_image_deletion_dialog = state"/>
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