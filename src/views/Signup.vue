<script setup lang="ts">
import AuthForm from '@/components/Auth.vue';

const handleSignup = () => {
    // Implement your login logic here
    console.log('Login');
};
</script>
<template>
    <auth-form title="Sign up" button-label="Sign up" @submit="handleSignup" />
</template>
