import Vue from 'vue'
import App from './App.vue'

// Multi-page
import VueRouter from 'vue-router'
Vue.use(VueRouter)

import Home from "./pages/Home.vue"
import Game from "./pages/Game.vue"

const routes = [
  { path: '/', component: Home },
  { path: '/game', component: Game },
  { path: '*', redirect: '/'},
]

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
