import Vue from 'vue'
import App from './App.vue'
import router from './services/router';

new Vue({
  el: '#app',
  template: '<App/>',
  components: { App },
  router
});