/** * Undocumented * @author: zlj * @email: * @Description: 添加优惠券和修改字段
* @date: 2020/09/01 17:15 */
<template>
  <!-- 确认订单填写信息 -->
  <div class="order-content">
    <balance-header title="Confirm the Order"></balance-header>
    <div class="shouhuoxq m-b-20">
      <div class="shouhuoxq-top">
        <span>Recipient:{{ defaultAdderss.name }}</span>
        <span
          >{{ defaultAdderss.phoneCode }}{{ defaultAdderss.phoneNumber }}</span
        >
      </div>
      <div class="shouhuoxq-bottom">
        <span
          >Shipping Address:{{ defaultAdderss.addreCitys }}
          {{ defaultAdderss.userAddress }}</span
        >
      </div>
      <van-icon
        name="arrow"
        class="arrow"
        @click="jumpRouter('确认订单收货地址')"
      />
    </div>
    <div class="payment m-b-20">
      <span>Pay (by)</span>
      <div
        class="fl-right"
        v-for="(pay, index) in payTypeList"
        :key="index"
        @click="changePaymen(pay)"
      >
        <van-checkbox v-model="pay.checked" checked-color="#FA5300">{{
          orderStatus(pay.payType, "payStatus")
        }}</van-checkbox>
      </div>
    </div>
    <div
      class="good-detail"
      v-for="(order, index) in orderData.orderList"
      :key="index"
    >
      <div class="good-detail-header">
        <span>{{ order.sortOrder }}</span>
      </div>
      <div
        class="good-detail-content"
        v-for="(product, index) in order.detailList"
        :key="index"
      >
        <div>
          <van-swipe-cell :right-width="70">
            <template slot="right">
              <van-button
                square
                type="danger"
                text="Delete"
                @click="delItem(product, index)"
              />
            </template>
            <div class="good-detail-img">
              <img v-lazy="$webUrl + product.skuImg" />
              <div
                class="img-nochange"
                v-if="
                  product.stockEnough == 0 ||
                  product.canSell == 0 ||
                  product.freightCode != 0
                "
              >
                {{
                  product.stockEnough == 0
                    ? "Out of Stock"
                    : product.canSell == 0
                    ? "Unsaleable"
                    : product.freightCode == 1
                    ? "Out of delivery area!"
                    : "Overweight!"
                }}
              </div>
            </div>
            <div class="good-detail-title">
              <span class="name">
                <span
                  v-if="product.activityType == 1"
                  class="good-detail-actType"
                  :class="{
                    spen_on:
                      product.activityTagApp != null &&
                      product.activityTagApp != '',
                  }"
                  >{{ product.activityTagApp }}</span
                >
                {{ product.skuName }}
              </span>
              <div class="guige">{{ product.skuValuesTitleEng }}</div>
              <div class="p1">
                {{ product.currencySignWebsite }}{{ product.priceWebsite }}
              </div>
              <div class="p2 through" v-if="product.originPriceWebsite">
                {{ product.currencySignWebsite
                }}{{ product.originPriceWebsite }}
              </div>
            </div>
            <div class="price">
              <div class="p3">
                {{ product.currencySignWebsite }}{{ product.totalPriceWebsite }}
              </div>
              <div class="p4 through" v-if="product.totalOriginPriceWebsite">
                {{ product.currencySignWebsite
                }}{{ product.totalOriginPriceWebsite }}
              </div>
              <div class="selection-right-stepper">
                <div class="add-btn" @click="addCount(product)">+</div>
                <div class="center-input">
                  <input
                    type="number"
                    class="number-input"
                    v-model="product.detailNum"
                    @blur="blur(product)"
                  />
                </div>
                <div class="reduce-btn" @click="reduceCount(product)">一</div>
              </div>
            </div>
          </van-swipe-cell>
        </div>

        <div
          class="nochange"
          v-if="product.stockEnough == 0 || product.canSell == 0"
        ></div>
      </div>

      <div class="yunfei b-t-1">
        <span class="p1">Freight</span>
        <span class="p2"
          >{{ order.orderFareWebsite == 0 ? "" : order.currencySignWebsite
          }}{{
            order.orderFareWebsite == 0
              ? "Free Shipping"
              : order.orderFareWebsite
          }}</span
        >
      </div>
      <div class="payment b-t-1">
        <span>Transportation</span>
        <div
          class="select"
          v-if="order.deliverType == 1 || order.deliverType == 2"
        >
          {{
            order.deliverType == 1 ? "Fulfillment by Tospino" : "Take Delivery"
          }}
        </div>
        <div class="select" v-else>
          <div class="gj-img">
            <img
              v-lazy="$webUrl + '/common/image/zhiyou.png'"
              v-if="orderData.hasFBM == 1"
            />
            <img v-lazy="$webUrl + order.areaImg" v-else />
          </div>
          <span v-if="orderData.hasFBM == 1">Ships from</span>
          <span>{{ order.areaNameEng }}</span>
        </div>
      </div>
      <div class="heji b-t-1">
        <span class="p1">Total</span>
        <span class="p2 c-orange"
          >{{ order.currencySignWebsite }}{{ order.orderAmountWebsite }}</span
        >
      </div>

      <div class="payment b-t-1" v-if="order.transitTimeRangeStringEng">
        <span class="fbm-time"
          >Get it within {{ order.transitTimeRangeStringEng }} after
          payment.</span
        >
      </div>

      <div class="beizhu">
        <van-cell-group>
          <van-field
            v-model="order.remark"
            rows="3"
            autosize
            label="Note"
            type="textarea"
            placeholder="Contact customer service to confirm the order"
          />
        </van-cell-group>
      </div>
    </div>

    <!-- 新增-优惠券 -->
    <div class="youhuiquan-item">
      <div class="youhuiquan-header">
        <span class="youhuiquan-title">Coupons</span>
        <span class="youhuiquan-txt" @click="saleMore">
          -{{ jn }}{{ this.orderData.allOrderCouponAmountWebsite }}
          <van-icon name="arrow" />
        </span>
      </div>
      <!-- <div class="youhuiquan-main">
        <div class="youhuiquan-left">
          <span class="youhuiquan-left-biao">GH{{jn}}</span>
          <p class="youhuiquan-left-money">
            10.00
            <i>OFF</i>
          </p>
          <div class="youhuiquan-left-ms">
            <p class="youhuiquan-left-m">Type:Shop Coupons</p>
            <p class="youhuiquan-left-m">Valid:06/30/2020 23:59</p>
          </div>
          <progress-bar :progressBar="iSpeed"></progress-bar>
        </div>
        <div class="youhuiquan-right">
          <div class="youhuiquan-right-header">
            <span class="youhuiquan-right-title">Black Friday Black Black</span>
          </div>
          <div class="youhuiquan-right-main">
            <p class="youhuiquan-left-mc">For GH₵ 1000.00 consumption</p>
            <van-button round type="info" @click="ProBar" class="youhuiquan-right-btn">Get it now</van-button>
          </div>
        </div>
      </div>-->

      <!-- <div class="youhuiquan-ya">
          <van-row type="flex" justify="space-between">
            <van-col span="12">
              <div class="youhuiquan-title">
                   <img src="@/assets/img/tabbar/home/commodityDetails/youhuiquan-icon.png" />
                   <span class="youhuiquan-txt">618 allowance</span>
             </div>
             <div class="youhuiquan-ts">
                 <span class="youhuiquan-txt">(Only supported online payment)</span>
             </div>
            </van-col>
            <van-col span="6">
              <van-checkbox v-model="checked" checked-color="#FA5300">-{{jn}} 20.36</van-checkbox>
            </van-col>
          </van-row>
      </div>-->
    </div>

    <div class="m-b-20 fbm-beizhu" v-if="orderData.hasFBM == 1">
      Tips: DM products do not support online after-sales services.
      <br />Please contact customer service personnel for consulting!!!
    </div>

    <div class="total">
      <div class="total-top">
        <span class="p1">Subtotal</span>
        <span class="p2"
          >{{ orderData.currencySignWebsite
          }}{{ orderData.allOrderProductAmountWebsite }}</span
        >
      </div>
      <div class="total-bottom">
        <span class="p1">Total Freight</span>
        <span class="p2 c-orange"
          >{{ orderData.currencySignWebsite
          }}{{ orderData.allOrderFareWebsite }}</span
        >
      </div>
    </div>
    <div class="niming">
      <van-checkbox v-model="checked" checked-color="#FA5300"
        >Anonymous Buyer</van-checkbox
      >
    </div>
    <div class="settlement">
      <span class="settlement-p1">Sum:</span>
      <span class="settlement-p2 c-orange"
        >{{ orderData.currencySignWebsite
        }}{{ orderData.allOrderAmountWebsite }}</span
      >
      <div class="settlement-btn" @click="submit">Submit</div>
    </div>
    <div class="settlement-place"></div>
    <!-- 支付成功弹窗 -->
    <action-sheet-sucess
      ref="sucess"
      @showsucess="showsucess"
    ></action-sheet-sucess>
    <!-- 密码弹窗 -->
    <action-sheet-password
      ref="actionSheetPassword"
      @getPassWord="getPassWord"
    ></action-sheet-password>
    <!-- 付款方式弹窗 -->
    <action-sheet-paymen
      ref="actionSheetPaymen"
      :orderSn="orderSn"
      :moeny="Number(orderData.allOrderAmountWebsite)"
      @showPassWord="showPassWord"
      @showpaymen="showpaymen"
      @duanxin="duanxin"
    ></action-sheet-paymen>

    <!-- 更多优惠券 -->
    <order-coupon-pop
      :order="order"
      @orderPop="orderPop"
      @changeCheckbox="changeCheckbox"
      @couponDrawId="couponDrawId"
    ></order-coupon-pop>

    <!-- 返现弹窗 -->
    <van-dialog
      v-model="fanxianStatus"
      class="fanxian-style"
      confirm-button-text="OK"
    >
      <p style="font-weight: bold; font-size: 12px; text-align: center">
        Bonus for Online Payment
      </p>
      <p style="font-size: 12px" class="mt_20">
        Get your corresponding reward:
      </p>
      <br />
      <div
        v-for="(fanxian, index) in fanxianList"
        :key="index"
        style="font-size: 12px; font-weight: bold"
      >
        {{ index + 1 }}.Subtotal Amount Reached
        {{
          fanxian.orderAmountWebsiteEnd
            ? "₵" +
              fanxian.orderAmountWebsiteStart +
              "-" +
              fanxian.orderAmountWebsiteEnd
            : "Over" + " " + "₵" + fanxian.orderAmountWebsiteStart
        }}
        ,
        <div>Get {{ jn }} {{ fanxian.returnCashAmountWebsite }} Bonus</div>
      </div>
      <br />
      <p style="font-size: 12px">
        Please check the bonus in your Tospino Account after order delivery.
      </p>
      <p class="mt_20" style="color: #fa5300; font-size: 12px">Warm Tips:</p>
      <p style="font-size: 12px">
        There is no reward if any refuse or return for your order.
      </p>
    </van-dialog>
  </div>
