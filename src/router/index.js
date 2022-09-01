import {createRouter, createWebHistory} from 'vue-router'
import {useAuthStore} from "@/store/auth";
import HomeView from '../views/HomeView.vue'


const routes = [
    {
        path: '/',
        name: 'home',
        component: HomeView,
        meta: {
            layout: 'MainLayout',
            auth: true
        }
    },
    {
        path: '/help',
        name: 'help',
        component: () => import('../views/HelpView.vue'),
        meta: {
            layout: 'MainLayout',
            auth: true
        }
    },
    {
        path: '/request/:id',
        name: 'request',
        component: () => import('../views/RequestView.vue'),
        meta: {
            layout: 'MainLayout',
            auth: true
        },
        props: true
    },
    {
        path: '/auth',
        name: 'auth',
        component: () => import('../views/AuthView.vue'),
        meta: {
            layout: 'AuthLayout'
        }
    },
    {
        path: '/register',
        name: 'register',
        component: () => import('../views/RegisterView.vue'),
        meta: {
            layout: 'AuthLayout'
        }
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
    linkExactActiveClass: 'active',
    linkActiveClass: 'active'
})

router.beforeEach((to, from, next) => {
    const auth = to.meta.auth
    const authStore = useAuthStore()
    const isVisited = localStorage.getItem('visited') || false

    if (auth && authStore.isAuth) {
        next()
    } else if (auth && !authStore.isAuth && !isVisited) {
        next('/auth')
    } else if (auth && !authStore.isAuth) {
        next('/auth?errMsg=auth')
    } else if (!auth && authStore.isAuth) {
        next('/')
    } else {
        next()
    }
})

export default router
