<!--
 * @Author: 曹建勇
 * @Date: 2021-03-13 14:19:58
 * @LastEditors: 曹建勇
 * @LastEditTime: 2021-03-13 15:48:19
 * @Description: 
 * @FilePath: \app-en\src\multiplexing\timeCountDown.vue
-->
<template>
  <!-- 清仓倒计时 -->
  <div>
    <!-- 特价时间 -->
    <div class="huodong-time flex" v-show="countdownTime.isShow">
      <span>Start in</span> &nbsp;&nbsp;
      <div class="time">{{ countdownTime.hour }}</div>
      <span>:</span>
      <div class="time">{{ countdownTime.minute }}</div>
      <span>:</span>
      <div class="time">{{ countdownTime.second }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["ChaTime"],

  computed: {
    countdownTime() {
      let restCount = this.ChaTime / 1000,
        hour = "",
        minute = "",
        second = "",
        totalTime = "";
      hour =
        parseInt(restCount / 3600) > 9
          ? parseInt(restCount / 3600)
          : "0" + parseInt(restCount / 3600);
      minute =
        parseInt((restCount % 3600) / 60) > 9
          ? parseInt((restCount % 3600) / 60)
          : "0" + parseInt((restCount % 3600) / 60);
      second =
        parseInt(restCount % 60) > 9
          ? parseInt(restCount % 60)
          : "0" + parseInt(restCount % 60);
      totalTime = {
        hour,
        minute,
        second,
        isShow: this.ChaTime <= 0 ? false : true,
      };
      if (!totalTime.isShow) clearInterval(timer);
      return totalTime;
    },
  },
  data() {
    return {};
  },
  watch: {},
  methods: {},
  components: {},
};
</script>

<style scoped lang="less">
</style>
