 <template>
  <div class="play-container" v-if="courseDetails">
    <div class="cover_image">
      <img :src="imgUrl" alt v-if="playUrl==null" />
      <video :src="playUrl" controls v-else></video>
    </div>
    <div class="introduction">
      <div class="title-and-info">
        <div class="title">{{courseDetails.course.title}}</div>
        <div class="info">
          <span>{{courseDetails.course.study_count}}人已經學習</span>
          <span>{{level}}</span>
          <span>{{courseDetails.course.course_duration}}</span>
        </div>
      </div>

      <div class="comment">
        <img src="../../assets/images/evaluate@2x.png" />
      </div>
    </div>
    <div class="course-progress">
      <div class="title">课程进度</div>
      <div class="catelog-container">
        <div
          class="course-item"
          v-for="(item, index) in courseDetails.videos"
          :key="index"
          @click="selectStudy(index)"
        >
          <span :class="activeIndex==index? 'active':''">{{item.name}}</span>
          <div class="studied" v-if="item.is_study==1" :class="activeIndex==index? 'active':''">已学习</div>
          <span class="time" v-else :class="activeIndex==index? 'active':''">{{item.duration}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import http from "@/utils/http";
@Component
export default class Play extends Vue {
  id = "";
  courseDetails = null;
  playUrl = "";
  imgUrl = "";
  activeIndex = 0;
  async selectStudy(index) {
    // 校正
    const isCheck = await this.payFor();
    if (!isCheck) {
      this.$dialog
        .confirm({
          title: "提示",
          message: "你还没有购买该服务,去购买",
          confirmButtonText:"去购买",
          confirmButtonColor:"#ffc874"
        })
        .then(() => {
          // on confirm
          console.log(5454);
          this.$router.push({
            name: "pay",
            params: { id: this.id, imagesUrl: this.courseDetails.course.icon,
              price:this.courseDetails.course.price,title:this.courseDetails.course.title }
          });
        })
        .catch(() => {
          // on cancel
        });
      return;
    }
    // console.log(isCheck);
    this.activeIndex = index;
    this.playUrl = this.courseDetails.videos[index].video_url;
  }
  async payFor() {
    const res = await http({
      url: "order/info",
      params: {
        ["course_id"]: this.id
      }
    });
    // console.log(res);
    if (res.data.status === 0) {
      if (res.data.message.pay_status === 0) {
        return Promise.resolve(false);
      } else {
        return Promise.resolve(true);
      }
    } else {
      return Promise.resolve(false);
    }
  }
  created() {
    this.id = this.$route.params.id;

    this.currentData();
  }
  get level() {
    let level=""
    switch (this.courseDetails.course.level) {
      case 1:
        level= "初级";
        break;
      case 2: {
        level= "中级";
        break;
      }
      case 3: {
        level= "高级";
        break;
      }
      default:
        level= "无等级";
        break;
    }
    return level;
  }
  async currentData() {
    const res = await http({
      url: "course/play/" + this.id
    });
    if (res.data.status === 0) {
      this.courseDetails = res.data.message;
      this.playUrl = this.courseDetails.videos[0].video_url;
      this.imgUrl = this.courseDetails.videos[0].cover_photo_url;
      // this.mylevel = this.courseDetails.course.level;
    }
  }
}
</script>

<style lang="less" scoped>
.play-container {
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
    video {
      width: 375px;
      height: 217px;
    }
  }
  .introduction {
    z-index: 3;
    position: absolute;
    margin-top: -5px;
    border-radius: 16px 16px 0px 0px;
    border-bottom: 1px solid #f5f5f5;
    left: 0;
    right: 0;
    height: 96px;
    background-color: #ffffff;
    padding: 19px 16px;
    display: flex;
    align-items: center;
    .title-and-info {
      flex: 1;
      .title {
        color: #343434;
        font-size: 24px;
        font-weight: bold;
      }
      .info {
        margin-top: 6px;
        height: 17px;
        line-height: 17px;
        color: #818181;
        font-size: 12px;
        display: block;
        span {
          padding-right: 8px;
        }
        span:nth-child(2),
        span:nth-child(3) {
          padding-left: 8px;
        }
        span:nth-child(2) {
          position: relative;
          &::before {
            position: absolute;
            content: "";
            background-color: #ebebeb;
            left: 0px;
            width: 1px;
            top: 4px;
            height: 10px;
          }
          &::after {
            position: absolute;
            content: "";
            background-color: #ebebeb;
            right: 0px;
            width: 1px;
            top: 4px;
            height: 10px;
          }
        }
      }
    }
    .comment {
      margin-top: 16px;
      img {
        width: 99px;
        height: 40px;
      }
    }
  }
  .course-progress {
    margin-top: 111px;
    padding: 22px 16px;
    background-color: #fff;
    .title {
      color: #343434;
      font-size: 15px;
      font-family: PingFang SC;
      font-weight: 800;
    }
    .catelog-container {
      .course-item {
        display: flex;
        justify-content: space-between;
      }
      span {
        color: #636363;
        font-size: 15px;
        height: 40px;
        line-height: 40px;
      }
      .studied {
        float: right;
        margin-top: 8px;
        font-size: 10px;
        text-align: center;
        color: #aaaaaa;
        background-color: #f5f5f5;
        border-radius: 6px;
        width: 49px;
        height: 24px;
        line-height: 24px;
      }
      .time {
        float: right;
      }
      .active {
        color: #ff5e00;
      }
    }
  }
}
.comment-content {
  label {
    width: 100rpx;
  }
  textarea {
    width: 100%;
    height: 200rpx;
  }
}
</style>