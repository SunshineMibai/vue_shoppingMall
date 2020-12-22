<template>
  <div id="app">
    <transition name="fade" mode="out-in">
      <router-view />
    </transition>
    
  </div>
</template>

<script lang='ts'>
import { Component, Prop, Vue } from "vue-property-decorator";
@Component({})
export default class App extends Vue{
  mounted() {
    this.$nextTick(()=> {
      $('.vc-switch').html('deBug')
      $('.vc-switch').css({
        'background':'green',
        'width':'50px',
        height:'50px',
        borderRadius:"50px",
        lineHeight:'50px',
        textAlign:'center',
        padding:'0'
      })
    })
  }
};
</script>  

<style lang="scss" scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity .3s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
