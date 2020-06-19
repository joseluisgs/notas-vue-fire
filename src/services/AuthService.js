import Service from './Service';

// Operaciones
export default {
  // Realiza el Login
  // https://firebase.google.com/docs/auth/web/password-auth?hl=es_419
  async login(data) {
    return Service.auth.signInWithEmailAndPassword(data.email, data.password);
  },
  // Realiza el Registro
  // https://firebase.google.com/docs/auth/web/manage-users?hl=es_419
  async register(data) {
    const res = await Service.auth.createUserWithEmailAndPassword(data.email, data.password);
    res.user.updateProfile({
      displayName: data.username,
    });
    return res.user;
  },
  // Realiza el logout
  // https://firebase.google.com/docs/auth/web/password-auth?hl=es_419
  async logout() {
    return Service.auth.signOut();
  },
};
