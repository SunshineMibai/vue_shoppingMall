<template>
  <div class="md-example-child md-example-child-image-reader">
    <div>
      <ul>
        <template v-for="(item, index) in imgs">
          <li @click="showViewer(index, $event)" :key="index">
            <div
              class="img"
              :style="`background: url(${item}) center no-repeat;background-size:cover;`"
            ></div>
          </li>
        </template>
      </ul>
    </div>
    <md-image-viewer
      v-model="isViewerShow"
      :list="imgs"
      :has-dots="true"
      :initial-index="viewerIndex"
    ></md-image-viewer>
  </div>
</template>

<script lang='ts'>
import { Component, Prop, Vue, Watch } from "vue-property-decorator";

import { ImageViewer } from "mand-mobile";

@Component({
  components: {
    ImageViewer
  }
})
export default class MImg extends Vue {

   @Prop() readonly value!: any | [];
   
   isViewerShow: Boolean = false;
   viewerIndex: Number = 0;
   imgs: any = [];

   @Watch('value')
   valueChange(old) {
      this.imgs = old
   }

  showViewer(index: number): void {
    this.viewerIndex = index;
    this.isViewerShow = true;
  }

  private mounted():void {
     this.imgs = this.value
  }
}
</script>

<style lang="scss" scoped>
.md-example-child-image-reader {
   width: 100%;
   min-height: 100px;
   ul {
      float: left;
      width: 100%;
      li {
         position: relative;
         float: left;
         width: 22%;
         padding-bottom: 22%;
         margin-left:2%;
         margin-top: 2%;
         border-sizing: border-box;
         border-radius:  2px;
         overflow: hidden;
         list-style: none;
         .img {
            position: absolute;
            width: 100%;
            height: 100%;
         }
      }
   }
}
</style>