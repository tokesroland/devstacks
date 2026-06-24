import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', name: 'dashboard', component: () => import('../views/DashboardView.vue') },
        { path: '/trends', name: 'trends', component: () => import('../views/TrendView.vue') },
        { path: '/cv-matcher', name: 'cv-matcher', component: () => import('../views/CvMatcherView.vue') },
        { path: '/alerts', name: 'alerts', component: () => import('../views/AlertsView.vue') },
        { path: '/skills/:id', name: 'skill-detail', component: () => import('../views/SkillDetailView.vue') },
        { path: '/login', name: 'login', component: () => import('../views/LoginView.vue') },
        { path: '/register', name: 'register', component: () => import('../views/RegisterView.vue') },
    ],
});

export default router;
