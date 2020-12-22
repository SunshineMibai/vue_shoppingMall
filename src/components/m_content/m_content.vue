
<template>
  <div class="all-content">
    <m-mescroll :isHead="isHead" v-model='scrollActive' @getMescrollData="$emit('getMescrollData')" :isScroll='isScroll' :scrollHeight='scrollHeight'>
      <div slot="content">
        <slot name="all_content"></slot>
      </div>
    </m-mescroll>
  </div>
</template>

<script lang='ts'>
import { Component, Prop, Vue } from "vue-property-decorator";
import { MMescroll } from "@/components";
@Component({
  components: {
    MMescroll
  }
})
export default class MContent extends Vue {
  @Prop(Boolean) readonly isHead!: Boolean | false;
  @Prop({default: true}) readonly isScroll?: boolean ;
  @Prop({default: ''}) readonly scrollHeight?: string ;
  scrollActive: Boolean = false;
  codes: String = "测试";
  private created(): void {}

  private mounted(): void {
  }

  private updated(): void {}

  private destroyed(): void {}
}
</script>

<style lang='scss' scoped>
</style>