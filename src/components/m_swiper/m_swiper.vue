<template>
  <div class="all-swiper">
    <md-swiper ref="swiper" :is-prevent="false" :useNative-driver="false">
      <md-swiper-item :key="$index" v-for="(item, $index) in simple">
        <img class="banner-item" :src="item.banner_url" alt />
      </md-swiper-item>
    </md-swiper>
  </div>
</template>

<script lang='ts'>
import { Component, Prop, Vue } from "vue-property-decorator";
import { Swiper, SwiperItem } from "mand-mobile";
@Component({
  components: {
    Swiper,
    SwiperItem
  }
})
export default class MSwiper extends Vue {
  simple: any = [];
  @Prop(Array) readonly value!: Array | [];

  mounted() {
     this.simple = this.value
  }
  //   setValue(id: any, value: any) {
  //     document.querySelector(id) &&
  //       (document.querySelector(id).innerHTML = value);
  //   }
  //   beforeChange(from: any, to: any) {
  //     this.setValue("#valueSwiper0", from);
  //     this.setValue("#valueSwiper1", to);
  //   }
  //   afterChange(from: any, to: any) {
  //     this.setValue("#valueSwiper2", from);
  //     this.setValue("#valueSwiper3", to);
  //   }
  //   fn(index: any) {
  //     this.setValue("#valueSwiper4", index);
  //   }
  //   goto() {
  //     this.$refs.swiper.goto(2);
  //   }
  //   play() {
  //     this.$refs.swiper.play();
  //   }
  //   stop() {
  //     this.$refs.swiper.stop();
  //   }
}
</script>  

<style lang="scss" scoped>
::v-deep .md-swiper {
  height: 200px;
}
::v-deep .md-swiper-box,
.banner-item {
  height: 200px !important;
}
::v-deep .md-swiper-item > img {
  width: 100% !important;
}
::v-deep .md-swiper-indicators {
  bottom: 25px !important;
}
</style>
