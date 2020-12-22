<template>
    <md-popup v-model="isPopupShow.center" :mask-closable='false'>
        <!--<p class='toggle-blue t-center'>滑动验证</p>-->
        <div id="mpanel"></div>
    </md-popup>    
</template>
<script lang='ts'>
import { Component, Prop, Vue,Watch } from "vue-property-decorator";
import { Popup } from 'mand-mobile'
import "./assets/css/verify.css";
import "./assets/js/verify.min.js";
@Component({
  components: {
    Popup
  }
})
export default class MVerify extends Vue {
  isPopupShow: Object = {}
  mounted() {
    this.$set(this.isPopupShow, 'center', true)
    this.initMpanel();
  }
  initMpanel() {
    this.slideVerify();
  }
  slideVerify() {
    let _this = this;
    $("#mpanel").slideVerify({
      //   mode: 'pop',
      type: 2, //类型
      vOffset: 5, //误差量，根据需求自行调整
      vSpace: 5, //间隔
      imgUrl: "http://www.jiaoguoliang.com/project_images/vue3_shopping/home_banner/",
      imgName: ["banner_2.jpg", "banner_3.jpg"],
      imgSize: {
        width: "90%",
        height: "200px"
      },
      blockSize: {
        width: "40px",
        height: "40px"
      },
      barSize: {
        width: "90%",
        height: "40px"
      },
      ready: function() {},
      success: function(obj:any) {
        (<any>window).utils.ui.Title("验证成功！");
        setTimeout(() => {
          _this.$set(_this.isPopupShow, 'center', false)
          _this.$emit("verifySend");
        }, 1000);
      },
      error: function() {
        (<any>window).utils.ui.Error("验证失败！");
      }
    });
  }
}
</script>
<style lang='scss'>
.toggle-blue {
   background: $theme-blue;
   width: 100%;
   height: 35px;
   color: #fff;
   line-height: 35px;
   text-align: center;
}
#mpanel {
  padding-bottom: 10px;
  border: none;
}
.mint-popup {
  width: 80%;
  border-radius: 5px;
}
.verify-img-panel{
  border: none;
}
.verify-move-block {
  background-color: $theme-blue !important;
}
.verify-icon {
  color: #fff !important;
}
.verify-left-bar {
  border-color: $theme-blue !important;
}
.mint-indicator-wrapper {
  z-index: 6666;
}
.verify-bar-area .verify-move-block {
  box-shadow: none;
}
.verify-msg {
  font-size: 14px;
}
</style>
