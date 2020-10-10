<!--
 * @Author: your name
 * @Date: 2020-07-20 17:26:48
 * @LastEditTime: 2020-08-21 10:18:23
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \app-en\src\multiplexing\progress.vue
--> 
<template>
  <!-- 封装-进度条 -->
  <div>
    <div class="f">
      <div class="progress">
        <div
          :class="{ on_fb: pivotTxt == 1, spen_tw: pivotTxt === 0 }"
          :style="'width:' + parseInt(progressBar) + '%'"
        >
          <h3 class="text-progress">
            {{
              pivotTxt != 2
                ? parseInt(progressBar) + "%" + "sold" || 0 + "%" + "sold"
                : "sold out"
            }}
          </h3>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  components: {},
  props: ["progressBar", "pivotTxt"],
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
    width: 200px;
    height: 30px;
    background: #cccccc;
    border-radius: 15px;
    overflow: hidden;
  }
  .bar {
    width: 1%;
    height: 30px;
    background: rgba(8, 109, 180, 1);
  }
  .text-progress {
    color: #fff;
    width: 200px;
    text-align: center;
    line-height: 30px;
  }
}
</style>