<template>
<div>
  <van-nav-bar title="酷丁鱼课堂" fixed />
  <course-list :couseres="searchResult"></course-list>
</div>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import CourseList from "@/components/CourseList.vue";
import http from "@/utils/http";
@Component({
  components: {
    CourseList
  }
})
export default class Course extends Vue {
  public searchResult = [];
  created() {
    this.currentData();
  }
  async currentData() {
    const res = await http({
      url: "course/list"
    });
    if (res.data.status === 0) {
      this.searchResult = res.data.message;
    }
  }
}
</script>
<style scoped lang="less">
.course-container{
  margin-top: 46px;
}

</style>