<template>
  <div id="chargehistory">
    <div class="chargehistory-content">
      <h1>充值记录</h1>
      <label>累计充值：{{sumCharge}}元</label>
      <div class="ch-items shadow-s">
        <div class="ch-item" v-for="item in historyItems" :key="item.time">
          <label>{{item.charge}}元</label>
          <label>{{timestamp2String(item.time)}}</label>
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
  name: "chargehistory",
  data() {
    return {
      historyItems: [],
      sumCharge: 0
    };
  },
  created() {
    this.requestChargeHistory();
  },
  methods: {
    requestChargeHistory() {
      const params = new URLSearchParams();
      params.append("token", cookieutil.getCookie("token"));
      params.append("start", "");
      params.append("end", "");
      params.append("offset", 0);
      params.append("limit", 0);
      axios
        .post("/api_getChargeHistory", params)
        .then(response => {
          this.historyItems = response.data.chargeHistory;
          this.sumCharge = response.data.chargeHistory
            .map(it => it.charge)
            .reduce(function(pre, cur) {
              return pre + cur;
            });
          console.log(response.data);
        })
        .catch(error => {
          console.log(error);
          this.$toast("请求失败，请检查网络");
        });
    },
    timestamp2String(time) {
      return TimeUtil.TimeUtil.timestamp2String(time);
    }
  }
};
</script>

<style>
#chargehistory {
  box-sizing: border-box;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  height: 100%;
  padding-bottom: 8vh;
  background-color: #f8f8f8;
  display: flex;
  flex-direction: column;
}
div.chargehistory-content {
  padding-bottom: 3vh;
}

.ch-items {
  padding-top: 2vh;
  background-color: white;
  border-radius: 10px;
  margin-top: 5vh;
  margin-left: 5vw;
  margin-right: 5vw;
  -webkit-transition-duration: 0.2s; /* Safari */
  transition-duration: 0.2s;
  animation: fade-in 2s;
  -webkit-animation: fade-in 2s;
}

.ch-item {
  padding-right: 10vw;
  padding-left: 10vw;
  display: flex;
  justify-content: space-between;
  height: 5vh;
}
</style>


