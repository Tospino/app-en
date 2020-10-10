<template>
  <!-- 账户设置 -->
  <div class="account-settings">
    <div class="settings-header">
      <van-icon name="arrow-left" class="arrow-left" @click="$router.go(-1)" />
      <span class="header-t1">{{ title }}</span>
      <van-icon
        name="chat-o"
        class="chat"
        size="17px"
        @click="jumpRouter('消息')"
      />
    </div>
    <div class="cell" @click="jumpRouter('收货地址')">
      <span>My Shipping Address</span>
      <van-icon name="arrow" class="arrow c-999" />
    </div>
    <div class="cell" @click="jumpRouter('账户安全')">
      <span>Account and Security</span>
      <van-icon name="arrow" class="arrow c-999" />
    </div>
    <!-- <div class="cell bor-b-1" @click="clearCache">
      <span>Clear Cache Data</span>
      <van-icon name="arrow" class="arrow c-999" />
    </div>-->
    <!-- <div class="cell bor-b-1">
            <span>Legal Provision</span>
            <van-icon name="arrow" class="arrow c-999"/>
    </div>-->
    <div class="cell bor-b-1" @click="jumpRouter('About TOSPINO')">
      <span>About TOSPINO</span>
      <van-icon name="arrow" class="arrow c-999" />
    </div>
    <div class="cell bor-b-1" @click="HandleCheckUpdate">
      <span>View New Version</span>
      <van-icon name="arrow" class="arrow c-999" />
    </div>
    <div class="cell bor-b-1">
      <span>Feedback:info@tospino.com</span>
      <van-icon name="arrow" class="arrow c-999" />
    </div>
    <!-- <div class="cell ">
            <span>帮助中心</span>
            <van-icon name="arrow" class="arrow c-999"/>
    </div>-->

    <!-- 清除缓存和检查更新 -->
    <zhezhao v-if="zhezhaoStatus">
      <div class="dialog">
        <div v-if="qchcDialog">
          <div class="dialog-title">
            <span>Tips</span>
            <div class="fl-right">
              <van-icon name="close" @click="zhezhaoStatus = false" />
            </div>
          </div>
          <div class="dialog-body">
            <p>Are you sure to clear cache data?</p>
            <div class="qd-btn" @click="ClearStroage">Yes</div>
          </div>
        </div>
        <div v-else>
          <div class="gx-title">
            <span>Update</span>
            <div class="fl-right">
              <van-icon name="close" @click="zhezhaoStatus = false" />
            </div>
          </div>
          <div class="dialog-body">
            <p>{{ gxStatus ? bbh : "No New Version!" }}</p>
            <div class="ljgx-btn" @click="zhezhaoStatus = false">
              {{ gxStatus ? "Update Now" : "Confirm" }}
            </div>
          </div>
        </div>
      </div>
    </zhezhao>
  </div>
</template>

<script>
import zhezhao from "@/multiplexing/zhezhao";
import { getversion } from "@/api/common/index";
import { Toast } from "vant";
// 检查是否有最新版本
function checkUpdate(version) {
  plus.nativeUI.showWaiting("Check For Updates....");
  getversion({ version: version }).then((res) => {
    plus.nativeUI.closeWaiting();
    switch (res.code) {
      case 0:
        plus.nativeUI.confirm(
          `Current application version：${version},The latest version is：${res.version},Do you update immediately`,
          (event) => {
            if (event.index === 0) {
              downWgt(res.downloadurl);
            }
          },
          "Warm Prompt",
          ["Yes", "No"]
        );
        break;
      case 1:
        plus.nativeUI.alert(
          "Your APP is the latest version and does not need to be updated！"
        );
        break;
      case 2:
        plus.nativeUI.alert("The Version field format is incorrect！");
        break;
      default:
        plus.nativeUI.alert("Detection update failed!");
        break;
    }
  });
}
// 下载wgt文件包
function downWgt(wgtUrl) {
  plus.nativeUI.showWaiting(
    "Download the updated file, please do not interrupt..."
  );
  plus.downloader
    .createDownload(wgtUrl, { filename: "_doc/update/" }, function (d, status) {
      if (status == 200) {
        installWgt(d.filename); // 安装wgt包
      } else {
        plus.nativeUI.alert("Download update file failed！");
      }
      plus.nativeUI.closeWaiting();
    })
    .start();
}
// 更新应用资源
function installWgt(path) {
  plus.nativeUI.showWaiting("安装更新文件...");
  plus.runtime.install(
    path,
    {},
    function () {
      plus.nativeUI.closeWaiting();
      // 删除安装包
      plus.io.resolveLocalFileSystemURL(path, (entry) => {
        entry.remove(
          () => {
            // plus.runtime.restart();
          },
          () => {
            // plus.runtime.restart();
          }
        );
      });
      plus.runtime.restart();
      plus.nativeUI.alert(
        "Application resource update complete！",
        function () {
          plus.runtime.restart();
        }
      );
    },
    function (e) {
      plus.nativeUI.closeWaiting();
      plus.nativeUI.alert(
        "Failed to install update file[" + e.code + "]：" + e.message
      );
    }
  );
}
function clearCacheStroage() {
  plus.storage.clear();
}

