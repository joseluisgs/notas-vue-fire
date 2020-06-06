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
