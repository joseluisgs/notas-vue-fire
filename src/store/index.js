import Vue from 'vue';
import Vuex from 'vuex';
import jwt from 'jwt-decode';

Vue.use(Vuex);

export default new Vuex.Store({
  // Estado compartido
  state: {
    user: '',
    token: '',
    exp: '',
  },
  // Modifica el estado, son los únicos métodos en hacerlo
  mutations: {
    setUsuario(state, token) {
      state.token = token;
      if (token === '') {
        state.user = '';
        state.exp = '';
      } else {
        const info = jwt(token);
        state.user = info.user;
        state.exp = info.exp;
      }
    },
  },
  // Modifican los estados desde fuera...
  actions: {
    // Guardamos los datos que necesitamos de la sesion, esto sería si lo hiciesmos asíncrono
    // Uso una acción y no una mutación porque no sabemos el tiempo que tarda en gaudar en storage
    guardarSesion({ commit }, token) {
      // Guardamos el token en el almacenamiento del navegador
      // console.log(`Guardar sesion token: ${payload}`);
      localStorage.setItem('token-notas', token);
      // Confirmamos el estado
      commit('setUsuario', token);
    },
    // Cierra la sesion
    cerrarSesion({ commit }) {
      // Ponemos todo a vacío
      commit('setUsuario', '');
      // Borramos el token
      localStorage.removeItem('token-notas');
      // Volvemos a home
    },
    // Lee el token desde el almacenamiento
    leerToken({ commit }) {
      const token = localStorage.getItem('token-notas');
      if (token) {
        commit('setUsuario', token);
      } else {
        commit('setUsuario', '');
      }
    },
  },
  // campos computados o getter
  getters: {
    isActivo: (state) => ((state.token !== '') && ((state.exp * 1000) > Date.now())),
    isAdmin: (state) => state.user.role === 'ADMIN',
  },
  modules: {
  },
});
