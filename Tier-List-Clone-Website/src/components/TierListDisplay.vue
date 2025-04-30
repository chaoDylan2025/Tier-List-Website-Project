<script setup>
import draggable from 'vuedraggable'
import { ref, onMounted, watch, computed } from 'vue'
import { saveToSessionStorage, updateSessionStorage, uploadToImageContainer } from '../front-end-code/customize_screen_functions.js'

const emit = defineEmits(['open_tier_name_mod', 'open_tier_color_mod', 'delete_tiers', 'update:files_arr', 'update:current_tier_list'])
const props = defineProps({
    tier_list_name: String,
    tier_list: Object,
    files_arr: Array,
    show_files_arr: Boolean,
    show_mod_buttons: Boolean,
    show_checkboxes: Boolean,
})

const current_tier_list_name = ref(props.tier_list_name)

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
function update_delete_tiers_arr(arr, index){
    emit('delete_tiers', arr, index)
}

// Tiers to delete
var tiers_to_delete_arr = ref([])

// Adds or removes any tiers from tiers_to_delete_arr
watch (() => tiers_to_delete_arr.value, (new_arr) => {
    update_delete_tiers_arr(new_arr)
})

// Access sessionStorage everytime user refreshes page
onMounted(() => {
    saveToSessionStorage(current_tier_list_name.value, current_tier_list.value)
    current_tier_list.value = ref(JSON.parse(sessionStorage.getItem(current_tier_list_name.value)))
})
</script>

<template>
    <div style="width: 100%; box-sizing: border-box;">
        <!-- Contains tier list structure -->
        <v-container class="ma-auto mt-10 px-10 mb-10">
            <!-- Iterates through the tier list -->
            <v-row class="d-flex flex-row" v-for="(tier, index) in current_tier_list" :key="tier.tier_name">
                <!-- Displays when user wants to delete any tier(s) -->
                <div class="mr-5" v-if="props.show_checkboxes === true">
                    <v-row>
                        <v-checkbox
                            v-model="tiers_to_delete_arr"
                            label=""
                            :value="tier">
                        </v-checkbox>
                    </v-row>
                </div>
        
                <!-- Contains the tier's name and color -->
                <v-col>
                    <!-- Tier color -->
                    <v-row :key="tier.tier_name" :class="`d-print-flex h-auto w-auto tier-border overflow-hidden`" :style="`background-color: ${tier.color}`">
                        <!-- Tier name -->
                        <v-col class="h-auto w-auto"> 
                            <p class="text-center text-break font-weight-bold" :style="`color: black`"> {{ tier.tier_name }} </p>
                        </v-col>
                        <!-- Images for the Tier -->
                        <v-col class="d-flex flex-wrap align-end overflow-hidden h-auto w-100 bg-grey-darken-4">
                            <draggable
                            v-model="tier.tier_image_container"
                            class="d-flex"
                            group="tier_list"
                            item-key="id"
                            @change="updateSessionStorage(current_tier_list_name, current_tier_list)"
                            >
                                <template #item="{ element }">
                                    <img :src="element.src" height="85" width="85"></img>
                                </template>
                            </draggable>
                        </v-col>
                    </v-row>
                </v-col>
            
                <!-- Displays when user wants to modify any tier(s) -->
                <v-col v-if="props.show_mod_buttons === true">
                    <v-row>
                        <v-col>
                            <v-btn @click="open_tier_name_mod_dialog(index, props.tier_list)" size="x-small" variant="plain" prepend-icon="mdi-pencil">Change Name</v-btn> 
                        </v-col>

                        <v-col>
                            <v-btn @click="open_tier_color_mod_dialog(index, props.tier_list)" size="x-small" variant="plain" prepend-icon="mdi-format-color-fill"> Change Color</v-btn>
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>

            <!-- Displays uploaded images -->
            <v-row class="mt-8" v-if="props.show_files_arr">
                <div class="w-100" id="image-place-holder-area">
                    <div>
                        <p id="cap_for_user"> Insert your images or uploaded images here </p>
                    </div> 
                    <div class="d-flex flex-column" id="image-place-holder">
                        <div class="mt-3 mb-3">
                            <div class="ml-2">
                                <v-btn @click="uploadToImageContainer()" size="small"> Upload </v-btn>
                            </div>  
                        </div>
                        <div id="place-holder">
                            <draggable
                            v-model="files_arr"
                            class="d-flex"
                            group="tier_list"
                            item-key="id">
                                <template #item="{ element }">
                                    <div>
                                        <img :src="element.src" height="85" width="85"></img>   
                                    </div>
                                </template>
                            </draggable>
                        </div>
                    </div>  
                </div>
            </v-row>
        </v-container>
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
#place-holder{
    background-color: rgba(27, 27, 27, 0.927);
    border-style: solid;
    border-width: 1px;
}
#place-holder img{
    width: 85px;
}
</style>