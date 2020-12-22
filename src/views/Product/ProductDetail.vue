<template>
  <div>
    <m-content v-if='isDataActive'>
      <div slot='all_content'>
        <div class="pro-item">
          <div class='pro-item-banner'>
            <m-swiper v-model='itemBannerList'/>
            <md-icon name="arrow-left" @click="goToHome"></md-icon>
          </div>
              <div class='pro-item-center'>
              <p>{{itemObj.product_name}}</p>
              <p class='red'>￥{{itemObj.product_present_price}}</p>
              <p>
                <span>运费：0</span>
                <span>剩余：{{itemObj.product_surplus_num}}</span>
                <span @click='collectionItem(itemObj.product_id)'> 
                  收藏：
                  <i class='iconfont iconshoucang'></i>
                </span>
              </p>
              </div>
              <div class="md-example-child md-example-child-tabs md-example-child-tabs-0">
                <md-tabs v-model='tab_model'>
                  <md-tab-pane class="content" name="p1" label="商品详情">
                    <img v-for='(item,index) in itemDetailImgList' :key='index' v-lazy='item' class='pro-item-img'/>
                  </md-tab-pane>
                  <md-tab-pane class="content" name="p2" label="商品评论">
                    <div v-for='(item,index) in proEvaList' :key='index' class='pro-eva-list'>
                      <div class='user-item'>
                        <img :src="item.user_img" alt="">
                        <div>
                          <p>{{item.user_name}}</p>
                          <p>{{item.pro_date}}</p>
                        </div>
                      </div>
                      <p class='user-text'>{{item.pro_content}}</p>
                      <m-comment :disabled='true' v-model='item.express_star' title='快递评价'/>
                      <m-comment :disabled='true' v-model='item.pro_star' title='商品评价'/>
                      <m-comment :disabled='true' v-model='item.serve_star' title='服务评价'/>
                    </div>
                    <div style='color:#ccc;text-align:center;margin-top:20px;' v-if='proEvaList.length == 0'>
                      暂无评论内容~
                    </div>
                  </md-tab-pane>
                </md-tabs>
              </div>
            </div>
        </div>
      </m-content>
      <div class='btm-btns'>
        <div>
          <div @click='()=>{this.$router.push(`/home`)}'>
            <p class='iconfont iconshouye1'></p>
            <p>首页</p>
          </div>
          <div @click='()=>{this.$router.push(`/shoping_cart`)}' class='cart-icon'>
            <p class='iconfont icongouwuche1'></p>
            <p>购物车</p>
            <p v-if="stateCommon.shop_cart_num > 0" class='cart-num'>{{stateCommon.shop_cart_num}}</p>
          </div>
        </div>
        <button @click='addShoppingCart(itemObj)'>加入购物车</button>
        <button @click="showPopUp('bottom')">立即购买</button>
      </div>
      <md-popup
      v-model="isPopupShow.bottom"
      position="bottom"
      :mask-closable='false'
    >
      <md-popup-title-bar
        describe="Popup Description"
        
        @confirm="hidePopUp('bottom')"
        @cancel="hidePopUp('bottom')"
      ></md-popup-title-bar>
      <div class="md-example-popup md-example-popup-bottom modal-div">
        <div class='top'>
          <img :src='itemObj.product_top_img_1'/>
          <div>
            <p>{{itemObj.product_name}}</p>
            <p>￥{{prTotal}}</p>
          </div>
          <md-icon name="wrong" size="xs" @click="hidePopUp('bottom')"></md-icon>
        </div>
        <div class='ctn'>
          <div>
            <p>购买数量</p>
            <div>
              <p @click='reduceProNum()'>-</p>
              <p>{{proCount}}</p>
              <p @click='addProNum()'>+</p>
            </div>
          </div>
          <p>
            <span>剩余：{{itemObj.product_surplus_num}}件</span>
            <span>每人限购{{itemObj.product_max_num}}件</span>
          </p>
        </div>
        <button class='submit-btn' @click='orderSend()'>立即购买</button>
      </div>
    </md-popup>
  </div>
</template>

<script lang='ts'>
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { State, Mutation, Action } from "vuex-class";
import { MContent, MSwiper, MComment } from "@/components";
import { Icon, Tabs, TabPane, Popup } from "mand-mobile";
import {
  addShoppingCart,
  getProductDetail,
  getProductEva
} from "@/service/product";
@Component({
  components: {
    MSwiper,
    Icon,
    Tabs,
    TabPane,
    MContent,
    Popup,
    MComment
  }
})
export default class ProductDetail extends Vue {
  itemObj: object = {};
  itemBannerList: object = [];
  itemDetailImgList: object = [];
  isDataActive: boolean = false;
  isPopupShow: object = {};
  proEvaList: object = [];
  tab_model: string = "p1";
  proCount: number = 1;
  @State("Common") stateCommon: any;
  @Mutation("SET_SELECTEDLIST") SET_SELECTEDLIST: any;
  @Action("ACT_SETSHOPCARTNUM") ACT_SETSHOPCARTNUM: any;

