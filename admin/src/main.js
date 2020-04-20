// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

// 引入自定义组件和ui库
import '@/public/js/common_components.js'

//  全局引入公共样式
import "@/public/css/reset.css"

// 全局引入axios请求方法
import axios from '@/public/js/axiosCommon.js'
Vue.prototype.$axios = axios.http

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
