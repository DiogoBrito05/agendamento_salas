import {
  route
} from 'quasar/wrappers'

import {
  createRouter,
  createWebHashHistory
} from 'vue-router'

import routes from './routes'

export default route(function () {

  const Router = createRouter({

    history:
      createWebHashHistory(),

    routes

  })

  Router.beforeEach((to) => {

    const token =
      localStorage.getItem('token')

    // rota protegida
    if (
      to.meta.requiresAuth
      && !token
    ) {

      return '/login'
    }

    // já autenticado
    if (
      to.path === '/login'
      && token
    ) {

      return '/'
    }

  })

  return Router

})