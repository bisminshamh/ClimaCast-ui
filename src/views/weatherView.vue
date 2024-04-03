<template>
    <div class="min-h-screen bg-gray-100 flex">
        <div class="px-6 m-4 py-8 bg-[#9dafb3] rounded-2xl flex flex-col gap-6 md:flex-row h-screen md:h-fit">
            <div class="bg-[#fee1b7] rounded-2xl py-3 px-3 w-full md:h-fit text-[#fca079]">
                <div class="flex flex-col gap-4 items-center md:text-lg text-base">
                    <h3 class="text-center text-2xl">Today</h3>
                    <div class="flex justify-center items-center gap-3">
                        <img :src="weather?.iconUrl" alt="" width="90" />
                        <p class="text-9xl font-small">{{ weather?.temperature }}</p>
                    </div>
                    <p class="text-2xl font-small">{{ weather?.description }}</p>
                    <p class="text-2xl font-small">{{ weather?.name }}</p>
                    <p class="text-2xl font-small">21 Oct 2019</p>
                    <p class="text-2xl font-small">
                        <span>Feels like {{ weather?.feelsLike }} </span>| <span>Sunset {{ weather?.sunset }}</span>
                    </p>
                </div>
            </div>

            <div class="rounded-xl flex flex-col gap-4 text-white">
                <div class="bg-[#b8b1a1] md:px-6 px-2 rounded-xl py-3 w-fit text-xs">
                    <div class="flex gap-5 border-b-2 pb-3">
                        <div>
                            <p>Now</p>
                            <span>25</span>
                        </div>
                        <div>
                            <p class="text-nowrap">2 AM</p>
                            <span>25</span>
                        </div>
                        <div>
                            <p class="text-nowrap">3 AM</p>
                            <span>25</span>
                        </div>
                        <div>
                            <p class="text-nowrap">4 AM</p>
                            <span>25</span>
                        </div>
                        <div>
                            <p class="text-nowrap">5 AM</p>
                            <span>25</span>
                        </div>
                        <div>
                            <p class="text-nowrap">Now</p>
                            <span>25</span>
                        </div>
                    </div>
                    <div class="flex gap-5 pt-3">
                        <div>
                            <p class="text-nowrap">Now</p>
                            <span>25</span>
                        </div>
                        <div>
                            <p class="text-nowrap">2 AM</p>
                            <span>25</span>
                        </div>
                        <div>
                            <p class="text-nowrap">3 AM</p>
                            <span>25</span>
                        </div>
                        <div>
                            <p class="text-nowrap">4 AM</p>
                            <span>25</span>
                        </div>
                        <div>
                            <p class="text-nowrap">5 AM</p>
                            <span>25</span>
                        </div>
                        <div>
                            <p class="text-nowrap">Now</p>
                            <span>25</span>
                        </div>
                    </div>
                </div>
                <div class="flex flex-col gap-3 w-[80%]">
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
import { ref, watchEffect } from 'vue';
import axios from 'axios';

// Define interface for weather data
interface WeatherData {
    temperature: number;
    feelsLike: number;
    humidity: number;
    description: string;
    icon: string;
    iconUrl: string;
    name: string;
    sunset: string;
}

// Define props
const props = defineProps({
    location: String
});

const location = props.location;
const weather = ref<WeatherData | null>(null);
const forecast = ref<any>(null);

const loading = ref(true);
const error = ref<any>(null);
const API_KEY = 'b9a55f097bb397041d9eb9ffb66171bd'

watchEffect(() => {
    async function fetchWeather() {
        loading.value = true;
        try {
            const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}&units=metric`);
            const data = response.data;
            // console.log(data);
            weather.value = {
                temperature: Math.round(data.main.temp),
                feelsLike: Math.round(data.main.feels_like),
                humidity: data.main.humidity,
                description: data.weather[0].description,
                icon: data.weather[0].icon,
                iconUrl: `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`,
                name: data.name,
                sunset: new Date(data.sys.sunset * 1000).toLocaleTimeString('en-US', {
                    hour: '2-digit',
                    minute: '2-digit',
                })
            };
        } catch (err) {
            error.value = 'Failed to fetch weather data';
        }
        loading.value = false;
    }

    fetchWeather();

    async function fetchForecast() {
        loading.value = true;
        try {
            const response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${API_KEY}&units=metric`);
            const data = response.data.list;
            console.log(data);
            forecast.value = data.map((item: any) => ({
                date: new Date(item.dt * 1000).toLocaleDateString(),
                description: item.weather[0].description,
                temperature: item.main.temp
            }));
        } catch (err) {
            error.value = 'Failed to fetch weather data';
        }
        loading.value = false;
    }

    fetchForecast();
});

</script>