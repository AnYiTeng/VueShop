import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import Header from './components/Header/Header.vue'
import { Button } from 'mint-ui'

import './validate' 
import './mock/mock-server'
import store from './store/index'
import Star from './components/Star/Star'
import CartControl from './components/CartControl/CartControl.vue'

// 这句代码会显示你生产模式的消息  false去掉打印提示
Vue.config.productionTip = false

// 注册全局组件
Vue.component ('Header', Header)
Vue.component ('Star', Star)
Vue.component(Button.name, Button)
Vue.component('CartControl', CartControl)


new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
