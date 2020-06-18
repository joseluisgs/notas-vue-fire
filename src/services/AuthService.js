import Service from './Service';

// Recurso a consumir
const resource = 'auth';

// Operaciones
export default {
  // Realiza el Login
  login(data) {
    return Service.post(`${resource}/login`, data);
  },
  // Realiza el Registro
  register(data) {
    return Service.post(`${resource}/register`, data);
  },
  // Realiza el logout
  logout(token) {
    const data = '';
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    return Service.post(`${resource}/logout`, data, config);
  },
};
