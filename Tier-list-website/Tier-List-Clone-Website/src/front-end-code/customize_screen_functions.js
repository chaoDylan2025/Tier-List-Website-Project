import { ref } from 'vue'

// Contains the initial default tier list
export var default_tier_list = ref([
    {
        tier_name: "S", 
        color: "rgb(253, 123, 123)",
        tier_image_container: ref([])
    },
    {
        tier_name: "A", 
        color: "rgb(255, 170, 91)",
        tier_image_container: ref([])
    },
    {
        tier_name: "B", 
        color: "rgb(253, 226, 144)",
        tier_image_container: ref([])
    },
    {
        tier_name: "C", 
        color: "rgb(246, 253, 123)",
        tier_image_container: ref([])
    },
    {
        tier_name: "D", 
        color: "rgb(146, 246, 115)",
        tier_image_container: ref([])
    },
    {
        tier_name: "F", 
        color: "rgb(123, 253, 244)",
        tier_image_container: ref([])
    },
])

export var custom_tier_list = ref([])

// Contains colors used in default tier list
export const colors_of_default_tier_list = ["rgb(253, 123, 123)", "rgb(255, 170, 91)", "rgb(253, 226, 144)", "rgb(246, 253, 123)", "rgb(146, 246, 115)", "rgb(123, 253, 244)"]

// Opens modal dialog for customizing tier list
export var open_modal_dialog = ref(false)

// Opens modal dialog for deleting tiers in tier list
export var delete_tiers_modal_dialog = ref(false)

// Contains image files
export var files_arr = ref([])

// Inserts a new tier in the tier list
export function add_new_tier(tier_list){
    const num_of_tiers = tier_list.length
    tier_list.push({
        tier_name: `Tier ${num_of_tiers+1}`,
        color: colors_of_default_tier_list[getRandomInt(0, colors_of_default_tier_list.length)],
        tier_image_container: []
    })
}

// Gets a random number between the minimum number and maximum number
export function getRandomInt(min, max) {
  const minCeiled = Math.ceil(min)
  const maxFloored = Math.floor(max)
  return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled)
}

// Updates current tier list based on modifications
export function updateTierList(state, new_tier_list){
    open_modal_dialog.value = state
    default_tier_list.value = new_tier_list
}

// Deletes selected tiers from current tier list
export function deleteTiers(state, deleted_tiers){
    delete_tiers_modal_dialog.value = state
    const new_tier_list = default_tier_list.value.filter((tier) => !deleted_tiers.includes(tier))
    default_tier_list.value = new_tier_list
}

// Upload images to image container
export function uploadToImageContainer(){
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