import router from '@/router'
import { LOGIN, LOGOUT } from '@/stores/apis/auth'
import axios from 'axios'
import type { ActionContext } from 'vuex'

//state
interface State {
  isAuthenticated: boolean
  token: string
}

const state: State = {
  isAuthenticated: !!localStorage.getItem('token'),
  token: localStorage.getItem('token') || ''
}

// actions
const actions = {
  LOGIN({ commit }: ActionContext<any, any>, credentials: { username: string; password: string }) {
    let message = ''
    return new Promise<void>((resolve, reject) => {
      axios
        .post(LOGIN, credentials)
        .then((response) => {
          message = response.data.message
          commit('SET_TOKEN', response.data.data.token)
          router.push('/')
          resolve() // Resolve the promise to signal success
        })
        .catch((error) => {
          message = error
          // Handle error, e.g., show error message
          console.error('Login error:', error)
          reject(error) // Reject the promise to signal failure
        })
        .finally(() => {
          commit('snackbar/SET_SNACKBAR', {
            text: message,
            status: true
          })
        })
    })
  },
  LOGOUT({ commit }: ActionContext<any, any>) {
    let message = ''
    return new Promise<void>((resolve, reject) => {
      axios
        .post(LOGOUT)
        .then((response) => {
          message = response.data.message
          commit('REMOVE_TOKEN')
          router.push('/')
          resolve() // Resolve the promise to signal success
        })
        .catch((error) => {
          message = error
          // Handle error, e.g., show error message
          console.error('Login error:', error)
          reject(error) // Reject the promise to signal failure
        })
        .finally(() => {
          commit('snackbar/SET_SNACKBAR', {
            text: message,
            status: true
          })
        })
    })
  }
}

// mutations
const mutations = {
  SET_TOKEN(state: State, value: string) {
    state.token = value
    state.isAuthenticated = true
    localStorage.setItem('token', value)
    axios.defaults.headers.common['Authorization'] = `Bearer ${value}`
  },
  REMOVE_TOKEN(state: State) {
    state.token = ''
    state.isAuthenticated = false
    localStorage.removeItem('token')
    axios.defaults.headers.common['Authorization'] = ``
  }
}

// getters
const getters = {
  IS_AUTHENTICATED: (state: State) => state.isAuthenticated,
  READ_TOKEN: (state: State) => state.token
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
