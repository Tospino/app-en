<!--
 * @Author: your name
 * @Date: 2020-07-20 17:26:48
 * @LastEditTime: 2020-08-04 17:57:51
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \app-en\src\multiplexing\progress.vue
--> 
<template>
  <!-- 封装-进度条 -->
  <div>
    <div class="f">
      <div class="progress">
        <div class="bar" :style="'width:' + progressBar.toPrecision(2)*100 + '%'"></div>
      </div>
      <div>
        <h3 class="text-progress">
          {{progressBar.toPrecision(2)*100}}%&nbsp;
          <span>Received</span>
        </h3>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  components: {},
  props: ["progressBar"],
  data() {
    return {};
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {},
};
</script>
<style scoped lang="less">
.f {
  //进度条
  padding-top: 10px;
  display: flex;
  line-height: 14px;
  .progress {
    width: 100px;
    height: 14px;
    background: rgba(255, 255, 255, 1);
    border: 1px solid rgba(8, 109, 180, 1);
    border-radius: 7px;
    overflow: hidden;
  }
  .bar {
    width: 1%;
    height: 14px;
    background: rgba(8, 109, 180, 1);
  }
  .text-progress {
    color: rgba(8, 109, 180, 1);
    padding-left: 6px;
  }
}
</style>