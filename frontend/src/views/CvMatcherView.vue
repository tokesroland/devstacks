<script setup lang="ts">
import { ref } from 'vue';
import { useCvStore } from '../stores/cv.store';

const cv = useCvStore();
const file = ref<File | null>(null);

function onFileChange(event: Event) {
    const target = event.target as HTMLInputElement;
    file.value = target.files?.[0] ?? null;
}

async function upload() {
    if (file.value) {
        await cv.upload(file.value);
    }
}
</script>

<template>
    <div class="p-6">
        <h1 class="text-2xl font-bold mb-4">CV Matcher</h1>
        <input type="file" accept=".pdf,.docx" @change="onFileChange" />
        <button class="ml-2 px-3 py-1 bg-blue-600 text-white rounded" @click="upload">Feltöltés</button>
        <p v-if="cv.status" class="mt-4">Státusz: {{ cv.status }}</p>
    </div>
</template>
