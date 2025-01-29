<script setup>
import ModifyTierList from '../components/ModifyTierList.vue';
const props = defineProps({
    open_mod_tier_list: Boolean,
    tier_list: Object
})

</script>

<template>
    <ModifyTierList :open_dialog="props.open_mod_tier_list" :tier_list="props.tier_list"/>
</template>