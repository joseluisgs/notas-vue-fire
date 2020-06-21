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
    <!-- <section class="d-flex flex-row-reverse form-inline">
          <b-input-group prepend="Buscar" class="mb-12 mr-sm-12 mb-sm-0">
            <b-input id="buscar" placeholder="Título o descripción" v-model="busqueda"></b-input>
          </b-input-group>
    </section> -->

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
        <!-- Fichero -->
        <b-form-group id="input-fichero">
        <b-form-file class="mt-3" v-model="fichero" plain accept=".jpg, .png, .gif" id="file" ref="file"></b-form-file>
        <!-- <div class="mt-3">Nueva imagen seleccionada: {{ fichero ? fichero.name : '' }}</div> -->
        </b-form-group>
        <b-form-group id="input-img">
          <b-img :src="nota.fichero.url" rounded alt="Rounded image" width="100" v-if="nota.fichero"></b-img>
        </b-form-group>
        <b-form-group id="input-botones">
          <b-button type="submit" variant="warning mx-2">Modificar</b-button>
          <b-button type="reset" variant="danger mx-2">Cancelar</b-button>
        </b-form-group>
      </b-form>
    <hr>
    <section class="d-flex flex-row-reverse">
    <!-- Para la búsqeuda -->
    <b-col lg="5" class="my-1">
        <b-form-group
          label="Buscar:"
          label-cols-sm="3"
          label-align-sm="right"
          label-size="sm"
          label-for="filterInput"
          class="mb-0"
        >
          <b-input-group size="sm">
            <b-form-input
              v-model="filter"
              type="search"
              id="filterInput"
              placeholder="Buscar"
            ></b-form-input>
            <b-input-group-append>
              <b-button :disabled="!filter" @click="filter = ''">Limpiar</b-button>
            </b-input-group-append>
          </b-input-group>
        </b-form-group>
      </b-col>
      <b-col lg="5" class="my-1">
        <b-form-group
          label="Filtro:"
          label-cols-sm="3"
          label-align-sm="right"
          label-size="sm"
          description="Deja en blanco para buscar en todos los campos"
          class="mb-0">
          <!-- Opciones de búsqueda -->
          <b-form-checkbox-group v-model="filterOn" class="mt-1">
            <b-form-checkbox value="titulo">Título</b-form-checkbox>
            <b-form-checkbox value="descripcion">Descripción</b-form-checkbox>
            <!--<b-form-checkbox value="fecha">Fecha</b-form-checkbox> -->
          </b-form-checkbox-group>
        </b-form-group>
      </b-col>
    </section>

    <!-- Pintamos la tabla del componente boosrapt b-table: https://bootstrap-vue.org/docs/components/table
    Le añadimos paginación y estado de carga-->
    <b-table id="tabla-notas" striped responsive hover :items="notas" :fields="tablaEncabezados"
      :busy="isCargando" :per-page="maxPagina" :current-page="paginaActual" :filter="filter" :filterIncludedFields="filterOn">
      <!-- La parte de cargando -->
      <template v-slot:table-busy>
        <div class="text-center text-primary my-2">
          <b-spinner class="align-middle"></b-spinner>
          <strong>Cargando...</strong>
        </div>
      </template>
      <!-- Por cada acelda indicamos como queremos que se renderice y qué campos -->
      <!-- <template v-slot:cell(#)="row">{{row.item._id}}</template> -->
      <template v-slot:cell(titulo)="row">{{row.item.titulo}}</template>
      <template v-slot:cell(descripcion)="row">{{row.item.descripcion}}</template>
      <template v-slot:cell(imagen)="row">
        <b-avatar variant="info" :src="row.item.fichero? row.item.fichero.url : ''"></b-avatar>
      </template>
      <template v-slot:cell(fecha)="row">{{row.item.fecha | moment("DD/MM/YYYY, HH:mm")}}</template>
      <template v-slot:cell(acciones)="row">
        <b-button variant="primary" class="btn-sm mx-1 my-1" @click="verNota(row.item.id)" v-b-tooltip.hover title="Ver nota">
          <b-icon icon="card-text" aria-hidden="true"></b-icon>
        </b-button>
        <b-button variant="warning" class="btn-sm mx-1 my-1" @click="activarEdicion(row.item.id)" v-b-tooltip.hover title="Editar nota">
          <b-icon icon="pencil-square" aria-hidden="true"></b-icon>
        </b-button>
        <b-button variant="danger" class="btn-sm mx-1 my-1" @click="mostrarMensaje(row.item)" v-b-tooltip.hover title="Eliminar nota">
          <b-icon icon="trash"></b-icon>
        </b-button>
      </template>
    </b-table>

    <!--  Paginador unido a la tabla -->
    <div class="overflow-center">
      <b-pagination
        v-model="paginaActual"
        :total-rows="totalRegistros"
        :per-page="maxPagina"
        aria-controls="tabla-notas"
        align="center"
      ></b-pagination>
    <p class="mt-3">Página actual: {{ paginaActual }}</p>
    </div>
  </div>
</template>

<script>
/* eslint-disable no-underscore-dangle */
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
      // Para la tabla
      tablaEncabezados: [
        // { key: '#', sortable: true, label: '#' },
        { key: 'titulo', sortable: true, label: 'Título' },
        { key: 'descripcion', sortable: true, label: 'Descripción' },
        { key: 'imagen', label: 'Imagen' },
        { key: 'fecha', sortable: true, label: 'Fecha' },
        { key: 'acciones', label: 'Acciones' },
      ],
      isCargando: true,
      // Paginacion
      maxPagina: 5,
      paginaActual: 1,
      // Para la alerta
      alerta: { color: 'success', texto: '' },
      dismissSecs: 3,
      dismissCountDown: 0,
      // Muestra el formulario de agregar nota
      formAgregar: false,
      // Mustra elf ormulario de editar una nota
      formEditar: false,
      // Para buscar
      // busqueda: '', Por lsi lo queremos hacer manual con nuestro cuadro de búsqueda, usaré el de Vue Boostrapt
      filter: null,
      filterOn: [],
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
    ...mapState(['user']),
    // Para manear el filtro, en vez de psar la lista de notas pasa esto y te ahorras el filtro, pero ya que lo hace él lo dejaré el suyo
    // filtroNotas() {
    //   return this.notas.filter((nota) => nota.titulo.toLowerCase().includes(this.busqueda.toLowerCase()) || nota.descripcion.toLowerCase().includes(this.busqueda.toLowerCase()));
    // },
    totalRegistros() {
      return this.notas.length;
    },
  },

  // Mi métodos
  methods: {
    ...mapActions(['cerrarSesion']),
    // activa la edición.
    activarEdicion(id) {
      this.formEditar = true;
      // copiamos el objeto, no lo asignamos directamente con el igual {...} para evitar problemas de reactividad
      this.nota = { ...this.notas.find((n) => n.id === id) };
    },
    // elimina una nota
    async eliminarNota(id) {
      try {
        await NotasService.delete(id);
        // Elimino del array
        const index = this.notas.findIndex((item) => item.id === id);
        const delNota = this.notas[index];
        this.notas.splice(index, 1);
        // Borramos la imagen
        if (delNota.fichero.id) {
          await FilesService.delete(delNota.fichero.id);
        }
        // Alerta de mensaje
        this.verAlerta('¡Nota eliminada!', 'danger');
      } catch (error) {
        this.verAlerta(`No se ha podido eliminar la nota ${error}`, 'danger');
      }
    },
    // agrega una nueva nota
    async agregarNota() {
      // Si hay fichero lo subimos
      try {
        // Subimos la imagen si hay
        if (this.fichero.name) {
          const img = await FilesService.post(this.fichero);
          this.nota.fichero = img;
        }
        // Subimos la nota
        this.nota.user = this.user.email;
        this.nota.fecha = Date.now();
        const nota = await NotasService.post(this.nota);
        this.notas.unshift(nota);
        this.verAlerta('¡Nota agregada!', 'success');
      } catch (error) {
        console.log(error);
        this.verAlerta(`No se puede insertar la nota completa: ${error}`, 'danger');
      } finally {
        this.formAgregar = false;
        this.nota = {};
        this.fichero = {};
      }
    },
    // edita una nueva nota
    async editarNota() {
      try {
        // Primero si hay fichero nuevo lo subimos
        if (this.fichero.name) {
          const img = await FilesService.post(this.fichero, this.token);
          // si tenemos una imagen antigua la borramos
          if (this.nota.fichero.name) {
            await FilesService.delete(this.nota.fichero.id, this.token);
          }
          // copiamos los datos del nuevo fichero en la nota
          this.nota.fichero = img.data;
        }
        // Actualizamos la nota
        this.nota.user = this.user.email;
        await NotasService.put(this.nota.id, this.nota);
        this.verAlerta('¡Nota modificada!', 'success');
        // recargamos la tabla o actualizamos tod el vector a mano (asís e ven mejor los cambios)
        this.cargarNotas();
      } catch (error) {
        this.verAlerta(`No se ha podido modificar la nota: ${error}`, 'danger');
      } finally {
        this.nota = {};
        this.formEditar = false;
      }
    },
    // Carga la lista de notas
    async cargarNotas() {
      this.isCargando = true;
      // Consultamos todas las notas
      try {
        this.notas = await NotasService.get('user', this.user.email);
        // console.log(this.notas);
      } catch (error) {
        // Alerta de mensaje
        this.verAlerta(`No se ha cargar las notas: ${error}`, 'danger');
      } finally {
        this.isCargando = false;
      }
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
            this.eliminarNota(item.id);
          }
        });
    },
    // Metodos de la alerta
    verAlerta(texto, color) {
      this.alerta.texto = texto;
      this.alerta.color = color;
      this.showAlert();
    },
    // Evento para filtrar
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRegistros = filteredItems.length;
      this.paginaActual = 1;
    },
  },
};
</script>

<style scoped>

</style>
