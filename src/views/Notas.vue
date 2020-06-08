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
    <!-- Mi buscador -->
    <section class="d-flex flex-row-reverse form-inline">
          <b-input-group prepend="Buscar" class="mb-12 mr-sm-12 mb-sm-0">
            <b-input id="buscar" placeholder="Título o descripción" v-model="busqueda"></b-input>
          </b-input-group>
    </section>
    <!-- Agregamos el formuario de agregar nota, antes un botón que muestre y oculte el formulario -->
    <!-- https://bootstrap-vue.org/docs/components/form/#form -->
    <template v-if="!formEditar"> <!-- Oculto todo si estoy en agregar -->
      <section class="d-flex flex-row">
        <b-button class="btn-success btn-sm mx-2" @click="formAgregar=!formAgregar">
            <b-icon icon="file-plus"></b-icon> Nueva
        </b-button>
      </section>
      <!-- Formulario de nueva nota -->
      <b-form @submit.prevent="formAceptarNueva" @reset="formLimpiarNueva" v-if="formAgregar">
        <h4 class="text-center">Agregar nueva Nota</h4>
        <b-form-group id="input-titulo">
          <b-form-input id="titulo" type="text" placeholder="Título de la nota" required v-model="nota.titulo" ></b-form-input>
        </b-form-group>
        <b-form-group id="input-des">
          <b-form-input id="descripcion" type="text" placeholder="Descripción de la nota" required v-model="nota.descripcion" ></b-form-input>
        </b-form-group>
        <b-form-group id="input-botones">
          <b-button type="submit" variant="primary mx-2">Agregar</b-button>
          <b-button type="reset" variant="danger mx-2">Cancelar</b-button>
        </b-form-group>
      </b-form>
    </template>
    <!-- Formulario de editar nota -->
      <b-form @submit.prevent="formAceptarEditar" @reset="formEditar=false" v-if="formEditar">
        <h4 class="text-center">Editar Nota</h4>
        <b-form-group id="input-titulo">
          <b-form-input id="titulo" type="text" placeholder="Título de la nota" required v-model="nota.titulo" ></b-form-input>
        </b-form-group>
        <b-form-group id="input-des">
          <b-form-input id="descripcion" type="text" placeholder="Descripción de la nota" required v-model="nota.descripcion" ></b-form-input>
        </b-form-group>
        <b-form-group id="input-botones">
          <b-button type="submit" variant="warning mx-2">Modificar</b-button>
          <b-button type="reset" variant="danger mx-2">Cancelar</b-button>
        </b-form-group>
      </b-form>
    <hr>
    <!-- Pintamos la tabla del componente boosrapt b-table: https://bootstrap-vue.org/docs/components/table -->
    <b-table striped responsive hover :items="filtroNotas" :fields="tablaEncabezados">
      <!-- Por cad acelda indicamos como queremos que se renderice y qué campos -->
      <template v-slot:cell(#)="row">{{row.item._id}}</template>
      <template v-slot:cell(titulo)="row">{{row.item.titulo}}</template>
      <template v-slot:cell(descripcion)="row">{{row.item.descripcion}}</template>
      <template v-slot:cell(fecha)="row">{{row.item.fecha | moment("dddd, D MMMM YYYY, HH:mm:ss")}}</template>
      <template v-slot:cell(acciones)="row">
        <b-button variant="primary" class="btn-sm mx-2 my-1" @click="verNota(row.item._id)" v-b-tooltip.hover title="Ver nota">
          <b-icon icon="card-text" aria-hidden="true"></b-icon>
        </b-button>
        <b-button variant="warning" class="btn-sm mx-2 my-1" @click="activarEdicion(row.item._id)" v-b-tooltip.hover title="Editar nota">
          <b-icon icon="pencil-square" aria-hidden="true"></b-icon>
        </b-button>
        <b-button variant="danger" class="btn-sm mx-2 my-1" @click="mostrarMensaje(row.item)" v-b-tooltip.hover title="Eliminar nota">
          <b-icon icon="trash"></b-icon>
        </b-button>
      </template>
    </b-table>
  </div>
</template>

<script>
import NotasService from '@/services/NotasService';

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
      dismissSecs: 3,
      dismissCountDown: 0,
      // Muestra el formulario de agregar nota
      formAgregar: false,
      // Mustra elf ormulario de editar una nota
      formEditar: false,
      // Para buscar
      busqueda: '',
    };
  },

  // Al crearme
  created() {
    // cargamos las notas
    this.cargarNotas();
  },
  // campos computados
  computed: {
    // Para manear el filtro
    filtroNotas() {
      return this.notas.filter((nota) => nota.titulo.toLowerCase().includes(this.busqueda.toLowerCase()) || nota.descripcion.toLowerCase().includes(this.busqueda.toLowerCase()));
    },
  },

  // Mi métodos
  methods: {
    // activa la edición.
    activarEdicion(id) {
      this.formEditar = true;
      // cojemos la nota
      // si lo hago así, el problema es la reactividad, se ve los cambios en la tabla directamente
      // eslint-disable-next-line no-underscore-dangle
      // this.nota = this.notas.find((n) => n._id === id);
      // La consultamos del servicio, así praticamos
      NotasService.getById(id)
        .then((res) => {
          this.nota = res.data;
        })
        .catch((e) => {
          console.log(e.response);
        });
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
          console.log(e.response);
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
          console.log(e.response);
          // Alerta de mensaje
          this.alerta.texto = 'No se ha podido insertar la nota';
          this.alerta.color = 'danger';
          this.showAlert();
        });
      this.formAgregar = false;
      this.nota = {};
    },
    // edita una nueva nota
    editarNota() {
      // eslint-disable-next-line no-underscore-dangle
      NotasService.put(this.nota._id, this.nota)
        .then((res) => {
          // Cambialos los datos en la tabla (podríamos ahorranos esto cargando la tabla directamente con el serviio,
          // pero es mas rapido así)
          console.log(res);
          // eslint-disable-next-line no-underscore-dangle
          // eslint-disable-next-line no-underscore-dangle
          const notaMod = this.notas.find((n) => (n._id === this.nota._id));
          // Solo añadimos los campos que modifico, los otros son iguales
          notaMod.titulo = this.nota.titulo;
          notaMod.descripcion = this.nota.descripcion;
          // Alerta de mensaje
          this.alerta.texto = 'Nota actualizada';
          this.alerta.color = 'success';
          this.showAlert();
          this.nota = {};
        })
        .catch((e) => {
          console.log(e.response);
          // Alerta de mensaje
          this.alerta.texto = 'No se ha podido modificar la nota';
          this.alerta.color = 'danger';
          this.showAlert();
          this.nota = {};
        });
      // Ocultamos y limpiamos
      this.formEditar = false;
    },
    // Carga la lista de notas
    cargarNotas() {
      /* this.alerta.texto = 'Cargando notas. Por favor, espere...';
      this.alerta.color = 'info';
      this.showAlert(); */
      // Consultamos todas las notas
      NotasService.get()
        .then((notas) => {
          this.notas = notas.data;
        })
        .catch((e) => {
          // Alerta de mensaje
          console.log(e.response.data.error.errors.nombre.message);
          this.alerta.texto = 'No se han podido cargar las notas desde el servidor';
          this.alerta.color = 'danger';
          this.showAlert();
        });
    },
    // Muestra una nota
    verNota(id) {
      // console.log(id);
      // Una forma router.push({ path: `/notas/${id}` }) // -> /notas/123
      this.$router.push({ name: 'Nota', params: { id: `${id}` } });
    },
    // Metodos de la alerta
    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown;
    },
    showAlert() {
      this.dismissCountDown = this.dismissSecs;
    },
    // Eventos del formulario
    formAceptarNueva() {
      this.agregarNota();
    },
    formLimpiarNueva() {
      // Limpiamos los datos y aceptamos
      this.nota = {};
      this.formAgregar = false;
    },
    formAceptarEditar() {
      this.editarNota();
    },
    // mensaje Modal
    mostrarMensaje(item) {
      this.$bvModal.msgBoxConfirm(`¿Realmente desea eliminar esta nota? ${item.titulo}.`,
        {
          title: 'Eliminar nota',
          size: 'sm',
          buttonSize: 'sm',
          okVariant: 'danger',
          okTitle: 'SÍ',
          cancelTitle: 'NO',
          footerClass: 'p-2',
          hideHeaderClose: false,
          centered: true,
        })
        .then((value) => {
          if (value) {
            // eslint-disable-next-line no-underscore-dangle
            this.eliminarNota(item._id);
          }
        });
    },
  },
};
</script>

<style>
</style>
