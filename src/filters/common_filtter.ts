import Vue from 'vue'
import CodeData from '@/assets/codes'




Vue.filter('sex',(value:any) =>{
  let text = ''
  if(value == '1') {
    text = '男'
  } else if(value == '2') {
    text = '女'
  }
  return text
})

Vue.filter('address_1',(value:any) =>{
  let text = ''
  CodeData.addressList.forEach((item:any) => {
    if(item.value == value.substring(0,2)) {
      text = item.label
    }
  })
  return text
})

Vue.filter('address_2',(value:any) =>{
  let text = ''
  CodeData.addressList.forEach((item:any) => {
    if(item.value == value.substring(0,2)) {
      item.children.forEach((tpl:any) => {
        if(tpl.value == value.substring(2,6)) {
          text = tpl.label
        }
      })
    }
  })
  return text
})

Vue.filter('address_3',(value:any) =>{
  let text = ''
  CodeData.addressList.forEach((item:any) => {
    if(item.value == value.substring(0,2)) {
      item.children.forEach((tpl:any) => {
        if(tpl.value == value.substring(2,6)) {
          tpl.children.forEach((cts:any) => {
            if(cts.value == value.substring(6,12)) {
              text = cts.label
            }
          })
        }
      })
    }
  })
  return text
})
Vue.filter('addressType',(value:any) =>{
  let text = ''
  if(value == '1') {
    text = '家'
  }else if(value == '2') {
    text = '公司'
  }else if(value == '3') {
    text = '学校'
  }
  return text
})
Vue.filter('orderState',(value:any) =>{
  let text = ''
  if(value == 'deliver') {
    text = '待发货'
  }else if(value == 'receiving') {
    text = '待收货'
  }else if(value == 'complete') {
    text = '待评价'
  }else if(value == 'evaluate') {
    text = '已评价'
  }
  return text
})