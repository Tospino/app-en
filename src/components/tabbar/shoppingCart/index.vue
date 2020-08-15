<!--
 * @Author: zlj
 * @Date: 2020-07-18 17:45:35
 * @LastEditTime: 2020-08-13 17:48:40
 * @LastEditors: Please set LastEditors
 * @Description: 新增优惠券入口---修改样式(保留之前样式 indexBefore)
 * @FilePath: \app-en\src\components\tabbar\shoppingCart\index.vue
--> 

<template>
  <!-- 购物车 -->
  <div class="shopping-cart" ref="content">
    <div class="shopping-cart-header">
      <span class="header-t1">Cart({{shoplength}})</span>
      <span class="header-t2" @click="mange" v-if="conditions">{{showMange?'Management':'OK'}}</span>
    </div>
    <div class="place"></div>
    <div class="shopping-cart-container" v-if="conditions" ref="shoppingContainer">
      <!-- 有商品的页面 -->
      <div v-if="dataList.length>0">
        <div class="shopping-cart-content" v-for="(data,index) in dataList" :key="index">
          <!-- <div class="serial-number">
                        <van-checkbox v-model="data.checkStatus" icon-size="24px" checked-color="#F83600" @click="changeCheckbox(data,'all')"></van-checkbox>
          </div>-->
          <div class="good-box" v-for="(dataitem,index) in data.list" :key="index">
            <!-- 新增-第二版 -->
            <div class="goods-content">
              <div class="goods-header" v-if="dataitem.couponId==null?false:true">
                <div class="goods-left">
                  <div
                    class="goods-coupons"
                  >{{dataitem.couponType==1?"Tospino's Price-off":dataitem.couponType==3?"Shop's Price-off":''}}</div>
                  <span
                    class="goods-coupons-money"
                  >{{jn}}{{dataitem.reduceAmount}} off for {{jn}}{{dataitem.upToAmount}} buying</span>
                </div>
                <p
                  class="goods-add"
                  @click="addOn(dataitem.businessId,dataitem.expId,dataitem.couponType)"
                >
                  Add-on ltem
                  <van-icon name="arrow" />
                </p>
              </div>
              <div class="good-item">
                <div class="good-item-l">
                  <van-checkbox
                    v-model="dataitem.checkStatus"
                    icon-size="24px"
                    checked-color="#F83600"
                    @click="changeCheckbox(dataitem,'',data)"
                  ></van-checkbox>
                  <div class="good-img" @click="toDetail(dataitem.skuId)">
                    <img v-lazy="$webUrl+dataitem.imgUrl" />
                  </div>
                </div>
                <div class="good-item-r">
                  <span class="good-describe" @click="toDetail(dataitem.skuId)">{{dataitem.skuName}}</span>
                  <div class="good-seclet">
                    <select name disabled>
                      <option value="0">{{dataitem.skuValuesTitleEng}}</option>
                    </select>
                  </div>
                  <div class="good-logistics" v-if="dataitem.expId == 1">
                    <img v-lazy="$webUrl+'/common/image/zhiyou.png'" />
                    <span>Ships from {{dataitem.areaNameEng}}</span>
                  </div>
                  <div class="good-price">
                    <span
                      class="price-p1"
                    >{{jn}}{{dataitem.discountPrice ? dataitem.discountPrice : dataitem.salePrice}}</span>
                    <span
                      class="price-p2"
                      v-if="dataitem.discountPrice"
                    >{{jn}}{{dataitem.salePrice}}</span>
                    <div class="good-price-r">
                      <van-stepper
                        class="price-quantity"
                        v-model="dataitem.shopNumber"
                        :min="dataitem.numIntervalStart"
                        :max="dataitem.canSalesNum"
                        @change="changeStepper(dataitem)"
                      />
                      <p class="price-batch">MOQ{{dataitem.numIntervalStart}}Pcs</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 失效商品 -->
      <div class="shopping-cart-content" v-if="wuxiaoList.length>0">
        <div class="good-box">
          <div class="serial-number">
            <span class="invalid-num">Invalid Products:{{wuxiaoList.length}}</span>
            <span class="empty" @click="emptyPro">Clear</span>
          </div>
          <div class="goods-content good-item" v-for="(wuxiao,index) in wuxiaoList" :key="index">
            <div class="good-item-l">
              <span class="invalid">Invalid</span>
              <div class="good-img">
                <img v-lazy="$webUrl+wuxiao.imgUrl" />
              </div>
            </div>
            <div class="good-item-r">
              <span class="good-describe">{{wuxiao.skuName}}</span>
              <div class="good-seclet">
                <span class="specifications">{{wuxiao.skuValuesTitleEng}}</span>
              </div>
              <div class="good-price">
                <span class="price-batch-left">Sold Out</span>
                <p class="price-batch-right" @click="toXiangsi(wuxiao)">Similar Items</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="no-shopping" v-else>
      <!-- 没有商品的页面 -->
      <div class="no-shopping-img">
        <img src="@/assets/img/tabbar/shoppingCart/icon@2x.png" />
        <div class="no-shopping-p1">Your cart is empty</div>
        <div class="no-shopping-p2" @click="jumpRouter('首页')">Go to the Mall</div>
      </div>
    </div>
    <div>
      <footer-exhibition
        v-if="footerShow"
        :footerData="footerData"
        ref="footer"
        @clickPro="toDetail"
      ></footer-exhibition>
    </div>
    <div style="height:60px" v-if="conditions">
      <div class="settlement">
        <span class="settlement-text" v-if="showMange">
          <van-checkbox
            v-model="checked"
            icon-size="24px"
            class="checkbox"
            checked-color="#F83600"
            @change="cliAllcheck"
          ></van-checkbox>
          <span class="c-999">Select All</span>
          <div class="fl-right">
            <span class="p2">Total:</span>
            <span class="p3">{{jn}}{{totlaMoney}}</span>
            <span
              class="btn"
              @click="settlementBtn"
              :style="{background : (totlaNum>0 ? '#FA5300':'#999')}"
            >Checkout({{totlaNum}})</span>
          </div>
        </span>
        <span class="settlement-text" v-else>
          <van-checkbox
            v-model="checked"
            icon-size="24px"
            class="checkbox2"
            checked-color="#F83600"
            @change="cliAllcheck"
          ></van-checkbox>
          <span class="btn1" @click="delOrder">Delete</span>
          <span class="btn2" @click="adduserfavor">Move to Collection</span>
          <span class="p1">Select All</span>
        </span>
      </div>
    </div>

    <van-overlay :show="show">
      <!-- 遮罩层确认购买弹框 -->
      <div class="overlay-wrapper" @click.stop>
        <div class="overlay-wrapper-p1">Delete the {{totlaNum}} products?</div>
        <div class="overlay-wrapper-btns">
          <span @click="show = false">No</span>
          <span @click="delgood">Yes</span>
        </div>
      </div>
    </van-overlay>
  </div>
