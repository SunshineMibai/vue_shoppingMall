<template>
   <div>
      <m-head title='购物车' @headBack='goToHome' >
        <div slot='right'>
          <button class='set-shop-cart' @click='checkSetActive(setActive)'>{{setActive?'完成':'编辑'}}</button>
        </div>
      </m-head>
      <m-content :isHead="true" @getMescrollData='getMescrollData'>
         <div slot='all_content' class='shop-content'>
            <div class="shopping_list" v-for="item in list" :key='item.shop_id' @click="checkItem(item)">
               <div class='left-check-img'>
                  <img  v-if='setActive' :src="item.checked?checkedImg:checkImg" alt=""/>
               </div>
               <div class='left-prod-img'>
                  <img :src="item.shop_proImg" alt="" />
               </div>
               <div>
                  <p class="top">{{item.shop_proTitle}}</p>
                  <div class="bottom">
                     <p class="bot_left">¥ {{item.shop_proPrice}}</p>
                     <div class="bot_right">
                        <p @click.stop="reduceCommodity(item)">-</p>
                        <span>{{item.shop_proCount}}</span>
                        <p @click.stop="addCommodity(item)">+</p>
                     </div>
                  </div>
               </div>
            </div>
            <div class="total"  v-if='setActive'>
               <div style="width:50%;">
                  <label @click="checkAll">
                     <img :src="checkedAll?checkedImg:checkImg" alt=""   />
                     <span>全选</span>
                  </label>
                  <div>
                     <span>合计：</span>
                     <span class='order-total' v-if='totalAll'>¥{{totalAll}}</span>
                  </div>
               </div>
               <p @click='addOrderList'>去结算</p>
            </div>
         </div>
      </m-content>
      <m-footer active='3' />
   </div>
</template>

<script lang='ts'>
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { MContent, MFooter, MHead,MImg } from "@/components";
import { State, Mutation } from "vuex-class";
import {
  getShoppingCart,
  delShoppingCart,
  addOrderList
} from "@/service/product";
@Component({
  components: {
    MContent,
    MFooter,
    MHead,
    MImg
  }
})
export default class ShopingCartList extends Vue {
  @Prop() readonly value!: object | {};
  checkImg: string = require("@/assets/images/shoppingCart/check.jpg");
  checkedImg: string = require("@/assets/images/shoppingCart/checked.jpg");
  list: object = [];
  checkedAll: boolean = false;
  totalAll: string = "0.00";
  setActive: boolean = false;
  @State("Common") stateCommon: any;
  @Mutation("SET_SELECTEDLIST") SET_SELECTEDLIST: any;
  getData() {
    let req = {
      shop_userCode: this.stateCommon.user_code
    };
    getShoppingCart(req).then((res: object) => {
      this.list = res.responseData;
      this.list.forEach((item: object) => {
        item.checked = false;
      });
    });
  }
  addCommodity(item: object) {
    item.shop_proCount = Number(item.shop_proCount) + 1;
    this.getTotal();
  }
  reduceCommodity(item: object) {
    if (Number(item.shop_proCount) > 1) {
      item.shop_proCount = Number(item.shop_proCount) - 1;
      this.getTotal();
    }
  }
  checkSetActive(active:boolean) {
    this.setActive = !active;
    if(!this.setActive) {
      this.list.forEach((item:object) => {
        item.checked = false
      })
      this.checkedAll = false
      this.totalAll = ''
    }
  }
  goToHome() {
    this.$router.push("/Home");
  }
  addOrderList() {
    let newList = []
    this.list.forEach((item:object)=>{
		if(item.checked){
			newList.push(item)
		}
	})
    if(newList.length>0){
    	this.SET_SELECTEDLIST(newList)
    	this.$router.push("/ShoppingOrder")
    }else{
    	console.log('请选择商品后继续')
    }
  }
  delOrderItem() {
    //临时开放，删除购物车内商品
    let delList: object = [];
    if (delList.length == 0) {
      (<any>window).utils.ui.Error("请选择要删除的商品!", 1000);
    }
    this.list.forEach((item: object) => {
      if (item.checked) {
        delList.push(item.shop_proId);
      }
    });
    console.log("商品数据->order_list", delList);
    console.log("用户id->order_userCode", this.stateCommon.user_code);
    let req = {
      shop_list: delList,
      shop_userCode: this.stateCommon.user_code
    };
    delShoppingCart(req).then((res: object) => {});
  }
  checkItem(obj: object) {
    let isAllChecked = true;
    let checkedNum = 0
    this.list.forEach((item: object,index:number) => {
      if (item.shop_id == obj.shop_id) {
         item.checked = !obj.checked
        isAllChecked = false;
      }
      this.$set(this.list,index,item)
      if(item.checked) {
         checkedNum++
      }
    });
    if (checkedNum == this.list.length) {
      this.checkedAll = true;
    } else {
      this.checkedAll = false;
    }
    this.getTotal();
  }
  checkAll() {
    this.checkedAll = !this.checkedAll;
    if (this.checkedAll) {
      this.list.forEach((item: object) => {
        item.checked = true;
      });
    } else {
      this.list.forEach((item: object) => {
        item.checked = false;
      });
    }
    this.getTotal();
  }
  getTotal() {
    let total = 0;
    this.list.forEach((item: object) => {
      if (item.checked) {
        total += item.shop_proPrice * item.shop_proCount;
      }
    });
    this.totalAll = total.toFixed(2);
  }
  getMescrollData() {
    this.getData();
  }
  private created(): void {
    this.getData();
  }
  private mounted(): void {}

