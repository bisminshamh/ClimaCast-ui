<template>
    <div class="min-h-screen bg-gray-100 flex justify-center items-center">
        <button @click="saveLocation"
            class="py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 fixed bottom-10 right-10 z-50">
            Save Location
        </button>
        <div class="py-8 bg-[#9dafb3] rounded-2xl flex flex-col md:gap-6 lg:gap-10 md:flex-row md:justify-start md:items-start w-full md:w-[90%]  xl:w-[80%]  2xl:w-[70%] bg-cover bg-center sm:m-10"
            style="background-image: url('https://images.squarespace-cdn.com/content/57523357c2ea515ccf6c1adb/1490873569038-UDBIQ98DVVU31FTJCZKT/partly+cloudy.jpg?format=1000w&content-type=image%2Fjpeg');">
            <div class="bg-[#fee1b7] rounded-3xl text-[#fca079] md:ml-6 my-10 md:w-[45%] sm:m-10 xs:m-10 m-5">
                <div class="flex flex-col gap-5 items-center md:text-sm text-base p-10">
                    <h3 class="text-center text-2xl">Today</h3>
                    <div class="flex justify-center items-center gap-3">
                        <img :src="weather?.iconUrl" alt="" width="90">
                        <p class="text-9xl font-medium">{{ weather?.temperature }}°</p>
                    </div>
                    <p class="text-2xl font-medium">{{ weather?.description }}</p>
                    <p class="text-2xl font-small">{{ weather?.name }}</p>
                    <p class="text-1xl font-small">{{ weather?.date }}</p>
                    <p class="text-1xl font-small">
                        <span>Feels like {{ weather?.feelsLike }} </span>| <span>Sunset {{ weather?.sunset }}</span>
                    </p>
                </div>
            </div>

            <div class="rounded-xl flex flex-col gap-4 text-white my-10 md:w-[45%] sm:m-10 m-5">
                <div class="bg-[#b8b1a1] md:px-2 lg:px-6 py-3 rounded-xl w-full md:text-xs lg:text-lg"
                    style="background: rgba(255, 255, 255, 0.3); backdrop-filter: blur(10px);">
                    <div v-for="(row, index) in rows" :key="index" :class="{ 'border-t-2': index !== 0 }">
                        <div class="flex gap-7 p-5">
                            <div v-for="(item, i) in row" :key="i" class="flex items-center flex-col">
                                <p>{{ item.time }}</p>
                                <div class="flex items-center">
                                    <img :src="item.icon" alt="Weather Icon" class="md:h3-4 md:w-4 lg:h-6 lg:w-6 mr-2">
                                    <span>{{ item.temperature }}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="flex flex-col gap-3 w-full">
                    <h3>Random Text</h3>
                    <p class="text-sm">
                        Improve him believe opinion offered met and end cheered forbode.
                        Friendly as stronger speedly by recurred. Son interest wandered sir
                        addition end say. Manners beloved affixed picture men ask
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
/**
 * Vue component script for displaying weather information and managing user interactions.
 * @module WeatherDisplay
 * @category Components
 */

import { computed, onMounted, defineProps } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';

// Initialize Vuex store
const store = useStore();
// Get current route
const route = useRoute();

// Define props
const props = defineProps({
    location: String
});

/**
 * Function to save the current location to user's followed locations.
 */
const saveLocation = () => {
    store.dispatch('weather/addToFollow', weather.value.name);
};

// Extract location and coordinates from route and props
const location = props.location;
const lat = route.query.lat;
const long = route.query.long;

// Compute weather data from Vuex store
const weather = computed(() => store.getters['weather/weather']);

// Compute forecast data from Vuex store
const forecast = computed(() => store.getters['weather/forcaste']);

// Compute rows for displaying forecast in a grid
const rows = computed(() => {
    if (forecast.value) {
        const numRows = Math.ceil(forecast.value.length / 5);
        const rows = [];
        for (let i = 0; i < numRows; i++) {
            rows.push(forecast.value.slice(i * 5, (i + 1) * 5));
        }
        return rows;
    } else {
        return 0;
    }
});

// Fetch weather data from API on component mount
onMounted(() => {
    store.dispatch('weather/fetchWeather', { lat, long, location });
});
</script>
