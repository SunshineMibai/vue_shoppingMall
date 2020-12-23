<template>
  <div class="">
    <m-head :title='title' @headBack='goBack' />
    <m-content :isHead="true" @getMescrollData='getMescrollData'>
      <div slot='all_content' class='address-content'>
        <div class='flex'>
          <p>姓名</p>
          <p>
            <input type="text" placeholder="请输入姓名" v-model="userData.ress_name">
            <i class='iconfont iconnext'></i>
          </p>
        </div>
        <div class='flex'>
          <p>联系电话</p>
          <p>
            <input type="text" placeholder="请输入联系电话" v-model="userData.ress_mobile" maxlength="11">
            <i class='iconfont iconnext'></i>
          </p>
        </div>
        <div class='flex'>
          <p>地址</p>
          <p @click="isAddressPickerShow = true">
            <span>
                {{userData.ress_ressCode | address_1}} {{userData.ress_ressCode | address_2}} {{userData.ress_ressCode | address_3}}
            </span>
            <i class='iconfont iconnext'></i>
          </p>
        </div>
        <div class='flex'>
          <p>详细地址</p>
          <p>
            <input type="text" placeholder="请输入详细地址" v-model="userData.ress_detail">
            <i class='iconfont iconnext'></i>
          </p>
        </div>
        <div class='flex'>
          <p>地址标签</p>
          <p class="address-label">
            <span v-for='(item,index) in addressLabel' :key='index' :class="[item.active?'active':'']" @click='checkLabel(item)'>{{item.text}}</span>
          </p>
        </div>
        <div class='flex'>
          <p>设为默认地址</p>
          <md-switch
            v-model="addressActive"
            @change="handlerSwitch('switch0', addressActive, $event)"
          ></md-switch>
        </div>
      </div>
    </m-content>
    <div class='foter-btn' @click="saveAdress">确定</div>
    <md-picker ref="picker1" v-model="isAddressPickerShow" :data="pickerData1" :line-height='Height' :cols="3" is-cascade large-radius title="选择省市区/县" @confirm="onPickerAddressConfirm()"></md-picker>
  </div>
</template>

<script lang='ts'>
import { Component, Prop, Vue } from "vue-property-decorator";
import { MContent, MHead } from "@/components";
import { Picker,Switch } from "mand-mobile";
import CodeData from '@/assets/codes'
import { State, Mutation } from "vuex-class";
import { getAddressList,setAddressItem } from "@/service/user";
@Component({
  components: {
    MContent,
    MHead,
    Picker,
    Switch
  }
})
export default class AddressDetail extends Vue {
  //   @Prop(String) readonly title!: string | "";
  @State("Common") stateCommon: any;
  title: string = "";
  codes: string = "测试";
  ress_text: string = "";
  userData: any = {
    ress_name:'',
    ress_mobile:'',
    ress_ressCode:'111101110101',
    ress_detail:'',
    ress_userCode:'',
    ress_type:'',
    ress_default:'1'
  }
  isAddressPickerShow: boolean = false
  pickerData1: any = [CodeData.addressList];//地址code
  addressLabel: any = JSON.parse(JSON.stringify(CodeData.addressLabel))
  Height: number = 35
  addressActive = false
  goBack() {
    this.$router.back();
  }
  onPickerAddressConfirm(index: any) {
      const values = this.$refs.picker1.getColumnValues();
      let res = "";
      values.forEach((value: any) => {
        console.log(value)
         value && (res += value.value);
         this.ress_text += value.label
      });
      this.userData.ress_ressCode = res;
   }
   handlerSwitch() {
     console.log(this.addressActive)
   }
   checkLabel(item:object) {
     console.log(item)
     this.addressLabel.forEach((tpl:object) => {
       tpl.active = false
       if(item.key == tpl.key) {
         tpl.active = true
         this.userData.ress_type = tpl.key
       }
     })
     console.log(item,this.addressLabel)
   }
   getData() {
    let req = {
      userCode:this.stateCommon.user_code
    }
    getAddressList(req).then((res:object) => {
      if(res.responseCode == 1000) {
        res.responseData.forEach((item:object)=>{
          if(item.ress_code == this.$route.query.id){
            this.userData = item
            this.addressLabel.forEach((tpl:object) => {
              tpl.active = false
              if(item.ress_type == tpl.key) {
                tpl.active = true
              }
            })
            this.addressActive = item.ress_default == '2'?true:false
            console.log('编辑', this.userData)
          }
        })
      }
    })
  }
  saveAdress(){
    let errText = []
    if(this.userData.ress_name == ''){
      errText.push('请输入姓名')
    } else if(this.userData.ress_mobile == ''){
      errText.push('请输入手机号')
    } else if(this.userData.ress_mobile.length != 11){
      errText.push('手机号位数有误，请检查')
    } else if(this.userData.ress_ressCode == ''){
      errText.push('请选择省市区')
    } else if(this.userData.ress_detail == ''){
      errText.push('请输入详细地址')
    }
    if(errText.length>0) {
      (<any>window).utils.ui.Error(errText[0])
      return 
    }
    this.userData.ress_default = this.addressActive?'2':'1'
    let req = {
      ress_userCode:this.stateCommon.user_code,//用户id
      ress_name:this.userData.ress_name,//收货姓名
      ress_mobile:this.userData.ress_mobile,//收货电话
      ress_ressCode:this.userData.ress_ressCode,//省市区
      ress_detail:this.userData.ress_detail,//详细地址
      ress_type:this.userData.ress_type,//标签 1家 2公司 3学校
      ress_default:this.userData.ress_default,// 2默认 1非默认
      ress_code:this.userData.ress_code || '',
      ress_text:this.userData.ress_detail + this.ress_text
    }
    this.setAddressItem(req)
  }
  getMescrollData() {
    
  }
  setAddressItem(req:any) {
    console.log(this.userData.ress_code)
    setAddressItem(req).then((res:any) => {
      (<any>window).utils.ui.Title(res.responseMsg)
      if(res.responseCode == 1000) {
        setTimeout(()=>{
          this.$router.push(`/AdressList`)
        },3000)
      }
    })
  }
  created(): void {
    this.title =
      this.$route.query.type == "set" ? "修改收货地址" : "新增收货地址";
    this.userData.ress_userCode = this.stateCommon.user_code
    if(this.$route.query.type == "set"){
      this.getData();
    }
  }

  mounted(): void {}

  updated(): void {}

  destroyed(): void {}
}
</script>  

<style lang="scss" scoped>
.address-content p,
.address-content input,
.address-content span {
  font-size: 14px;
}
.address-content .iconfont {
  color: #7d7e80;
}
.address-content input {
  text-align: right;
  font-size: 14px;
}
.address-content>div {
  width:100%;
  padding: 0 5%;
  height:45px;
  border-bottom: 1px solid #f2f2f2;
}
.address-label>span {
  border:1px solid #ccc;
  color:#333;
  display: inline-block;
  height: 30px;
  width: 45px;
  margin-left: 5px;
  border-radius:5px;
  line-height: 30px;
  text-align: center;
}
.active {
  background: $theme-active!important;
  color: #fff!important;
  border: 1px solid $theme-active!important;
}
.foter-btn {
	position: fixed;
	z-index: 100;
	bottom: 0;
	width: 100%;
	height:45px;
	line-height: 45px;
	font-size: 14px;
	background: $theme-active;
	color: #fff;
	text-align: center;
}
</style>
