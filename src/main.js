import Vue from 'vue'
import App from './App'
import router from './router'
import iView from 'iview';
import './assets/less/index.less';
import echarts from 'echarts'
import img from './lib/img'
import utils from "./lib/utils";

/* 导入element-ui样式
*/
import 'element-ui/lib/theme-chalk/index.css'
/* element-ui所有组件
*/
import ElementUI from 'element-ui'
Vue.use(ElementUI)
Vue.prototype.$echarts = function (el) {
    return echarts.init(el, null, {renderer: 'svg'})
}
Vue.prototype.$images = img
Vue.config.productionTip = false;
Vue.use(iView);
Vue.use(utils)
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
