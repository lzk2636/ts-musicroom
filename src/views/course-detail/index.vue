<template>
  <div class="course-detail-container" v-if="courseDetails">
    <van-nav-bar left-arrow @click-left="$router.back()"></van-nav-bar>
    <div class="cover_image" v-if="!isPlay">
      <img :src="courseDetails.course.cover_image_url" />
      <div class="play">
        <img src="../../assets/images/play@2x.png" @click="playing" />
        <p>课程播放</p>
      </div>
    </div>
    <div class="course_video" v-else>
      <video controls :src="courseDetails.course.course_video_url" autoplay></video>
    </div>
    <!-- 介绍-->
    <div class="introduction">
      <div class="title-price">
        <p>{{courseDetails.course.title}}</p>
        <p>￥{{courseDetails.course.price}}</p>
      </div>
      <div class="introduce">{{courseDetails.course.introduction}}</div>
      <div class="star">
        <star :score="courseDetails.course.score"></star>
        <p>{{courseDetails.course.study_count}}人已经学习</p>
      </div>
      <div class="study-share">
        <img src="../../assets/images/start_study@2x.png" @click="playings" />
        <div class="share-button"></div>
      </div>
    </div>
    <!--用户介绍 -->
    <div class="catalog">
      <div class="head">
        <p
          v-for="(item, index) in courseName"
          :key="index"
          @click="toDetail(index)"
          :class="{active:couserIndex===index}"
        >{{item}}</p>
      </div>
      <!--课程列表-->
      <div class="catelog-container" v-if="couserIndex==0">
        <div v-if="courseDetails.videos">
          <span v-for="(item,index) in courseDetails.videos" :key="index">{{index+1}}.{{item.name}}</span>
        </div>
        <div v-else>暂无这个课程学习</div>
      </div>

      <!--- 讲师介绍 -->
      <div class="lecturer-container" v-if="couserIndex==1">
        <div v-if="courseDetails.lecturer">
          <div class="info">
            <div class="name-follow">
              <p>{{courseDetails.lecturer.name}}</p>
              <p>{{courseDetails.lecturer.follow_count}}人关注</p>
            </div>
            <img :src="courseDetails.lecturer.avatar" />
            <div
              @click="followLecturer(courseDetails.lecturer)"
              :class="[courseDetails.lecturer.is_follow==0? 'unfollow':'follow']"
            >{{courseDetails.lecturer.is_follow==0? '关注':'已关注'}}</div>
            <!-- <div class="follow">已关注</div> -->
          </div>
          <div class="introduce">
            <p>{{courseDetails.lecturer.introduction}}</p>
          </div>
        </div>
        <div v-else>讲师列表暂无数据</div>
      </div>
      <!-- 评论列表-->
      <div class="comment-item" v-if="couserIndex==2">
        <div v-if="courseDetails.comments!==null && courseDetails.comments.length>0 ">
          <div v-for="(item,index) in courseDetails.comments" :key="index">
            <div class="info">
              <img :src="item.avatar" />
              <div class="nickname-content">
                <div class="nickname">
                  <p>{{item.nickname}}</p>
                  <star :score="item.score"></star>
                </div>
                <p>{{item.content}}</p>
              </div>
              <!-- <star class="star" :score="5"></star> -->
              <div class="time">{{item.comment_time}}</div>
            </div>
            <div class="star">
              <img
                @click="like(item)"
                :src="item.is_like == 1 ? require('../../assets/images/like_normal@2x.png') : require('../../assets/images/like_highlight@2x.png')"
              />
            </div>
          </div>
        </div>
        <div v-else>暂无评论</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import http from "@/utils/http";
import star from "@/components/star.vue";
@Component({
  components: {
    star
  }
})
export default class CourseDetail extends Vue {
  id = "";
  // eslint-disable-next-line @typescript-eslint/camelcase
  courseDetails = null;
  isPlay = false;
  courseName = ["目录", "讲师介绍", "评价"];
  couserIndex = 0;
playings(){
  this.$router.push(`/play/${this.id}`)
}
  toDetail(index: number) {
    console.log(index);
    this.couserIndex = index;
  }
  playing() {
    this.isPlay = true;
    console.log(this);
  }

