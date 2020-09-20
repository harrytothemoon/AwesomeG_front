import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons'
import VueSocketIO from 'vue-socket.io'

library.add(faPencilAlt);
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.use(new VueSocketIO({
  debug: true,
  connection: 'https://young-hollows-22995.herokuapp.com',
  // vuex: {
  //   store,
  //   actionPrefix: 'SOCKET_', //为vuex设置的两个前缀
  //   mutationPrefix: 'SOCKET_'
  // },
  // options: { path: "/my-app/" } //Optional options
}))

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
