import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);

import routes from '../routes/web';

const router = new VueRouter({
  mode: 'history',
  routes // short for `routes: routes`
});

export default router;