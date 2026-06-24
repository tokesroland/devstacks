<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
import AlertBell from './components/AlertBell.vue';
</script>

<template>
    <div class="min-h-screen bg-gray-50">
        <nav class="bg-white border-b px-6 py-3 flex items-center gap-4">
            <RouterLink to="/" class="font-bold">DevStacks</RouterLink>
            <RouterLink to="/trends">Trendek</RouterLink>
            <RouterLink to="/cv-matcher">CV Matcher</RouterLink>
            <RouterLink to="/alerts">Riasztások</RouterLink>
            <AlertBell class="ml-auto" />
        </nav>
        <RouterView />
    </div>
</template>
