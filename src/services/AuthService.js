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
  logout(token) {
    const config = {
      headers: {
        token,
      },
    };
    return Service.post(`${resource}/logout`, config);
  },
};
