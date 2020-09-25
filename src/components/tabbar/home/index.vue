<!--
 * @Author: zlj
 * @Date: 2020-07-18 17:45:35
 * @LastEditTime: 2020-08-31 14:38:35
 * @LastEditors: 曹建勇
 * @Description: 添加优惠券userPopup
 * @FilePath: \app-en\src\components\tabbar\home\index.vue
--> 

<template>
  <!-- 首页 -->
  <div class="home">
    <search-header></search-header>
    <scroll
      class="bscroll-wrapper"
      ref="wrapper"
      :data="recordGroup"
      :pullup="pullup"
      @pullup="_pullup"
      :pulldown="pulldown"
      @pulldown="_pulldown"
      :scrollX="true"
    >
      <div>
        <div class="commodity-swipe" v-if="topBananerList.length > 0">
          <van-swipe
            @change="onChange"
            :stop-propagation="false"
            :autoplay="2000"
            :initial-swipe="swipeIndex"
          >
            <van-swipe-item
              v-for="(banner, index) in topBananerList"
              :key="index"
              @click="swipeClick(banner)"
            >
              <div class="w1">
                <img v-lazy="$webUrl + banner.advertImg" />
              </div>
            </van-swipe-item>
            <div class="custom-indicator" slot="indicator">
              {{ current + 1 }}/{{ leng }}
            </div>
          </van-swipe>
        </div>
        <!-- 限时抢购先隐藏 -->
        <!-- <div class="flash-sale pl-30 box" v-if="false">
          <div class="flash-sale-1">
            <span class="put-line"></span>
            <span class="t1">限时</span>
            <span class="t2">抢购</span>
          </div>
          <div class="flash-sale-2">
            <div class="pictures">
              <div
                class="p1"
                v-for="(i,index) in 4"
                :key="index"
                @click="$router.push({name:'商品详情'})"
              >
                <img src="@/assets/img/tabbar/home/01@3x.png" />
                <span class="good-name">OG法式连衣裙</span>
                <br />
                <span class="good-price1">¥99.00</span>
                <br />
                <span class="good-price2">¥199.00</span>
              </div>
            </div>
          </div>
          <div class="jump-btn-con">
            <van-button type="primary" size="large" class="jump-btn" @click="jumpRouter('限时抢购')">
              <span>进入主会场</span>
              <span class="jump-btn-icon"></span>
            </van-button>
          </div>
        </div>-->
        <!-- 精品推荐 -->
        <div class="good-recommend box">
          <div class="flash-sale-1">
            <span class="put-line"></span>
            <span class="t1">Selectives</span>
            <!-- <span class="t2">查看更多</span> -->
          </div>
          <div class="flash-sale-2">
            <div class="pictures">
              <div
                class="p1"
                v-for="finework in homeObj.producteFineWorkpro"
                :key="finework.skuId"
              >
                <img
                  v-lazy="$webUrl + finework.imgUrl"
                  @click="toDetail(finework.skuId, finework)"
                />
                <div class="good-name clamp-2">{{ finework.supplyTitle }}</div>
                <span class="good-price1"
                  >{{ jn
                  }}{{
                    finework.discountPrice == null
                      ? finework.salePrice
                      : finework.discountPrice
                  }}</span
                >
                <br />
              </div>
            </div>
          </div>
        </div>
        <!-- 特价清仓 -->
        <div class="good-Clearance box" v-if="clear_list.length != 0">
          <div class="flash-sale-1 flex flex_space">
            <div class="flex">
              <span class="put-line"></span>
              <span class="t1">Clearance Sale</span>
              <span class="desc ml_20" v-show="!isExit">
                <!-- 特价时间 -->
                <count-down model="timer" :end-time="clear_one">
                  <template v-slot="time"
                    >Starts at
                    {{
                      parseInt(time.restCount / 3600) > 10
                        ? parseInt(time.restCount / 3600)
                        : "0" + parseInt(time.restCount / 3600)
                    }}:{{
                      parseInt((time.restCount % 3600) / 60) > 10
                        ? parseInt((time.restCount % 3600) / 60)
                        : "0" + parseInt((time.restCount % 3600) / 60)
                    }}:{{
                      parseInt(time.restCount % 60) > 10
                        ? parseInt(time.restCount % 60)
                        : "0" + parseInt(time.restCount % 60)
                    }}</template
                  >
                </count-down>
              </span>
            </div>
            <div class="flex" @click="toClearance">
              <span class="t2">More</span>
              <van-icon name="arrow" />
            </div>
          </div>
          <div class="flash-sale-2">
            <div
              class="flex goods_items flex_start"
              v-for="item in clear_list"
              :key="item.skuId"
              @click="
                $router.push({
                  name: '商品详情',
                  query: {
                    skuId: item.skuId,
                    activityId: item.activityId,
                    supplyId: item.supplyId,
                    activityType: item.activityType,
                    activityState: item.activityState,
                  },
                })
              "
            >
              <img class="goods_img" v-lazy="$webUrl + item.skuImg" />
              <div class="flex_col w100">
                <div class="good-name line2">{{ item.skuName }}</div>
                <div class="flex_end">
                  <span
                    class="goods_discount"
                    :class="{ on_fb: item.activityState === 1 }"
                    >{{
                      ((1 - item.activityPrice / item.salePrice) * 100).toFixed(
                        0
                      )
                    }}% off</span
                  >
                </div>
                <div>
                  <span
                    class="goods_price"
                    :class="{ on_fc: item.activityState === 1 }"
                    >{{ jn }}{{ item.activityPrice }}</span
                  >
                  <span class="goods_dis_price"
                    >{{ jn }}{{ item.salePrice.toFixed(0) }}</span
                  >
                </div>
                <span
                  class="goods_btn flex_center2"
                  v-if="item.activityState === 0"
                  >Not started</span
                >
                <span
                  class="goods_btn on_fb flex_center2"
                  v-if="item.activityState === 1"
                  >Buy now</span
                >
              </div>
            </div>
          </div>
        </div>
        <div class="good-world box">
          <div class="flash-sale-1">
            <span class="put-line"></span>
            <span class="t1">Global Brands</span>
            <!-- <span class="t2">查看更多</span> -->
          </div>
          <div class="good-world-brand">
            <div class="brand-p-1">
              <img
                v-lazy="$webUrl + brandLogo1.brandLogo"
                class="brand-p-1-left"
                @click="toSearOne(brandLogo1.brandId, 'brandId')"
              />
              <img
                v-lazy="$webUrl + brandLogo2.brandLogo"
                class="brand-p-1-right-top"
                @click="toSearOne(brandLogo2.brandId, 'brandId')"
              />
              <img
                v-lazy="$webUrl + brandLogo3.brandLogo"
                class="brand-p-1-right-bottom"
                @click="toSearOne(brandLogo3.brandId, 'brandId')"
              />
            </div>
            <div class="brand-p-2">
              <img
                v-lazy="$webUrl + globalPro.brandLogo"
                v-for="(globalPro, index) in globalProList"
                :key="index"
                @click="toSearOne(globalPro.brandId, 'brandId')"
              />
            </div>
          </div>
        </div>
        <div class="good-world-best">
          <div class="flash-sale-1">
            <span class="put-line"></span>
            <span class="t1">Hot Sales</span>
            <!-- <span class="t2">查看更多</span> -->
          </div>
          <div class="flash-sale-2">
            <div class="pictures">
              <div
                class="good-world-best-p1"
                :class="'cximg' + (index + 1)"
                v-for="(fineSale1, index) in fineSaleList1"
                :key="index"
              >
                <img
                  v-lazy="$webUrl + fineSale1.imgUrl"
                  @click="toDetail(fineSale1.skuId, fineSale1)"
                />
                <div class="good-name">{{ fineSale1.supplyTitle }}</div>
                <span class="good-price"
                  >{{ jn
                  }}{{
                    fineSale1.discountPrice
                      ? fineSale1.discountPrice
                      : fineSale1.salePrice
                  }}</span
                >
              </div>
            </div>
          </div>
        </div>
        <div class="banner" @click="swipeClick(banner1)">
          <img v-lazy="$webUrl + banner1.advertImg" />
        </div>
        <div class="exhibition">
          <div class="flash-sale-2">
            <div class="pictures">
              <div
                class="p1"
                v-for="fineSale2 in fineSaleList2"
                :key="fineSale2.skuId"
              >
                <img
                  v-lazy="$webUrl + fineSale2.imgUrl"
                  @click="toDetail(fineSale2.skuId, fineSale2)"
                />
                <span class="good-name clamp-2">{{
                  fineSale2.supplyTitle
                }}</span>
                <br />
                <span class="good-price1"
                  >{{ jn
                  }}{{
                    fineSale2.discountPrice
                      ? fineSale2.discountPrice
                      : fineSale2.salePrice
                  }}</span
                >
                <br />
              </div>
            </div>
          </div>
        </div>
        <div class="banner" @click="swipeClick(banner2)">
          <img v-lazy="$webUrl + banner2.advertImg" />
        </div>
        <div class="good-popular box">
          <div class="flash-sale-1">
            <span class="put-line"></span>
            <span class="t1">Hot</span>
            <!-- <span class="t2">查看更多</span> -->
          </div>
          <div class="good-popular-top">
            <div
              class="good-popular-top-1"
              v-for="category in homeObj.producteFinecategory"
              :key="category.categoryId"
              @click="toSearOne(category.categoryId, 'categoryId')"
            >
              <img v-lazy="$webUrl + category.categoryImg" />
            </div>
          </div>
        </div>
        <div class="banner" @click="swipeClick(banner3)">
          <img v-lazy="$webUrl + banner3.advertImg" />
        </div>
        <div class="good-sort">
          <van-tabs
            v-model="active"
            title-active-color="#FA5300"
            title-inactive-color="#000"
            @change="changeTab(bottomTabs, $event)"
          >
            <van-tab v-for="(tab, index) in bottomTabs" :key="index">
              <div slot="title">
                <span class="primary">{{ tab.classNameEng }}</span>
              </div>
            </van-tab>
          </van-tabs>
          <div class="footer-exhibition">
            <div class="exhibition-con">
              <div
                class="exhibition-left"
                v-for="(searchgoodDao, index) in searchgoodDaolist"
                :key="index"
              >
                <div
                  class="exhibition-img"
                  @click="toDetail(searchgoodDao.skuId, searchgoodDao)"
                >
                  <div class="shouwan" v-if="!searchgoodDao.canSalesNum">
                    Out of Stock
                  </div>
                  <img v-lazy="$webUrl + searchgoodDao.imgUrl" />
                </div>
                <div class="produced">
                  <span class="icon" v-if="searchgoodDao.expId == 1">
                    <img v-lazy="$webUrl + '/common/image/zhiyou.png'" />
                  </span>
                  <span class="icon" v-else>
                    <img v-lazy="$webUrl + searchgoodDao.locationUrl" />
                  </span>
                  <span class="produced-font" v-if="searchgoodDao.expId == 1">
                    <span>Ships from</span>
                    <span>{{
                      searchgoodDao.areaNameEng ? searchgoodDao.areaNameEng : ""
                    }}</span>
                  </span>
                  <span class="produced-font" v-else>
                    <span>{{
                      searchgoodDao.locationNameEng
                        ? searchgoodDao.locationNameEng
                        : ""
                    }}</span>
                  </span>
                </div>
                <div class="clamp-2 miaoshu">
                  <!-- 活动清仓标识列表 -->
                  <!-- <span>{{((1-(searchgoodDao.activityPrice/searchgoodDao.salePrice))*100).toFixed(0)}}%</span> -->
                  <span
                    v-if="searchgoodDao.activityId"
                    class="clamp_clear"
                    :class="{
                      clear_sale: searchgoodDao.activityType == 0,
                      clear_saon: searchgoodDao.activityType == 1,
                    }"
                    >Promotion Sale</span
                  >
                  {{ searchgoodDao.supplyTitle }}
                </div>
                <div class="score">
                  <!-- 评分星 -->
                  <!-- <van-rate v-model="searchgoodDao.starNumber" readonly color="#FA5300" /> -->
                  <!-- <span>477</span> -->
                </div>
                <div class="price">
                  <span class="price1"
                    >{{ jn
                    }}{{
                      searchgoodDao.discountPrice
                        ? searchgoodDao.discountPrice
                        : searchgoodDao.salePrice
                    }}</span
                  >
                  <span class="price2" v-if="searchgoodDao.discountPrice"
                    >{{ jn }}{{ searchgoodDao.salePrice }}</span
                  >
                  <!-- <span class="poin">...</span> -->
                  <span class="fl-right" style="color: red"
                    >Sales:{{
                      searchgoodDao.skuSalesNum ? searchgoodDao.skuSalesNum : 0
                    }}PCS</span
                  >
                </div>
                <!-- <div>Sales:{{searchgoodDao.skuSalesNum ? searchgoodDao.skuSalesNum : 0}}PCS</div> -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </scroll>

    <!-- 新用户弹框 -->
    <user-popup
      :sale="sale"
      :newCoupon="newCoupon"
      @userPopUp="userPopUp"
      @evBus="evBus"
    ></user-popup>
  </div>
