import './assets/main.css'

import { createApp } from 'vue'

import App from './App.vue'
import router from './router'
import store from './stores' // Import your Vuex store instance

const app = createApp(App)

app.use(store)
app.use(router)

app.mount('#app')
