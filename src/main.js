import Vue from 'vue'
import App from './App.vue'
import keycloak from '@dsb-norge/vue-keycloak-js';

Vue.config.productionTip = false
Vue.use(keycloak , {
    init: {
        onLoad: 'login-required'
    },
    config: {
        url: 'http://authing.wangrujian.com/auth',
        realm: 'yufu',
        clientId: 'lowcode-platform-console'
    },
    onReady: (keycloak) => {
                    //获取用户的信息
        keycloak.loadUserProfile().success((data) => {
            console.log(data);
        });
    }
});
new Vue({
  render: h => h(App),
}).$mount('#app')
