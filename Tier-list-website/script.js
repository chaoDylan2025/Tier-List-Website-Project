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

    const tiers = document.querySelectorAll('.image-container');
    tiers.forEach(tier => {
        tier.addEventListener('dragover', dragOver);
        tier.addEventListener('drop', drop);
    });
}

function dragStart(event) {
    event.dataTransfer.setData('text/plain', event.target.src);
}

function dragOver(event) {
    event.preventDefault();
}

function drop(event) {
    event.preventDefault();
    const src = event.dataTransfer.getData('text/plain');
    const image = new Image();
    image.style.width = '85px';
    image.style.height = 'auto';

    image.src = src;
    image.draggable = true;

    image.addEventListener("dragstart", (e) => {
        e.dataTransfer.setData("text/plain", e.target.src);
    });

    const from_image_container = document.querySelector(`#place-holder img[src="${image.src}"]`);
    if(from_image_container){
        from_image_container.remove();
    }
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

document.addEventListener('DOMContentLoaded', (event) => {
    const tiers = document.querySelectorAll('.image-container');
    tiers.forEach(tier => {
        tier.addEventListener('dragover', dragOver);
        tier.addEventListener('drop', drop);
    });
});