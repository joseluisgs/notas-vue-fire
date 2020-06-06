<template>
  <div>
    <!-- Pintamos la tabla del componente boosrapt b-table -->
    <b-table striped responsive hover :items="items" :fields="encabezados">
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
export default {
  name: 'TablaNotas',
  // Mis propiedades
  props: ['items'],
  data() {
    return {
      // Note 'isActive' is left out and will not appear in the rendered table
      encabezados: [
        { key: '#', sortable: true, label: '#' },
        { key: 'titulo', sortable: true, label: 'Título' },
        { key: 'descripcion', sortable: true, label: 'Descripción' },
        { key: 'fecha', sortable: true, label: 'Fecha' },
        { key: 'acciones', label: 'Acciones' },
      ],
    };
  },
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
