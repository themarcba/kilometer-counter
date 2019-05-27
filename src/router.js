import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from './views/Dashboard.vue'
import Login from './views/Login.vue'
import Signup from './views/Signup.vue'

// Firebase
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

Vue.use(Router)

let router =  new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'dashboard',
            component: Dashboard,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/login',
            name: 'Login',
            component: Login
        },
        {
            path: '/signup',
            name: 'Signup',
            component: Signup
        }
    ]
})

router.beforeEach((to, from, next) => {
    let requiresAuth = to.matched.some(record => record.meta.requiresAuth)
    firebase.auth().onAuthStateChanged((user) => {                
        if (requiresAuth && !user) next('login')
        else if (!requiresAuth && user) next('/')
        else next()
    })
})

export default router;