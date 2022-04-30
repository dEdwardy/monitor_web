import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import MLayout from '@/components/MLayout.vue'

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
        component: MLayout,
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
            {
                path: 'user-manage',
                name: 'user-manage',
                meta: {
                    title: '用户管理',
                    requireAuth: true,
                },
                component: () => import('@/views/UserManage.vue'),
            },
            {
                path: 'project-manage',
                name: 'project-manage',
                meta: {
                    title: '项目管理',
                    requireAuth: true,
                },
                component: () => import('@/views/ProjectManage.vue'),
            },
            {
                path: 'error-monitor',
                name: 'error-monitor',
                meta: {
                    title: '异常监控',
                    requireAuth: true,
                },
                component: () => import('@/views/ErrorMonitor.vue'),
            },
        ],
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})
export default router
