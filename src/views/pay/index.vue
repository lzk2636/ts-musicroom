<template>
  <div>
    ssd
  </div>
</template>

<script lang="ts">
import {Vue, Component} from "vue-property-decorator"
// import { VanComponent } from 'vant/types/component';
@Component
export default class Pay extends Vue{
  created(){
    console.log(this.$route)
  }
}
</script>

<style>

</style>