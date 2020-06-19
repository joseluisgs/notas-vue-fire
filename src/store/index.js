import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  // Estado compartido
  state: {
    user: '',
    activo: false,
  },
  // Modifica el estado, son los únicos métodos en hacerlo
  mutations: {
    setActivo(state, value) {
      state.activo = value;
    },
    setUsuario(state, user) {
      state.user = user;
    },
  },
  // Modifican los estados desde fuera...
  actions: {
    // Guardamos los datos que necesitamos de la sesion, esto sería si lo hiciesmos asíncrono
    // Uso una acción y no una mutación porque no sabemos el tiempo que tarda en gaudar en storage
    iniciarSesion({ commit }, user) {
      // cambiamos el estado si no es null
      commit('setActivo', user !== null);
      // Confirmamos el estado si tenemos usaurio
      if (user) {
        commit('setUsuario', user);
        localStorage.setItem('user-notas', JSON.stringify(user));
      } else {
        commit('setUsuario', null);
      }
    },
    // Cierra la sesion
    // De esta manera no seria necesario hacer esto porque ya lo hace el evento en tiempo rela de main.JS
    cerrarSesion({ commit }) {
      // Ponemos todo a vacío
      commit('setActivo', false);
      commit('setUsuario', '');
      // Borramos el token
      localStorage.removeItem('user-notas');
      // Volvemos a home
    },
    // Lee el usuario desde el almacenamiento,
    // no es necesario por el evento en tiempo real de main
    leerUsuario({ commit }) {
      const user = localStorage.getItem('user-notas');
      if (user) {
        commit('setUsuario', user);
        commit('setActivo', true);
      } else {
        commit('setUsuario', '');
      }
    },
  },
  // campos computados o getter
  getters: {
    isActivo: (state) => state.activo,
    isAdmin: (state) => state.user.role === 'ADMIN',
  },
  modules: {
  },
});
