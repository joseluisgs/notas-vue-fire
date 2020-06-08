<template>
<div>
<div class="row justify-content-center">
  <h2>Detalles de la Nota</h2>
</div>
<div class="row justify-content-center">
  <b-card
    :title="nota.titulo"
    img-src="https://picsum.photos/600/300/?image=25"
    img-alt="Image"
    img-top
    tag="article"
    style="max-width: 200rem;"
  >
    <b-card-text>
      {{nota.descripcion}}.
    </b-card-text>
    <b-list-group flush>
      <b-list-group-item></b-list-group-item>
      <b-list-group-item>Autor: Patata Brava</b-list-group-item>
      <b-list-group-item></b-list-group-item>
    </b-list-group>
    <b-button to="/notas" variant="outline-primary">Volver</b-button>
    <template v-slot:footer>
        <small class="text-muted">Publicada: {{nota.fecha | moment("dddd, D MMMM YYYY, HH:mm:ss")}}</small>
      </template>
  </b-card>
</div>
</div>
</template>

<script>
import NotasService from '@/services/NotasService';

export default {
  name: 'Nota',
  data() {
    return {
      nota: {}, // Para agregar una nota
    };
  },
  created() {
    NotasService.getById(this.$route.params.id)
      .then((item) => {
        this.nota = item.data;
        console.log(this.nota);
      })
      .catch(() => {
        this.$router.push({ name: 'Error404' });
      });
  },
};
</script>

<style>

</style>
