// Firebase
import firebase from 'firebase/app'; // mejor que poner import firebase from 'firebase';
// Firebase y sus servicios
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';

// Configuramos Firebase
const firebaseConfig = {
  apiKey: process.env.VUE_APP_FIRE_API_KEY,
  authDomain: process.env.VUE_APP_FIRE_AUTH_DOMAIN,
  databaseURL: process.env.VUE_APP_FIRE_DATABASE_URL,
  projectId: `${process.env.VUE_APP_FIRE_PROJECT_ID}`,
  storageBucket: process.env.VUE_APP_FIRE_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_FIRE_MESSAGING_SENDER_ID,
  appId: process.env.VUE_APP_FIRE_APP_ID,
};
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

// Aquí si quremos podriamos exportar las colecciones
// firebase collections
// const usersCollection = db.collection('users');
// const postsCollection = db.collection('posts');
// const commentsCollection = db.collection('comments');
// const likesCollection = db.collection('likes');

// Exportamos lo que necesitemos
export default {
  db,
  auth,
  storage,
  currentUser,
  providerGoogle,
  // usersCollection,
  // postsCollection,
  // commentsCollection,
  // likesCollection,
};

// Creamos una colección si no exiuste e insertamos un documento, con la clave, es set
// db.collection('cities').doc('LA').set({
//   name: 'Los Angeles',
//   state: 'CA',
//   country: 'USA',
// })
//   .then(() => {
//     console.log('Document successfully written!');
//   })
//   .catch((error) => {
//     console.error('Error writing document: ', error);
//   });
