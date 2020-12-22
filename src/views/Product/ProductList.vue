<template>
  <div class="product-list" ref='product_list'>
    <m-head title='商品分类' @headBack='goToHome' />
    <div slot='all_content'>
      <md-tab-bar v-model="current" :items="pageList" @change="onTabChange" ref='md_tab_bar'></md-tab-bar>
      <md-swiper 
        v-if='showContainer'
        ref="swiper" 
        :autoplay="0" 
        :is-prevent="false" 
        :is-loop="false" 
        :has-dots="false" 
        @before-change="onSwiperChange" 
        class='order-swiper'
        :dragable='false'>
        <md-swiper-item>
          <m-content scrollHeight='45' @getMescrollData='getMescrollData'>
            <div slot='all_content' class='pro-list'>
              <div v-for='(item,index) in productList' :key='index' @click='goToProductDetail(item.product_id)'>
                <img :src="item.product_img" alt="">
                <p class='text-right pro-price'>￥{{item.product_price}}</p>
                <p>{{item.product_name}}</p>
              </div>
            </div>
          </m-content>
        </md-swiper-item>
      </md-swiper>
    </div>
    
  </div>
</template>

<script lang='ts'>
import { Component, Prop, Vue } from "vue-property-decorator";
import { State, Mutation } from "vuex-class";
import { MHead, MContent } from "@/components";
import { TabBar, Swiper, SwiperItem } from "mand-mobile";

import { getProductTypes } from '@/service/product'

@Component({
  components: {
    MHead,
    MContent,
    TabBar,
    Swiper,
    SwiperItem
  }
})
export default class extends Vue {
  //   @Prop(String) readonly title!: string | "";
  @State("Common") stateCommon: object;

  codes: string = "测试";
  pageList: object = [];
  productList: object = [];
  current: number = 0;
  itemIndex: number = 0;
  showContainer: boolean = true;

  goToHome() {
    this.$router.push(`/home`);
  }
  goToProductDetail(id:string) {
    this.$router.push(`/ProductDetail?product_id=${id}`)
  }
  getMescrollData() {
    this.getProductTypes(this.current+1+'')
  }
  onTabChange(item: object, index: number) {
    this.getProductTypes(index+1+'')
  }
  onSwiperChange(from: any, to: any) {
    this.current = to;
  }
  getProductTypes(type:string) {
    this.productList = []
    let req = {
      product_type: type,
    }
    getProductTypes(req).then((res:object)=> {
      if(res.responseCode == 1000) {
        this.productList = res.responseData
      } 
    })
  }
  private created(): void {
    console.log(this.stateCommon);
    let list = JSON.parse(JSON.stringify(this.stateCommon.page_list));
    list.forEach((item: object, index: number) => {
      let obj = {
        name: index,
        label: item.page_title
      };
      this.pageList.push(obj);
    });
    console.log(this.pageList);
  }

  private mounted(): void {
    this.$nextTick(() => {
      this.$refs.product_list.style.height =
        (<any>window).utils.globalConfig.screenHeight + "px";
        this.getProductTypes(this.$route.query.type || '1')
        this.current = this.$route.query.type ? parseInt(this.$route.query.type)-1 : 0
    });
  }

  private updated(): void {}

  private destroyed(): void {}
}
</script>  

<style lang="scss" scoped>
.product-list {
  overflow: hidden;
}
::v-deep .mescroll {
  background-color: #f2f2f2 !important;
}
::v-deep .md-tab-bar {
  padding: 0;
}

::v-deep .md-tab-bar-list {
  margin-top: 55px;
  .md-tab-bar-item {
    height: 40px;
    min-height: 40px;
    font-size: 14px;
    width: 20%;
    padding: 0 5px;
  }
}
::v-deep .is-active {
  color: $theme-active;
}

::v-deep .md-tab-bar-ink {
  background: $theme-active;
  height: 2px;
}
.pro-list {
  display: flex;
  flex-wrap: wrap;
  >div{
    width: 45%;
    margin: 1.5% 2.5%;
    padding: 10px;
    background: #fff;
    border-radius: 5px;
    img {
      width: 100%;
      height: 120px;
    }
    p {
      font-size: 13px;
    }
    .pro-price {
      color: $theme-active;
    }
  }
}
</style>
