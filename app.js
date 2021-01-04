// import dino data
import info from './dino.json';
// import facts
import facts from './facts';

// Create Dino Constructor
function Specie(data) {
  this.species = data.species;
  this.name = data.name;
  this.weight = data.weight;
  this.diet = data.diet;
  this.height = data.height;
  this.where = data.where;
  this.when = data.when;
  this.fact = data.fact;
}

// Create Dino Objects
const dinoFactory = (dino) => dino.map((i) => new Specie(i));
const CREATED_DINOS = dinoFactory(info.Dinos);

// *NOTE: Weight in JSON file is in lbs, height in inches.
// Create Dino Compare Method 1
const compareHeight = (item, user) => (item.height > user.height ? `${item.species}, ${user.name} is an ant for you!` : `${item.species}'s height is close to ${user.name}`);

// Create Dino Compare Method 2
const compareWeight = (item, user) => (item.weight > user.weight ? `${item.species} eats like a entire city of ${user.name}s` : `${item.species} in pounds, you are equivalent to ${user.name} `);

// Create Dino Compare Method 3
const compareOriginalFact = (item) => item.fact;

// Create Dino Compare Method 4
// Return one item : https://www.geeksforgeeks.org/how-to-select-a-random-element-from-array-in-javascript/
const factsFactory = () => facts[Math.floor(Math.random() * facts.length)];

// Create Dino Compare Method 5
const compareWhere = (item, user) => (item.where === user.where ? `${item.species}, you share origin with this human ${user.name}` : `${item.species} you would love to visit ${user.name}'s territory: ${user.where}`);

// Create Dino Compare Method 6
const compareWhen = (item, user) => (item.when === user.when ? `${item.species} you share period with ${user.name}. Very suspicious!` : `${item.species} probably this human ${user.name} don't even know about your period: ${item.when}!`);

// Obtain random fact
const getFact = (item, user) => {
  // generate random number : https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript
  // random switch case : https://stackoverflow.com/a/49081914
  const RANDOM_KEY = Math.floor(Math.random() * (5 - 1 + 1)) + 1;
  let fact;

  switch (RANDOM_KEY) {
    case 0:
      fact = compareHeight(item, user);
      break;
    case 1:
      fact = compareWeight(item, user);
      break;
    case 2:
      fact = compareOriginalFact(item);
      break;
    case 3:
      fact = factsFactory();
      break;
    case 4:
      fact = compareWhere(item, user);
      break;
    case 5:
      fact = compareWhen(item, user);
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
const createTiles = (createdDinos, user) => {
  randomGenerator(createdDinos);
  createdDinos.splice(4, 0, user);
  let content = '';

  createdDinos.forEach((item) => {
    const NAME = getName(item);
    const GET_FACT = item.species === 'Pigeon' ? item.fact : getFact(item, user);
    const FACT = item.species === 'Human' ? '' : GET_FACT;

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

// Calculate heigh in inches. Formula : https://www.metric-conversions.org/length/feet-to-inches.htm
const getHeight = (feet, inches) => (feet * 12) + inches;

// Use IIFE to get human data from form
// For IIFE validation I check this repo fork from udacity project https://github.com/sreejithvs333/Javascript/blob/master/app.js
const GET_HUMAN_DATA = (function getData() {
  const name = document.getElementById('name');
  const feet = document.getElementById('feet');
  const inches = document.getElementById('inches');
  const weight = document.getElementById('weight');
  const diet = document.getElementById('diet');
  const where = document.getElementById('where');
  const when = document.getElementById('when');

  function getHumanName() {
    return name.value;
  }

  function getHumanHeight() {
    return getHeight(feet.value, inches.value);
  }

  function getHumanWeight() {
    return weight.value;
  }

  function getHumanDiet() {
    return diet.value;
  }

  function getHumanWhere() {
    return where.value;
  }

  function getHumanWhen() {
    return when.value;
  }

  return {
    getHumanName,
    getHumanHeight,
    getHumanWeight,
    getHumanDiet,
    getHumanWhere,
    getHumanWhen,
  };
}());

// On button click, prepare and display infographic
document.getElementById('btn').addEventListener('click', () => {
  // Validate all fields content
  // I do review this answer to make this validation https://stackoverflow.com/questions/25311923/javascript-validation-for-all-field-with-required-attribute
  if (GET_HUMAN_DATA.getHumanName() === '' || GET_HUMAN_DATA.getHumanWeight() === '' || GET_HUMAN_DATA.getHumanDiet() === '' || GET_HUMAN_DATA.getHumanHeight() === '' || GET_HUMAN_DATA.getHumanWhen() === '' || GET_HUMAN_DATA.getHumanWhere() === '') {
    alert('All fields are required!');
  } else {
    replaceContent();

    const USER = new Specie({
      species: 'Human',
      name: GET_HUMAN_DATA.getHumanName(),
      weight: GET_HUMAN_DATA.getHumanWeight(),
      diet: GET_HUMAN_DATA.getHumanDiet(),
      height: GET_HUMAN_DATA.getHumanHeight(),
      where: GET_HUMAN_DATA.getHumanWhere(),
      when: GET_HUMAN_DATA.getHumanWhen(),
      fact: 'It has been estimated that humans use only 10% of their brain',
    });

    createTiles(CREATED_DINOS, USER);
  }
});
