<script setup>
import { ref, computed, onMounted } from 'vue'
import draggable from 'vuedraggable'
import TierListDisplay from '../components/TierListDisplay.vue'
import ModifyTierList from '../components/ModifyTierList.vue'
import DeleteTiers from '../components/DeleteTiers.vue'
import { open_modal_dialog, delete_tiers_modal_dialog, files_arr } from '../front-end-code/customize_screen_functions'
import { add_new_tier, updateTierList, deleteTiers, uploadToImageContainer } from '../front-end-code/customize_screen_functions'

const props = defineProps({
    tier_list: Object
})

var current_tier_list = ref(props.tier_list)
</script>

<template>
    <v-app class="bg-black">
        <v-container>
            <v-row>
                <v-col>
                    <v-btn @click="add_new_tier(current_tier_list)" size="small"> Create new Tier </v-btn>
                </v-col>
                <v-col>
                    <v-btn @click="open_modal_dialog = true" size="small"> Modify Tiers </v-btn>
                </v-col>
                <v-col>
                    <v-btn @click="delete_tiers_modal_dialog = true" size="small"> Delete Tiers </v-btn>
                </v-col>
            </v-row>
        </v-container>

        <TierListDisplay :tier_list="current_tier_list"  @update_tier_images="update_tier_images_arr"/>

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
                    v-model="files_arr"
                    group="tier_list"
                    tag="transition-group"
                    item-key="id">
                        <template #item="{ element }" :key="element.id">
                            <div>
                                <img :src="element.src" height="85" width="85"></img>   
                            </div>
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

        <!-- Displays if user wants to customize tier list -->
        <v-dialog
        v-model="open_modal_dialog"
        scrim="white"
        height="auto"
        width="1000">
            <v-container style="background-color: white">
                <ModifyTierList :open_dialog="open_modal_dialog" :tier_list="current_tier_list" @close="(state) => open_modal_dialog = state"
                    @update="updateTierList"/>
            </v-container>
        </v-dialog>

        <!-- Displays if user wants to delete any tier(s) -->
        <DeleteTiers :tier_delete_dialog="delete_tiers_modal_dialog" :tier_list="current_tier_list" @close="(state) =>  delete_tiers_modal_dialog = state"
            @deleteTiers="deleteTiers"/>
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
#place-holder{
    background-color: rgba(27, 27, 27, 0.927);
    border-style: solid;
    border-width: 1px;
}
#place-holder img{
    width: 85px;
}
</style>