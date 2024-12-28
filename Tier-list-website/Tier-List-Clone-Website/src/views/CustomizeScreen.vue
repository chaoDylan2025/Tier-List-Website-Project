<script setup>
import draggable from 'vuedraggable'
import {ref, onMounted} from 'vue'

// Contains the initial default tier list
var default_tier_list = ref([
    {
        tier_name: "S", 
        color: "red-lighten-3",
        tier_image_container: []
    },
    {
        tier_name: "A", 
        color: "yellow-darken-3",
        tier_image_container: []
    },
    {
        tier_name: "B", 
        color: "yellow-darken-1",
        tier_image_container: []
    },
    {
        tier_name: "C", 
        color: "yellow-lighten-1",
        tier_image_container: []
    },
    {
        tier_name: "D", 
        color: "lime-accent-2",
        tier_image_container: []
    },
    {
        tier_name: "F", 
        color: "lime-accent-4",
        tier_image_container: []
    },
])

// Contains image files
var files_arr = ref([])

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
                    <v-btn size="small"> Create new Tier </v-btn>
                </v-col>
                <v-col>
                    <v-btn size="small"> Modify Tiers </v-btn>
                </v-col>
                <v-col>
                    <v-btn size="small"> Delete Tiers </v-btn>
                </v-col>
            </v-row>
        
        </v-container>

        <!-- Contains the default tier list structure -->
        <v-container class="d-print-inline px-10 mb-10 h-auto">
            <!-- Iterates through an object that contains default tier list -->
            <v-row v-for="tier in default_tier_list" :key="tier.tier_name" :class="`bg-${tier.color} d-print-flex h-auto w-100 tier-border overflow-hidden`">
                <!-- Contains tier name and its color -->
                <v-col class="h-auto w-auto"> 
                    <p class="text-center text-break font-weight-bold"> {{ tier.tier_name }} </p>
                </v-col>
                <v-col class="d-flex flex-wrap align-end overflow-hidden h-auto w-100 bg-grey-darken-4">
                </v-col>
            </v-row>
        </v-container>

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