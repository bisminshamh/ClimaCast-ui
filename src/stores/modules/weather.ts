// Import necessary dependencies
import axios from 'axios'
import {
  ADD_TO_FOLLOW,
  REMOVE_FROM_FOLLOW,
  FOLLOW_BY_EMAIL,
  ADD_MAIL,
  GET_EMAILS_SUBJECTS
} from '../apis/weather'
import { GRAPHQL_ENDPOINT } from '@/stores/apis/common'
const corsproxy = 'https://cors-anywhere.herokuapp.com/http://'

import type { ActionContext } from 'vuex'

// State for weather module
interface WeatherData {
  temperature: number
  feelsLike: number
  humidity: number
  description: string
  icon: string
  iconUrl: string
  name: string
  sunset: string
  date: string
}

interface State {
  locations: Array<object>
  weather: WeatherData
  forcaste: any
  emails: Array<string>
  subject: 'string'
}
const state = {
  locations: [],
  weather: {},
  forcate: [],
  emails: [],
  subject: ''
}
// const API_KEY = 'b9a55f097bb397041d9eb9ffb66171bd'

// Actions for weather module
const actions = {
  /**
   * Adds an item to the user's follow list.
   * @param {ActionContext<any, any>} context - The Vuex action context.
   * @param {any} item - The item to add to the follow list.
   */
  async addToFollow({ rootState }: ActionContext<any, any>, item: any) {
    try {
      const response = await axios.post(GRAPHQL_ENDPOINT, {
        query: ADD_TO_FOLLOW,
        variables: { email: rootState.auth.email, item }
      })
      alert('Location saved')
    } catch (error) {
      console.error('Add to follow error:', error)
      alert('Error occured')
    }
  },

  /**
   * Removes an item from the user's follow list.
   * @param {ActionContext<any, any>} context - The Vuex action context.
   * @param {Object} payload - The payload containing email and item to remove.
   */
  async removeFromFollow({ commit }: ActionContext<any, any>, { email, item }: any) {
    try {
      await axios.post(GRAPHQL_ENDPOINT, {
        query: REMOVE_FROM_FOLLOW,
        variables: { email, item }
      })
      // Handle response if necessary
    } catch (error) {
      console.error('Remove from follow error:', error)
      alert('Error occured')
    }
  },

  /**
   * Retrieves follow list by email.
   * @param {ActionContext<any, any>} context - The Vuex action context.
   */
  async getFollowByEmail({ rootState, dispatch }: ActionContext<any, any>) {
    try {
      const response = await axios.post(GRAPHQL_ENDPOINT, {
        query: FOLLOW_BY_EMAIL,
        variables: { email: rootState.auth.email }
      })
      // Update state with weather data
      const locations = response.data.data.followByEmail
      console.log(response.data.data)
      locations.forEach((loca: string) => {
        dispatch('fetchWeather', { location: loca, isFollowedLoction: true })
      })
    } catch (error: any) {
      console.error('Get follow by email error:', error)
      alert('Error occured')
    }
  },
  /**
   * Fetches weather data from OpenWeatherMap API.
   * @param {ActionContext<any, any>} context - The Vuex action context.
   * @param {Object} payload - The payload containing latitude, longitude, location, and isFollowedLocation flag.
   */
  async fetchWeather(
    { commit, dispatch, rootState }: ActionContext<any, any>,
    { lat, long, location, isFollowedLoction }: any
  ) {
    try {
      let API = ''

      if (lat && long)
        API = `${corsproxy}api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${rootState.auth.apiKey}&units=metric`
      else
        API = `${corsproxy}api.openweathermap.org/data/2.5/weather?q=${location}&appid=${rootState.auth.apiKey}&units=metric`

      const response = await axios.get(API)
      const data = response.data
      const weather = {
        temperature: Math.round(data.main.temp),
        feelsLike: Math.round(data.main.feels_like),
        humidity: data.main.humidity,
        description: data.weather[0].description,
        icon: data.weather[0].icon,
        iconUrl: `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`,
        name: data.name,
        sunset: new Date(data.sys.sunset * 1000).toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit'
        }),
        date: new Date(data.dt * 1000).toLocaleDateString('en-US', {
          day: 'numeric',
          month: 'long',
          year: 'numeric'
        }),
        id: data.id
      }
      if (isFollowedLoction) commit('SET_LOCATIONS', weather)
      else {
        commit('SET_WEATHER', weather)
        dispatch('fetchForecast', data.name)
      }
    } catch (err: any) {
      if (err.code === 'ERR_NETWORK') {
        window.location.reload()
        alert('Network error please refresh the page')
      }
    }
  },
  /**
   * Fetches forecast data from OpenWeatherMap API.
   * @param {ActionContext<any, any>} context - The Vuex action context.
   * @param {string} place - The location for which forecast data is to be fetched.
   */
  async fetchForecast({ commit, rootState }: ActionContext<any, any>, place: string) {
    try {
      const response = await axios.get(
        `${corsproxy}api.openweathermap.org/data/2.5/forecast?q=${place}&appid=${rootState.auth.apiKey}&units=metric`
      )
      const data = response.data.list

      // Get the current date in UTC timezone
      const currentDate = new Date()
      const currentDateString = currentDate.toISOString().split('T')[0]

      // Filter forecast data for the current day
      const forecastForToday = data.filter((item: any) => {
        const forecastDate = item.dt_txt.split(' ')[0]
        return forecastDate === currentDateString
      })

      // If there are less than 10 items for the current day, fetch items for the next day
      const remainingItems = 10 - forecastForToday.length
      if (remainingItems > 0) {
        const nextDay = new Date(currentDate)
        nextDay.setDate(nextDay.getDate() + 1)
        const nextDayString = nextDay.toISOString().split('T')[0]
        const forecastForNextDay = data.filter((item: any) => {
          const forecastDate = item.dt_txt.split(' ')[0]
          return forecastDate === nextDayString
        })
        forecastForToday.push(...forecastForNextDay.slice(0, remainingItems))
      }

      // Map filtered forecast data to the required format
      const forecast = forecastForToday.map((item: any) => ({
        time: item.dt_txt.split(' ')[1].substring(0, 5), // Extract time HH:MM
        temperature: item.main.temp,
        icon: `http://openweathermap.org/img/wn/${item.weather[0].icon}.png`
      }))
      commit('SET_FORCASTE', forecast)
    } catch (err) {
      alert('Error occured')
    }
  },
  /**
   * Adds email and subject to the mailing list.
   * @param {ActionContext<any, any>} context - The Vuex action context.
   * @param {Object} payload - The payload containing emails and subject.
   */
  async addMail(
    { rootState }: ActionContext<any, any>,
    { emails, subject }: { emails: Array<string>; subject: string }
  ) {
    try {
      await axios.post(GRAPHQL_ENDPOINT, {
        query: ADD_MAIL,
        variables: { email: rootState.auth.email, emails, subject }
      })
      alert('Data updated successfully')
    } catch (error) {
      console.error('Add mail error:', error)
      alert('Error occured')
    }
  },
  /**
   * Retrieves emails and subject from the mailing list.
   * @param {ActionContext<any, any>} context - The Vuex action context.
   */
  async getEmailsSubjects({ commit, rootState }: ActionContext<any, any>) {
    try {
      const response = await axios.post(GRAPHQL_ENDPOINT, {
        query: GET_EMAILS_SUBJECTS,
        variables: { email: rootState.auth.email }
      })
      commit('SET_EMAIL', response.data.data.getEmailsAndSubject.emails)
      commit('SET_SUBJECT', response.data.data.getEmailsAndSubject.subject)
    } catch (error) {
      console.error('Get follow by email error:', error)
      // Handle error if necessary
    }
  }
}

