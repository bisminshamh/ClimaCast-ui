// category.ts
import {} from // CATEGORIES_ADD,
// CATEGORIES_LIST,
// CATEGORIES_REMOVE,
// CATEGORIES_UPDATE
'@/stores/apis/weather'
// import axios from 'axios'
// import type { ActionContext } from 'vuex'

// State
interface Category {
  _id: string
  name: string
}
interface DialogState {
  add: boolean
  // Add other properties specific to your dialog here
}
interface State {
  categories: Category[]
  dialog: DialogState
}

const state: State = {
  categories: [],
  dialog: {
    add: false
  }
}

// Actions
const actions = {
  //   async FETCH_CATEGORIES({ commit }: ActionContext<any, any>) {
  //     try {
  //       // Replace CATEGORY_API with the actual API endpoint for fetching categories
  //       const response = await axios.get(CATEGORIES_LIST)
  //       const categories = response.data.data // Assuming the API response contains an array of categories
  //       commit('SET_CATEGORIES', categories)
  //     } catch (error) {
  //       console.error('Error fetching categories:', error)
  //     }
  //   },
  //   async ADD_CATEGORY({ dispatch, commit }: ActionContext<any, any>, payload: string) {
  //     let message = '' as any
  //     try {
  //       // Replace CATEGORY_ADD_API with the actual API endpoint for adding categories
  //       const response = await axios.post(CATEGORIES_ADD, payload)
  //       message = response.data.message
  //       commit('SET_DIALOG', {
  //         value: false,
  //         name: 'add'
  //       })
  //       dispatch('FETCH_CATEGORIES')
  //     } catch (error) {
  //       message = error
  //       console.error('Error adding category:', error)
  //     } finally {
  //       commit('snackbar/SET_SNACKBAR', {
  //         text: message,
  //         status: true
  //       })
  //     }
  //   },
  //   async UPDATE_CATEGORY(
  //     { dispatch, commit }: ActionContext<any, any>,
  //     payload: { id: string; name: string }
  //   ) {
  //     let message = '' as any
  //     try {
  //       // Replace CATEGORIES_UPDATE with the actual API endpoint for updating a category
  //       const response = await axios.put(CATEGORIES_UPDATE.replace('{id}', payload.id), {
  //         name: payload.name
  //       })
  //       message = response.data.message
  //       dispatch('FETCH_CATEGORIES')
  //     } catch (error) {
  //       message = error
  //       console.error('Error updating category:', error)
  //     } finally {
  //       commit('snackbar/SET_SNACKBAR', {
  //         text: message,
  //         status: true
  //       })
  //     }
  //   },
  //   async DELETE_CATEGORY({ dispatch, commit }: ActionContext<any, any>, categoryId: string) {
  //     let message = '' as any
  //     try {
  //       // Replace CATEGORIES_REMOVE with the actual API endpoint for removing a category
  //       const response = await axios.delete(CATEGORIES_REMOVE.replace('{id}', categoryId))
  //       message = response.data.message
  //       // You can also update the state to remove the deleted category from the list
  //       dispatch('FETCH_CATEGORIES')
  //     } catch (error) {
  //       message = error
  //       console.error('Error deleting category:', error)
  //     } finally {
  //       commit('snackbar/SET_SNACKBAR', {
  //         text: message,
  //         status: true
  //       })
  //     }
  //   }
}

// Mutations
const mutations = {
  SET_CATEGORIES(state: State, categories: Category[]) {
    state.categories = categories
  },
  SET_DIALOG(state: State, payload: { name: keyof DialogState; value: boolean }) {
    state.dialog[payload.name] = payload.value
  }
}

// Getters
const getters = {
  READ_CATEGORIES: (state: State) => state.categories,
  READ_DIALOG: (state: State) => state.dialog
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
