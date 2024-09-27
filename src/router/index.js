import { createRouter, createWebHistory } from 'vue-router';
import LoginPage from '@/views/LoginPage.vue';
import TasksPage from '@/views/TasksPage';
import NotFoundPage from '@/views/NotFoundPage.vue';
import NewTask from '@/views/NewTask';
import {useAuthStore} from "@/stores/auth";

const routes = [
    {
        path: '/',
        name: 'LoginPage',
        component: LoginPage,
    },
    {
        path: '/tasks/:userId',
        name: 'TasksPage',
        component: TasksPage,
        props: true
    },
    {
        path: '/tasks/new',
        name: 'NewTask',
        component: NewTask,
    },
    {
        path: "/:catchAll(.*)*",
        name: "NotFound",
        component: NotFoundPage,
    },

];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

// Taken from: https: //jasonwatmore.com/post/2022/06/07/vue-3-redirect-to-login-page-if-unauthenticated
router.beforeEach(async (to) => {
    // redirect to login page if not logged in and trying to access a restricted page
    const publicPages = ["/"];
    const authRequired = !publicPages.includes(to.path);
    const auth = useAuthStore();

    const storedUser = localStorage.getItem("user");
    if (storedUser) {
        auth.setUser(JSON.parse(storedUser));
    }

    if (authRequired && !auth.isAuthenticated) {
        auth.setLandingUrl(to.fullPath);
        return "/";
    }
});

export default router;
