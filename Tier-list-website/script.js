document.addEventListener('DOMContentLoaded', () => {

    // Handle dragging images into place-holder
    const placeHolder = document.getElementById("place-holder");

    placeHolder.addEventListener("dragover", (e) => {
        e.preventDefault();
    });

    placeHolder.addEventListener("drop", (e) => {
        e.preventDefault();

        const imageUrl = e.dataTransfer.getData('text/html');
        const urlMatch = imageUrl.match(/src="([^"]+)"/);

        if (urlMatch) {
            const url = urlMatch[1];

            // Create a new image element
            const newImage = document.createElement('img');
            newImage.src = url;
            newImage.draggable = true;
            newImage.align = "left";

            // Set up dragstart event
            newImage.addEventListener("dragstart", (e) => {
                e.dataTransfer.setData("text/plain", e.target.src);
            });

            placeHolder.appendChild(newImage);
        }
    });

    // Handle dragging images into tier containers
    const tiers = document.querySelectorAll(".image-container");

    tiers.forEach(tier => {
        tier.addEventListener("dragover", (e) => {
            e.preventDefault();
        });

        tier.addEventListener("drop", (e) => {
            e.preventDefault();

            const imgSrc = e.dataTransfer.getData('text/plain');

            // Find the image with the dragged src
            const sourceImage = document.querySelector(`#place-holder img[src="${imgSrc}"]`);

            if (sourceImage) {
                sourceImage.remove(); // Remove from place-holder

                // Create a new image element
                const newImage = document.createElement('img');
                newImage.src = imgSrc;
                newImage.draggable = true;

                // Set up dragstart event
                newImage.addEventListener("dragstart", (e) => {
                    e.dataTransfer.setData("text/plain", e.target.src);
                });

                tier.appendChild(newImage);
            } 
            else {
                alert("The image could not be found in the place-holder.");
            }
        });
    });
});

function createTierList(){
    document.getElementById("default_tier_list").innerHTML = 
    `<div id="tier-list">
        <div id="tier-list-container">
            <div class="tier" id="S">
                <span class="tier-name">S</span>
            </div>
            <div class="image-container" draggable="true"></div>
        </div>
        <div id="tier-list-container">
            <div class="tier" id="A">
                <span class="tier-name">A</span>
            </div>
            <div class="image-container" draggable="true"></div>
        </div>
        <div id="tier-list-container">
            <div class="tier" id="B">
                <span class="tier-name">B</span>
            </div>
            <div class="image-container" draggable="true"></div>
        </div>
        <div id="tier-list-container">
            <div class="tier" id="C">
                <span class="tier-name">C</span>
            </div>
            <div class="image-container" draggable="true"></div>
        </div>
        <div id="tier-list-container">
            <div class="tier" id="D">
                <span class="tier-name">D</span>
            </div>
            <div class="image-container" draggable="true"></div>
        </div>
        <div id="tier-list-container">
            <div class="tier" id="F">
                <span class="tier-name">F</span>
            </div>
            <div class="image-container" draggable="true"></div>
        </div>
    </div>`;  
}