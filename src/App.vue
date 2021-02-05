<!--
 * @Author: 曹建勇
 * @Date: 2020-07-09 10:00:20
 * @LastEditors: 曹建勇
 * @LastEditTime: 2021-01-04 11:16:28
 * @Description: 
 * @FilePath: \app-en\src\App.vue
-->
<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
  created() {
    //易观数据采集-----核心页面加载
    let urlHtm = window.location.href;
    let titHtm = document.title;
    //   console.log(returnCitySN["cip"] + "," + returnCitySN["cname"]);
    AnalysysAgent.track(
      "core_page_load",
      {
        $url: urlHtm,
        $title: titHtm,
        duration: startTime / 1000,
      },
      (rel) => {}
    );
    //注册通用属性 $ip 获取客户端IP地址
    AnalysysAgent.registerSuperProperty(
      {
        $ip: returnCitySN["cip"],
        $city: returnCitySN["cname"],
      },
      (rel) => {}
    );
  },
  watch: {
    $route: function (to, from) {
      window.pageYOffset = 0;
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    },
  },
  mounted() {
    setTimeout(() => {
      try {
        var first = null;
        if (window.plus) {
          var webview = plus.webview.currentWebview();
          plus.key.addEventListener("backbutton", function () {
            webview.canBack(function (e) {
              if (e.canBack) {
                webview.back(); //这里不建议修改自己跳转的路径
              } else {
                //首次按键，提示‘再按一次退出应用’
                if (!first) {
                  first = new Date().getTime(); //获取第一次点击的时间戳
                  // console.log('再按一次退出应用');//用自定义toast提示最好
                  // toast('双击返回键退出应用'); //调用自己写的吐丝提示 函数
                  plus.nativeUI.toast("Logout the APP if you press again", {
                    duration: "short",
                  }); //通过H5+ API 调用Android 上的toast 提示框
                  setTimeout(function () {
                    first = null;
                  }, 1000);
                } else {
                  if (new Date().getTime() - first < 1000) {
                    //获取第二次点击的时间戳, 两次之差 小于 1000ms 说明1s点击了两次,
                    plus.runtime.quit(); //退出应用
                  }
                }
              }
            });
          });
        }
      } catch (err) {
        console.log(err.message);
      }
      var token = JSON.parse(JSON.stringify(localStorage.token));
      var userinfoShop = JSON.parse(JSON.stringify(localStorage.userinfoShop));
      function clearCaching() {
        if (window.plus) {
          plusReady();
        } else {
          document.addEventListener("plusready", plusReady, false);
        }

        function plusReady() {
          plus.cache.clear();
          localStorage.token = token;
          localStorage.userinfoShop = userinfoShop;
        }
      }
      clearCaching();
    }, 1000);
  },
};
</script>

<style></style>
