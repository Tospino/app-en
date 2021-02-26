<!--
 * @Author: zlj
 * @Date: 2020-07-18 17:45:35
 * @LastEditTime: 2021-02-25 18:06:11
 * @LastEditors: 曹建勇
 * @Description: 添加优惠券--shopCouponPop组件和字段
 * @FilePath: \app-en\src\components\tabbar\home\commodityDetails.vue
-->

<template>
  <!-- 商品详情页 -->
  <div class="commodity-details" ref="headerapp">
    <section v-show="showServer">
      <customerService
        ref="onlineServer"
        :type="1"
        :data="detailmData"
        @change="showServer = false"
        :show="showServer"
      />
    </section>
    <section v-show="!showServer">
      <!-- 头部搜索框 -->
      <details-header></details-header>
      <div class="commodity-tab" v-if="true">
        <van-tabs
          v-model="active"
          class="tab-list"
          title-active-color="#FA5300"
          @change="changeTab"
        >
          <van-tab title="Shot"></van-tab>
          <!-- <van-tab title="Review"></van-tab> -->
          <van-tab title="Param"></van-tab>
          <van-tab title="Details"></van-tab>
          <van-tab title="Similar"></van-tab>
        </van-tabs>
      </div>
      <div class="commodity-tab-place"></div>
      <scroll
        class="bscroll-wrapper"
        ref="wrapper"
        :data="recordGroup"
        v-show="showData"
        :listenScroll="true"
        @scroll="scrollto"
        :probeType="2"
      >
        <div class="bscroll-con">
          <div class="commodity-swipe">
            <van-swipe @change="onChange" v-if="showData">
              <van-swipe-item
                v-for="(banner, index) in detailmData.productImgList"
                :key="index"
              >
                <div class="w1">
                  <img v-lazy="$bigwebUrl + banner.imgUrl" />
                </div>
              </van-swipe-item>
              <div class="custom-indicator" slot="indicator">
                {{ current + 1 }}/{{ leng }}
              </div>
            </van-swipe>
          </div>
          <!-- 特价清仓销售价 -->
          <div
            class="clearSale_content flex"
            v-if="detailmData.activityType == 1"
          >
            <div
              class="clearSale_left flex_col"
              :class="{
                on_fw: detailmData.activityState === 0,
                on_fc: detailmData.activityState == 1,
                on_tc: detailmData.activityState == 2,
              }"
            >
              <div class="flex">
                <span
                  class="goods_discount flex_center2"
                  :class="{
                    fz_cw: detailmData.activityState === 0,
                    fz_co: detailmData.activityState == 1,
                    fz_ct: detailmData.activityState == 2,
                  }"
                >
                  <!-- parseInt(
                      (1 - detailmData.discountPrice / detailmData.salePrice) *
                        100
                    ) -->
                  {{ detailmData.percent }}% off
                </span>
                <i
                  v-if="
                    detailmData.activityState == 1 ||
                    detailmData.activityState == 2
                  "
                  style="
                    color: #fff;
                    font-weight: blod;
                    margin-top: 10px;
                    padding-left: 6px;
                    font-size: 12px;
                  "
                >
                  Sold:{{
                    detailmData.skuSalesNum ? detailmData.skuSalesNum : 0
                  }}PCS
                </i>
              </div>
              <div class="flex mt_30">
                <span class="goods_price"
                  >{{ jn }} {{ detailmData.discountPrice }}</span
                >
                <span class="goods_dis_price"
                  >{{ jn }} {{ detailmData.salePrice }}</span
                >
              </div>
              <!-- <span class="goods_code">MOQ:30PCS</span> -->
            </div>
            <div
              class="clearSale_right flex_col_center2"
              :class="{
                on_rw: detailmData.activityState === 0,
                on_rc: detailmData.activityState == 1,
                on_rt: detailmData.activityState == 2,
              }"
            >
              <h2 class="active_title">Clearance Sale</h2>
              <div class="active_time flex" v-show="true">
                <!-- 特价时间 -->
                <count-down
                  model="timer"
                  :end-time="arrClearSale"
                  v-if="detailmData.activityState == 0"
                >
                  <template v-slot="time">
                    starts at
                    <!-- {{time.hour}}:{{time.minute}}:{{time.second}} -->
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
                <span v-else>While supplies last</span>
              </div>
              <!-- 特价进行中 -->
              <div v-show="false" class="active_desc">While supplies last</div>
            </div>
          </div>

          <div class="good-content">
            <div class="flex flex_space">
              <div>
                <div v-if="detailmData.quoteMethod == 1">
                  <div class="prices" v-if="detailmData.activityType !== 1">
                    <span class="mark c-orange">{{ jn }}</span>
                    <span class="p1 c-orange">
                      {{ detailmData.discountPrice }}
                    </span>
                    <div v-if="detailmData.activityType !== 1">
                      <span class="p2 through" v-if="detailmData.salePriceFlag"
                        >{{ jn }}{{ detailmData.salePrice }}</span
                      >
                    </div>
                  </div>
                  <div>
                    <span class="p3" v-if="detailmData.activityType !== 1"
                      >MOQ:{{ detailmData.numIntervalStart }}Pcs</span
                    >
                  </div>
                </div>
                <div class="miaoshu">
                  <span class="p4">{{ detailmData.supplyTitle }}</span>
                  <!-- <span>
                            <img src="@/assets/img/tabbar/home/commodityDetails/share-02@2x.png" class="fenxiang">
                            <span class="fenxiang-txt">Share</span>
                  </span>-->
                </div>
                <div class="qujianjia" v-if="detailmData.quoteMethod == 2">
                  <div
                    v-for="(spc, index) in spclist"
                    :key="index"
                    class="qujianjia-item"
                  >
                    <div class="price" v-if="detailmData.activityType !== 1">
                      <span class="huobi">{{ jn }}</span>
                      <span>{{ spc.price }}</span>
                    </div>
                    <div class="piece" v-if="detailmData.activityType !== 1">
                      <span v-show="index == 0">MOQ:</span>
                      <span>{{ spc.pcs }}PCS</span>
                    </div>
                  </div>
                </div>
                <div v-if="detailmData.activityType !== 1">
                  Sales:{{
                    detailmData.skuSalesNum ? detailmData.skuSalesNum : 0
                  }}PCS
                </div>
              </div>
              <div class="flex_col share_warp">
                <img
                  src="@/assets/img/coupon/share.png"
                  class="share_img"
                  @click="showShare"
                  alt
                  srcset
                />
                <span>Share</span>
              </div>
            </div>
            <div class="supplement" v-if="false">
              <span class="t1">物流</span>
              <span class="t2">浙江省 金华市</span>
              <span class="erect-line"></span>
              <span class="t3">TOSPINO</span>
            </div>
          </div>
          <div class="fbm-time" v-if="detailmData.arriveDateRangeStringEng">
            Get it as soon as {{ detailmData.arriveDateRangeStringEng }}.
          </div>
          <van-cell-group
            class="border-0"
            @click="changeComStatus(true, false)"
          >
            <van-field
              v-model="username"
              clearable
              right-icon="arrow"
              :placeholder="detailmData.skuValuesTitleEng"
              left-icon="arrow"
              disabled
            >
              <div
                slot="left-icon"
                size="small"
                type="primary"
                class="text-left"
              >
                <span>Select</span>
                <span class="erect-line1"></span>
              </div>
            </van-field>
          </van-cell-group>
          <div class="fbm-wuliu" v-if="detailmData.expId == 1">
            <img v-lazy="$webUrl + '/common/image/zhiyou.png'" />
            <span>Ships from {{ detailmData.areaNameEng }}</span>
          </div>
          <div
            class="good-comment"
            @click="
              $router.push({
                name: '商品详情评价',
                query: { skuid: detailmData.skuId },
              })
            "
            ref="goodComment"
            v-if="false"
          >
            <div v-if="detailmData.evaContent">
              <div class="comment-top">
                <span class="p1">Reviews</span>
                <span class="p2">{{ detailmData.starNumber }}</span>
                <van-rate
                  v-model="detailmData.starNumber"
                  void-color="#FA5300"
                  color="#FA5300"
                />
              </div>
              <div class="comment-describe">
                <span
                  >{{ detailmData.nickName }}:{{ detailmData.evaContent }}</span
                >
              </div>
              <div class="comment-specifications">
                <span>{{ detailmData.proUnit }}</span>
              </div>
              <div class="comment-arrow">
                <van-icon name="arrow" />
              </div>
            </div>
            <div v-else>
              <div class="comment-top">
                <span class="p1">Reviews</span>
                <span class="c-999">No reviews</span>
              </div>
            </div>
          </div>
          <!-- 新增-优惠券 -->
          <div class="youhuiquan yhq" v-if="moreShop">
            <div class="youhuiquan-header">
              <span class="youhuiquan-title">Coupons</span>
              <span class="youhuiquan-txt" @click="saleMore">More</span>
            </div>
            <div class="youhuiquan-main">
              <img
                src="@/assets/img/tabbar/home/commodityDetails/youhuiquan@2x.png"
              />
              <div class="youhuiquan-box">
                <div class="youhuiquan-left">
                  <!-- <span class="youhuiquan-left-biao">GH{{jn}}</span> -->
                  <p class="youhuiquan-left-money">
                    <span class="youhuiquan-left-biao">GH{{ jn }}</span>
                    {{ ProModel.Data.reduceAmount }}
                    <i>OFF</i>
                  </p>
                  <p class="youhuiquan-left-m">
                    Type:{{
                      ProModel.Data.couponType == 1
                        ? "Tospino’s Price-off"
                        : ProModel.Data.couponType == 2
                        ? "Newer Exclusives"
                        : ProModel.Data.couponType == 3
                        ? "Shop’s Price-off"
                        : ProModel.Data.couponType == 4
                        ? "Item Price-off"
                        : "Item Price-off"
                    }}
                  </p>
                  <p class="youhuiquan-left-m">
                    Valid:{{
                      ProModel.Data.useBeginWebsite
                        ? ProModel.Data.useBeginWebsite
                            .slice(0, 10)
                            .split("-")
                            .reverse()
                            .join("/")
                        : ""
                    }}~{{
                      ProModel.Data.useEndWebsite
                        ? ProModel.Data.useEndWebsite
                            .slice(0, 10)
                            .split("-")
                            .reverse()
                            .join("/")
                        : ""
                    }}
                  </p>
                  <progress-bar
                    :progressBar="
                      ProModel.Data.claimRate
                        ? ProModel.Data.claimRate * 100
                        : 0
                    "
                  ></progress-bar>
                </div>

                <div class="youhuiquan-right">
                  <div class="youhuiquan-right-header">
                    <!-- 测试完后注释掉 -->
                    <!-- <span class="youhuiquan-right-title">{{ProModel.Data.couponName}}</span> -->
                  </div>
                  <div class="youhuiquan-right-main">
                    <div>
                      Mini Spend GH₵
                      {{
                        ProModel.Data.upToAmount != null
                          ? ProModel.Data.upToAmount
                          : ProModel.Data.reduceAmount
                      }}
                    </div>
                    <van-button
                      style="background: none; border: 0; color: #fea072"
                      round
                      disabled
                      v-if="ProModel.Data.drawStatus == 0 ? true : false"
                      type="info"
                      class="youhuiquan-right-btn"
                      >Received</van-button
                    >
                    <van-button
                      v-else
                      round
                      type="info"
                      class="youhuiquan-right-btn"
                      @click="
                        couponsClick(
                          ProModel.Data.couponId,
                          ProModel.Data.couponDetailId,
                          ProModel.Data.supplyId,
                          ProModel.Data.businessId
                        )
                      "
                    >
                      {{
                        ProModel.Data.drawStatus == null
                          ? "Get it now"
                          : ProModel.Data.drawStatus == 1
                          ? "Get more"
                          : "Delete"
                      }}
                    </van-button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div ref="guige">
            <div
              class="canshu"
              v-for="(param, index) in detailmData.productParamList"
              :key="index"
            >
              <div class="canshu-item fl-left">{{ param.paramTitleEng }}</div>
              <div class="canshu-item fl-left">
                {{ param.pvValueEng }}{{ param.paramUnitEng }}
              </div>
            </div>
            <div class="shousuo" v-if="shousuoStatus" @click="zankai">
              <span>open</span>
              <van-icon name="arrow-down" />
            </div>
            <div v-html="detailmData.supplyDetailpara"></div>
          </div>

          <div class="bbxq" ref="xiangqing">
            <span class="line-left"></span>
            <span class="bbxq-p1">Details</span>
            <span class="line-right"></span>
          </div>
          <div class="banner" v-html="supplyDetail"></div>
          <!-- 推荐宝贝 -->
          <div ref="tjbb"></div>
          <footer-exhibition
            :footerData="footerData"
            :webUrl="$webUrl"
            v-if="showfooter"
            @clickPro="clickPro"
          ></footer-exhibition>
        </div>
      </scroll>
      <!-- 底部导航 -->
      <van-tabbar v-model="active" class="footer-tab">
        <div class="icon-collection" @click="cliShoucang">
          <img
            src="@/assets/img/tabbar/home/commodityDetails/collection-02@2x.png"
            v-if="Isfavorites == 1"
          />
          <img
            src="@/assets/img/tabbar/home/commodityDetails/collection@2x.png"
            v-else
          />
          <div class="icon-collection-p">Collect</div>
        </div>
        <div class="icon-service" @click="service">
          <img src="@/assets/img/tabbar/home/commodityDetails/service@2x.png" />
          <div class="icon-collection-p">Service</div>
        </div>
        <div v-if="detailmData.activityState != 2">
          <van-button
            type="default"
            class="add-shopping-cat"
            @click="changeComStatus(true, true, 'Confirm')"
            >Add to Cart</van-button
          >
          <van-button
            v-if="detailmData.activityState !== 0"
            type="primary"
            class="spend spen_on"
            @click="changeComStatus(true, true, 'Buy Now')"
            >Buy Now</van-button
          >
          <van-button v-else type="primary" disabled class="spend spen_tw"
            >Coming Soon</van-button
          >
        </div>
        <van-button v-else type="primary" disabled class="clear_sold"
          >Sold out</van-button
        >
      </van-tabbar>

      <transition name="updown">
        <commodity-selection
          v-show="comStatus"
          @changeComStatus="changeComStatus"
          :selectionData="selectionData"
          :btnStatus="btnStatus"
          :btnName="btnName"
          :amountTip="amountTip"
          :clearOne="clearOne"
          :actId="actId"
          ref="commodityselection"
        ></commodity-selection>
      </transition>

      <van-overlay :show="show2" @click="show2 = false" class="overlay">
        <!-- 客服电话 -->
        <kefu></kefu>
      </van-overlay>

      <!-- 更多优惠券 -->
      <shop-coupon-pop
        :shop="shop"
        :couponShop="couponShop"
        @shopPop="shopPop"
        @couponSucceed="couponSucceed"
      ></shop-coupon-pop>
    </section>
    <share
      ref="share"
      :links="sharelinks"
      :infos="shareinfos"
      :clearShareLink="clearShareLink"
      :clearShare="clearShare"
    />

    <!-- 整体优惠券 -->
    <allCoupons
      v-if="isHomeCoupons"
      :isFrame="isFrame"
      :hasAggregate="hasAggregate"
      :isShowCoupon="isShowCoupon"
      :touristSum="touristSum"
      :newCoupon="newCoupon"
      :sideFrame="sideFrame"
      @memberBus="memberBus"
      @isShowBus="isShowBus"
    ></allCoupons>
  </div>
