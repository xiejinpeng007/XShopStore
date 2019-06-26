import { Tabbar, TabbarItem, Search, SwipeCell, Button, Stepper, Checkbox, Field, Cell, Toast } from 'vant';

export default {
    install(Vue) {
        Vue.use(VueRouter).use(Tabbar).use(TabbarItem).use(Search).use(SwipeCell).use(Button).use(Stepper)
            .use(Checkbox).use(Field).use(Cell).use(Toast);
    }
}