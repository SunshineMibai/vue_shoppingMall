<template>
   <div class="user-statement">
      <m-head title='声明信息' @headBack='goToUser' />
      <m-content :isHead="true">
         <div slot='all_content'>
            <p class='content'>本项目技术栈：Vue、Vuex-class、Axios、Mand-mobile、TypeScript，以及各种精美插件。</p>
            <p class='content'>
               前后端都是从新开发，此项目开发完成之后，后台数据完全可以进行复用，用作其他项目。本人还会继续组织其他开源项目，挑战各种前后端技术栈，包括但不限于（Vue、React、Angular、小程序）等等...请持续关注-米白小站
            </p>
         </div>
      </m-content>
   </div>
</template>

<script lang='ts'>
import { Component, Prop, Vue } from "vue-property-decorator";

import { MHead, MContent } from '@/components'


@Component({
   components: {
      MHead,
      MContent
   }
})
export default class UserStatement extends Vue {
   //   @Prop(String) readonly title!: string | "";

   codes: String = "测试";

   private created(): void { }

   private mounted(): void { }

   private updated(): void { }

   private destroyed(): void { }

   goToUser() {
      console.log(1)
      this.$router.push('/UserCenter')
   }
};
</script>  

<style lang="scss" scoped>
   .content{
      font-size: 16px;
      margin-bottom: 5px;
      text-align: center;
      padding:10px;
   }
</style>
