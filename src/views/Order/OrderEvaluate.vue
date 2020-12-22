<template>
  <div>
    <m-head title="评价" @headBack="goToUserCenter" />
    <m-content :isHead="true" @getMescrollData="getOrderList">
      <div slot="all_content" class="content">
        <p class='detail-switch comment-top'>订单编号：{{$route.query.id}}</p>
        <div v-for="(item, index) in productDetail.productList" :key="index" class="comment">
          <div class="comment_top">
            <img :src="item.shop_proImg" />
            <div>
              <span>{{item.shop_proTitle}}</span>
              <span>￥{{item.shop_proPrice}}</span>
              <span>x{{item.shop_proCount}}</span>
            </div>
          </div>
          <div class='detail-switch'>
            <p class=''>评价详情</p>
            <p :class="[item.show?'iconfont iconfanhui item-open':'iconfont iconfanhui item-close']" @click='toggoItem(index)'></p>
          </div>
          <!-- 显示评分{{item.show}} -->
          <div class="comment_bot" v-show='item.show'>
                <div class="m-comment" v-for='(cts,ctsIndex) in productDetail.productList[index].commentList' :key='ctsIndex'>
                  <img
                    v-for="(citem,cindex) in (1,5)"
                    :key="cindex"
                    :src="cts.value>=cindex+1?selected:select"
                    @click="selectClick(cts,cindex+1,item,cts)"
                  />
                  <span>{{cts.title}}{{cts.value}}分</span>
                </div>
            <textarea v-model="item.content" rows="4" maxlength="150" placeholder="请填写评价内容"></textarea>
          </div>
        </div>
        <div class='comment-btm'>
          <p>总价：￥{{productDetail.orderTotalPrice}}</p>
          <p>下单时间：{{productDetail.orderDate}}</p>
          <p>收货地址：{{productDetail.orderAddress}}</p>
          <p class="save bot-submit" @click="saveComment()">提交订单评价</p>
        </div>
        <m-dialog :title='dialogContent' @getSendDialog='getSendDialog' v-if='dialogActive' />
      </div>
    </m-content>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { MHead, MContent, MComment,MDialog } from "@/components";
import { State, Mutation } from "vuex-class";
import { getOrderList,saveOrder } from "@/service/product";
@Component({
  components: {
    MHead,
    MContent,
    MComment,
    MDialog
  }
})
export default class OrderEvaluate extends Vue {
  @State("Common") stateCommon: any;
  productDetail: object = {};
  content: String = "";
  select: any = require("@/assets/images/user/star.png");
  selected: any = require("@/assets/images/user/star_active.png");
  commentList: object = [
    { index: 1, value: 0,title:'商品评分' },
    { index: 2, value: 0,title:'快递包装' },
    { index: 3, value: 0,title:'服务态度' }
  ];
  dialogActive: boolean = false
  dialogContent: string = ''
  private created(): void {}

  private mounted(): void {
    this.getOrderList();
  }

