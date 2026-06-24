import { defineStore } from 'pinia';
import { api } from '../composables/api';

export const useDashboardStore = defineStore('dashboard', {
    state: () => ({
        categories: {} as Record<string, unknown[]>,
        generatedAt: null as string | null,
    }),
    actions: {
        async fetchTopSkills() {
            const { data } = await api.get('/dashboard/top-skills');
            this.categories = data.categories;
            this.generatedAt = data.generated_at;
        },
    },
});
