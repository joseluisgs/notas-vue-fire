<template>
<div class="container">
  <!-- Utilizo el el componente de tabla notas -->
  <tabla-notas :items="notas"></tabla-notas>
</div>
</template>

<script>
import NotasService from '../services/NotasService';
import TablaNotas from '../components/Notas/TablaNotas.vue';

export default {
  // Como me llamo
  name: 'Notas',
  // Componentes que uso
  components: {
    TablaNotas,
  },

  // mi modelo de datos
  data() {
    return {
      notas: [],
    };
  },

  // Al crearme
  created() {
    // Consultamos todas las notas
    NotasService.get().then((notas) => {
      this.notas = notas.data;
    });
  },
};
</script>

<style>
</style>
