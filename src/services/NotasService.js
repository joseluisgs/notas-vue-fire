import Service from './Service';

// Recurso a consumir
const resource = 'notas';

// Operaciones
export default {
  // Devuleve todo
  get(token) {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    return Service.get(resource, config);
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
  post(data, token) {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    return Service.post(resource, data, config);
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
