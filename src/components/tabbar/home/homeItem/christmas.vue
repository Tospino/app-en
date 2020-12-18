<template>
  <div class="christmas">
    <div class="flex christmas_top" v-show="christmasBg">
      <img
        class="christmas_black"
        src="@/assets/img/activity/christmas/christmas_list_back.png"
        @click="$router.go(-1)"
      />
      <div class="christmas_heard">Christmas Festival</div>
    </div>
    <!-- 圣诞-绿 -->
    <div class="christmas_tree">
      <div class="christmas_banner">
        <img
          class="christmas_black"
          src="@/assets/img/activity/christmas/christmas_list_back.png"
          @click="$router.go(-1)"
        />
      </div>
      <div class="christmas_content flex_col_center">
        <div class="head_tilte">Trending</div>
        <div class="main_shop mt_22">
          <div
            class="main_shop_box flex flex_warp"
            :class="{
              flex: christmasFrist.length % 3 !== 0,
              flex_space: christmasFrist.length % 3 === 0,
            }"
          >
            <div
              :class="{ mr_15: idx == 0 || idx == 1 || idx == 3 || idx == 4 }"
              v-for="(christmasItem, idx) in christmasFrist"
              :key="idx"
            >
              <div class="main_christmas flex_col_center pd_b_46">
                <img
                  class="main_img"
                  v-lazy="$webUrl + christmasItem.skuImg"
                  @click="toDetail(christmasItem.skuId)"
                />
                <span class="main_text txt_color mt_10">
                  <i>{{ jn }}</i>
                  {{
                    christmasItem.activityPrice
                      ? christmasItem.activityPrice
                      : christmasItem.salePrice
                  }}
                </span>
                <div
                  class="christmas_btn mt_6"
                  @click="toDetail(christmasItem.skuId)"
                >
                  Buy Now
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 圣诞-红 -->
    <div class="christmas_old">
      <div
        class="christmas_old_img"
        :class="{ christmas_old_fixed: styleFixed == true }"
      >
        <div class="christmas__old_item flex flex_warp">
          <div
            class="christmas_old_box"
            v-for="(tabItem, idx) in christmasTab"
            :key="idx"
          >
            <img
              src="@/assets/img/activity/christmas/christmas_list_lable.png"
              class="tab_click_icon"
              v-if="arrSelect == idx"
            />
            <div
              class="tab_bg tab_bg_r"
              :class="{ tab_bg_click: arrSelect == idx }"
              @click="btnTitle(idx, tabItem)"
            >
              {{ tabItem.themeModuleName }}
            </div>
          </div>
        </div>
      </div>

      <div class="christmas_list_red">
        <!--  v-if="styleBg==false"  -->
        <div class="christmas_list_red_bg"></div>
        <div class="christmas_old_content flex_col_center">
          <div v-if="christmasOld.length !== 0">
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
              <div
                class="christmas_old_item"
                v-for="(christmasOldItem, idxo) in christmasOld"
                :key="idxo"
              >
                <div class="flex_space box_two">
                  <img
                    v-lazy="$webUrl + christmasOldItem.skuImg"
                    class="christmas_old_imgs"
                    @click="toDetail(christmasOldItem.skuId)"
                  />
                  <div class="box_right">
                    <div class="title_two">
                      <img
                        src="@/assets/img/activity/christmas/christmas_list_lable.png"
                        class="title_two_icon"
                      />
                      <span class="title_two_text">Christmas Festival</span>
                    </div>
                    <div class="text_conter">
                      {{ christmasOldItem.skuName }}
                    </div>

                    <div class="mt_22 flex">
                      <div>
                        <del
                          class="text_del"
                          v-if="christmasOldItem.activityPrice != null"
                          >{{ jn }} {{ christmasOldItem.salePrice }}</del
                        >
                        <div class="text_price txt_color">
                          <i>{{ jn }}</i>
                          {{
                            christmasOldItem.activityPrice
                              ? christmasOldItem.activityPrice
                              : christmasOldItem.salePrice
                          }}
                        </div>
                      </div>
                      <div
                        class="christmas_btn mt_22 ml_20"
                        @click="toDetail(christmasOldItem.skuId)"
                      >
                        Buy Now
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </scroll>
          </div>
          <div v-else>
            <div class="flex_col_cocenter bscroll-wrapper">
              <img :src="nosear" style="width: 260px; height: 300px" />
              <div
                style="
                  text-align: center;
                  font-size: 18px;
                  color: #ccc;
                  padding-bottom: 20px;
                "
              >
                Sorry, no products
              </div>
            </div>
            <!-- <no-sear-good :imgSrc="nosear" describe="Sorry, no products"></no-sear-good> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import detailsHeader from "@/multiplexing/detailsHeader";
