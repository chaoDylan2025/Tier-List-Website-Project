/** Present user with a dialogue box of choices for tier list modification */
const open_modify_tier_dialog = document.querySelector('.modify-options');
const button_to_open_modify_dialog = document.querySelector('#modify_tier_list');
button_to_open_modify_dialog.addEventListener("click", () =>{
    open_modify_tier_dialog.showModal();
});

const close_modify_tier_dialog = document.querySelector('.cancel_tier_mod');
close_modify_tier_dialog.addEventListener("click", () => {
    open_modify_tier_dialog.close();
});
