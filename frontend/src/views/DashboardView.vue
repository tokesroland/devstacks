<script setup lang="ts">
import { onMounted } from 'vue';
import { useDashboardStore } from '../stores/dashboard.store';

const dashboard = useDashboardStore();

onMounted(() => {
    dashboard.fetchTopSkills();
});
</script>

<template>
    <div class="p-6">
        <h1 class="text-2xl font-bold mb-4">Skill Dashboard</h1>
        <div v-for="(skills, category) in dashboard.categories" :key="category" class="mb-6">
            <h2 class="text-lg font-semibold capitalize">{{ category }}</h2>
            <ul>
                <li v-for="skill in skills as any[]" :key="skill.skill">
                    {{ skill.rank }}. {{ skill.skill }} — {{ skill.job_count_30d }} hirdetés
                </li>
            </ul>
        </div>
    </div>
</template>
