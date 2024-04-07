/**
 * Import global CSS file.
 */
import './assets/main.css'

import { createApp } from 'vue'

import App from './App.vue'
import router from './router'
import store from './stores'
import axios from 'axios'

const app = createApp(App)
axios.defaults.baseURL = import.meta.env.MODE === 'production' ? '' : 'http://localhost:5000'

/**
 * Use Vuex store.
 * @type {import('vuex').Store}
 */
app.use(store)

/**
 * Use Vue Router.
 * @type {import('vue-router').Router}
 */
app.use(router)

/**
 * Mount the app to the DOM.
 * @method mount
 * @memberof App
 * @instance
 * @param {string} elementSelector - The selector for the DOM element where the app will be mounted.
 */
app.mount('#app')
