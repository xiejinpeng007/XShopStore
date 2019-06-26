<template>
  <div id="order">
    <h1>结算</h1>
    <!-- <van-steps class="steps" :active="activeStep" active-color="#f77938">
      <van-step>选购</van-step>
      <van-step>下单</van-step>
      <van-step>确认付款</van-step>
      <van-step>交易完成</van-step>
    </van-steps>-->
    <div v-if="!orderPaied" style="height:auto">
      <div class="order-item" v-for="item in orderGoodsItems" v-bind:key="item.barCode">
        <label>{{item.name}}</label>
        <div>
          <label>{{item.quantity}} x {{item.salePrice}} 元</label>
        </div>
      </div>
      <button class="login-button bg-gradual-orange" @click="onPay">支付 {{totalPrice}}元</button>
    </div>
    <div v-else>
      <van-icon name="checked" size="“60”" color="#f77938"></van-icon>
      <label class="order-complete-text">购买成功！</label>
      <button class="login-button bg-gradual-orange" @click="onBackCart">返回购物车</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import cookieutil from "@/utils/cookieutil.js";
import { mapGetters, mapActions, mapState, mapMutations } from "vuex";

export default {
  name: "order",
  data() {
    return {
      activeStep: 2,
      orderPaied: false
    };
  },
  computed: {
    ...mapGetters("cart", {
      orderGoodsItems: "orderGoodsItems",
      totalPrice: "checkedTotalPrice"
    })
  },
  created() {},
  methods: {
    onPay() {
      const cart = this.orderGoodsItems
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
            this.$store.commit("cart/clearOrderAndRemoveFromCart");
            this.orderPaied = true;
          } else {
            this.$toast("支付失败，请检查网络");
          }
        })
        .catch(error => console.log(error));
    },
    onBackCart() {
      this.$router.go(-1);
    }
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

.order-complete-text {
  color: #f77938;
  font-size: 20px;
  font-weight: bold;
}
</style>

