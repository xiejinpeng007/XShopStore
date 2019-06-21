<template>
  <div id="home">
    <h1>小卖部</h1>
    <!-- <qrcode-stream @decode="onDecode"></qrcode-stream> -->
    <van-search
      class="search"
      placeholder="请输入要搜索的商品"
      v-model="keyword"
      @search="onSearch"
      shape="round"
    />
    <li
      class="goods-item"
      v-for="(item,index) in (filteredItems?filteredItems:goodsItems)"
      :style="{'-webkit-animation' : 'fade-in'+' '+ (index*0.2<3 ? (index*0.2) : 3) +'s',
               'animation' : 'fade-in'+' '+ (index*0.2<3 ? (index*0.2) : 3) +'s'}"
      :key="item.barCode"
      @click="onItemClick(index)"
    >
      <label class="item-name">{{item.name}}</label>
      <label class="item-price">{{item.salePrice}}元</label>
    </li>
  </div>
</template>

<script>
import axios from "axios";
import store from "@/store.js";
import { QrcodeStream, QrcodeDropZone, QrcodeCapture } from "vue-qrcode-reader";
// var store = require('@/store');

export default {
  name: "home",
  components: {
    QrcodeStream
  },
  data() {
    return {
      aaa: true,
      keyword: null,
      goodsItems: null,
      filteredItems: null
    };
  },
  created() {
    this.requestGoods();
  },
  mounted() {},
  methods: {
    requestGoods() {
      axios
        .post("/api_getAllGoods")
        .then(response => {
          // eslint-disable-next-line
          console.log(response.data);
          this.goodsItems = response.data.filter(it => it.count > 0).reverse();
        })
        .catch(error => {
          // eslint-disable-next-line
          console.log(error);
        });
    },
    onItemClick(index) {
      this.$toast("已添加到购物车");
      //添加到全局 store 中
      store.store.addItem2Cart(this.goodsItems[index]);
      // eslint-disable-next-line
      console.log(store);
    },
    onSearch() {
      this.filteredItems = this.goodsItems.filter(it =>
        it.name.includes(this.keyword)
      );
    },
    onDecode(decodedString) {
      console.log(decodedString);
    }
  }
};
</script>

<style>
#home {
  padding-bottom: 8vh;
  background-size: 100% 100%;
  width: 100%;
  height: 100%;
  /* overflow: scroll; */
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}

.search {
  position: -webkit-sticky; /* Safari */
  position: sticky;
  top: 0;
}

.goods-item {
  max-height: 50px;
  min-height: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 80%;
  padding-left: 10%;
  padding-right: 10%;
  height: 10vw;
  -webkit-transition: background-color 0.2s, 1s; /* Safari */
  transition: background-color 0.2s, 1s;
}

/* .goods-item:hover {
  background-color: #e7e7e7;
} */

.goods-item:active {
  background-color: #e7e7e7;
}

.item-name {
  margin-right: 5%;
}
.item-price {
  white-space: nowrap;
}
</style>

