import auth from '@/stores/modules/auth'
import weather from '@/stores/modules/weather'

import { createStore } from 'vuex'

/**
 * Creates and configures the Vuex store.
 * @returns {Store<any>} The Vuex store.
 */
const createAppStore = () => {
  return createStore({
    modules: {
      auth,
      weather
    }
  })
}

// Create the Vuex store instance
const store = createAppStore()

// Export the Vuex store
export default store
