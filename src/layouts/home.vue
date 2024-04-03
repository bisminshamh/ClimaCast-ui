<script setup lang="ts">
import { RouterView } from 'vue-router'
import Sidebar from '@/components/Sidebar.vue';
import TopBar from '@/components/TopBar.vue';
</script>
<template>
    <div>

        <RouterView>
            <TopBar />

            <Sidebar />
        </RouterView>
    </div>
</template>