export default {
  props: {},
  data() {
    return {
      title: "Settings",
      qchcDialog: false,
      bbh: "新版本：v 1.0.2.0",
      gxStatus: false,
      zhezhaoStatus: false,
      fileSizeString: 0,
    };
  },
  computed: {},
  mounted() {},
  watch: {},
  methods: {
    //进入收货地址
    toAddress() {
      this.$router.push({ name: "收货地址" });
    },
    //跳转路由
    jumpRouter(name) {
      this.$router.push({ name });
    },
    //清除缓存
    clearCache() {
      this.zhezhaoStatus = true;
      this.qchcDialog = true;
    },
    // 清除缓存·真
    ClearStroage() {
      if (window.plus) {
        clearCacheStroage();
        Toast(`清除缓存成功!`);
        this.zhezhaoStatus = false;
        this.qchcDialog = false;
      } else {
        localStorage.clear();
        Toast(`清除缓存成功!`);
        this.zhezhaoStatus = false;
        this.qchcDialog = false;
      }
    },
    //检查更新
    HandleCheckUpdate() {
      //  this.zhezhaoStatus = true;
      //  this.qchcDialog = false;
      this.plusReady();
    },
    plusReady() {
      plus.runtime.getProperty(plus.runtime.appid, function (inf) {
        let wgtVer = inf.version;
        checkUpdate(wgtVer);
      });
    },
  },
  components: {
    zhezhao,
  },
};
</script>

<style scoped lang="less">
.settings-header {
  width: 100%;
  height: 88px;
  background-color: #f2f3f5;
  text-align: center;
  position: relative;
  .arrow-left {
    position: absolute;
    top: 20px;
    left: 30px;
    font-size: 40px;
  }
  .header-t1 {
    display: inline-block;
    line-height: 88px;
    font-size: 36px;
    color: #010101;
  }
  .header-t2 {
    position: absolute;
    top: 20px;
    right: 100px;
    font-size: 40px;
  }
  .chat {
    position: absolute;
    top: 20px;
    right: 30px;
  }
}
.cell {
  height: 88px;
  line-height: 88px;
  padding: 0 30px;
  background-color: #fff;
  color: #333;
  position: relative;
  font-size: 30px;
  &:nth-child(2) {
    margin-bottom: 20px;
  }
  &:nth-child(3) {
    margin-bottom: 20px;
  }
  .arrow {
    position: absolute;
    right: 30px;
    top: 50%;
    transform: translateY(-50%);
  }
  .text {
    position: absolute;
    right: 60px;
  }
  .text-tk {
    position: absolute;
    right: 30px;
  }
  .input-xt {
    margin-left: 40px;
    height: 40px;
    border: 0;
  }
}
.bor-b-1 {
  border-bottom: 1px solid #dcdcdc;
}
.zhezhao {
  display: flex;
  justify-content: center;
  align-items: center;
  .dialog {
    width: 500px;
    background-color: #fff;
    .dialog-title {
      padding: 0 30px;
      height: 87px;
      line-height: 87px;
      border-bottom: 1px solid #c9c9c9;
      font-size: 32px;
      color: #666;
    }
    .gx-title {
      padding: 0 30px;
      height: 100px;
      line-height: 100px;
      font-size: 36px;
      color: #333;
      border-bottom: 1px solid #c9c9c9;
      font-weight: bold;
    }
    .dialog-body {
      padding: 60px 0 50px;
      font-size: 28px;
      color: #333;
      text-align: center;
      .qd-btn {
        display: inline-block;
        margin-top: 46px;
        width: 140px;
        height: 50px;
        background: rgba(250, 83, 0, 1);
        line-height: 50px;
        text-align: center;
        color: #fff;
        font-size: 28px;
      }
      .ljgx-btn {
        display: inline-block;
        margin-top: 80px;
        width: 198px;
        height: 60px;
        line-height: 60px;
        background: rgba(250, 83, 0, 1);
        text-align: center;
        color: #fff;
        font-size: 32px;
      }
    }
  }
}
</style>
