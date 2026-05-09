const routes = [

  // LOGIN
  {
    path: '/login',
    component: () =>
      import('pages/LoginPage.vue')
  },

  // SISTEMA PROTEGIDO
  {
    path: '/',
    component: () =>
      import('layouts/MainLayout.vue'),

    meta: {
      requiresAuth: true
    },

    children: [
      {
        path: '',
        component: () =>
          import('pages/IndexPage.vue')
      }
    ]
  },

  // 404
  {
    path: '/:catchAll(.*)*',
    component: () =>
      import('pages/ErrorNotFound.vue')
  }

]

export default routes