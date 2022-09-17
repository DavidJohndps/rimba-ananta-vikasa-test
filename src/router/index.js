import Vue from "vue";
import VueRouter from "vue-router";
import store from '../store'

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Home.vue"),
  },
  {
    path: "/login",
    name: "Login",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Login.vue"),
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    meta: {
      requiresAuth: true
    },
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Dashboard.vue"),
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeResolve((to, from, next) => {
  const {id, role} = store.getters.getCredentials;
  const isAuthenticated = !!id;
  const isStaff = role == '1' ? true : false;
  if (to.meta.requiresAuth && !isAuthenticated) next("Login");
  if (to.meta.requiresAuth && to.meta.staffOnly && !isStaff) next("Login")
  else next();
});

export default router;