</template>

<script>
import actionSheetSucess from "@/multiplexing/actionSheetSucess";
import actionSheetPaymen from "@/multiplexing/actionSheetPaymen";
import actionSheetPassword from "@/multiplexing/actionSheetPassword";
import balanceHeader from "./itemComponents/balanceHeader";
import progressBar from "@/multiplexing/progress";
import orderCouponPop from "./itemComponents/orderCouponPop";
import { querydefaultObjectApi } from "@/api/accountSettings/index";
import {
  getconfirmorderApi,
  batchmakeorderApi,
  onlineorderrewardmsgApi,
} from "@/api/confirmOrder/index";
import { orderlaunchpayApi } from "@/api/myOrder/index.js";
import { park } from "@/api";
import { mapState, mapActions } from "vuex";
import { Toast, Notify } from "vant";
export default {
  props: {},
  data() {
    return {
      value1: 1,
      option1: [
        { text: "全部商品", value: 0 },
        { text: "新款商品", value: 1 },
        { text: "活动商品", value: 2 },
      ],
      option2: [
        { text: "默认排序", value: "a" },
        { text: "好评排序", value: "b" },
        { text: "销量排序", value: "c" },
      ],
      payStatus: [
        {
          type: 1,
          name: "Cash on delivery",
        },
        {
          type: 2,
          name: "Online payment",
        },
      ],
      showPayment: false,
      checked: false,
      show: true,
      show1: false,
      radio: true,
      yinhangTitle: "确认付款",
      orderData: {},
      defaultAdderss: {},
      zffs: "",
      payTypeList: [], //支付方式列表
      shopcrtList: [],
      moeny: 0,
      payTypeDetail: 201, //余额支付ID,暂时写死
      // payTypeDetail: 203, //余额支付ID,暂时写死
      orderIdList: [],
      // 用户支付
      userinfoShop: {},
      orderSn: [],
      payTypeListLength: 0,
      order: false, //更多优惠券
      couponList: [], //优惠券领取
      fanxianStatus: false, //返现弹窗
      fanxianList: [], //返现列表
    };
  },

  computed: {
    ...mapState({
      selectionShopCar: (state) => state.selectionShopCar,
    }),
  },
  mounted() {
    //如果在收件地址里面选了地址就从vuex里面找,如果是刚进来的就请求默认地址
    if (!this.$store.state.adressItem.addressId) {
      this.querydefaultObject();
    } else {
      this.defaultAdderss = this.$store.state.adressItem;
      this.refresh();
    }
    //通过购物车进来
    if (this.$route.query.type == "shopcar") {
      let arr = this.$store.state.selectionShopCar;
      arr.forEach((shopCar) => {
        let shopCarObj = {
          shopcrtId: shopCar.shopcrtId,
          skuId: shopCar.skuId,
        };
        this.shopcrtList.push(shopCarObj);
      });
    }
    if (localStorage.userinfoShop) {
      this.userinfoShop = JSON.parse(localStorage.userinfoShop);
    }
  },
  watch: {},
  beforeDestroy() {
    this.deladressitem();
  },
  methods: {
    ...mapActions(["deladressitem"]),
    //提交订单按钮
    submit() {
      if (this.zffs == "") {
        Notify({
          message: "Choose the method of payment.",
          color: "#fff",
          type: "danger",
        });
        return;
      }
      let flag = true;
      let flag2 = true;
      this.orderData.orderList.forEach((ele) => {
        ele.detailList.forEach((ele2) => {
          if (ele2.canSell == 0 || ele2.stockEnough == 0) {
            flag = false;
          }
          if (ele2.freightCode != 0) {
            flag2 = false;
          }
        });
      });
      if (!flag) {
        Toast("Please remove abnormal products");
        return;
      }
      if (!flag2) {
        Toast("Please remove abnormal products/change the address");
        return;
      }
      if (!this.userinfoShop.payPwd) {
        this.$router.push({ name: "设置支付密码" });
        return;
      }
      //提交订单
      this.batchmakeorder(this.orderData);
    },

    //编译状态
    orderStatus(type, list) {
      let name = "";
      this[list].forEach((statu) => {
        if (statu.type == type) {
          name = statu.name;
        }
      });
      return name;
    },
    jumpRouter(name) {
      this.$router.push({ name });
    },
    //弹出支付
    showpaymen() {
      this.$refs.actionSheetPaymen.showyinhang();
    },
    //弹出支付成功
    showsucess() {
      this.$refs.sucess.showAction = true;
      setTimeout(() => {
        this.$router.replace({ name: "我的订单" });
        sessionStorage.setItem("activeIndex", 2);
      }, 1000);
    },
    //弹出密码框
    showpassword() {
      this.$refs.actionSheetPassword.showAction = true;
    },
    //获取用户默认收货地址信息
    querydefaultObject() {
      querydefaultObjectApi().then((res) => {
        if (res.code == 0) {
          if (res.Data == null) {
            this.jumpRouter("确认订单收货地址");
            return;
          }
          this.defaultAdderss = res.Data;
          this.refresh();
        }
      });
    },
    //加数量
    addCount(item) {
      item.detailNum++;
      this.changeNumber();
    },
    //减数量
    reduceCount(item) {
      if (item.detailNum <= item.minStartNum) {
        Toast("Not less than MOQ" + item.minStartNum);
        return;
      }
      item.detailNum--;
      this.changeNumber();
    },
    //更改数量
    changeNumber() {
      let arr = [];
      // let coupons = [];
      let data = {
        addressId: this.defaultAdderss.addressId,
        detailList: arr,
      };
      // 商品明细列表
      this.orderData.orderList.forEach((ele) => {
        ele.detailList.forEach((item) => {
          let obj = {
            skuId: item.skuId,
            detailNum: Number(item.detailNum),
          };
          arr.push(obj);
        });
      });
      this.getconfirmorder(data);
    },
    //input失焦事件
    blur(item) {
      if (item.detailNum < item.minStartNum) {
        Toast("Not less than MOQ" + item.minStartNum);
        item.detailNum = item.minStartNum;
        return;
      }
      item.detailNum = Math.ceil(item.detailNum);
      this.changeNumber();
    },
    //删除某个商品
    delItem(good, goodindex) {
      if (
        this.orderData.orderList.length == 1 &&
        this.orderData.orderList[0].detailList.length == 1
      ) {
        Toast("Cannot delete all goods");
        return;
      }
      this.orderData.orderList.forEach((ele, eleIndex) => {
        ele.detailList.forEach((item) => {
          if (item.skuId == good.skuId) {
            ele.detailList.splice(goodindex, 1);
            this.shopcrtList.forEach((shopcrt, shopcrtIndex) => {
              if (shopcrt.skuId == item.skuId) {
                this.shopcrtList.splice(shopcrtIndex, 1);
              }
            });
            if (ele.detailList.length == 0) {
              this.orderData.orderList.splice(eleIndex, 1);
            }
          }
        });
      });
      this.changeNumber();
    },
    // 领取优惠券
    couponDrawId(Id) {
      this.changeCheckbox(Id);
    },
    // 优惠券
    changeCheckbox(drawId) {
      let arr = [];
      let coupon = {
        addressId: this.defaultAdderss.addressId,
        detailList: arr,
        couponDrawList: drawId,
      };
      // 商品明细列表
      this.orderData.orderList.forEach((ele) => {
        ele.detailList.forEach((item) => {
          let obj = {
            skuId: item.skuId,
            detailNum: Number(item.detailNum),
          };
          arr.push(obj);
        });
      });
      // 优惠券选择
      this.getconfirmorder(coupon);
    },
    //订单详情
    getconfirmorder(data) {
      // // 缓存订单数据在vuex
      // this.$store.state.orderDetails = data;
      getconfirmorderApi(data).then((res) => {
        if (res.code == 0) {
          this.orderData = res.Data;
          // 缓存优惠券列表在vuex
          this.couponList = this.$store.state.coupons = this.orderData.couponList;
          this.$store.state.couponListUse = this.orderData.couponListCannotUse;
          if (this.payTypeList.length == 0) {
            //第一次请求
            this.payTypeList = res.Data.payTypeList;
            this.payTypeListLength = this.payTypeList.length;
            this.zffs = "";
            if (res.Data.rewardRegionList.length > 0) {
              this.fanxianStatus = true;
              this.fanxianList = res.Data.rewardRegionList;
            }
          } else if (this.payTypeList.length != res.Data.payTypeList.length) {
            this.payTypeList = res.Data.payTypeList;
            this.payTypeListLength = this.payTypeList.length;
            this.zffs = "";
          }
        }
      });
    },
    //确认订单提交订单接口
    batchmakeorder(orderObj) {
      let obj = {
        addressId: this.defaultAdderss.addressId,
        payType: this.zffs,
        isAnonymous: this.checked ? 1 : 0,
        orderSource: 1,
        orderList: orderObj.orderList,
        shopcrtList: this.shopcrtList,
        couponList: this.couponList,
      };
      batchmakeorderApi(obj).then((res) => {
        let orderIdArr = [];
        if (res.code == 0) {
          //   支付方式为货到付款,直接跳转到我的订单(待发货)
          if (this.zffs == 1) {
            this.$router.replace({ name: "我的订单" });
            sessionStorage.setItem("activeIndex", 2);
          } else {
            //弹出支付弹框
            this.showpaymen();
            res.Data.forEach((item) => {
              orderIdArr.push({ orderId: Number(item.orderId) });
            });
            this.orderIdList = orderIdArr;
            this.orderSn = this.orderIdList;
          }
        } else if (res.code == 1) {
          Toast("Parameter “requestModel” cannot be empty.");
        } else if (res.code == 2) {
          Toast("Parameter”orderList” cannot not be empty.");
        } else if (res.code == 3) {
          Toast("Parameter Method of Payment cannot not be empty.");
        } else if (res.code == 4) {
          Toast("Parameter Shipping Address ID cannot not be empty.");
        } else if (res.code == 5) {
          Toast("Parameter Anonymous Buyer cannot not be empty.");
        } else if (res.code == 6) {
          Toast("Parameter Order List cannot not be empty.");
        } else if (res.code == 7) {
          Toast("Parameter”detailList” cannot not be empty.");
        } else if (res.code == 21) {
          Toast("The product is invalid. Please reconfirm the order.");
          this.refresh();
        } else if (res.code == 22) {
          Toast("The MOQ is insufficient. Please reconfirm the order.");
          this.refresh();
        } else if (res.code == 23) {
          Toast("The stock is insufficient. Please reconfirm the order.");
          this.refresh();
        } else if (res.code == 24) {
          Toast("The product price is changed. Please reconfirm the order.");
          this.refresh();
        } else if (res.code == 25) {
          Toast("FBM products do not support pay by cash.");
          this.refresh();
        }

        //易观数据采集----支付订单
        let reason = "";
        if (res.code == 1) {
          reason = "Parameter “requestModel” cannot be empty.";
        } else if (res.code == 2) {
          reason = "Parameter”orderList” cannot not be empty.";
        } else if (res.code == 3) {
          reason = "Parameter Method of Payment cannot not be empty.";
        } else if (res.code == 4) {
          reason = "Parameter Shipping Address ID cannot not be empty.";
        } else if (res.code == 5) {
          reason = "Parameter Anonymous Buyer cannot not be empty.";
        } else if (res.code == 6) {
          reason = "Parameter Order List cannot not be empty.";
        } else if (res.code == 7) {
          reason = "Parameter”detailList” cannot not be empty.";
        } else if (res.code == 21) {
          reason = "The product is invalid. Please reconfirm the order.";
        } else if (res.code == 22) {
          reason = "The MOQ is insufficient. Please reconfirm the order.";
        } else if (res.code == 23) {
          reason = "The stock is insufficient. Please reconfirm the order.";
        } else if (res.code == 24) {
          reason = "The product price is changed. Please reconfirm the order.";
        } else if (res.code == 25) {
          reason = "FBM products do not support pay by cash.";
        }
        AnalysysAgent.track(
          "pay_order",
          {
            receiver_province: this.defaultAdderss.province,
            shipping_method: "Fulfillment by Tospino",
            receiver_city: this.defaultAdderss.city,
            total_discount: this.orderData.allOrderCouponAmountWebsite,
            is_anonymous: this.checked == false ? false : true,
            order_amount: (
              parseFloat(this.orderData.allOrderProductAmountWebsite) +
              parseFloat(this.orderData.allOrderFareWebsite)
            ).toString(),
            order_actual_amount: this.orderData.allOrderAmountWebsite,
            receiver_area: this.defaultAdderss.district,
            shipping_cost: parseFloat(this.orderData.allOrderFareWebsite),
            order_id: res.Data[0].orderSn,
            is_successful: res.code == 0 ? true : false,
            failure_reason: reason,
            receiver_name: this.defaultAdderss.name,
            receiver_address: this.defaultAdderss.addreCitys,
            is_use_discount:
              this.orderData.allOrderCouponAmountWebsite == 0 ? false : true,
            pay_channel: this.zffs == 1 ? "Cash on delivery" : "Online payment",
            receive_phonenum: this.defaultAdderss.phoneNumber,
          },
          (rel) => {}
        );
      });
    },
    //刷新页面
    refresh() {
      let obj = {
        addressId: this.defaultAdderss.addressId,
        detailList: this.selectionShopCar,
        autoSelectCoupon: 1,
      };
      this.getconfirmorder(obj);
    },

    //订单发起支付
    orderlaunchpay(data) {
      orderlaunchpayApi(data).then((res) => {
        if (res.code == 0) {
          this.showsucess();
        } else if (res.code == 1) {
          Toast("Parameter “requestModel” cannot be empty.");
        } else if (res.code == 2) {
          Toast("Parameter Method of Payment cannot not be empty.");
        } else if (res.code == 3) {
          Toast(
            "The payment password cannot be empty if you choose Pay by Balance."
          );
        } else if (res.code == 4) {
          Toast("Parameter”orderList” cannot not be empty.");
        } else if (res.code == 5) {
          Toast("Parameter Order ID must be larger than 0.");
        } else if (res.code == 21) {
          Toast("Set the payment password first.");
          setTimeout(() => {
            this.$router.push({ name: "设置支付密码" });
          }, 1000);
        } else if (res.code == 22) {
          Toast("Incorrect password!");
        } else if (res.code == 23) {
          Toast("Your balance isn't enough to pay.");
        } else if (res.code == 31) {
          Toast("The submitted order list cannot be empty.");
        } else if (res.code == 32) {
          Toast(
            "The existing order isn’t belong to the current user and cannot be operated."
          );
        } else if (res.code == 33) {
          Toast("The existing order is paid and cannot be repaid.");
        } else if (res.code == 34) {
          Toast("The submitted order list involves Unpaid order.");
        } else if (res.code == 35) {
          Toast(
            "The submitted order list involves unsuccessful payment order. "
          );
        }
      });
    },
    //获取到密码,请求接口
    getPassWord(value) {
      let obj = {
        payTypeDetail: this.payTypeDetail,
        payPwd: value,
        orderList: this.orderIdList,
      };

      this.orderlaunchpay(obj);
    },
    showPassWord(flag) {
      this.$refs.actionSheetPassword.showAction = flag;
    },
    //选择支付方式
    changePaymen(dataItem) {
      this.payTypeList.forEach((item) => {
        item.checked = false;
      });
      dataItem.checked = true;
      this.zffs = dataItem.payType;
      this.$forceUpdate();
    },
    // 更多优惠券
    saleMore() {
      this.order = true;
    },
    orderPop() {
      this.order = false;
    },
    //返现短信
    duanxin() {
      let data = this.orderIdList;
      onlineorderrewardmsgApi({ orderList: data }).then((res) => {});
    },
  },
  components: {
    actionSheetPaymen,
    actionSheetSucess,
    actionSheetPassword,
    balanceHeader,
    progressBar,
    orderCouponPop,
  },
};
</script>

