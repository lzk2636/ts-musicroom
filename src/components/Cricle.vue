<template>
  <canvas :id="'mysid'+canvId" :width="width" :height="height" ref="canid"></canvas>
</template>
<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
// import { VanComponent } from 'vant/types/component';
@Component
export default class Circle extends Vue {
  @Prop({ type: Number, default: 50 }) width!: number;

  @Prop({ type: Number, default: 50 }) height!: number;
  @Prop({ type: String, default: "#f8f8f8" }) foreBackground!: string;
  @Prop({ type: String, default: "#ff0000" }) Criclebackground!: string;
  @Prop({ type: Number }) canvId?: number;
  @Prop({ type: Number, default: "5" }) lineWidth!: number;
  @Prop({ type: Number, default: "5" }) studyProgress!: number;
  x=this.width
  y=this.height
  progress=this.studyProgress
  line=this.lineWidth
  color=this.Criclebackground
 

 
  mounted() {
    
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const ctx=(this.$refs.canid as any).getContext("2d")
    ctx.strokeStyle = this.foreBackground;
    ctx.lineWidth = this.lineWidth;
    ctx.lineCap="round";
    ctx.arc(
      this.x /2,
      this.y / 2,
      this.x / 2 - this.line,
      0,
      2 * Math.PI
    );
    ctx.stroke();
    ctx.beginPath();
    if(this.studyProgress>=70){
      this.color="#00ff00"
    }else if(this.studyProgress>=50){
      this.color="#ffc571"
    }
    ctx.strokeStyle=this.color
    ctx.lineCap="round";
    ctx.arc(this.x/2,this.y/2,this.x/2-this.line,-0.5*Math.PI,(this.progress/100)*2*Math.PI-0.5*Math.PI)
    ctx.stroke()
    ctx.beginPath()
    ctx.fillStyle=this.color
    ctx.font="15px";
    ctx.fillText(this.progress+"%",this.x/2-10,this.y/2+2);
     ctx.stroke()
  }
}
</script>

<style>
</style>