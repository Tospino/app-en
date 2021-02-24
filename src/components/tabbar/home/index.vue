<!--
 * @Author: zlj
 * @Date: 2020-07-18 17:45:35
 * @LastEditTime: 2021-02-24 19:50:27
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
              @click="swipeClick(banner, index)"
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
                v-for="(finework, index) in homeObj.producteFineWorkpro"
                :key="finework.skuId"
              >
                <img
                  v-lazy="$webUrl + finework.imgUrl"
                  @click="toDetail(finework.skuId, finework, 'finework', index)"
                />
                <div class="good-name clamp-2">
                  <span
                    v-if="finework.activityType == 1"
                    class="clamp_clear"
                    :class="{
                      clear_sale:
                        finework.activityState === 0 &&
                        finework.activityTagApp != null &&
                        finework.activityTagApp != '',
                      clear_saon:
                        finework.activityState == 1 &&
                        finework.activityTagApp != null &&
                        finework.activityTagApp != '',
                      clear_th:
                        finework.activityState == 2 &&
                        finework.activityTagApp != null &&
                        finework.activityTagApp != '',
                    }"
                    >{{ finework.activityTagApp }}</span
                  >
                  {{ finework.supplyTitle }}
                </div>
                <span class="good-price1">
                  {{ jn
                  }}{{
                    finework.discountPrice == null
                      ? finework.salePrice
                      : finework.discountPrice
                  }}
                </span>
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
              <span class="desc ml_20" v-show="isExit == 0">
                <!-- 特价时间 -->
                <count-down model="timer" :end-time="clear_one">
                  <template v-slot="time">
                    Starts at
                    {{
                      parseInt(time.restCount / 3600) > 9
                        ? parseInt(time.restCount / 3600)
                        : "0" + parseInt(time.restCount / 3600)
                    }}:{{
                      parseInt((time.restCount % 3600) / 60) > 9
                        ? parseInt((time.restCount % 3600) / 60)
                        : "0" + parseInt((time.restCount % 3600) / 60)
                    }}:{{
                      parseInt(time.restCount % 60) > 9
                        ? parseInt(time.restCount % 60)
                        : "0" + parseInt(time.restCount % 60)
                    }}
                  </template>
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
              v-for="(item, indx) in clear_list"
              :key="indx"
              @click="
                $router.push({
                  name: '商品详情',
                  query: {
                    skuId: item.skuId,
                    activityId: item.activityId,
                    activityType: item.activityType,
                  },
                })
              "
            >
              <img class="goods_img" v-lazy="$webUrl + item.skuImg" />
              <img
                src="@/assets/img/tabbar/home/clearsale/saleout.png"
                class="goods_sale"
                v-show="item.activityState === 2"
                alt
                srcset
              />
              <div class="flex_col w100">
                <div class="good-name line2">{{ item.skuName }}</div>
                <div class="flex_end">
                  <span
                    class="goods_discount"
                    :class="{ pre_fb: item.activityState === 0 }"
                  >
                    <!-- parseInt((1 - item.activityPrice / item.salePrice) * 100) -->
                    {{ item.percent }}% off
                  </span>
                </div>
                <div>
                  <span
                    class="goods_price"
                    :class="{ pre_fc: item.activityState === 0 }"
                    >{{ jn }}{{ item.activityPrice }}</span
                  >
                  <span class="goods_dis_price"
                    >{{ jn }}{{ item.salePrice }}</span
                  >
                </div>
                <span
                  class="goods_btn flex_center2"
                  v-if="item.activityState === 0"
                  >Coming Soon</span
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
                @click="toSearOne(brandLogo1.brandId, 'brandId', 10)"
              />
              <img
                v-lazy="$webUrl + brandLogo2.brandLogo"
                class="brand-p-1-right-top"
                @click="toSearOne(brandLogo2.brandId, 'brandId', 11)"
              />
              <img
                v-lazy="$webUrl + brandLogo3.brandLogo"
                class="brand-p-1-right-bottom"
                @click="toSearOne(brandLogo3.brandId, 'brandId', 12)"
              />
            </div>
            <div class="brand-p-2">
              <img
                v-lazy="$webUrl + globalPro.brandLogo"
                v-for="(globalPro, index) in globalProList"
                :key="index"
                @click="toSearOne(globalPro.brandId, 'brandId', index)"
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
                  @click="
                    toDetail(fineSale1.skuId, fineSale1, 'fineSale1', index)
                  "
                />
                <div class="good-name">{{ fineSale1.supplyTitle }}</div>
                <span class="good-price">
                  {{ jn
                  }}{{
                    fineSale1.discountPrice
                      ? fineSale1.discountPrice
                      : fineSale1.salePrice
                  }}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div class="banner" @click="swipeClick(banner1)">
          <img v-lazy="$bigwebUrl + banner1.advertImg" />
        </div>
        <div class="exhibition">
          <div class="flash-sale-2">
            <div class="pictures">
              <div
                class="p1"
                v-for="(fineSale2, index) in fineSaleList2"
                :key="fineSale2.skuId"
              >
                <img
                  v-lazy="$webUrl + fineSale2.imgUrl"
                  @click="
                    toDetail(fineSale2.skuId, fineSale2, 'fineSale2', index)
                  "
                />
                <span class="good-name clamp-2">
                  {{ fineSale2.supplyTitle }}
                </span>
                <br />
                <span class="good-price1">
                  {{ jn
                  }}{{
                    fineSale2.discountPrice
                      ? fineSale2.discountPrice
                      : fineSale2.salePrice
                  }}
                </span>
                <br />
              </div>
            </div>
          </div>
        </div>
        <div class="banner" @click="swipeClick(banner2)">
          <img v-lazy="$bigwebUrl + banner2.advertImg" />
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
              v-for="(category, index) in homeObj.producteFinecategory"
              :key="category.categoryId"
              @click="toSearOne(category.categoryId, 'categoryId', index)"
            >
              <img v-lazy="$webUrl + category.categoryImg" />
            </div>
          </div>
        </div>
        <div class="banner" @click="swipeClick(banner3)">
          <img v-lazy="$bigwebUrl + banner3.advertImg" />
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
                    <!-- Out of Stock -->
                    <img
                      src="@/assets/img/tabbar/home/clearsale/saleout.png"
                      class="goods_sale"
                      v-if="
                        searchgoodDao.activityState === 2 &&
                        searchgoodDao.activityType == 1 &&
                        searchgoodDao.canSalesNum === 0
                      "
                      alt
                      srcset
                    />
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
                    <span>
                      {{
                        searchgoodDao.areaNameEng
                          ? searchgoodDao.areaNameEng
                          : ""
                      }}
                    </span>
                  </span>
                  <span class="produced-font" v-else>
                    <span>
                      {{
                        searchgoodDao.locationNameEng
                          ? searchgoodDao.locationNameEng
                          : ""
                      }}
                    </span>
                  </span>
                </div>
                <div class="clamp-2 miaoshu">
                  <!-- 活动清仓标识列表 -->
                  <!-- <span>{{((1-(searchgoodDao.activityPrice/searchgoodDao.salePrice))*100).toFixed(0)}}%</span> -->
                  <span
                    v-if="searchgoodDao.activityType == 1"
                    class="clamp_clear"
                    :class="{
                      clear_sale:
                        searchgoodDao.activityState === 0 &&
                        searchgoodDao.activityTagApp != null &&
                        searchgoodDao.activityTagApp != '',
                      clear_saon:
                        searchgoodDao.activityState == 1 &&
                        searchgoodDao.activityTagApp != null &&
                        searchgoodDao.activityTagApp != '',
                      clear_th:
                        searchgoodDao.activityState == 2 &&
                        searchgoodDao.activityTagApp != null &&
                        searchgoodDao.activityTagApp != '',
                    }"
                    >{{ searchgoodDao.activityTagApp }}</span
                  >
                  {{ searchgoodDao.supplyTitle }}
                </div>
                <div class="score">
                  <!-- 评分星 -->
                  <!-- <van-rate v-model="searchgoodDao.starNumber" readonly color="#FA5300" /> -->
                  <!-- <span>477</span> -->
                </div>
                <div class="price">
                  <span class="price1">
                    {{ jn
                    }}{{
                      searchgoodDao.discountPrice
                        ? searchgoodDao.discountPrice
                        : searchgoodDao.salePrice
                    }}
                  </span>
                  <span class="price2" v-if="searchgoodDao.discountPrice"
                    >{{ jn }}{{ searchgoodDao.salePrice }}</span
                  >
                  <!-- <span class="poin">...</span> -->
                  <span
                    class="fl-right"
                    style="color: red"
                    v-show="searchgoodDao.skuSalesNum"
                  >
                    Sales:{{
                      searchgoodDao.skuSalesNum ? searchgoodDao.skuSalesNum : 0
                    }}PCS
                  </span>
                </div>
                <!-- <div>Sales:{{searchgoodDao.skuSalesNum ? searchgoodDao.skuSalesNum : 0}}PCS</div> -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </scroll>
    <!-- 整体优惠券 -->

    <allCoupons
      ref="allCoupons"
      :isFrame="isFrame"
      :hasAggregate="hasAggregate"
      :isShowCoupon="isShowCoupon"
      :touristSum="touristSum"
      :newCoupon="newCoupon"
      :sideFrame="sideFrame"
      @memberBus="memberBus"
      @isShowBus="isShowBus"
      @waiveBackIs="waiveBackIs"
    ></allCoupons>
  </div>
