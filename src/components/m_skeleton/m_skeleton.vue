<template>
  <md-skeleton avatar title :loading="loading" :row="rowNum" class="skeleton-item">
    <slot name='skeleton'>
      
    </slot>
  </md-skeleton>
</template>

<script lang='ts'>
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { Skeleton } from "mand-mobile";
@Component({
  components: {
    Skeleton
  }
})
export default class MSkeleton extends Vue {
  @Prop(Boolean) readonly value!: Boolean | true;
  @Prop(Number) readonly rowNum!: Number| 0;
  private loading: Boolean = true;

  @Watch("value")
  changeValue(val: Boolean) {
    this.loading = val;
  }

  private created(): void {
   //  console.log(this.value);
  }

  private mounted(): void {}

  private updated(): void {}

  private destroyed(): void {}
}
</script>  

<style lang="scss" scoped>
</style>
