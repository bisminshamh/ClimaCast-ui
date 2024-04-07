<template>
  <div>
    <h3 class="text-2xl font-bold text-left py-2">Saved Locations</h3>
    <div class="overflow-x-auto relative sm:rounded-lg">
      <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <!-- Table headers -->
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" class="py-3 px-6">Place</th>
            <th scope="col" class="py-3 px-6">Date</th>


            <th scope="col" class="py-3 px-6">Temperature</th>
            <th scope="col" class="py-3 px-6">FeelsLike</th>
            <th scope="col" class="py-3 px-6">Humidity</th>
            <th scope="col" class="py-3 px-6">Description</th>

            <th scope="col" class="py-3 px-6"><span class="sr-only">Edit</span></th>
          </tr>
        </thead>
        <!-- Table body -->
        <tbody>
          <!-- Loop through array of items and generate table rows -->
          <tr v-for="(item, index) in weather" :key="index"
            :class="(index + 1) % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-white border-b dark:bg-gray-800 dark:border-gray-700'">
            <!-- Place column -->
            <td class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">{{ item.name }}</td>
            <td class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">{{ item.date }}</td>

            <!-- Color column -->
            <td class="py-4 px-6">{{ item.temperature }}</td>
            <!-- Temperature column -->
            <td class="py-4 px-6">{{ item.feelsLike }}</td>
            <!-- Price column -->
            <td class="py-4 px-6">{{ item.humidity }}</td>
            <td class="py-4 px-6">{{ item.description }}</td>

            <!-- Edit column -->
            <td class="py-4 https://chat.openai.com/c/bdcef465-49a1-4118-85a4-53efd2ea4ab1px-6 text-left">
              <a @click="router.push({ name: 'weather', params: { location: item.name } })"
                class="cursor-pointer font-medium text-blue-600 dark:text-blue-500 hover:underline">See weather</a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * Vue component script for fetching weather data and managing Vuex store.
 * @module WeatherComponent
 * @category Components
 * @prop {Object} router - Vue router instance.
 * @prop {Object} store - Vuex store instance.
 * @prop {Function} getFollowByEmail - Action to fetch weather data.
 * @prop {Object} weather - Computed property for weather data.
 */
import router from '@/router';
import { computed } from 'vue';
import { useStore } from 'vuex';

// Initialize Vuex store
const store = useStore();

// Dispatch action to fetch weather data
store.dispatch('weather/getFollowByEmail');

// Computed property for weather data
const weather = computed(() => store.getters['weather/locations']);
</script>