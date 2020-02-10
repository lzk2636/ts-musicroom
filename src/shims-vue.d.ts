declare module '*.vue' {
  import Vue from 'vue'
  export default Vue
}

declare module '@/views/*' {
  import { Vue, Component } from "vue-property-decorator"
  @Component
  export default class extends Vue {

  }
}