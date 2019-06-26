import { isUndefined } from "util";

const store = {
    cartGoodsItems: [],
    orderGoodsItems: [],
    token: null,
    tempQrCode: null,

    saveToken(token) {
        this.token = token
    },

    addItem2Cart(item) {
        item.quantity = 1;
        item.checked = true;
        var index = this.cartGoodsItems.findIndex(it => it.barCode == item.barCode)
        console.log(index)
        if (index === -1) this.cartGoodsItems.push(item)
        else if (this.cartGoodsItems[index].quantity < this.cartGoodsItems[index].count)
            this.cartGoodsItems[index].quantity++
    },

    removeItemFromCart(barCode) {
        this.cartGoodsItems = this.cartGoodsItems.filter(item => item.barCode != barCode)
    },

    addItem2Order() {
        this.orderGoodsItems = this.cartGoodsItems.filter(it => it.checked)
    },

    clearOrderAndRemoveFromCart() {
        this.orderGoodsItems = [];
        this.cartGoodsItems = this.cartGoodsItems.filter(it => !it.checked);
    },
    getTotalPrice() {
        return this.cartGoodsItems
            .filter(it => it.checked == true)
            .reduce(
                (pre, cur, curIndex, arr) => pre + cur.salePrice * cur.quantity,
                0
            )
            .toFixed(1);
    },
    saveQrCode(qrCode) {
        this.tempQrCode = qrCode;
    },
    getAndClearQrCode() {
        const qrCode = this.tempQrCode;
        this.tempQrCode = null;
        return qrCode;
    }
}

export default { store }