<template>
  <div class="m-search-product">
    
  </div>
</template>

<script lang='ts'>
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({})
export default class MSearchProduct extends Vue{
  //   @Prop(String) readonly title!: string | "";

  codes: String = "测试";

  private created(): void {}

  private mounted(): void {}

  private updated(): void {}

  private destroyed(): void {}
};
</script>  

<style lang="scss" scoped>
  .m-search-product{
      position: fixed;
      width: 100%;
      height: 40px;
      border-bottom: 1px solid #ccc;
      background: #fff;
      z-index: 1000;
  }
</style>
