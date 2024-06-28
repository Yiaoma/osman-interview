// https://pokeapi.co/api/v2/
// Fetch a pokemon by name
// Display the name, height, weight, and image
// Display stats
// Display types
// Display previous searches as buttons that can be clicked to re-fetch the data
//pokeapi.co/api/v2/ability/{id or name}/

const apiURL = "https://pokeapi.co/api/v2/";

fetch(apiURL)
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  })
  .then((data) => {
    console.log(data);
  })
  .catch((error) => {
    console.error("Error:", error);
  });

var pokename = document.querySelector("pokemon");
