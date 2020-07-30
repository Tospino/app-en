<!--
 * @Author: 曹建勇
 * @Date: 2020-07-30 09:57:53
 * @LastEditors: 曹建勇
 * @LastEditTime: 2020-07-30 16:20:35
 * @Description: 
 * @FilePath: \app-en\src\components\tabbar\account\information\list.vue
--> 
<template>
  <section class="infolist">
    <navar title="Messages" />
    <div class="list_item flex">
      <img src="@/assets/img/headset.png" alt />
      <div>
        <p class="title">Notification message</p>
        <p class="mt_8">Website announcement, preferential...</p>
      </div>
    </div>
    <div class="list_item flex" v-for="item in list" :key="item.sid" @click>
      <img src="@/assets/img/voice.png" alt />
      <div class="flex_space">
        <div>
          <p class="title">{{item.user}}</p>
          <p class="mt_8">{{item.lastMessage.content}}</p>
        </div>
        <div class="flex_col flex_end">
          <span class="time">{{item.biUpdateTime}}</span>
          <span class="leakNum">{{item.leakNum}}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import navar from "@/multiplexing/navar.vue";
import axios from "axios";
import Qs from "qs";
var md5 = require("md5");
export default {
  name: "infolist",
  data() {
    return {
      ACCOUNTID: "T00000015808",
      APISecret: "0c0db6c0-d20b-11ea-b22e-698a310ae14a",
      userinfoShop: null,
      list: [],
    };
  },
  computed: {},
  created() {
    if (localStorage.userinfoShop && localStorage.token) {
      this.userinfoShop = JSON.parse(localStorage.userinfoShop);
      this.getwebChat();
    } else {
      this.$router.push({ name: "登录" });
    }
  },
  mounted() {},
  watch: {},
  methods: {
    async getwebChat() {
      const time = await this.generateTimeReqestNumber();
      console.log("passport -> time", time);
      const Authorization = window.btoa(`${this.ACCOUNTID}:${time}`); // 编码
      const sig = md5(
        `${this.ACCOUNTID}${this.APISecret}${time}`
      ).toUpperCase();
      axios({
        url: `https://openapis.7moor.com/v20170418/webChat/queryWebchatSession/${this.ACCOUNTID}?sig=${sig}`,
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
          Authorization: Authorization,
        },
        data: {
          sName: `app用户ID:${this.userinfoShop.userId}`,
        },
      }).then((res) => {
        if (res.data.code === 200) {
          this.list = res.data.data.webchatSession;
        }
        console.log("passport -> res", res);
      });
    },
    async getVersion() {
      const time = await this.generateTimeReqestNumber();
      console.log("passport -> time", time);
      const Authorization = window.btoa(`${this.ACCOUNTID}:${time}`); // 编码
      const sig = md5(
        `${this.ACCOUNTID}${this.APISecret}${time}`
      ).toUpperCase();
      axios({
        url: `https://openapis.7moor.com/v20160818/customer/getTemplate/${this.ACCOUNTID}?sig=${sig}`,
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
          Authorization: Authorization,
        },
      }).then((res) => {
        console.log("passport -> res", res);
      });
    },
    async passport() {
      const time = await this.generateTimeReqestNumber();
      console.log("passport -> time", time);
      const Authorization = window.btoa(`${this.ACCOUNTID}:${time}`); // 编码
      const sig = md5(
        `${this.ACCOUNTID}${this.APISecret}${time}`
      ).toLocaleUpperCase();
      axios({
        url: `http://apis.7moor.com/v20160818/customer/select/${this.ACCOUNTID}?sig=${sig}`,
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
          Authorization: Authorization,
        },
        data: { version: "201610100019" },
      }).then((res) => {
        console.log("passport -> res", res);
      });
    },
    generateTimeReqestNumber() {
      var date = new Date();
      return (
        date.getFullYear().toString() +
        this.pad2(date.getMonth() + 1) +
        this.pad2(date.getDate()) +
        this.pad2(date.getHours()) +
        this.pad2(date.getMinutes()) +
        this.pad2(date.getSeconds())
      );
    },
    pad2(n) {
      return n < 10 ? "0" + n : n;
    },
  },
  components: { navar },
};
</script>

<style scoped lang='less'>
.infolist {
  .flex {
    display: flex;
    align-items: center;
  }
  .flex_col {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }
  .flex_end {
    justify-content: flex-end;
  }
  .flex_space {
    width: 84%;
    display: flex;
    justify-content: space-between;
  }
  .list_item {
    padding: 0 15px 0 30px;
    width: 100%;
    border-top: 1px solid #eeeeee;
    background: #fff;
    height: 140px;
    .title {
      font-size: 30px;
      font-family: SFUIText-Medium, SFUIText;
      font-weight: 500;
      color: #333333;
    }
    .mt_8 {
      margin-top: 16px;
      font-size: 28px;
      font-family: SFUIText-Regular, SFUIText;
      font-weight: 400;
      color: rgba(153, 153, 153, 1);
    }
    img {
      margin-right: 6px;
      width: 56px;
      height: 56px;
    }
    .time {
      font-size: 20px;
      color: rgba(153, 153, 153, 1);
    }
    .leakNum {
      margin-top: 8px;
      width: 32px;
      height: 32px;
      background: rgba(255, 77, 79, 1);
      color: #fff;
      border-radius: 50%;
      text-align: center;
      line-height: 32px;
    }
  }
}
</style>