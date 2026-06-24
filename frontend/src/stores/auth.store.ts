import { defineStore } from 'pinia';
import { api } from '../composables/api';

export const useAuthStore = defineStore('auth', {
    state: () => ({
        token: localStorage.getItem('auth_token') as string | null,
        email: null as string | null,
    }),
    actions: {
        async login(email: string, password: string) {
            const { data } = await api.post('/auth/login', { email, password });
            this.token = data.token;
            this.email = email;
            localStorage.setItem('auth_token', data.token);
        },
        logout() {
            this.token = null;
            this.email = null;
            localStorage.removeItem('auth_token');
        },
    },
});
