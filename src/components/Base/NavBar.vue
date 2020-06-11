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
          </b-navbar-nav>

          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto">
            <b-nav-item-dropdown right>
              <!-- Using 'button-content' slot -->
              <template v-slot:button-content>
                <b-icon icon="person"></b-icon>Usuario
              </template>
              <b-dropdown-item to="/login"><b-icon icon="box-arrow-in-right"></b-icon> Entrar</b-dropdown-item>
              <b-dropdown-item to="/login"><b-icon icon="box-arrow-in-left"></b-icon> Salir</b-dropdown-item>
              <b-dropdown-item to="/registrar"><b-icon icon="person-check"></b-icon> Registrar</b-dropdown-item>
              <b-dropdown-item href="https://twitter.com/joseluisgonsan" target="_blank"><b-icon icon="info" mx-2></b-icon>Contacto</b-dropdown-item>
            </b-nav-item-dropdown>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
      <br />
    </section>
</template>
