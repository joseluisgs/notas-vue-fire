// Instalamos axios y vue axios
import axios from 'axios';
import VueAxios from 'vue-axios';
import Vue from 'vue';
// Boostrapt
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
// Moment
import VueMoment from 'vue-moment';
import moment from 'moment'; // Moment en espñol
// VUE
import App from './App.vue';
import router from './router';
import store from './store';
// Instalamos boostrapt vue
// configuramos su css
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
// Vamos a manejar el stado de indentificación automaticamente con firebase con nuestro servicio
import Service from './services/Service';

// Install BootstrapVue
Vue.use(BootstrapVue);
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin);
// Axios
Vue.use(VueAxios, axios);
// moment
require('moment/locale/es');

Vue.use(VueMoment, { moment });

Vue.config.productionTip = false;

// Esta función de firebase nos da en tiempo real estado del usuario
// Es decir, nos dice en todo momento si esta identificado y ctivo (por ejemplo sus tokens)
// https://firebase.google.com/docs/auth/web/manage-users?hl=es_419
Service.auth.onAuthStateChanged((user) => {
  store.dispatch('iniciarSesion', user);
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
