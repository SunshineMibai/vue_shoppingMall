<template>
  <div class="shopping-order">
    <m-head title="订单结算" @headBack="goBack" />
    <m-content :isHead="true" @getMescrollData="getMescrollData">
      <div slot="all_content" class='all_content'>
        <div class="adress flex" @click="goAdress">
          <div class="flex" style="width:100%;">
            <div class="flex" style="width:85%;">
              <!-- <p class="iconfont icondizhi"></p> -->
              <div class="adressInfo">
                <div class="flex" style="width: 100%;">
                  <p>收货人：{{shoppingAdress.ress_name}}</p>
                  <p>{{shoppingAdress.ress_mobile}}</p>
                </div>
                <p v-if='shoppingAdress.ress_ressCode'>
                  收货地址：
                  {{shoppingAdress.ress_ressCode | address_1}}
                  {{shoppingAdress.ress_ressCode | address_2}}
                  {{shoppingAdress.ress_ressCode | address_3}}
                  {{shoppingAdress.ress_detail}}
                </p>
                <p>(收货不便时，可选择免费待收货服务)</p>
              </div>
            </div>
            <img :src="rightImg" style="width:3%;" />
          </div>
        </div>
        <img :src="border_bottom" class="color-img" />
        <div class="shopping_list" v-for="item in list" :key="item.shop_id">
          <div style="width:30%;">
            <img :src="item.shop_proImg" />
          </div>
          <div class="showItem">
            <span>{{item.shop_proTitle}}</span>
            <div>
              <span class='active-text' style="font-weight: 600;">¥ {{item.shop_proPrice}}</span>
              <span>× {{item.shop_proCount}}</span>
            </div>
          </div>
        </div>
      </div>
    </m-content>
    <div class="order_bar">
      <span>合计</span>
      <span class='active-text'>¥ {{totalAll}}</span>
      <p @click="addOrderList">提交订单</p>
    </div>
  </div>
</template>

<script lang='ts'>
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { MContent, MHead } from "@/components";
import { State, Mutation } from "vuex-class";
import { addOrderList } from "@/service/product";
import { getAddressActive } from '@/service/user';
@Component({
  components: {
    MContent,
    MHead
  }
})
export default class ShopingOrder extends Vue {
  @Prop(Object) readonly value!: Object | {};
  locationImg: any = require("@/assets/images/shoppingCart/check.jpg");
  rightImg: any = require("@/assets/images/shoppingCart/right.jpg");
  border_bottom: any = require("@/assets/images/shoppingCart/bottom.jpg");
  shoppingAdress: any = {};
  list: object = [];
  totalAll: string = "0.00";
  @State("Common") stateCommon: any;
  getData() {
    this.list = this.stateCommon.selected_list;
    console.log(this.list)
    let total = 0;
    this.list.forEach((item: object) => {
      item.total =
        parseFloat(item.shop_proPrice) * parseFloat(item.shop_proCount);
      total += parseFloat(item.shop_proPrice) * parseFloat(item.shop_proCount);
    });
    this.totalAll = total.toFixed(2);
    this.getAddressActive()
  }
  getAddressActive() {
    let req = {
      userCode:this.stateCommon.user_code
    }
    getAddressActive(req).then((res:any) => {
      if(res.responseCode == 1000) {
        this.shoppingAdress = res.responseData
      }
    })
  }
  goBack() {
    this.$router.push("/shoping_cart");
  }

  addOrderList() {
    let requ = {
      order_userCode: this.stateCommon.user_code, //用户id
      order_shopList: this.list, //商品list（商品图、商品名、商品单价、商品数量、商品id等）
      order_type: "deliver", //暂写死待发货
      order_date: (<any>window).utils.cache.getDate("date"), //订单提交时间
      order_address: this.shoppingAdress.ress_id, //收货地址
      order_proCount: this.list.length + "", //商品件数
      order_totalPrice: this.totalAll + "" //订单总价
    };
    addOrderList(requ).then((res: any) => {
      (<any>window).utils.ui.Title(res.responseMsg);
      if (res.responseCode == 1000) {
        setTimeout(() => {
          this.$router.push(`/OrderList?type=whole`);
        }, 1500);
      }
    });
  }
  getMescrollData() {
    this.getData();
  }
  goAdress() {
    this.$router.push("/AdressList");
  }
  mounted() {
    this.getData();
  }
}
</script>

<style lang="scss" scoped>
.all_content {
  margin-bottom: 55px;
}
/*::v-deep */
.shopping-order p,
.shopping-order div,
.shopping-order span {
  font-size: 14px;
}
.icondizhi {
  font-size: 24px !important;
  color: #333;
}
input {
  margin: 0;
  width: 15px;
  height: 15px;
}

.adress {
  width: 100%;
  padding: 2% 5%;
  .flex {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .adressInfo {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: self-start;
  }
}

.shopping_list {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 120px;
  padding: 0 5%;
  box-sizing: border-box;
  border-bottom: 1px solid #ddd;
  img {
    width: 80px;
    border: 1px solid #ddd;
    box-shadow: 0px 0px 3px #ddd;
  }
  .showItem {
    width: 70%;
    height: 80px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding-bottom: 3%;
  }
  .showItem > div {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}

.shopping_list:last-child {
  border-bottom: none;
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

.order_bar {
  width: 100%;
  line-height: 50px;
  position: fixed;
  bottom: 0;
  z-index: 100;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  background: #fff;
  span {
    margin-right: 5%;
  }
  p {
    background: $theme-active;
    color: #fff;
    padding: 0 5%;
  }
}
.color-img {
  width: 100%;
  height: 3px;
}
</style>