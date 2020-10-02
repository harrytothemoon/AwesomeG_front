import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import VueSocketIO from 'vue-socket.io'
import Viewer from 'v-viewer'
import 'viewerjs/dist/viewer.css'

Vue.use(Viewer)

library.add(faPencilAlt, faTrashAlt);
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.use(new VueSocketIO({
  debug: true,
  connection: 'https://young-hollows-22995.herokuapp.com',
}))

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
