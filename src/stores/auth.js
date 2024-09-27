import { defineStore } from "pinia";
import { usePrivateStore } from './private';

export const useAuthStore = defineStore("auth", {
    state: () => ({
        user: {
            userId: null,
            userName: null,
        },
    }),
    getters: {
        isAuthenticated: (state) => !!state.user.userId,
        username: (state) => state.user.userName,
        landingUrl: () => usePrivateStore().landingUrl,
    },
    actions: {
        setUser({ userId, userName }) {
            this.user = {userId, userName};
            localStorage.setItem("user", JSON.stringify(this.user));
        },
        setLandingUrl(url) {
            usePrivateStore().setLandingUrl(url);
        },
    },
});