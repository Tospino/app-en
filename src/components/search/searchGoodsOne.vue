<template>
  <!-- 商品搜索模式一 -->
  <div class="search-goods-one">
    <search-head
      @onfocus="onfocus"
      @getInputVal="getInputVal"
      @onSearch="onSearch"
      :searName="searName"
    ></search-head>
    <div v-if="noSearchStatus">
      <van-dropdown-menu active-color="#DB9000">
        <van-dropdown-item
          v-model="value1"
          :options="option1"
          class="scj"
          @change="saleSort('zh',value1)"
        ></van-dropdown-item>
        <van-dropdown-item
          v-model="value2"
          :options="option2"
          class="scj"
          @change="saleSort('xl')"
        />
        <van-dropdown-item
          v-model="value3"
          :options="option3"
          class="scj"
          @change="saleSort('jg',value3)"
        />
        <van-icon :name="iconName" class="apps-o" @click="viewModel" />
      </van-dropdown-menu>
      <div style="height:34px;"></div>
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
      >
        <div v-show="goodsShow1" class="footprint-goods">
          <div
            class="footprint-goods-content"
            v-for="(good,index) in dataList"
            :key="index"
            @click="toProduDetail(good.skuId)"
          >
            <div>
              <div class="good-img">
                <div class="shouwan" v-if="!good.canSalesNum">Out of Stock</div>
                <img v-lazy="$webUrl+good.imgUrl" />
              </div>
              <div class="good-desc">
                <div class="p1 clamp-2" v-html="good.supplyTitle"></div>
                <!-- <div class="sales-num">Sales:{{good.skuSalesNum ? good.skuSalesNum : 0}}</div> -->
                <div class="country">
                  <div v-if="good.expId == 1">
                    <!-- <img v-lazy="$webUrl+'/common/image/zhiyou.png'"/> -->
                    <div class="guojia">
                      <span>Ships from {{good.areaNameEng}}</span>
                    </div>
                  </div>
                  <div v-else>
                    <!-- <img v-lazy="$webUrl+good.locationUrl"> -->
                    <div class="guojia" v-if="good.locationNameEng">
                      <span>{{good.locationNameEng}}</span>
                      <br />
                    </div>
                  </div>
                  <van-rate v-model="good.starNumber" readonly class="rate" />
                  <span class="rate-num">{{good.manNumber}}</span>
                </div>
                <div class="good-price">
                  <span
                    class="p1"
                  >{{jn}}{{good.discountPrice == null ? good.salePrice:good.discountPrice}}</span>
                  <span class="p3" v-if="good.discountPrice != null">{{jn}}{{good.salePrice}}</span>
                  <span class="fl-right">Sales:{{good.skuSalesNum ? good.skuSalesNum : 0}}</span>
                  <!-- 省略号,暂时先隐藏 -->
                  <!-- <span class="p2">
                                        <van-icon name="ellipsis" />
                  </span>-->
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- 模式二 -->
        <div v-show="!goodsShow1">
          <search-goods-tow :twoDataList="dataList" @clickPro="clickPro"></search-goods-tow>
        </div>
      </scroll>
    </div>
    <div v-else>
      <no-sear-good :imgSrc="nosear1" describe="Sorry, no products"></no-sear-good>
    </div>
  </div>
</template>

