import Vue from 'vue';
import App from './App.vue';
import VueRouter from 'vue-router';
import store from './store';
import router from './router';

import { Tabbar, TabbarItem, Search, SwipeCell, Button, Stepper, Checkbox, Field, Cell, Toast, Step, Steps, Icon } from 'vant';

Vue.config.productionTip = false

Vue.use(VueRouter).use(Tabbar).use(TabbarItem).use(Search).use(SwipeCell).use(Button).use(Stepper)
  .use(Checkbox).use(Field).use(Cell).use(Toast).use(Step).use(Steps).use(Icon);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
