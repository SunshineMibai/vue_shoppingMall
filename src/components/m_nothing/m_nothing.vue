<template>
  <div class='all-nothing'>
    <slot name='all_nothing'></slot>
  </div>
</template>

<script lang='ts'>
import { Component, Prop, Vue } from "vue-property-decorator";
@Component({})
export default class AllNothing extends Vue {}
</script>  

<style lang="scss" scoped>
.all-nothing{
   position: fixed;
   top:0;
   height:45px;
   width: 100%;
   z-index: 100;
   border-bottom: 1px solid #ccc;
}
</style>
