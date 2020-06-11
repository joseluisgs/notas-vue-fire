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

export default {
  data() {
    return {
      user: { email: 'tucorreo@email.com', password: '123123' },
      // Para la alerta
      alerta: { color: 'success', texto: '' },
      dismissSecs: 3,
      dismissCountDown: 0,
    };
  },
  methods: {
    login() {
      console.log(this.user);
      this.mensaje = 'Hola';
      AuthService.login(this.user)
        .then(() => this.$router.push({ name: 'Home' }))
        .catch((error) => {
          // Alerta de mensaje
          this.alerta.texto = error.response.data.message;
          this.alerta.color = 'danger';
          this.showAlert();
        });
    },
    // Metodos de la alerta
    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown;
    },
    showAlert() {
      this.dismissCountDown = this.dismissSecs;
    },
  },
};
</script>
