<template>
    <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div class="max-w-md w-full space-y-8">
            <div>
                <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">{{ props.title }}</h2>
            </div>
            <div> <!-- Wrap the form in a div -->
                <form class="mt-8 space-y-6" @submit.prevent.stop="$emit('submit', { email, password })">
                    <input type="hidden" name="remember" value="true" />
                    <div class="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label for="email-address" class="sr-only">Email address</label>
                            <input id="email-address" name="email" type="email" autocomplete="email" required
                                class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Email address" v-model="email" />
                        </div>
                        <div>
                            <label for="password" class="sr-only">Password</label>
                            <input id="password" name="password" type="password" autocomplete="current-password"
                                required
                                class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Password" v-model="password" />
                        </div>
                    </div>

                    <div>
                        <button type="submit"
                            class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            {{ props.buttonLabel }}
                        </button>
                    </div>

                    <!-- Conditionally render the link to /signup -->
                    <!-- Show the link only if the buttonLabel prop is 'Sign in' -->
                    <template v-if="props.buttonLabel === 'Sign in'">
                        <div class="text-center">
                            <p class="mt-2 text-sm text-gray-600">
                                Don't have an account?
                                <router-link to="/signup" class="font-medium text-indigo-600 hover:text-indigo-500">
                                    Sign up
                                </router-link>
                            </p>
                        </div>
                    </template>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { defineProps, ref } from 'vue';

// Define props for the component
const props = defineProps({
    /**
     * The title to display.
     * @type {string}
     */
    title: String,

    /**
     * The label for the button.
     * @type {string}
     */
    buttonLabel: String
});

// Define reactive variables for email and password
/**
 * The email input field value.
 * @type {Ref<string>}
 */
const email = ref('');

/**
 * The password input field value.
 * @type {Ref<string>}
 */
const password = ref('');
</script>