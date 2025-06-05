import { ref } from 'vue'
import { router } from '../router/index'
import { add_new_tier, custom_tier_list, updateSessionStorage } from './customize_screen_functions'

// Opens Custom Tier List modal dialog if prop is 'CustomTierList'
export function open_custom_tier_list(props){
    if (props == true){
        return true
    }
    else{
        console.log("No...")
    }
}

// Creates custom tier list
export function create_custom_tier_list(custom_tier_list, num_of_tiers, open_modal_dialog){
    for(let i = 0; i < num_of_tiers; i++){
        add_new_tier(custom_tier_list)
    }
    open_modal_dialog.value = true
}

// Updates custom tier list and navigates to Customization page
export function updateCustomTierList(tier_list){
    custom_tier_list.value = tier_list
    updateSessionStorage('custom_tier_list', custom_tier_list.value)
    router.push({name: 'CustomTierList'})    
}