</template>

<script>
import allCoupons from "@/multiplexing/allCoupons";
import { queryNewgiftpackApi } from "@/api/home/index.js";
import detailsHeader from "@/multiplexing/detailsHeader";
import footerExhibition from "@/multiplexing/footerExhibition";
import commoditySelection from "@/multiplexing/commoditySelection";
import shopCouponPop from "./itemComponents/shopCouponPop";
import progressBar from "@/multiplexing/progress";
import customerService from "@/components/tabbar/account/customerService.vue";
import share from "@/multiplexing/share.vue";
import bonus from "@/multiplexing/bonus";
import {
  productdetailApi,
  AppqureyuserCouponProApi,
  AppqureyuserCouponProModelApi,
  getsupplyDetailApi,
  getGuessyouLikeApi,
  getClearanceDetailApi,
} from "@/api/home/commodityDetails";
import {
  adduserbrowhistoryApi,
  adduserfavoritesApi,
} from "@/api/favorites/index.js";
// 领取优惠券
import { couponDrawApi } from "@/api/confirmOrder/index";
import kefu from "@/multiplexing/kefu.vue";
import { Toast } from "vant";
import moment from "moment";
export default {
  props: {},
  data() {
    return {
      recordGroup: [],
      current: 0,
      username: "",
      value: 4,
      active: 0,
      show: false,
      show2: false,
      detailmData: {},
      leng: 0,
      footerData: {
        list: [],
      },
      showfooter: false,
      Isfavorites: 0,
      comStatus: false,
      selectionData: {},
      btnStatus: false,
      btnName: "",
      amountTip: false, //根据后台expId为2则展示到货时间
      productParamList: [],
      productParamList2: [],
      shousuoStatus: false,
      showData: false,
      spclist: [],
      iSpeed: 0, //进度条,
      shop: false, //更多优惠券
      couponShop: [],
      couponMax: "",
      ProModel: "", //最大优惠券
      moreShop: false, //优惠券领取
      showServer: false, // 是否显示客户弹框
      supplyDetail: null, //商品详情图片
      scrollFlag: true,
      isClearSaleGood: "", // 是否是特价清仓商品
      clearSaleGoodType: "", //特价商品类型
      clearSaleGoodState: "", //是否是清仓0 1 2的状态
      arrClearSale: " ", //特价清仓"2020-9-28 14:00:00"
      timeOver: null,
      actId: null,
      actType: "",
      clearShare: true,
      clearShareLink: true,
      shareinfos: "", //分享链接
      sharelinks: location.href, //分享链接
      clearOne: "", //清仓
      time_atc: null,

      isShowCoupon: 1, //判断是否为新人券或会员券(是否领取)
      touristSum: 0, //吸引游客金额
      isFrame: false, //是否显示平台优惠券弹框
      newCoupon: [], //新用户列表
      hasAggregate: {}, //总优惠数据
      sideFrame: true, //是否显示侧边优惠弹框
      isHomeCoupons: false,
    };
  },
  computed: {},
  created() {
    // this.actId = this.$route.query.activityId;
    // this.slyId = this.$route.query.supplyId;
    this.actType = this.$route.query.activityType;
    // this.actState = this.$route.query.activityState;
  },
  mounted() {
    setTimeout(() => {
      this.productdetail(this.$route.query.skuId, this.actType);
    }, 10);
    this.adduserbrowhistory(this.$route.query.skuId);
    this.time_atc = setInterval(() => {
      //   清仓时间戳
      if (this.arrClearSale != null) {
        let clear_time = moment(this.arrClearSale).valueOf();
        let clear_timeOver = moment(this.timeOver).valueOf();
        let new_time = new Date().getTime();
        //   活动三天
        if (parseInt(clear_time / 1000) - 259200 == parseInt(new_time / 1000)) {
          this.productdetail(this.$route.query.skuId, this.actType);
          clearInterval(this.time_atc);
        }
        //   活动中
        if (parseInt(clear_time / 1000) == parseInt(new_time / 1000)) {
          this.productdetail(this.$route.query.skuId, this.actType);
          clearInterval(this.time_atc);
        }
        //   活动结束
        if (parseInt(clear_timeOver / 1000) == parseInt(new_time / 1000)) {
          this.productdetail(this.$route.query.skuId, this.actType);
          clearInterval(this.time_atc);
        }
      }
    }, 1000);
    this.newCoupons();
  },
  beforeDestroy() {
    //清除定时器
    clearInterval(this.time_atc);
  },

  beforeRouteLeave(to, from, next) {
    // 设置下一个路由的 meta
    if (to.name == "搜索商品1") {
      to.meta.isBack = false;
    }
    next();
  },
  watch: {},
  methods: {
    onChange(index) {
      this.current = index;
    },
    /**
     * @description:联系客服
     * @author: 曹建勇
     */
    service() {
      this.showServer = true;
      //   this.$refs.onlineServer.getData();
    },
    //商品详情
    productdetail(id, activityType) {
      if (activityType == 1) {
        //清仓活动类型
        getClearanceDetailApi({ skuid: id }).then((res) => {
          if (res.code == 0) {
            // 清仓活动
            this.isClearSaleGood = res.Makeupdata;
            this.isClearSaleGood.forEach((ele) => {
              this.clearSaleGoodType = ele.activityType;
              if (ele.activityType == 1) {
                // this.clearSaleGoodState = ele.activityState;
                if (ele.skuid == this.$route.query.skuId) {
                  this.clearOne = ele.activityState;
                }
              }
            });
            Toast.loading({ loadingType: "spinner", message: "loading..." });
            this.detailmData = res.Data;
            this.copyinfo(
              this.detailmData.discountPrice
                ? this.detailmData.discountPrice
                : this.detailmData.salePrice,
              this.detailmData.supplyTitle
            );
            this.arrClearSale = this.detailmData.activityBegin;
            this.timeOver = this.detailmData.activityEnd;
            //   到货时间展示文字
            if (this.detailmData.expId == 2) {
              this.amountTip = true;
            } else {
              this.amountTip = false;
            }
            this.couponProModel(
              this.detailmData.supplyId,
              this.detailmData.businessId,
              this.detailmData.expId
            );
            this.leng = res.Data.productImgList.length;
            this.selectionData = res;
            this.detailmData.salePriceFlag = true;
            if (this.detailmData.discountPrice == null) {
              this.detailmData.discountPrice = this.detailmData.salePrice;
              this.detailmData.salePriceFlag = false;
            }
            this.footerData.list = res.GuessyouLike;
            this.showfooter = true; //数据回调回来,显示猜你喜欢
            this.Isfavorites = res.Data.isfavorites; //收藏状态

            this.spclist = res.spclist;
            this.productParamList = res.Data.productParamList.slice(0, 5);
            this.productParamList2 = res.Data.productParamList;
            if (res.Data.productParamList.length > 5) {
              this.shousuoStatus = true;
            }
            setTimeout(() => {
              this.showData = true;
              Toast.clear();
            }, 1000);
          } else if (res.code == -326) {
            Toast("Sold Out");
            setTimeout(() => {
              this.$router.go(-1);
            }, 1000);
          }
        });
      } else {
        //  无清仓类型
        productdetailApi({ skuid: id }).then((res) => {
          if (res.code == 0) {
            Toast.loading({ loadingType: "spinner", message: "loading..." });
            this.detailmData = res.Data;
            this.copyinfo(
              this.detailmData.discountPrice
                ? this.detailmData.discountPrice
                : this.detailmData.salePrice,
              this.detailmData.supplyTitle
            );
            this.arrClearSale = this.detailmData.activityBegin;
            //   到货时间展示文字
            if (this.detailmData.expId == 2) {
              this.amountTip = true;
            } else {
              this.amountTip = false;
            }
            //  优惠券
            this.couponProModel(
              this.detailmData.supplyId,
              this.detailmData.businessId,
              this.detailmData.expId
            );
            this.leng = res.Data.productImgList.length;
            this.selectionData = res;
            this.detailmData.salePriceFlag = true;
            if (this.detailmData.discountPrice == null) {
              this.detailmData.discountPrice = this.detailmData.salePrice;
              this.detailmData.salePriceFlag = false;
            }
            this.footerData.list = res.GuessyouLike;
            this.showfooter = true; //数据回调回来,显示猜你喜欢
            this.Isfavorites = res.Data.isfavorites; //收藏状态
            this.isClearSaleId = this.footerData.list.activityId;
            this.spclist = res.spclist;
            this.productParamList = res.Data.productParamList.slice(0, 5);
            this.productParamList2 = res.Data.productParamList;
            if (res.Data.productParamList.length > 5) {
              this.shousuoStatus = true;
            }
            setTimeout(() => {
              this.showData = true;
              Toast.clear();
            }, 1000);
          } else if (res.code == -326) {
            Toast("Sold Out");
            setTimeout(() => {
              this.$router.go(-1);
            }, 1000);
          }
        });
      }
    },
    //复制内容
    copyinfo(price, title) {
      this.shareinfos = `Guessing you'll like it and save a lot!\nGHS${price} | Tospino\n${title}\n${window.location.href}`;
    },
    // 猜你喜欢点击了商品
    clickPro(skuid, actAll) {
      this.productdetail(skuid, actAll.activityType);
      //   活动
      window.scrollTo(0, 0);
      this.actId = skuid;
      //   this.$refs.wrapper.scrollTo(0, 0, 500);
      this.active = 0;
    },
    //弹出规格框
    //第一个参数:弹窗状态,第二个参数:弹窗按钮类型,弹窗按钮名字
    changeComStatus(flag, btnFlag, name) {
      this.btnName = name;
      this.comStatus = flag;
      //没传值就是从组件内部调用
      if (typeof btnFlag == "undefined") return;
      this.btnStatus = btnFlag;
    },
    //增加用户浏览记录数据
    adduserbrowhistory(id) {
      adduserbrowhistoryApi({ skuid: id }).then((res) => {});
    },
    //点击tab标签
    changeTab(index) {
      switch (index) {
        case 0:
          this.$refs.wrapper.scrollTo(0, 0, 500);
          break;
        case 1:
          this.$refs.wrapper.scrollToElement(this.$refs.guige, 500);
          break;
        case 2:
          this.$refs.wrapper.scrollToElement(this.$refs.xiangqing, 500);
          break;
        case 3:
          this.$refs.wrapper.scrollToElement(this.$refs.tjbb, 500);
      }
    },
    //点击收藏图标
    cliShoucang() {
      if (this.Isfavorites == 1) return;
      let arr = [];
      arr.push(this.detailmData.skuId);
      this.adduserfavorites(arr);
      //易观数据采集----加入收藏
      let urlHtm = window.location.href;
      let titHtm = document.title;
      let typeName = this.detailmData.typeName;
      let category = typeName.split(",");
      AnalysysAgent.track(
        "collect",
        {
          product_id: this.detailmData.supplyId.toString(),
          product_price: this.detailmData.salePrice,
          product_name: this.detailmData.supplyTitle,
          product_sold: this.detailmData.skuSalesNum,
          coupon_value:
            this.ProModel.Data.reduceAmount == null
              ? 0
              : this.ProModel.Data.reduceAmount,
          discount: this.detailmData.discountPrice,
          $page_url: urlHtm,
          $paeg_title: titHtm,
          product_first_category: category[0],
          product_second_category: category[1],
        },
        (rel) => {}
      );
    },
    //加入收藏夹
    adduserfavorites(data) {
      adduserfavoritesApi(data).then((res) => {
        if (res.code == 0) {
          this.Isfavorites = 1;
        }
      });
    },
    //展开
    zankai() {
      this.productParamList = this.productParamList2;
      this.shousuoStatus = false;
    },
    // 显示最高金额的优惠券（卖家>平台）
    async couponProModel(supplyId, businessId, expId) {
      this.ProModel = await AppqureyuserCouponProModelApi({
        supplyId: supplyId,
        businessId: businessId,
        expId: expId,
      });
      if (this.ProModel.Data.couponId != null) {
        this.moreShop = true;
      } else {
        this.moreShop = false;
      }
      //易观数据采集----商品详情页浏览
      let place = "";
      if (expId == 1) {
        place = "FBM";
      } else if (expId == 2) {
        place = "FBT";
      }
      let souce = "";
      if (this.detailmData.activityType == null) {
        souce = "无活动";
      } else if (this.detailmData.activityType == 1) {
        souce = "清仓活动";
      }
      let typeName = this.detailmData.typeName;
      let category = typeName.split(",");
      AnalysysAgent.track(
        "product_detail_view",
        {
          product_price: this.detailmData.salePrice,
          coupon_name:
            this.moreShop == true ? this.ProModel.Data.couponName : "无优惠卷",
          product_id: this.detailmData.supplyId.toString(),
          product_name: this.detailmData.supplyTitle,
          product_sold: this.detailmData.skuSalesNum,
          coupon_value:
            this.moreShop == true ? this.ProModel.Data.reduceAmount : 0,
          discount: this.detailmData.discountPrice,
          delivery_place: place,
          product_instock: this.$refs.commodityselection.stock,
          commodity_detail_souce: souce,
          product_first_category: category[0],
          product_second_category: category[1],
        },
        (rel) => {}
      );
    },
    // 最高金额优惠券领取
    async couponsClick(couponId, DetailId, supplyId, businessId, expId) {
      let couponDraw = await couponDrawApi({
        couponId: couponId,
        couponDetailId: DetailId,
      });
      if (couponDraw.code == 0) {
        setTimeout(() => {
          Toast("Get the success");
        }, 500);
        this.moreShop = true;
      } else if (
        couponDraw.code == 25 ||
        couponDraw.code == 26 ||
        couponDraw.code == 29 ||
        couponDraw.code == 22
      ) {
        setTimeout(() => {
          Toast("The coupon has been collected");
        }, 500);
      } else if (couponDraw.code == 32) {
        setTimeout(() => {
          Toast("The coupon issue period ends");
        }, 500);
      } else {
        this.$toast.clear();
      }
      setTimeout(() => {
        this.couponProModel(supplyId, businessId, expId);
      }, 1000);
      //易观数据采集----点击领取优惠券
      let couponType1 = "";
      if (this.ProModel.Data.couponType == 1) {
        couponType1 = "平台满减券";
      } else if (this.ProModel.Data.couponType == 2) {
        couponType1 = "新人专享券";
      } else if (this.ProModel.Data.couponType == 3) {
        couponType1 = "店铺满减券";
      } else if (this.ProModel.Data.couponType == 4) {
        couponType1 = "商品立减券";
      }
      let status = "";
      if (this.ProModel.Data.couponStatus == 1) {
        status = "活动中";
      } else if (this.ProModel.Data.couponStatus == 2) {
        status = "已结束";
      }
      AnalysysAgent.track(
        "get_coupon",
        {
          coupon_name: this.ProModel.Data.couponName,
          coupon_value: this.ProModel.Data.reduceAmount,
          coupon_type: couponType1,
          coupon_start: this.ProModel.Data.drawBegin,
          coupon_end: this.ProModel.Data.drawEnd,
          businessid: this.ProModel.Data.businessId,
          couponid: this.ProModel.Data.couponId,
          uptoamount: this.ProModel.Data.upToAmount,
          usermaxdrawnum: this.ProModel.Data.userMaxDrawNum,
          publishNum: this.ProModel.Data.publishNum,
          couponstatus: status,
        },
        (rel) => {}
      );
    },
    // 更多优惠券
    saleMore() {
      this.shop = true;
      let moreCoupon = {
        supplyId: this.detailmData.supplyId,
        businessId: this.detailmData.businessId,
        expId: this.detailmData.expId,
      };
      AppqureyuserCouponProApi(moreCoupon).then((res) => {
        this.couponShop = res.Data;
      });
    },
    // 子组件领取的优惠券
    async couponSucceed(id) {
      let couponDraw = await couponDrawApi(id);
      if (couponDraw.code == 0) {
        Toast("Get the success");
      } else if (
        couponDraw.code == 25 ||
        couponDraw.code == 26 ||
        couponDraw.code == 29 ||
        couponDraw.code == 22
      ) {
        setTimeout(() => {
          Toast("The coupon has been collected");
        }, 500);
      } else if (couponDraw.code == 32) {
        setTimeout(() => {
          Toast("The coupon issue period ends");
        }, 500);
      } else {
        this.$toast.clear();
      }
      setTimeout(() => {
        this.saleMore();
      }, 1000);
    },
    shopPop() {
      this.shop = false;
    },
    //滚动事件
    scrollto(pos) {
      if (!this.scrollFlag) return;
      if (pos.y < -10) {
        this.scrollFlag = false;
        this.getsupplyDetail(this.detailmData.supplyId);
      }
    },
    //猜你喜欢
    getGuessyouLike(id) {
      getGuessyouLikeApi({ categoryId: id }).then((res) => {
        if (res.code == 0) {
          this.footerData.list = res.GuessyouLike;
          this.showfooter = true; //数据回调回来,显示猜你喜欢
        }
      });
    },
    //详情介绍图片
    getsupplyDetail(id) {
      getsupplyDetailApi({ supplyId: id }).then((res) => {
        if (res.code == 0) {
          this.supplyDetail = res.supplyDetail;
        }
        this.getGuessyouLike(this.detailmData.categoryId);
      });
    },
    showShare() {
      this.$refs["share"].shows();
    },

    // 首页平台用户优惠券
    async newCoupons() {
      let newGiftpack = await queryNewgiftpackApi();
      this.hasAggregate = newGiftpack;
      this.isShowCoupon = newGiftpack.isReceive;
      // 1游客显示金额吸引
      this.touristSum = newGiftpack.summoney;
      // 2.新人用户显示优惠券列表
      if (newGiftpack.code == 0) {
        if (newGiftpack.Data) {
          this.newCoupon = newGiftpack.Data;
        }
        if (this.isShowCoupon == 2 || this.isShowCoupon == 4) {
          localStorage.isShowOpen = true;
        } else {
          this.isFrame = true;
          this.isHomeCoupons = true;
        }
      } else if (newGiftpack.code == -300) {
        this.isFrame = false;
        this.isHomeCoupons = false;
      }
    },
    // 领取优惠按钮
    memberBus(id) {
      if (id) {
        couponDrawApi(id).then((res) => {
          if (res.code == 0) {
            this.newCoupons();
          } else if (res.code == 25 || res.code == 29 || res.code == 22) {
            Toast("The coupon has been collected");
            // 多个页面领取后code为25 关闭弹框
            setInterval(() => {
              this.isFrame = false;
            }, 500);
          } else if (res.code == 32) {
            Toast("The coupon issue period ends");
            // 多个页面领取后code为32 关闭弹框
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
    },
  },
  components: {
    detailsHeader,
    footerExhibition,
    commoditySelection,
    kefu,
    shopCouponPop,
    progressBar,
    customerService,
    share,
    allCoupons,
  },
};
</script>

<style scoped lang="less">
.bscroll-wrapper {
  height: calc(100vh - 168px - 100px);
}
.share_warp {
  font-size: 20px;
  font-family: Adobe Heiti Std;
  font-weight: normal;
  color: #999999;
  line-height: 45px;
  .share_img {
    width: 46px;
    height: 46px;
    margin-bottom: 5px;
  }
}

.commodity-details {
  .commodity-swipe {
    width: 750px;
    height: 750px;
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
  }
  .commodity-tab-place {
    height: 80px;
  }
  .commodity-tab {
    height: 80px;
    position: fixed;
    top: 80px;
    z-index: 5;
    width: 100%;
    .tab-list {
      height: 80px;
      /deep/ .van-tabs__wrap {
        height: 80px;
        .van-tabs__nav {
          background-color: #f2f3f5;
        }
        .van-tab {
          line-height: 80px;
          // flex-basis: 20% !important;
          font-size: 28px;
          color: #000;
        }
        .van-tabs__line {
          bottom: 30px;
          background-color: #fa5300;
        }
      }
    }
  }
  .good-content {
    width: 100%;
    padding: 36px 30px 10px 29px;
    box-sizing: border-box;
    background-color: #fff;
  }
  .fbm-time {
    padding: 0 30px;
    height: 60px;
    line-height: 60px;
    font-size: 26px;
    font-weight: 400;
    color: rgba(8, 129, 214, 1);
  }
  .fbm-wuliu {
    padding: 10px 30px;
    color: #db9000;
    line-height: 40px;
    img {
      width: 45px;
      vertical-align: middle;
      margin-right: 10px;
    }
  }
  .miaoshu {
    position: relative;
    margin: 10px 0;
    .fenxiang {
      position: absolute;
      top: -50px;
      right: 0;
      width: 34px;
      height: 34px;
    }
    .fenxiang-txt {
      position: absolute;
      right: 0;
      top: 0px;
      font-size: 20px;
      color: #999999;
    }
  }
  .qujianjia {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    .qujianjia-item {
      margin: 0 40px 10px 0;
      &:nth-child(3) {
        margin-right: 0;
      }
      .huobi {
        font-size: 16px;
      }
      .price {
        font-size: 36px;
        color: #fa5300;
      }
      .piece {
        margin-top: 10px;
        font-size: 18px;
        color: #333;
      }
    }
  }
  .supplement {
    .t1 {
      color: #000000;
      font-size: 18px;
      font-weight: bold;
    }
    .t2 {
      font-size: 18px;
      color: #333;
    }
    .erect-line {
      display: inline-block;
      width: 1px;
      height: 18px;
      background-color: #999999;
    }
    .t3 {
      height: 18px;
      background: rgba(153, 153, 153, 1);
      border-radius: 12px;
      font-size: 12px;
      color: #fffefe;
      padding: 0 5px;
    }
  }
  .border-0 {
    //跳转栏
    margin-top: 14px;
    /deep/ .van-cell {
      height: 100px;
      line-height: 80px;
      .van-cell__value {
        border: 0;
        margin-left: 100px;
        /deep/ .van-field__body {
          width: 95%;
          .van-field__control {
            font-size: 20px;
          }
          .van-icon-arrow {
            font-size: 30px;
          }
        }
      }
      .text-left {
        width: 60px;
        position: absolute;
        left: 23px;
        top: 30px;
        color: #000000;
        font-size: 20px;
        line-height: 33px;
        font-weight: bold;
        .erect-line1 {
          position: absolute;
          display: inline-block;
          width: 2px;
          height: 70px;
          background-color: #dcdcdc;
          top: -15px;
          left: 80px;
        }
      }
    }
  }
  .good-comment {
    width: 100%;
    margin: 21px 0 0;
    position: relative;
    background-color: #fff;
    .comment-top {
      height: 87px;
      line-height: 87px;
      .p1 {
        margin: 0 20px 0 30px;
        font-size: 22px;
        color: #000;
      }
      .p2 {
        color: #f83600;
        font-size: 22px;
      }
    }
    .comment-describe {
      display: inline-block;
      width: 534px;
      font-size: 20px;
      color: #333;
      margin-left: 94px;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
      line-height: 25px;
    }
    .comment-specifications {
      display: inline-block;
      margin: 17px 0 0 94px;
      font-size: 16px;
      color: #666666;
    }
    .comment-arrow {
      position: absolute;
      top: 102px;
      right: 30px;
      color: #999;
      .van-icon-arrow {
        font-size: 30px;
      }
    }
  }
  .canshu {
    overflow: hidden;
    text-align: center;
    border: 1px solid #999;
    padding: 20px 0;
    display: flex;
    display: -webkit-flex;
    align-items: center;
    justify-content: center;
    .canshu-item {
      width: 48%;
    }
  }
  .shousuo {
    text-align: center;
    height: 40px;
    line-height: 40px;
    border: 1px solid #999;
    span {
      vertical-align: text-bottom;
    }
  }
  // 新增-优惠券
  .yhq {
    width: 100%;
    background-color: #f2f3f5;
    position: relative;
    padding: 20px 30px;
    box-sizing: border-box;
    .youhuiquan-header {
      display: flex;
      justify-content: space-between;
    }
    .youhuiquan-title {
      font-size: 30px;
      font-weight: bold;
    }
    .youhuiquan-txt {
      width: 140px;
      text-align: right;
      font-size: 20px;
      color: rgba(102, 102, 102, 1);
      margin-top: 10px;
    }
    .youhuiquan-main {
      max-width: 100%;
      height: 210px;
      margin-top: 15px;
      overflow: hidden;
      .youhuiquan-box {
        display: flex;
        position: relative;
        top: -209px;
        // left: 20px;

        .youhuiquan-left {
          width: 70%;
          padding-top: 16px;
          padding-left: 20px;
          .youhuiquan-left-biao {
            font-size: 25px;
            font-weight: bold;
            color: #fa5300;
          }
          .youhuiquan-left-money {
            font-size: 60px;
            font-weight: bold;
            color: #fa5300;
            i {
              font-size: 25px;
              font-weight: bold;
            }
          }
          .youhuiquan-left-m {
            padding-top: 10px;
            font-size: 20px;
            color: #333;
            line-height: 34px;
          }
        }

        .youhuiquan-right {
          width: 57%;
          text-align: center;
          .youhuiquan-right-header {
            margin-top: 11px;
          }
          .youhuiquan-right-title {
            font-size: 20px;
            color: #fa5300;
            padding: 10px 30px;
            background: rgba(253, 193, 154, 1);
          }
          .youhuiquan-right-main {
            padding-top: 54px;
            font-size: 24px;
            color: rgba(255, 255, 255, 1);
            .youhuiquan-right-btn {
              margin-top: 15px;
            }
            /deep/ .van-button--info {
              color: #fa5300;
              background: #fff;
              border: 1px solid #fff;
              font-size: 30px;
              font-weight: bold;
              padding: 30px 42px;
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

  .bbxq {
    width: 100%;
    height: 85px;
    background-color: #f2f3f5;
    text-align: center;
    line-height: 85px;
    position: relative;
    .line-left {
      display: inline-block;
      position: absolute;
      width: 40px;
      height: 2px;
      background-color: #666666;
      top: 40px;
      left: 273px;
    }
    .bbxq-p1 {
      font-size: 28px;
      color: #666666;
    }
    .line-right {
      display: inline-block;
      position: absolute;
      width: 40px;
      height: 2px;
      background-color: #666666;
      top: 40px;
      right: 273px;
    }
  }

  /deep/ .footer-tab.van-tabbar--fixed {
    height: 100px;
    .icon-collection {
      display: inline-block;
      color: #666;
      overflow: hidden;
      padding: 15px 30px;
      text-align: center;
      img {
        width: 48px;
        height: 48px;
        // position: absolute;
        // top:14px;
      }
      .icon-collection-p {
        // position: absolute;
        // bottom:10px;
        font-size: 20px;
        color: #666;
      }
    }
    .icon-service {
      overflow: hidden;
      padding: 15px 0;
      text-align: center;
      display: inline-block;
      color: #666;
      img {
        width: 48px;
        height: 48px;
        // position: absolute;
        // top:14px;
      }
      .icon-collection-p {
        // position: absolute;
        // bottom:10px;
        font-size: 20px;
        color: #666;
      }
    }
    .add-shopping-cat {
      width: 230px;
      height: 84px;
      background-color: #fa5300;
      position: absolute;
      left: 268px;
      top: 8px;
      color: #fff;
      font-size: 30px;
      border-radius: 39px;
    }
    .clear_sold {
      width: 463px;
      height: 78px;
      color: #fff;
      position: absolute;
      right: 14px;
      top: 14px;
      font-size: 30px;
      background: #b3b3b3 !important;
      border-radius: 39px;
      border: 0;
    }

    .spend {
      width: 230px;
      height: 84px;
      position: absolute;
      right: 14px;
      top: 8px;
      color: #fff;
      font-size: 30px;
      border: 0;
      border-radius: 39px;
    }
    .spen_on {
      background-color: #fab600 !important;
    }
  }
  .w1 {
    width: 100%;
    height: 750px;
  }
  .mark {
    font-size: 16px;
  }
  .p1 {
    font-size: 36px;
  }
  .p2 {
    font-size: 18px;
    color: #666;
  }
  .p3 {
    display: inline-block;
    font-size: 18px;
    color: #333333;
    margin: 12px 0;
  }
  .p4 {
    display: inline-block;
    width: 606px;
    font-weight: 500;
    line-height: 45px;
    font-size: 30px;
    color: #000000;
  }
  .overlay {
    z-index: 7 !important;
    overflow-y: auto;
    .overlay-wrapper {
      width: 100%;
      height: 1062px;
      position: absolute;
      bottom: 0;
    }
  }
}

.clearSale_content {
  width: 100%;
  height: 140px;
  .on_fw {
    background-image: linear-gradient(
      #25d79d,
      #02a973
    ) !important; // 活动未开始
  }
  .on_fc {
    background-image: linear-gradient(#fd7b30, #fd260f) !important; // 活动中
  }

  .on_tc {
    background-image: linear-gradient(#dfdfdf, #b4b4b4) !important; // 活动结束
  }
  .clearSale_left {
    padding: 0 30px;
    width: 60%;
    height: 140px;
    // background-image: linear-gradient(#25d79d, #02a973); // 活动未开始
    // background-image: linear-gradient(#fd7b30, #fd260f); // 活动中
    // background-image: linear-gradient(#d8d8d8, #b4b4b4); // 活动结束

    .fz_cw {
      color: #00a670 !important; // 活动未开始
    }
    .fz_co {
      color: #fa5400 !important; // 活动中
    }
    .fz_ct {
      color: #a7a7a7 !important; // 活动结束
    }
    .goods_discount {
      margin-top: 15px;
      width: 100px;
      height: 26px;
      font-size: 12px;
      background: rgba(255, 255, 255, 1);
      border: 1px solid rgba(255, 255, 255, 1);
      border-radius: 13px;
    }
    .goods_price {
      font-size: 42px;
      font-weight: bold;
      color: rgba(255, 254, 254, 1);
    }
    .goods_dis_price {
      font-size: 20px;
      font-weight: 500;
      text-decoration: line-through;
      color: rgba(255, 254, 254, 1);
      margin-left: 8px;
    }
    .goods_code {
      font-size: 20px;
      font-weight: 500;
      color: rgba(255, 254, 254, 1);
      margin-top: 12px;
    }
  }
  .on_rw {
    background-color: #00a670 !important; // 活动未开始
  }
  .on_rc {
    background-color: #ff9502 !important; // 活动中
  }
  .on_rt {
    background-color: #a9a9a9 !important; // 活动结束
  }
  .clearSale_right {
    width: 40%;
    height: 140px;
    color: rgba(255, 254, 254, 1);
    padding-left: 15px;
    align-items: flex-start;
    // background-color: #00a670; // 活动未开始
    // background-color: #ff9502; // 活动中
    // background-color: #a9a9a9; // 活动结束
    .active_title {
      font-size: 32px;
      font-weight: 800;
    }
    .active_time {
      margin-top: 22px;
      > span:first-child {
        font-size: 22px;
        font-weight: 500;
      }
      > span:last-child {
        font-size: 30px;
        font-weight: bold;
        // margin-left: 11px;
      }
    }
    .active_desc {
      margin-top: 22px;
      font-size: 28px;
      font-weight: bold;
    }
  }
}
</style>
