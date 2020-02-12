import Vue, { VNode } from 'vue'
// declare function getContext(s: string): void;
declare global {
  function getContext(s: string): void;
  namespace JSX {
    // tslint:disable no-empty-interface
    interface Element extends VNode {
      // getContext(): void;

    }
    // tslint:disable no-empty-interface
    interface ElementClass extends Vue {
    }
    interface IntrinsicElements {
      [elem: string]: any;
    }
  }
}
