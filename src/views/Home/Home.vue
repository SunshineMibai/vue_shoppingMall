<template>
   <div class="home">
      <!--<m-search-product/>-->
      <m-content :isHead="false"
         @getMescrollData='getMescrollData'>
         <div slot='all_content'>
            <div class='home-content'
               v-if='DataOver'>
               <!-- <i @click="showPopUp('bottom')" class='iconfont iconshezhi'></i> -->
               <m-swiper v-model='simple' />
               <div class='home-page'>
                  <div>
                     <div v-for='item in homePageList' :key='item.page_id'>
                        <m-skeleton v-model='skeActive'
                           :rowNum='0'>
                           <div slot='skeleton'
                              @click='goToProductList(item)'
                              class='product-item'>
                              <img v-lazy="item.page_url"
                                 alt="">
                              <p>{{item.page_title}}</p>
                           </div>
                        </m-skeleton>
                     </div>
                  </div>
               </div>
               <!--热销产品-->
               <home-hot v-model='productHotData' />
               <!--楼层推荐-->
               <div v-for='(item,index) in recommendList' :key='index'>
                  <Recommend :key='item.titleCode' :itemObject='item'/>
               </div>
            </div>
            <!--<m-loading-icon v-else/>-->
         </div>
      </m-content>
      <md-popup
        v-model="isPopupShow.bottom"
        position="bottom"
      >
        <md-popup-title-bar
          title="Popup Title"
          describe="Popup Description"
          ok-text="ok"
          cancel-text="cancel"
          large-radius
          @confirm="hidePopUp('bottom')"
          @cancel="hidePopUp('bottom')"
        ></md-popup-title-bar>
        <div class="md-example-popup md-example-popup-bottom">
          Popup Bottom
        </div>
      </md-popup>
      <m-footer active='1'/>
   </div>
</template>

<script lang='ts'>
import { State, Mutation } from "vuex-class";

import { Component, Prop, Vue } from "vue-property-decorator";
import {
  MContent,
  MSearchProduct,
  MLoadingIcon,
  MSwiper,
  MSkeleton,
  MFooter
} from "@/components";
import HomeHot from "./components/homeHot.vue";
import Recommend from "./components/recommend.vue";
import { getHomeData } from "@/service/home";

@Component({
  components: {
    MContent,
    MSearchProduct,
    MLoadingIcon,
    MSwiper,
    MSkeleton,
    MFooter,
    HomeHot,
    Recommend
  }
})
export default class Home extends Vue {
  simple: object = []; //轮播
  homePageList: object = [];
  productHotData: object = {}; //推荐商品
  recommendList: object = {}; //推荐商品楼层123
  codes: string = "测试";
  DataOver: boolean = false;
  skeActive: boolean = true;
  isPopupShow: object = {}
  @Mutation("SETSHOPCARTNUM") SETSHOPCARTNUM: any;
  @Mutation("SETPAGELIST") SETPAGELIST: any;
  goToProductList(item:object){
    this.$router.push(`/ProductList?type=${item.page_id}`)
  }

  getHomeData() {
    //获取Home数据
    this.skeActive = true;
    this.simple = [];
    this.homePageList = [];
    this.productHotData = {};
    let req = {
      // axiosParams: {
      //    resquestLoadding: true,
      //    resquestLoaddingText: "请稍后..."
      // }
    };
    getHomeData(req).then((res: any) => {
      this.DataOver = true;
      this.simple = res.bannerList;
      this.homePageList = res.pageList;
      this.productHotData = res.HotData;
      this.SETPAGELIST(res.pageList);
      this.SETSHOPCARTNUM(res.HotData.shopCartNnum);
      let recommendList = [
        {
          titleCode: "1F",
          titleText: "休闲食品",
          list: []
        },
        {
          titleCode: "2F",
          titleText: "新鲜水果",
          list: []
        },
        {
          titleCode: "3F",
          titleText: "营养奶品",
          list: []
        }
      ];
      res.ProductHotList.forEach((item: any, index: number) => {
        if (parseInt(item.product_id) < 6) {
          recommendList.forEach(tpl => {
            if (tpl.titleCode == "1F") {
              tpl.list.push(item);
            }
          });
        }
        if (parseInt(item.product_id) > 5 && parseInt(item.product_id) < 11) {
          recommendList.forEach(tpl => {
            if (tpl.titleCode == "2F") {
              tpl.list.push(item);
            }
          });
        }
        if (parseInt(item.product_id) > 10) {
          recommendList.forEach(tpl => {
            if (tpl.titleCode == "3F") {
              tpl.list.push(item);
            }
          });
        }
      });
      this.recommendList = recommendList;
      this.$nextTick(() => {
        this.skeActive = false;
      });
    });
  }
  getMescrollData(): void {
    this.getHomeData();
  }
  private created(): void {
    this.getHomeData();
  }

  private mounted(): void {}

  private updated(): void {}

  private destroyed(): void {}
}
</script>

<style lang="scss"
   scoped>
/*::v-deep */

.home-page {
  width: 100%;
  background: #eee;
  padding: 3% 2%;
  align-items: center;
  min-height: 65px;
}
.home-page > div {
  display: flex;
  padding: 3%;
  border-radius: 8px;
  justify-content: space-between;
  background: #fff;
}
.home-page > div > div {
  width: 20%;
  padding: 0 5px;
  ::v-deep .md-skeleton-avatar {
    margin: 0 auto;
    width: 60%;
    height: 40px;
    padding: 0 5px;
  }
  ::v-deep .skeleton-item {
    display: block !important;
    .md-skeleton-title {
      margin-top: 5px;
      height: 15px;
      width: 100% !important;
    }
    img {
      min-width: 50px;
      min-height: 50px;
    }
  }
  .product-item {
    text-align: center;
    img {
      width: 80%;
    }
    p {
      font-size: 13px;
    }
  }
}

.fonts > span {
  font-size: 50px;
}

.pro > img {
  height: 50px;
  margin-left: 15px;
}

.home-content {
  margin-bottom: 60px;
}
.iconshezhi {
  position: absolute;
  font-size: 30px;
  color: #ccc;
  right: 20px;
  top: 20px;
  z-index: 100;
}
</style>