  created() {
    this.id = this.$route.params.id;
    // console.log(this.id)
    this.currentData();
  }
  async currentData() {
    // console.log();
    const res = await http({
      url: "course/" + this.id
    });
    if (res.data.status === 0) {
      this.courseDetails = res.data.message;
    }
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async followLecturer(lecturer: any) {
    if (lecturer.is_follow === 0) {
      const res1 = await http.post("lecturer/follow", {
        ["lecturer_id"]: lecturer["id"]
      });
      if (res1.data.status === 0) {
        this.$toast("关注成功");
        lecturer["is_follow"] = 1;
      }
    } else {
      const res1 = await http.post("lecturer/unfollow", {
        ["lecturer_id"]: lecturer["id"]
      });
      if (res1.data.status === 0) {
        this.$toast("取消关注成功");
        lecturer["is_follow"] = 0;
      }
    }
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async like(item: any) {
    switch (item["is_like"]) {
      case 1:
        item["is_like"] = 2;
        break;

      default:
        item["is_like"] = 1;
        break;
    }
     await http({
      url: "comment/like",
      method: "POST",
      data: {
        ["comment_id"]: item.id,
        ["is_like"]: item["is_like"]
      }
    });
  }
}
</script>

<style lang="less" scoped>
.course-detail-container {
  background-color: #efefef;
  position: relative;
  .cover_image {
    width: 375px;
    height: 217px;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      width: 375px;
      height: 217px;
    }
    position: relative;
    .play {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      position: absolute;
      img {
        width: 82px;
        height: 82px;
      }
      p {
        margin-top: 5px;
        color: #e9e9e9;
        font-size: 15px;
      }
    }
  }
  .course_video {
    width: 375px;
    height: 217px;
    video {
      width: 375px;
      height: 217px;
    }
  }
  .introduction {
    z-index: 3;
    position: absolute;
    margin-top: 0px;
    border-radius: 16px 16px 0px 0px;
    left: 0;
    right: 0;
    height: 226px;
    background-color: #ffffff;
    padding: 10px 15px;
    .title-price {
      margin-top: 5px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      p:nth-child(1) {
        font-size: 24px;
        color: #343434;
        font-weight: Bold;
      }
      p:nth-child(2) {
        font-size: 22px;
        color: #ee3939;
      }
    }
    .introduce {
      color: #818181;
      font-size: 12px;
      // margin-top: 50px;
    }
    .star {
      display: flex;
      margin-top: 20rpx;
      p {
        height: 50rpx;
        line-height: 50rpx;
        margin-left: 20rpx;
        font-size: 12px;
        color: #fe8e38;
      }
    }
    .study-share {
      margin-top: 21px;
      margin-bottom: 26px;
      img:nth-child(1) {
        width: 284px;
        height: 46px;
      }
      .share-button {
        border: none;
        width: 46px;
        height: 46px;
        background-color: #fff;
        border-radius: 5px;
        display: flex;
        justify-content: center;
        align-items: center;
        float: right;
        background-image: url(../../assets/images/share@2x.png);
        background-repeat: no-repeat;
        background-size: 17px 17px;
        background-position: 15px 15px;
      }
    }
  }
  .catalog {
    margin-top: 260px;
    // position: absolute;
    z-index: 5;
    width: 375px;
    // height: 582rpx;
    background-color: #ffffff;
    .head {
      height: 60px;
      background-color: #ffffff;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid #f5f5f5;
      p {
        text-align: center;
        color: #a8a8a8;
        font-size: 14px;
        height: 60px;
        line-height: 60px;
        flex: 1;
        position: relative;
      }
      .active {
        color: #333333;
        font-weight: bold;
        &::after {
          content: "";
          position: absolute;
          left: 44px;
          bottom: 0px;
          width: 37px;
          height: 3px;
          background-color: #ff8e43;
        }
      }
    }
    .catelog-container {
      padding: 15px;
      height: 291px;
      span {
        background-color: #ffffff;
        color: #636363;
        font-size: 15px;
        height: 40px;
        line-height: 40px;
        display: block;
      }
    }
    .lecturer-container {
      padding: 15px;
      .info {
        height: 100px;
        display: flex;
        align-items: center;
        .name-follow {
          margin-left: 15px;
          display: flex;
          flex-direction: column;
          flex: 1;
          p:nth-child(1) {
            font-size: 17px;
            color: #333333;
          }
          p:nth-child(2) {
            font-size: 14px;
            margin-top: 8px;
            color: #a8a8a8;
          }
        }
        img {
          margin-left: 6px;
          width: 60px;
          height: 60px;
          margin-right: 5px;
        }
        .unfollow {
          width: 68px;
          height: 26px;
          line-height: 26px;
          text-align: center;
          border: 1px solid #a8a8a8;
          border-radius: 13px;
          color: #a8a8a8;
          font-size: 14px;
        }
        .follow {
          width: 68px;
          height: 26px;
          line-height: 26px;
          text-align: center;
          border: 1px solid #a8a8a8;
          border-radius: 13px;
          color: #fff;
          background-color: #a8a8a8;
          font-size: 14px;
        }
      }
      .introduce {
        background-color: #ffffff;
        p {
          margin-left: 6px;
          font-size: 12px;
          font-family: PingFang SC;
          font-weight: 400;
          line-height: 20px;
          color: rgba(168, 168, 168, 1);
          opacity: 1;
        }
      }
    }
    .comment-item {
      background-color: #ffffff;
      padding: 15px;
      // height: 90px;
      border-bottom: 2px solid #f1f1f1;
      .info {
        position: relative;
        // height: 60px;
        display: flex;
        align-items: center;
        img {
          margin-left: 3px;
          width: 48px;
          height: 48px;
          border-radius: 50%;
        }
        .nickname-content {
          flex: 1;
          margin-left: 15px;
          .nickname {
            color: #333333;
            font-size: 15px;
            font-weight: bold;
            align-items: center;
            display: flex;
            p {
              height: 100%;
              display: inline-block;
            }
          }
          p:nth-child(2) {
            margin-top: 8px;
            color: #a8a8a8;
            font-size: 12px;
          }
        }
        .time {
          color: #a8a8a8;
          font-size: 11px;
        }
      }
      .star {
        height: 30px;
        img {
          margin-top: 15px;
          width: 22px;
          height: 22px;
          float: right;
          margin-right: 10px;
        }
        img:nth-child(0) {
          margin-right: 10px;
        }
      }
    }
  }
}
</style>