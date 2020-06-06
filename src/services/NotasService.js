import Service from './Service';

// Recurso a consumir
const resource = 'notas';

// Operaciones
export default {
  // Devuleve todo
  get() {
    return Service.get(resource);
  },
  // Devuelve por id
  getById(id) {
    return Service.get(`${resource}/${id}`);
    // return Service.get(resource, id);
  },
  // Crea uno nuevo
  post(data) {
    return Service.post(resource, data);
  },
  // Actualiza con put
  put(id, data) {
    return Service.put(`${resource}/${id}`, data);
  },
  // Actualizo con patch
  patch(id, data) {
    return Service.patch(`${resource}/${id}`, data);
  },
  // Elimina
  delete(id) {
    return Service.delete(`${resource}/${id}`);
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
