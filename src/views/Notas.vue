<template>
  <div class="container">
    <h1>Notas</h1>
    <hr>
    <!-- Ponemos la alerta: https://bootstrap-vue.org/docs/components/alert#alerts -->
    <b-alert
      :show="dismissCountDown"
      dismissible
      :variant="alerta.color"
      @dismissed="dismissCountDown=0"
      @dismiss-count-down="countDownChanged"
    >{{alerta.texto}}
    </b-alert>
    <!-- Pintamos la tabla del componente boosrapt b-table: https://bootstrap-vue.org/docs/components/table -->
    <b-table striped responsive hover :items="notas" :fields="encabezados">
      <!-- Por cad acelda indicamos como queremos que se renderice y qué campos -->
      <template v-slot:cell(#)="row">{{row.item._id}}</template>
      <template v-slot:cell(titulo)="row">{{row.item.titulo}}</template>
      <template v-slot:cell(descripcion)="row">{{row.item.descripcion}}</template>
      <template v-slot:cell(fecha)="row">{{row.item.fecha | moment("dddd, D MMMM YYYY, HH:mm:ss")}}</template>
      <template v-slot:cell(acciones)="row">
        <b-button class="btn-warning btn-sm mx-2" @click="activarEdicion(row.item._id)">
          <b-icon icon="pencil-square" aria-hidden="true"></b-icon>Actualizar
        </b-button>
        <b-button class="btn-danger btn-sm mx-2" @click="eliminarNota(row.item._id)">
          <b-icon icon="trash"></b-icon>Eliminar
        </b-button>
      </template>
    </b-table>
  </div>
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
      encabezados: [
        { key: '#', sortable: true, label: '#' },
        { key: 'titulo', sortable: true, label: 'Título' },
        { key: 'descripcion', sortable: true, label: 'Descripción' },
        { key: 'fecha', sortable: true, label: 'Fecha' },
        { key: 'acciones', label: 'Acciones' },
      ],
      // Para la alerta
      alerta: { color: 'success', texto: '' },
      dismissSecs: 5,
      dismissCountDown: 0,
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
    // activa la edición.
    activarEdicion(id) {
      console.log(`Editar: ${id}`);
    },
    // elimina una nota
    eliminarNota(id) {
      console.log(`Eliminar: ${id}`);
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

<style>
</style>
