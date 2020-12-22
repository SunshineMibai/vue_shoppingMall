<template>
   <div class="home-hot">
      <p class='home-hot-title flex'>
         <span>{{homeHotList.title}}</span>
         <!--<span class='flex'>
            <span>more</span>
         <span class='iconfont iconnext'></span>
         </span>-->
      </p>
      <div class='hot-list'>
         <div class='hot-list-row'>
            <div v-for='item in homeHotList.productHotList'
               :key='item.key'
               class='hot-item'>
               <m-skeleton v-model='skeActive'
                  :rowNum='2'>
                  <div slot='skeleton'
                     class='product-item'>
                     <img v-lazy="item.product_top_img_1"  @click='goToDetail(item)'
                        alt="">
                     <p>{{item.product_name}}</p>
                     <p class='hot-item-price'>
                        <span>￥{{item.product_original_price}}</span>
                        <span>￥{{item.product_present_price}}</span>
                     </p>
                     <div class='hot-item-btn'>
                        <button  @click='addShoppingCart(item)'>
                           <span class='iconfont icongouwuche1'></span>
                        </button>
                        <button class='last-btn' @click='goToDetail(item)'>查看详情</button>
                     </div>
                  </div>
               </m-skeleton>
            </div>
         </div>
      </div>
   </div>
</template>

<script lang='ts'>
   import { Component, Prop, Vue, Watch } from "vue-property-decorator";
   import { MSkeleton } from "@/components";
   import { State, Mutation, Action } from "vuex-class";
   import { addShoppingCart } from '@/service/product'
   @Component({
      components: {
         MSkeleton,
      }
   })
   export default class HomeHot extends Vue {
      @Prop(Object) readonly value!: object | {};
      skeActive: boolean = true;
      homeHotList: object = {
         productHotList: []
      }
      @State("Common") stateCommon: any;
      @Mutation("SETPRODUCTITEM") SETPRODUCTITEM: any;
      @Action("ACT_SETSHOPCARTNUM") ACT_SETSHOPCARTNUM: any;

      @Watch('value')
      private valueChange(old:any) {
         this.$nextTick(() => {
            if (old && old.productHotList && old.productHotList.length > 0) {
               this.skeActive = false
            } else {
               this.skeActive = true
            }
         })
      }
      goToDetail(item: object) {
        this.SETPRODUCTITEM(item)
        this.$nextTick(()=> {
          this.$router.push(`/ProductDetail?product_id=${item.product_id}`)
        })
      }
      addShoppingCart(item:object) {
        let req = {
          shop_userCode:this.stateCommon.user_code,
          shop_proTitle:item.product_name,
          shop_proPrice:item.product_original_price,
          shop_proImg:item.product_top_img_1,
          shop_proCount:'1',
          shop_proId: item.product_id
        }
        addShoppingCart(req).then((res:object) => {
          console.log(res)
            this.ACT_SETSHOPCARTNUM(res.shop_cart_num);
            (<any>window).utils.ui.Title(res.responseMsg, 1000)
        })
      }
      private created(): void { }
      private mounted(): void {
         this.homeHotList = this.value
         this.$nextTick(() => {
            this.skeActive = false
         })
      }

      private updated(): void { }

      private destroyed(): void { }
   };

</script>

<style lang="scss" scoped>

   .home-hot-title {
      padding: 10px;
      span {
         font-size: 17px;
         /*color: #333;*/
      }
   }

   .hot-list {
      width: 100%;
      overflow-x: scroll;
      overflow-y: hidden;
   }
   .hot-list::-webkit-scrollbar {
      display: none; //Safari and Chrome
   }
   .hot-list-row {
      display: flex;
      width: 810px!important;
      border-top: 1px solid #eaeaea;
      border-bottom: 1px solid #eaeaea;
      height:180px;
   }
   .hot-img>img {
      width: 50px;
      height: 50px;
   }

   .hot-item {
      width: 135px!important;
      height:180px;
      padding: 5px;
      text-align: center;
      margin: 0;
      border-right: 1px solid #eaeaea;
      img {
         height: 85px;
         width: 85px;
         /*margin-left: 10%;*/
      }
      p {
         overflow: hidden;
         text-overflow: ellipsis;
         display: -webkit-box;
         -webkit-line-clamp: 1;
         -webkit-box-orient: vertical;
      }
      p,
      span,
      button {
         font-size: 14px;
      }
      button:first-child {
         background: $yello-active;
         color: #fff;
         border-top-right-radius: 0;
         border-bottom-right-radius: 0;
         height: 30px;
         line-height: 30px;
         font-size: 18px;
      }
      button:last-child {
         background: $theme-active;
         color: #fff;
         height: 30px;
         border-top-left-radius: 0;
         border-bottom-left-radius: 0;
      }
   }

   .hot-item-price {
      span:first-child {
         font-size: 15px;
      }
      span:last-child {
         text-decoration: line-through;
         font-size: 14px;
         color: #999;
         margin-left: 5px;
      }
   }

   .hot-item-btn {
      display: flex;
      align-items: center;
      button:first-child {
         width: 30%;
         /*padding-right: 5px;*/
         display: flex;
         justify-content: center;
         text-align: center;
      }
      .last-btn {
         width: 70%;
         flex: 1!important;
         font-size: 12px;
      }
   }

   .product-item {
     width: 120px!important;
     p {
      margin-left: 5px;
    }
   }

    ::v-deep .skeleton-item,
    ::v-deep .md-skeleton-avatar {
      display: block!important;
   }

    ::v-deep .md-skeleton-avatar {
      margin: 0 auto!important;
   }

    ::v-deep .md-skeleton-title {
      width: 100%!important;
      margin: 0;
      margin-top: 5px!important;
   }

    ::v-deep .md-skeleton-content>h4,
    ::v-deep .md-skeleton-content>div {
      height: 20px;
      margin-bottom: 5px;
   }

    ::v-deep .md-skeleton-content>.md-skeleton-row:nth-child(2) {
      width: 60%!important;
   }

    ::v-deep .md-skeleton-content>.md-skeleton-row:nth-child(3) {
      width: 100%!important;
   }
</style>