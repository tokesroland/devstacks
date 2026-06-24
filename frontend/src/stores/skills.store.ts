import { defineStore } from 'pinia';
import { api } from '../composables/api';

export interface Skill {
    id: string;
    canonical_name: string;
    category: string;
    aliases: string[];
    parent: Skill | null;
}

export const useSkillsStore = defineStore('skills', {
    state: () => ({
        skills: [] as Skill[],
    }),
    actions: {
        async fetchSkills(params: { category?: string; search?: string } = {}) {
            const { data } = await api.get('/skills', { params });
            this.skills = data.data;
        },
    },
});
