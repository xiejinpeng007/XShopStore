<template>
  <div id="order">
    <h1>结算</h1>
    <div v-if="!orderPaied" style="height:auto">
      <div class="order-item" v-for="item in goodsOrder" v-bind:key="item.barCode">
        <label>{{item.name}}</label>
        <div>
          <label>{{item.quantity}} x</label>
          <label>{{item.salePrice}}元</label>
        </div>
      </div>
      <button class="login-button bg-gradual-orange" @click="onPay">支付 {{totalPrice}}元</button>
    </div>
    <div v-else>
      <button class="login-button bg-gradual-orange" @click="onBackCart">返回购物车</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import store from "@/store.js";
import cookieutil from "@/utils/cookieutil.js";

export default {
  name: "order",
  data() {
    return {
      goodsOrder: store.store.orderGoodsItems,
      totalPrice: store.store.getTotalPrice(),
      orderPaied: false
    };
  },
  created() {},
  methods: {
    onPay() {
      const cart = this.goodsOrder
        .map(it => it.barCode + "," + it.quantity)
        .join(";")
        .toString();
      const params = new URLSearchParams();
      params.append("cart", cart);
      params.append("token", cookieutil.getCookie("token"));
      axios
        .post("/api_payManyGoods", params)
        .then(response => {
          console.log(response.data);
          if (response.data.status == "OK") {
            store.store.clearOrderAndRemoveFromCart();
            this.orderPaied = true;
          } else {
            this.$toast("支付失败，请检查网络");
          }
        })
        .catch(error => console.log(error));
    },
    onBackCart() {}
  }
};
</script>

<style>
#order {
  background-color: #f8f8f8;
  overflow: hidden;
  height: 100%;
  padding-bottom: 8vh;
  }
.order-item {
  align-items: center;
  align-content: center;
  padding-right: 5%;
  padding-left: 5%;
  background-color: white;
  height: 7vh;
  display: flex;
  justify-content: space-between;
}
</style>

