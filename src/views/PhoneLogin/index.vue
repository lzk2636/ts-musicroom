<template>
  <!--pages/phone-login/phone-login.wxml-->
  <div class="phone-login-container">
    <div class="phone-validate">手机号验证</div>
    <div class="subtitle">用于即使获取课程最新信息</div>
    <div class="content">
      <input v-model="phone" placeholder="请输入你的手机号" class="phone" />

      <p class="get_vcode" :style="{color:isYan?'#ccc':'#000'}" @click="getCode">{{tips}}</p>
      <!-- <text  class="get_vcode" wx:else>{{leaveTime}}</text> -->
      <input placeholder="请输入验证码" type="number" class="vcode" v-model="vcode" />
    </div>
    <div class="phone-login" @click="phoneLogin">
      <img src="../../assets/images/phone_login@2x.png" />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { Toast } from "vant";
import http from "@/utils/http";
@Component
export default class PhoneLogin extends Vue {
  isYan = false;
  tips = "验证码";
  vcode = "";
  count = 10;
  phone = "17704051019";
  timer = -1;
  phoneLogin() {
    // 1111;
    this.$toast.loading({
      message: "电话加载中...",
      forbidClick: true,
      loadingType: "spinner",
      onOpened: async () => {
        const res = await http({
          url: "user/login",
          method: "POST",
          data: {
            vcode: this.vcode,
            phone: this.phone
          }
        });
        if (res.data.status === 0) {
          localStorage.setItem("my_token",res.data.token)
          this.$store.commit('saveToken',res.data.token)
          this.$router.push("/home");
        }else{
          this.$toast(res.data.message)
        }
      }
    });
  }
  async getCode() {
    if (this.phone.trim().length === 0) {
      Toast("手机号不能为空");
      return;
    }
    const regPhone = /^(1[3-9])[0-9]{9}$/;
    if (!regPhone.test(this.phone)) {
      Toast("手机号不匹配");
      return;
    }

    if (this.isYan) return;
    this.tips = this.count.toString();
    this.isYan = true;
    this.timer = setInterval(() => {
      if (this.count <= 1) {
        this.count = 10;
        this.tips = "验证码";
        this.isYan = false;
        clearInterval(this.timer);
        return;
      }
      this.count--;
      this.tips = this.count.toString();
    }, 1000);

    const res = await http({
      url: "user/vcode",
      params: {
        phone: this.phone
      }
    });
    if (res.data.status === 0) {
      Toast(res.data.vcode);
    }

    // 1111;
  }
  destroyed() {
    //  console.log(55511)
    clearInterval(this.timer);
  }
}
</script>

<style lang="less">
.phone-login-container {
  height: 100%;
  background-color: #fff;
  padding: 0px 34px;
  overflow: hidden;
  .phone-validate {
    margin-top: 50px;
    color: #393939;
    font-size: 21px;
  }
  .subtitle {
    margin-top: 10px;
    color: #a8a8a8;
    font-size: 15px;
  }
  .content {
    margin-top: 100px;
    height: 125px;
    position: relative;
    .phone {
      height: 50px;
      font-size: 15px;
      display: block;
      position: relative;
      border: none;
      border-bottom: 1px solid #e9e9e9;
      width: 100%;
    }
    .get_vcode {
      position: absolute;
      right: 0;
      top: 10px;
      width: 82px;
      height: 28px;
      text-align: center;
      line-height: 28px;
      font-size: 12px;
      color: #a8a8a8;
      border: 1px solid rgba(168, 168, 168, 1);
      border-radius: 10px;
      z-index: 2;
    }
    .vcode {
      margin-top: 25px;
      height: 50px;
      width: 100%;
      font-size: 12px;
      position: relative;
      display: block;
      border: none;
      border-bottom: 1px solid #e9e9e9;
    }
  }
  .phone-login {
    margin-top: 160px;
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      width: 284px;
      height: 49px;
    }
  }
}
</style>