/** @format */

import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { app } from "./firebaseConfig";

const db = getFirestore(app);
const auth = getAuth(app);

async function loadFavorites() {
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      const userDocRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        const favorites = userDoc.data().favorites || [];
        console.log("Favoritos del usuario:", favorites);
        // Aquí puedes renderizar los Pokémon favoritos en el DOM
        favorites.forEach((pokemonId) => {
          renderFavoritePokemon(pokemonId);
        });
      } else {
        console.log("No se encontraron datos del usuario");
      }
    } else {
      console.log("Usuario no autenticado");
    }
  });
}

function renderFavoritePokemon(pokemonId) {
  const favoritesContainer = document.querySelector(".favorites-container");
  const template = `<div>Pokémon ID: ${pokemonId}</div>`;
  favoritesContainer.insertAdjacentHTML("beforeend", template);
}

loadFavorites();
