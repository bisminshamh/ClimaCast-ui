import router from '@/router'
import { LOGIN, REGISTER } from '@/stores/apis/auth'
import { GRAPHQL_ENDPOINT } from '@/stores/apis/common'

import axios from 'axios'
import type { ActionContext } from 'vuex'

//state
interface State {
  isAuthenticated: boolean
  token: string
  email: string
  apiKey: string
}

/** @type {State} */
const state = {
  isAuthenticated: !!localStorage.getItem('token'),
  token: localStorage.getItem('token') || '',
  email: localStorage.getItem('email') || '',
  apiKey: localStorage.getItem('apiKey') || ''
}

/** Actions for authentication */

const actions = {
  /**
   * Fetches the API key from the server.
   * @param {Object} context - The Vuex action context.
   * @param {Function} context.commit - The Vuex commit function to commit mutations.
   */
  async APIKEY({ commit }: ActionContext<any, any>) {
    try {
      const response = await axios.post(GRAPHQL_ENDPOINT, {
        query: `
          query {
            getApiKey {
              key
            }
          }
        `
      })
      const apiKey = response.data.data.getApiKey.key
      commit('SET_API_KEY', apiKey)
      router.push('/home')
    } catch (error) {
      alert('Error occured')
    }
  },
  /**
   * Logs in the user.
   * @param {ActionContext<any, any>} context - The Vuex action context.
   * @param {{ email: string, password: string }} credentials - The user's login credentials.
   */
  async LOGIN(
    { commit, dispatch }: ActionContext<any, any>,
    credentials: { email: string; password: string }
  ) {
    try {
      const { email, password } = credentials
      const response = await axios.post(GRAPHQL_ENDPOINT, {
        query: LOGIN,
        variables: { email, password }
      })
      if (response.data.errors[0].message === 'User not found') {
        alert('User not registered')
      }
      if (response.data.data.loginUser) {
        commit('SET_TOKEN', { token: response.data.data.loginUser, email: email })
        dispatch('APIKEY')
      }
    } catch (error) {
      alert('Unexpected Error, Please try again')
    }
  },

  /**
   * Registers a new user.
   * @param {ActionContext<any, any>} context - The Vuex action context.
   * @param {{ email: string, password: string }} userData - The new user's data.
   */
  async REGISTER(
    { commit }: ActionContext<any, any>,
    userData: { email: string; password: string }
  ) {
    try {
      const { email, password } = userData
      const response = await axios.post(GRAPHQL_ENDPOINT, {
        query: REGISTER,
        variables: { email, password }
      })

      if (response.data.errors) {
        if (response.data?.errors[0].message.includes('duplicate')) {
          alert('User already registered')
        }
      } else if (response.data.data.register) {
        commit('SET_TOKEN', { token: response.data.data.register, email: email })
        router.push('/home')
      }
    } catch (error) {
      console.error('Registration error:', error)
      alert('Unexpected Error, Please try again')
    }
  },

  /**
   * Logs out the user.
   * @param {ActionContext<any, any>} context - The Vuex action context.
   */
  LOGOUT({ commit }: ActionContext<any, any>) {
    commit('REMOVE_TOKEN')
    router.push('/login')
  }
}

/** Mutations for authentication */

const mutations = {
  /**
   * Sets the authentication token and user email.
   * @param {State} state - The Vuex state.
   * @param {any} data - The token and email data.
   */
  SET_TOKEN(state: State, data: any) {
    state.token = data.token
    state.email = data.email
    state.isAuthenticated = true
    localStorage.setItem('token', data.token)
    localStorage.setItem('email', data.email)

    axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`
  },
  /**
   * Removes the authentication token and user email.
   * @param {State} state - The Vuex state.
   */
  REMOVE_TOKEN(state: State) {
    state.token = ''
    state.isAuthenticated = false
    localStorage.removeItem('token')
    localStorage.removeItem('email')
    localStorage.removeItem('apiKey')
    axios.defaults.headers.common['Authorization'] = ``
  },
  /**
   * Sets the api key for openwhether.
   * @param {State} state - The Vuex state.
   */
  SET_API_KEY(state: State, data: string) {
    state.apiKey = data
    localStorage.setItem('apiKey', data)
  }
}

/** Getters for authentication */
const getters = {
  /** Returns true if the user is authenticated, otherwise false. */
  IS_AUTHENTICATED: (state: State) => state.isAuthenticated,

  /** Returns the authentication token. */
  READ_TOKEN: (state: State) => state.token,

  /** Returns the API Key. */
  API_KEY: (state: State) => state.apiKey
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
