<template>
  <div class="user-login" ref='user_login'>
    <div class='user-form'>
      <div class='login-title'>Vue商城</div>
      <p>
        <i class='iconfont iconweibiaoti5'></i>
        <md-input-item
          placeholder="请输入账户"
          type='text'
          is-highlight
          v-model='loginName'
        ></md-input-item>
      </p>
      <p>
        <i class='iconfont iconmima'></i>
        <md-input-item
          placeholder="密码"
          type='password'
          is-highlight
          v-model='loginPwd'
        ></md-input-item>
      </p>
      <p class='reg-btn'>
         <span>注册</span>
      </p>
    <div class='login-btn'>
      <button @click='login'>登录</button>
    </div>
    <m-verify ref='m_verify' @verifySend='verifySend' v-if='popupVisible' /> 
    </div>
  </div>
</template>

<script lang='ts'>
import { Component, Prop, Vue } from "vue-property-decorator";

import { State, Mutation } from 'vuex-class';

import { InputItem } from "mand-mobile";
import { MVerify } from '@/components'
import { userLogin } from '@/service/user'
@Component({
  components: {
    InputItem,
    MVerify
  }
})
export default class UserLogin extends Vue {
  //   @Prop(String) readonly title!: string | "";
  bgImages: any = require("@/assets/images/common/login_bg.jpg");
  codes: string = "测试";
  popupVisible: boolean = false
  loginName: string = ''
  loginPwd: string = ''


  @State('Common') stateCommon:any
  @Mutation('SET_USERCODE') SET_USERCODE:any
  
  private created(): void {}

  private mounted(): void {
    this.$nextTick(() => {
      this.$refs.user_login.style.width =
        (<any>window).utils.globalConfig.screenWidth + "px";
      this.$refs.user_login.style.height =
        (<any>window).utils.globalConfig.screenHeight + "px";
    });
  }

  private updated(): void {}

  private destroyed(): void {}

  handleClick() {
    this.popupVisible = true;
    console.log(this.popupVisible)
  }
  verifySend() {
    let req = {
       userName:this.loginName,
       userPwd:this.loginPwd,
       axiosParams: {
          resquestLoadding: true,
          resquestLoaddingText: "请稍后..."
       }
    }
    userLogin(req).then((res:object)=> {
       this.popupVisible = false;
       if(res.responseCode == 0) {
          this.SET_USERCODE(res.user_code)
          this.$router.push('/UserCenter')
       } else {
          (<any>window).utils.ui.Title(res.responseMsg,1000)
       }
    })
  }
  login() {
    let testName = (<any>window).utils.reg.TestName(this.loginName)
    let testPwd = (<any>window).utils.reg.TestPwd(this.loginPwd)
    if(testName && testPwd) {
       this.popupVisible = true;
    } else {
       (<any>window).utils.ui.Title((!testName?'用户名':'密码')+'不正确！',1000)
    }
  }
}
</script>  

<style lang="scss" scoped>
.login-title {
   color: $theme-blue;
   text-align: center;
   margin: 10px 0;
}
.user-login {
  background: url("./../../assets/images/common/login_bg.jpg") no-repeat;
  background-size: 100% 100%;
  width: 100%!important;
  display: flex;
  justify-content: center;
  align-items: center;
}

.user-form {
  width: 80%;
  padding: 10px 10%;
  left: 10%;
  bottom: 0;
  background: #fff;
  border-radius: 5px;
  p {
    display: flex;
    align-items: center;
    justify-content: center;
    border-bottom: 1px solid #e2e4ea;
    i {
      color: #7d7e80;
    }
  }
}
::v-deep .md-field-item-content {
  padding: 0 10px;
}
::v-deep .md-field-item,
::v-deep .md-field-item-content {
  height: 45px;
  min-height: 45px;
}
::v-deep .md-field-item-title {
  width: 40px !important;
  color: #333;
  font-size: 14px;
  margin-right: 0;
}

::v-deep .md-input-item-input {
  width: 80%;
  font-size: 16px;
  color: #333;
  height: 45px;
  padding-left: 5px;
}
::v-deep .is-focus .md-field-item-content:before,
::v-deep .md-field-item-content:before,
::v-deep .is-active .md-field-item-content:before {
  // width: 0!important;
  border: none!important;
}

.login-btn {
    text-align: center;
    margin: 20px 0 10px 0;
    button {
    background: $theme-blue;
    color: #fff;
    width: 120px;
    height: 35px;
  }
}
.reg-btn {
   width: 100%!important;
   font-size: 14px;
   margin: 10px 0;
   color: #7d7e80;
   justify-content: flex-end!important;
   border: none!important;
   span {
      padding:0 5px;
      border-bottom: 1px solid #e2e4ea;
   }
}
</style>
