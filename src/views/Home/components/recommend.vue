/* *商品推荐 *1.休闲食品 *2.新鲜水果 *3.营养奶品 */

<template>
  <div class="product-recommend">
    <p class="recommend-title">
      <span>{{itemObject.titleCode}}</span>
      <span>{{itemObject.titleText}}</span>
    </p>
    <div class="rec-list-top">
      <img v-lazy="itemObject.list[0].titleImg" class='rec-img-1' @click='gotoProductDetail(itemObject.list[0])'/>
      <div>
        <div>
          <img v-lazy="itemObject.list[1].titleImg" class='rec-img-2' @click='gotoProductDetail(itemObject.list[1])'/>
        </div>
        <div>
          <img v-lazy="itemObject.list[2].titleImg" class='rec-img-3' @click='gotoProductDetail(itemObject.list[2])'/>
        </div>
      </div>
    </div>
    <div class="rec-list-btm">
      <img v-lazy="itemObject.list[3].titleImg"  class='rec-img-4' @click='gotoProductDetail(itemObject.list[3])'/>
      <img v-lazy="itemObject.list[4].titleImg"  class='rec-img-5' @click='gotoProductDetail(itemObject.list[4])'/>
    </div>
  </div>
</template>

<script lang='ts'>
import { Component, Prop, Vue } from "vue-property-decorator";
import { State, Mutation } from "vuex-class";
@Component({})
export default class extends Vue {
  @Prop(Object) readonly itemObject!: Object | {};

  codes: String = "测试";
  @State("Common") stateCommon: any;
  @Mutation("SETPRODUCTITEM") SETPRODUCTITEM: any;
  private created(): void {
    
  }

  private mounted(): void {}

  private updated(): void {}

  private destroyed(): void {}

  gotoProductDetail (item: object) {
    console.log(item)
    // (<any>window).utils.ui.Error('暂未开放！')
    // this.SETPRODUCTITEM(item)
    this.$nextTick(()=> {
      this.$router.push(`/ProductDetail?product_id=${item.product_code}`)
    })
  }
}
</script>

<style lang="scss"
   scoped>
.recommend-title {
  height: 40px;
  background: #eee;
  text-align: center;
  line-height: 40px;
  font-size: 14px;
  span:first-child {
    background: $theme-active;
    color: #fff;
    padding: 3px;
    border-radius: 50%;
    margin-right: 5px;
  }
  span:last-child {
    color: $theme-active;
  }
}

.rec-list-top {
  display: flex;
  img {
    width: 50%;
  }

  div {
    width: 100%;
    img {
      width: 100%;
    }
  }
}
.rec-list-top>div{
   height: 200px;;
}
.rec-list-btm {
   display: flex;
   img {
      width: 50%;
   }
}
.rec-img-1 {
   height:200px;
   border-right: 1px solid #eaeaea;
}
.rec-img-2,.rec-img-3,.rec-img-4,.rec-img-5 {
   height:100px;
   border-bottom: 1px solid #eaeaea;
}
.rec-img-4{
   border-right: 1px solid #eaeaea;
}
.rec-img-4,.rec-img-5 {
   border-top: 1px solid #eaeaea;
}
</style>