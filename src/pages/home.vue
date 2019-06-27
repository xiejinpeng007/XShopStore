<template>
  <div id="home">
    <h1>小卖部</h1>
    <!-- <qrcode-stream @decode="onDecode"></qrcode-stream> -->
    <van-button class="qr-scan" plain icon="scan" @click="onQrClick" size="small" :round="true">扫一扫</van-button>
    <van-search class="search" placeholder="请输入要搜索的商品" v-model="keyword" shape="round"/>
    <li
      class="goods-item"
      v-for="(item,index) in filteredItems"
      :style="{'-webkit-animation' : 'fade-in'+' '+ (index*0.2<3 ? (index*0.2) : 0) +'s',
               'animation' : 'fade-in'+' '+ (index*0.2<3 ? (index*0.2) : 0) +'s'}"
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
import store from "@/simplestore.js";
import { mapGetters, mapActions, mapState } from "vuex";

export default {
  name: "home",
  components: {},
  data() {
    return {
      keyword: null,
      goodsItems: null
    };
  },
  computed: {
    ...mapState("token", ["cartGoodsItems"]),
    filteredItems() {
      return this.keyword == null || this.keyword == ""
        ? this.goodsItems
        : this.goodsItems.filter(it => it.name.includes(this.keyword));
    }
  },
  created() {
    this.requestGoods();
  },
  mounted() {},
  activated() {
    const qrCode = store.store.getAndClearQrCode();
    if (qrCode != null) {
      this.keyword = this.goodsItems.find(it => it.barCode == qrCode).name;
      this.onSearch();
    }
  },
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
      this.$store.commit(
        "cart/addItem2Cart",

        this.filteredItems[index]
      );
    },
    onQrClick() {
      this.$router.push("/qrscan");
    }
  }
};
</script>

<style>
#home {
  padding-bottom: 8vh;
  background-size: 100% 100%;
  width: 100%;
  /* height: 100%; */
  /* overflow: scroll; */
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}

.qr-scan {
  align-content: center;
  height: 5vh;
  width: 92%;
  margin-left: 4%;
  margin-right: 4%;
  font-size: 16px;
}

.search {
  background-color: white;
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