<script>
import searchGoodsTow from "./itemComponents/searchGoodsTow";
import searchHead from "@/multiplexing/searchHead.vue";
import noSearGood from "@/multiplexing/noSearGood";
import { searchProductApi, HomeEsApi } from "@/api/search/index";
import nosear1 from "@/assets/img/search/nosear1.png";
import { Toast } from "vant";
export default {
  props: {},
  data() {
    return {
      recordGroup: [],
      pullup: true,
      pulldown: true,

      value: 2,
      value1: 0,
      value2: 0,
      value3: 0,
      option1: [
        { text: "Overall Rank", value: 0 },
        { text: "Credit First", value: 1 },
      ],
      option2: [{ text: "Popularity", value: 0 }],
      option3: [
        { text: "Price", value: 0 },
        { text: "Highest Price", value: 1 },
        { text: "Lowest Price", value: 2 },
      ],
      checked: true,
      goodsShow1: true,
      guanmengou: true, //看门狗
      formData: {
        limit: 10,
        page: 1,
        seraname: "",
        sort: 0,
        categoryId: 0,
        brandId: 0,
        locationId: 0,
        priceEnd: 0,
        priceTo: 0,
        sort: 0,
        isPC: 2,
        businessId: "",
        expIds: "",
      },
      dataList: [],
      footerData: {},
      searName: "",
      totalCount: 0,
      noSearchStatus: true,
      nosear1: nosear1,
      isgo: false,
      iconName: "apps-o",
      showData: false,
    };
  },
  computed: {},
  created() {},
  mounted() {
    this.formData.seraname = this.$route.query.seraname
      ? this.$route.query.seraname
      : "";
    this.formData.categoryId = this.$route.query.categoryId
      ? this.$route.query.categoryId
      : 0;
    this.formData.brandId = this.$route.query.brandId
      ? this.$route.query.brandId
      : 0;

    this.formData.businessId = this.$route.query.businessId;

    this.formData.expIds = this.$route.query.expIds;

    this.searName = this.$route.query.seraname;

    this.refreshOrder();
  },
  activated() {
    if (this.$route.meta.isBack) {
      this.formData.seraname = this.$route.query.seraname
        ? this.$route.query.seraname
        : "";
      this.formData.categoryId = this.$route.query.categoryId
        ? this.$route.query.categoryId
        : 0;
      this.formData.brandId = this.$route.query.brandId
        ? this.$route.query.brandId
        : 0;

      this.formData.businessId = this.$route.query.businessId;

      this.formData.expIds = this.$route.query.expIds;

      this.searName = this.$route.query.seraname;
      this.refreshOrder();

      try {
        this.$refs.wrapper.scrollTo(0, 0);
      } catch (error) {
        console.log(error.message);
      }
    }
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      if (from.name == "首页" || from.name == "分类" || from.name == "购物车") {
        vm.isgo = false;
      } else {
        vm.isgo = true;
      }
    });
  },

  watch: {
    goodsShow1: {
      handler: function (newVal, oldVal) {
        this.iconName = newVal ? "apps-o" : "bar-chart-o";
      },
    },
  },
  methods: {
    saleSort(name, value) {
      switch (name) {
        case "zh":
          this.formData.sort = 0;
          break;
        case "xl":
          this.formData.sort = 2;
          break;
        case "jg":
          this.formData.sort = value == 1 ? 4 : 3;
          break;
      }
      if (value == 0) return;
      this.$refs.wrapper.scrollTo(0, 0);
      this.refreshOrder();
    },
    viewModel() {
      this.goodsShow1 = !this.goodsShow1;
      this.$refs.wrapper.scrollTo(0, 0);
    },
    //输入框获得焦点时触发
    onfocus() {
      this.$store.state.serchName = this.searName;
      if (this.isgo) {
        this.$router.go(-1);
      } else {
        this.$router.push({ name: "历史记录" });
      }
    },
    //输入框内容变化时触发
    getInputVal(value) {},
    //点击搜索按钮
    onSearch() {},
    //搜索商品
    searchProduct(data, flag) {
      HomeEsApi(data).then((res) => {
        if (res.code == 0) {
          if (flag) {
            this.dataList = res.Data.list;
          } else {
            this.dataList = this.dataList.concat(res.Data.list);
          }
          this.footerData = res.Data;
          this.totalCount = res.Data.totalCount;
          this.recordGroup = this.dataList;
          if (this.dataList.length > 0) {
            this.noSearchStatus = true;
            if (this.dataList.length >= this.totalCount) {
              this.pullup = false;
            }
          } else {
            this.noSearchStatus = false;
            this.pulldown = false;
            this.pullup = false;
          }
          setTimeout(() => {
            this.showData = true;
            Toast.clear();
          }, 1000);
        } else {
          searchProductApi(data).then((res) => {
            if (res.code == 0) {
              if (flag) {
                this.dataList = res.Data.list;
              } else {
                this.dataList = this.dataList.concat(res.Data.list);
              }
              this.footerData = res.Data;
              this.totalCount = res.Data.totalCount;
              this.recordGroup = this.dataList;
              if (this.dataList.length > 0) {
                this.noSearchStatus = true;
                if (this.dataList.length >= this.totalCount) {
                  this.pullup = false;
                }
              } else {
                this.noSearchStatus = false;
                this.pulldown = false;
                this.pullup = false;
              }
            }
            setTimeout(() => {
              this.showData = true;
              Toast.clear();
            }, 1000);
          });
        }
      });
    },
    //跳转到商品详情
    toProduDetail(skuId) {
      this.$router.push({ name: "商品详情", query: { skuId } });
    },
    //猜你喜欢点击了商品
    clickPro(skuId) {
      this.$router.push({ name: "商品详情", query: { skuId } });
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
        this.searchProduct(this.formData, false);
        this.guanmengou = false;
      }
      setTimeout(() => {
        this.guanmengou = true;
      }, 500);
    },
    //刷新页面
    refreshOrder() {
      this.formData.page = 1;
      this.formData.limit = 10;
      this.searchProduct(this.formData, true);
      this.pullup = true;
    },
  },
  components: {
    searchGoodsTow,
    searchHead,
    noSearGood,
  },
};
</script>

