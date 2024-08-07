function uploadImages(){ 
    console.log("Accessing images in your files...");
    const access_files = document.createElement("input");
    access_files.type = "file";
    access_files.accept = "image/png, image/jpeg";
    access_files.multiple = true;
    access_files.style.visibility = 'hidden'; 

    access_files.onchange = () => {
        const files = access_files.files;
        const placeHolder = document.getElementById('place-holder');

        for(const file of files){
            const reader = new FileReader();
            reader.onload = (e) => {
                const image = new Image(85, 85);
                image.src = e.target.result;
                image.draggable = true;
                image.addEventListener('dragstart', (event) => {
                    event.dataTransfer.setData('text/plain', e.target.result);
                });
                placeHolder.appendChild(image);
            }
            reader.readAsDataURL(file);
        } 
    }
    access_files.click();
}
