/** Upload images to the tier list image container */
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
                image.draggable = true;
                // Allows images in tier list image container to be dragged
                image.addEventListener('dragstart', (event) => {
                    event.dataTransfer.setData('text/plain', e.target.result);
                });
                // Append image to tier list image container
                placeHolder.appendChild(image);
            }
            // Reads contents of current file
            reader.readAsDataURL(file);
        } 
    }
    // Simulates mouse click on 'input' element
    access_files.click();
}
