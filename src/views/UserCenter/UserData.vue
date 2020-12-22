<template>
   <div class="user-data">
      <m-head title='个人资料' @headBack='goToUserCenter' />
      <m-content :isHead="true" @getMescrollData='getMescrollData'>
         <div slot='all_content' class='user-center-div'>
            <div class='flex set-avatar' id="setAvatar">
               <p>头像</p>
               <p>
                  <img :src="tempAvatar||userImg" alt="">
                  <i class='iconfont iconnext'></i>
               </p>
               <div class="cropper">
                  <Cropper :imgStyle="imgStyle" @callback="callback" />
               </div>
            </div>
            <div class='flex'>
               <p>个人博客</p>
               <p @click='goToBlog'>
                  <span>米白小站</span>
                  <i class='iconfont iconnext'></i>
               </p>
            </div>
            <div class='flex'>
               <p>昵称</p>
               <p>
                  <input type="text" placeholder="请输入昵称" v-model='userData.name'>
                  <i class='iconfont iconnext'></i>
               </p>
            </div>
            <div class='flex'>
               <p>性别</p>
               <p @click="isSexPickerShow = true">
                  <span>{{userData.sex | sex}}</span>
                  <i class='iconfont iconnext'></i>
               </p>
            </div>
            <div class='flex'>
               <p>地址</p>
               <p @click="isAddressPickerShow = true">
                  <span>
                     {{userData.addressCode | address_1}} {{userData.addressCode | address_2}} {{userData.addressCode | address_3}}
                  </span>
                  <i class='iconfont iconnext'></i>
               </p>
            </div>
            <div class='flex'>
               <p>详细地址</p>
               <p>
                  <input type="text" placeholder="精确到门牌号" v-model='userData.addressDetail'>
                  <i class='iconfont iconnext'></i>
               </p>
            </div>
            <button class='user-submit' @click='setUserData'>保存</button>
         </div>
      </m-content>
      <md-picker ref="picker0" v-model="isSexPickerShow" :line-height='Height' :data="sexList" @confirm="onPickerSexConfirm()" title="选择性别"></md-picker>
      <md-picker ref="picker1" v-model="isAddressPickerShow" :data="pickerData1" :line-height='Height' :cols="3" is-cascade large-radius title="选择省市区/县" @confirm="onPickerAddressConfirm()"></md-picker>
      <m-dialog title='是否跳转到米白小站?' @getSendDialog='getSendDialog' v-if='dialogActive' />
   </div>
</template>

<script lang='ts'>
import { Component, Prop, Vue } from "vue-property-decorator";
import { MHead, MContent, MDialog } from "@/components";
import { Picker, FieldItem } from "mand-mobile";
import Cropper from './components/corpper'
import CodeData from '@/assets/codes'
import { State } from 'vuex-class';
import { setUserData, getUserData } from '@/service/user'
@Component({
   components: {
      MHead,
      MContent,
      Picker,
      FieldItem,
      MDialog,
      Cropper
   }
})
export default class UserData extends Vue {
   userImg: string = require("@/assets/images/user/user_title.jpg");
   codes: string = "测试";
   sexList: object = [[{ value: 1, text: "男" }, { value: 2, text: "女" }]];
   userData: object = {
      name: "",
      sex: "1",
      addressCode: "111101110101",
      addressDetail: "",
      img: ""
   };
   Height: number = 35
   dialogActive: boolean = false//modal init
   isSexPickerShow: boolean = false;//性别框
   isAddressPickerShow: boolean = false;//地址框
   pickerData1: object = [CodeData.addressList];//地址code
   datapick0: string = "";
   imgStyle: object = {
      width: "55px",
      height: "55px",
      "border-radius": "50%",
      display: "none"
   }
   tempAvatar: string = ''//裁剪的临时图片

   @State('Common') stateCommon: object


   private created(): void { }

   private mounted(): void {
      this.getUserData()
   }

   private updated(): void { }

