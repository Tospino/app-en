<template>
  <!-- 我的-优惠券中心 -->
  <div class="my-coupons">
    <div class="coupons-top">
      <balance-header title="My Coupons"></balance-header>
      <div class="order-tab" v-if="true">
        <van-tabs
          v-model="active"
          class="tab-list"
          title-active-color="#FA5300"
          @click="userDrawCoupon(active)"
        >
          <van-tab :title="tab.name" v-for="(tab) in typeList" :key="tab.id"></van-tab>
        </van-tabs>
      </div>
    </div>
    <!-- 优惠券列表 -->
    <div class="selection-conten" v-if="active==0">
      <van-list class="activity" v-model="loading" :finished="finished" @load="onLoad">
        <van-cell class="youhuiquan-main" v-for="(shops,index) in shopCoupon" :key="index">
          <div v-if="shops.drawStatus==0||shops.drawStatus==null">
            <img :src="srcUse" />
          </div>
          <div v-else-if="shops.drawStatus==3">
            <img :src="srcMore" />
          </div>
          <div class="youhuiquan-box">
            <div class="youhuiquan-left">
              <span class="youhuiquan-left-biao">GH{{jn}}</span>
              <p class="youhuiquan-left-money">
                {{ shops.reduceAmount}}
                <i>OFF</i>
              </p>
              <p
                class="youhuiquan-left-m"
              >Type:{{shops.couponType==1?"Tospino’s Price-off":shops.couponType==2?"Newer Exclusives":shops.couponType==3?"Shop’s Price-off":shops.couponType==4?"Item Price-off":"Item Price-off"}}</p>
              <p class="youhuiquan-left-m">Valid:{{shops.useEndWebsite}}</p>
              <div v-if="shops.couponType==2?false:true">
                <progress-bar :progressBar="shops.claimRate"></progress-bar>
              </div>
            </div>

            <div class="youhuiquan-right">
              <div class="youhuiquan-right-header">
                <!-- v-show="shops.drawStatus==1?false:true" -->
                <span class="youhuiquan-right-title right-title-a">{{shops.couponName}}</span>
              </div>
              <div class="youhuiquan-right-main">
                <div>Mini Spend GH{{jn}} {{shops.upToAmount}}</div>
                <van-button
                  round
                  type="info"
                  @click="ProBar(shops.couponId,shops.couponDetailId,shops.drawStatus,shops.couponType,shops.businessId,shops.expIds,shops.skuId,shops.sellFlag)"
                  class="youhuiquan-right-btn right-btn-a"
                >{{shops.drawStatus==null?"Get it now":shops.drawStatus==0?"Use it now":shops.drawStatus==3?"Get more":"删除"}}</van-button>
              </div>
            </div>
          </div>
        </van-cell>
      </van-list>
    </div>

    <div class="selection-conten" v-else-if="active==1">
      <van-list class="activity" v-model="loading" :finished="finished" @load="onLoad">
        <van-cell class="youhuiquan-main" v-for="(shopone,index) in shopCouponUsed" :key="index">
          <img :src="srcDel" />
          <div class="youhuiquan-box">
            <div class="youhuiquan-left">
              <span class="youhuiquan-left-biao">GH{{jn}}</span>
              <p class="youhuiquan-left-money">
                {{shopone.reduceAmount}}
                <i>OFF</i>
              </p>
              <p
                class="youhuiquan-left-m"
              >Type:{{shopone.couponType==1?"Tospino’s Price-off":shopone.couponType==2?"Newer Exclusives":shopone.couponType==3?"Shop’s Price-off":shopone.couponType==4?"Item Price-off":"Item Price-off"}}</p>
              <p class="youhuiquan-left-m">Valid:{{shopone.useEndWebsite}}</p>
            </div>

            <div class="youhuiquan-right">
              <div class="youhuiquan-right-header">
                <span class="youhuiquan-right-title right-title-b">{{shopone.couponName}}</span>
              </div>
              <div class="youhuiquan-right-main">
                <div>Mini Spend GH{{jn}} {{shopone.upToAmount}}</div>
                <van-button
                  round
                  type="info"
                  @click="usedDel(shopone.drawId)"
                  class="youhuiquan-right-btn right-btn-b"
                >{{shopone.drawStatus==null?"Get it now":shopone.drawStatus==0?"Use it now":shopone.drawStatus==1?"Get more":shopone.drawStatus==2?"Delete":"Delete"}}</van-button>
                <!-- {{shopone.drawStatus==null?"Get it now":shopone.drawStatus==0?"Use it now":shopone.drawStatus==1?"Get more":shopone.drawStatus==2?"Delete":"Delete"}} -->
              </div>
            </div>
          </div>
        </van-cell>
      </van-list>
    </div>
    <!-- 已过期 -->
    <div class="selection-conten" v-else-if="active==2">
      <van-list class="activity" v-model="loading" :finished="finished" @load="onLoad">
        <van-cell class="youhuiquan-main" v-for="(shopDel,index) in shopCouponEx" :key="index">
          <img :src="srcDel" />
          <div class="youhuiquan-box">
            <div class="youhuiquan-left">
              <span class="youhuiquan-left-biao">GH{{jn}}</span>
              <p class="youhuiquan-left-money">
                {{ shopDel.reduceAmount}}
                <i>OFF</i>
              </p>
              <p
                class="youhuiquan-left-m"
              >Type:{{shopDel.couponType==1?"Tospino’s Price-off":shopDel.couponType==2?"Newer Exclusives":shopDel.couponType==3?"Shop’s Price-off":shopDel.couponType==4?"Item Price-off":"Item Price-off"}}</p>
              <p class="youhuiquan-left-m">Valid:{{shopDel.useEndWebsite}}</p>
            </div>

            <div class="youhuiquan-right">
              <div class="youhuiquan-right-header">
                <span
                  class="youhuiquan-right-title right-title-b"
                  v-show="shopDel.drawStatus==1?false:true"
                >{{shopDel.couponName}}</span>
              </div>
              <div class="youhuiquan-right-main">
                <div>For GH{{jn}} {{shopDel.upToAmount}} consumption</div>
                <van-button
                  round
                  type="info"
                  @click="usedDel(shopDel.drawId)"
                  class="youhuiquan-right-btn right-btn-b"
                >Delete</van-button>
              </div>
            </div>
          </div>
        </van-cell>
      </van-list>
    </div>
    <!-- 判断是否有优惠券 -->
    <div
      v-if="active==0?shopCoupon.length==0: active==1?shopCouponUsed.length==0: active==2?shopCouponEx.length==0:shopCouponEx.length==0"
    >
      <no-coupon :imgSrc="imgSrc1" describe="There is no coupons"></no-coupon>
    </div>
  </div>
