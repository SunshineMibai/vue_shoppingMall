<template>
  <div class="m-comment">
    <img
      v-for="(item,index) in (1,5)"
      :key="index"
      :src="value>=index+1?selected:select"
      @click="selectClick(index+1)"
    />
    <span>{{title}}{{value}}分</span>
  </div>
</template>

<script lang='ts'>
import { Component, Prop, Vue } from "vue-property-decorator";
@Component({})
export default class MComment extends Vue {
  @Prop() readonly title!: string | "";
  @Prop({default:null}) value?: number;
  select: any = require("@/assets/images/user/star.png");
  selected: any = require("@/assets/images/user/star_active.png");
  @Prop(String) readonly active!: string | "";
  @Prop({default:false}) disabled ?: false;
  current: Number = -1;
  selectClick(index: number) {
    if(this.disabled) return false;
    this.value = index;
  }
  private created(): void {}

  private mounted(): void {
  }
}
</script>

<style lang="scss" scoped>
.m-comment {
  width: 100%;
  display: flex;
  align-items: center;
  // justify-content: flex-end;
  margin-bottom: 10px;
  img {
    width: 22px;
  }
  span {
    margin-left: 5%;
    font-size: 14px;
  }
}
</style>>