  get prTotal() {
    return this.itemObj.product_present_price * this.proCount;
  }
  @Watch("tab_model")
  tab_modelChange(old: string) {
    console.log(old);
    if (old == "p2") {
      this.getProductEva(this.$route.query.product_id);
    }
  }
  getProductEva(pro_id: string) {
    let req = {
      pro_id
    };
    getProductEva(req).then((res: object) => {
      if (res.responseCode == 1000) {
        res.responseData.forEach((item: object) => {
          item.express_star = parseInt(item.express_star);
          item.pro_star = parseInt(item.pro_star);
          item.serve_star = parseInt(item.serve_star);
        });
        this.proEvaList = res.responseData;
      }
      console.log(this.proEvaList);
      (<any>window).utils.ui.Title(res.responseMsg, 1000);
    });
  }
  orderSend() {
    let arr = [
      {
        checked: true,
        shop_id: "",
        shop_proCount: this.proCount,
        shop_proId: this.itemObj.product_id,
        shop_proImg: this.itemObj.product_top_img_1,
        shop_proPrice: this.itemObj.product_present_price,
        shop_proTitle: this.itemObj.product_name,
        shop_userCode: this.stateCommon.user_code
      }
    ];
    console.log(arr);
    this.SET_SELECTEDLIST(arr);
    this.$router.push("/ShoppingOrder");
  }
  reduceProNum() {
    if (this.proCount >= 2) {
      this.proCount--;
    }
  }
  addProNum() {
    if (
      this.proCount < this.itemObj.product_surplus_num &&
      this.proCount < this.itemObj.product_max_num
    ) {
      this.proCount++;
    }
  }
  addShoppingCart(item: object) {
    console.log(item);
    let req = {
      shop_userCode: this.stateCommon.user_code,
      shop_proTitle: item.product_name,
      shop_proPrice: item.product_original_price,
      shop_proImg: item.product_top_img_1,
      shop_proCount: "1",
      shop_proId: item.product_id
    };
    addShoppingCart(req).then((res: object) => {
      if(res.responseCode == 1000) {
        this.ACT_SETSHOPCARTNUM(res.shop_cart_num);
      }
      (<any>window).utils.ui.Title(res.responseMsg, 1000);
    });
  }
  showPopUp(type: string) {
    this.$set(this.isPopupShow, type, true);
  }
  hidePopUp(type: string) {
    this.$set(this.isPopupShow, type, false);
  }
  getProductDetail() {
    let req = {
      product_id: this.$route.query.product_id
        ? JSON.parse(JSON.stringify(this.$route.query.product_id))
        : ""
    };
    getProductDetail(req).then(res => {
      if (res.responseCode == 1000) {
        let data = res.responseData;
        this.itemBannerList.push({ banner_url: data.product_top_img_1 });
        this.itemBannerList.push({ banner_url: data.product_top_img_2 });
        this.itemDetailImgList.push(data.product_btm_img_1);
        this.itemDetailImgList.push(data.product_btm_img_2);
        this.itemDetailImgList.push(data.product_btm_img_3);
        this.itemObj = data;
        this.ACT_SETSHOPCARTNUM(res.shop_cart_num)
      } else {
        (<any>window).utils.ui.Error(res.responseMsg);
      }
    });
  }
  collectionItem(id:object) {
    console.log(id);
  }
  private created(): void {
    this.getProductDetail();
  }

  private mounted(): void {
    this.$nextTick(() => {
      this.isDataActive = true;
    });
  }

  private updated(): void {}

  private destroyed(): void {}
  goToHome() {
    this.$router.push(`/home`);
  }
}
</script>  