</template>

<script>
import footerExhibition from "@/multiplexing/footerExhibition";
import {
  shopcartlistApi,
  deleteshopcartApi,
  emptycartApi,
  getproductskunumpricelistApi,
  addshopcartApi,
} from "@/api/shoppingCart/index";
import { guessyoulikeApi } from "@/api/search/index";
import { Toast, Dialog } from "vant";
import { mapState, mapActions } from "vuex";
import { adduserfavoritesApi } from "@/api/favorites/index.js";
export default {
  props: {},
  data() {
    return {
      checked: false,
      show: false,
      showMange: true,
      scroll: "",
      footerShow: false,
      formData: {
        page: 1,
        limit: 10,
      },
      dataList: [],
      youxiaoList: [],
      wuxiaoList: [],
      youlikeData: {
        page: 1,
        limit: 6,
        seraname: "",
      },
      footerData: {},
      shopList: [],
      totlaMoney: 0,
      totlaNum: 0,
      selectionList: [],
      pullUp: true,
      kanmengou: true,
      shopcarTotal: 0,
    };
  },
  computed: {
    conditions() {
      return this.shopList.length > 0;
    },
    shoplength() {
      return this.shopcarTotal;
    },
    ...mapState({
      selectionShopCar: (state) => state.selectionShopCar,
    }),
  },
  created() {},
  mounted() {
    window.addEventListener("scroll", this.menu, true);
    this.shopcartlist(this.formData);
    this.guessyoulike();
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.menu, true);
  },
  watch: {},
  methods: {
    ...mapActions(
      // 语法糖
      ["setstopcarlist"] // 相当于this.$store.dispatch('setstopcarlist'),提交这个方法
    ),
    toDetail(skuId) {
      this.$router.push({ name: "商品详情", query: { skuId } });
    },
    mange() {
      this.showMange = !this.showMange;
    },
    toXiangsi(item) {
      this.$router.push({
        name: "找相似商品",
        query: { categoryId: item.categoryId },
      });
    },
    //获取滚动条距离底部距离
    menu() {
      let footerHeight = this.$refs.footer.$el.clientHeight;
      let componentsHeight = this.$refs.content.clientHeight;
      let pingmu = document.body.clientHeight;
      let dibujuli = pingmu + footerHeight;
      let cha = componentsHeight - dibujuli;
      this.scroll =
        document.documentElement.scrollTop || document.body.scrollTop;

      if (this.pullUp && this.scroll >= cha) {
        if (this.kanmengou) {
          this.formData.page++;
          this.shopcartlist(this.formData, true);
          this.kanmengou = false;
        }
      }
    },
    jumpRouter(name) {
      this.$router.push({ name });
    },
    //购物车列表
    shopcartlist(data, flag) {
      shopcartlistApi(data).then((res) => {
        let youxiaoList = [],
          wuxiaoList = [];
        if (res.code == 0) {
          if (flag) {
            this.shopList = this.shopList.concat(res.Data.list);
          } else {
            this.shopList = res.Data.list;
          }
          this.kanmengou = true;
          this.shopcarTotal = res.Data.totalCount;
          if (this.shopList.length >= this.shopcarTotal) {
            this.pullUp = false;
          }

          this.shopList.forEach((item) => {
            if (item.isValid == 1) {
              youxiaoList.push(item);
            } else {
              wuxiaoList.push(item);
            }
          });
          this.youxiaoList = youxiaoList;
          this.wuxiaoList = wuxiaoList;
          //根据businessId分类
          this.dataList = this.groupArr(this.youxiaoList, "businessId");
          console.log("shopcartlist ->   this.dataList", this.dataList);
          this.dataList.forEach((item) => {
            item.list.forEach((listitem) => {
              listitem.checkStatus = false;
            });
          });
        } else {
          this.kanmengou = false;
        }
      });
    },
    //通过某个字段进行分组
    groupArr(list, field) {
      let obj = {};
      let item = "";
      // let list = [];
      for (var i = 0; i < list.length; i++) {
        for (item in list[i]) {
          if (item == field) {
            obj[list[i][item]] = {
              list: obj[list[i][field]] ? obj[list[i][field]].list : [],
            };
          }
        }
        obj[list[i][field]].list.push(list[i]);
      }
      let att = [];
      for (item in obj) {
        att.push({
          list: obj[item].list,
        });
      }
      return att;
    },
    //猜你喜欢
    guessyoulike() {
      guessyoulikeApi(this.youlikeData).then((res) => {
        if (res.code == 0) {
          this.footerData = res.Data;
          this.footerShow = true;
        }
      });
    },
    //点击复选框
    changeCheckbox(item, flag, list) {
      item.checkStatus = !item.checkStatus;
      if (flag == "all") {
        //订单上的复选框,该订单商品全选中
        item.list.forEach((ele) => {
          ele.checkStatus = item.checkStatus;
        });
      } else {
        //点击订单某一个商品的复选框
        let itemFlag = true; //标记
        list.list.forEach((element) => {
          //如果有一个是没选中的
          if (element.checkStatus == false) {
            itemFlag = false;
          }
        });
        //判断状态
        if (itemFlag) {
          //全部选中
          list.checkStatus = true;
        } else {
          //有一个没选中
          list.checkStatus = false;
        }
      }
      this.zongji();
      this.$forceUpdate();
    },
    //点击全选
    cliAllcheck(status) {
      this.dataList.forEach((ele) => {
        ele.checkStatus = status;
        ele.list.forEach((item) => {
          item.checkStatus = status;
        });
      });
      this.zongji();
      this.$forceUpdate();
    },
    //结算
    settlementBtn() {
      if (this.totlaNum == 0) {
        Toast("Didn’t choose product");
        return;
      }
      this.setstopcarlist(this.selectionList.map((o) => Object.assign({}, o)));
      this.$router.push({ name: "确认订单详情", query: { type: "shopcar" } });
    },
    //总计计算
    zongji() {
      let arr = [];
      let arr2 = [];
      this.dataList.forEach((ele) => {
        ele.list.forEach((item) => {
          if (item.checkStatus) {
            let obj = {
              skuId: item.skuId,
              detailNum: item.shopNumber,
              shopcrtId: item.shopcrtId,
            };
            let obj2 = {
              skuId: item.skuId,
              num: item.shopNumber,
            };
            arr.push(obj);
            arr2.push(obj2);
          }
        });
      });
      this.selectionList = arr.map((o) => Object.assign({}, o));
      if (arr2.length == 0) {
        this.totlaMoney = 0;
        this.totlaNum = 0;
        return;
      }
      this.getproductskunumpricelist(arr2);
    },
    //更改数量
    changeStepper(itemdetail) {
      let arr = [];
      let addshopcartObj = {
        shopcrtId: itemdetail.shopcrtId,
        shopNumber: itemdetail.shopNumber,
      };
      this.dataList.forEach((ele) => {
        ele.list.forEach((item) => {
          if (item.checkStatus) {
            let obj = {
              num: item.shopNumber,
              skuId: item.skuId,
            };
            arr.push(obj);
          }
        });
      });
      this.addshopcart([addshopcartObj]);
      this.zongji();
    },
    //删除订单
    delOrder() {
      if (this.totlaNum == 0) {
        Toast("No orders can be canceled");
        return;
      }
      this.show = true;
    },
    //删除商品
    delgood() {
      let arr = [];
      this.selectionList.forEach((item) => {
        arr.push(item.shopcrtId);
      });
      this.deleteshopcart(arr);
    },
    //删除购物车商品
    deleteshopcart(dataList) {
      deleteshopcartApi(dataList).then((res) => {
        if (res.code == 0) {
          this.shopcartlist(this.formData);
          this.guessyoulike();
          this.show = false;
        }
      });
    },
    //清空失效商品
    emptycart() {
      emptycartApi({ name: "no" }).then((res) => {
        if (res.code == 0) {
          this.shopcartlist(this.formData);
          this.guessyoulike();
        }
      });
    },
    //清空按钮
    emptyPro() {
      this.emptycart();
    },
    //移入收藏夹
    adduserfavor() {
      let arr = [];
      this.dataList.forEach((ele) => {
        ele.list.forEach((item) => {
          if (item.checkStatus) {
            arr.push(item.skuId);
          }
        });
      });
      if (arr.length == 0) {
        Toast("Please choose the products you need to collect.");
        return;
      }
      this.adduserfavorites(arr);
    },
    //加入收藏夹
    adduserfavorites(data) {
      adduserfavoritesApi(data).then((res) => {
        if (res.code == 0) {
          Toast("Collected");
        }
      });
    },
    //根据商品skuid与商品数量获取优惠价
    getproductskunumpricelist(data) {
      getproductskunumpricelistApi(data).then((res) => {
        if (res.code == 0) {
          this.totlaMoney = res.totalprice;
          this.totlaNum = res.totalnum;
          this.dataList.forEach((ele) => {
            ele.list.forEach((item) => {
              res.Data.forEach((dataItem) => {
                if (item.skuId == dataItem.skuId) {
                  if (item.discountPrice) {
                    item.discountPrice = dataItem.price;
                  } else {
                    item.salePrice = dataItem.price;
                  }
                }
              });
            });
          });
        }
      });
    },
    //添加购物车
    addshopcart(data) {
      addshopcartApi(data).then((res) => {
        if (res.code == 0) {
        }
      });
    },
    // 更多
    addOn(businessId, expId, couponType) {
      console.log("addOn -> expId", expId);
      // 根据类型couponType为3就带参数跳转
      if (couponType == 3) {
        this.$router.push({
          name: "搜索商品1",
          query: {
            businessId: businessId,
            expIds: expId,
          },
        });
      } else {
        this.$router.push({
          name: "搜索商品1",
        });
      }
    },
  },
  components: {
    footerExhibition,
  },
};
</script>

