/** @format */

export { app, analytics };
import { app } from "./firebaseConfig"; // Importa la configuración de Firebase
import { getFirestore, collection, getDocs } from "firebase/firestore";

//Aquí inicializo Firestore
const db = getFirestore(app);

//Aquí hago una petición a la base de datos, y guardo o obtengo obtengo los datos de la colección acc
const createUser = async (name, email, password) => {
  try {
    const docRef = await addDoc(collection(db, "users"), {
      name: name,
      nick: nick,
      email: email,
      password: password,
      creadoEn: new Date(),
    });
    console.log("Usuario añadido con ID:", docRef.id);
  } catch (error) {
    console.error("Error al crear usuario:", error);
  }
};

const form = document.querySelector(".form");

addEventListener("submit", (event) => {
  event.preventDefault();
  const nombre = form.querySelector(".nombre").value;
  const email = form.querySelector(".email").value;
  const password = form.querySelector(".password").value;
  createUser(email, nombre, password);
});


