import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Antd from 'ant-design-vue'
import ElementUI from 'element-ui'
import 'ant-design-vue/dist/antd.less'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import { baseURL } from './enviroment'

Vue.config.productionTip = false

Vue.use(Antd)
Vue.use(ElementUI)
Vue.prototype.$http = axios.create({
  baseURL
})

axios.defaults.withCredentials = true

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
