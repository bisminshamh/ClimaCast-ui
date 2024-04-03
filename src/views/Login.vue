<script setup lang="ts">
import AuthForm from '@/components/Auth.vue';

const handleLogin = () => {
    console.log('Login');
};
</script>
<template>
    <auth-form title="Sign in" button-label="Sign in" @submit="handleLogin" />
</template>
