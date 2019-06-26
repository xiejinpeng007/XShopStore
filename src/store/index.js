import Vue from 'vue';
import Vuex from 'vuex';
import token from './modules/token';
import cart from './modules/cart';

Vue.use(Vuex)


export default new Vuex.Store({
    modules: {
        token,
        cart
    },
    strict: process.env.NODE_ENV !== 'production'
})