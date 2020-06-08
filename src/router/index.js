import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '@/views/Home.vue';
import Error404 from '@/views/Error404.vue';
import Notas from '@/views/Notas.vue';
import Nota from '@/views/Nota.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '@/views/About.vue'),
  },
  {
    path: '/notas',
    name: 'Notas',
    // Carga perezosa component: () => import(/* webpackChunkName: "about" */ '@/views/Notas.vue'),
    component: Notas,
  },
  {
    path: '/notas/:id', // La ruta y el parámetro
    name: 'Nota', // el alias de la ruta
    component: Nota, // Componente a carga
    /* // Requerimos que estamos autenticados.
    meta: { // Añadimos metadatos a la ruta
      auth: true, // Exigimos que esté autenticado
    }, */
  },
  // Otro destino que no esté ene path
  // Error 404
  {
    path: '*',
    name: 'Error404',
    component: Error404,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
