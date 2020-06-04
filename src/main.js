import Vue from 'vue'
import App from './App'
import router from '@/router';
import '@/assets/css/global.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)
// import less from 'less'
// Vue.use(less)
import axios from 'axios'
// axios.default.baseURL="http://127.0.0.1:8888/api/private/v1/"
Vue.prototype.$axios=axios
Vue.config.eproductionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  // component:{App},
  router
})
