import Vue from 'vue'
import App from './App.vue'

// Multi-page
import VueRouter from 'vue-router'
Vue.use(VueRouter)

//import routes
import {routes} from '@/services/routes.js'

const router = new VueRouter({
  mode:'history',
  routes
})
//---------

// parallax
import VueKinesis from 'vue-kinesis'
Vue.use(VueKinesis)
//---------


Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
  }).$mount('#app')
