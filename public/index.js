/** @format */

import { render } from "../components/render.js";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, updateDoc, arrayUnion } from "firebase/firestore";
import { app } from "/firebaseConfig.js";


function createPokemonCard(pokemon) {
  const selector = ".main-container";
  const position = "beforeend";
  const capitalize =
    pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
  const pokemonImg = pokemon.sprites.other["official-artwork"].front_default;
  const template = /*html*/ `
    <div class="pokemon-card-total">
     <div class="flip-container">
            <div class="card">
                <div class="front">
                    <h2>${capitalize}</h2>
                    <p>(Detalles)</p>
                </div>
                <div class="back">
                    <p>Height: ${pokemon.height}</p>
                    <p>Weight: ${pokemon.weight}</p>
                    <p>Base Experience: ${pokemon.base_experience}</p>
                    <p>Types: ${pokemon.types
                      .map((typeInfo) => typeInfo.type.name)
                      .join(", ")}</p>
                </div>

            </div>
        </div>
    
    
    <div class="pokemon-card">
            <article class="pokemon-images">
                <img src="/img/pokeball_no_background_fixed.png" alt="imagen de ${
                  pokemon.name
                }" class="pokemon-image">
                <img src="${pokemonImg}" alt="imagen de ${
    pokemon.name
  }" class="pokemon-image">
            </article>
        </div>
    </div>
    <button class="favorite" value=${pokemon.id} >Añadir a favorito</button>
    `;

  render(selector, position, template);
}

function buttonsNextPrevious() {
  let offset = 0;

  const buttonNext = document.querySelector(".next");
  const buttonPrevious = document.querySelector(".previous");

  function checkOffset() {
    if (offset === 0) {
      buttonPrevious.setAttribute("disabled", "");
      
    } else {
      buttonPrevious.removeAttribute("disabled");
      
    }
  }
  checkOffset();

  buttonNext.addEventListener("click", () => {
    const pokemonContainer = document.querySelector(".main-container");
    pokemonContainer.innerHTML = "";
    offset += 10;
    checkOffset();
    console.log(offset);
    getPokemon(offset);
  });
  buttonPrevious.addEventListener("click", () => {
    const pokemonContainer = document.querySelector(".main-container");
    pokemonContainer.innerHTML = "";
    offset -= 10;
    checkOffset();
    console.log(offset);
    getPokemon(offset);
  });
}

async function getPokemon(offset) {
  try {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=10`
    );
    const data = await response.json();
    const pokemonList = data.results;
    pokemonList.forEach(async (pokemon) => {
      try {
        const pokemonDetails = await fetch(pokemon.url);
        const pokemonData = await pokemonDetails.json();
        createPokemonCard(pokemonData);
      } catch (error) {
        console.error("Error fetching pokemonData:", error);
      }
    });
  } catch (error) {
    console.error("Error fetching url:", error);
  }
}

function lookForPokemon() {
  const searchForm = document.querySelector(".search-form");

  searchForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const searchInput = searchForm.querySelector(".search");
    const searchValue = searchInput.value.trim().toLowerCase();
    async function searchPokemon(name) {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
        const data = await response.json();
        document.querySelector(".main-container").innerHTML = "";
        createPokemonCard(data);
      } catch (error) {
        console.error("Error de fetch en búsqueda:", error);
      }
    }
    searchPokemon(searchValue);
    searchForm.reset();
  });
}



const db = getFirestore(app);
const auth = getAuth(app);

document.addEventListener("click", async (event) => {
  if (event.target.classList.contains("favorite")) {
    const pokemonId = event.target.value; 
    const user = auth.currentUser;

    if (user) {
      const userDocRef = doc(db, "users", user.uid);
      try {
        
        await updateDoc(userDocRef, {
          favorites: arrayUnion(Number(pokemonId)),
        });
        console.log(`Pokémon ${pokemonId} añadido a favoritos`);
      } catch (error) {
        console.error("Error al añadir a favoritos:", error);
      }
    } else {
      console.log("El usuario no está autenticado");
    }
  }
});

function initAuthStateListener() {
  const auth = getAuth(app);
  const userStatusElement = document.getElementById("user-status");

  onAuthStateChanged(auth, (user) => {
    if (user) {
      const userEmail = user.email;
      userStatusElement.textContent = `Conectado como: ${userEmail}`;
      userStatusElement.style.color = "green";
    } else {
      userStatusElement.textContent = "No estás conectado";
      userStatusElement.style.color = "red";
    }
  });
}

// Llama a la función al final del archivo
initAuthStateListener();



fetchPokemonData();
buttonsNextPrevious();
getPokemon();
lookForPokemon();