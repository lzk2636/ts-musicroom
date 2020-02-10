<template>
  <div>
    <router-view />
    <van-tabbar v-model="active" route>
      <van-tabbar-item :icon="active==0? home_selected_icon: home_icon" to="/home">首页</van-tabbar-item>
      <van-tabbar-item :icon="active==1? course_selected_icon: course_icon" to="/course">课程</van-tabbar-item>
      <van-tabbar-item :icon="active==2? study_selected_icon: study_icon" to="/study">学习</van-tabbar-item>
      <van-tabbar-item :icon="active==3? my_selected_icon: my_icon" to="/my">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
// import Vue from 'vue';
import { Tabbar, TabbarItem } from "vant";
@Component({
  components: {
    "van-tabbar": Tabbar,
    "van-tabbar-item": TabbarItem
  }
})
export default class Layout extends Vue {
  private active = 0;
  private home_selected_icon = require("../../assets/tabs/icon_home_selected@2x.png");
  private home_icon = require("@/assets/tabs/icon_home@2x.png");
  private my_icon = require("@/assets/tabs/icon_my@2x.png");
  private my_selected_icon = require("@/assets/tabs/icon_my_selected@2x.png");
  private study_icon = require("@/assets/tabs/icon_study@2x.png");
  private study_selected_icon = require("@/assets/tabs/icon_study_selected@2x.png");
  private course_icon = require("@/assets/tabs/icon_course@2x.png");
  private course_selected_icon = require("@/assets/tabs/icon_course_selected@2x.png");
  created() {
    //  this.active=3
    
    console.log(this.$route.path) 
    switch(this.$route.path){
      case '/home':
      this.active=0;
      break;
      case '/course':
      this.active=1;
      break;
      case '/study':
      this.active=2;
      break;
      case '/my':
      this.active=3;
      break;


    }
  }
}
</script>

<style>
</style>