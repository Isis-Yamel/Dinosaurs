// import dino data
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
const dinoFactory = (dino) => dino.map((i) => new Specie(i));

const CREATED_DINOS = dinoFactory(info.Dinos);

// Create Human Object
const user = new Specie({
  species: 'Human',
  name: '',
  weight: '',
  diet: '',
  height: '',
  fact: 'It has been estimated that humans use only 10% of their brain',
});

// *NOTE: Weight in JSON file is in lbs, height in inches.
// Create Dino Compare Method 1
const compareHeight = (item) => (item.height > 63 ? `${item.species}, you are like a Anklyosaurus height!` : `${item.species}'s height is about 6 pigeons`);

// Create Dino Compare Method 2
const compareWeight = (item) => (item.weight > 100 ? `${item.species} you are equivalent to 700 Brachiosaurus` : `${item.species} are you a feather?`);

// Create Dino Compare Method 3
const compareOriginalFact = (item) => item.fact;

// Obtain random fact
const getFact = (item) => {
  const RANDOM_KEY = Math.floor(Math.random() * (3 - 1 + 1)) + 1;
  let fact;

  switch (RANDOM_KEY) {
    case 0:
      fact = compareHeight(item);
      break;
    case 1:
      fact = compareWeight(item);
      break;
    case 2:
      fact = compareOriginalFact(item);
      break;
    case 3:
      fact = compareWeight(item);
      break;
    default:
      break;
  }

  return fact;
};

// Generate random order for dinos
const randomGenerator = (random) => random.sort(() => Math.random() - 0.5);

// Validate to show name when specie is Human
const getName = (item) => (item.species === 'Human' ? item.name : item.species);

// Add tiles to DOM
const buildTiles = (content) => {
  const TILES = document.getElementById('grid');
  TILES.innerHTML = content;
};

// Generate Tiles for each Dino in Array
const createTiles = (createdDinos) => {
  randomGenerator(createdDinos);
  createdDinos.splice(4, 0, user);
  let content = '';

  createdDinos.forEach((item) => {
    const NAME = getName(item);
    const FACT = item.species === 'Pigeon' ? item.fact : getFact(item);

    content
    += `<div class="grid-item">
        <h2>${NAME}</h2>
        <img src="images/${item.species}.png"/>
        <p>${FACT}</p>
    </div>`;
  });

  buildTiles(content);
};

// Remove form from screen
const replaceContent = () => {
  document.getElementById('dino-compare').style.display = 'none';
};

// Use IIFE to get human data from form
// On button click, prepare and display infographic
(function getHumanData() {
  document.getElementById('btn').addEventListener('click', () => {
    replaceContent();
    user.name = document.getElementById('name').value;
    user.height = parseFloat(document.getElementById('feet').value) * 12
      + parseFloat(document.getElementById('inches').value);
    user.weight = parseFloat(document.getElementById('weight').value);
    user.diet = document.getElementById('diet').value;
    createTiles(CREATED_DINOS);
  });
}());
