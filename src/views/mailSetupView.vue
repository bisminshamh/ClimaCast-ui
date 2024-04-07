<template>
    <div>
        <!-- Warning message for Sundays -->
        <div class="bg-yellow-200 text-yellow-800 p-4 mb-4 rounded">
            <p class="font-bold">Warning:</p>
            <p>Emails will be sent at 10:00 AM except Sundays.</p>
        </div>

        <h3 class="text-2xl font-bold text-left py-2">Profile Page</h3>

        <!-- Email input -->
        <div class="mb-4">
            <label for="email" class="block text-gray-700 text-sm font-bold mb-2">Emails:</label>
            <input v-model="emailComputed" type="text" id="email" name="email"
                placeholder="Enter email addresses separated by commas"
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
            <p v-if="!validateEmails()" class="text-red-500 text-xs italic">Please enter valid email addresses.</p>
        </div>

        <!-- Subject input -->
        <div class="mb-4">
            <label for="subject" class="block text-gray-700 text-sm font-bold mb-2">Subject:</label>
            <input v-model="subjectComputed" type="text" id="subject" name="subject" placeholder="Enter email subject"
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
            <p v-if="!subjectComputed" class="text-red-500 text-xs italic">Please enter a subject.</p>
        </div>

        <!-- Submit button -->
        <button @click="submitForm"
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Submit</button>
    </div>
</template>
<script setup lang="ts">
/**
 * Vue component script for handling email form functionality.
 * @module EmailFormHandler
 * @category Components
 */

import { computed, onMounted } from 'vue';
import { useStore } from 'vuex';

// Initialize Vuex store
const store = useStore();

/**
 * Computed property for getting and setting email addresses.
 * @type {Object}
 * @property {Function} get - Getter function to retrieve email addresses from Vuex store.
 * @property {Function} set - Setter function to update email addresses in Vuex store.
 */
const emailComputed = computed({
    get: () => (store.getters['weather/emailsSubject'].emails || []).join(','),
    set: (value: string) => {
        const emailArray = value.split(',').map(email => email.trim());
        store.commit("weather/SET_EMAIL", emailArray);
    }
});

/**
 * Computed property for getting and setting email subject.
 * @type {Object}
 * @property {Function} get - Getter function to retrieve email subject from Vuex store.
 * @property {Function} set - Setter function to update email subject in Vuex store.
 */
const subjectComputed = computed({
    get: () => store.getters['weather/emailsSubject'].subject,
    set: (value: string) => {
        store.commit("weather/SET_SUBJECT", value);
    }
});

// Fetch data and set the input fields
onMounted(() => {
    store.dispatch("weather/getEmailsSubjects");
});

/**
 * Function to validate email addresses.
 * @returns {boolean} - Returns true if all email addresses are valid, false otherwise.
 */
const validateEmails = () => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const emailArray = emailComputed.value.split(',');
    return emailArray.every(email => emailPattern.test(email.trim()));
};

/**
 * Function to validate form before submission.
 * @returns {boolean} - Returns true if form is valid, false otherwise.
 */
const validateForm = () => {
    return validateEmails() && !!subjectComputed.value;
};

/**
 * Function to process form data and dispatch action.
 */
const submitForm = () => {
    if (validateForm()) {
        const emailArray = emailComputed.value.split(',').map(email => email.trim());
        store.dispatch('weather/addMail', { emails: emailArray, subject: subjectComputed.value });
    } else {
        alert('Please fill out the form correctly.');
    }
};
</script>
