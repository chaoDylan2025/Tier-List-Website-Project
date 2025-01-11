<script setup>
import {ref, computed} from 'vue'
import TierNameChange from './TierNameChange.vue'
import TierColorChange from './TierColorChange.vue'
import TierListDisplay from './TierListDisplay.vue'

const props = defineProps({
    open_dialog: Boolean,
    tier_list: Object
})

// Copy of tier list that was passed as a prop
var temp_json_string = JSON.stringify(props.tier_list)
var copy_of_tier_list = ref(JSON.parse(temp_json_string))

// Opens modal dialog for changing selected tier's name
var open_tier_modification_dialog = ref(false)

// Opens modal dialog for changing selected tier's color
var open_tier_color_dialog = ref(false)

/***********************************************************************
 * Functions and variables for modifying selected tier's name or color *
 ***********************************************************************/
// Contains selected tier
var current_tier = ref("")

// Contains original content of selected tier
var original_tier = ref("")

// Contains index of selected tier
var index_of_current_tier = ref(0)

// Computed props for selected tier
const tier = computed({
    get(){
        return copy_of_tier_list.value[index_of_current_tier.value]
    },
    set(new_name){
        copy_of_tier_list.value[index_of_current_tier].tier_name = new_name
    }
})

const tier_color = computed({
    get(){
        return copy_of_tier_list.value[index_of_current_tier.value]
    },
    set(new_color){
        copy_of_tier_list.value[index_of_current_tier].color = new_color
    }
})

// Assign variables their values before opening tier name modification dialog
function open_tier_name_mod_dialog(index){
    current_tier = copy_of_tier_list.value[index]
    index_of_current_tier = index
    original_tier = copy_of_tier_list[index]
    open_tier_modification_dialog.value = true
}

// Assign variables their values before openining tier color modification dialog
function open_tier_color_mod_dialog(index){
    current_tier = copy_of_tier_list.value[index]
    index_of_current_tier = index
    original_tier = copy_of_tier_list[index]
    open_tier_color_dialog.value = true
}

// Changes selected tier's new name
function confirm_tier_name_change(state, new_name){
    // Changes name of selected tier
    tier.value = new_name
    // Set to false to exit modal dialog
    open_tier_modification_dialog.value = state
}

// Changes selected tier's color
function confirm_tier_color_change(state, new_color){
    // Changes name of selected tier
    tier_color.value = new_color
    // Set to false to exit modal dialog
    open_tier_color_dialog.value = state
}
</script>

<template>
    <v-app class="bg-black">
        <v-dialog
        v-model="props.open_dialog"
        height="auto"
        width="1000">
            <v-card>
                <v-container>
                    <!-- Contains tier list structure -->
                     <v-row>
                        <TierListDisplay :tier_list= copy_of_tier_list :show_mod_buttons="true" @open_tier_name_mod="open_tier_name_mod_dialog" @open_tier_color_mod="open_tier_color_mod_dialog"/>
                     </v-row>

                    <v-row class="mt-8">
                        <v-spacer></v-spacer>
                        <v-btn @click="$emit('close', false)">Back</v-btn>
                        <v-btn @click="$emit('update', false, copy_of_tier_list)">Confirm</v-btn>
                    </v-row>
                </v-container>
            </v-card>
        </v-dialog>

        <TierNameChange :tier_name_dialog="open_tier_modification_dialog" :current_tier="current_tier" 
        @close="(state) => open_tier_modification_dialog = state" @changeTierName="confirm_tier_name_change"/>
        <TierColorChange :tier_color_dialog="open_tier_color_dialog" :current_tier="current_tier" 
        @close="(state) => open_tier_color_dialog = state" @changeTierColor="confirm_tier_color_change"/>
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