import Vue from 'vue'
import App from './App.vue'

// parallax
import VueKinesis from 'vue-kinesis'
Vue.use(VueKinesis)
//---------

// Multi-page
// import VueRouter from 'vue-router'
// Vue.use(VueRouter)
//---------


Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')


