<template>
  <table class="table">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Titulo</th>
      <th scope="col">Descripcion</th>
      <th scope="col">Fecha</th>
      <th scope="col">Acciones</th>
    </tr>
  </thead>
  <tbody>
    <!--  Recorremos todas las notas -->
    <tr v-for="(item, index) in notas" :key="index">
      <!--  De esta manera no hace falta crearse un componente por fila -->
      <th scope="row">{{item._id}}</th>
      <td>{{item.titulo}}</td>
      <td>{{item.descripcion}}</td>
      <td>{{item.fecha | moment("dddd, D MMMM YYYY, HH:mm:ss") }}</td>
      <td>
        <b-button class="btn-warning btn-sm mx-2" @click="activarEdicion(item._id)"><b-icon icon="pencil-square" aria-hidden="true"></b-icon>Actualizar</b-button>
        <b-button class="btn-danger btn-sm mx-2" @click="eliminarNota(item._id)"><b-icon icon="trash"></b-icon>Eliminar</b-button>
      </td>
    </tr>
  </tbody>
</table>
</template>

<script>
import NotasService from '../services/NotasService';

export default {
  // Como me llamo
  name: 'Notas',

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
  // Mi métodos
  methods: {
    activarEdicion(id) {
      console.log(`Editar: ${id}`);
    },
    eliminarNota(id) {
      console.log(`Eliminar: ${id}`);
    },
  },
};
</script>

<style>
</style>
