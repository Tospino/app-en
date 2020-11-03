<template>
  <div id="heiwu">
    <!-- 模式一 -->
    <scroll
      class="bscroll-wrapper"
      ref="wrapper"
      :data="recordGroup"
      :pulldown="pulldown"
      :pullup="pullup"
      @pulldown="_pulldown"
      @pullup="_pullup"
      v-show="showData"
      :footerTips="false"
    >
      <div class="sale">
        <img src="@/assets/img/activity/heiwu/sale.png" alt="" />
      </div>
      <div class="callback" @click="$router.go(-1)">
        <img src="@/assets/img/activity/heiwu/callback1.png" alt="" />
      </div>
      <div class="banner">
        <img src="@/assets/img/activity/heiwu/banner.png" alt="" />
        <span class="t1">BLACK FRIDAY DISCOUNT</span>
        <span class="t2">MUST GRAB LIST</span>
      </div>
      <category :categorys="categorys" @clickCate="clickCate" />
      <div class="banner">
        <img src="@/assets/img/activity/heiwu/banner.png" alt="" />
        <span class="t1">BLACK FRIDAY DISCOUNT</span>
        <span class="t3">RECOMMENDATION</span>
      </div>
      <div class="product-list">
        <div
          class="product-item"
          v-for="(item, index) in showProduct"
          :key="index"
          @click="toProductDetail(item.skuId)"
        >
          <div class="image">
            <img v-lazy="$webUrl + item.skuImg" alt="" />
          </div>
          <div class="original-price">
            <span>{{
              item.discountPrice == null ? "" : jn + item.salePrice
            }}</span>
          </div>
          <div class="discount-price">
            <span
              >{{ jn
              }}{{
                item.discountPrice == null ? item.salePrice : item.discountPrice
              }}</span
            >
          </div>
        </div>
      </div>
      <div class="kongbai" v-show="jixing == 'ios'"></div>
    </scroll>
  </div>
</template>

<script>
import category from "@/components/blackFriday/category";

import clothing from "@/assets/img/activity/heiwu/clothing.png";
import bag from "@/assets/img/activity/heiwu/bag.png";
import digital from "@/assets/img/activity/heiwu/digital.png";
import smart from "@/assets/img/activity/heiwu/smart.png";
import lighting from "@/assets/img/activity/heiwu/lighting.png";
import overseas from "@/assets/img/activity/heiwu/overseas.png";
import nosear1 from "@/assets/img/search/nosear1.png";

import { HomeEsApi } from "@/api/search/index";
import { showProductListApi } from "@/api/blackFriday/index";

export default {
  name: "blackFriday",
  data() {
    return {
      categorys: [
        {
          img: clothing,
          name: "Clothing",
          shop: "SHOP NOW",
          classIdTwo: 24,
          expIds: 2
        },
        {
          img: bag,
          name: "Fashion Bag",
          shop: "SHOP NOW",
          classIdTwo: 15,
          expIds: 2
        },
        {
          img: digital,
          name: "Digital",
          shop: "SHOP NOW",
          classIdTwo: 47,
          expIds: 2
        },
        {
          img: smart,
          name: "Smart Home",
          shop: "SHOP NOW",
          classIdTwo: 244,
          expIds: 2
        },
        {
          img: lighting,
          name: "Lighting",
          shop: "SHOP NOW",
          classIdTwo: 38,
          expIds: 2
        },
        {
          img: overseas,
          name: "Overseas",
          shop: "SHOP NOW",
          classIdTwo: 0,
          expIds: 1
        }
      ],
      formData: {
        page: 1,
        limit: 9
      },
      showProduct: [],
      recordGroup: [],
      pullup: true,
      pulldown: true,
      showData: true,
      guanmengou: true, //看门狗
      jixing: null,
    };
  },
  mounted() {
    this.showProductList(this.formData, true);

    //获取当前手机设备型号
    function checkSystem(){
      var u = window.navigator.userAgent,
        app = window.navigator.appVersion;
      var isAndroid = u.indexOf("Android") > -1 || u.indexOf("Linux") > -1; //g
      var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
      if (isAndroid) {
        return "android";
      }
      if (isIOS) {
        return "ios";
      }
    }
    this.jixing = checkSystem();
  },
  methods: {
    clickCate(classIdTwo, expIds) {
      this.$router.push({
        name: "搜索商品1",
        query: { classIdTwo, expIds }
      });
    },
    showProductList(data, flag) {
      showProductListApi(data).then(res => {
        if (res.code == 0) {
          if (flag) {
            this.showProduct = res.Data.list;
          } else {
            this.showProduct = [...this.showProduct, ...res.Data.list];
          }
          this.totalCount = res.Data.totalCount;
          this.recordGroup = this.showProduct;
          if (this.showProduct.length > 0) {
            if (this.showProduct.length >= this.totalCount) {
              this.pullup = false;
            }
          } else {
            this.pullup = false;
          }
        }
      });
    },
    //下拉刷新
    _pulldown() {
      setTimeout(() => {
        this.refreshOrder();
      }, 500);
    },
    //上拉加载
    _pullup() {
      if (!this.pullup) return;
      //不知道为什么触发两次,使用关门狗拦截
      if (this.guanmengou) {
        this.formData.page++;
        this.showProductList(this.formData, false);
        this.guanmengou = false;
      }
      setTimeout(() => {
        this.guanmengou = true;
      }, 500);
    },
    //刷新页面
    refreshOrder() {
      this.formData.page = 1;
      this.formData.limit = 9;
      this.showProductList(this.formData, true);
      this.pullup = true;
    },
    //跳转商品详情页
    toProductDetail(skuId) {
      this.$router.push({
        name: "商品详情",
        query: { skuId }
      });
    }
  },
  components: {
    category
  }
};
</script>

<style scoped lang="less">
#heiwu {
  width: 100%;
  position: relative;
  background-color: #940000;

  .bscroll-wrapper {
    height: 100vh;
  }
  .callback {
    height: 40px;
    width: 40px;
    position: absolute;
    top: 64px;
    left: 22px;
  }
  .banner {
    width: 100%;
    position: relative;
    background-color: #940000;

    .t1 {
      display: block;
      font-family: Arial;
      font-weight: bold;
      color: #000000;
      font-size: 40px;
      position: absolute;
      top: 53px;
      left: 117px;
    }
    .t2 {
      font-family: Arial;
      font-weight: bold;
      font-size: 40px;
      color: #ffffff;
      position: absolute;
      top: 105px;
      left: 206px;
    }
    .t3 {
      font-family: Arial;
      font-weight: bold;
      font-size: 40px;
      color: #ffffff;
      position: absolute;
      top: 105px;
      left: 183px;
    }
  }
  .product-list {
    padding: 30px 0 75px 30px;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    background-color: #940000;

    .product-item {
      width: 220px;
      height: 320px;
      background-color: #ffffff;
      margin: 15px 15px 0 0;
      .image {
        width: 100%;
        height: 220px;
      }
      .original-price {
        height: 21px;
        padding-top: 18px;
        font-size: 20px;
        font-family: Arial;
        color: #666666;
        text-align: center;
        text-decoration: line-through;
      }
      .discount-price {
        margin: 2px 0 0 30px;
        width: 160px;
        height: 48px;
        background-color: #360b42;
        border-radius: 24px;
        text-align: center;
        span {
          display: block;
          padding-top: 10px;
          color: #fc0f0f;
          font-size: 30px;
          font-family: Arial;
          font-weight: bold;
          font-style: oblique;
        }
      }
    }
  }
  .kongbai {
    width: 100%;
    height: 160px;
    background-color: #940000;
  }
}
</style>
