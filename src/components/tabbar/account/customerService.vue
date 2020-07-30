<!--
 * @Author: 曹建勇
 * @Date: 2020-07-30 13:39:53
 * @LastEditors: 曹建勇
 * @LastEditTime: 2020-07-30 15:37:25
 * @Description: 
 * @FilePath: \app-en\src\components\tabbar\account\customerService.vue
--> 
<template>
  <section class="customerService">
    <!-- 头部搜索框 -->
    <details-header title="Message"></details-header>
    <iframe :src="seversUrl" v-if="showServer" width="100%" :height="h"></iframe>
  </section>
</template>

<script>
import detailsHeader from "@/multiplexing/navar";
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
  },
  name: "customerService",
  data() {
    return {
      seversUrl: `https://ykf-webchat.7moor.com/wapchat.html?accessId=48ebab00-d14e-11ea-89a3-afb3231772e9&fromUrl=tospino-app&urlTitle=&language=EN`,
      h: document.documentElement.clientHeight + "px",
      showServer: false,
      userinfoShop: null,
    };
  },
  computed: {},
  created() {
    if (localStorage.userinfoShop && localStorage.token) {
      this.userinfoShop = JSON.parse(localStorage.userinfoShop);
      this.getData();
    } else {
      this.$router.push({ name: "登录" });
    }
  },
  mounted() {},
  watch: {},
  methods: {
    getData() {
      let otherParams;
      let nickName = `app用户ID:${this.userinfoShop.userId}`;
      if (this.type === 0) {
        //   普通聊天
        otherParams = {
          nickName: nickName,
        };
      } else if (this.type === 1) {
        // 商品详情私聊客服
        otherParams = {
          nickName: nickName,
          productInfo: {
            // 客户端展示
            visible: true,
            actionText: "Send",
            actionTextColor: "#fff",
            title: this.data.supplyTitle,
            sub_title: `${this.jn}${this.data.salePrice}`,
            img: `${this.$webUrl}${this.data.productImgList[0].imgUrl}`,
            // 仅在坐席端展示
            price: `${this.jn}${this.data.salePrice}`,
            target: location.href,
            time: "agent",
            tags: [
              {
                label: "商品详情",
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
          productInfo: {
            // 客户端展示
            visible: true,
            actionText: "Send",
            actionTextColor: "#fff",
            title: this.data.detailList[0].skuName,
            sub_title: `共${this.data.detailList.length}件商品：合计${this.jn}${this.data.orderAmountWebsite}`,
            img: `${this.$webUrl}${this.data.detailList[0].skuImg}`,
            //   // 仅在坐席端展示
            price: `${this.jn}${this.data.orderAmountWebsite}`,
            target: location.href,
            time: "agent",
            tags: [
              {
                label: "订单详情",
                url: location.href,
                focusIframe: "iframe名称1",
              },
            ],
            showCardInfoMsg: 1,
          },
        };
      }
      otherParams = JSON.stringify(otherParams);
      this.seversUrl = `https://ykf-webchat.7moor.com/wapchat.html?accessId=48ebab00-d14e-11ea-89a3-afb3231772e9&fromUrl=tospino-app&urlTitle=&language=EN&clientId=${
        this.userinfoShop.userId
      }&otherParams=${encodeURIComponent(otherParams)}`;
      this.showServer = true;
    },
  },
  components: { detailsHeader },
};
</script>

<style scoped lang='less'>
.customerService {
}
</style>