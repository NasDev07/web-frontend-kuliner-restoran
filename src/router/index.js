import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Food from '@/views/Food'
import FoodDetail from '../views/FoodDetail'
import Keranjang from '../views/Keranjang'
import PesananSuccess from '../views/PesananSuccess'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/food',
    name: 'Food',
    component: Food
  },
  {
    path: '/food/:id',
    name: 'FoodDetail',
    component: FoodDetail
  },
  {
    path: '/keranjang',
    name: 'Keranjang',
    component: Keranjang
  },
  {
    path: '/pesanan-success',
    name: 'PesananSucces',
    component: PesananSuccess
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
