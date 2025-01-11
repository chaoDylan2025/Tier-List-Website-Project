<script setup>
import draggable from 'vuedraggable'
import TierListDisplay from '../components/TierListDisplay.vue'
import ModifyTierList from '../components/ModifyTierList.vue'
import {ref, onMounted} from 'vue'

// Contains the initial default tier list
var default_tier_list = ref([
    {
        tier_name: "S", 
        color: "rgb(253, 123, 123)",
        tier_image_container: []
    },
    {
        tier_name: "A", 
        color: "rgb(255, 170, 91)",
        tier_image_container: []
    },
    {
        tier_name: "B", 
        color: "rgb(253, 226, 144)",
        tier_image_container: []
    },
    {
        tier_name: "C", 
        color: "rgb(246, 253, 123)",
        tier_image_container: []
    },
    {
        tier_name: "D", 
        color: "rgb(146, 246, 115)",
        tier_image_container: []
    },
    {
        tier_name: "F", 
        color: "rgb(123, 253, 244)",
        tier_image_container: []
    },
])

// Contains colors used in default tier list
const colors_of_default_tier_list = ["rgb(253, 123, 123)", "rgb(255, 170, 91)", "rgb(253, 226, 144)", "rgb(246, 253, 123)", "rgb(146, 246, 115)", "rgb(123, 253, 244)"]

// Opens modal dialog for customizing tier list
var open_modal_dialog = ref(false)

// Contains image files
var files_arr = ref([])

// Inserts a new tier in the tier list
function add_new_tier(tier_list){
    const num_of_tiers = tier_list.length
    tier_list.push({
        tier_name: `Tier ${num_of_tiers+1}`,
        color: colors_of_default_tier_list[getRandomInt(0, colors_of_default_tier_list.length)],
        tier_image_container: []
    })
}

// Gets a random number between the minimum number and maximum number
function getRandomInt(min, max) {
  const minCeiled = Math.ceil(min)
  const maxFloored = Math.floor(max)
  return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled)
}

// Updates current tier list based on modifications
function updateTierList(state, new_tier_list){
    open_modal_dialog.value = state
    default_tier_list = new_tier_list
}

// Upload images to image container
function uploadToImageContainer(){
    // Creates hidden input element that allows the user to upload their images
    const access_files = document.createElement("input");
    access_files.type = "file";
    access_files.accept = "image/png, image/jpeg";
    access_files.multiple = true;
    access_files.style.visibility = 'hidden'; 

    // Executes when user selects their images
    access_files.onchange = () => {
        // Array of selected files
        const files = access_files.files;

        // Accesses the div where all images will be uploaded to
        const placeHolder = document.getElementById('place-holder');

        // Iterate through every file
        for(const file of files){
            // Reads current file
            const reader = new FileReader();
            reader.onload = (e) => {
                // Append image file to an array of draggable elements
                files_arr.value.push(e.target.result)
            }
            // Reads contents of current file
            reader.readAsDataURL(file);
        } 
    }
    // Simulate mouse click
    access_files.click();
}

</script>

<template>
    <v-app class="bg-black">
        <v-container>
            <v-row>
                <v-col>
                    <v-btn @click="add_new_tier(default_tier_list)" size="small"> Create new Tier </v-btn>
                </v-col>
                <v-col>
                    <v-btn @click="open_modal_dialog = true" size="small"> Modify Tiers </v-btn>
                </v-col>
                <v-col>
                    <v-btn size="small"> Delete Tiers </v-btn>
                </v-col>
            </v-row>
        </v-container>

        <TierListDisplay :tier_list="default_tier_list"/>

        <v-container id="image-place-holder-area">
            <div>
                <p id="cap_for_user"> Insert your images or uploaded images here </p>
            </div> 
            <div class="d-flex flex-column" id="image-place-holder">
                <div class="mt-3 mb-3">
                    <div class="ml-2">
                        <v-btn @click="uploadToImageContainer()" size="small"> Upload </v-btn>
                    </div>  
                </div>
                <div class="d-flex text-start justify-start align-start h-100 w-100" id="place-holder">
                    <draggable
                    :list="files_arr"
                    itemKey="index">
                        <template #item="{ element }">
                            <img :src="element" height="85" width="85"></img>
                        </template>
                    </draggable>
                </div>
            </div>  
        </v-container> 

        <!-- Contains trash icon that deletes images -->
        <v-container>
            <v-row></v-row>
            <v-row>
                <v-col cols="10"></v-col>
                <v-col>
                    <v-hover>
                        <template v-slot:default="{ isHovering, props }">
                            <v-card width="25" v-bind="props" :color="isHovering ? 'primary' : 'black'">
                                <v-icon :icon="`mdi-delete`"></v-icon>
                            </v-card>
                        </template>
                    </v-hover>
                </v-col>
            </v-row>

        </v-container>

        <ModifyTierList :open_dialog="open_modal_dialog" :tier_list="default_tier_list" @close="(state) => open_modal_dialog = state"
            @update="updateTierList"/>
    </v-app>
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