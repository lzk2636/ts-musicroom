<template>
  <div class="home-container">
    <van-search shape="round" background="#ffffff" placeholder="请输入搜索关键词">
      <template slot="left-icon">
        <van-icon name="search" />
      </template>
    </van-search>
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="(item, index) in imageUrl" :key="index">
        <img :src="item.img_url" />
      </van-swipe-item>
    </van-swipe>
    <!-- 推荐课程 -->
    <div>
      <div class="tips">
        <div class="tip">推荐课程</div>
        <img src="../../assets/images/arrow@2x.png" @click="couseMore" />
      </div>
      <div class="course-container">
        <div class="course-item" v-for="(item, index) in couserList" :key="index">
          <img :src="item.icon" />
        </div>
      </div>
    </div>
    <!-- 热门视频 -->
    <div>
      <div class="tips">
        <div class="tip">热门视频</div>
        <img src="../../assets/images/arrow@2x.png" />
      </div>
      <div class="hot-video">
        <div class="video-item">
          <router-link to="/" v-for="(item, index) in videoList" :key="index">
          <img :src="item.cover_photo_url" alt="">
            <div class="title">{{item.name}}</div>
            <div class="subtitle">{{item.view_count}}已经观看</div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Swipe, SwipeItem, Search, Icon } from "vant";
import { Component, Vue } from "vue-property-decorator";
import http from "@/utils/http";
@Component({
  components: {
    "van-search": Search,
    "van-icon": Icon,
    "van-swipe": Swipe,
    "van-swipe-item": SwipeItem
  }
})
export default class Home extends Vue {
  // 轮播列表
  imageUrl = [];
  couserList = [];
  videoList = [];
  created() {
    this.swiperList();
    this.currentCourse();
    this.currentVodie();
  }
  // 页面跳转
  couseMore(){
    this.$router.push('/course')
  }

  // 初始化数据
  async currentVodie() {
    const res = await http({
      url: "home/video"
    });
    if (res.data.status === 0) {
      this.videoList = res.data.message;
    }
  }
  async swiperList() {
    const res = await http({
      url: "home/swipers"
    });
    // console.log(res);
    if (res.data.status === 0) {
      this.imageUrl = res.data.message;
    }
  }
  async currentCourse() {
    const res = await http({
      url: "home/course"
    });
    if (res.data.status === 0) {
      this.couserList = res.data.message;
    }
  }
}
</script>

<style lang="less" scoped>
.router-link {
  display: inline-block;
}
.home-container {
  height: 100%;
  .van-icon {
    &::before {
      color: #ff8d44;
    }
  }
  .my-swipe .van-swipe-item {
    color: #fff;
    font-size: 20px;
    // line-height: 150px;
    text-align: center;
    // background-color: #39a9ed;
    img {
      width: 355px;
      height: 171px;
    }
  }
  .tips {
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .tips .tip {
    font-size: 16px;
    font-weight: 400;
    margin-left: 8px;
    color: #212121;
  }

  .tips img {
    width: 24px;
    height: 24px;
  }
  .course-container {
    height: 85px;
    overflow-y: hidden;
    overflow-x: auto;
    white-space: nowrap;
    .course-item {
      width: 148px;
      height: 84px;
      display: inline-block;
      margin-right: 16px;
      // background: #000;
      &:first-child{
        margin-left: 10px;
      }
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  .hot-video .video-item {
    margin-bottom: 50px;
    justify-content: space-evenly;
    /* width: 377px; */
    display: flex;
    flex-wrap: wrap;
  }

  .video-item img {
    width: 170px;
    height: 105px;
    border-radius: 6px;
  }

  .video-item .title {
    margin-top: 8px;
    color: #262626;
    font-size: 13px;
  }

  .video-item .subtitle {
    margin-top: 8px;
    margin-bottom: 8px;
    color: #959595;
    font-size: 9px;
  }
}
</style>