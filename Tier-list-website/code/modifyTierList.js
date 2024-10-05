// Global variables
var selectedTier;
var selectedColor;

const tier_headers_arr = [];

var tiers_checked = new Set();

// Inner html for container of buttons in each dialog box
const button_inner_html = 
`<div id="backButton">
    <button class="confirmation-buttons back-button"> Back </button>
</div>
<div id="confirmButton">
    <button class="confirmation-buttons confirm-button"> Confirm </button>
</div>`;

retrieve_tier_header_names();

/** Present a dialogue box depending on button that was clicked */
const buttons_in_dialog = document.querySelectorAll('.modButtons');

buttons_in_dialog.forEach(current_button => {
    current_button.addEventListener("click", () => {
        var dialog_name = "";

        console.log("Pressed one of the buttons...");
        /** Opens the dialog box for changing color of any tier(s) */ 
        if(current_button.textContent == 'Change color of selected tier'){
            dialog_name = "change-tier-color";

            document.getElementById(dialog_name).innerHTML = 
            `
            <label for="tier-select">Choose a tier to change its color:</label>

            <select name="tiers" id="tier-select">
                <option value="">Select a tier</option>
                <option value="S">S</option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="D">D</option>
                <option value="F">F</option>
            </select>

            <div id="color-picker"></div>
            <div class="mod-buttons-area"></div>
            `;

            // Opens dialog box
            document.querySelector(`#${dialog_name}`).showModal();

            // default option for changing tier colors has been selected
            var default_option_selected = true;

            document.querySelector("#tier-select").addEventListener("change", (event) => {
                // Show color picker if any tier was selected
                if(event.target.value != "" && default_option_selected == true){
                    document.querySelector('#color-picker').innerHTML = `
                    <input type="color" id="colorInput" value="#ff0000">
                        <div class="color-info">
                            <p>HEX: <span id="hexValue">#ff0000</span></p>
                            <p>RGB: <span id="rgbValue">rgb(255, 0, 0)</span></p>
                        </div>
                    `;
                    selectedTier = event.target.value;
                    selectedColor = document.getElementById('hexValue').textContent;
                    default_option_selected = false;
                }

                // Remove color picker if 'Select a tier' was selected
                else if(event.target.value == "" && default_option_selected == false){
                    document.getElementById('color-picker').innerHTML = "";
                    default_option_selected = true;
                }

                // Allow user to continue to use the color picker
                if(event.target.value != "" && default_option_selected == false){
                    document.getElementById('colorInput').addEventListener('input', function() {
                        const color = this.value;
                        document.getElementById('hexValue').textContent = color;
                        document.getElementById('rgbValue').textContent = hexToRgb(color);
                        selectedColor = document.getElementById('hexValue').textContent;
                    });
                    selectedTier = event.target.value;
                }
            });
        }

        // Opens the dialog box for clearing images of any tier(s)
        else if(current_button.textContent == 'Clear selected tier'){
            dialog_name = "clear-tier";
            document.getElementById(dialog_name).innerHTML = 
            `
            <div id="header_for_tier_clearing"> 
                <span> <b> Select Tier(s) to clear </b> </span> 
            </div>

            <div id="checkbox_layout"></div>

            <div id="header_for_tier_clearing"> 
                <span> <b> Images being cleared </b> </span> 
            </div>

            <div id="images_of_tiers"></div>

            <br>
            <div class="mod-buttons-area"></div>
            `;
            checkbox_tier_names("checkbox_layout");
            content_of_checked_tiers("images_of_tiers");
            document.querySelector(`#${dialog_name}`).showModal();
        }

        // Opens the dialog box for clearing all tier list images
        else if(current_button.textContent == 'Clear Tier List'){
            tier_headers_arr.forEach(tier => {
                document.getElementById(`${tier}2`).innerHTML = "";
            });  
        }

        // Insert HTML code for the first 2 dialog boxes
        document.querySelectorAll('.mod-buttons-area').forEach(dialog_box => {
            dialog_box.innerHTML = button_inner_html;
        }); 

        // Add event listeners to the 'back' and 'confirm' buttons
        back_button_functionality(dialog_name);
        confirm_button_functionality(dialog_name)
    });
});


/***********************************************************
 * Button functionality for Back button and Confirm button *
 ***********************************************************/
function back_button_functionality(dialog_name){
    const back_buttons = document.querySelectorAll('.back-button');
    back_buttons.forEach(button => {
        button.addEventListener('click', () => {
            if(dialog_name == 'clear-tier'){
                document.getElementById('images_of_tiers').innerHTML = "";
            }
            document.getElementById(dialog_name).close();
        });
    });     
}

