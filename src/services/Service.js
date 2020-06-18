import axios from 'axios';
// Dirección de la la API a consumir Heroku o donde esté publicado el back
// const baseURL = 'https://notas-back-nem.herokuapp.com/api/';
// Local
const baseURL = 'http://localhost:8000/api/';

export default axios.create({
  baseURL,
});
