<template>
  <div class="m-footer">
    <div v-for="item in footerList" :key="item.key" @click="gotoModule(item)">
      <p :class="[item.key==active?item.icon+' active-text': item.icon]"></p>
      <p :class="[item.key==active?'active-text': '']">{{item.title}}</p>
      <p v-if="item.key == '3' && stateCommon.shop_cart_num > 0" class='cart-num'>{{stateCommon.shop_cart_num}}</p>
    </div>
  </div>
</template>

<script lang='ts'>

import { State, Mutation } from 'vuex-class';

import { Component, Prop, Vue } from "vue-property-decorator";
@Component({})
export default class MFooter extends Vue {
  @Prop(String) readonly active!: string | "";

  @State('Common') stateCommon:object

  footerList: Array<T> = [
    {
      key: "1",
      title: "首页",
      icon: "iconfont iconshouye1",
      link: "/home"
    },
    {
      key: "2",
      title: "分类",
      icon: "iconfont iconxiangqing",
      link: "/ProductList"
    },
    {
      key: "3",
      title: "购物车",
      icon: "iconfont icongouwuche1",
      link: "/ShopingCartList"
    },
    {
      key: "4",
      title: "我的",
      active: false,
      icon: "iconfont iconwode1",
      link: "/UserCenter"
    }
  ];
  codes: String = "测试";

  private created(): void {
    // console.log(this.active);
  }

  private mounted(): void {
  }

  private updated(): void {}

  private destroyed(): void {}

  gotoModule(item: object) {
   // 模块跳转
    this.$router.push(item.link)
  }
}
</script>

<style lang="scss"
   scoped>
.m-footer {
  border-top: 1px solid #eaeaea;
  height: 50px;
  padding-top: 5px;
  background: #fff;
  position: fixed;
  z-index: 100%;
  bottom: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  div {
    width: 25%;
    text-align: center;
    position: relative;
    p {
      color: #7d7e80;
    }
    p:first-child {
      font-size: 18px;
    }
    p:nth-child(2) {
      font-size: 13px;
    }
    .cart-num {
      position: absolute;
      top: -5px;
      right: 25%;
      background: $theme-active;
      color: #fff;
      border-radius: 20px;
      line-height: 15px;
      text-align: center;
      font-size: 12px;
      width: 15px;
      height: 15px;
    }
  }
}
</style>