<template>
  <div class="container">
    <div class="star-bg">
      <img
        src="../assets/images/star_empty@2x.png"
        alt
        v-for="(item, index) in 5"
        :key="index"
        @click="star(index)"
      />
    </div>
    <div class="star">
      <img src="../assets/images/star_fill@2x.png" v-for="(item,index) in myScore" :key="index"  @click="star(index)"/>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
@Component
export default class Star extends Vue {
  @Prop({ type: Number, required: true }) score!: number;
  myScore = 0;
  mounted() {
    this.myScore = this.score;
  }
  star(index: number){
    console.log(index)
    this.myScore=index+1
  }
}
</script>

<style lang="less">
.container {
  position: relative;
  display: flex;
  align-items: center;
  .star-bg,
  .star {
    float: left;
    // vertical-align:

    img {
      width: 20px;
      height: 20px;
    }
  }
  .star {
    position: absolute;
    left: 0;
  }
}
</style>