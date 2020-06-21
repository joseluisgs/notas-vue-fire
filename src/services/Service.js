// Firebase
import firebase from 'firebase/app'; // mejor que poner import firebase from 'firebase';
// Firebase y sus servicios
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';
import FirebaseConfig from './FirebaseConfig'; // Mejor para desplegar build

// Configuramos Firebase desde env
// const firebaseConfig = {
//   apiKey: process.env.VUE_APP_FIRE_API_KEY,
//   authDomain: process.env.VUE_APP_FIRE_AUTH_DOMAIN,
//   databaseURL: process.env.VUE_APP_FIRE_DATABASE_URL,
//   projectId: `${process.env.VUE_APP_FIRE_PROJECT_ID}`,
//   storageBucket: process.env.VUE_APP_FIRE_STORAGE_BUCKET,
//   messagingSenderId: process.env.VUE_APP_FIRE_MESSAGING_SENDER_ID,
//   appId: process.env.VUE_APP_FIRE_APP_ID,
// };

// Configuramos firebase desde nuestro fichero de FirebaseConfig.js
// Para desplegarlo en Heroku, esta vez es mejor hacerlo así porque al ser un cliente compilado
// Ya lee las variables
const firebaseConfig = FirebaseConfig;

// Inicializar Firebase
const defaultProject = firebase.initializeApp(firebaseConfig);

// Elementos de Firebase a usar (Cargamos los que vayamos a usar)
const db = firebase.firestore(); // Base de datos en tiempo real
const auth = firebase.auth(); // Autenticación
const storage = firebase.storage(); // Almacenamiento
const { currentUser } = auth;
// Autenticación de Google, poner uno por método de identificación. Se deb eactivar en la consola de Firebase
const providerGoogle = new firebase.auth.GoogleAuthProvider();

// imprimimos el nombre del proyecto, esto espor depurar, luego quitar
console.log(defaultProject.name); // "[DEFAULT]"console.log(defaultProject.name);  // "[DEFAULT]"

// Exportamos lo que necesitemos
export default {
  db,
  auth,
  storage,
  currentUser,
  providerGoogle,
};
