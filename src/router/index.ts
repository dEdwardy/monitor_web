import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import ELayout from '@/components/ELayout.vue'

const routes: Array<RouteRecordRaw> = [
    {
        path: '/login',
        name: 'Login',
        meta: {
            title: '登录',
            requireAuth: false,
        },
        component: () => import('@/views/LoginView.vue'),
    },
    {
        path: '/',
        component: ELayout,
        redirect: 'index',
        children: [
            {
                path: 'index',
                name: 'Index',
                meta: {
                    title: '首页',
                    requireAuth: true,
                },
                component: () => import('@/views/HomeView.vue'),
            },
        ],
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})
export default router
