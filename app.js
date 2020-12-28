//import dino data
import info from './dino.json';

// Create Dino Constructor
function Specie(data) {
    this.species = data.species;
    this.weight = data.weight;
    this.diet = data.diet;
    this.height = data.height;
    this.fact = data.fact;
}

// Create Dino Objects
const dinoFactory = (dino) => {
    return dino.map((dino) => {
        return new Specie(dino)
    });
};

let createdDinos = dinoFactory(info.Dinos);

// Create Human Object
const user = new Specie({
    species: 'Human',
    name: '',
    weight: '',
    diet: '',
    height: '',
    fact: ''
});

// Use IIFE to get human data from form

const getHumanData = (function() {
    document.getElementById('btn').addEventListener('click', function(e) {
        replaceContent();
        user.name = document.getElementById('name').value;
        user.height = (parseFloat(document.getElementById('feet').value) * 12) + parseFloat(document.getElementById('inches').value);
        user.weight = parseFloat(document.getElementById('weight').value);
        user.diet = document.getElementById('diet').value;
        createTiles(createdDinos);
    });
})();

// Create Dino Compare Method 1
// NOTE: Weight in JSON file is in lbs, height in inches.

// Create Dino Compare Method 2
// NOTE: Weight in JSON file is in lbs, height in inches.

// Create Dino Compare Method 3
// NOTE: Weight in JSON file is in lbs, height in inches.

// Generate Tiles for each Dino in Array

const createTiles = (createdDinos) => {
    createdDinos.splice(3, 0, user);
    let tiles = document.getElementById('grid');
    tiles.innerHTML = "";

    createdDinos.forEach(item => {
        const tile = document.createElement('div');
        tile.className = 'grid-item';

        const title = document.createElement('h2');
        title.textContent = item.species;

        const image = document.createElement('img');
        image.src = `images/${item.species}.png`

        const fact = document.createElement('p');
        fact.textContent = item.fact;

        tile.appendChild(title);
        tile.appendChild(image);
        tile.appendChild(fact);

        tiles.appendChild(tile)
    });
};

// Add tiles to DOM

// Remove form from screen
const replaceContent = () => {
    document.getElementById('dino-compare').style.display = "none";
};

// On button click, prepare and display infographic

