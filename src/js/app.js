import Vue from 'vue'
import App from './App.vue'
import router from './services/router';
let SocialSharing = require('vue-social-sharing');

Vue.use(SocialSharing);

new Vue({
  el: '#app',
  template: '<App/>',
  components: { App },
  router
});