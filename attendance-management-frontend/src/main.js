import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import '@/plugins/apexcharts'
import VJsoneditor from 'v-jsoneditor/src/index'
import Notifications from "vue-notification";

Vue.use(Notifications);
Vue.use(VJsoneditor)
Vue.config.productionTip = false

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
 