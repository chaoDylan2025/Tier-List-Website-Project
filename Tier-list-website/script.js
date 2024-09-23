/** Upload images to the tier list image container */
// ADD DIV TO IMAGES
function uploadImages(){ 
    // Creates hidden input element that allows user to upload their image files
    const access_files = document.createElement("input");
    access_files.type = "file";
    access_files.accept = "image/png, image/jpeg";
    access_files.multiple = true;
    access_files.style.visibility = 'hidden'; 

    // Executes this code when user selects their image files
    access_files.onchange = () => {
        // Array of files selected
        const files = access_files.files;
        // Access div where images will be stored for user to drag to any tiers
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

function image_dragging(){
    // Allow image dragging from image place holder to tiers
    drake = dragula({containers: [document.querySelector("#place-holder"), document.querySelector("#S2"), document.querySelector("#A2"), document.querySelector("#B2"), document.querySelector("#C2"), document.querySelector("#D2"), document.querySelector("#F2")]});
}