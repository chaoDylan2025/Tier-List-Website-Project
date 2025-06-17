<script setup>
import draggable from 'vuedraggable'
import { ref, watch, computed } from 'vue'
import { updateSessionStorage, uploadToImageContainer } from '../front-end-code/customize_screen_functions.js'
import { organizeTiers, image_click_evnt, deleteImages } from '../front-end-code/modify_tier_list_functions.js'

const emit = defineEmits(['open_tier_name_mod', 'open_tier_color_mod', 'delete_tiers', 'update:files_arr', 'update:current_tier_list'])
const props = defineProps({
    tier_list: Object,
    current_tier: Object,
    current_tier_index: Number,
    tier_list_width: Number,
    files_arr: Array,
    show_files_arr: Boolean,
    show_mod_buttons: Boolean,
    show_mods: Boolean,
    show_checkboxes: Boolean,
    show_clear_button: Boolean,
    show_arrow_buttons: Boolean,
    show_trashcan: Boolean
})

const current_tier_list = computed({
    get(){
        return props.tier_list
    },
    set(newArr){
        emit('update:current_tier_list', newArr)
    }
})

const files_arr = computed({
    get(){
        return props.files_arr
    },
    set(newArr){
        emit('update:files_arr', newArr)
    }
})

var current_tier_to_modify = ref(props.current_tier)

// Executes emit event when user clicks on the modify button of a specific tier
function modifyCurrentTier(state, index){
    emit('modify_current_tier', state, index)
}

// Executes emit event when user clicks on button that modifies selected tier's name
function open_tier_name_mod_dialog(index, props){
    emit('open_tier_name_mod', index, props)
}

// Executes emit event when user clicks on button that modifies selected tier's color
function open_tier_color_mod_dialog(index, props){
    emit('open_tier_color_mod', index, props)
}

// Executes emit event when tiers_to_delete_arr updates
function update_delete_tiers_arr(arr){
    emit('delete_tiers', arr)
}

// Tiers to delete
var tiers_to_delete_arr = ref([])

// Adds or removes any tiers from tiers_to_delete_arr
watch (() => tiers_to_delete_arr.value, (new_arr) => {
    update_delete_tiers_arr(new_arr)
})

</script>

