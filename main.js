import Vue from 'vue'
import App from './App'
import store from './store' 
import plugins from './plugins' 
import './permission'

import './static/font/iconxy.css';

import front from './mixins/front.js'
Vue.mixin(front)

import uView from '@/uni_modules/uview-ui'
Vue.use(uView)

Vue.use(plugins)

Vue.config.productionTip = false
Vue.prototype.$store = store

App.mpType = 'app'

const app = new Vue({
  ...App
})

app.$mount()
