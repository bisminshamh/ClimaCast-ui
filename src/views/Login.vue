<script setup lang="ts">
/**
 * Vue component script for handling login functionality.
 * @module LoginHandler
 * @category Components
 * @prop {Object} AuthForm - Vue component for authentication form.
 * @prop {Object} store - Vuex store instance.
 * @prop {Function} handleLogin - Function to handle user login.
 */
import AuthForm from '@/components/Auth.vue';
import { useStore } from 'vuex';

// Initialize Vuex store
const store = useStore();

/**
 * Function to handle user login.
 * @param {Object} credentials - User credentials for login.
 * @param {string} credentials.email - User email.
 * @param {string} credentials.password - User password.
 */
const handleLogin = ({ email, password }: { email: string, password: string }) => {
    store.dispatch('auth/LOGIN', { email, password });
};
</script>

<template>
    <auth-form title="Sign in" button-label="Sign in" @submit="handleLogin" />
</template>
