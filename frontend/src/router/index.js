import { route } from "quasar/wrappers";
import {
  createRouter,
  createMemoryHistory,
  createWebHistory,
  createWebHashHistory,
} from "vue-router";

import routes from "./routes";

export default route(function () {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : process.env.VUE_ROUTER_MODE === "history"
      ? createWebHistory
      : createWebHashHistory;

  const Router = createRouter({
    scrollBehavior: () => ({
      left: 0,
      top: 0,
    }),
    routes,
    history: createHistory(process.env.VUE_ROUTER_BASE),
  });

  
 Router.beforeEach((to) => {
  const token = localStorage.getItem('token')
  const usuario = localStorage.getItem('usuario')
  // PROTEGIDO
  if (to.meta.requiresAuth && (!token || !usuario)) {
    return '/login'
  }
})

  return Router;
});
