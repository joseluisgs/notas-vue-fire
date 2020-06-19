import Service from './Service';

const resource = 'auth';
// Operaciones
export default {
  // Realiza el Login
  login(data) {
    return data;
  },
  // Realiza el Registro
  async register(data) {
    const res = await Service.auth.createUserWithEmailAndPassword(data.email, data.password);
    res.user.updateProfile({
      displayName: data.username,
      rol: 'USER',
    });
    return res.user;
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
