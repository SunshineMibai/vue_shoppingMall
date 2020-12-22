<template>
  <md-dialog
      :title="title"
      :closable="false"
      v-model="basicDialog.open"
      :btns="basicDialog.btns"
    >
      {{content}}
    </md-dialog>
</template>

<script lang='ts'>
import { Dialog } from 'mand-mobile'
import { Component, Prop, Vue } from "vue-property-decorator";
@Component({})
export default class extends Vue {
  @Prop(String) readonly title!: string | "";
  @Prop({default: '取消'}) readonly leftBtnText!: string | "";
  @Prop({default: '确定'}) readonly rightBtnText!: string | "";
  @Prop() readonly content!: string | "";

  codes: string = "测试";
  basicDialog: object = {
    open: true,
    btns: [
      {
        text: this.leftBtnText,
        handler: this.onBasicCancel()
      },
      {
        text: this.rightBtnText,
        handler: this.onBasicConfirm()
      }
    ]
  };
  onBasicCancel() {
    console.log('left')
  }
  onBasicConfirm() {
    console.log('right')
  }
  private created(): void {}

  private mounted(): void {}

  private updated(): void {}

  private destroyed(): void {}
}
</script>  

<style lang="scss" scoped>
</style>
