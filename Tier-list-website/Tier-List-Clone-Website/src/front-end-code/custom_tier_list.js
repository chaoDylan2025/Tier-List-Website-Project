import { ref, computed } from 'vue'

// Opens Custom Tier List modal dialog if prop is 'CustomTierList'
export function open_custom_tier_list(props){
    if (props == true){
        return true
    }
    else{
        console.log("No...")
    }
}
