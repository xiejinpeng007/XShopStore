<template>
  <div id="app">
    <keep-alive :include="['home','cart','my']">
      <router-view/>
    </keep-alive>
    <van-tabbar class="tabbar" v-model="active" active-color="#f77938">
      <van-tabbar-item icon="home-o" to="/">首页</van-tabbar-item>
      <van-tabbar-item icon="shopping-cart-o" to="/cart" :info="cartGoodsItemsNum">购物车</van-tabbar-item>
      <van-tabbar-item icon="user-o" to="/my">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import axios from "axios";
import api from "@/utils/api.js";
import { mapGetters, mapActions, mapState } from "vuex";

export default {
  name: "app",
  data() {
    return {
      active: 0
    };
  },
  computed: {
    ...mapGetters("cart", ["cartGoodsItemsLength"]),
    cartGoodsItemsNum() {
      return this.cartGoodsItemsLength > 0 ? this.cartGoodsItemsLength : null;
    }
  },
  created() {
    //init Axios
    if (process.env.NODE_ENV !== "development")
      axios.defaults.baseURL = api.baseURL;
    axios.defaults.headers.post["Content-Type"] =
      "application/x-www-form-urlencoded";
  }
};
</script>

<style>
html,
body {
  height: 100%;
  overflow-x: hidden;
}
#app {
  height: 100%;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: flex;
  flex-direction: column;
}

.router-view {
  width: 100%;
  height: 92vh;
}

.tabbar {
  height: 8vh;
}

@keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@-webkit-keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
