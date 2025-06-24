<script setup>
import TierNameChange from './TierNameChange.vue'
import TierColorChange from './TierColorChange.vue'
import TierListDisplay from './TierListDisplay.vue'

import { 
    open_tier_modification_dialog, 
    open_tier_name_mod_dialog, 
    open_tier_color_mod_dialog, 
    open_tier_color_dialog, 
    confirm_tier_name_change, 
    confirm_tier_color_change,
    current_tier } from '../front-end-code/modify_tier_list_functions'

const props = defineProps({
    current_tier: Object,
    current_tier_index: Number
})
</script>

<template>
    <!-- Displays button for exiting dialog -->
    <v-row class="ml-2 mt-2">
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
        <TierListDisplay :current_tier="props.current_tier" :tier_list_width="1136" :show_mods="true" :show_mod_buttons="true" :show_arrow_buttons="true" @open_tier_name_mod="open_tier_name_mod_dialog" @open_tier_color_mod="open_tier_color_mod_dialog"/>
    </v-row>

    <!-- Displays dialogs for changing current tier's name and color -->
    <v-container v-if="current_tier != undefined" v-show="false">
        <TierNameChange :tier_name_dialog="open_tier_modification_dialog" :current_tier="props.current_tier" :index="props.current_tier_index"
        @close="(state) => open_tier_modification_dialog = state" @changeTierName="confirm_tier_name_change"/>
        <TierColorChange :tier_color_dialog="open_tier_color_dialog" :current_tier="props.current_tier" :index="props.current_tier_index"
        @close="(state) => open_tier_color_dialog = state" @changeTierColor="confirm_tier_color_change"/>
    </v-container>
</template>