import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import Header from './components/Header/Header.vue'

import store from './store/index'
import Star from './components/Star/Star'

// 这句代码会显示你生产模式的消息  false去掉打印提示
Vue.config.productionTip = false

Vue.component ('Header', Header)
Vue.component ('Star', Star)


new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
