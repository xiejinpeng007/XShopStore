import { homedir } from "os";
import Home from '@/pages/home.vue'
import Cart from '@/pages/cart.vue'
import My from '@/pages/my.vue'
import Order from '@/pages/order.vue'
import OrderHistory from '@/pages/orderhistory.vue'
import ChargeHisotory from '@/pages/chargehistory.vue'
import QrScan from '@/pages/qrscan'


const routes = [
    {
        path: '/',
        name: 'home',
        component: Home,
    },
    {
        path: '/cart',
        name: 'cart',
        component: Cart,
    },
    {
        path: '/my',
        name: 'my',
        component: My,
    },
    {
        path: '/order',
        name: 'order',
        component: Order,
    },
    {
        path: '/orderhistory',
        name: 'orderhistory',
        component: OrderHistory,
    },
    {
        path: '/chargehistory',
        name: 'chargehistory',
        component: ChargeHisotory,
    },
    {
        path:'/qrscan',
        name:'qrscan',
        component:QrScan,
    }

]

export default routes
