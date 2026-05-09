const routes = [

  // LOGIN
  {
    path: '/login',

    component: () =>
      import('pages/LoginPage.vue')
  },

  // SISTEMA
  {
    path: '/',

    component: () =>
      import('layouts/MainLayout.vue'),

    meta: {
      requiresAuth: true
    },

    children: [

      // DASHBOARD
      {
        path: '',

        component: () =>
          import('pages/IndexPage.vue')
      },

      // AGENDAMENTOS
      {
        path: 'agendamentos',

        component: () =>
          import(
            'pages/AgendamentosPage.vue'
          )
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