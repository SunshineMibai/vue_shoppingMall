<template>
   <div>
      <md-dialog title="提示" :closable="false" v-model="basicDialog.open" :btns="basicDialog.btns">
         {{basicDialog.text}}
      </md-dialog>
   </div>
</template>

<script lang='ts'>
import { Component, Prop, Vue } from "vue-property-decorator";
import { Dialog } from 'mand-mobile'
@Component({
   components: {
      Dialog
   }
})
export default class MDialog extends Vue {
   @Prop(String) readonly title!: String | ''
   @Prop(String) readonly type!: String | ''
   basicDialog: Object = {
      open: true,
      btns: [
         {
            text: '取消',
            handler: this.onBasicCancel,
         },
         {
            text: '确认',
            handler: this.onBasicConfirm,
         }
      ],
      text: ''
   };

   codes: String = "测试";

   private created(): void { }

   private mounted(): void {
      this.basicDialog.text = this.title
   }

   private updated(): void { }

   private destroyed(): void { }

   onBasicCancel() {
      this.$emit('getSendDialog', false)
   }
   onBasicConfirm() {
      this.$emit('getSendDialog', true,this.type)
   }
};

</script>

<style lang="scss"
   scoped>
 ::v-deep .md-dialog-body {
   text-align: center;
   padding-left:20px!important;
   padding-right:20px!important;
   font-size: 16px;
}
</style>