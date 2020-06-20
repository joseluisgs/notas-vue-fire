import Service from './Service';

// Recurso a consumir
const resource = 'notas';

// Operaciones
export default {
  // Devuleve todo
  // https://firebase.google.com/docs/firestore/query-data/get-data?hl=es-419
  async get(filter, value) {
    const docs = await Service.db.collection(resource).where(filter, '==', value).get();
    const notas = [];
    docs.forEach((doc) => {
      // Mapeamos los campos, lo hago porque me interesa meter el id dentro.
      notas.push({
        id: doc.id,
        titulo: doc.data().titulo,
        descripcion: doc.data().descripcion,
        fecha: doc.data().fecha,
        fichero: doc.data().fichero,
      });
    });
    return notas;
  },
  // Devuelve por id
  getById(id, token) {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    return Service.get(`${resource}/${id}`, config);
    // return Service.get(resource, id);
  },
  // Crea uno nuevo
  // https://firebase.google.com/docs/firestore/manage-data/add-data?hl=es-419#web
  post(data) {
    return Service.db.collection(resource).add(data);
  },
  // Actualiza con put
  put(id, data, token) {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    return Service.put(`${resource}/${id}`, data, config);
  },
  // Actualizo con patch
  patch(id, data, token) {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    return Service.patch(`${resource}/${id}`, data, config);
  },
  // Elimina
  delete(id, token) {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    return Service.delete(`${resource}/${id}`, config);
  },
};

// Función de GET
// NotasService.get().then((items) => (console.log(items.data)));
// Función GEt by ID
// NotasService.getById('5edb7ca00528ba0003a94fb3').then((item) => (console.log(item.data)));
// const nuevo = { titulo: ' Prueba vue mod' };
// NotasService.post(nuevo).then((item) => (console.log(item.data)));
// NotasService.put('5edb7ca00528ba0003a94fb3', nuevo).then((item) => (console.log(item.data)));
// NotasService.delete('5edb7ca00528ba0003a94fb3').then((item) => (console.log(item.data)));
