<template>
  <div id="orderhistory">
    <div class="orderhistory-content">
      <h1>历史订单</h1>
      <div v-for="item in orderhistoryItems" v-bind:key="item.barCode">
        <div class="order-i shadow-s" v-for="i in item.payGoods" v-bind:key="i.barCode">
          <label class="align-self-end">{{item.payTime}}</label>
          <div class="i-goodsdetail">
            <label style="flex-shrink:1">{{i.goodsData.name}}</label>
            <label style="  white-space: nowrap; margin-left:2%">单价：{{i.goodsData.salePrice}}元</label>
          </div>
          <label class="align-self-end">总价：{{toFixed1(i.spend)}}元</label>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import cookieutil from "@/utils/cookieutil.js";
import TimeUtil from "@/utils/TimeUtil.js";

export default {
  name: "orderhistory",
  data() {
    return {
      orderhistoryItems: [],
      sumSpend: 0
    };
  },
  created() {
    this.requestOrderHistory();
  },
  methods: {
    requestOrderHistory() {
      const startDate = new Date();
      const endDate = new Date();
      startDate.setDate(new Date().getDay() - 30);
      const start = this.date2String(startDate, "yyyy-MM-dd hh:mm");
      const end = this.date2String(endDate, "yyyy-MM-dd hh:mm");

      const token = cookieutil.getCookie("token");
      const params = new URLSearchParams();
      params.append("token", token);
      params.append("start", start);
      params.append("end", end);
      params.append("offset", 0);
      params.append("limit", 0);

      axios
        .post("/api_getPayHistory", params)
        .then(response => {
          console.log(response.data);
          this.orderhistoryItems = response.data.history.sort(function(
            pre,
            next
          ) {
            return pre.payTime > next.payTime ? -1 : 1;
          });
          this.sumSpend = response.data.sumSpend;
          console.log(this.orderhistoryItems);
        })
        .catch(error => {});
    },
    date2String: function(date, fmt) {
      //author: meizz
      var o = {
        "M+": date.getMonth() + 1, //月份
        "d+": date.getDate(), //日
        "h+": date.getHours(), //小时
        "m+": date.getMinutes(), //分
        "s+": date.getSeconds(), //秒
        "q+": Math.floor((date.getMonth() + 3) / 3), //季度
        S: date.getMilliseconds() //毫秒
      };
      if (/(y+)/.test(fmt))
        fmt = fmt.replace(
          RegExp.$1,
          (date.getFullYear() + "").substr(4 - RegExp.$1.length)
        );
      for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt))
          fmt = fmt.replace(
            RegExp.$1,
            RegExp.$1.length == 1
              ? o[k]
              : ("00" + o[k]).substr(("" + o[k]).length)
          );
      return fmt;
    },
    toFixed1(num) {
      return num.toFixed(1);
    }
  }
};
</script>

<style>
#orderhistory {
  box-sizing: border-box;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  height: 100%;
  padding-bottom: 8vh;
  background-color: #f8f8f8;
  display: flex;
  flex-direction: column;
}
.order-i {
  padding: 3%;
  margin-top: 3%;
  margin-left: 5%;
  margin-right: 5%;
  display: flex;
  align-items: stretch;
  flex-direction: column;
  border-radius: 6px;
  background-color: white;
  animation: fade-in 2s;
  -webkit-animation: fade-in 2s;
}
div.orderhistory-content {
  padding-bottom: 5vh;
}
.i-goodsdetail {
  display: flex;
  justify-content: space-between;
}

.align-self-end {
  align-self: flex-end;
}

h1.sticky {
  position: sticky;
  top: 0;
}
</style>


