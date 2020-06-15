import Service from './Service';

// Recurso a consumir
const resource = 'files';

// Operaciones
export default {
  // sube un fichero
  post(file, token) {
    // Creamos los campos del formulario
    const formData = new FormData();
    formData.append('file', file);
    // Configuración
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
    };
    return Service.post(`${resource}`, formData, config);
  },
  // Elimina un fichero asociado
  delete(id, token) {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    return Service.delete(`${resource}/${id}`, config);
  },
};
