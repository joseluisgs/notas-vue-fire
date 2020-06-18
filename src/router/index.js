import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '@/views/Home.vue';
import Error404 from '@/views/Error404.vue';
import Notas from '@/views/Notas.vue';
import Nota from '@/views/Nota.vue';
import store from '../store';


Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  // Login
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "about" */ '@/views/Login.vue'),
  },
  // Registrar
  {
    path: '/registrar',
    name: 'Registrar',
    component: () => import(/* webpackChunkName: "about" */ '@/views/Registro.vue'),
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
    meta: { isAuth: true },
  },
  {
    path: '/notas/:id', // La ruta y el parámetro
    name: 'Nota', // el alias de la ruta
    component: Nota, // Componente a carga
    meta: { isAuth: true },
  },
  // Para admin
  {
    // Filtrado adicional solo para esta ruta
    beforeEnter: ((to, from, next) => {
      if (!store.getters.isActivo) {
        next({ name: 'Login' });
      } else {
        next();
      }
      next(store.getters.isAdmin);
    }),
    path: '/admin',
    name: 'Admin',
    component: () => import(/* webpackChunkName: "about" */ '@/views/Admin.vue'),
    meta: { isAuth: true },
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

// Hook de acceso a rutas protegidas a nivel global. Identificamos los autenticados y que no ha expirado
router.beforeEach((to, from, next) => {
  const rutaProtegida = to.matched.some((record) => record.meta.isAuth);
  if (rutaProtegida && !store.getters.isActivo) {
    next({ name: 'Login' });
  } else {
    next();
  }
});

export default router;
