<template>
  <div class="m-loading-icon">
    <md-icon name="spinner" size="lg" style="-webkit-filter:invert(1)"></md-icon>
    <p>加载中......</p>
  </div>
</template>

<script lang='ts'>
import { Component, Prop, Vue } from "vue-property-decorator";
import { Icon } from 'mand-mobile'
@Component({
  components: {
    Icon
  }
})
export default class MLoadingIcon extends Vue {
  //   @Prop(String) readonly title!: string | "";

  codes: String = "测试";

  private created(): void {}

  private mounted(): void {}

  private updated(): void {}

  private destroyed(): void {}
}
</script>  

<style lang="scss" scoped>
.m-loading-icon{
  width: 100%;
  text-align: center;
  p,span {
    color: #333;
  }
}
</style>
