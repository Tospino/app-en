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
          <van-tab
            :title="tab.name"
            v-for="(tab, index) in typeList"
            :key="index"
          ></van-tab>
        </van-tabs>
      </div>
    </div>
    <!-- 优惠券列表 -->
    {{ formData.page }}
    <div class="selection-conten" v-if="active == 0">
      <!-- <van-pull-refresh v-model="isLoading" @refresh="onRefresh"> -->
      <van-list
        class="activity"
        v-model="loading"
        :finished="finished"
        @load="onLoad"
        :offset="130"
        loading-text=" "
      >
        <van-cell
          class="youhuiquan-main"
          v-for="(shops, index) in shopCoupon"
          :key="index"
        >
          <div v-if="shops.drawStatus == 0 || shops.drawStatus == null">
            <img :src="srcUse" />
          </div>
          <div v-else-if="shops.drawStatus == 3">
            <img :src="srcMore" />
          </div>
          <div class="youhuiquan-box">
            <div class="youhuiquan-left">
              <!-- <span class="youhuiquan-left-biao">GH{{jn}}</span> -->
              <p class="youhuiquan-left-money">
                <span class="youhuiquan-left-biao">GH{{ jn }}</span>
                {{ shops.reduceAmount }}
                <i>OFF</i>
              </p>
              <p class="youhuiquan-left-m">
                Type:{{
                  shops.couponType == 1
                    ? "Tospino’s Price-off"
                    : shops.couponType == 2
                    ? "Newer Exclusives"
                    : shops.couponType == 3
                    ? "Shop’s Price-off"
                    : shops.couponType == 4
                    ? "Item Price-off"
                    : "Item Price-off"
                }}
              </p>
              <p class="youhuiquan-left-m">
                Valid:{{
                  shops.useBeginWebsite
                    .slice(0, 10)
                    .split("-")
                    .reverse()
                    .join("/")
                }}~{{
                  shops.useEndWebsite
                    .slice(0, 10)
                    .split("-")
                    .reverse()
                    .join("/")
                }}
              </p>
              <div v-if="shops.couponType == 2 ? false : true">
                <progress-bar
                  :progressBar="shops.claimRate * 100"
                ></progress-bar>
              </div>
            </div>

            <div class="youhuiquan-right">
              <div class="youhuiquan-right-header">
                <!-- v-show="shops.drawStatus==1?false:true" -->
                <!-- <span class="youhuiquan-right-title right-title-a">{{shops.couponName}}</span> -->
              </div>
              <div class="youhuiquan-right-main">
                <div>
                  Mini Spend GH{{ jn }}
                  {{
                    shops.upToAmount != null
                      ? shops.upToAmount
                      : shops.reduceAmount
                  }}
                </div>
                <van-button
                  id="btn"
                  round
                  type="info"
                  @click="
                    ProBar(
                      shops.couponId,
                      shops.couponDetailId,
                      shops.drawStatus,
                      shops.couponType,
                      shops.businessId,
                      shops.expIds,
                      shops.skuId,
                      shops.sellFlag,
                      shops.isToUse,
                      shops
                    )
                  "
                  class="youhuiquan-right-btn right-btn-a"
                  >{{
                    shops.drawStatus == null
                      ? "Get it now"
                      : shops.drawStatus == 0
                      ? "Use it now"
                      : shops.drawStatus == 3
                      ? "Get more"
                      : "删除"
                  }}</van-button
                >
              </div>
            </div>
          </div>
        </van-cell>
      </van-list>
      <!-- </van-pull-refresh> -->
      <!-- <div @click="returnPage">返回</div> -->
    </div>

    <div class="selection-conten" v-else-if="active == 1">
      <!-- <van-pull-refresh v-model="isLoading" @refresh="onRefresh"> -->
      <van-list
        class="activity"
        v-model="loading"
        :finished="finished"
        @load="onLoad"
        loading-text=" "
      >
        <van-cell
          class="youhuiquan-main"
          v-for="(shopone, index) in shopCouponUsed"
          :key="index"
        >
          <img :src="srcDel" />
          <div class="youhuiquan-box">
            <div class="youhuiquan-left">
              <p class="youhuiquan-left-money">
                <span class="youhuiquan-left-biao">GH{{ jn }}</span>
                {{ shopone.reduceAmount }}
                <i>OFF</i>
              </p>
              <p class="youhuiquan-left-m">
                Type:{{
                  shopone.couponType == 1
                    ? "Tospino’s Price-off"
                    : shopone.couponType == 2
                    ? "Newer Exclusives"
                    : shopone.couponType == 3
                    ? "Shop’s Price-off"
                    : shopone.couponType == 4
                    ? "Item Price-off"
                    : "Item Price-off"
                }}
              </p>
              <p class="youhuiquan-left-m">
                Valid:{{
                  shopone.useBeginWebsite
                    .slice(0, 10)
                    .split("-")
                    .reverse()
                    .join("/")
                }}~{{
                  shopone.useEndWebsite
                    .slice(0, 10)
                    .split("-")
                    .reverse()
                    .join("/")
                }}
              </p>
            </div>

            <div class="youhuiquan-right">
              <div class="youhuiquan-right-header">
                <!-- <span class="youhuiquan-right-title right-title-b">{{shopone.couponName}}</span> -->
              </div>
              <div class="youhuiquan-right-main">
                <div>
                  Mini Spend GH{{ jn }}
                  {{
                    shopone.upToAmount != null
                      ? shopone.upToAmount
                      : shopone.reduceAmount
                  }}
                </div>
                <van-button
                  round
                  type="info"
                  @click="usedDel(shopone.drawId)"
                  class="youhuiquan-right-btn right-btn-b"
                  >Delete</van-button
                >
                <!-- {{shopone.drawStatus==null?"Get it now":shopone.drawStatus==0?"Use it now":shopone.drawStatus==1?"Get more":shopone.drawStatus==2?"Delete":"Delete"}} -->
              </div>
            </div>
          </div>
        </van-cell>
      </van-list>
      <!-- </van-pull-refresh> -->
    </div>
    <!-- 已过期 -->
    <div class="selection-conten" v-else-if="active == 2">
      <!-- <van-pull-refresh v-model="loading" @refresh="onRefresh"> -->
      <van-list
        class="activity"
        v-model="loading"
        :finished="finished"
        @load="onLoad"
        loading-text=" "
      >
        <van-cell
          class="youhuiquan-main"
          v-for="(shopDel, index) in shopCouponEx"
          :key="index"
        >
          <img :src="srcEx" />
          <div class="youhuiquan-box">
            <div class="youhuiquan-left">
              <p class="youhuiquan-left-money">
                <span class="youhuiquan-left-biao">GH{{ jn }}</span>
                {{ shopDel.reduceAmount }}
                <i>OFF</i>
              </p>
              <p class="youhuiquan-left-m">
                Type:{{
                  shopDel.couponType == 1
                    ? "Tospino’s Price-off"
                    : shopDel.couponType == 2
                    ? "Newer Exclusives"
                    : shopDel.couponType == 3
                    ? "Shop’s Price-off"
                    : shopDel.couponType == 4
                    ? "Item Price-off"
                    : "Item Price-off"
                }}
              </p>
              <p class="youhuiquan-left-m">
                Valid:{{
                  shopDel.useBeginWebsite
                    .slice(0, 10)
                    .split("-")
                    .reverse()
                    .join("/")
                }}~{{
                  shopDel.useEndWebsite
                    .slice(0, 10)
                    .split("-")
                    .reverse()
                    .join("/")
                }}
              </p>
            </div>

            <div class="youhuiquan-right">
              <div class="youhuiquan-right-header">
                <!-- 测试 -->
                <!-- <span
                  class="youhuiquan-right-title right-title-b"
                  v-show="shopDel.drawStatus==1?false:true"
                >{{shopDel.couponName}}</span>-->
              </div>
              <div class="youhuiquan-right-main">
                <div>
                  Mini Spend GH{{ jn }}
                  {{
                    shopDel.upToAmount != null
                      ? shopDel.upToAmount
                      : shopDel.reduceAmount
                  }}
                </div>
                <van-button
                  round
                  type="info"
                  @click="usedDel(shopDel.drawId)"
                  class="youhuiquan-right-btn right-btn-b"
                  >Delete</van-button
                >
              </div>
            </div>
          </div>
        </van-cell>
      </van-list>
      <!-- </van-pull-refresh> -->
    </div>

    <!-- 判断是否有优惠券 -->
    <div
      v-if="
        active == 0
          ? shopCoupon.length == 0
          : active == 1
          ? shopCouponUsed.length == 0
          : active == 2
          ? shopCouponEx.length == 0
          : shopCouponEx.length == 0
      "
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
      srcEx: require("@/assets/img/tabbar/home/commodityDetails/youhuiquan-ex@2x.png"),
      shopCouponUsed: [], //已使用优惠券
      shopCouponEx: [], //已过期优惠券
      imgSrc1: imgSrc1, //没有券背景图
      formData: {
        page: 1, //分页
        limit: 10, //页数
        usetype: 1, //优惠券
      },
      couponsDataId: "", //点击领取
      loading: false,
      finished: false,
      isOne: true,
      exp1: 0,
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  beforeRouteLeave(to, from, next) {
    // 设置下一个路由的 meta
    if (to.name == "搜索商品1") {
      to.meta.isBack = true;
    }
    next();
  },
  methods: {
    //  更改tab切换
    userDrawCoupon(active) {
      // 数据重新加载
      this.formData.usetype = active + 1;
      this.active = active;
      this.refreshCoupon();
      window.scrollTo({ top: 10 });
    },
    // 刷新页面
    refreshCoupon() {
      this.formData.page = 1;
      this.formData.limit = 10;
      this.loading = false;
      this.finished = false;
      this.shopCoupon = [];
      this.shopCouponUsed = [];
      this.shopCouponEx = [];
    },
    // 全部可用优惠券
    async getListData(data, flag) {
      let couponList = await APPgetuserallCouponListApi(data);
      if (flag) {
        this.shopCoupon = this.shopCoupon.concat(couponList.Data.list);
      } else {
        this.shopCoupon = couponList.Data.list;
      }
      // 列表数据懒加载
      if (this.shopCoupon.length >= couponList.Data.totalCount) {
        this.finished = true;
      } else {
        // 监听pege的数据返回
        this.$set(this.formData, "page", this.formData.page + 1);
      }
      this.loading = false; // 加载状态结束
    },
    // 已使用和已过期优惠券
    async getUseData(data, flag) {
      let couponList = await APPgetuserallcouponlistexpireApi(data);
      if (this.shopCouponEx.length >= couponList.Data.totalCount) {
        this.finished = true;
        return false;
      }
      //   return;
      // 获取数据
      if (this.active == 1) {
        if (flag) {
          this.shopCouponUsed = this.shopCouponUsed.concat(
            couponList.Data.list
          );
        } else {
          this.shopCouponUsed = couponList.Data.list;
        }
        // 如果数组长度大于数据总长度
        if (this.shopCouponUsed.length >= couponList.Data.totalCount) {
          this.finished = true;
        } else {
          this.$set(this.formData, "page", this.formData.page + 1);
        }
      } else if (this.active == 2) {
        if (flag) {
          //   this.shopCouponEx = [...this.shopCouponEx, ...couponList.Data.list];
          this.shopCouponEx = this.shopCouponEx.concat(couponList.Data.list);
        } else {
          this.shopCouponEx = couponList.Data.list;
        }
        // 如果数组长度大于数据总长度
        if (this.shopCouponEx.length >= couponList.Data.totalCount) {
          this.finished = true;
        } else {
          this.$set(this.formData, "page", this.formData.page + 1);
        }
      }
      this.loading = false; // 加载状态结束
    },
    // 下拉更新数据
    onLoad() {
      // 使用开关器
      if (this.isOne) {
        if (this.active == 0) {
          this.getListData(this.formData, true);
        } else {
          this.getUseData(this.formData, true);
        }
        this.isOne = false;
      }
      setTimeout(() => {
        this.isOne = true;
      }, 300);
    },
    // 优惠券按钮
    ProBar(
      id,
      Detail,
      Status,
      Type,
      busId,
      expIds,
      skuId,
      sellFlag,
      isToUse,
      shops
    ) {
      // 判断优惠券平台跳转
      if (Status == 0) {
        if (isToUse == 1) {
          Toast("Unavailable yet");
        } else {
          if (Type == 1 || Type == 2) {
            this.$router.push({ name: "搜索商品1" });
          } else if (Type == 3) {
            this.$router.push({
              name: "搜索商品1",
              query: { businessId: busId, expIds: expIds },
            });
          } else {
            if (sellFlag == 0) {
              Toast("The goods is not available");
            } else {
              this.$router.push({
                name: "商品详情",
                query: { skuId: skuId, activityType: shops.activityType },
              });
            }
          }
        }
      } else {
        this.couponsDataId = {
          couponId: id,
          couponDetailId: Detail,
        };
        // 调用领取优惠券
        this.availableCoupon(this.couponsDataId);
      }
    },
    // 领取优惠券
    availableCoupon(couponsId) {
      couponDrawApi(couponsId).then((res) => {
        if (res.code == 0) {
          Toast("Get the success");
          setTimeout(() => {
            if (this.active == 0) {
              // 清空数据，重新加载
              this.refreshCoupon();
              this.onLoad();
            }
          }, 1000);
        } else if (res.code == 25 || res.code == 26) {
          setTimeout(() => {
            Toast("The coupon has been collected");
          }, 500);
        } else {
          this.$toast.clear();
        }
      });
    },
    // 删除使用优惠券
    async usedDel(delId) {
      let delIds = {
        drawId: delId,
      };
      couponRemoveApi(delIds).then((res) => {
        if (res.code == 0) {
          Toast("Delete the success");
          // 清空数据，重新加载
          this.refreshCoupon();
          this.onLoad();
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
          font-size: 25px;
          font-weight: bold;
          color: #fa5300;
        }
        .youhuiquan-left-money {
          padding-top: 10px;
          padding-bottom: 20px;
          font-size: 60px;
          font-weight: bold;
          color: #fa5300;
          i {
            font-size: 25px;
            font-weight: bold;
          }
        }
        .youhuiquan-left-m {
          font-size: 20px;
          color: #333;
          line-height: 30px;
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
          padding-top: 40px;
          font-size: 24px;
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