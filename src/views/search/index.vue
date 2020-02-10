<template>
  <div>
    <van-nav-bar left-arrow @click-left="$router.back()" title="酷丁鱼课堂" fixed/>
    <van-search
      v-model="value"
      @focus="focus"
      shape="round"
      placeholder="请输入搜索关键词"
      @search="onSearch"
      @cancel="onCancel"
      :show-action="isFous"
    >
      <template slot="left-icon">
        <van-icon name="search" />
      </template>
    </van-search>
    
      <div class="empty" v-if="searchResult.length===0">
        <div class="title">没有数据加载</div>
      </div>
   
    <course-list :couseres="searchResult"></course-list>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import http from "@/utils/http";
import CourseList from "@/components/CourseList.vue";
@Component({
  components: {
    CourseList
  }
})
export default class Searcher extends Vue {
  value = "";
  isFous = false;
  searchResult = [];
  focus() {
    this.isFous = true;
  }
  async onSearch() {
    const res = await http({
      url: "course/search",
      params: {
        name: this.value
      }
    });
    if (res.data.status === 0) {
      this.searchResult = res.data.message;
    }
    // this.$toast(this.value);
  }
  onCancel() {
    // this.$toast("取消");
    this.isFous = false;
    this.value = "";
    this.onSearch();
  }
}
</script>

<style lang="less" scoped>
.van-icon {
  color: #ff4488;
}
.empty {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 300px;
}

.empty .title {
  font-size: 14px;
  color: gray;
}
.van-search{
  margin-top: 46px;
}
</style>