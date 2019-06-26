<template>
  <div id="cart">
    <h1>购物车</h1>
    <div class="cart-content">
      <van-swipe-cell
        class="swipe-cell"
        v-for="(item,index) in cartGoodsItems"
        :key="item.barCode"
        :right-width="60"
        :style="{'-webkit-animation' : 'fade-in'+' '+ (index*0.2<3?(index*0.2):3) +'s',
               'animation' : 'fade-in'+' '+ (index*0.2<3?(index*0.2):3) +'s'}"
      >
        <div class="cell-content">
          <van-checkbox
            style="flex-shrink:0"
            v-model="item.checked"
            checked-color="#F77938"
            @click="onCheckedChanged(index)"
          ></van-checkbox>
          <label style="max-width:50%">{{item.name}}</label>
          <van-stepper
            :value="item.quantity"
            integer
            :max="item.count"
            @change="v=>onStepChanged(index,v)"
          />
        </div>
        <van-button
          style="height:7vh"
          square
          slot="right"
          type="danger"
          text="删除"
          @click="onDelete(index)"
        />
      </van-swipe-cell>
    </div>
    <div class="bottom-layout van-hairline--top">
      <van-checkbox v-model="allChecked" @click="onAllCheckedChanged" checked-color="#F77938">全选</van-checkbox>
      <label>合计：{{checkedTotalPrice}}元</label>
      <button class="cal-btn bg-gradual-orange" v-on:click="onOrderClick">结算</button>
    </div>
  </div>
</template>

<script>
import cookieutil from "@/utils/cookieutil.js";
import { mapGetters, mapActions, mapState, mapMutations } from "vuex";
import { all } from "q";

export default {
  name: "cart",
  data() {
    return {
      allChecked: true
    };
  },
  computed: {
    ...mapState("cart", ["cartGoodsItems", "orderGoodsItems"]),
    ...mapGetters("cart", ["checkedTotalPrice"]),
    isAllChecked() {
      if (this.cartGoodsItems.length == 0) return false;
      else return this.cartGoodsItems.every(it => it.checked);
    }
  },
  watch: {
    isAllChecked(newValue) {
      this.allChecked = newValue;
    }
  },
  created() {
    // this.cartGoodsItems = store.store.cartGoodsItems;
    // eslint-disable-next-line
    console.log(this.cartGoodsItems);
  },
  mounted() {
    // this.refreshPageStatus();
    // this.addItem2Order();
  },
  activated() {
    // this.cartGoodsItems = store.store.cartGoodsItems;
    // this.refreshPageStatus();
  },
  methods: {
    ...mapMutations("cart", [
      "addItem2Order",
      "removeItemFromCart",
      "setCartAllChecked",
      "reverseCartItemChecked",
      "changeQuantity"
    ]),
    onDelete(index) {
      if (this.cartGoodsItems == null) return;
      this.removeItemFromCart(this.cartGoodsItems[index].barCode);
      this.refreshPageStatus();
      console.log(index);
    },
    onAllCheckedChanged(event) {
      console.log(event);
      this.setCartAllChecked(!this.allChecked);
      // this.calTotalPrice();
    },
    onCheckedChanged(index) {
      console.log("onCheckedChanged");
      this.reverseCartItemChecked(index);
      // this.refreshPageStatus();
    },
    refreshPageStatus() {
      // this.calTotalPrice();
      // this.calAllCheck();
    },
    calTotalPrice() {
      this.totoalPrice = this.cartGoodsItems
        .filter(it => it.checked == true)
        .reduce((pre, cur) => pre + cur.salePrice * cur.quantity, 0)
        .toFixed(1);
      store.store.addItem2Order();
    },
    // calAllCheck() {
    //   if (this.cartGoodsItems.length == 0) this.allChecked = false;
    //   else this.allChecked = this.cartGoodsItems.every(it => it.checked);
    // },
    //Listeners
    onOrderClick() {
      if (cookieutil.getCookie("token") == null) this.$toast("请登录");
      else if (this.checkedTotalPrice == 0) this.$toast("未选中商品");
      else this.$router.push("/order");
    },
    onStepChanged(index, quantity) {
      console.log(index + "    " + quantity);
      this.changeQuantity({ index, quantity });
      // this.calTotalPrice();
    }
  }
};
</script>

<style>
#cart {
  width: 100%;
  box-sizing: border-box;
  overflow: hidden;
  height: 100%;
  padding-bottom: 8vh;
  background-color: #f8f8f8;
  display: flex;
  flex-direction: column;
  top: 0;
}

div.cart-content {
  overflow: auto;
}

.swipe-cell {
  height: 7vh;
  width: 100%;
  background-color: white;
}

.cell-content {
  height: 7vh;
  align-items: center;
  padding-left: 5%;
  padding-right: 5%;
  display: flex;
  justify-content: space-between;
}

.bottom-layout {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 5%;
  position: absolute;
  bottom: 8vh;
  height: 8%;
  right: 0;
  left: 0;
  background-color: white;
}

.cal-btn {
  width: 30%;
  height: 100%;
  background-color: #f77938;
  font-size: 18px;
  font-weight: bold;
  vertical-align: middle;
  border: none;
}

.bg-gradual-orange {
  background-image: linear-gradient(45deg, #ff9700, #ed1c24);
  color: #fff;
}
</style>

