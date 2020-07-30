<!--
 * @Author: 曹建勇
 * @Date: 2020-07-21 10:03:29
 * @LastEditors: 曹建勇
 * @LastEditTime: 2020-07-30 16:26:22
 * @Description: 
 * @FilePath: \app-en\src\multiplexing\kefu.vue
--> 
<template>
  <div class="kefu">
    <div class="kefu-header">
      <span>Customer Service</span>
      <van-icon name="cross" class="cross" />
    </div>
    <div class="p1">
      <img src="@/assets/img/goodsDetails/whatsapp@2x.png" alt />
      <span>055 927 9978</span>
    </div>
    <div class="p1">
      <img src="@/assets/img/goodsDetails/phone@2x.png" alt />
      <span>030 294 9239</span>
    </div>
    <!-- <div class="p1" @click="service">
      <img src="@/assets/img/tabbar/home/commodityDetails/service@2x.png" alt />
      <span>Service</span>
    </div>-->
  </div>
</template>

<script>
export default {
  props: {
    service: {
      type: Function,
      default: () => () => {},
    },
  },
  data() {
    return {};
  },
  computed: {},
  created() {},
  mounted() {},
  watch: {},
  methods: {},
  components: {},
};
</script>

<style scoped lang="less">
.kefu {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 560px;
  background-color: #fff;
  .kefu-header {
    font-size: 36px;
    height: 101px;
    line-height: 101px;
    text-align: center;
    font-weight: bold;
    position: relative;
    border-bottom: 1px solid #f2f3f5;
    .cross {
      position: absolute;
      top: 50%;
      right: 39px;
      transform: translateY(-50%);
      color: #999;
    }
  }
  .p1 {
    font-size: 30px;
    color: #333;
    padding: 24px 0 24px 72px;
    img {
      width: 41px;
      height: 41px;
      margin-right: 27px;
      vertical-align: sub;
    }
  }
}
</style>
