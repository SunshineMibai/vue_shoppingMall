<template>
   <div class="order-list" ref='order_list'>
     <m-head title='我的订单' @headBack='goToUserCenter' />
        <div slot='all_content'>
          <md-tab-bar v-model="current" :items="items" @change="onTabChange" ref='md_tab_bar'></md-tab-bar>
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
                <m-content 
                  scrollHeight='45'
                  @getMescrollData='getMescrollData(activeType)'
                  >
                  <div slot='all_content'>
                      <div v-for='(item,index) in orderList' :key='index' class='order-details'>
                        <div class='order-title' style="display: flex;justify-content: space-between;">
                            <p>订单号：{{item.orderCode}}</p>
                            <p class='order-type-title'>{{item.orderType | orderState}}</p>
                        </div>
                        <div v-for='(tpl,i) in item.productList' :key='i' class='flex pro-detail'>
                            <img v-lazy="tpl.shop_proImg" alt=""/>
                            <div>
                              <div class='flex'>
                                  <p>{{tpl.shop_proTitle}}</p>
                                  <p>￥{{tpl.shop_proPrice}}</p>
                              </div>
                              <p class='text-right order-count'>x{{tpl.shop_proCount}}</p>
                            </div>
                        </div>
                        <div style='border-top:1px solid #f2f2f2;padding-top: 5px;'>
                            <p class='text-right'>共计{{item.orderProCount}}件商品 合计{{item.orderTotalPrice}}元</p>
                            <p class='text-right'>下单时间：{{item.orderDate}}</p>
                            <p class='text-right'>收货地址：{{item.orderAddress}}</p>
                        </div>
                        <p v-if="item.orderType == 'deliver'" class='text-right next-btn' @click="confirmReceived(item,'receiving')">发货-临时开放</p>
                        <p v-if="item.orderType == 'receiving'" class='text-right next-btn' @click="confirmReceived(item,'complete')">确认收货</p>
                        <p v-if="item.orderType == 'complete'" class='text-right next-btn' @click="goEvaluate(item)">去评价</p>
                        <p v-if="item.orderType == 'evaluate'" class='text-right next-btn' @click="goToEvaluateDetail(item)">查看评价</p>
                      </div>
                      <m-empty title='您的订单为空' v-if='orderList.length==0'/>
                  </div>
                </m-content>
            </md-swiper-item>
          </md-swiper>
        </div>
   </div>
</template>

<script lang='ts'>
import { Component, Prop, Vue } from "vue-property-decorator";
import { MHead, MContent, MEmpty } from "@/components";
import { TabBar, Swiper, SwiperItem } from "mand-mobile";
import { State, Mutation } from "vuex-class";
import { getOrderList, setOrderActive } from "@/service/product";

@Component({
  components: {
    MHead,
    MContent,
    MEmpty,
    TabBar,
    Swiper,
    SwiperItem
  }
})
export default class OrderList extends Vue {
  //   @Prop(String) readonly title!: string | "";
  current: number = 0;
  items: object = [
    { name: 0, label: "全部", type: "whole" },
    { name: 1, label: "待发货", type: "deliver" },
    { name: 2, label: "待收货", type: "receiving" },
    { name: 3, label: "待评价", type: "complete" },
    { name: 4, label: "已评价", type: "evaluate" }
  ];
  itemIndex: number = 0;
  activeType: string = 'whole';
  showContainer: boolean = true;
  codes: String = "测试";
  orderList: any = [];

  @State("Common") stateCommon: any;

  private created(): void {}

  private mounted(): void {
    this.items.forEach((item: object, index: number) => {
      if (item.type == this.$route.query.type) {
        this.current = item.name;
        console.log(index);
        this.itemIndex = index;
      }
    });
    this.$nextTick(() => {
      this.$refs.order_list.style.height =
        (<any>window).utils.globalConfig.screenHeight + "px";
      this.getOrderList(this.$route.query.type);
      // this.$refs.swiper.goto(this.itemIndex);
    });
  }

  private updated(): void {}

  private destroyed(): void {}

  goToUserCenter() {
    this.$router.push("/UserCenter");
  }
  onSwiperChange(from: any, to: any) {
    this.current = to;
  }
  onTabChange(item: any, index: any) {
    console.log(item)
    console.log(index)
    // this.$refs.swiper.goto(index);
    this.activeType = item.type
    this.getOrderList(item.type);
  }
  getMescrollData(type: string) {
    console.log(type);
    this.getOrderList(type);
  }
  getOrderList(order_type: string) {
    this.orderList = [];
    let req = {
      shop_userCode: this.stateCommon.user_code,
      user_shopType: order_type
    };
    getOrderList(req).then((res: object) => {
      if (res.responseCode == 1000) {
        this.orderList = res.responseData;
      }
    });
  }
  confirmReceived(item: object, type: string) {
    console.log("确认收货", item);
    let req = {
      order_id: item.orderCode,
      order_type: type
    };
    setOrderActive(req).then((res: object) => {
      (<any>window).utils.ui.Title(res.responseMsg, 1000);
      setTimeout(() => {
        this.getOrderList(type);
        this.$nextTick(() => {
          if (type == "receiving") {
            this.current = 2;
            // this.$refs.swiper.goto(2);
          } else if (type == "complete") {
            this.current = 3;
            // this.$refs.swiper.goto(3);
          }
          this.activeType = type
        });
      }, 1000);
    });
  }
  goEvaluate(item: any) {
    console.log("去评价", item);
    this.$router.push(`/OrderEvaluate?id=${item.orderCode}`);
  }
  goToEvaluateDetail(item: any) {
    console.log("查看评价", item);
    this.$router.push(`/OrderEvaluateDetail?id=${item.orderCode}`);
  }
}
</script>  

<style lang="scss" scoped>
//mand-hack
.order-list {
  overflow: hidden;
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
  }
}

::v-deep .is-active {
  color: $theme-active;
}

::v-deep .md-tab-bar-ink {
  background: $theme-active;
  height: 2px; // margin: 0 5%;
}
::v-deep .md-swiper-box {
  // position: fixed;
  left: 0 !important;
  // // padding-top: 80px!important;
  // z-index: 10000;
  // top:0!important;
}
::v-deep .mescroll {
  background-color: #f2f2f2 !important;
}
::v-deep .mescroll > div:nth-child(2) {
  margin-bottom: 100px !important;
}
.order-type-title {
  color: $theme-active;
}
.order-details {
  background: #fff;
  border-radius: 8px;
  width: 95%;
  padding: 10px 10px 50px 10px;
  margin: 10px auto 10px auto;
  .pro-detail {
    margin-bottom: 5px;
    div {
      flex: 1;
      padding-left: 10px;
    }
  }
  img {
    width: 85px;
    height: 85px;
    border: 1px solid #f2f2f2;
    border-radius: 8px;
  }
  p {
    font-size: 14px;
  }
  .order-title {
    font-size: 15px;
    height: 35px;
    line-height: 35px;
    padding-bottom: 5px;
    border-bottom: 1px solid #f2f2f2;
    margin-bottom: 5px;
  }
}
.order-count {
  color: #bbb;
}
.next-btn {
  background: $theme-active;
  color: #fff !important;
  border-radius: 3px;
  text-align: center;
  height: 30px;
  line-height: 30px;
  float: right;
  margin-top: 5px;
  width: 70px;
}
</style>