</template>

<script>
import userPopup from "@/multiplexing/userCouponPop";
import searchHeader from "@/multiplexing/searchHeader";
import {
  homePageApi,
  HomePagebottomApi,
  homeAdvertPictureApi,
  APPgetuserIsfullApi,
  gethomeClearanceList,
} from "@/api/home/index.js";
import { getuserinfoApi } from "@/api/accountSettings/index";
import { couponDrawApi } from "@/api/confirmOrder/index";
import { Toast } from "vant";
export default {
  props: {},
  data() {
    return {
      swipeIndex: 0,
      active: 0,
      homeObj: {},
      globalProList: [],
      fineSaleList1: [],
      fineSaleList2: [],
      brandLogo1: {
        brandLogo: "",
        brandId: 0,
      },
      brandLogo2: {
        brandLogo: "",
        brandId: 0,
      },
      brandLogo3: {
        brandLogo: "",
        brandId: 0,
      },
      formData: {
        brandId: 0,
        categoryId: 0,
        limit: 10,
        page: 1,
        seraname: "",
        sort: 0,
      },
      bottomTabs: [],
      searchgoodDaolist: [],
      current: 0,
      leng: 1,
      recordGroup: [],
      pullup: true,
      pulldown: true,
      guanmengou: true,
      codeUrl: "",
      topBananerList: [],
      banner1: {
        advertImg: "",
      },
      banner2: {
        advertImg: "",
      },
      banner3: {
        advertImg: "",
      },
      newCouponShow: "", //判断是否为新用户是否展示
      newCoupon: {},
      sale: false, //新用户是否存在
      clear_list: [],
      isExit: false,
      clear_one: "", //特价 倒计时
    };
  },
  computed: {},
  created() {
    // FB.getLoginStatus(function (response) {
    //   console.log("created -> response", response);
    //   statusChangeCallback(response);
    // });
    this.newCoupons();
    if (this.$route.query.token && this.$route.query.token != "undefined") {
      localStorage.token = this.$route.query.token;
      this.getuserinfo();
    }
    if (localStorage.homeObj) {
      this.homeObj = this.$fn.MyLocalStorage.Cache.get("homeObj");
      if (!this.homeObj) {
        this.homePage();
      } else {
        this.globalProList = this.homeObj["producteFineBrand"].slice(3);
        this.brandLogo1.brandLogo = this.homeObj[
          "producteFineBrand"
        ][0].brandLogo;
        this.brandLogo1.brandId = this.homeObj["producteFineBrand"][0].brandId;
        this.brandLogo2.brandLogo = this.homeObj[
          "producteFineBrand"
        ][1].brandLogo;
        this.brandLogo2.brandId = this.homeObj["producteFineBrand"][1].brandId;
        this.brandLogo3.brandLogo = this.homeObj[
          "producteFineBrand"
        ][2].brandLogo;
        this.brandLogo3.brandId = this.homeObj["producteFineBrand"][2].brandId;
        this.fineSaleList1 = this.homeObj["productFineSale"].slice(0, 3);
        this.fineSaleList2 = this.homeObj["productFineSale"].slice(3);
      }
    } else {
      this.homePage();
    }
    this.getClear();
    this.homeAdvertPicture();
  },
  beforeRouteLeave(to, from, next) {
    // 设置下一个路由的 meta
    if (to.name == "搜索商品1") {
      to.meta.isBack = true;
    }
    next();
  },
  mounted() {
    this.refreshOrder();
  },
  watch: {},
  methods: {
    // 首页新用户优惠券
    newCoupons() {
      APPgetuserIsfullApi().then((res) => {
        // this.newCouponShow = res.code;
        if (res.code == 0) {
          let userNews = res.Data;
          if (userNews != null) {
            this.newCoupon = res.Data;
            this.sale = true;
          }
        } else {
          this.sale = false;
          this.$toast.clear();
        }
      });
    },
    // 关闭首页优惠券
    userPopUp() {
      this.sale = false;
    },
    // 领取优惠按钮
    evBus(id) {
      couponDrawApi(id).then((res) => {
        Toast("Get the success");
      });
    },
    jumpRouter(name) {
      this.$router.push({ name });
    },
    //首页数据
    homePage(data) {
      homePageApi(data).then((res) => {
        if (res.code == 0) {
          this.homeObj = res.Data;
          this.globalProList = this.homeObj["producteFineBrand"].slice(3);
          this.brandLogo1.brandLogo = this.homeObj[
            "producteFineBrand"
          ][0].brandLogo;
          this.brandLogo1.brandId = this.homeObj[
            "producteFineBrand"
          ][0].brandId;
          this.brandLogo2.brandLogo = this.homeObj[
            "producteFineBrand"
          ][1].brandLogo;
          this.brandLogo2.brandId = this.homeObj[
            "producteFineBrand"
          ][1].brandId;
          this.brandLogo3.brandLogo = this.homeObj[
            "producteFineBrand"
          ][2].brandLogo;
          this.brandLogo3.brandId = this.homeObj[
            "producteFineBrand"
          ][2].brandId;
          this.fineSaleList1 = this.homeObj["productFineSale"].slice(0, 3);
          this.fineSaleList2 = this.homeObj["productFineSale"].slice(3);

          let time = 60 * 60 * 24 * 2; //2天
          this.$fn.MyLocalStorage.Cache.put("homeObj", this.homeObj, time);
        }
      });
    },
    //底部数据分类
    homePagebottom(data, flag) {
      HomePagebottomApi(data).then((res) => {
        if (res.code == 0) {
          this.bottomTabs = res.top;

          if (flag) {
            this.searchgoodDaolist = this.searchgoodDaolist.concat(
              res.Data.searchgoodDaolist
            );
          } else {
            this.searchgoodDaolist = res.Data.searchgoodDaolist;
          }
          this.totalCount = res.Data.total;
          this.recordGroup = this.searchgoodDaolist;
          if (this.searchgoodDaolist.length > 0) {
            if (this.searchgoodDaolist.length >= this.totalCount) {
              this.pullup = false;
            }
          } else {
            this.pullup = false;
          }
        }
      });
    },
    //tab切换
    changeTab(list, index) {
      this.formData.categoryId = list[index].categoryId;
      this.refreshOrder();
    },
    //轮播
    onChange(index) {
      this.current = index;
      setTimeout(() => {
        this.swipeIndex = index;
      }, 300);
    },
    //上拉加载
    _pullup() {
      if (!this.pullup) return;
      //不知道为什么触发两次,使用关门狗拦截
      if (this.guanmengou) {
        this.formData.page++;
        this.homePagebottom(this.formData, true);
        this.guanmengou = false;
      }
      setTimeout(() => {
        this.guanmengou = true;
      }, 500);
    },
    //下拉刷新
    _pulldown() {
      setTimeout(() => {
        this.homePage();
        this.refreshOrder();
      }, 500);
    },
    //刷新页面
    refreshOrder() {
      this.formData.page = 1;
      this.formData.limit = 10;
      this.homePagebottom(this.formData);
      this.pullup = true;
    },
    //跳转商品详情
    toDetail(skuid, overall) {
      // 活动清仓根据activityId,supplyId,activityType,activityState
      this.$router.push({
        name: "商品详情",
        query: {
          skuId: skuid,
          activityId: overall.activityId,
          supplyId: overall.supplyId,
          activityType: overall.activityType,
          activityState: overall.activityState,
        },
      });
    },
    //去到搜索里面
    toSearOne(id, type) {
      if (type == "categoryId") {
        this.$router.push({ name: "搜索商品1", query: { categoryId: id } });
      } else if (type == "brandId") {
        this.$router.push({ name: "搜索商品1", query: { brandId: id } });
      }
    },
    //首页广告
    homeAdvertPicture() {
      homeAdvertPictureApi().then((res) => {
        if (res.code == 0) {
          this.topBananerList = res.Data.slideShow;
          this.leng = this.topBananerList.length;
          this.banner1 = res.Data.newHouse[0]
            ? res.Data.newHouse[0]
            : { advertImg: "" };
          this.banner2 = res.Data.newHouse[1]
            ? res.Data.newHouse[1]
            : { advertImg: "" };
          this.banner3 = res.Data.newHouse[2]
            ? res.Data.newHouse[2]
            : { advertImg: "" };
        }
      });
    },
    //点击轮播图
    swipeClick(el) {
      if (!el.linkUrl) return;
      window.location.href = el.linkUrlEng;
    },
    //获取用户信息
    getuserinfo() {
      getuserinfoApi().then((res) => {
        if (res.code == 0) {
          localStorage.userinfoShop = JSON.stringify(res.user);
        }
      });
    },
    // 去特价清仓页面
    toClearance() {
      this.$router.push({ name: "特价清仓" });
    },
    // 获取特价清仓数据
    getClear() {
      gethomeClearanceList({ isHome: 1 }).then((res) => {
        if (res.code == 0) {
          this.clear_list = res.Data.list;
          //   特价时间
          this.clear_one = this.clear_list[0].activityBegin;
          this.isExit = res.IsConcat;
        }
      });
    },
  },
  components: {
    searchHeader,
    userPopup,
  },
};
</script>

