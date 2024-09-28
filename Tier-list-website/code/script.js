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
    // Simulate mouse click
    access_files.click();
}

/** Uses a function from the Dragula JS Library for image dragging and dropping */
function image_dragging(){
    // Inserts array of valid containers into 'containers' key of the dragula function
    let arr_of_containers = create_array_of_valid_containers();
    dragula({containers: arr_of_containers});
}

/** Creates an array of valid containers that allow image dragging and dropping */
function create_array_of_valid_containers(){
    let name_of_tier_list_id = document.querySelector(".tier_list_layout").id;
    let arr_of_tier_ids = [document.querySelector("#place-holder")];

    // Push all tier ids of the current tier list to an array
    document.getElementById(`${name_of_tier_list_id}`).querySelectorAll(`.image-container`).forEach(e =>
        {
            arr_of_tier_ids.push(document.querySelector(`#${e.id}`));
        }
    );
    return arr_of_tier_ids;
}