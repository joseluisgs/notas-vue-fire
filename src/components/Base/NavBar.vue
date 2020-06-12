<template>
<section>
  <b-navbar toggleable="lg" type="dark" variant="dark" position="fixed" my-2>
        <b-navbar-brand href="/">
          <img src="@/assets/logo.png" class="d-inline-block align-top" alt="Klogo" height="30" />
          Notas
        </b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <b-nav-item to="/">Inicio</b-nav-item>
            <b-nav-item to="/notas">Notas</b-nav-item>
            <b-nav-item to="/about">About</b-nav-item>
            <b-nav-item to="/admin" v-if="isAdmin()">Admin</b-nav-item>
          </b-navbar-nav>

          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto">
            <b-nav-item-dropdown right>
              <!-- Using 'button-content' slot -->
              <template v-slot:button-content v-if="!isActivo()">
                <b-icon icon="person"></b-icon>Usuario
              </template>
              <template v-slot:button-content v-else>
                <b-icon icon="person-fill"></b-icon>{{user.username}}
              </template>
              <template v-if="!isActivo()">
                <b-dropdown-item to="/login"><b-icon icon="box-arrow-in-right"></b-icon> Entrar</b-dropdown-item>
                <b-dropdown-item to="/registrar"><b-icon icon="person-check"></b-icon> Registrar</b-dropdown-item>
              </template>
             <b-dropdown-item @click="salir" v-else><b-icon icon="box-arrow-in-left"></b-icon> Salir</b-dropdown-item>
              <b-dropdown-item href="https://twitter.com/joseluisgonsan" target="_blank"><b-icon icon="info" mx-2></b-icon>Contacto</b-dropdown-item>
            </b-nav-item-dropdown>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
      <br />
    </section>
</template>

<script>
import AuthService from '@/services/AuthService';
import { mapState, mapActions, mapGetters } from 'vuex';

export default {
  name: 'NavBar',
  data() {
    return {
      conectado: this.isActivo(),
    };
  },
  // Al crearme cargamos el token si existe
  created() {
    this.leerToken();
  },
  methods: {
    ...mapActions(['cerrarSesion', 'leerToken']),
    ...mapGetters(['isActivo', 'isAdmin']),
    salir() {
      // Por si hay que hacer algo en el servidor.
      AuthService.logout(this.token)
        .then(() => {
          this.cerrarSesion();
          this.$router.push({ name: 'Login' });
        })
        .catch((error) => {
          console.log(error.response.data.mensaje);
          this.$router.push({ name: 'Login' });
        });
    },
  },
  computed: mapState(['token', 'user']),
};
</script>
