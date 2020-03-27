import Vue from 'vue'
import VueRouter from 'vue-router'
import Frequencimetro from '../views/Frequencimetro'
import FrequencimetroRouter from './frequencimetro'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Frequencimetro
  }
]
routes.push(FrequencimetroRouter)
const router = new VueRouter({
  routes
})

export default router



// import Vue from 'vue'
// import VueRouter from 'vue-router'
// import Auth from '../utils/auth'
// import Login from '../views/Login'
// import FrequencimetroRouter from './frequencimetro'


// Vue.use(VueRouter)

// const routes = [
//   {
//     path: '/login',
//     name: 'Login',
//     component: Login
//   }
// ]
// routes.push(FrequencimetroRouter)

// const router = new VueRouter({
//   mode: 'history',
//   base: process.env.BASE_URL,
//   linkExactActiveClass: 'active',
//   routes
// })

// router.beforeEach((to, from, next) => {
//   if (to.matched.some(record => record.meta.requiresAuth) && !Auth.loggedIn()) {
//     next({
//       path: '/login',
//       query: { redirect: to.fullPath }
//     })
//   } else if (to.matched.some(record => record.name === 'Login') && Auth.loggedIn()) {
//     next({ name: 'Campaign' })
//   } else {
//     next()
//   }
// })

// export default router
