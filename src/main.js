import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Datetime from 'vue-datetime';

axios.defaults.baseURL = process.env.VUE_APP_BASE_URL
Vue.config.productionTip = false

Vue.use(Datetime);
Vue.use(VueAxios, axios)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
