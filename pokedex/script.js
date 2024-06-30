// https://pokeapi.co/api/v2/
// Fetch a pokemon by name
// Display the name, height, weight, and image
// Display stats
// Display types
// Display previous searches as buttons that can be clicked to re-fetch the data
//pokeapi.co/api/v2/{id or name}/


let pokeForm = document.getElementById("pokeForm");
var pokeAmount = 0; //variable to keep track of how many pokemon were searched
var currentActive = 0; //variable for css styling and some of the logic

//functions
//function signature for the search bar to go up once submition has been detected
function listenOnce(el, evt, fn){
  el.addEventListener(evt, fn, { once: true });
}

//main function: creating a pokemon card.
function createNewPokeCard(data){
  
  //Object to keep track of the fetched data
  let pokeData = {
    name: data.name,
    height: data.height,
    weight: data.weight,
    image: data.sprites.front_default,
    stats: [],
    types: []
  };


  var div = document.createElement('div');
  var pokeCardId = "poke-card-"+pokeAmount;

  pokeAmount++;
  
  div.setAttribute('class', 'poke-card active'); 
  div.setAttribute('id', pokeCardId);
  document.getElementById("container").appendChild(div);
  div.innerHTML += '<h2 class="poke-title">'+pokeData.name+'</h2>';
  div.innerHTML += '<div class="image-container"><img class="poke-image" src='+pokeData.image+'></div>';
  div.innerHTML += '<p class="poke-attributes">Weight:'+pokeData.weight+' Height:'+pokeData.height+'</p>';

  var statblock = document.createElement('div');
  statblock.setAttribute('class', 'stat-block');
  document.getElementById(pokeCardId).appendChild(statblock);

  for (let i = 0; i < data.stats.length; i++){
    pokeData.stats.push({
      name: data.stats[i].stat.name,
      rate: data.stats[i].base_stat
    });
    statblock.innerHTML += '<p class="stats-rate">'+pokeData.stats[i].rate+'</p><p class="stats-name">'+pokeData.stats[i].name+'</p>';
  }

  div.innerHTML += '<p class="type-title">Types</p>';

  var typeblock = document.createElement('div');
  typeblock.setAttribute('class', 'type-block');
  document.getElementById(pokeCardId).appendChild(typeblock);

  for (let i = 0; i < data.types.length; i++){
    pokeData.types.push({
      name: data.types[i].type.name
    });
    typeblock.innerHTML += '<p class="types">'+pokeData.types[i].name+'</p>';
  }

  currentActive=pokeAmount-1;

  if (pokeAmount>1){
    moveCards();
  }
}

//functions
//After clicking submit, make an animation play of the search bar going up
listenOnce( document.getElementById('pokeForm'), 'submit',
  () => {
    document.getElementById("search").className = "search-up";
});

//After clicking submit, fetch data, call other functions
pokeForm.addEventListener("submit", (e) => {
  //prevent reload
  e.preventDefault();

  //User input
  let usrPokemon = document.getElementById("pokename").value;

  //convert user input so that it can be compared to all lowercase data from the api
  usrPokemon = usrPokemon.toLowerCase();

  console.log("User entered", usrPokemon);

  //api url with limit of 1302, whcih is all pokemons
  const apiURL = "https://pokeapi.co/api/v2/pokemon?limit=1302";

  fetch(apiURL)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
      
      //find user's input
      const found = data.results.find((pokeObj) => pokeObj.name == usrPokemon);
      if (found) {
        console.log("success!", found);
        //fetch data for the pokemon
        var pokeURL = found.url;
        return fetch(pokeURL);
      } 
      //throw error and alert
      else {
        alert("Pokemon not found. Make sure you haven't entered any typos");
        throw new Error("Pokemon not found");
      }
    })
    //this is for the pokeURL
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
      //if everything is good to go, create new card
      createNewPokeCard(data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});

//Function for changing the cards to the next set of cards
function goToNext () {

  document.querySelector("#poke-card-"+currentActive).classList.replace('active', 'previous-card');
  document.querySelector("#poke-card-"+(currentActive+1)).classList.replace('next-card', 'active');

  if (document.getElementById("poke-card-"+(currentActive-1))){
    document.querySelector("#poke-card-"+(currentActive-1)).classList.replace('previous-card', 'inactive');
  }
  if (document.getElementById("poke-card-"+(currentActive+2))){
  document.querySelector("#poke-card-"+(currentActive+2)).classList.replace('inactive', 'next-card');
  }

  currentActive++;

  if (currentActive == pokeAmount-1){
    document.getElementById("right").className = "inactive";
  }

  document.getElementById("left").className = "active-button";
}

//Function for changing the cards to the previous set of cards
function goToPrevious () {

  document.getElementById("right").className = "active-button";

  document.querySelector("#poke-card-"+currentActive).classList.replace('active', 'next-card');
  document.querySelector("#poke-card-"+(currentActive-1)).classList.replace('previous-card', 'active');

  if (document.getElementById("poke-card-"+(currentActive+1))){
    document.querySelector("#poke-card-"+(currentActive+1)).classList.replace('next-card', 'inactive');
  }
  if (document.getElementById("poke-card-"+(currentActive-2))){
  document.querySelector("#poke-card-"+(currentActive-2)).classList.replace('inactive', 'previous-card');
  }

  currentActive--;

  if (currentActive == 0){
    document.getElementById("left").className = "inactive";
  }
}

//Function for when the user searches a new pokemon, which requires all of the cards to dissapear,
//the new card to become active and the new-1 card become previous
function moveCards () {
  document.getElementById("left").className = "active-button";
  document.getElementById("right").className = "inactive";
  
  var removecards = document.getElementsByClassName("poke-card");

  for (let i = 0; i < removecards.length; i++){
    removecards[i].className = 'poke-card inactive';
  }

  document.querySelector("#poke-card-"+(currentActive-1)).className = "poke-card previous-card";
  document.querySelector("#poke-card-"+currentActive).className = "poke-card active";
}