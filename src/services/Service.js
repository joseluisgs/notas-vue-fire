import axios from 'axios';
// Dirección de la la API a consumir
const baseURL = 'https://notas-back-nem.herokuapp.com/api/';

export default axios.create({
  baseURL,
});
