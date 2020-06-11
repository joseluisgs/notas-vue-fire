import Service from './Service';

// Recurso a consumir
const resource = 'auth';

// Operaciones
export default {
  // Realiza el Login
  login(data) {
    return Service.post(`${resource}/login`, data);
  },
};