// import { productevaluationlistApi } from "@/api/home/commodityDetails";
import { christmasThemeApi, christmasThemeategoryApi } from "@/api/home/index";
import noSearGood from "@/multiplexing/noSearGood";
import nosear from "@/assets/img/activity/christmas/christmas_nav_shop.png";
export default {
  name: "christmas",
  props: {},
  data() {
    return {
      christmasFrist: [],
      christmasTab: [],
      christmasOld: [],
      arrSelect: 0,
      christmasBg: false, //圣诞
      styleFixed: false,
      styleBg: false,
      christmasData: {
        page: 1,
        limit: 10,
        moduleId: 0,
      },
      christmasPage: {
        page: 1,
        limit: 10,
      },
      nosear: nosear,
      recordGroup: [],
      pulldown: true,
      pullup: true,
      guanmengou: true, //看门狗
      showData: false,
      noSearchStatus: true,
    };
  },
  computed: {},
  created() {
    christmasThemeategoryApi(this.christmasData).then((res) => {
      if (res.code == 0) {
        this.christmasFrist = res.page.list;
      }
    });
    christmasThemeApi(this.christmasPage).then((res) => {
      this.christmasTab = res.page.list.splice(0, 6);
      if (this.$store.state.christmasListArr.includes("首页")) {
        this.christmasData.moduleId = this.christmasTab[0].id;
        this.$store.state.christmasListArr = [];
      } else {
        if (sessionStorage.thermtabItem) {
          this.christmasData.moduleId = sessionStorage.thermtabItem;
          this.arrSelect = sessionStorage.thermkeys;
        } else {
          this.christmasData.moduleId = this.christmasTab[0].id;
          this.arrSelect = 0;
        }
      }
      this.refreshOrder();
      if (this.$refs.wrapper) {
        this.$refs.wrapper.scrollTo(0, 0);
      }
    });
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll, true);
    // 监听（绑定）滚轮 滚动事件
  },
  watch: {},
  methods: {
    // 点击样式
    btnTitle(key, tabItem) {
      // 由于返回没有选中之前的,只能记录在浏览器
      sessionStorage.thermkeys = key;
      sessionStorage.thermtabItem = JSON.stringify(tabItem.id);
      //  点击后改变样式颜色
      this.arrSelect = sessionStorage.thermkeys;
      this.christmasData.moduleId = sessionStorage.thermtabItem;
      //   this._pullup();
      //   this._pulldown();
      this.refreshOrder();
      if (this.$refs.wrapper) {
        this.$refs.wrapper.scrollTo(0, 0);
      }
    },
    // 圣诞
    therm(christmasData, flag) {
      christmasThemeategoryApi(christmasData).then((res) => {
        if (res.code == 0) {
          sessionStorage.thermPage = this.christmasData.page;
          if (flag) {
            this.christmasOld = res.page.list;
          } else {
            this.christmasOld = [...this.christmasOld, ...res.page.list];
          }

          this.recordGroup = this.christmasOld;
          if (this.christmasOld.length > 0) {
            this.noSearchStatus = true;
            if (this.christmasOld.length >= res.page.totalCount) {
              //   this.pullup = false;
            }
          } else {
            this.noSearchStatus = false;
            // this.pullup = false;
            this.pulldown = false;
          }
        }
        setTimeout(() => {
          this.showData = true;
        }, 1000);
      });
    },
    handleScroll() {
      // 页面滚动距顶部距离
      var scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      //变量windowHeight是可视区的高度
      var windowHeight =
        document.documentElement.clientHeight || document.body.clientHeight;
      //变量scrollHeight是滚动条的总高度
      var scrollHeight =
        document.documentElement.scrollHeight || document.body.scrollHeight;
      // //滚动条到底部的条件
      // if (scrollTop + windowHeight > scrollHeight - 20) {
      // 	this.styleBg = true
      // } else {
      // 	this.styleBg = false
      // }

      if (scrollTop < 600) {
        this.styleFixed = false;
      } else {
        this.styleFixed = true;
      }

      if (scrollTop > 10) {
        this.christmasBg = true;
      } else {
        this.christmasBg = false;
      }
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
        this.christmasData.page++;
        this.therm(this.christmasData, false);
        this.guanmengou = false;
      }
      setTimeout(() => {
        this.guanmengou = true;
      }, 500);
    },
    //刷新页面
    refreshOrder() {
      this.christmasData.page = 1;
      this.christmasData.limit = 10;
      this.therm(this.christmasData, true);
      // this.pullup = true;
      // this.pulldown = true;
    },
    //跳转详情页
    toDetail(skuId) {
      this.$router.push({
        name: "商品详情",
        query: {
          skuId: skuId,
        },
      });
    },
  },
  components: {
    noSearGood,
  },
};
</script>

<style scoped lang="less">
.bscroll-wrapper {
  height: calc(100vh - 350px);
  // margin-top: 76px;
}

.mt_10 {
  margin-top: 10px;
}

.mt_6 {
  margin-top: 6px;
}

.mt_22 {
  margin-top: 22px;
}

.pd_b_46 {
  padding-bottom: 46px;
}

// 圣诞字体样式
.txt_color {
  color: #bb2229 !important;
}

.tab_bg_r {
  background: url("~@/assets/img/activity/christmas/christmas_list_two_lable.png")
    no-repeat;
  background-size: 100%;
}

.tab_bg_click {
  background: url("~@/assets/img/activity/christmas/christmas_list_two_lableClick.png")
    no-repeat !important;
  background-size: 100% !important;
}

