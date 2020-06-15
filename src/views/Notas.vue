<template>
  <div class="container" wit>
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
        <!-- Fichero -->
        <b-form-group id="input-fichero">
        <b-form-file class="mt-3" v-model="fichero" plain accept=".jpg, .png, .gif" id="file" ref="file"></b-form-file>
        <div class="mt-3">Imagen seleccionada: {{ fichero ? fichero.name : '' }}</div>
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
      <!-- <template v-slot:cell(#)="row">{{row.item._id}}</template> -->
      <template v-slot:cell(titulo)="row">{{row.item.titulo}}</template>
      <template v-slot:cell(descripcion)="row">{{row.item.descripcion}}</template>
      <template v-slot:cell(imagen)="row">
        <b-avatar variant="info" :src="row.item.fichero.url ? row.item.fichero.url : ''"></b-avatar>
      </template>
      <template v-slot:cell(fecha)="row">{{row.item.fecha | moment("D/MM/YYYY, HH:mm")}}</template>
      <template v-slot:cell(acciones)="row">
        <b-button variant="primary" class="btn-sm mx-1 my-1" @click="verNota(row.item._id)" v-b-tooltip.hover title="Ver nota">
          <b-icon icon="card-text" aria-hidden="true"></b-icon>
        </b-button>
        <b-button variant="warning" class="btn-sm mx-1 my-1" @click="activarEdicion(row.item._id)" v-b-tooltip.hover title="Editar nota">
          <b-icon icon="pencil-square" aria-hidden="true"></b-icon>
        </b-button>
        <b-button variant="danger" class="btn-sm mx-1 my-1" @click="mostrarMensaje(row.item)" v-b-tooltip.hover title="Eliminar nota">
          <b-icon icon="trash"></b-icon>
        </b-button>
      </template>
    </b-table>
  </div>
</template>

<script>
import NotasService from '@/services/NotasService';
import FilesService from '@/services/FilesService';
import { mapState, mapActions } from 'vuex';

export default {
  // Como me llamo
  name: 'Notas',

  // mi modelo de datos
  data() {
    return {
      nota: {}, // Para agregar una nota
      notas: [], // Lista de notas
      tablaEncabezados: [
        // { key: '#', sortable: true, label: '#' },
        { key: 'titulo', sortable: true, label: 'Título' },
        { key: 'descripcion', sortable: true, label: 'Descripción' },
        { key: 'imagen', label: 'Imagen' },
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
      // Fichero
      fichero: {},
    };
  },

  // Al crearme
  created() {
    // cargamos las notas
    this.cargarNotas();
  },
  // campos computados
  computed: {
    ...mapState(['token']),
    // Para manear el filtro
    filtroNotas() {
      return this.notas.filter((nota) => nota.titulo.toLowerCase().includes(this.busqueda.toLowerCase()) || nota.descripcion.toLowerCase().includes(this.busqueda.toLowerCase()));
    },
  },

  // Mi métodos
  methods: {
    ...mapActions(['cerrarSesion']),
    // activa la edición.
    activarEdicion(id) {
      this.formEditar = true;
      // cojemos la nota
      // si lo hago así, el problema es la reactividad, se ve los cambios en la tabla directamente
      // eslint-disable-next-line no-underscore-dangle
      // this.nota = this.notas.find((n) => n._id === id);
      // La consultamos del servicio, así praticamos
      NotasService.getById(id, this.token)
        .then((res) => {
          this.nota = res.data;
        })
        .catch((error) => {
          this.verAlerta(`No se puede ver la nota: ${error.response.data.mensaje}`, 'danger');
        });
    },
    // elimina una nota
    eliminarNota(id) {
      NotasService.delete(id, this.token)
        // Si va bien
        .then((res) => {
          // Elimino del array
          // eslint-disable-next-line no-underscore-dangle
          const index = this.notas.findIndex((item) => item._id === res.data._id);
          const delNota = this.notas[index];
          this.notas.splice(index, 1);
          // Borramos la imagen
          if (delNota.fichero.id) {
            FilesService.delete(delNota.fichero.id, this.token);
            // .then((resp) => console.log(resp))
            // .catch((e) => console.log(e));
          }
          // Alerta de mensaje
          this.verAlerta('¡Nota eliminada!', 'danger');
        })
        // Si falla
        .catch((error) => {
          // Alerta de mensaje
          this.verAlerta(`No se ha podido eliminar la nota ${error.response.data.mensaje}`, 'danger');
        });
    },
    // agrega una nueva nota
    agregarNota() {
      // Si hay fichero lo subimos
      const file = this.fichero;
      if (file.name) {
        this.agregarNotaConFichero(file);
      } else {
        this.subirNota(this.nota);
      }
    },
    // Agrega una nota con Fichero
    agregarNotaConFichero(file) {
      FilesService.post(file, this.token)
        .then((resp) => {
          const nuevaNota = this.nota;
          nuevaNota.fichero = resp.data;
          this.subirNota(nuevaNota);
        })
        .catch((error) => {
          console.log(error.response);
          // Alerta de mensaje
          this.verAlerta(`No se puede insertar la imagen asociada: ${error.response.data.mensaje}`, 'danger');
        });
    },
    // sube una nota
    subirNota(nuevaNota) {
      NotasService.post(nuevaNota, this.token)
        // Si todo va bien
        .then((res) => {
          // Agrega al inicio de nuestro array notas
          this.notas.unshift(res.data);
          // Alerta de mensaje
          this.verAlerta('¡Nota agregada!', 'success');
        })
        // Si falla
        .catch((error) => {
          console.log(error.response);
          // Alerta de mensaje
          this.verAlerta(`No se puede insertar la nota: ${error.response.data.mensaje}`, 'danger');
        });
      this.formAgregar = false;
      this.nota = {};
      this.fichero = {};
    },
    // edita una nueva nota
    editarNota() {
      // eslint-disable-next-line no-underscore-dangle
      NotasService.put(this.nota._id, this.nota, this.token)
        .then(() => {
          // Cambialos los datos en la tabla (podríamos ahorranos esto cargando la tabla directamente con el serviio,
          // pero es mas rapido así)
          // eslint-disable-next-line no-underscore-dangle
          const notaMod = this.notas.find((n) => (n._id === this.nota._id));
          // Solo añadimos los campos que modifico, los otros son iguales
          notaMod.titulo = this.nota.titulo;
          notaMod.descripcion = this.nota.descripcion;
          // Alerta de mensaje
          this.verAlerta('¡Nota modificada!', 'success');
          this.nota = {};
        })
        .catch((error) => {
          console.log(error.response);
          // Alerta de mensaje
          this.verAlerta(`No se ha podido modificar la nota: ${error.response.data.mensaje}`, 'danger');
          this.nota = {};
        });
      // Ocultamos y limpiamos
      this.formEditar = false;
    },
    // Carga la lista de notas
    cargarNotas() {
      // Consultamos todas las notas
      NotasService.get(this.token)
        .then((notas) => {
          this.notas = notas.data;
        })
        .catch((error) => {
          // Alerta de mensaje
          this.verAlerta(`No se ha cargar las notas: ${error.response.data.mensaje}`, 'danger');
        });
    },
    // Muestra una nota
    verNota(id) {
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
      this.fichero = '';
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
    // Metodos de la alerta
    verAlerta(texto, color) {
      this.alerta.texto = texto;
      this.alerta.color = color;
      this.showAlert();
    },
  },
};
</script>

<style scoped>

</style>
