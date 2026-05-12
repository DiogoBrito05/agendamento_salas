const routes = [
  {
    path: "/login",
    component: () => import("pages/LoginPage.vue"),
  },

  //Protegido por Autenticação
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    meta: {
      requiresAuth: true,
    },
    children: [
      {
        path: "",
        component: () => import("pages/IndexPage.vue"),
      },

      {
        path: "/perfil",
        component: () => import("pages/PerfilPage.vue"),
      },
    ],
  },
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
