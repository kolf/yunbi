import Vue from 'vue'
import VeeValidate from 'vee-validate'
import Notifications from 'vue-notification'
import App from './App.vue'

const validateConfig = {
  errorBagName: 'errors', 
  delay: 0,
  locale: 'zh_CN',
  messages: null,
  strict: true
}

Vue.use(VeeValidate, validateConfig)
Vue.use(Notifications)

new Vue({
  el: '#app',
  render: h => h(App)
})
