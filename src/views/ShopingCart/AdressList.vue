<template>
	<div>
		<m-head title='我的收货地址' @headBack='goBack' />
		<m-content :isHead="true" @getMescrollData='getMescrollData'>
			<div slot='all_content' class='address-content'>
				<div class="adress" v-for="(item,index) in addressList" :key='index'>
					<div style="width:85%;">
						<p>
              <span>{{item.ress_name}}</span>
						  <span>{{item.ress_mobile}}</span>
            </p>
						<p>
              <span class='address-active' v-if="item.ress_default == '2'">默认</span>
              <span class="address-type">{{item.ress_type | addressType}}</span>
              {{item.ress_ressCode | address_1}}
              {{item.ress_ressCode | address_2}}
              {{item.ress_ressCode | address_3}}
              {{item.ress_detail}}
            </p>
					</div>
					<div style="width:15%;">
            <p class='set-address-btn' @click="goToAddressDetail('set',item.ress_code)">
              <span>|</span>
              <span>编辑</span>
            </p>
            <p class='set-address-btn' style='margin-top:10px;' @click='delAddressItem(index,item)'>
              <span>|</span>
              <span>删除</span>
            </p>
          </div>
				</div>
        <m-empty title='收货地址为空' v-if='addressList.length==0'/>
			</div>
		</m-content>
    <div class='foter-btn' @click="goToAddressDetail('add')">新增收货地址</div>
	</div>
</template>

<script lang='ts'>
	import { Component, Prop, Vue, Watch } from "vue-property-decorator";
	import { MContent, MHead,MEmpty } from "@/components";
  import { State, Mutation } from "vuex-class";
  import { getAddressList,delAddressItem } from "@/service/user";
	@Component({
		components: {
			MContent,
      MHead,
      MEmpty
		}
	})

	export default class ShopingOrder extends Vue {
    @Prop(Object) readonly value!: object | {};
    @State("Common") stateCommon: any;
		addressList: object = [];
		getData() {
      let req = {
        userCode:this.stateCommon.user_code
      }
			getAddressList(req).then((res:object) => {
        if(res.responseCode == 1000) {
          this.addressList = res.responseData
        }
      })
		}
		getMescrollData() {
			this.getData();
    }
    goBack() {
      this.$router.push('/UserCenter')
    }
    goToAddressDetail(type:string,key = 0) {
      this.$router.push(`/AddressDetail?type=${type}&id=${key}`)
    }
    delAddressItem(index:number,item:object) {
      console.log(index,item)
      let req = {
        ress_userCode:item.ress_userCode,
        ress_code:item.ress_code
      }
      delAddressItem(req).then((res:object)=> {
        (<any>window).utils.ui.Title(res.responseMsg)
        if(res.responseCode == 1000) {
          this.addressList.splice(index,1)
        }
      })
    }
		created(): void {
			this.getData();
		}
	}
</script>

<style lang="scss" scoped>
  .address-content {
    margin-bottom: 50px;
  }
	.adress {
		padding: 3% 5%;
    display: flex;
		border-bottom: 1px dashed #ddd;
		justify-content: space-between;
    align-items: center;
	}
	.adress>div{
    p:nth-child(1) {
      span:nth-child(1) {
        font-size: 16px;
      }
      span:nth-child(2) {
        font-size: 14px;
        margin-left: 10px;
        color: #666;
      }
    }
    p:nth-child(2) {
      margin:5px 0;
      line-height: 20px;
    }
  } 
  .set-address-btn,
  .set-address-btn>span:nth-child(1) {
    color: #999!important;
  }
  .set-address-btn>span:last-child {
    margin-left:10px;
    color: #666;
  }
  .adress span,
  .adress p {
    font-size: 14px;
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
  .address-active {
    background: $theme-active;
    color: #fff;
    margin-right: 5px;
    font-size: 12px;
    padding:2px 5px;
    border-radius: 3px;
  }
  .address-type {
    background: #ccc;
    color: #fff;
    padding: 2px 5px;
    border-radius:3px;
  }
</style>