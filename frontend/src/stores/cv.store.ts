import { defineStore } from 'pinia';
import { api } from '../composables/api';

export const useCvStore = defineStore('cv', {
    state: () => ({
        jobId: null as string | null,
        status: null as string | null,
        marketCoveragePct: null as number | null,
        skillGaps: [] as unknown[],
    }),
    actions: {
        async upload(file: File) {
            const formData = new FormData();
            formData.append('cv_file', file);
            const { data } = await api.post('/cv/upload', formData);
            this.jobId = data.job_id;
            this.status = data.status;
        },
        async fetchMatch() {
            const { data } = await api.get('/cv/match');
            this.marketCoveragePct = data.market_coverage_pct;
            this.skillGaps = data.skill_gaps;
        },
    },
});
