import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '@/components/Homepage'
import Login from '@/components/Login'
import AdminDashboard from '@/components/AdminDashboard'
import SingleSoldier from '@/components/SingleSoldier'
Vue.use(Router)

let router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'homepage',
            component: HomePage,
            meta: {
                title: 'Machina',
                requiresAuth:false
            }
        },
        {
            path: '/login',
            name: 'login',
            component: Login,
            meta: {
                requiresAuth:false,
                title: 'Machina | Login',

            }
        },
        {
            path: '/dashboard',
            name: 'dashboard',
            component: AdminDashboard,
            meta: {
                requiresAuth:true,
                title: 'Machina | Dasboard',

            }
        },
        {
            path: '/edit',
            name: 'edit',
            component: SingleSoldier,
            meta: {
                requiresAuth:false,
                title: 'Machina | Edit',

            }
        },

    ]
})


router.beforeEach((to, from, next) => {


    if(to.matched.some(record => record.meta.requiresAuth)) {
        let isAuthenticated= false;
        if (localStorage.getItem('token')) {
            isAuthenticated = true;}
        else{
            isAuthenticated= false;}
        if(isAuthenticated){
        next()        } else {

            next({
                path: '/login',
                params: { nextUrl: to.fullPath }
            })

        }
    } else {
        next()
    }
})
export default router