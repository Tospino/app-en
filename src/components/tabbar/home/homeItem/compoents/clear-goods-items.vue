<!--
 * @Author: 曹建勇
 * @Date: 2020-08-22 10:14:18
 * @LastEditors: 曹建勇
 * @LastEditTime: 2020-08-25 14:55:23
 * @Description: 
 * @FilePath: \app-en\src\components\tabbar\home\homeItem\compoents\clear-goods-items.vue
-->
<template>
  <!-- 更多清仓 -->
  <section class="clear-goods-items">
    <div v-if="dataList.length != 0">
      <div
        class="goods_items flex flex_start"
        v-for="(item, index) in dataList"
        :key="index"
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
        <div class="goods_warp">
          <div :class="{ img_model: item === 1 }"></div>
          <img class="goods_img" v-lazy="$webUrl + item.skuImg" alt srcset />
          <img
            src="@/assets/img/tabbar/home/clearsale/saleout.png"
            class="goods_sale"
            v-show="item.activityState === 2"
            alt
            srcset
          />
          <span
            class="discount"
            :class="{
              discount_gary: item.activityState === 2,
              pre_fb: item.activityState === 0,
            }"
          >
            <!-- parseInt(100 - (item.activityPrice / item.salePrice) * 100) -->
            {{ item.percent }}% off</span
          >
        </div>
        <div class="ml_20 w100">
          <span class="goods_name line2">{{ item.skuName }}</span>
          <div class="price_warp" v-show="item !== 1">
            <span
              class="goods_price"
              :class="{
                on_fc: item.activityState === 1,
                pre_fc: item.activityState === 0,
              }"
              >₵{{ item.activityPrice }}</span
            >
            <span class="goods_dis_price">₵{{ item.salePrice }}</span>
          </div>
          <div class="flex flex_space process_warp">
            <div class="w200 process">
              <!-- <van-progress
                :percentage="
                  item.activityState !== 2
                    ? (item.activitySaleNum / item.activityNum) * 100 || 0
                    : 0
                "
                :color="item.activityState == 1 ? '#f95300' : '#00a670'"
                pivot-color="transparent"
                track-color="#CBCBCB"
                text-color="#fff"
                stroke-width="20"
                :pivot-text="
                  item.activityState !== 2
                    ? parseInt(
                        (item.activitySaleNum / item.activityNum) * 100
                      ) +
                        '%' +
                        'sold' || 0 + '%' + 'sold'
                    : 'sold out'
                "
              /> -->
              <progress-clear
                :progressBar="(item.activitySaleNum / item.activityNum) * 100"
                :pivotTxt="item.activityState"
              ></progress-clear>
            </div>

            <span class="goods_btn flex_center2" v-if="item.activityState === 1"
              >Buy Now</span
            >
            <span
              class="goods_btn flex_center2 pre_fb"
              v-if="item.activityState === 0"
              >Not started</span
            >
          </div>
        </div>
      </div>
    </div>
    <!-- <div v-else>
      <no-sear-good
        :imgSrc="nosear1"
        describe="Sorry, no products"
      ></no-sear-good>
    </div> -->
  </section>
</template>

<script>
// import noSearGood from "@/multiplexing/noSearGood";
// import nosear1 from "@/assets/img/search/nosear1.png";
import progressClear from "@/multiplexing/progressClear";
export default {
  props: {
    list: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  name: "",
  data() {
    return {
      //   nosear1: nosear1,
      dataList: [],
    };
  },
  computed: {},
  created() {},
  mounted() {},
  watch: {
    list: {
      handler: function (newVal, oldVal) {
        this.getData();
      },
    },
  },
  methods: {
    getData() {
      this.dataList = this.list.map((o) => Object.assign({}, o));
    },
  },
  components: {
    //   noSearGood
    progressClear,
  },
};
</script>

<style scoped lang='less'>
.pre_fc {
  color: #00a670 !important;
}
.pre_fb {
  background-color: #00a670 !important;
}
.w100 {
  width: 100%;
}
.clear-goods-items {
  background-color: #fff;
  //   /deep/ .van-progress__portion {
  //     min-width: 100%;
  //   }
  //   /deep/ .van-progress__pivot {
  //     font-size: 24px;
  //     min-width: 100%;
  //   }
  .goods_items {
    padding: 44px 30px 36px;
    border-bottom: 1px solid #eee;
    &:last-child {
      border-bottom: none;
    }
    .img_model {
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      width: 220px;
      height: 220px;
      background: #000000;
      opacity: 0.3;
      z-index: 1;
    }
    .goods_warp {
      position: relative;
      .goods_sale {
        position: absolute;
        top: 37px;
        left: 10px;
        width: 200px;
        height: 160px;
      }
      .goods_img {
        width: 220px;
        height: 220px;
      }
      .discount {
        position: absolute;
        top: 0;
        left: 0;
        padding: 6px 8px;
        border-radius: 0px 0px 10px 0px;
        background-color: #f95300;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
        font-size: 20px;
      }
      .discount_gary {
        background-color: #cbcbcb;
      }
    }
    .goods_name {
      font-size: 22px;
      font-weight: 500;
      color: rgba(51, 51, 51, 1);
      line-height: 30px;
    }
    .price_warp {
      margin-top: 50px;
      margin-bottom: 10px;
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
    }
    .process_warp {
      align-items: flex-end;
      .process {
        height: 30px;
        width: 200px;
        margin-bottom: 6px;
        border-radius: 15px;
        /deep/ .van-progress__pivot {
          width: 120px;
        }
      }
      .goods_btn {
        width: 180px;
        padding: 14px 24px;
        font-size: 30px;
        font-weight: bold;
        color: rgba(255, 255, 255, 1);
        background: #f95300;
        border-radius: 26px;
      }
    }
  }
}
</style>