import Service from './Service';

// Operaciones
export default {
  // Realiza el Login
  // https://firebase.google.com/docs/auth/web/password-auth?hl=es_419
  login(data) {
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
  logout() {
    return Service.auth.signOut();
  },
  // Realiza el login con Google
  // https://firebase.google.com/docs/auth/web/google-signin?hl=es_419
  loginGoogle() {
    // provider.addScope('https://www.googleapis.com/auth/plus.login');
    return Service.auth.signInWithPopup(Service.providerGoogle);
  },
};
