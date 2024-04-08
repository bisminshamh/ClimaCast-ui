<template>
  <div class="w-screen h-screen flex">
    <!-- sidebar -->
    <div
      class="w-[60%] sm:w-[30%] md:w-[20%] z-10 fixed top-0 left-0 md:z-0 md:relative md:top-0 md:left-0 h-full bg-gray-200 text-white"
      v-show="showSide">

      <div class="h-[50px] bg-gray-900 flex justify-start  items-center ">
        <div class="px-[20px]">
          <h3 class="font-bold text-xl">Dashboard</h3>
        </div>
      </div>
      <div class="h-[calc(100vh-50px)] bg-gray-800 py-[20px]">
        <div class="flex flex-col justify-between h-full px-[20px] space-y-[10px]">
          <div class=" flex flex-col justify-between space-y-[10px]" @click="isSmAndDown">
            <router-link to="/home"
              class="inline-flex relative items-center py-[10px] px-[10px] w-full text-sm font-medium rounded-md border-gray-200 hover:bg-gray-200 hover:text-gray-800  transition duration-400 ease-in-out">
              <svg aria-hidden="true" class="mr-2 w-[25px] h-[25px] fill-current" fill="currentColor"
                viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <title>home</title>
                <path
                  d="M16,8.41L11.5,3.91L4.41,11H6V12L6,19H9V13H14V19H17V11H18.59L17,9.41V6H16V8.41M2,12L11.5,2.5L15,6V5H18V9L21,12H18V20H13V14H10V20H5V12H2Z" />
              </svg>


              Home
            </router-link>
            <router-link to="/mail-setup"
              class="inline-flex relative items-center py-[10px] px-[10px] w-full text-sm font-medium rounded-md border-gray-200 hover:bg-gray-300  hover:text-gray-800 transition duration-400 ease-in-out">
              <svg aria-hidden="true" class="mr-2 w-[25px] h-[25px] fill-current" fill="currentColor"
                viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <title>email</title>
                <path
                  d="M1 5H2V4H20V5H21V18H20V19H2V18H1V5M3 17H19V9H18V10H16V11H14V12H12V13H10V12H8V11H6V10H4V9H3V17M19 6H3V7H5V8H7V9H9V10H13V9H15V8H17V7H19V6Z" />
              </svg>
              Mail Setup
            </router-link>
          </div>

        </div>
      </div>
    </div>
    <div class="w-full h-full bg-gray-400">
      <div class="h-[50px] bg-gray-100 flex items-center shadow-sm px-[20px] w-full py-[10px] z-10 border-b ">
        <!-- Hambuger menu -->
        <div class="cursor-pointer w-[30px]" @click="toggleSideBar">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class=" w-[25px] h-[25px]">
            <!--! Font Awesome Pro 6.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
            <path
              d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z" />
          </svg>
        </div>
        <!-- Search bar -->

        <div class="w-[calc(100%-30px)] flex">
          <div class="relative w-[calc(100%-200px)] flex justify-center">
            <!-- Search bar -->
            <form class="flex items-center w-[500px] relative">
              <label for="voice-search" class="sr-only">Search</label>
              <div class="relative w-full">
                <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                  <svg aria-hidden="true" class="w-5 h-auto text-gray-500 dark:text-gray-400" fill="currentColor"
                    viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd"
                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                      clip-rule="evenodd"></path>
                  </svg>
                </div>
                <input type="text" id="voice-search" v-model="searchQuery" @input="searchCities"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Search..." required>
                <div class="cursor-pointer flex absolute inset-y-0 right-0 items-center pr-3"
                  @click="getCurrentLocation">

                  <svg aria-hidden="true"
                    class="w-5 h-5 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                    fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <title>crosshairs-gps</title>
                    <path
                      d="M12,8A4,4 0 0,1 16,12A4,4 0 0,1 12,16A4,4 0 0,1 8,12A4,4 0 0,1 12,8M3.05,13H1V11H3.05C3.5,6.83 6.83,3.5 11,3.05V1H13V3.05C17.17,3.5 20.5,6.83 20.95,11H23V13H20.95C20.5,17.17 17.17,20.5 13,20.95V23H11V20.95C6.83,20.5 3.5,17.17 3.05,13M12,5A7,7 0 0,0 5,12A7,7 0 0,0 12,19A7,7 0 0,0 19,12A7,7 0 0,0 12,5Z" />
                  </svg>
                </div>
              </div>
            </form>
            <!-- Display search results as dropdown -->
            <ul v-if="searchResults.length"
              class="mt-2 absolute top-full bg-gray-50 border border-gray-300 rounded-md shadow-md w-full z-10">
              <li v-for="city in searchResults" :key="city.id">
                <router-link :to="`/weather/${city.name}`" class="block px-4 py-2 hover:bg-gray-100">{{ city.name }}, {{
                  city.country }}</router-link>
              </li>
            </ul>
            <p v-else-if="searchQuery" class="mt-2">No cities found</p>
          </div>
          <!-- User login -->
          <div class="w-[200px] flex justify-end ">
            <div class="cursor-pointer pt-3">
              <svg @click="logout" aria-hidden="true" class="mr-2 w-[25px] h-[25px] fill-current" fill="currentColor"
                viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg">
                <title>logout</title>
                <path
                  d="M17 7L15.59 8.41L18.17 11H8V13H18.17L15.59 15.58L17 17L22 12M4 5H12V3H4C2.9 3 2 3.9 2 5V19C2 20.1 2.9 21 4 21H12V19H4V5Z" />
              </svg>
            </div>


            <!-- Home
            <button class="text-gray-700 block w-full px-4 py-2 text-left text-sm" role="menuitem"
              tabindex="-1" id="menu-item-3">Sign out</button> -->
          </div>
        </div>
      </div>
      <div class="h-[calc(100vh-50px)] bg-gray-50 p-[20px]">
        <div class="border border-gray-300 rounded-md p-[20px] h-full">
          <router-view></router-view>
        </div>
      </div>
    </div>
    <!-- Main  -->
  </div>
