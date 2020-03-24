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