<template>
    <!-- Contains tier list structure -->
    <div class="ma-auto mt-10 px-10 mb-10" :style="`width: ${props.tier_list_width}px;`">
        <!-- Displays when ModifyTierList dialog is opened -->
        <div v-if="current_tier_to_modify != undefined">
            <v-row :class="`d-flex h-auto`">
                <!-- Contains the tier's name and color -->
                <div class="text-center text-break font-weight-bold align-content-center tier-border" :style="`color: black; background-color: ${current_tier_to_modify.color}; width: 85px;`">
                    <span>
                        {{ current_tier_to_modify.tier_name }}
                    </span>
                </div>
                <!-- Images for the Tier -->
                <v-col class="d-flex flex-wrap tier-border bg-grey-darken-4 w-100 pa-0 ma-0" style="min-height: 85px;">
                    <draggable
                    v-model="current_tier_to_modify.tier_image_container"
                    class="d-flex flex-wrap w-100 align-start"
                    group="tier_list"
                    item-key="id"
                    @change="updateSessionStorage(current_tier_to_modify)"
                    >
                        <template #item="{ element }">
                            <div class="image-container">
                                <img :src="element.src" :class="element.styling" @click="image_click_evnt(element)"/>
                            </div>
                        </template>
                    </draggable>
                </v-col>
                <!-- Trashcan button for deleting selected images -->
                <div class="align-self-center" style="margin-left: 20px;">
                    <v-btn @click="deleteImages(1, props.current_tier, current_tier_index)" size="small">
                        Clear
                    </v-btn>
                </div>
            </v-row>
            <!-- Displays when user wants to modify any tier(s) -->
            <div class="d-flex tier-list-mod-buttons" style="align-self: center; margin-top: 30px;">
                <div v-if="show_mod_buttons" class="d-flex w-100 justify-space-around mt-4">
                    <div class="tier-list-mod-buttons">
                        <v-btn @click="open_tier_name_mod_dialog(index, props.current_tier)" size="x-small" variant="plain" prepend-icon="mdi-pencil">Change Name</v-btn> 
                    </div>

                    <div class="tier-list-mod-buttons">
                        <v-btn @click="open_tier_color_mod_dialog(index, props.current_tier)" size="x-small" variant="plain" prepend-icon="mdi-format-color-fill">Change Color</v-btn>
                    </div>

                    <div class="tier-list-mod-buttons">
                        <v-btn @click="deleteImages(0, props.current_tier, current_tier_index)" size="x-small" variant="plain" prepend-icon="mdi-trash-can"> Delete Selected Images </v-btn>
                    </div>
                </div>
            </div>
        </div>

        <!-- Iterates through the tier list -->
        <v-row v-for="(tier, index) in current_tier_list" :key="tier.tier_name">
            <v-col>
                <v-row :key="tier.tier_name" :class="`d-flex h-auto`">
                    <!-- Displays when user wants to delete any tier(s) or any image container(s) -->
                    <div class="tier-list-left-column">
                        <v-checkbox
                            class="mr-4"
                            v-if="props.show_checkboxes === true"
                            v-model="tiers_to_delete_arr"
                            label=""
                            :value="tier">
                        </v-checkbox>
                        <div class="mr-4" v-if="current_tier_list.length > 1 & props.show_arrow_buttons">
                            <div>
                                <v-btn @click="organizeTiers(props.tier_list, index, 0)" size="medium" variant="plain" prepend-icon="mdi-menu-up"></v-btn>
                            </div>
                            <div>
                                <v-btn @click="organizeTiers(props.tier_list, index, 1)" size="medium" variant="plain" prepend-icon="mdi-menu-down"></v-btn>
                            </div>
                        </div>
                    </div>
                    <!-- Contains the tier's name and color -->
                    <div class="text-center text-break font-weight-bold align-content-center tier-border" :style="`color: black; background-color: ${tier.color}; width: 85px;`">
                        <span>
                            {{ tier.tier_name }}
                        </span>
                    </div>
                    <!-- Images for the Tier -->
                    <v-col class="d-flex flex-wrap tier-border bg-grey-darken-4 w-100 pa-0 ma-0" style="min-height: 85px;">
                        <draggable
                        v-model="tier.tier_image_container"
                        class="d-flex flex-wrap w-100 align-start"
                        group="tier_list"
                        item-key="id"
                        @change="updateSessionStorage(current_tier_list)"
                        >
                            <template #item="{ element }">
                                <div class="image-container">
                                    <img :src="element.src"/>
                                </div>
                            </template>
                        </draggable>
                    </v-col>
                </v-row>
            </v-col>
            
            <div class="ml-4 d-flex align-center" v-if="props.show_mod_buttons">
                <v-btn @click="modifyCurrentTier(true, index)" size="small"> Modify </v-btn>
            </div>
        </v-row>

        <!-- Displays uploaded images -->
        <v-row class="mt-8" v-if="props.show_files_arr">
            <div draggable="false" class="w-100">
                <div draggable="false">
                    <p id="cap_for_user"> Insert your images or uploaded images here </p>
                </div> 
                <div class="d-flex flex-column" id="image-place-holder">
                    <div class="mt-3 mb-3">
                        <div class="ml-2">
                            <v-btn @click="uploadToImageContainer()" size="small"> Upload </v-btn>
                        </div>  
                    </div>
                    <div class="place-holder">
                        <draggable
                        v-model="files_arr"
                        class="d-flex flex-wrap w-100 align-start"
                        group="tier_list"
                        item-key="id">
                            <template #item="{ element }">
                                <div class="place-holder-imgs"> 
                                    <img :src="element.src"></img>   
                                </div>
                            </template>
                        </draggable>
                    </div>
                </div>  
            </div>
        </v-row>
    </div>
</template>

<style lang="css">
/* Styling for Default Tier List border */
.tier-border{
    border-style: solid;
    border-color: black;
    border-width: 2px;
}
/** Styling for image container that contains images to be inserted in tier list */
#image-place-holder{
    background-color: rgba(40, 40, 40, 0.927);
    border-style: solid;
}
.place-holder{
    background-color: rgba(27, 27, 27, 0.927);
    border-style: solid;
    border-width: 1px;
}
.place-holder-imgs{
    display: flex;
    align-items: stretch;
}
.place-holder-imgs img {
    height: 80px;
    width: 71px;
}
/** Styling for each tier's image container  **/
.image-container{
    display: flex;
    align-items: stretch;
}
.image-container img{
    height: 85px;
    width: 77px;
}
.selected {
  outline: 3px solid #2196F3;
  outline-offset: -2px;
  border-radius: 4px;
}
/** Styling for left column of each tier **/
.tier-list-left-column {
    display: flex;
    flex-direction: column;
    justify-content: center;
}
/** Styling for tier list mod buttons **/
.tier-list-mod-buttons {
    display: flex;
    justify-content: center;
    padding: 0px;
}
</style>