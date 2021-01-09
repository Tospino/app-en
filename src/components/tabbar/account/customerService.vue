<!--
 * @Author: 曹建勇
 * @Date: 2020-07-30 13:39:53
 * @LastEditors: 曹建勇
 * @LastEditTime: 2021-01-09 09:30:11
 * @Description: 
 * @FilePath: \app-en\src\components\tabbar\account\customerService.vue
--> 
<template>
  <section class="customerService">
    <div class="header" v-show="type !== 0 ? true : false">
      <div class="balance-header">
        <van-icon name="arrow-left" class="arrow-left" @click="back" />
        <span class="header-t1">Service</span>
      </div>
      <div class="place"></div>
    </div>
    <iframe
      :src="seversUrl"
      v-if="showServer && token"
      width="100%"
      :height="h"
      @message="HandleMessage"
    ></iframe>
  </section>
</template>

<script>
import detailsHeader from "@/multiplexing/navar";
import { getuserinfo } from "@/api/login/index.js";
export default {
  props: {
    /**
     * @description: 类型判断
     * @param {Number 0 默认类型，无任何传参，仅聊天 1 商品详情 2 订单 3 需要专属客服服务坐席}
     * @author: 曹建勇
     */
    type: {
      type: Number,
      default: () => 0,
    },
    /**
     * @description: 数据
     * @param {订单数据及商品详情数据 type类型为1 2时会用到}
     * @author: 曹建勇
     */
    data: {
      type: Object,
      default: () => {},
    },
    show: {
      type: Boolean,
      default: false,
    },
  },
  //   name: "customerService",
  data() {
    return {
      seversUrl: `https://webchat.7moor.com/wapchat.html?accessId=8171fc80-d163-11ea-bfcd-0ba873f67cbc&fromUrl=tospino-app&urlTitle=&language=EN`,
      h: document.documentElement.clientHeight - 40 + "px",
      showServer: false,
      userinfoShop: null,
      token: null,
      isshow: true,
    };
  },
  computed: {},
  watch: {
    show: {
      immediate: true,
      handler(val) {
        console.log(
          "🚀 ~ file: customerService.vue ~ line 73 ~ handler ~ val",
          val
        );
        if (val) {
          if (
            localStorage.userinfoShop &&
            (this.$storage.get("token") || localStorage.token)
          ) {
            this.token = localStorage.token || this.$storage.get("token");
            this.userinfoShop =
              JSON.parse(localStorage.userinfoShop) ||
              this.$storage.get("userinfoShop");
            this.getData();
            window.addEventListener("message", this.HandleMessage);
          } else {
            this.$router.replace({ name: "登录" });
          }
        }
      },
    },
  },
  created() {
    if (this.$route.path === "/control/customerService") {
      this.type = 0;
      this.isshow = false;
      this.h = document.documentElement.clientHeight - 55 + "px";
    }
  },
  mounted() {},
  methods: {
    // getUser() {
    //   getuserinfo().then((res) => {
    //     console.log("localStorage.token", localStorage.token);
    //     this.token = localStorage.token;
    //     this.userinfoShop = JSON.parse(localStorage.userinfoShop);
    //     this.getData();
    //   });
    // },
    getData() {
      let otherParams;
      let nickName = `app user ID:${this.userinfoShop.userId}`;
      this.userinfoShop.userId;
      if (this.type === 0) {
        //   普通聊天
        otherParams = {
          nickName: nickName,
          agent: "8001",
        };
      } else if (this.type === 1) {
        // 商品详情私聊客服
        otherParams = {
          nickName: nickName,
          agent: "8001",
          productInfo: {
            // 客户端展示
            visible: true,
            actionText: "Send",
            actionTextColor: "#fff",
            title: this.data.supplyTitle,
            sub_title: `${this.jn}${
              this.data.discountPrice
                ? this.data.discountPrice
                : this.data.salePrice
            }`,
            img: `${this.$webUrl}${this.data.productImgList[0].imgUrl}`,
            // 仅在坐席端展示
            price: `${this.jn}${
              this.data.discountPrice
                ? this.data.discountPrice
                : this.data.salePrice
            }`,
            target: location.href,
            time: "agent",
            tags: [
              {
                label: "product details",
                url: location.href,
                focusIframe: "iframe名称1",
              },
            ],
            showCardInfoMsg: 1,
          },
        };
      } else if (this.type === 2) {
        // 订单详情私聊客服
        otherParams = {
          nickName: nickName,
          agent: "8001",
          productInfo: {
            // 客户端展示
            visible: true,
            actionText: "Send",
            actionTextColor: "#fff",
            title: this.data.detailList[0].skuName,
            sub_title: `There are ${this.data.detailList.length} items in total：total${this.jn}${this.data.orderAmountWebsite}`,
            img: `${this.$webUrl}${this.data.detailList[0].skuImg}`,
            other_title_one: `orderSn：${this.data.orderSn}`,
            other_title_two: `creation time：${this.data.orderAddtimeWebsite}`,
            //   // 仅在坐席端展示
            price: `${this.jn}${this.data.orderAmountWebsite}`,
            target: location.href,
            time: "agent",
            showCardInfoMsg: 1,
          },
        };
      }
      otherParams = JSON.stringify(otherParams);
      this.seversUrl = `https://webchat.7moor.com/wapchat.html?accessId=8171fc80-d163-11ea-bfcd-0ba873f67cbc&fromUrl=tospino-app&urlTitle=&language=EN&clientId=${
        this.userinfoShop.userId
      }&otherParams=${encodeURIComponent(otherParams)}`;
      this.showServer = true;
    },
    HandleMessage(val) {
      if (val && val.data === "m7ProductClick") {
        this.type !== 0 ? this.$router.go(0) : "";
      }
    },
    back() {
      this.$emit("change", false);
    },
  },
  components: { detailsHeader },
};
</script>

<style scoped lang='less'>
.customerService {
  .balance-header {
    width: 100%;
    height: 88px;
    background-color: #f2f3f5;
    text-align: center;
    position: fixed;
    top: 0;
    left: 0;
    line-height: 88px;
    z-index: 3;
    .arrow-left {
      position: absolute;
      top: 20px;
      left: 30px;
      font-size: 40px;
      width: 100px;
      text-align: left;
    }
    .header-t1 {
      display: inline-block;
      line-height: 88px;
      font-size: 36px;
      color: #010101;
    }
    .header-t2 {
      position: absolute;
      right: 30px;
      font-size: 30px;
    }
  }
  .place {
    height: 88px;
  }
}
</style>