.tab_click_icon {
  width: 50px;
  height: 50px;
  position: absolute;
  z-index: 1;
  top: -20px;
  left: 0;
}

.christmas_btn {
  background: #bb2229;
  font-size: 24px;
  width: 160px;
  height: 48px;
  line-height: 48px;
  text-align: center;
  color: #fff;
}

.christmas_black {
  width: 40px;
  height: 40px;
  position: absolute;
  top: 28px;
  left: 20px;
  // padding: 30px 0px 0px 20px;
}

.christmas_top {
  position: sticky;
  top: 0;
  width: 100%;
  z-index: 3;
  height: 88px;
  background-color: #a3030d;
  color: #fff;
  font-size: 34px;

  .christmas_heard {
    text-align: center;
    width: 100%;
  }
}

// .christmas_old_fixed {
// 	position: sticky;
// 	z-index: 1;
// 	top: 0;
// 	// top: -82px;
// }

// .christmas_list_red_bg {
// 	// background-color: ivory;
// 	border:40px solid #E8DDD7;
// 	border-top: 20px solid #E8DDD7;
// 	border-bottom: 0;
// 	box-sizing: border-box;
// 	position: absolute;
// 	width: 96%;
// 	padding: 40px 16px 0px 16px;
// 	top: 450px;
// 	height: calc(100vh - 450px);
// 	z-index: 1;
// }

.christmas_red_height {
  margin-top: 100px;
}

// .christmas_red_heightl {
// 	height: 1268px;
// }

.christmas_banner {
  background: url("~@/assets/img/activity/christmas/christmas_list_first_had.png")
    no-repeat;
  background-size: 100%;
  box-sizing: border-box;
  height: 450px;
  position: relative;
}

.christmas_content {
  background: url("~@/assets/img/activity/christmas/christmas_list_first_bg.png")
    no-repeat;
  background-size: 100%;
  box-sizing: border-box;
  height: 884px;
  z-index: 2;

  .head_tilte {
    background: url("~@/assets/img/activity/christmas/christmas_list_first.png")
      no-repeat;
    background-size: 100%;
    width: 452px;
    height: 50px;
    margin-top: 32px;
    color: #fff;
    font-size: 26px;
    font-weight: bold;
    line-height: 40px;
    text-align: center;
  }

  .main_shop {
    width: 710px;
    height: 724px;
    background: #fff6ef;
    border: 4px solid #e8a976;
    z-index: 2;
    overflow: hidden;
  }

  .main_shop_box {
    box-sizing: border-box;
    padding: 30px 25px;
  }

  .main_christmas {
    width: 210px;
  }

  .main_img {
    width: 210px;
    height: 210px;
	background: #fff;
  }

  .main_text {
    text-align: center;
    font-size: 32px;
    font-weight: bold;

    i {
      font-size: 20px;
    }
  }
}

.christmas_old {
  position: relative;

  .christmas_old_img {
    background: url("~@/assets/img/activity/christmas/christmas_list_two_bg.png")
      no-repeat;
    background-size: 100%;
    height: 420px;
    box-sizing: border-box;
  }

  .christmas__old_item {
    height: 190px;
    width: 100%;
    padding-top: 202px;
  }

  .christmas_old_box {
    padding: 0 20px;
    box-sizing: border-box;
    position: relative;
  }

  .tab_bg {
    width: 210px;
    height: 60px;
    line-height: 58px;
    text-align: center;
    color: #fff;
    font-size: 24px;
    font-weight: bold;
  }

  .christmas_list_red {
    // height: calc(100vh - 500px);
    box-sizing: border-box;
    background-color: #a3030d;
    padding: 30px 16px 0px 16px;

    .christmas_old_content {
      box-sizing: border-box;
      height: 100%;
      background: #fff6ef;
      border: 4px solid #e8a976;
      border-bottom: 0;
      overflow: auto;

      &::-webkit-scrollbar {
        width: 0;
      }
    }

    .christmas_old_item {
      height: 290px;
    }

    .box_two {
      width: 670px;
      border-bottom: 2px solid #e8ddd7;
      box-sizing: border-box;
      padding: 30px 20px;
    }

    .christmas_old_imgs {
      width: 230px;
      height: 230px;
	  background: #fff;
    }

    .box_right {
      width: 364px;
    }

    .title_two {
      color: #fff;
      margin-top: 20px;
      position: relative;
    }

    .title_two_text {
      background-color: #bb2229;
      box-sizing: border-box;
      font-size: 22px;
      padding: 4px 12px;
    }

    .title_two_icon {
      position: absolute;
      top: -28px;
      left: -24px;
      width: 50px;
      height: 50px;
    }

    .text_conter {
      width: 364px;
      font-size: 24px;
      line-height: 26px;
      margin-top: 16px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
    }

    .text_del {
      color: #02261c;
      font-size: 24px;
    }

    .text_price {
      font-size: 36px;
      font-weight: bold;
      padding-top: 10px;
      width: 200px;

      i {
        font-size: 20px;
      }
    }
  }
}
</style>