<style scoped lang="less">
.order-content {
  width: 100%;
  height: 100%;
  .shouhuoxq {
    background-color: #fff;
    position: relative;
    font-size: 30px;
    color: #333;
    padding: 30px 0 30px 30px;
    line-height: 45px;
    .shouhuoxq-top {
      margin-top: 29px;
    }
    .shouhuoxq-bottom {
      display: inline-block;
      width: 627px;
      word-wrap: break-word;
    }
    .arrow {
      position: absolute;
      top: 110px;
      right: 30px;
    }
  }
  .payment {
    height: 100px;
    background-color: #fff;
    line-height: 100px;
    position: relative;
    z-index: 6;
    padding: 0 30px;
    /deep/ .van-checkbox {
      display: inline-block;
      .van-checkbox__icon {
        vertical-align: sub;
        display: inline-block;
        font-size: 40px;
      }
      .van-checkbox__label {
        font-size: 28px;
        margin-right: 20px;
      }
    }
    span:nth-child(1) {
      font-size: 26px;
    }
    .select {
      float: right;
      font-size: 26px;
      color: #333;
      .xiala {
        width: 180px;
        position: absolute;
        background-color: #fff;
        text-align: center;
        right: 29px;
        z-index: 1;
      }
    }
    .gj-img {
      width: 45px;
      display: inline-block;
      vertical-align: sub;
      margin-right: 10px;
    }
    .ellipsis {
      vertical-align: middle;
      font-weight: bold;
      margin-left: 29px;
    }
    .fbm-time {
      font-size: 26px;
      font-weight: 400;
      color: rgba(8, 129, 214, 1);
    }
  }
  .good-detail {
    .good-detail-header {
      width: 100%;
      height: 79px;
      line-height: 79px;
      font-size: 30px;
      color: #333;
      background-color: #fff;
      padding-left: 30px;
      box-sizing: border-box;
      border-bottom: 1px solid #f2f3f5;
    }
    .good-detail-content {
      width: 100%;
      background-color: #fff;
      box-sizing: border-box;
      padding: 30px;
      .good-detail-img {
        width: 150px;
        height: 150px;
        float: left;
        margin-right: 20px;
        .img-nochange {
          position: absolute;
          left: 0;
          top: 0;
          width: 150px;
          height: 150px;
          background-color: rgba(0, 0, 0, 0.5);
          color: #fff;
          font-size: 30px;
          line-height: 40px;
          text-align: center;
          display: flex;
          align-items: center;
          justify-content: space-around;
          flex-direction: column;
        }
      }
      .good-detail-title {
        display: inline-block;
        width: 336px;
        .name {
          display: inline-block;
          margin-bottom: 24px;
          color: #333;
          font-size: 22px;
          line-height: 26px;
          line-height: 50px;
          .good-detail-actType {
            color: #fff;

            border-radius: 14px;
          }
          .spen_on {
            padding: 6px 12px;
            background: #fa5400;
          }
        }
        .guige {
          color: #666;
          font-size: 18px;
          margin-bottom: 12px;
        }
        .p1 {
          color: #333;
          font-size: 24px;
        }
        .p2 {
          color: #999;
        }
      }
      .price {
        position: absolute;
        top: 61px;
        right: 30px;
        .p3 {
          font-size: 28px;
          color: #333;
          margin-bottom: 5px;
        }
        .p4 {
          color: #999;
          font-size: 20px;
        }
        .selection-right-stepper {
          position: relative;
          height: 156px;
          .add-btn {
            position: absolute;
            top: 20px;
            right: -10px;
            width: 40px;
            height: 40px;
            border: 1px solid #999999;
            text-align: center;
            line-height: 40px;
            background-color: #eeeeee;
            color: #666;
            border-left: none;
            font-size: 40px;
          }
          .reduce-btn {
            position: absolute;
            top: 20px;
            right: 128px;
            width: 40px;
            height: 40px;
            border: 1px solid #999999;
            border-right: none;
            text-align: center;
            line-height: 40px;
            background-color: #eeeeee;
            color: #666;
          }
          .center-input {
            position: absolute;
            top: 20px;
            right: 40px;
            width: 88px;
            height: 40px;
            text-align: center;
            line-height: 40px;
            .number-input {
              width: 90%;
              height: 75%;
              text-align: center;
            }
          }
        }
      }
      .nochange {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 1;
      }
      .van-swipe-cell {
        min-height: 210px;
        z-index: 5;
        /deep/ .van-swipe-cell__wrapper {
          height: 100%;
          .van-swipe-cell__right {
            width: 140px;
            line-height: 210px;
            .van-button--square {
              height: 100%;
              width: 100%;
              font-size: 30px;
            }
          }
        }
      }
    }
    .yunfei,
    .heji {
      height: 63px;
      padding: 0 30px;
      box-sizing: border-box;
      font-size: 26px;
      color: #333;
      position: relative;
      background-color: #fff;
      .p1 {
        float: left;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
      }
      .p2 {
        float: right;
        position: absolute;
        top: 50%;
        right: 30px;
        transform: translateY(-50%);
      }
    }
    .beizhu {
      margin-bottom: 20px;
      /deep/ .van-cell-group {
        .van-cell {
          padding-left: 30px;
          font-size: 26px;
        }
      }
    }
  }

  // 新增-优惠券
  .youhuiquan-item {
    background-color: #fff;
    margin-bottom: 20px;
    padding: 20px 30px;
    box-sizing: border-box;
    .youhuiquan-header {
      display: flex;
      justify-content: space-between;
      .youhuiquan-title {
        font-size: 30px;
        font-weight: bold;
      }
      .youhuiquan-txt {
        margin-top: 10px;
        font-size: 24px;
        color: #fa5300;
        /deep/ .van-icon {
          color: #000;
        }
      }
    }

    .youhuiquan-main {
      display: flex;
      background: #fff3eb;
      margin-top: 15px;
      .youhuiquan-left {
        width: 46%;
        padding: 20px 0 16px 20px;
        .youhuiquan-left-biao {
          font-size: 25px;
          color: #fa5300;
        }
        .youhuiquan-left-money {
          font-size: 60px;
          font-weight: bold;
          color: #fa5300;
          i {
            font-size: 25px;
            font-weight: normal;
          }
        }
        .youhuiquan-left-m {
          font-size: 20px;
          color: #fa5300;
          padding-top: 6px;
        }
      }
    }
    .youhuiquan-right {
      width: 54%;
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
        .youhuiquan-left-mc {
          font-size: 24px;
          color: #fa5300;
          padding-top: 6px;
        }
        .youhuiquan-right-btn {
          margin-top: 15px;
        }
        /deep/ .van-button--info {
          color: #fff;
          background: #fa5300;
          border: 1px solid #fff;
          font-size: 30px;
          padding: 30px 42px;
        }
        /deep/ .van-button {
          line-height: 0;
        }
      }
    }
    .youhuiquan-ya {
      padding-top: 36px;
      .youhuiquan-title {
        display: flex;
        img {
          max-width: 50px;
          max-height: 32px;
          height: 32px;
        }
        .youhuiquan-txt {
          line-height: 32px;
          padding-left: 9px;
          font-size: 26px;
        }
      }
      .youhuiquan-ts {
        padding-top: 18px;
        font-size: 20px;
        color: #666;
      }
      /deep/ .van-col--6 {
        text-align: right;
      }
      /deep/ .van-checkbox {
        display: inline-block;
        .van-checkbox__icon {
          vertical-align: sub;
          display: inline-block;
          font-size: 36px;
          padding-top: 14px;
        }
        .van-checkbox__label {
          font-size: 28px;
        }
      }
    }
  }

  .fbm-beizhu {
    color: rgba(235, 2, 2, 1);
    font-size: 20px;
    padding: 0 30px;
  }
  .total {
    height: 126px;
    background-color: #fff;
    .total-top,
    .total-bottom {
      height: 63px;
      line-height: 63px;
      position: relative;
      .p1 {
        position: absolute;
        top: 50%;
        left: 30px;
        transform: translateY(-50%);
        font-size: 26px;
        color: #333;
      }
      .p2 {
        position: absolute;
        top: 50%;
        right: 30px;
        transform: translateY(-50%);
        font-size: 30px;
      }
    }
  }
  .niming {
    width: 100%;
    height: 80px;
    line-height: 80px;
    padding-left: 30px;
    box-sizing: border-box;
    /deep/ .van-checkbox {
      display: inline-block;
      .van-checkbox__icon {
        display: inline-block;
        font-size: 40px;
      }
      .van-checkbox__label {
        font-size: 28px;
        margin-left: 20px;
      }
    }
  }
  .settlement-place {
    height: 120px;
  }
  .settlement {
    width: 100%;
    height: 120px;
    background-color: #fff;
    line-height: 120px;
    padding-left: 30px;
    box-sizing: border-box;
    position: fixed;
    bottom: 0;
    z-index: 10;
    .settlement-p1 {
      font-size: 20px;
      color: #333;
    }
    .settlement-p2 {
      font-size: 42px;
    }
    .settlement-btn {
      width: 240px;
      height: 120px;
      float: right;
      background-color: #fa5300;
      text-align: center;
      color: #fff;
      font-size: 36px;
      line-height: 120px;
    }
  }
}
.fanxian-style {
  width: 600px;
  //   padding: 30px 30px 0;
  font-size: 28px;
  line-height: 40px;
  /deep/.van-dialog__content {
    padding: 30px 30px 0;
  }
  /deep/ .van-dialog__footer {
    margin-top: 30px;
    .van-button.van-button--default.van-button--large.van-dialog__confirm {
      height: 80px;
      background: #fa5300;
      .van-button__text {
        font-size: 40px;
        color: #fff;
      }
    }
  }
}
.m-b-20 {
  margin-bottom: 20px;
}
.b-t-1 {
  border-top: 1px solid #f2f3f5;
}
.c-999 {
  color: #999;
}
</style>
