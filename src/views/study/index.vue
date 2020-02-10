<template>
<div>


    <van-nav-bar title="酷丁鱼课堂" fixed />
  <div class="study-container">
    <div class="study-item" v-for="(item, index) in studyProcess" :key="index">
      <img :src="item.icon" />
      <div class="meta">
        <p class="title">{{item.title}}</p>
        <p class="progress">已学习{{item.study_hour}}课时/{{item.total_hour}}课时</p>
      </div>
      <div class="circle">
       <cricle
          :width="55"
          :height="55"
          :canvId="item.cid"
          :lineWidth="5"
          :studyProgress="item.study_progress"
        />
      </div>
    </div>
    <div v-if="studyProcess.length===0">
      <p class="no-study-tip">你还没有任何学习记录喔,赶快去学习</p>
    </div>
  </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import http from "@/utils/http";
import Cricle from "@/components/Cricle.vue";
@Component({
  components: {
    "cricle":Cricle
  }
})
export default class Study extends Vue {
  studyProcess = [];
  mounted() {
    this.currentData();
  }

  async currentData() {
    const res = await http({
      url: "study/progress"
    });
    if (res.data.status === 0) {
      this.studyProcess = res.data.message;
    }
  }
}
</script>
<style lang="less" scoped>
/* pages/study/study.wxss */
.study-container {
  margin-top: 46px;
  margin-bottom: 60px;
  display: flex;
  flex-direction: column;
  padding-bottom: 16px;
  align-items: center;
  position: relative;
}

.study-item {
  margin-top: 16px;
  background-color: #fff;
  border-radius: 6px;
  width: 343px;
  height: 110px;
  display: flex;
  align-items: center;
}

.study-item img {
  width: 54px;
  height: 54px;
  margin-left: 25px;
}

.study-item .meta {
  flex: 1;
  margin-left: 25px;
  display: flex;
  flex-direction: column;
}

.study-item .meta .title {
  font-size: 15px;
  color: #333333;
}

.study-item .meta .progress {
  margin-top: 5px;
  font-size: 11px;
  color: #a8a8a8;
}

.circle {
  width: 55px;
  height: 55px;
  margin-right: 28px;
}

.no-study-tip {
  margin-top: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 250px;
  font-size: 15px;
}
</style>