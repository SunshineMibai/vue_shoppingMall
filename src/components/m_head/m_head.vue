
<template>
  <div class="all-head">
    <slot>
      <div class="all-head-left">
        <slot name="left">
          <md-icon class='left-back' name="arrow-left" @click="$emit('headBack')"></md-icon>
        </slot>
      </div>
    </slot>
    <div class="all-head-center">{{title}}</div>
    <slot>
      <div class="all-head-right">
        <slot name="right"></slot>
      </div>
    </slot>
  </div>
</template>

<script lang='ts'>
import { Component, Prop, Vue } from "vue-property-decorator";
import { Icon } from "mand-mobile";
@Component({
  components: {
     Icon
  }
})
export default class MHead extends Vue {
  @Prop(String) readonly title!: string | "";

  codes: String = "测试";
  private created(): void {}

  private mounted(): void {}

  private updated(): void {}

  private destroyed(): void {}
}
</script>

<style lang='scss' scoped>
.all-head {
  position: fixed !important;
  width: 100%;
  background: #fff;
  z-index: 100;
  display: flex;
  align-items: center;
  height: 50px;
  box-shadow: 0 2px 2px rgba(3, 3, 3, 0.1);
  .left-back {
    color: $theme-active!important;
  }
  .all-head-left {
    width: 20%;
    padding-left: 10px;
  }
  .all-head-center {
    width: 60%;
    text-align: center;
    font-size: 16px;
    color: $theme-active;
  }
  .all-head-right {
    width: 20%;
    padding-right: 10px;
  }
  ::v-deep .md-icon {
    font-size: 24px !important;
    color: $icon-color;
  }
}
</style>