// Save current state of tier list
var json_string;

// Present user with a dialogue box depending on button they clicked on
const buttons_in_dialog = document.querySelectorAll('.modButtons');
buttons_in_dialog.forEach(current_button => 
{
    current_button.addEventListener("click", () => {
        var dialog_name = "";

        // Opens the dialog box for the user to change color of any tier(s)
        if(current_button.textContent == 'Change color of selected tier'){
            dialog_name = "change-tier-color";
            document.getElementById(dialog_name).innerHTML = 
            `
            <button>What color would you like for the selected tier</button>
            <button class="modButtons back-button"> Back </button>
            `;
            document.querySelector(`#${dialog_name}`).showModal();  
            back_button_functionality(dialog_name);
        }

        // Opens the dialog box for the user to change color of any tier(s)
        else if(current_button.textContent == 'Clear selected tier'){
            dialog_name = "clear-tier";
            document.getElementById(dialog_name).innerHTML = 
            `
            <div id="current_tier_list_layout"></div>
            <br>
            <button class="modButtons back-button"> Back </button>
            `;
            checkbox_tier_names("current_tier_list_layout");
            document.querySelector(`#${dialog_name}`).showModal();
            back_button_functionality(dialog_name);
        }

        // Opens the dialog box for the user to delete any tier(s)
        else if(current_button.textContent == 'Clear Tier List'){
            alert("Clearing all images in tier list...");
        }
    });
});

/** Exits the dialog box if user clicks on the 'back' button */
function back_button_functionality(dialog_name){
    const back_button = document.querySelectorAll('.back-button');
    back_button.forEach(button => {
        button.addEventListener('click', () => {
            document.getElementById(dialog_name).close();
        });
    });
}

/** Adds checkboxes to all of the tier names in current tier list */
function checkbox_tier_names(div_id){
    // Current tier list to access
    var current_tier_list = document.getElementById("default_tier_list");
    // Current tier of iteration
    var current_tier = current_tier_list.querySelectorAll('.tier');
    // Insert elements in this container
    const insert_in_container = document.getElementById(div_id);

    current_tier.forEach(tier => {
        // Creates checkbox for current tier
        var checkbox = document.createElement('input');
        checkbox.type = "checkbox";
        checkbox.value = tier.id;
        // Current div to insert current tier content
        const current_div = document.createElement('div');
        current_div.classList.add("current_tier");
        // Contains actual content of tier
        const actual_content = document.createElement('div');
        actual_content.innerHTML = `${tier.innerHTML}`;

        insert_in_container.append(current_div);
        current_div.append(actual_content);
        current_div.insertBefore(checkbox, actual_content);
    });
}

/** Save current state of tier list */
function save_tier_list_state(divId) {
    const div = document.getElementById(divId);
    
    // Holds the state of each tier's images
    const state = [];

    // Loop through each child element in the div
    div.childNodes.forEach(child => {
        if (child.tagName === "IMG") {
            state.push({
                tag: child.tagName,
                src: child.src,
                width: child.style.width,
                height: child.style.height,
            });
        } 
        else if (child.tagName) {
            console.log(`Current child being appended to state: ${child.tagName}`)
            state.push({
                tag: child.tagName,
                innerHTML: child.innerHTML,        
            });
        }
    });
    // Convert state array to JSON string
    const stateJSON = JSON.stringify(state);

    return stateJSON;
}

/** Restore tier list */
function restore_tier_list(divId, stateJSON) {
    const div = document.getElementById(divId);

    // Clear the current content of the div
    div.innerHTML = "";

    // Parse JSON string to get state array
    const state = JSON.parse(stateJSON);

    // Loop through each saved state and recreate the elements
    state.forEach(item => {
        let element;
        if (item.tag === "IMG") {
            element = new Image();
            element.src = item.src;
            element.style.width = item.width;
            element.style.height = item.height;
        } 
        else {
            element = document.createElement(item.tag);
            element.innerHTML = item.innerHTML;
            console.log(element.innerHTML);
        }
        div.appendChild(element);
    });
}