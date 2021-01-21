import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
Vue.use(VueRouter)
const routes = [
    {
        path: '/',
        name: 'home',
        component: Home
    }
]
let router = new VueRouter({
    routes
})
export default router