<style scoped lang="less">
.bscroll-wrapper {
  height: calc(100vh - 158px);
}
.search-goods-one {
  /deep/ .van-dropdown-menu {
    height: 69px;
    font-size: 26px;
    position: fixed;
    top: 88px;
    left: 0;
    z-index: 2;
    width: 100%;
    .van-dropdown-menu__title {
      height: 60px;
      line-height: 60px;
      color: #333;
      font-size: 24px;
      &::after {
        width: 6px;
        height: 6px;
        top: 43%;
        right: -10px;
      }
    }
    /deep/ .van-dropdown-menu__item--disabled {
      span {
        // display: none
        &::after {
          display: none;
        }
      }
    }
  }
  .apps-o {
    position: relative;
    top: 100%;
    transform: translateY(-70%);
    right: 10px;
    font-size: 24px;
  }
  .scj {
    /deep/ .van-dropdown-item__option {
      height: 70px;
      line-height: 50px;
      font-size: 24px;
    }
  }
  .footprint-goods {
    margin-bottom: 20px;
    .footprint-goods-content {
      width: 100%;
      height: 250px;
      background-color: #fff;
      position: relative;
      border-bottom: 1px solid #f2f3f5;
      margin-bottom: 20px;
      .good-img {
        width: 200px;
        height: 200px;
        position: relative;
        top: 20px;
        left: 30px;
        .img-checkbox {
          position: absolute;
          left: 20px;
          top: 20px;
          /deep/ .van-icon {
            background: rgba(51, 51, 51, 0.5);
          }
        }
      }
      .good-desc {
        padding-right: 30px;
        position: absolute;
        top: 20px;
        left: 250px;
        font-size: 26px;
        color: #333;
        width: 480px;
        .p1 {
          line-height: 39px;
          height: 80px;
        }
        .p2 {
          font-size: 20px;
          color: rgba(102, 102, 102, 1);
          margin-top: 20px;
          display: inline-block;
        }
        .sales-num {
          height: 40px;
          line-height: 40px;
        }
      }
      .good-price {
        color: #f83600;
        font-size: 36px;
        .p2 {
          position: absolute;
          left: 470px;
          color: #666;
        }
        .p3 {
          font-size: 16px;
          color: #666;
          text-decoration: line-through;
        }
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
  }
  .country {
    color: #333;
    font-size: 36px;
    img {
      width: 30px;
      height: 30px;
      vertical-align: middle;
    }
    .guojia {
      display: inline-block;
      font-size: 20px;
      color: #db9000;
      margin: 10px 0;
    }
    .rate {
      margin: 0 10px 10px 0px;
    }
    .rate-num {
      font-size: 20px;
      color: #999;
    }
  }
}
</style>