</template>

<script>
import allCoupons from "@/multiplexing/allCoupons";
import searchHeader from "@/multiplexing/searchHeader";
import {
  homePageApi,
  HomePagebottomApi,
  homeAdvertPictureApi,
  queryNewgiftpackApi,
  gethomeClearanceList,
  saveuserPackApi,
} from "@/api/home/index.js";
import { getuserinfoApi } from "@/api/accountSettings/index";
import { couponDrawApi } from "@/api/confirmOrder/index";
import { Toast } from "vant";
import moment from "moment";
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
      clear_list: [],
      isExit: false,
      clear_one: "", //特价 倒计时
      clear_end: null, //结束时间
      down_time: "", //特价 倒计时刷新

      isShowCoupon: 1, //判断是否为新人券或会员券(是否领取)
      touristSum: 0, //吸引游客金额
      isFrame: false, //是否显示平台优惠券弹框
      newCoupon: [], //新用户列表
      hasAggregate: {}, //总优惠数据
      sideFrame: false, //是否显示侧边优惠弹框
      userRecordOne: false, //记录第一次进入首页的弹框
      routerRecordOne: false,
    };
  },
  computed: {},
  created() {
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
    if (to.name == "搜索商品1") {
      to.meta.isBack = true;
    }
    next();
  },
  mounted() {
    //   清仓
    let time_atc = setInterval(() => {
      //   清仓时间戳
      let clear_time = moment(this.clear_one).valueOf();
      //   结束时间
      let activityEnd = moment(this.clear_end).valueOf();
      let new_time = new Date().getTime();
      //   倒计时
      //   预热三天 259200
      if (parseInt(clear_time / 1000) - 259200 == parseInt(new_time / 1000)) {
        this.getClear();
        this._pulldown();
        this.homePagebottom(this.formData);
      }
      //   活动中
      if (parseInt(clear_time / 1000) == parseInt(new_time / 1000)) {
        this.getClear();
        this._pulldown();
        this.homePagebottom(this.formData);
      }
      //   活动结束
      if (parseInt(new_time / 1000) == parseInt(activityEnd / 1000)) {
        this.getClear();
        this._pulldown();
        this.homePagebottom(this.formData);
      }
    }, 1000);
    this.refreshOrder();
  },
  activated() {
    this.newCoupons();
  },
  watch: {
    $route: {
      handler: function (val, oldVal) {
        if (
          (val.name == "首页" && oldVal.name == "引导页") ||
          (val.name == "引导页" && oldVal.name == "登录")
        ) {
          if (this.isShowCoupon == 1) {
            this.$refs.allCoupons.isBonus = false;
          }
        }
      },
      // 深度观察监听
      deep: true,
    },
  },
  methods: {
    // 首页平台用户优惠券
    async newCoupons() {
      let newGiftpack = await queryNewgiftpackApi();
      this.hasAggregate = newGiftpack;
      // 1是游客，2 已领取 ，3 未领取 , 4 没券了已领取完
      this.isShowCoupon = newGiftpack.isReceive;
      // 1游客显示金额吸引
      this.touristSum = newGiftpack.summoney;
      // 2.新人用户显示优惠券列表
      if (newGiftpack.code == 0) {
        this.sideFrame = true;
        if (this.isShowCoupon == 2) {
          localStorage.isShowOpen = true;
          setTimeout(() => {
            this.isFrame = false;
          }, 1000);
        } else {
          this.isFrame = true;
          this.$refs.allCoupons.isShow = true;
          if (this.isShowCoupon == 1) {
            if (!localStorage.isShow) {
              this.$refs.allCoupons.isBonus = false;
              //   第一次进来
              localStorage.isShow = true;
            }
          } else {
            if (!this.userRecordOne) {
              this.$refs.allCoupons.isBonus = false;
            }
          }
        }
        if (newGiftpack.Data) {
          this.newCoupon = newGiftpack.Data;
        }
      } else if (newGiftpack.code == -300) {
        this.isFrame = false;
      }
      this.$forceUpdate();
    },
    // 新人券记录是否第一次点击弹框
    async saveuserPackNew() {
      let savePackNew = await saveuserPackApi();
      if (savePackNew.code == 0) {
        this.userRecordOne = true;
        this.newCoupons();
      }
    },
    // 领取优惠按钮
    memberBus(id) {
      if (id) {
        couponDrawApi(id).then((res) => {
          if (res.code == 0) {
            this.newCoupons();
          } else if (res.code == 25) {
            Toast("The coupon has been collected");
            // 多个页面领取后code为25 关闭弹框
            setInterval(() => {
              this.isFrame = false;
            }, 1000);
          }
        });
      }
    },
    // 关闭优惠券弹框
    isShowBus(isShow) {
      if (isShow) {
        this.isFrame = false;
      } else {
        this.isFrame = true;
      }
      this.$forceUpdate();
    },
    // (未领取)返回按钮记录第一次
    waiveBackIs() {
      if (this.isShowCoupon == 3) {
        this.saveuserPackNew();
      }
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
        this.getClear();
        this.newCoupons();
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
    toDetail(skuid, overall, type, index) {
      // 活动清仓根据activityId,supplyId,activityType,activityState
      this.$router.push({
        name: "商品详情",
        query: {
          skuId: skuid,
          activityId: overall.activityId,
          activityType: overall.activityType,
        },
      });
      if (type == "finework") {
        //易观数据采集---资源位点击
        let urlHtm = window.location.href;
        let titHtm = document.title;
        AnalysysAgent.track(
          "resource_click",
          {
            resource_type: "Selectives",
            $page_url: urlHtm,
            $page_title: titHtm,
            resource_rank: index,
            resource_page_name: "商品详情页",
            product_name: overall.supplyTitle,
            discount: overall.discountPrice == null ? 0 : overall.discountPrice,
            product_price: overall.salePrice,
            products_id: overall.skuId,
            product_sold: overall.skuSalesNum,
          },
          (rel) => {}
        );
      } else if (type == "fineSale1") {
        //易观数据采集---资源位点击
        let urlHtm = window.location.href;
        let titHtm = document.title;
        AnalysysAgent.track(
          "resource_click",
          {
            resource_type: "Hot Sales",
            $page_url: urlHtm,
            $page_title: titHtm,
            resource_rank: index,
            resource_page_name: "商品详情页",
            product_name: overall.supplyTitle,
            discount: overall.discountPrice == null ? 0 : overall.discountPrice,
            product_price: overall.salePrice,
            products_id: overall.skuId,
            product_sold: overall.skuSalesNum,
          },
          (rel) => {}
        );
      } else if (type == "fineSale2") {
        //易观数据采集---资源位点击
        let urlHtm = window.location.href;
        let titHtm = document.title;
        AnalysysAgent.track(
          "resource_click",
          {
            resource_type: "Hot Sales",
            $page_url: urlHtm,
            $page_title: titHtm,
            resource_rank: index + 10,
            resource_page_name: "商品详情页",
            product_name: overall.supplyTitle,
            discount: overall.discountPrice == null ? 0 : overall.discountPrice,
            product_price: overall.salePrice,
            products_id: overall.skuId,
            product_sold: overall.skuSalesNum,
          },
          (rel) => {}
        );
      }
    },
    //去到搜索里面
    toSearOne(id, type, index) {
      if (type == "categoryId") {
        this.$router.push({ name: "搜索商品1", query: { categoryId: id } });
      } else if (type == "brandId") {
        this.$router.push({ name: "搜索商品1", query: { brandId: id } });
      }
      if (type == "categoryId") {
        //易观数据采集---资源位点击
        let urlHtm = window.location.href;
        let titHtm = document.title;
        AnalysysAgent.track(
          "resource_click",
          {
            resource_type: "Hot",
            $page_url: urlHtm,
            $page_title: titHtm,
            resource_rank: index,
            resource_page_name: "商品列表页",
          },
          (rel) => {}
        );
      } else if (type == "brandId") {
        //易观数据采集---资源位点击
        let urlHtm = window.location.href;
        let titHtm = document.title;
        AnalysysAgent.track(
          "resource_click",
          {
            resource_type: "Global Brands",
            $page_url: urlHtm,
            $page_title: titHtm,
            resource_rank: index,
            resource_page_name: "商品列表页",
          },
          (rel) => {}
        );
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
    swipeClick(el, index) {
      if (!el.linkUrl) return;
      window.location.href = el.linkUrlEng;
      var targetType = "";
      if (el.linkUrlEng.substring(25, 31) == "commod") {
        targetType = "商品详情页";
      } else if (el.linkUrlEng.substring(25, 31) == "search") {
        targetType = "列表页";
      } else if (el.linkUrlEng.substring(25, 31) == "rechar") {
        targetType = "话费充值页";
      } else {
        targetType = "其它";
      }
      //易观数据采集-----轮播图点击
      let urlHtm = window.location.href;
      let titHtm = document.title;
      let num = parseInt(index);
      AnalysysAgent.track(
        "banner_click",
        {
          $page_url: urlHtm,
          $page_title: titHtm,
          target_url: el.linkUrlEng,
          target_type: targetType,
          banner_rank: num,
        },
        (rel) => {}
      );
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
          if (this.clear_list.length != 0) {
            this.clear_one = this.clear_list[0].activityBegin;
            this.clear_end = this.clear_list[0].activityEnd;
            //   this.isExit = res.IsConcat;
            this.isExit = this.clear_list[0].activityState;
          }
        }
      });
    },
  },
  components: {
    searchHeader,
    allCoupons,
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
.clamp_clear {
  color: #fff;
  border-radius: 15px;
}
.clear_sale {
  padding: 4px 10px;
  background: #00a670 !important;
}
.clear_saon {
  padding: 4px 10px;
  background: #fa5400 !important;
}
.clear_th {
  padding: 4px 10px;
  background: #a9a9a9 !important;
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
      // /deep/ .van-icon {
      //   color: #ffffff;
      // }
    }
    .flash-sale-2 {
      background-color: #fff;
      border-radius: 10px;
      margin-top: 20px;
      padding: 0 30px;
      .goods_items {
        // margin: 0 30px;
        padding: 30px 20px;
        // background-color: #fff;
        border-bottom: 1px solid #eee;
        .goods_sale {
          position: absolute;
          margin-top: 20px;
          //   top: 37px;
          //   left: 10px;
          width: 200px;
          height: 160px;
        }
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
          background: #f95300;
          font-size: 20px;
          border-radius: 13px;
        }
        .goods_price {
          font-size: 40px;
          color: #f95300;
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
          width: 210px;
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
      // height: 60px;
      // line-height: 60px;
      // background: url(../../../assets/img/activity/background.png) no-repeat;
      // background-position: 0;
      // background-size: 100%;
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
        height: 240px;
        width: 1000px;
        box-sizing: border-box;
        .p1 {
          width: 200px;
          height: 210px;
          display: inline-block;
          margin-right: 11px;
          text-align: center;
          .good-name {
            font-size: 20px;
            width: 200px;
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
      width: 100%;
      position: relative;
      height: 50px;
      line-height: 50px;
      // padding-left: 30px;
      // background: url(../../../assets/img/activity/background.png) no-repeat;
      // background-position: 0;
      // background-size: 100%;
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
      // padding: 0 30px;
      margin-top: 17px;
      .pictures {
        box-sizing: border-box;
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
            height: 58px;
            width: 220px;
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
      // padding-left: 30px;
      // background: url(../../../assets/img/activity/background.png) no-repeat;
      // background-position: 0;
      // background-size: 100%;
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
      // padding: 0 0px;
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
      // height: 60px;
      // line-height: 60px;
      // padding-left: 30px;
      // background: url(../../../assets/img/activity/background.png) no-repeat;
      // background-position: 0;
      // background-size: 100%;
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
      // padding: 0 30px;
      .pictures {
        box-sizing: border-box;
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
        box-sizing: border-box;
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
            width: 166px;
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
      // padding-left: 30px;
      // background: url(../../../assets/img/activity/background.png) no-repeat;
      // background-position: 0;
      // background-size: 100%;
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
      // padding: 0 30px;
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
          .goods_sale {
            position: absolute;
            // margin-top: 6px;
            top: 56px;
            left: 20px;
            width: 300px;
            height: 220px;
            z-index: 11;
          }
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
