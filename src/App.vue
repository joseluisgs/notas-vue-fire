<template>
  <div id="app">
    <div>
      <b-navbar toggleable="lg" type="dark" variant="dark" position="fixed" my-2>
        <b-navbar-brand href="/">
          <img src="@/assets/logo.png" class="d-inline-block align-top" alt="Klogo" height="30" />
          Notas
        </b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <b-nav-item to="/">Inicio</b-nav-item>
            <b-nav-item to="Notas">Notas</b-nav-item>
            <b-nav-item to="About">About</b-nav-item>
          </b-navbar-nav>

          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto">
            <b-nav-item-dropdown right>
              <!-- Using 'button-content' slot -->
              <template v-slot:button-content>
                <em>Usuario</em>
              </template>
              <b-dropdown-item href="#">Perfil</b-dropdown-item>
              <b-dropdown-item href="#">Entrar</b-dropdown-item>
              <b-dropdown-item href="https://twitter.com/joseluisgonsan" target="_blank">Contacto</b-dropdown-item>
            </b-nav-item-dropdown>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>
    <br />
    <router-view />

    <footer class="footer">
      <div class="container text-center">
        <span class="text-muted">
          <a style="color:#9d9d9d" href="https://twitter.com/joseluisgonsan" target="_blank">
            José
            Luis González Sánchez.
          </a>
        </span>
        <span class="text-muted">2020</span>
      </div>
    </footer>
  </div>
</template>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
.footer {
  position: fixed;
  bottom: 0;
  width: 100%;
  /* Set the fixed height of the footer here */
  height: 60px;
  line-height: 60px; /* Vertically center the text there */
  background-color: #212529;
}
.footer > .container {
  padding-right: 15px;
  padding-left: 15px;
}
</style>
