import Vue from 'vue'
import VueRouter from 'vue-router'
import store from "./store";
import Login from './components/Login.vue'
import Register from './components/Register.vue'
import Home from "./components/Home";

Vue.use(VueRouter)

let router = new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/home',
            name: 'home',
            component: Home,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/login',
            name: 'login',
            component: Login
        },
        {
            path: '/register',
            name: 'register',
            component: Register
        },
    ]

})


router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth && !store.getters.isLoggedIn))
        next()
    else next()
})

export default router