import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import { LinearGaugePlugin } from '@syncfusion/ej2-vue-lineargauge'

const PROD = false

Vue.config.productionTip = false
Vue.prototype.$socketPath = (PROD ? 'https://ip' : 'http://localhost:3000')

Vue.use(LinearGaugePlugin)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
