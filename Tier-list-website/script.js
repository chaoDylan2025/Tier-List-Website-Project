const num_of_images_in_row = [];

function createTierList(){
    document.getElementById("default_tier_list").innerHTML = 
    `<div class="tier">
        <div class="tier-name" id="S">
            <span> S </span>
        </div>
        <div class="image-container">
        </div>
    </div>
    <div class="tier">
        <div class="tier-name" id="A">
            <span> A </span>
        </div>
        <div class="image-container">
        </div>
    </div>
    <div class="tier">
        <div class="tier-name" id="B">
            <span> B </span>
        </div>
        <div class="image-container">
        </div>
    </div>
    <div class="tier">
        <div class="tier-name" id="C">
            <span> C </span>
        </div>
        <div class="image-container">
        </div>
    </div>
    <div class="tier">
        <div class="tier-name" id="D">
            <span> D </span>
        </div>
        <div class="image-container">
        </div>
    </div>
    <div class="tier">
        <div class="tier-name" id="F">
            <span> F </span>
        </div>
        <div class="image-container">
        </div>
    </div>`;

    const tiers = document.querySelectorAll('.tier');
    tiers.forEach(tier => {
        tier.addEventListener('dragover', dragOver);
        tier.addEventListener('drop', drop);
    });
    console.log(num_of_images_in_row);
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
    const image = new Image(100.00, 100.00);
    image.src = src;
    event.target.appendChild(image);
}

document.addEventListener('DOMContentLoaded', (event) => {
    const tiers = document.querySelectorAll('.tier');
    tiers.forEach(tier => {
        tier.addEventListener('dragover', dragOver);
        tier.addEventListener('drop', drop);
    });
    console.log(num_of_images_in_row);
});