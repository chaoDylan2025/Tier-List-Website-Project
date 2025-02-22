import {ref, computed} from 'vue'

// Opens modal dialog for changing selected tier's name
export var open_tier_modification_dialog = ref(false)

// Opens modal dialog for changing selected tier's color
export var open_tier_color_dialog = ref(false)

/***********************************************************************
 * Functions and variables for modifying selected tier's name or color *
 ***********************************************************************/
// Selected tier
export var current_tier = ref("")

// Original content of selected tier
export var original_tier = ref("")

// Index of selected tier
export var index_of_current_tier = ref(0)

// Returns computed property that changes current tier's name
function get_tier_name_change_computed_property(props){
    return computed({
        get(){
            return props[index_of_current_tier.value]
        },
        set(new_name){
            props[index_of_current_tier].tier_name = new_name
        }
    })
}

// Returns computed property that changes current tier's color
function get_tier_color_change_computed_property(props){
    return computed({
        get(){
            return props[index_of_current_tier.value]
        },
        set(new_color){
            props[index_of_current_tier].color = new_color
        }
    })
}

export function get_tier_list_prop(prop){
    return prop
}

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
export function confirm_tier_name_change(state, new_name, props){
    const tier = get_tier_name_change_computed_property(props)
    // Changes name of selected tier
    tier.value = new_name
    // Set to false to exit modal dialog
    open_tier_modification_dialog.value = state
}

// Changes selected tier's color
export function confirm_tier_color_change(state, new_color, props){
    const tier_color = get_tier_color_change_computed_property(props)
    // Changes name of selected tier
    tier_color.value = new_color
    // Set to false to exit modal dialog
    open_tier_color_dialog.value = state
}