function confirm_button_functionality(dialog_name){
    const confirm_buttons = document.querySelectorAll('.confirm-button');

    confirm_buttons.forEach(button => {
        button.addEventListener('click', () => {
            // Modify tier's color
            if(dialog_name == 'change-tier-color'){
                const tier_color_to_change = document.getElementById(`${selectedTier}`);
                tier_color_to_change.style.backgroundColor = selectedColor;
            }
            // Clear images of selected tier(s)
            else if(dialog_name == 'clear-tier'){
                tiers_checked.forEach(tier => {
                    document.getElementById(`${tier}2`).innerHTML = "";
                });             
            }
            document.getElementById(dialog_name).close();
        });
    });
}

/************************
 * Dialog box functions *
 ************************/

// Adds checkboxes to all of the tier names in current tier list */
function checkbox_tier_names(div_id){
    var current_tier_list_id = document.querySelector(".tier_list_layout").id;
    var current_tier_list = document.getElementById(current_tier_list_id);

    const insert_in_container = document.getElementById(div_id);

    var current_tier = current_tier_list.querySelectorAll('.tier');
    current_tier.forEach((tier, index) => {
        // Contains checkbox and label for each tier
        const current_div = document.createElement('div');
        current_div.classList.add("checked");
        const checkbox = document.createElement('input');
        checkbox.type = "checkbox";
        checkbox.value = tier.textContent.trim();
        checkbox.id = `checkbox_${index}`;

        const label_div = document.createElement('label');
        label_div.htmlFor = `checkbox_${index}`;
        label_div.textContent = tier.textContent;
        current_div.append(checkbox);
        current_div.append(label_div);
        insert_in_container.append(current_div);
    });
}


/** Retrieve images of checked tiers */
function content_of_checked_tiers(div_to_insert_images){
    var current_tier_list = document.getElementById("default_tier_list");
    var checked_tiers = document.querySelectorAll('.checked');

    replicate_tier_list(div_to_insert_images);

    checked_tiers.forEach((tier, index) => {
        const checkbox = tier.querySelector(`#checkbox_${index}`);
        checkbox.addEventListener("change", () => {
            if(checkbox.checked){
                document.getElementById(`${tier_headers_arr[index]}3`).style.display = 'flex';
                tiers_checked.add(tier_headers_arr[index]);
            }
            else if(!checkbox.checked){
                document.getElementById(`${tier_headers_arr[index]}3`).style.display = 'none';
                tiers_checked.delete(tier_headers_arr[index]);
            }
        });
    });
}

/** Convert from hex value to RGB value */
function hexToRgb(hex) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgb(${r}, ${g}, ${b})`;
}

/** Recreate tier list structure and add display attribute to each tier */
function replicate_tier_list(div_to_insert_images){
    const insert_in_container = document.getElementById(div_to_insert_images);
    const colors_arr = ["rgb(253, 123, 123)", "rgb(255, 170, 91)", "rgb(253, 226, 144)", "rgb(246, 253, 123)", "rgb(146, 246, 115)", "rgb(123, 253, 244)"];
    const tiers = document.querySelectorAll(".tier");
    var color_index = 0;

    tier_headers_arr.forEach(index => {
        const current_div = document.createElement('div');
        current_div.classList.add("current_tier");
        current_div.id = `${index}3`;
        current_div.style.display = 'none';

        const current_div_name = document.createElement('div');
        current_div_name.classList.add("current_tier_name");
        current_div_name.id = `${index}4`;
        current_div_name.innerHTML = document.getElementById(index).innerHTML;   
        current_div_name.style.backgroundColor = colors_arr[color_index];     
        current_div.append(current_div_name);
    
        const actual_content = document.createElement('div');
        actual_content.classList.add("current_image_container");
        actual_content.id = `${index}5`;
        actual_content.innerHTML = document.getElementById(`${index}2`).innerHTML;
        current_div.append(actual_content);

        insert_in_container.append(current_div);
        color_index ++;
    });
}


/** Append tier header names in an array */
function retrieve_tier_header_names(){
    const tier_headers = document.querySelectorAll('.tier-name');
    tier_headers.forEach(name => {
        tier_headers_arr.push(name.textContent.trim());
    });
}


/**************************************
 * Tier list customization functions *
 **************************************/

/** Creates a dialog box that will let users see the custom tier list they are creating */
function create_custom_tier_list(){
    document.getElementById("tier_list_customization").innerHTML =
    `
    <div id="options_for_tier_list_customization">
        <label for="num_of_tiers"> Enter number of tiers for your custom tier list (3-15):</label>
        <input id="num_of_tiers" type="number" min="3" max="15"/>
        <button onclick="show_tier_naming_option()"> Enter </button>
    </div>
    <div id="names_for_tiers"></div>
    <div class="mod-buttons-area"></div>
    `

    //document.querySelector(".mod-buttons-area").innerHTML = button_inner_html;
    document.getElementById("tier_list_customization").showModal();
}

/** Executes when user clicks on enter after inputting some number */
function show_tier_naming_option(){
    if(document.getElementById("num_of_tiers").value == 3){
        console.log("User is considering to have 3 tiers in tier list...");
    }
}