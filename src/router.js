import {createRouter, createWebHistory} from 'vue-router'
import Home from './views/Home.vue'
import Algoritmos from './views/Algoritmos.vue'
import Graphos from './views/Graphos.vue'

const routes = [
    {path: '/', component: Home},
    {path: '/algoritmos', component: Algoritmos},
    {path: '/grafos', component: Graphos},
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router