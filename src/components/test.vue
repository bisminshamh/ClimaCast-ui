<template>
    <main>
        <!-- <div class="flex justify-center">
            <input v-model="searchQuery" type="text" placeholder="Search for a city or state">
        </div> -->
        <!-- <div class="flex flex-col items-center">
            <h1 class="text-4xl mb-2">Test</h1>
           
            <p class="text-8xl mb-4">
                80
            </p>
        </div> -->
        <div
            class="w-64 md:mr-20 mb-10  bg-white rounded-lg border flex flex-col justify-center items-center text-center p-6">
            <div class="text-md font-bold flex flex-col text-gray-900">
                <span class="uppercase">Today</span>
            </div>

            <div class="flex justify-between space-x-2">
                <div class="flex flex-col items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"
                        class="w-15 h-24 p-2 dark:text-yellow-600 fill-current">
                        <path
                            d="M256,104c-83.813,0-152,68.187-152,152s68.187,152,152,152,152-68.187,152-152S339.813,104,256,104Zm0,272A120,120,0,1,1,376,256,120.136,120.136,0,0,1,256,376Z">
                        </path>
                        <rect width="20" height="48" x="240" y="16"></rect>
                        <rect width="32" height="48" x="240" y="448"></rect>
                        <rect width="48" height="32" x="448" y="240"></rect>
                        <rect width="48" height="32" x="16" y="240"></rect>
                        <rect width="32" height="45.255" x="400" y="393.373" transform="rotate(-45 416 416)"></rect>
                        <rect width="32.001" height="45.255" x="80" y="73.373" transform="rotate(-45 96 96)"></rect>
                        <rect width="45.255" height="32" x="73.373" y="400" transform="rotate(-45.001 96.002 416.003)">
                        </rect>
                        <rect width="45.255" height="32.001" x="393.373" y="80" transform="rotate(-45 416 96)"></rect>
                    </svg>
                </div>
                <span class="font-bold text-8xl">14°</span>
            </div>

            <p class="text-gray-700 mb-2">Partly cloud</p>
            <p class="font-normal text-gray-700 text-sm">Pace</p>
            <p class="text-sm mb-12">
                {{
                    new Date().toLocaleDateString(
                        "en-US",
                        {
                            weekday: "short",
                            day: "2-digit",
                            month: "long"
                        }
                    ) }}
                {{
                    new Date().toLocaleTimeString(
                        "en-US",
                        {
                            timeStyle: "short"
                        }
                    ) }}

            </p>

        </div>
    </main>

</template>
<script setup lang="ts">
import { ref } from 'vue';
// import sunny from "../components/icons/sunny.vue"
const searchQuery = ref('')
const apiKey = ref('b9a55f097bb397041d9eb9ffb66171bd')
</script>