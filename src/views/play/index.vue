<template>
  <div>
    {{id}}
  </div>
</template>

<script lang="ts">
import { Vue,Component } from "vue-property-decorator";
// import { VanComponent } from 'vant/types/component';
@Component
export default class Play extends Vue{
   id=""
   created(){
     this.id=this.$route.params.id
   }
}
</script>

<style>

</style>