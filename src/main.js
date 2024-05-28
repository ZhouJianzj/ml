import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import axios from 'axios';


// 创建 Axios 实例并进行一些全局配置
const axiosInstance = axios.create({
  baseURL: 'http://localhost:8008', // 设置基础 URL
  timeout: 5000, // 设置超时时间
  headers: {
    'Content-Type': 'application/json', // 设置请求头
  }
});


// 将 Axios 实例挂载到 Vue 原型上，这样在组件中就可以通过 this.$http 使用 Axios
Vue.prototype.$http = axiosInstance;
new Vue({
  render: h => h(App)
}).$mount('#app')
