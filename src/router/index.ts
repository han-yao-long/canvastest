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
  },
  {
    path: '/3-1',
    name: 'canvas3',
    component: () => import('../views/3/index.vue'),
  },
  {
    path: '/3-2',
    name: "canvas3-1",
    component: () => import('../views/3/first.vue')
  },
  {
    path: '/3-3',
    name: "canvas3-1",
    component: () => import('../views/3/secend.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
