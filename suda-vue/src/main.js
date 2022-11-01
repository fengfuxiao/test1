import Vue from 'vue'
import App from './App.vue'
import router from "./router/index"
import store from "./store/index"
import "./plugin/element"
import "font-awesome/css/font-awesome.min.css"
import ECharts from 'vue-echarts'
import "echarts";


Vue.config.productionTip = false
// 全局注册组件（也可以使用局部注册）
Vue.component('v-chart', ECharts)

new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app')