<style scoped lang="less">
.shopping-cart {
  .shopping-cart-header {
    width: 100%;
    height: 88px;
    background-color: #f2f3f5;
    text-align: center;
    position: fixed;
    z-index: 1;
    .header-t1 {
      display: inline-block;
      line-height: 88px;
      font-size: 36px;
    }
    .header-t2 {
      position: absolute;
      font-size: 30px;
      right: 30px;
      top: 30px;
    }
  }
  .shopping-cart-content {
    width: 100%;
    background-color: #f2f3f5;
    // margin-bottom: 20px;//这个是原始样式
    overflow: hidden;
    .serial-number {
      width: 100%;
      // height: 72px;
      padding-top: 30px;
      box-sizing: border-box;
      /deep/ .van-checkbox {
        height: 50px;
        .van-checkbox__icon {
          margin-left: 30px;
        }
        .van-checkbox__label {
          margin-left: 29px;
          font-size: 32px;
          color: #333;
          font-weight: bold;
        }
      }
      .invalid-num {
        color: #333333;
        font-size: 26px;
        margin-left: 29px;
      }
      .empty {
        float: right;
        margin-right: 26px;
        color: #999;
        font-size: 28px;
      }
    }

    .good-box {
      background-color: #fff;
      // padding-bottom: 120px;
      margin-bottom: 20px;
      .goods-content {
        width: 100%;
        height: 100%;
        box-sizing: border-box;

        .goods-header {
          padding-top: 20px;
          height: 100px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 30px;
          box-sizing: border-box;
          .goods-left {
            display: flex;
            align-items: center;
            .goods-coupons {
              background-color: #fa5300;
              padding: 7px;
              color: #fff;
              font-size: 20px;
            }
            .goods-coupons-money {
              font-size: 22px;
              color: #999;
              padding-left: 8px;
            }
          }
          .goods-add {
            display: flex;
            align-items: center;
            color: #fa5300;
            /deep/ .van-icon {
              color: #999;
            }
          }
        }
      }
    }

    .good-item {
      display: flex;
      align-items: center;
      box-sizing: border-box;
      padding: 20px 30px;
      .good-item-l {
        display: flex;
        align-items: center;
        .good-img {
          width: 200px;
          height: 200px;
          max-width: 100%;
          max-width: 100%;
          margin: 0 20px;
        }
      }
      .good-item-r {
        .good-describe {
          width: 410px;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          overflow: hidden;
        }
        .good-seclet {
          padding-top: 20px;
          height: 44px;
          select {
            padding: 3px;
          }
          .specifications {
            display: inline-block;
            background-color: #eee;
            padding: 12px 18px;
          }
        }
        .good-logistics {
          padding-top: 50px;
          font-size: 16px;
          color: #666666;
          display: flex;
          align-items: center;
          img {
            width: 45px;
            vertical-align: sub;
            margin-right: 10px;
          }
        }
        .good-price {
          padding-top: 20px;
          width: 400px;
          .price-p1 {
            font-size: 40px;
            color: #fa5300;
          }
          .good-price-r {
            text-align: center;
            position: relative;
            left: 66%;
          }
          .price-p2 {
            font-size: 20px;
            color: #999;
            text-decoration: line-through;
            margin-right: 30px;
          }
          .price-quantity {
            width: 147px;
            height: 36px;

            line-height: 36px;
            /deep/ .van-stepper__input {
              width: 76px;
            }
          }
          .price-batch {
            width: 147px;
            font-size: 24px;
          }
          .price-batch-left {
            width: 162px;
            height: 40px;
            font-size: 24px;
            color: #666;
            line-height: 40px;
          }
          .price-batch-right {
            position: relative;
            left: 45%;
            font-size: 24px;
            width: 150px;
            border: 2px solid rgba(219, 144, 0, 1);
            border-radius: 20px;
            padding: 10px 20px;
          }
        }
      }
    }
  }
  .settlement {
    width: 100%;
    background-color: #fff;
    position: fixed;
    bottom: 98px;
    z-index: 5;
    border-top: 2px solid #dcdcdc;
    border-bottom: 2px solid #dcdcdc;
    overflow: hidden;
    padding: 30px 0;
    .checkbox {
      display: inline-block;
      margin: 20px 0 -10px 30px;
    }
    .checkbox2 {
      display: inline-block;
      margin: 8px 0 -10px 30px;
    }
    .settlement-text {
      display: inline-block;
      width: 100%;
      box-sizing: border-box;
      font-size: 32px;
      padding-right: 30px;
      .p3 {
        margin-left: 18px;
      }
      .btn {
        display: inline-block;
        padding: 0 20px;
        height: 90px;
        border-radius: 45px;
        color: rgba(255, 255, 255, 1);
        line-height: 90px;
        text-align: center;
      }
      .btn2 {
        padding: 0 10px;
        height: 50px;
        border: 2px solid rgba(219, 144, 0, 1);
        border-radius: 25px;
        font-size: 28px;
        color: #db9000;
        position: absolute;
        right: 154px;
        top: 34px;
        line-height: 50px;
        text-align: center;
      }
      .btn1 {
        width: 104px;
        height: 50px;
        border: 2px solid rgba(250, 83, 0, 1);
        border-radius: 25px;
        color: #fa5300;
        font-size: 28px;
        line-height: 50px;
        text-align: center;
        position: absolute;
        right: 30px;
        top: 34px;
      }
    }
  }
  .no-shopping {
    width: 100%;
    height: 858px;
    position: relative;
    .no-shopping-img {
      width: 400px;
      height: 300px;
      position: absolute;
      top: 200px;
      left: 175px;
      text-align: center;
      .no-shopping-p1 {
        font-size: 28px;
        color: #666666;
      }
      .no-shopping-p2 {
        display: inline-block;
        padding: 6px 11px;
        font-size: 20px;
        color: #fff;
        background-color: #fa5300;
        border-radius: 15px;
      }
    }
    .no-shopping-p1 {
      margin: 36px 0;
    }
  }
  .van-overlay {
    z-index: 10 !important ;
    .overlay-wrapper {
      width: 500px;
      height: 200px;
      background-color: #fff;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      .overlay-wrapper-p1 {
        margin: 49px 0 39px 40px;
        font-size: 36px;
        color: #333;
      }
      .overlay-wrapper-btns {
        padding-left: 267px;
        font-size: 30px;
        color: #fa5300;
        span {
          &:nth-child(1) {
            margin-right: 65px;
          }
        }
      }
    }
  }
}
</style>