</template>

<script>
import { Toast, List } from "vant";
import balanceHeader from "./itemComponents/balanceHeader";
import progressBar from "@/multiplexing/progress";
// // 无优惠券
import noCoupon from "@/multiplexing/noCoupon";
import imgSrc1 from "@/assets/img/coupon/noyouhui@2x.png";
import {
  APPgetuserallCouponListApi,
  APPgetuserallcouponlistexpireApi,
} from "@/api/accountBalance/index.js";
import { couponDrawApi, couponRemoveApi } from "@/api/confirmOrder/index";
export default {
  components: { balanceHeader, progressBar, noCoupon },
  props: {},
  data() {
    return {
      active: 0,
      typeList: [
        {
          id: 1,
          name: "Available",
        },
        {
          id: 2,
          name: "Used",
        },
        {
          id: 3,
          name: "Expired",
        },
      ],
      // 未领取和已领取背景
      srcUse: require("@/assets/img/tabbar/home/commodityDetails/youhuiquan@2x.png"),
      // 可领取更多优惠券背景
      srcMore: require("@/assets/img/tabbar/home/commodityDetails/youhuiquan-1@2x.png"),
      shopCoupon: [], //全部优惠券
      // 删除背景图
      srcDel: require("@/assets/img/tabbar/home/commodityDetails/youhuiquan-del@2x.png"),
      shopCouponUsed: [], //已使用优惠券
      shopCouponEx: [], //已过期优惠券
      imgSrc1: imgSrc1, //没有券背景图
      page: 1, //分页
      limit: 10, //页数
      total: 0, //数据总条数
      couponsDataId: "", //点击领取
      loading: false,
      finished: false,
      Status: "",
    };
  },
  computed: {},
  watch: {
    shopCoupon: {
      handler(newVal) {},
      deep: true,
    },
  },
  created() {},
  mounted() {},
  beforeUpdate() {
    // if (this.active != 0) {
    //   this.shopCoupon = [];
    // } else {
    //   if (this.active == 1) {
    //     this.shopCouponUsed = [];
    //   } else {
    //     this.shopCouponEx = [];
    //   }
    // }
  },
  methods: {
    //  导航栏tab切换
    userDrawCoupon(active) {
      this.active = active;
      this.page = 1;
      this.loading = false;
      this.finished = false;
      this.shopCoupon = [];
      this.shopCouponUsed = [];
      this.shopCouponEx = [];
      // this.getListData();
    },
    // 全部可用优惠券
    async getListData() {
      let couponList = await APPgetuserallCouponListApi({
        page: this.page,
        limit: this.limit,
        usetype: this.active + 1,
      });
      this.shopCoupon = this.shopCoupon.concat(couponList.Data.list);
      // console.log("getListData ->  this.shopCoupon", this.shopCoupon);
      // 列表数据懒加载
      if (couponList.Data.totalPage >= couponList.Data.currPage) {
        this.page = this.page + 1;
      } else {
        this.finished = true;
      }
      this.loading = false; // 加载状态结束
    },

    // 已使用和已过期优惠券
    async getUseData() {
      let couponList = await APPgetuserallcouponlistexpireApi({
        page: this.page,
        limit: this.limit,
        usetype: this.active + 1,
      });
      // 如果shopCoupon长度大于数据总长度
      if (couponList.Data.totalPage >= couponList.Data.currPage) {
        // 获取数据
        if (this.active == 1) {
          this.shopCouponUsed = this.shopCouponUsed.concat(
            couponList.Data.list
          );
        } else if (this.active == 2) {
          this.shopCouponEx = this.shopCouponEx.concat(couponList.Data.list);
        }
      } else {
        this.finished = true;
      }
      this.loading = false; // 加载状态结束
    },
    // 懒加载数据
    onLoad() {
      if (this.active == 0) {
        this.getListData();
      } else {
        this.getUseData();
      }
    },
    // 新增-优惠券 进度条
    ProBar(id, Detail, Status, Type, businessId, expIds, skuId, sellFlag) {
      // 判断优惠券平台跳转
      if (Status == 0) {
        if (Type == 1 || Type == 2) {
          this.$router.push({ name: "搜索商品1" });
        } else if (Type == 3) {
          this.$router.push({
            name: "搜索商品1",
            query: { businessId: businessId, expIds: expIds },
          });
        } else {
          if (sellFlag == 0) {
            Toast("The goods is not available");
          } else {
            this.$router.push({ name: "商品详情", query: { skuId: skuId } });
          }
        }
      } else {
        this.couponsDataId = {
          couponId: id,
          couponDetailId: Detail,
        };
        this.availableCoupon(this.couponsDataId);
      }
    },
    // 领取优惠券
    availableCoupon(couponsId) {
      couponDrawApi(couponsId).then((res) => {
        if (res.code == 0) {
          Toast("Get the success");
          window.location.reload();
        } else {
          this.$toast.clear();
        }
      });
    },
    // 删除使用优惠券
    usedDel(delId) {
      let delIds = {
        drawId: delId,
      };
      couponRemoveApi(delIds).then((res) => {
        if (res.code == 0) {
          Toast("Delete the success");
        } else {
          this.$toast.clear();
        }
      });
    },
  },
};
</script>
<style scoped lang="less">
.order-tab {
  /deep/ .van-tabs__wrap {
    height: 80px;
  }
  /deep/ .van-tab {
    font-size: 26px;
    line-height: 80px;
  }
  /deep/ .van-tabs__line {
    background-color: #fff;
    display: none;
  }
}
.coupons-top {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1;
}
.selection-conten {
  // padding: 200px 40px 60px;
  position: relative;
  top: 160px;
  height: 100%;
  /deep/ .van-cell {
    padding: 0 20px;
    background-color: #f5f5f5;
  }
  .youhuiquan-main {
    max-width: 100%;
    height: 210px;
    margin-top: 15px;
    overflow: hidden;
    img {
      width: 100%;
      min-height: 206px;
    }
    .youhuiquan-box {
      display: flex;
      position: relative;
      top: -209px;

      .youhuiquan-left {
        width: 70%;
        padding-top: 30px;
        padding-left: 20px;
        .youhuiquan-left-biao {
          font-size: 12px;
          color: #fa5300;
        }
        .youhuiquan-left-money {
          padding-top: 10px;
          font-size: 32px;
          font-weight: bold;
          color: #fa5300;
          i {
            font-size: 14px;
            font-weight: normal;
          }
        }
        .youhuiquan-left-m {
          font-size: 12px;
          color: #333;
          line-height: 36px;
        }
      }

      .youhuiquan-right {
        width: 57%;
        text-align: center;
        .youhuiquan-right-header {
          margin-top: 11px;
        }
        .right-title-a {
          color: #fa5300;
          background: rgba(253, 193, 154, 1);
        }
        .right-title-b {
          color: #fff;
          background: #cecece;
        }
        .youhuiquan-right-title {
          font-size: 12px;
          padding: 10px;
        }
        .youhuiquan-right-main {
          padding-top: 46px;
          font-size: 14px;
          color: rgba(255, 255, 255, 1);
          .right-btn-a {
            color: #fa5300;
          }
          .right-btn-b {
            color: #999999;
          }
          .youhuiquan-right-btn {
            margin-top: 15px;
          }
          /deep/ .van-button--info {
            background: #fff;
            border: 1px solid #fff;
            font-size: 30px;
            font-weight: bold;
            padding: 30px 30px;
          }
          /deep/ .van-button {
            // height: 0;
            line-height: 0;
          }
        }
      }
    }
  }
}
</style>