  private updated(): void {}

  private destroyed(): void {}
}
</script>

<style lang="scss" scoped>
/*::v-deep */
.shop-content {
  margin-top: 10px;
  margin-bottom: 100px;
  p,
  span {
    font-size: 14px;
  }
  .left-check-img > img,
  .total img {
    width: 20px;
    height: 20px;
  }
  .total > div > label {
    display: flex;
    align-items: center;
  }
  .left-prod-img > img {
    width: 85px;
    height: 85px;
    border: 1px solid #f2f2f2;
    box-shadow: 0px 0px 0.8vw #ddd;
  }
}
input {
  margin: 0;
  width: 15px;
  height: 15px;
}

.shopping_list {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 90%;
  margin: 0 5%;
  margin-bottom: 10px;
  box-sizing: border-box;
  border-bottom: 1px solid #ccc;
  > div {
    height: 100px;
  }
}

.shopping_list > div:nth-child(1) {
  width: 10%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.shopping_list > div:nth-child(2) {
  width: 25%;
}

.shopping_list > div:nth-child(3) {
  width: 65%;
  display: flex;
  flex-direction: column;
  align-items: normal;
  padding: 0 3%;
  .top {
    // color: $theme-active;
    padding-bottom: 9%;
    font-size: 14px;
    // text-align: right;
  }
  .bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .bot_left {
      color: $theme-active;
    }
    .bot_right {
      display: flex;
      justify-content: space-between;
      align-items: center;
      p {
        width: 25px;
        height: 25px;
        background: #747474;
        color: #fff;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      p:active {
        opacity: 0.5;
      }
      span {
        font-size: 16px;
        min-width: 25px;
        text-align: center;
        font-weight: bold;
      }
    }
  }
}

.total {
  position: fixed;
  bottom: 50px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 3% 5%;
  background: #fff;
  box-sizing: border-box;
  div {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  p {
    padding: 1% 5%;
    background: $theme-active;
    border-radius: 5px;
    color: #fff;
  }
}

.total > div:first-child {
  display: flex;
  align-items: center;
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
.set-shop-cart {
  background: $theme-active;
  color: #fff;
  font-size: 14px;
  height: 30px;
  border-radius: 20px;
  width: 60px;
}
.order-total {
  color: $theme-active;
}
</style>