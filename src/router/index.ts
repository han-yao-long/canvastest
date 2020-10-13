import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/1',
    name: 'mulu',
    component: () => import('../views/1/index.vue')
  },
  {
    path: '/2',
    name: 'canvas',
    component: () => import('../views/2/index.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
