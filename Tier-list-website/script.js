// Creates a default tier list after the 'Create a Tier List' button has been clicked
function createTierList(){
    document.getElementById("default_tier_list").innerHTML = 
    `<div class="tier">
        <div class="tier-name" id="S">
            <span> S </span>
        </div>
        <div class="image-container"></div>
    </div>
    <div class="tier">
        <div class="tier-name" id="A">
            <span> A </span>
        </div>
        <div class="image-container"></div>
    </div>
    <div class="tier">
        <div class="tier-name" id="B">
            <span> B </span>
        </div>
        <div class="image-container"></div>
    </div>
    <div class="tier">
        <div class="tier-name" id="C">
            <span> C </span>
        </div>
        <div class="image-container"></div>
    </div>
    <div class="tier">
        <div class="tier-name" id="D">
            <span> D </span>
        </div>
        <div class="image-container"></div>
    </div>
    <div class="tier">
        <div class="tier-name" id="F">
            <span> F </span>
        </div>
        <div class="image-container"></div>
    </div>`;

    // Allows images in every tier of tierlist to be dragged and dropped
    const tiers = document.querySelectorAll('.image-container');
    tiers.forEach(tier => {
        tier.addEventListener('dragover', dragOver);
        tier.addEventListener('drop', drop);
    });
}

// Allows user to drag images
function dragOver(event) {
    event.preventDefault();
}

// Allows user to drop images
function drop(event) {
    event.preventDefault();

    // Ensure that the target is the correct image container
    var image_in_container = event.target;
    if (!image_in_container.classList.contains('image-container')) {
        image_in_container = image_in_container.closest('.image-container');
    }

    // Get url of image that is being dragged
    const src = event.dataTransfer.getData('text/plain');

    // Creates image element of image being dragged
    const image = new Image();
    image.style.width = '85px';
    image.style.height = '85px';
    image.src = src;
    image.style.objectFit = 'cover';
    image.draggable = true;

    // Sets dragged data to image's src attribute
    image.addEventListener("dragstart", (e) => {
        e.dataTransfer.setData("text/plain", e.target.src);
    });

    // Remove selected image(s) from previous location
    const from_image_container = document.querySelector(`#place-holder img[src="${image.src}"]`);
    if(from_image_container){
        from_image_container.remove();
    } 
    else {
        const tiers = document.querySelectorAll('.image-container');
        tiers.forEach(tier => {
            const existing_image = tier.querySelector(`img[src="${image.src}"]`);
            if(existing_image){
                existing_image.remove();
            }
        });
    }
    
    /** Rearranging images in a tier */
    const all_images = image_in_container.querySelectorAll('img');
    var inserted_image = false;

    // Iterate through all images to properly rearrange images
    for(var i = 0; i < all_images.length; i++){
        const current_image = all_images[i];
        const current_rect = current_image.getBoundingClientRect();

        // Insert image to the left if current image is being moved to the left
        if(event.clientX < current_rect.left + current_rect.width / 2){
            image_in_container.insertBefore(image, current_image);
            inserted_image = true;
            break;
        }
    }

    // Append image if no images are being moved to the left
    if(!inserted_image){
        image_in_container.appendChild(image);
    }
}