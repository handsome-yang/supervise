import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '../public/lib/flexible'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import moment from "moment"
Vue.prototype.$moment = moment
Vue.use(ElementUI)
import echarts from 'echarts'
Vue.prototype.$echarts = echarts
Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