// Mutations for weather module
const mutations = {
  /**
   * Sets the weather data in the state.
   * @param {State} state - The Vuex state.
   * @param {Object} data - The weather data.
   */ SET_WEATHER(state: State, data: any) {
    state.weather = data
  },
  /**
   * Sets the forecast data in the state.
   * @param {State} state - The Vuex state.
   * @param {Array} data - The forecast data.
   */ SET_FORCASTE(state: State, data: any) {
    state.forcaste = data
  },
  /**
   * Adds a location to the locations array in the state.
   * @param {State} state - The Vuex state.
   * @param {Object} data - The location data to be added.
   */ SET_LOCATIONS(state: State, data: any) {
    const isLocationExists = state.locations.some((location: any) => location.id === data.id)
    if (!isLocationExists) {
      // Location with the same ID doesn't exist, push it to the array
      state.locations.push(data)
    }
  },
  /**
   * Sets the emails in the state.
   * @param {State} state - The Vuex state.
   * @param {Array} data - The email data.
   */ SET_EMAIL(state: State, data: any) {
    // console.log(data)
    state.emails = data
  },
  /**
   * Sets the subject in the state.
   * @param {State} state - The Vuex state.
   * @param {string} data - The subject data.
   */ SET_SUBJECT(state: State, data: any) {
    state.subject = data
  }
}

// Getters for weather module
const getters = {
  /**
   * Retrieves the locations from the state.
   * @param {State} state - The Vuex state.
   * @returns {Array} The locations array.
   */ locations: (state: State) => state.locations,
  /**
   * Retrieves the weather from the state.
   * @param {State} state - The Vuex state.
   * @returns {Object} The weather object.
   */
  weather: (state: State) => state.weather,
  /**
   * Retrieves the forecast from the state.
   * @param {State} state - The Vuex state.
   * @returns {Array} The forecast array.
   */ forcaste: (state: State) => state.forcaste,

  /**
   * Retrieves the emails and subject from the state.
   * @param {State} state - The Vuex state.
   * @returns {Object} The object containing emails and subject.
   */
  emailsSubject: (state: State) => {
    return { emails: state.emails, subject: state.subject }
  }
}

// Export the weather module
export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}
