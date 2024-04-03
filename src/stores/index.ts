// index.ts

import auth from '@/stores/modules/auth'
import weather from '@/stores/modules/weather'

import { createStore } from 'vuex'

const store = createStore({
  modules: {
    auth,
    weather
  }
})

export default store
