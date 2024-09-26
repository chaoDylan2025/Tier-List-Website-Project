/** Upload images to the tier list image container */
function uploadImages(){ 
    // Creates hidden input element that allows the user to upload their images
    const access_files = document.createElement("input");
    access_files.type = "file";
    access_files.accept = "image/png, image/jpeg";
    access_files.multiple = true;
    access_files.style.visibility = 'hidden'; 

    // Execute this code when user selects their images
    access_files.onchange = () => {
        // Array of files selected
        const files = access_files.files;

        const placeHolder = document.getElementById('place-holder');

        // Iterates through every file in files array
        for(const file of files){
            // Reads current file
            const reader = new FileReader();
            reader.onload = (e) => {
                // Create image element of image file selected
                const image = new Image(85, 85);
                image.src = e.target.result;
                
                let image_div = document.createElement('div');
                image_div.append(image);
                placeHolder.appendChild(image_div);
            }
            // Reads contents of current file
            reader.readAsDataURL(file);
        } 
    }
    // Simulates mouse click on 'input' element
    access_files.click();
}

/** Uses a function from the Dragula JS Library for image dragging and dropping */
function image_dragging(){
    // Allow image dragging from image place holder to tiers
    // FIX BY CREATING FUNCTION THAT CREATES ARRAYS OF ALL TIER IDS
    let arr_of_containers = create_array_of_valid_containers();

    // dragula({containers: [document.querySelector("#place-holder"), document.querySelector("#S2"), document.querySelector("#A2"), 
    //     document.querySelector("#B2"), document.querySelector("#C2"), document.querySelector("#D2"), document.querySelector("#F2")]});
    dragula({containers: arr_of_containers});
}

function create_array_of_valid_containers(){
    let name_of_tier_list_id = document.querySelector(".tier_list_layout").id;
    let arr_of_tier_ids = [document.querySelector("#place-holder")];

    document.getElementById(`${name_of_tier_list_id}`).querySelectorAll(`.image-container`).forEach(e =>
        {
            arr_of_tier_ids.push(document.querySelector(`#${e.id}`));
        }
    );

    return arr_of_tier_ids;
}