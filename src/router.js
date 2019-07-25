import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import AddAppointment from './views/AddAppointment.vue'
import PackageStation from './views/PackageStation.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/addAppointment',
      name: 'addAppointment',
      component: AddAppointment
    },
    {
      path: '/packageStation',
      name: 'packageStation',
      component: PackageStation
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})