  goToUserCenter() {
    this.$router.push("/UserCenter");
  }
  getOrderList() {
    let req = {
      shop_userCode: this.stateCommon.user_code,
      user_shopType: "complete"
    };
    getOrderList(req).then((res: object) => {
      if (res.responseCode == 1000) {
        res.responseData.forEach((item: object) => {
          if (item.orderCode == this.$route.query.id) {
            this.productDetail = item;
            console.log("productDetail", this.productDetail);
            this.productDetail.productList.forEach((tpl: object) => {
              tpl.commentList = this.commentList
              tpl.show = false;
              tpl.content = '';
            });
          }
        });
      }
    });
  }
  selectClick(obj:object,num:number,parentItem:object,childItem:object) {//神奇函数
    let arr = JSON.parse(JSON.stringify(this.productDetail.productList))
    arr.forEach((item:object) => {
      if(item.shop_id == parentItem.shop_id) {
        item.commentList.forEach((tpl:object,index:number)=>{
          if(tpl.title == childItem.title) {
            tpl.value = num
          }
        })
      }
    })
    this.productDetail.productList = arr
  }
  saveComment(code: any) {
    let stopArr = []
    this.productDetail.productList.forEach((item: object) => {
      item.commentList.forEach((tpl: object) => {
        if(tpl.value == 0) {
          stopArr.push('您有商品：'+tpl.title+'为0星，是否提交?')
        }
      });
      if(item.content == '') {
        stopArr.push('您有商品评价信息为空，是否提交?')
      }
    })
    if(stopArr.length >0) {
      this.dialogContent = stopArr[0]
      this.dialogActive = true
    } else {
      //提交订单
      this.saveOrder(this.productDetail.productList)
    }
  }
  getSendDialog(type:boolean) {
    this.dialogActive = false
    if(type){//点击弹框确定
      console.log('点击了确定')
      this.saveOrder(this.productDetail.productList)
    }
  }
  saveOrder(list:object) {
    let arr = []
    let newArr = JSON.parse(JSON.stringify(list))
    console.log(list);
    let starList = []
    newArr.forEach((item:object) => {
      //拼装评分数据
      let star_obj = {
        order_id: item.shop_orderCode,
        user_id: item.shop_userCode,
        shop_proId:item.shop_proId,
        content:item.content,
        evaluate_date:(<any>window).utils.cache.getDate('date')
      }
      item.commentList.forEach((tpl:object) => {
        if(tpl.title == '商品评分'){
          star_obj.pro_star = tpl.value
        }
        if(tpl.title == '快递包装'){
          star_obj.serve_star = tpl.value
        }
        if(tpl.title == '服务态度'){
          star_obj.express_star = tpl.value
        }
      })
      starList.push(star_obj);
      item.shop_date = (<any>window).utils.cache.getDate('date')
    })
    let params = {
      order_id:this.productDetail.orderCode,
      user_id:this.productDetail.userCode,
      order_list:newArr,
      order_address:this.productDetail.orderAddress,
      star_list:starList
    }
    console.log(params)
    saveOrder(params).then((res: object) => {
      (<any>window).utils.ui.Title(res.responseMsg, 1000)
      if(res.responseCode == 1000) {
        this.$router.push('/UserCenter')
      }
    })
  }
  toggoItem(num: number) {
    console.log(1);
    this.productDetail.productList.forEach((tpl: any, index: any) => {
      if (index == num) {
        tpl.show = !tpl.show;
      }
      this.$set(this.productDetail.productList, index, tpl);
    });
  }
}
</script>

<style lang="scss" scoped>
.comment-top {
  font-size: 15px;
}
.content {
  width: 100%;
  padding: 0 5%;
  box-sizing: border-box;
  .comment {
    width: 100%;
    box-shadow: 0 0 5px #ddd;
    padding: 5%;
    margin-bottom: 10px;
    border-radius: 5px;
    .comment_top {
      display: flex;
      align-items: center;
      img {
        width: 20%;
        box-shadow: 0 0 1px #ddd;
      }
      div {
        width: 100%;
        height: 100%;
        padding: 2% 0 2% 5%;
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        span {
          font-size: 15px;
        }
      }
    }
    .comment_bot {
      width: 100%;
      textarea {
        width: 95%;
        border: 1px solid #ddd;
        margin: 4% 1% 2%;
      }
      textarea {
        border-radius: 5px;
        padding: 5px;
        font-size: 14px;
        outline: none;
        resize: none;
      }
      textarea:focus {
        box-shadow: 0 0 5px #ddd;
        // outline: #ddd solid;
      }
    }
  }
  .bot-submit {
    font-size: 14px;
    width: 120px;
    height: 35px;
    text-align: center;
    line-height: 35px;
    background: $theme-active;
    color: #fff;
    border-radius: 3px;
    margin: 10px 0 20px 65%;
  }
}
.detail-switch {
  border-bottom: 1px solid #ccc;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 40px;
  margin-bottom: 10px;
  p:first-child {
    font-size: 14px;
  }
  p:last-child {
    font-size: 24px;
    color: #333;
    width: 30px;
    transition: all 0.1s linear;
  }
}
.item-open {
  transform: rotate(90deg);
}
.item-close {
  transform: rotate(270deg);
}
.comment-btm {
  p {
    font-size: 14px;
    text-align: right;
  }
}
.m-comment {
  width: 100%;
  display: flex;
  align-items: center;
  // justify-content: flex-end;
  margin-bottom: 10px;
  img {
    width: 22px;
  }
  span {
    margin-left: 5%;
    font-size: 14px;
  }
}
</style>
