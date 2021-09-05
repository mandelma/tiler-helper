import Vue from 'vue'
//import Router from 'vue-router'
import Router from 'vue-router'
import Main from '@/components/Main'
import Wall from '@/components/Wall'
import Floor from '@/components/Floor'
import Login from '@/components/Login'
import Register from '@/components/Register'
//import Login from '@/components/Login'



Vue.use(Router)

const router = new Router({
    mode: 'history',
    routes: [

        {
            path: '/',
            name: 'main-page',
            component: Main,
            props: true
        },
        {
            path: '/wall',
            name: 'wall',
            component: Wall,
            props: true
        },
        {
            path: '/floor',
            name: 'floor',
            component: Floor,
            props: true
        },
        {
            path: '/login',
            name: 'login',
            component: Login,
            props: true
        },
        {
            path: '/register',
            name: 'register',
            component: Register,
            props: true
        }

    ]

})
//router.replace({ path: '/', redirect: '/login' })
export default router

