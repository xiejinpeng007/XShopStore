import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import routers from './routers'

import { Tabbar, TabbarItem, Search, SwipeCell, Button, Stepper, Checkbox, Field, Cell, Toast } from 'vant';

// Vue.config.productionTip = false

Vue.use(VueRouter).use(Tabbar).use(TabbarItem).use(Search).use(SwipeCell).use(Button).use(Stepper)
  .use(Checkbox).use(Field).use(Cell).use(Toast);

const router = new VueRouter({
  routes: routers
})

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
