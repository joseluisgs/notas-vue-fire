<template>
  <div class="container">
    <h1>Login</h1>
    <hr>
    <b-alert
      :show="dismissCountDown"
      dismissible
      :variant="alerta.color"
      @dismissed="dismissCountDown=0"
      @dismiss-count-down="countDownChanged"
    >{{alerta.texto}}
    </b-alert>
    <form @submit.stop.prevent="login">
      <input
        type="email"
        class="form-control my-2"
        required
        placeholder="email@correo.com"
        v-model="user.email"
      />
      <input
        type="password"
        class="form-control my-2"
        required
        v-model="user.password"
      />
      <b-button variant="primary" type="submit">Acceder</b-button>
    </form>
  </div>
</template>

<script>
import AuthService from '@/services/AuthService';
// Elementos de Vuex a usar
import { mapActions } from 'vuex';

export default {
  named: 'Login',
  data() {
    return {
      user: {},
      // Para la alerta
      alerta: { color: 'success', texto: '' },
      dismissSecs: 3,
      dismissCountDown: 0,
    };
  },
  methods: {
    // Incopramos los elementos de Vuex
    ...mapActions(['guardarSesion']),
    login() {
      AuthService.login(this.user)
        .then((res) => {
          // console.log(res.data.token);
          this.guardarSesion(res.data.token);
          this.$router.push({ name: 'Home' });
        })
        .catch((error) => {
          if (error.response.data.mensaje) {
            this.verAlerta(error.response.data.mensaje, 'danger');
          }
        });
    },
    // Metodos de la alerta
    verAlerta(texto, color) {
      this.alerta.texto = texto;
      this.alerta.color = color;
      this.showAlert();
    },
    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown;
    },
    showAlert() {
      this.dismissCountDown = this.dismissSecs;
    },
  },
};
</script>
