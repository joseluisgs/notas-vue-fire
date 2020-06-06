<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue';
// import NotasService from '../services/NotasService';

export default {
  name: 'Home',
  components: {
    HelloWorld,
  },
  created() {
    // Función de GET
    // NotasService.get().then((items) => (console.log(items.data)));
    // Función GEt by ID
    // NotasService.getById('5edb7ca00528ba0003a94fb3').then((item) => (console.log(item.data)));
    // const nuevo = { titulo: ' Prueba vue mod' };
    // NotasService.post(nuevo).then((item) => (console.log(item.data)));
    // NotasService.put('5edb7ca00528ba0003a94fb3', nuevo).then((item) => (console.log(item.data)));
    // NotasService.delete('5edb7ca00528ba0003a94fb3').then((item) => (console.log(item.data)));
  },
};
</script>