   private destroyed(): void { }
   callback(img: object) {
      console.log(img)
      this.tempAvatar = img;
      this.userData.img = img
   }
   goToUserCenter() {
      this.$router.push("/UserCenter");
   }
   onPickerSexConfirm(index: any) {
      const values = this.$refs.picker0.getColumnValues();
      let res = "";
      values.forEach((value: any) => {
         value && (res += value.value);
      });
      this.userData.sex = res;
   }
   onPickerAddressConfirm(index: any) {
      const values = this.$refs.picker1.getColumnValues();
      let res = "";
      values.forEach((value: any) => {
         value && (res += value.value);
      });
      this.userData.addressCode = res;
   }
   getUserData() {
      let req = {
         user_code: this.stateCommon.user_code,
         // axiosParams: {
         //    resquestLoadding: true,
         //    resquestLoaddingText: "请稍后..."
         // }
      }
      getUserData(req).then((res: object) => {
         if (res.responseCode == 1000) {
            (<any>window).utils.ui.Title("获取用户数据成功!", 1000)
            this.userData.name = res.user_data.user_title
            this.userData.sex = res.user_data.user_sex
            this.userData.addressCode = res.user_data.user_addressCode
            this.userData.name = res.user_data.user_title
            this.userData.addressDetail = res.user_data.user_addressDetail
            this.userData.img = res.user_data.user_img
            this.userImg = res.user_data.user_img
         }
      })
   }
   setUserData() {
      let testNames = (<any>window).utils.reg.TestNames(this.userData.name)
      let testDetail = (<any>window).utils.reg.Request(this.userData.addressDetail, '详细地址', 5)
      let resList = []
      // if (this.tempAvatar == '') {
      //    resList.push('用户头像还未上传!')
      // }
      if (testNames) resList.push(testNames)
      if (testDetail) resList.push(testDetail)
      if (resList.length > 0 && resList[0] != '') {
         (<any>window).utils.ui.Error(resList[0])
      } else {
         let req = {
            user_sex: this.userData.sex,
            user_code: this.stateCommon.user_code,
            user_title: this.userData.name,
            user_addressCode: this.userData.addressCode,
            user_addressDetail: this.userData.addressDetail,
            user_img: this.userData.img,
            axiosParams: {
               resquestLoadding: true,
               resquestLoaddingText: "请稍后..."
            }
         }
         console.log('请求参数为:', req)
         setUserData(req).then((res: object) => {
            console.log('请求参数为:', res)
            if (res.responseCode == 1000) {
               (<any>window).utils.ui.Title("修改用户数据成功!", 1000)
               setTimeout(() => {
                  this.$router.push('/UserCenter')
               }, 1000)
            }
         })
      }
   }
   goToBlog() {
      this.dialogActive = true
   }
   getSendDialog(active: boolean) {
      this.dialogActive = false
      if (active) location.href = 'http://www.jiaoguoliang.com'
   }
   getMescrollData() {
      this.getUserData()
   }
}
</script>  

<style lang="scss" scoped>
.user-data {
   i {
      padding-left: 5px;
      font-size: 14px;
      color: #999;
   }
}

.user-center-div>div {
   width: 100%;
   padding: 10px 20px;
   min-height: 45px;
   border-bottom: 1px solid #ebedf0;
   p {
      font-size: 14px;
      img {
         width: 60px;
         height: 60px;
         border-radius: 50%;
      }
   }
   input {
      text-align: right;
      font-size: 14px;
   }
}

::v-deep .md-popup-box {
   border-radius: 20px 20px 0 0!important;
}

.user-submit {
   margin: 50px auto;
   display: block;
   width: 50%;
   height: 40px;
   background: $theme-active;
   color: #fff;
   left: 25%;
}

.set-avatar {
   height: 80px;
   line-height: 80px;
   display: flex;
   padding: 0 15px;
   position: relative;
   span {
      flex: 0 0 75%;
   }
   div {
      flex: 1;
      img {
         width: 60px;
         height: 60px;
         border-radius: 50%;
         margin-right: 5px;
      }
   }
   p:nth-child(2) {
      position: absolute;
      right: 6%;
      top: 2%;
      height: 60px;
      display: flex;
      align-items: center;
   }
}

.cropper {
   height: 100%;
}
</style>
