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
    <!-- Agregamos el formuario de agregar nota, antes un botón que muestre y oculte el formulario -->
    <!-- https://bootstrap-vue.org/docs/components/form/#form -->
    <section class="d-flex flex-row">
      <b-button class="btn-success btn-sm mx-2" @click="formAgregar=!formAgregar">
          <b-icon icon="file-plus"></b-icon> Nueva
      </b-button>
    </section>
    <b-form @submit.prevent="formAceptar" @reset="formLimpiar" v-if="formAgregar">
      <h4 class="text-center">Agregar nueva Nota</h4>
      <b-form-group id="input-titulo">
        <b-form-input id="titulo" type="text" placeholder="Título de la nota" required v-model="nota.titulo" ></b-form-input>
      </b-form-group>
      <b-form-group id="input-des">
        <b-form-input id="descripcion" type="text" placeholder="Descripción de la nota" required v-model="nota.descripcion" ></b-form-input>
      </b-form-group>
      <b-form-group id="input-botones">
        <b-button type="submit" variant="primary">Agregar</b-button>&nbsp;&nbsp;
        <b-button type="reset" variant="danger">Cancelar</b-button>
      </b-form-group>
    </b-form>
    <hr>
    <!-- Pintamos la tabla del componente boosrapt b-table: https://bootstrap-vue.org/docs/components/table -->
    <b-table striped responsive hover :items="notas" :fields="tablaEncabezados">
      <!-- Por cad acelda indicamos como queremos que se renderice y qué campos -->
      <template v-slot:cell(#)="row">{{row.item._id}}</template>
      <template v-slot:cell(titulo)="row">{{row.item.titulo}}</template>
      <template v-slot:cell(descripcion)="row">{{row.item.descripcion}}</template>
      <template v-slot:cell(fecha)="row">{{row.item.fecha | moment("dddd, D MMMM YYYY, HH:mm:ss")}}</template>
      <template v-slot:cell(acciones)="row">
        <b-button class="btn-warning btn-sm mx-2" @click="activarEdicion(row.item._id)">
          <b-icon icon="pencil-square" aria-hidden="true"></b-icon> Actualizar
        </b-button>
        <b-button class="btn-danger btn-sm mx-2" @click="eliminarNota(row.item._id)">
          <b-icon icon="trash"></b-icon> Eliminar
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
      nota: {}, // Para agregar una nota
      notas: [], // Lista de notas
      tablaEncabezados: [
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
      // Muestra el formulario de agregar nota
      formAgregar: false,
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
      NotasService.delete(id)
        // Si va bien
        .then((res) => {
          // Elimino del array
          // eslint-disable-next-line no-underscore-dangle
          const index = this.notas.findIndex((item) => item._id === res.data._id);
          this.notas.splice(index, 1);
          // Alerta de mensaje
          this.alerta.texto = '¡Nota eliminada!';
          this.alerta.color = 'danger';
          this.showAlert();
        })
        // Si falla
        .catch((e) => {
          console.log(e.response.data.error.errors.nombre.message);
          // Alerta de mensaje
          this.alerta.texto = 'No se ha podido eliminar la nota';
          this.alerta.color = 'danger';
          this.showAlert();
        });
    },
    // agrega una nueva nota
    agregarNota() {
      NotasService.post(this.nota)
        // Si todo va bien
        .then((res) => {
        // Agrega al inicio de nuestro array notas
          this.notas.unshift(res.data);
          // Alerta de mensaje
          this.alerta.texto = '¡Nota agregada!';
          this.alerta.color = 'success';
          this.showAlert();
        })
        // Si falla
        .catch((e) => {
          console.log(e.response.data.error.errors.nombre.message);
          // Alerta de mensaje
          this.alerta.texto = 'No se ha podido insertar la nota';
          this.alerta.color = 'danger';
          this.showAlert();
        });
      this.nota = {};
    },
    // Metodos de la alerta
    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown;
    },
    showAlert() {
      this.dismissCountDown = this.dismissSecs;
    },
    // Eventos del formulario
    formAceptar() {
      this.agregarNota();
    },
    formLimpiar() {
      // Limpiamos los datos y aceptamos
      this.nota = {};
      this.formAgregar = false;
    },
  },
};
</script>

<style>
</style>
