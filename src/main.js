import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import axios from 'axios'
import Home from './pages/Home.vue'
import keycloak from '@dsb-norge/vue-keycloak-js';

const routers = [
  { path: '/', component: Home },
]
const router = new VueRouter({
  routes: routers
})

axios.interceptors.request.use(function(config) {
  config.headers.Authorization = `Bearer ${Vue.prototype.$keycloak.token}`
  return config;
}, function(error) {
  return Promise.reject(error);
});

Vue.use(VueRouter)
Vue.prototype.$http = axios
Vue.config.productionTip = false
let url = window.location.pathname
let urls = url.split('/')
Vue.use(keycloak, {
  init: {
    onLoad: 'login-required'
  },
  config: {
    url: 'http://authing.wangrujian.com/auth',
    realm: urls[2],
    clientId: 'lowcode-platform-console'
  },
  onReady: (keycloak) => {
    //获取用户的信息
    keycloak.loadUserProfile().success((data) => {
      console.log(data);
    });
    new Vue({
      router,
      render: h => h(App),
    }).$mount('#app')
  }
});

