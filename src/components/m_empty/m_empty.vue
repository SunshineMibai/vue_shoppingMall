<template>
  <div class="m-empty">
    <p class='iconfont iconkong'></p>
    <p>{{title}}</p>
  </div>
</template>

<script lang='ts'>
import { Component, Prop, Vue } from "vue-property-decorator";
@Component({})
export default class MEmpty extends Vue{
  @Prop(String) readonly title!: string | "";

  codes: String = "测试";

  private created(): void {}

  private mounted(): void {}

  private updated(): void {}

  private destroyed(): void {}
};
</script>  

<style lang="scss" scoped>
  .m-empty{
    margin-top: 30px;
    p:first-child {
      font-size: 120px;
      text-align: center;
      color: #666f83;
    }
    p:last-child {
      text-align: center;
      font-size: 14px;
      color: #666f83;
      margin-top: -5px;
    }
  }
</style>
