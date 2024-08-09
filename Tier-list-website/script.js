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

    // Get url of image that is being dragged
    const src = event.dataTransfer.getData('text/plain');

    // Creates image element of image being dragged
    const image = new Image();
    image.style.width = '85px';
    image.style.height = 'auto';
    image.src = src;
    image.draggable = true;

    // Sets dragged data to image's src attribute
    image.addEventListener("dragstart", (e) => {
        e.dataTransfer.setData("text/plain", e.target.src);
    });

    // Remove selected images from tier list image container if those images are dragged into any tiers
    const from_image_container = document.querySelector(`#place-holder img[src="${image.src}"]`);
    if(from_image_container){
        from_image_container.remove();
    }
    // Remove selected images from tiers if selected images are moved into different tiers
    else{
        const tiers = document.querySelectorAll('.image-container');
        tiers.forEach(tier => {
            const from_image_container = document.querySelector(`.image-container img[src="${image.src}"]`);
            if(from_image_container){
                from_image_container.remove();
            }
        });
    }
    event.target.appendChild(image);
}