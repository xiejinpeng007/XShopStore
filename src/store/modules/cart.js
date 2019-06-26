import Vue from 'vue';
import { stat } from 'fs';

export default {
    namespaced: true,
    state: {
        cartGoodsItems: [],
        tempQrCode: null,
    },

    getters: {
        checkedTotalPrice: state =>
            state.cartGoodsItems
                .filter(it => it.checked == true)
                .reduce((pre, cur) => pre + cur.salePrice * cur.quantity, 0)
                .toFixed(1)
        ,
        orderGoodsItems: state => state.cartGoodsItems.filter(it => it.checked)
        ,
        cartGoodsItemsLength: state => state.cartGoodsItems.length

    },
    mutations: {
        addItem2Cart(state, item) {
            item.quantity = 1;
            item.checked = true;
            var index = state.cartGoodsItems.findIndex(it => it.barCode == item.barCode)
            console.log(index)
            if (index === -1) state.cartGoodsItems.push(item)
            else if (state.cartGoodsItems[index].quantity < state.cartGoodsItems[index].count)
                state.cartGoodsItems[index].quantity++
        },
        removeItemFromCart: (state, barCode) =>
            state.cartGoodsItems = state.cartGoodsItems.filter(item => item.barCode != barCode)
        ,
        clearOrderAndRemoveFromCart: state =>
            state.cartGoodsItems = state.cartGoodsItems.filter(it => !it.checked)
        ,
        setCartAllChecked: (state, allChecked) =>
            state.cartGoodsItems = state.cartGoodsItems
                .map(it => {
                    it.checked = allChecked;
                    return it;
                })
        ,
        reverseCartItemChecked: (state, index) =>
            state.cartGoodsItems =
            state.cartGoodsItems.map((it, i) => {
                if (index == i)
                    it.checked = !it.checked
                return it
            })
        ,
        changeQuantity(state, { index, quantity }) {

            // Vue.set(state.cartGoodsItems, index,
            //     Object.assign({}, state.cartGoodsItems[index], { "quantity": quantity }))

            state.cartGoodsItems =
                state.cartGoodsItems.map((it, i) => {
                    if (index == i)
                        it.quantity = quantity
                    return it
                })

            console.log(state.cartGoodsItems[index])
        }

    },
    actions: {

    }



}