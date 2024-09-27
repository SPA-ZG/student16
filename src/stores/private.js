import { defineStore } from 'pinia';

export const usePrivateStore = defineStore('private', {
    state: () => ({
        landingUrl: '/',
    }),
    actions: {
        setLandingUrl(url) {
            this.landingUrl = url;
        },
    },
});