<style scoped lang="less">
.bscroll-wrapper {
  height: calc(100vh - 90px - 100px);
}
.w100 {
  width: 100%;
}

.home {
  position: relative;
  overflow: hidden;
  .good-Clearance {
    .active_color {
      color: #f95300 !important;
    }
    .active_bg {
      background-color: #f95300 !important;
    }
    padding: 30px;
    .flash-sale-1 {
      height: 50px;
      line-height: 50px;
      .put-line {
        width: 6px;
        height: 40px;
        background-color: #fa5300;
        top: 5px;
      }
      .t1 {
        font-size: 30px;
        color: #333;
        margin-left: 13px;
        margin-right: 14px;
      }
      .desc {
        font-size: 24px;
        font-weight: 500;
        color: rgba(0, 165, 111, 1);
      }
      .t2 {
        font-size: 24px;
        font-weight: bold;
        color: #333;
        margin-right: 10px;
      }
    }
    .flash-sale-2 {
      background-color: #fff;
      border-radius: 10px;
      margin-top: 20px;
      .goods_items {
        padding: 30px 20px;
        border-bottom: 1px solid #eee;
        .goods_img {
          min-width: 200px;
          width: 200px;
          height: 200px;
          margin-right: 16px;
        }
        .goods_discount {
          margin-top: 18px;
          padding: 5px 17px;
          font-weight: 500;
          color: rgba(255, 255, 255, 1);
          background: rgba(0, 165, 111, 1);
          font-size: 20px;
          border-radius: 13px;
        }
        .goods_price {
          font-size: 40px;
          color: #00a56f;
          font-weight: 500;
        }
        .goods_dis_price {
          font-size: 20px;
          font-weight: 300;
          text-decoration: line-through;
          color: rgba(101, 101, 101, 1);
          margin-left: 12px;
        }
        .goods_btn {
          width: 200px;
          margin-top: 20px;
          padding: 14px 24px;
          font-size: 30px;
          font-weight: bold;
          color: rgba(255, 255, 255, 1);
          background: rgba(0, 165, 111, 1);
          border-radius: 26px;
        }
        &:last-child {
          border-bottom: none;
        }
      }
    }
  }
  .commodity-swipe {
    margin: 7px 0 40px;
    .custom-indicator {
      position: absolute;
      bottom: 20px;
      right: 30px;
      width: 60px;
      height: 40px;
      background: rgba(153, 153, 153, 1);
      border-radius: 20px;
      text-align: center;
      line-height: 40px;
      font-size: 22px;
      color: #fffefe;
    }
    .w1 {
      height: 320px;
    }
  }
  .flash-sale {
    width: 100%;
    height: 472px;
    vertical-align: text-top;
    .flash-sale-1 {
      position: relative;
      .put-line {
        width: 6px;
        height: 40px;
        background-color: #fa5300;
        display: inline-block;
        position: relative;
        top: 5px;
      }
      .t1 {
        font-size: 30px;
        color: #333;
        margin-right: 20px;
      }
      .t2 {
        font-size: 30px;
        color: #333;
        display: inline-block;
        position: relative;
        &:after {
          content: " ";
          position: absolute;
          left: -15px;
          top: 10px;
          width: 6px;
          height: 6px;
          background-color: #333;
          border-radius: 6px;
        }
      }
      .t3 {
        position: absolute;
        top: 20px;
        right: 145px;
        font-size: 24px;
        color: #666;
      }
      .van-count-down {
        display: inline-block;
        position: absolute;
        top: 20px;
        right: 25px;
      }
    }
    .flash-sale-2 {
      width: 100%;
      height: 300px;
      margin-top: 17px;
      overflow: scroll;
      .pictures {
        height: 210px;
        width: 1000px;
        .p1 {
          width: 200px;
          height: 210px;
          display: inline-block;
          margin-right: 11px;
          text-align: center;
          .good-name {
            font-size: 20px;
            color: #333333;
          }
          .good-price1 {
            display: inline-block;
            color: #fa5300;
            font-size: 24px;
            margin-top: 8px;
          }
          .good-price2 {
            display: inline-block;
            color: #666;
            font-size: 16px;
            margin-top: 10px;
          }
        }
      }
    }
    .jump-btn-con {
      margin-top: 10px;
      margin-right: 30px;
      .jump-btn {
        height: 50px;
        background-color: #fff;
        color: #333333;
        font-size: 24px;
        font-weight: bold;
        border: none;
        .jump-btn-icon {
          display: inline-block;
          width: 11px;
          height: 16px;
          background: url("~@/assets/img/tabbar/home/Enter@3x.png");
          background-size: 100%;
          margin-left: 11px;
        }
      }
    }
  }
  .good-recommend {
    width: 100%;
    padding: 0 30px;
    margin-bottom: 40px;
    .flash-sale-1 {
      position: relative;
      height: 50px;
      line-height: 50px;
      .put-line {
        width: 6px;
        height: 40px;
        background-color: #fa5300;
        display: inline-block;
        position: relative;
        top: 5px;
      }
      .t1 {
        font-size: 30px;
        color: #333;
        margin-right: 20px;
      }
      .t2 {
        float: right;
        font-size: 20px;
        color: #666;
      }
    }
    .flash-sale-2 {
      width: 100%;
      margin-top: 17px;
      .pictures {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        .p1 {
          display: inline-block;
          margin-right: 5px;
          text-align: center;
          flex: 1;
          background-color: #fff;
          padding-bottom: 24px;
          box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.2);
          img {
            width: 220px;
            height: 220px;
          }
          .good-name {
            font-size: 20px;
            color: #333333;
            margin-top: 9px;
            height: 40px;
          }
          .good-price1 {
            display: inline-block;
            color: #fa5300;
            font-size: 20px;
            margin-top: 14px;
          }
        }
      }
    }
  }
  .good-world {
    width: 100%;
    height: 600px;
    padding: 0 30px;
    .flash-sale-1 {
      position: relative;
      height: 50px;
      line-height: 50px;
      .put-line {
        width: 6px;
        height: 40px;
        background-color: #fa5300;
        display: inline-block;
        position: relative;
        top: 5px;
      }
      .t1 {
        font-size: 30px;
        color: #333;
        margin-right: 20px;
      }
      .t2 {
        float: right;
        font-size: 20px;
        color: #666;
      }
      .t3 {
        position: absolute;
        top: 20px;
        right: 145px;
        font-size: 24px;
        color: #666;
      }
      .van-count-down {
        display: inline-block;
        position: absolute;
        top: 20px;
        right: 25px;
      }
    }
    .good-world-brand {
      height: 550px;
      width: 100%;
      margin-top: 17px;
      .brand-p-1 {
        width: 100%;
        height: 340px;
        .brand-p-1-left {
          width: 340px;
          height: 340px;
          float: left;
          margin-right: 10px;
        }
        .brand-p-1-right-top {
          width: 340px;
          height: 165px;
          float: left;
        }
        .brand-p-1-right-bottom {
          width: 340px;
          height: 165px;
          float: left;
          margin-top: 10px;
        }
      }
      .brand-p-2 {
        // width: 100%;
        height: 80px;
        margin-top: 10px;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: space-between;
        img {
          width: 165px;
          height: 80px;
          margin-right: 3px;
          &:last-child {
            margin-right: 0;
          }
        }
      }
    }
  }
  .good-world-best {
    margin-bottom: 40px;
    padding: 0 30px;
    .flash-sale-1 {
      position: relative;
      .put-line {
        width: 6px;
        height: 40px;
        background-color: #fa5300;
        display: inline-block;
        position: relative;
        top: 5px;
      }
      .t1 {
        font-size: 30px;
        color: #333;
        margin-right: 20px;
      }
      .t2 {
        position: absolute;
        top: 20px;
        right: 30px;
        font-size: 20px;
        color: #666;
      }
    }
    .flash-sale-2 {
      width: 100%;
      margin-top: 17px;
      .pictures {
        background-color: #f7e8c7;
        padding: 24px 24px 20px;
        .good-world-best-p1 {
          padding: 45px 0 16px;
          width: 200px;
          display: inline-block;
          text-align: center;
          margin-right: 21px;
          background-color: #f2f3f5;
          position: relative;
          &:last-child {
            margin-right: 0;
          }
          img {
            width: 175px;
            height: 175px;
          }
          .good-name {
            padding: 0 12px;
            height: 29px;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            overflow: hidden;
            margin: 10px 0 14px;
            color: #000;
            font-size: 14px;
          }
          .good-price {
            font-size: 16px;
            color: #f83600;
          }
        }
      }
    }
  }
  .banner {
    width: 100%;
    height: 250px;
  }
  .exhibition {
    padding: 16px 30px 40px;
    background-color: #fff;
    .flash-sale-2 {
      .pictures {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        .p1 {
          width: 166px;
          display: inline-block;
          margin-right: 5px;
          text-align: center;
          img {
            width: 166px;
            height: 166px;
          }
          .good-name {
            font-size: 20px;
            color: #333333;
            margin-top: 9px;
          }
          .good-price1 {
            display: inline-block;
            color: #f83600;
            font-size: 20px;
          }
        }
      }
    }
  }
  .good-popular {
    width: 100%;
    height: 462px;
    padding: 0 30px;
    .flash-sale-1 {
      position: relative;
      height: 50px;
      line-height: 50px;
      .put-line {
        width: 6px;
        height: 40px;
        background-color: #fa5300;
        display: inline-block;
        position: relative;
        top: 5px;
      }
      .t1 {
        font-size: 30px;
        color: #333;
        margin-right: 20px;
      }
      .t2 {
        float: right;
        font-size: 20px;
        color: #666;
      }
    }
    .good-popular-top {
      width: 100%;
      height: 170px;
      margin: 19px 0 10px;
      position: relative;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: space-between;
      .good-popular-top-1 {
        width: 340px;
        height: 170px;
        position: relative;
        margin-bottom: 10px;
      }
    }
    .good-popular-bottom {
      margin: 0px;
    }
  }
  .good-sort {
    width: 100%;
    // height: 1619px;
    box-sizing: border-box;
    padding-top: 20px;
    /deep/ .van-tabs {
      .van-tabs__wrap {
        min-height: 100px;
        .van-tab {
          // line-height: 88px;
          .van-tab__text {
            white-space: pre-wrap;
          }
        }
        .primary {
          font-size: 34px;
        }
      }
    }
    .footer-exhibition {
      width: 100%;
      box-sizing: border-box;
      padding: 0 30px;
      overflow: hidden;
      margin-top: 20px;
      .exhibition-con {
        width: 100%;
        margin-bottom: 10px;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: space-between;
      }
      .exhibition-left {
        width: 340px;
        height: 540px;
        float: left;
        background-color: #fff;
        margin-bottom: 20px;
        position: relative;
        .exhibition-img {
          position: relative;
          .shouwan {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.5);
            color: #fff;
            font-size: 30px;
            line-height: 40px;
            text-align: center;
            display: flex;
            align-items: center;
            justify-content: space-around;
            flex-direction: column;
            z-index: 10;
          }
        }
        .miaoshu {
          //   line-height: 32px;
          font-size: 18px;
          height: 60px;

          .clamp_clear {
            padding: 4px 10px;
            color: #fff;
            border-radius: 15px;
          }
          .clear_sale {
            background: #00a670 !important;
          }
          .clear_saon {
            background: #fa5400 !important;
          }
        }
        img {
          width: 340px;
          height: 340px;
        }
        .icon {
          position: relative;
          top: 8px;
          img {
            width: 30px;
            height: 30px;
            margin-left: 10px;
          }
        }
        .produced {
          height: 50px;
          // margin-bottom: 18px;
          .produced-font {
            color: #db9000;
            margin-left: 10px;
          }
        }
        .score {
          margin: 10px 0 20px;
          .van-rate {
            margin-right: 8px;
          }
        }
        .price {
          position: relative;
          margin-bottom: 14px;
          .price1 {
            font-size: 28px;
            color: #fa5300;
            margin-right: 11px;
          }
          .price2 {
            font-size: 18px;
            color: #666666;
            text-decoration: line-through;
          }
          .poin {
            position: absolute;
            font-size: 60px;
            top: -35px;
            right: 0;
          }
        }
        .sales-num {
          font-size: 24px;
          margin-top: 10px;
        }
      }
    }
  }
}
.pl-30 {
  padding-left: 30px;
}
.box {
  box-sizing: border-box;
}
.pictures(@counter) when (@counter < 4 ) {
  .cximg@{counter} {
    &:after {
      content: " ";
      position: absolute;
      left: 0px;
      top: -10px;
      width: 49px;
      height: 44px;
      background: url("~@/assets/img/tabbar/home/NO.@{counter}@3x.png")
        no-repeat center;
      background-size: 100%;
    }
  }
  .pictures((@counter + 1)); // 递归调用自身
}
.pictures(1);
</style>
