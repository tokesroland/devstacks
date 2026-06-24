<script setup lang="ts">
import { useRoute } from 'vue-router';

const route = useRoute();
</script>

<template>
    <div class="p-6">
        <h1 class="text-2xl font-bold mb-4">Skill részletek</h1>
        <p class="text-gray-500">Skill ID: {{ route.params.id }}</p>
    </div>
</template>
