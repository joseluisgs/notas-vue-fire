<template>
  <div class="container">
    <h1>Registro</h1>
    <hr>
    <b-alert
      :show="dismissCountDown"
      dismissible
      :variant="alerta.color"
      @dismissed="dismissCountDown=0"
      @dismiss-count-down="countDownChanged"
    >{{alerta.texto}}
    </b-alert>
    <form @submit.stop.prevent="registrar">
      <input
        type="text"
        class="form-control my-2"
        required
        placeholder="username"
        v-model="user.username"
      />
      <input
        type="email"
        class="form-control my-2"
        placeholder="email"
        required
        v-model="user.email"
      />
      <input
        type="password"
        class="form-control my-2"
        placeholder="password"
        required
        v-model="user.password"
      />
      <b-button variant="primary mx-2" type="submit">Registrar</b-button>
      <b-button variant="danger mx-2" type="reset">Cancelar</b-button>
    </form>
  </div>
</template>

<script>
import AuthService from '@/services/AuthService';

export default {
  named: 'Registro',
  data() {
    return {
      user: {},
      // Para la alerta
      alerta: { color: 'success', texto: '' },
      dismissSecs: 3,
      dismissCountDown: 0,
      mensaje: '',
    };
  },
  methods: {
    async registrar() {
      try {
        await AuthService.register(this.user);
        this.verAlerta('Usuario registrado', 'success');
        // this.$router.replace({ name: 'Login' }); Con el evento en tiempo real lo podemos llevar a home por que se identifica
        this.$router.replace({ name: 'Home' });
      } catch (error) {
        this.verAlerta(error, 'danger');
      }
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
