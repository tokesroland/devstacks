<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth.store';

const auth = useAuthStore();
const router = useRouter();
const email = ref('');
const password = ref('');

async function submit() {
    await auth.login(email.value, password.value);
    router.push('/');
}
</script>

<template>
    <div class="p-6 max-w-sm mx-auto">
        <h1 class="text-2xl font-bold mb-4">Bejelentkezés</h1>
        <form class="space-y-3" @submit.prevent="submit">
            <input v-model="email" type="email" placeholder="Email" class="w-full border rounded px-3 py-2" />
            <input v-model="password" type="password" placeholder="Jelszó" class="w-full border rounded px-3 py-2" />
            <button type="submit" class="w-full bg-blue-600 text-white rounded px-3 py-2">Belépés</button>
        </form>
    </div>
</template>
