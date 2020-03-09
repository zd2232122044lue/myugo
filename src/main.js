import Vue from 'vue'
import App from './App'

// //vue插件用法一
// import request from '@/utils/request.js'
// const plugin = request({})
// Vue.use(plugin)

// //vue插件用法二
import MyPlugin from '@/utils/request.js'
Vue.use(MyPlugin)

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
  ...App
})
app.$mount()
