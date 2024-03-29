import { RouteRecordRaw, createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/form",
    name: "Form",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/FormLocacao.vue")
  },
  {
    path: "/form/:id",
    name: "FormEdit",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/FormLocacao.vue")
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  },
  {
    path: "/view/:id",
    name: "View",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/ViewLocacao.vue")
  },
 
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;