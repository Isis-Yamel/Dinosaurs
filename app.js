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
        return new Specie(dino);
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
    fact: '',
});

// Use IIFE to get human data from form
const getHumanData = (function () {
  document.getElementById('btn').addEventListener('click', function (e) {
    replaceContent();
    user.name = document.getElementById('name').value;
    user.height =
      parseFloat(document.getElementById('feet').value) * 12 +
      parseFloat(document.getElementById('inches').value);
    user.weight = parseFloat(document.getElementById('weight').value);
    user.diet = document.getElementById('diet').value;
    createTiles(createdDinos);
  });
})();

// *NOTE: Weight in JSON file is in lbs, height in inches.
// Create Dino Compare Method 1
const compareHeight = item => item.fact = item.height > 63 ? `${item.species}, you are like a Anklyosaurus height!` : `${item.species}'s height is about 6 pigeons`;

// Create Dino Compare Method 2
const compareWeight = item => item.fact = item.weight > 100 ? `${item.species} you are equivalent to 700 Brachiosaurus` : `${item.species} are you a feather?`;

// Create Dino Compare Method 3
const compareOriginalFact = item => item.fact;

//Obtain random fact
const getFact = item => {
    const randomKey = Math.floor(Math.random() * (3 - 1 + 1)) + 1;

    switch (randomKey) {
        case 0:
            return compareHeight(item)
            break;
        case 1:
            return compareWeight(item)
            break;
        case 2:
           return compareOriginalFact(item)
            break;
        case 3:
            return compareWeight(item)
            break;
        default:
            break;
    };
};

//Generate random order for dinos
const randomGenerator = random => random.sort(() => Math.random() - 0.5);

//Validate to show name when specie is Human
const getName = item => item.species === 'Human' ? item.name : item.species;

// Generate Tiles for each Dino in Array
const createTiles = (createdDinos) => {
    randomGenerator(createdDinos);
    createdDinos.splice(4, 0, user);
    let content = '';

    createdDinos.forEach((item) => {
        let name = getName(item);
        let fact = getFact(item);

        content +=
        `<div class="grid-item">
            <h2>${name}</h2>
            <img src="images/${item.species}.png"/>
            <p>${fact}</p>
        </div>`
    });

    buildTiles(content);
};

// Add tiles to DOM
const buildTiles = content => {
    let tiles = document.getElementById('grid');
    tiles.innerHTML = content;
};

// Remove form from screen
const replaceContent = () => {
    document.getElementById('dino-compare').style.display = 'none';
};

// On button click, prepare and display infographic

