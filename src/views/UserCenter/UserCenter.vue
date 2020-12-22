<template>
   <div>
      <m-content :isHead="false" @getMescrollData='getMescrollData'>
         <div slot='all_content'>
            <div class='user-top'>
               <!--<img :src="userData.user_img || userImg" alt="">-->
               <m-img v-model='userImgList' />
               <p @click='goToLogin' v-if='!isLogin'>登录/注册</p>
               <div v-else>
                  <p>欢迎您：
                     <b>{{userData.user_title}}</b>
                  </p>
                  <p @click='outputUser'>退出登录</p>
               </div>
            </div>
            <div class='order-list flex'>
               <div v-for='item in orderList' :key='item.key' @click='goToOrderList(item)'>
                  <p :class='item.icon'></p>
                  <p>{{item.text}}</p>
                  <p v-if='item.num>0'>{{item.num}}</p>
               </div>
            </div>
            <div class='list-item flex' v-for='item in moduleList' :key='item.key' @click='goToModule(item)'>
               <div class='flex'>
                  <p :class='item.icon'></p>
                  <p>{{item.text}}</p>
               </div>
               <p class='iconfont iconnext'></p>
            </div>
         </div>
      </m-content>
      <m-footer active='4' />
      <m-dialog :title='dialogTitle' @getSendDialog='getSendDialog' v-if='dialogActive' :type='dialogType' />
   </div>
</template>

<script lang='ts'>
import { Component, Prop, Vue } from "vue-property-decorator";
import { MContent, MFooter, MDialog, MImg } from "@/components";
import { State, Mutation, Action } from "vuex-class";
import { getUserData } from "@/service/user.ts";
@Component({
  components: {
    MContent,
    MFooter,
    MDialog,
    MImg
  }
})
export default class UserCenter extends Vue {
  //   @Prop(String) readonly title!: string | "";
  userImg: any = require("@/assets/images/user/user_title.jpg");
  userImgList: object = [];
  dialogActive: boolean = false;
  dialogTitle: string = "";
  dialogType: string = "";
  orderList: object = [
    // { key: "1", icon: "iconfont icondaifukuan", text: "待付款" },
    {
      key: "2",
      icon: "iconfont icondaifahuo",
      text: "待发货",
      type: "deliver"
    },
    {
      key: "3",
      icon: "iconfont iconweibiaoti20101",
      text: "待收货",
      type: "receiving"
    },
    {
      key: "5",
      icon: "iconfont iconwancheng",
      text: "待评价",
      type: "complete"
    },
    {
      key: "4",
      icon: "iconfont iconiconfontevaluate",
      text: "已评价",
      type: "evaluate"
    }
  ];

  moduleList: object = [
    {
      key: "1",
      icon: "iconfont icon6",
      text: "全部订单",
      link: "/OrderList?type=whole"
    },
    {
      key: "2",
      icon: "iconfont icongerenxinxi",
      text: "个人资料",
      link: "/UserData"
    },
    { 
      key: "3", 
      icon: "iconfont icondizhi", 
      text: "收货地址", 
      link: "/AdressList" 
    },
    {
      key: "4",
      icon: "iconfont iconbangzhushuoming",
      text: "声明信息",
      link: "/UserStatement"
    },
    { key: "5", icon: "iconfont iconweibiaoti--", text: "友情链接", link: "" }
  ];
  userData: any = {};
  isLogin: boolean = false;

  @State("Common") stateCommon: any;
  @Mutation("SET_USERCODE") SET_USERCODE: any;
  @Action("ACT_SETSHOPCARTNUM") ACT_SETSHOPCARTNUM: any;

  private created(): void {}

  private mounted(): void {
    let user_code = this.stateCommon.user_code;
    if (user_code) {
      //获取用户信息详情
      this.getUserData();
    }
  }

  private updated(): void {}

  private destroyed(): void {}

  getMescrollData() {
    this.getUserData();
  }
  goToLogin() {
    this.$router.push("/UserLogin");
  }
  goToOrderList(item: object) {
    // if (item.key != "4") {
      this.$router.push(`/OrderList?type=${item.type}`);
    // } else {
      // (<any>window).utils.ui.Error("暂未开放！");
    // }
  }
  goToModule(item: object) {
    //  (<any>window).utils.ui.Confirm('提示','暂未开始')
    if (item.key != "5") {
      this.$router.push(item.link);
    } else if(item.key == "5"){
      this.dialogTitle = "是否跳转到米白小站?";
      this.dialogType = "location";
      this.dialogActive = true;
    }
  }
  getSendDialog(active: boolean, type: string) {
    this.dialogActive = false;
    if (active && type == "location") {
      location.href = "http://www.jiaoguoliang.com";
    } else if (active && type == "output") {
      this.SET_USERCODE("");
      this.$router.push("/UserLogin");
    }
  }
  getUserData() {
    this.isLogin = false;
    let req = {
      user_code: this.stateCommon.user_code
    };
    getUserData(req).then((res: object) => {
      if (res.responseCode == 1000) {
        // (<any>window).utils.ui.Title("获取用户数据成功!", 1000)
        this.userData = res.user_data;
        this.userImgList = [res.user_data.user_img];
        this.ACT_SETSHOPCARTNUM(res.shop_cart_num)
        this.orderList.forEach((item:object) => {
          if(item.type == 'deliver') {
            item.num = res.deliver_num
          }
          if(item.type == 'receiving') {
            item.num = res.receiving_num
          }
          if(item.type == 'complete') {
            item.num = res.complete_num
          }
          if(item.type == 'evaluate') {
            item.num = res.evaluate_num
          }
        })
        this.$nextTick(() => {
          this.isLogin = true;
        });
      } else {
        this.userImgList = [this.userImg];
      }
    });
  }
  outputUser() {
    this.dialogTitle = "是否要退出登录?";
    this.dialogType = "output";
    this.dialogActive = true;
  }
}
</script>  

<style lang="scss" scoped>
.user-top {
  background: #e30c7b;
  height: 180px;
  padding: 10%;
  img {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    display: block;
    margin: 0 auto;
  }
  p {
    color: #fff;
    text-align: center;
    font-size: 14px;
    margin-top: 5px;
  }
}

.order-list {
  margin-top: 10px;
  border-bottom: 1px solid #eaeaea;
  padding-bottom: 10px;
  div {
    width: 25%;
    position: relative;
  }
  p:first-child {
    font-size: 24px;
    text-align: center;
    color: $icon-color;
  }
  p:nth-child(2) {
    font-size: 14px;
    margin-top: 2px;
    text-align: center;
  }
  p:nth-child(3) {
    font-size: 10px;
    background: $theme-active;
    color: #fff;
    width:20px;
    height:20px;
    border-radius: 50%;
    text-align: center;
    line-height: 20px;
    position: absolute;
    right:15px;
    top:0px;
  }
}

.list-item {
  width: 100%;
  padding: 0 5%;
  height: 45px;
  border-bottom: 1px solid #ebedf0;
  div {
    p {
      color: #333;
    }
    p:first-child {
      font-size: 15px;
    }
    p:last-child {
      margin-left: 2px;
      font-size: 14px;
    }
  }
  p {
    font-size: 14px;
    color: #999;
  }
}

::v-deep .md-example-child-image-reader {
  min-height: 80px;
  div > ul {
    display: flex;
    justify-content: center;
    li {
      margin: 0;
      width: 70px;
      height: 70px;
    }
    .img {
      border-radius: 50%;
    }
  }
}
</style>
