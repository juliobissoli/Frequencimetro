import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import App from './App.vue'
import router from './router'
import '@/assets/fonts/all.css'
import ToggleButton from 'vue-js-toggle-button'

Vue.config.productionTip = false
Vue.use(ToggleButton)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