</template>
<script setup lang="ts">
/**
 * Vue component for displaying a dashboard with sidebar.
 * @component
 * @module Dashboard
 * @category Components
 * @prop {boolean} showSide - Whether to show the sidebar or not.
 * @prop {string} searchQuery - The query string for searching cities.
 * @prop {array} searchResults - The array containing search results.
 * @prop {boolean} showDropDown - Whether to show the dropdown menu or not.
 */
import { computed, onMounted, ref } from 'vue';
import axios from 'axios';
import { useStore } from 'vuex'
import router from '@/router';

// Store instance
const store = useStore()

// Logout function
const logout = () => {
  store.dispatch('auth/LOGOUT')
};

const API_KEY = computed(() => store.getters['auth/API_KEY']);


// Run the sidebar toggle function on component mount for small screens
onMounted(() => {

  const apiKey = localStorage.getItem('apiKey');
  if (!apiKey) {
    // Make an API call to get the API key
    store.dispatch('auth/APIKEY')
  }

  if (window.innerWidth <= 768) {
    toggleSideBar();
  }
});

// Search query ref
const searchQuery = ref('');

// Search results ref
const searchResults = ref<any>([]);

// Search cities function
async function searchCities() {
  try {
    const response = await axios.get(`https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/geo/1.0/direct?q=${searchQuery.value}&limit=10&appid=${API_KEY.value}`);
    searchResults.value = response.data;
  } catch (error) {
    console.error('Error fetching cities:', error);
    searchResults.value = [];
  }
}

// Dropdown state
let showDropDown = ref(false);

// Sidebar state
let showSide = ref(true);

// Sidebar toggle function
const toggleSideBar = () => {
  showSide.value = !showSide.value
}

// Dropdown toggle function
const toggleDrop = () => {
  showDropDown.value = !showDropDown.value
}

// Get current location function
const getCurrentLocation = async () => {
  try {
    // Get current location using Geolocation API
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        // You can perform further actions with latitude and longitude
        router.push({ name: 'weather', params: { location: 'CurrentLocation' }, query: { lat: latitude, long: longitude } })
      });
    } else {
      console.error("Geolocation is not supported by this browser.");
      // Handle unsupported browser case
    }
  } catch (error) {
    console.error("Error getting current location:", error);
    // Handle error if necessary
  }
}

const isSmAndDown = () => {
  const screenWidth = window.innerWidth;
  if (screenWidth <= 768) toggleSideBar()
};

</script>

<style>
/* Styles go here */
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>