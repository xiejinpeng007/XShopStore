<template>
  <div id="my">
    <h1>我的</h1>
    <div v-if="isLogin" style="height:100%">
      <div class="detail-layout shadow-s">
        <div class="item">
          <label>余额</label>
          <label>{{money}}元</label>
        </div>
        <div class="item" v-on:click="onOrderHistory">历史订单</div>
        <div class="item" v-on:click="onChargeHistory">充值记录</div>
      </div>
      <button class="logout-button" v-on:click="onLogout">退出</button>
    </div>
    <div v-else style="height:100%">
      <div class="login-layout shadow-lg">
        <van-field style="height:50%" v-model="username" size="large" clearable="true" label="账号"/>
        <van-field style="height:50%" v-model="password" type="password" size="large" label="密码"/>
      </div>
      <button class="login-button bg-gradual-orange" v-on:click="onLogin">登录</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import store from "@/store.js";
import cookieutil from "@/utils/cookieutil.js";

export default {
  name: "my",
  data() {
    return {
      isLogin: false,
      username: "",
      password: "",
      money: 0
    };
  },
  created() {
    const token = cookieutil.getCookie("token");
    this.isLogin = token != null;
    console.log(token);
    if (this.isLogin) {
      const params = new URLSearchParams();
      params.append("token", token);
      axios
        .post("/api_userinfo", params)
        .then(response => {
          console.log(response.data);
          this.money = response.data.money;
        })
        .catch(error => {
          // eslint-disable-next-line
          console.log(error);
        });
    }
  },
  mounted() {},
  methods: {
    onLogin() {
      const params = new URLSearchParams();
      params.append("name", this.username);
      params.append("password", this.password);
      axios
        .post("/api_login", params)
        .then(response => {
          // eslint-disable-next-line
          cookieutil.setCookie("token", response.data.token, 30);
          this.money = response.data.money;
          this.isLogin = true;
          console.log(response.data);
        })
        .catch(error => {
          // eslint-disable-next-line
          console.log(error);
        });
    },
    onLogout() {
      cookieutil.delCookie("token");
      this.isLogin = false;
    },
    onOrderHistory() {
      this.$router.push("/orderhistory");
    },
    onChargeHistory() {
      this.$router.push("/chargehistory");
    }
  }
};
</script>

<style>
#my {
  box-sizing: border-box;
  overflow: hidden;
  height: 100%;
  width: 100%;
  padding-bottom: 8vh;
  background-color: #f8f8f8;
}

.detail-layout {
  min-height: 100px;
  height: 24vh;
  margin-top: 20%;
  margin-left: 5%;
  margin-right: 5%;
  border-radius: 10px;
  overflow: hidden;
  background-color: white;
}
.login-layout {
  min-height: 100px;
  height: 16vh;
  margin-top: 20%;
  margin-left: 5%;
  margin-right: 5%;
  border-radius: 10px;
  overflow: hidden;
  background-color: white;
}

.login-button {
  min-height: 40px;
  color: white;
  border: none;
  background-color: #ed1c24;
  font-size: 18px;
  margin-top: 10%;
  height: 6vh;
  width: 90%;
  border-radius: 5px;
  overflow: hidden;
  -webkit-transition-duration: 0.4s; /* Safari */
  transition-duration: 0.4s;
  box-shadow: 0 6px 8px 0 rgba(0, 0, 0, 0.24), 0 9px 25px 0 rgba(0, 0, 0, 0.19);
}

.login-button:active {
  background-image: linear-gradient(45deg, #ee9700, #dd1c24);
  box-shadow: 0 12px 16px 0 rgba(0, 0, 0, 0.24),
    0 17px 50px 0 rgba(0, 0, 0, 0.19);
}

.logout-button {
  color: white;
  border: none;
  background-color: #ed1c24;
  font-size: 18px;
  margin-top: 10%;
  height: 6vh;
  width: 90%;
  border-radius: 5px;
  overflow: hidden;
  -webkit-transition-duration: 0.4s; /* Safari */
  transition-duration: 0.4s;
  box-shadow: 0 6px 8px 0 rgba(0, 0, 0, 0.24), 0 9px 25px 0 rgba(0, 0, 0, 0.19);
}

.logout-button:active {
  background-color: #dd1c24;
  box-shadow: 0 12px 16px 0 rgba(0, 0, 0, 0.24),
    0 17px 50px 0 rgba(0, 0, 0, 0.19);
}

.shadow-lg {
  box-shadow: 0rpx 40rpx 100rpx 0rpx rgba(0, 0, 0, 0.07);
}
.bg-gradual-orange {
  background-image: linear-gradient(45deg, #ff9700, #ed1c24);
  color: #fff;
}

.item {
  padding-left: 5%;
  padding-right: 10%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 33.3%;
  background-color: white;
  -webkit-transition-duration: 0.2s; /* Safari */
  transition-duration: 0.2s;
}

.item:active {
  background-color: #e7e7e7;
}

.shadow-l {
  box-shadow: 0 5px 8px 0 rgba(0, 0, 0, 0.24), 0 9px 25px 0 rgba(0, 0, 0, 0.19);
}

.shadow {
  box-shadow: 0 3px 4px 0 rgba(0, 0, 0, 0.24), 0 6px 16px 0 rgba(0, 0, 0, 0.19);
}

.shadow-s {
  box-shadow: 0 0px 0px 0 rgba(0, 0, 0, 0.24), 0 1px 4px 0 rgba(0, 0, 0, 0.19);
}
</style>
