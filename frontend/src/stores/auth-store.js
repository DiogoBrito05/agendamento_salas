import { defineStore } from 'pinia'

export const useAuthStore =
  defineStore('auth', {

    state: () => ({
      usuario: null,
      token: null
    }),

    actions: {

      salvarLogin(dados) {

        this.usuario = dados.usuario
        this.token = dados.token

        localStorage.setItem(
          'usuario',
          JSON.stringify(dados.usuario)
        )

        localStorage.setItem(
          'token',
          dados.token
        )

      },

      logout() {

        this.usuario = null
        this.token = null

        localStorage.removeItem('usuario')
        localStorage.removeItem('token')

      }

    }

  })