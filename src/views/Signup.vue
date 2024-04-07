<script setup lang="ts">
/**
 * Vue component script for handling user signup functionality.
 * @module SignupHandler
 * @category Components
 */

import AuthForm from '@/components/Auth.vue';
import { useStore } from 'vuex';

// Initialize Vuex store
const store = useStore();

/**
 * Function to handle user signup.
 * @param {Object} credentials - User signup credentials.
 * @param {string} credentials.email - User email address.
 * @param {string} credentials.password - User password.
 */
const handleSignup = ({ email, password }: { email: string, password: string }) => {
    store.dispatch('auth/REGISTER', { email, password });
};
</script>


<template>
    <auth-form title="Sign up" button-label="Sign up" @submit="handleSignup" />
</template>
