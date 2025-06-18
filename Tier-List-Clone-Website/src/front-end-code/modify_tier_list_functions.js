import { ref } from 'vue'
import { updateTierList } from './customize_screen_functions'

// Opens modal dialog for changing selected tier's name
export var open_tier_modification_dialog = ref(false)

// Opens modal dialog for changing selected tier's color
export var open_tier_color_dialog = ref(false)

// Opens modal dialog for deleting tier list's images
export var open_tier_image_deletion_dialog = ref(false)

/***************************************************************************
 * Functions and variables for modifying selected tier's name or/and color *
 ***************************************************************************/
// Selected tier
export var current_tier = ref("")

// Original state of selected tier
export var original_tier = ref("")

// Index of selected tier
export var index_of_current_tier = ref(0)

// Assign variables their values before opening tier name modification dialog
export function open_tier_name_mod_dialog(index, props){
    current_tier = props[index]
    index_of_current_tier = index
    original_tier = props[index]
    open_tier_modification_dialog.value = true
}

// Assign variables their values before openining tier color modification dialog
export function open_tier_color_mod_dialog(index, props){
    current_tier = props[index]
    index_of_current_tier = index
    original_tier = props[index]
    open_tier_color_dialog.value = true
}

// Changes selected tier's new name
export function confirm_tier_name_change(state, new_name, index, props){
    props.tier_name = new_name // Changes name of selected tier
    updateTierList(index, props)
    open_tier_modification_dialog.value = state // Set to false to exit modal dialog
}

// Changes selected tier's color
export function confirm_tier_color_change(state, new_color, index, props){
    props.color = new_color // Changes name of selected tier
    updateTierList(index, props)
    open_tier_color_dialog.value = state // Set to false to exit modal dialog
}

// Organizes tiers
export function organizeTiers(tier_list, index, direction){
    // Reorganize the tier list only if the tier isn't the first or last tier
    if(index == 0 && direction == 0 || index == tier_list.length - 1 && direction == 1){
        return
    }
    else{
        /*
        * Move the tier up if direction is 0
        * Move the tier down if direction is not 0
        */
        direction == 0 ? swapTiers(tier_list, index, index-1) : swapTiers(tier_list, index, index + 1)
    }
    updateTierList(tier_list)
}

function swapTiers(tier_list, i, j){
    let tempVar = tier_list[i]
    let tierToSwap = tier_list[j]

    // Swap places
    tier_list[j] = tempVar
    tier_list[i] = tierToSwap  
}

// Click event that executes when user clicks on an image in a tier list image container
export function image_click_evnt(image){
    selectImage(image)
}
// Applys styling to an image that has been selected
export function selectImage(image){
    // Updates selected status of image
    image.selected = isSelected(image)
    // Gets the CSS class for the image
    image.styling = current_class_of_img(image.selected)
}

// Switches between true and false
export function isSelected(image){
    return !image.selected ? true: false
}

export function current_class_of_img(selected){
    return selected ? 'tier-image selected' : 'tier-image'
}

// Deletes selected images from image container
export function delete_selected_imgs(images){
    var tempArr = []
    images.forEach((img) => {
        if(!img.selected){
            tempArr.push(img)
        }
    })
    return tempArr
}

// Deletes images and updates session storage
export function deleteImages(deleteStatus, current_tier, index){
    if(deleteStatus == 0){
        current_tier.tier_image_container = delete_selected_imgs(current_tier.tier_image_container)
        updateTierList(index, current_tier)
    }
    else{
        current_tier.tier_image_container = []
        updateTierList(index, current_tier)
    }
}