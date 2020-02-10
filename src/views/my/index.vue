<template>
  <div class="my-container">
    <van-nav-bar title="我的" fixed :border="false" />
    <div class="user-info">
      <img :src="userInfo.avatar===null? require('../../assets/images/user.png'): userInfo.avatar" />
      <div class="username">{{userInfo.nickname===null?'小明':userInfo.nickname}}</div>

      <!-- 学习时间信息 -->
      <div class="studyInfo">
        <div class="study-item">
          <div class="study-time">{{userInfo.study_hour}}</div>
          <div class="study-content">累计学习小时</div>
        </div>
        <div class="study-item">
          <div class="study-time">{{userInfo.follow_count}}</div>
          <div class="study-content">我的关注</div>
        </div>
        <div class="study-item">
          <div class="study-time">{{userInfo.course_count}}</div>
          <div class="study-content">我的课程</div>
        </div>
      </div>
    </div>
    <div class="user-bar">
      <div class="nav">
        <div class="bar-item">
          <p>学习历史</p>
          <img src="../../assets/images/arrow@2x.png" />
        </div>
      </div>
      <div class="nav">
        <div class="bar-item">
          <p>消息提醒</p>
          <img src="../../assets/images/arrow@2x.png" />
        </div>
      </div>
      <div class="nav" @click="clearData">
        <div class="bar-item">
          <p>清除缓存</p>
          <img src="../../assets/images/arrow@2x.png" />
        </div>
      </div>
      <div class="nav">
        <div class="bar-item">
          <p>商务合作</p>
          <img src="../../assets/images/arrow@2x.png" />
        </div>
      </div>
      <div class="nav" bindtap="contact">
        <div class="bar-item">
          <p>联系客服</p>
          <img src="../../assets/images/arrow@2x.png" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Vue, Component } from "vue-property-decorator";
import http from "@/utils/http";
@Component
export default class My extends Vue {
  userInfo = {};
  mounted() {
    this.currnetData();
  }
  // 清除数据
  clearData() {
    this.$toast.loading({
      message: "数据加载中...",
      forbidClick: true,
      loadingType: "spinner",
      onOpened:()=>{
        setTimeout(()=>{
          this.$toast.success("清除成功")
        },2000)
      }
    });
  }
  async currnetData() {
    const res = await http({
      url: "my/info"
    });
    if (res.data.status === 0) {
      this.userInfo = res.data.message;
    }
  }
}
</script>
<style lang="less" scoped>
.my-container {
  height: 100%;
}
.van-nav-bar {
  background-color: #ff8d43;
  .van-nav-bar__title {
    color: #fff;
  }
}
.user-info {
  margin-top: 46px;
  position: relative;
  height: 196px;
  background-color: #ff8d43;
  text-align: center;
  z-index: 9;
}

.user-info img {
  margin-top: 40px;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin-bottom: 16px;
}

.user-info .username {
  font-size: 23px;
  color: #fff;
}

.studyInfo {
  position: absolute;
  /* margin: 0 24rpx; */
  height: 77px;
  width: 300px;
  display: flex;
  justify-content: space-around;
  border-radius: 10px;
  background: #fff;
  bottom: -60px;
  left: 50%;
  transform: translateX(-50%);
}

.studyInfo .study-item {
  text-align: center;
}

.study-item .seconds {
  border-right: 1px solid #ccc;
  border-left: 1px solid #ccc;
}

.studyInfo .study-item .study-time {
  font-size: 26px;
  font-weight: 600;
  line-height: 56px;
}

.studyInfo .study-item .study-content {
  font-size: 12px;
  color: #a8a8a8;
}

.user-bar {
  margin: 12px;
  margin-top: 72px;
}
.user-bar .nav {
  background: #fff;
  margin-bottom: 4px;
}
.user-bar .bar-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 57px;

  /* border-bottom: 2rpx solid #ccc; */
  padding: 0 16px;
}

.user-bar .bar-item img {
  height: 14px;
  width: 10px;
}

.user-bar .bar-item p {
  font-size: 14px;
}
</style>