<style lang="scss" scoped>
.pro-item {
  margin-bottom: 50px;
}
.pro-item p,
.pro-item span,
::v-deep .md-tab-bar-item {
  font-size: 16px;
}
::v-deep .md-swiper,
::v-deep .md-swiper-box,
::v-deep .md-swiper-item,
::v-deep .md-swiper-item > img {
  height: 400px !important;
}
::v-deep .md-swiper-indicators {
  bottom: 10px;
}
.pro-item-banner {
  position: relative;
  border-bottom: 1px solid #f2f2f2;
}
.md-icon-arrow-left {
  position: absolute;
  top: 10px;
  left: 10px;
  display: block;
  width: 35px;
  height: 35px;
  line-height: 35px;
  background: rgba(0, 0, 0, 0.5);
  color: #fff;
  font-size: 16px !important;
  border-radius: 50%;
  text-align: center;
}
.pro-item-center {
  p:nth-child(1) {
    padding: 5px 5%;
  }
  p:nth-child(2) {
    padding: 5px 5%;
    color: $theme-active;
    font-weight: bold;
  }
  p:nth-child(3) {
    padding: 10px 5%;
    border-top: 1px solid #f2f2f2;
    border-bottom: 1px solid #f2f2f2;
    height: 40px;
    align-items: center;
    color: #333;
    display: flex;
    justify-content: space-between;
    span:last-child {
      display: flex;
      align-items: center;
      i {
        font-size: 20px;
      }
    }
  }
}
::v-deep .md-tab-bar-start,
::v-deep .md-tab-bar-end {
  opacity: 0;
}
::v-deep .md-tab-bar {
  padding: 0 !important;
  width: 66% !important;
  margin-left: 17%;
  background: #fff;
}
::v-deep .md-tab-bar-ink {
  height: 2px !important;
  background: $theme-active !important;
}
::v-deep .is-active {
  color: $theme-active !important;
}
::v-deep .md-tab-bar-list {
  width: 100% !important;
}
::v-deep .md-tab-bar-item {
  width: 40% !important;
  font-size: 14px;
  min-height: 45px !important;
}
.pro-item-img {
  width: 100%;
  display: block;
}
.btm-btns {
  position: fixed;
  bottom: 0px;
  height: 50px;
  width: 100%;
  display: flex;
  background: #fff;
  border-top: 1px solid #f2f2f2;
  z-index: 100;
  div:nth-child(1) {
    width: 34%;
    div {
      width: 50%;
      padding-top: 5px;
      p {
        text-align: center;
      }
      p:nth-child(1) {
        font-size: 20px;
      }
      p:nth-child(2) {
        width: 100%;
        font-size: 12px;
        color: #333;
      }
    }
  }
  button {
    width: 33% !important;
    border-radius: 0;
    color: #fff;
  }
  button:nth-child(2) {
    background: #ff976a;
  }
  button:nth-child(3) {
    background: $theme-active;
  }
}
.btm-btns > div:nth-child(1) {
  display: flex;
}
.modal-div {
  background: #fff;
  .top {
    display: flex;
    justify-content: space-between;
    padding: 0 5%;
    img {
      width: 80px;
      height: 80px;
      border: 1px solid #f2f2f2;
      position: relative;
      bottom: 20px;
    }
    div > p {
      margin-top: 5px;
      font-size: 14px;
    }
    div > p:nth-child(2) {
      margin-top: 5px;
      color: $theme-active;
      font-weight: bold;
    }
    ::v-deep .md-icon-wrong {
      margin-top: 5px;
    }
  }
  .ctn {
    div:nth-child(1) {
      width: 80%;
      margin-left: 10%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      p:nth-child(1) {
        font-size: 14px;
      }
      div:nth-child(2) {
        display: flex;
        align-items: center;
        p {
          width: 40px;
          height: 30px;
          background: #f2f2f2;
          text-align: center;
          font-size: 20px;
          line-height: 30px;
          margin: 0 1px !important;
        }
        p:nth-child(2) {
          color: #ccc;
          font-size: 14px;
        }
      }
    }
    p:nth-child(2) {
      margin: 10%;
      font-size: 14px;
      span:nth-child(2) {
        margin-left: 10px;
        color: $theme-active;
      }
    }
  }
  .submit-btn {
    height: 45px;
    width: 100%;
    color: #fff;
    background: $theme-active;
    border-radius: 0;
  }
}
::v-deep .md-popup-box {
  overflow: initial;
}
::v-deep .md-popup-title-bar {
  display: none !important;
}
.pro-eva-list {
  margin: 10px;
  border-bottom: 1px solid #ccc;
  padding: 10px;
  .user-item {
    display: flex;
    img {
      width: 50px;
      height: 50px;
      border-radius: 25px;
      margin-right: 10px;
    }
    p {
      font-size: 14px;
      height: 25px;
      color: #333;
    }
  }
  .user-text {
    margin: 10px 0 10px 5px;
    height: 35px;
    line-height: 35px;
    color: #333;
    border-bottom: 1px solid #eee;
  }
}
.cart-icon {
  position: relative;
}
.cart-num {
  position: absolute;
  top: -5px;
  right: 20%;
  background: $theme-active;
  color: #fff;
  border-radius: 20px;
  line-height: 15px;
  text-align: center;
  font-size: 12px;
  width: 15px;
  height: 15px;
}
</style>
