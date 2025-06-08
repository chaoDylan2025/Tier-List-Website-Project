<script setup>
import draggable from 'vuedraggable'
import { ref, watch, computed } from 'vue'
import { updateSessionStorage, uploadToImageContainer } from '../front-end-code/customize_screen_functions.js'
import { open_tier_image_deletion_dialog, organizeTiers, image_click_evnt, deleteImages } from '../front-end-code/modify_tier_list_functions.js'

const emit = defineEmits(['open_tier_name_mod', 'open_tier_color_mod', 'delete_tiers', 'update:files_arr', 'update:current_tier_list'])
const props = defineProps({
    tier_list: Object,
    files_arr: Array,
    show_mod_buttons: Boolean,
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
    <div class="ma-auto mt-10 px-10 mb-10" style="width: 1200px;">
        <!-- Iterates through the tier list -->
        <v-row v-for="(tier, index) in current_tier_list" :key="tier.tier_name">
            <v-col>
                <v-row :key="tier.tier_name" :class="`d-flex h-auto`">
                    <!-- Displays when user wants to delete any tier(s) or any image container(s) -->
                    <div class="tier-list-left-column">
                        <v-checkbox
                            v-if="props.show_checkboxes === true"
                            v-model="tiers_to_delete_arr"
                            label=""
                            :value="tier">
                        </v-checkbox>
                        <div class="mr-4" v-if="current_tier_list.length > 1">
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
                                    <img :src="element.src" :class="element.styling" @click="image_click_evnt(props.show_trashcan, props.show_clear_button, element)"/>
                                </div>
                            </template>
                        </draggable>
                    </v-col>
                    <!-- Trashcan button for deleting selected images -->
                        <v-col v-if="props.show_trashcan && props.show_clear_button">
                        <v-btn @click="deleteImages(0, current_tier_list, index)" size="large" variant="plain" prepend-icon="mdi-trash-can"></v-btn>
                        <v-btn @click="deleteImages(1, current_tier_list, index)" size="small">
                            <span>
                                Clear
                            </span>
                        </v-btn>
                        </v-col>
                </v-row>
            </v-col>
            
            <div class="ml-4 d-flex align-center">
                <v-btn size="small"> Modify </v-btn>
            </div>
            <!-- Displays when user wants to modify any tier(s) -->
            <v-col class="tier-list-mod-buttons" style="align-self: center;" v-if="props.show_mod_buttons === true">
                <v-row>
                    <v-col class="tier-list-mod-buttons">
                        <v-btn @click="open_tier_name_mod_dialog(index, props.tier_list)" size="x-small" variant="plain" prepend-icon="mdi-pencil">Change Name</v-btn> 
                    </v-col>

                    <v-col class="tier-list-mod-buttons">
                        <v-btn @click="open_tier_color_mod_dialog(index, props.tier_list)" size="x-small" variant="plain" prepend-icon="mdi-format-color-fill">Change Color</v-btn>
                    </v-col>

                    <v-col class="tier-list-mod-buttons">
                        <v-btn @click="open_tier_image_deletion_dialog = true" size="x-small" variant="plain" prepend-icon="mdi-trash-can">Delete Images</v-btn>
                    </v-col>
                </v-row>
            </v-col>
        </v-row>

        <!-- Displays uploaded images -->
        <v-row class="mt-8">
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
    margin: 0px;
    margin-left: 12px;
    padding: 0px;
}
</style>