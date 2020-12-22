import { Toast,Dialog } from 'mand-mobile'

const ui = {
   Title(msg: any, timer: any) {//一般提示
      Toast({
         content: msg,
         position: "middle",
         duration: timer ? timer : 3000,
         hasMask: true
      });
      setTimeout(() => {
         Toast.hide()
      }, 3000)
   },
   Error(msg: any) {//错误提示
      Toast.failed(msg)
   },
   loadingShow(msg: any) {//接口载入
      Toast.loading(msg)
   },
   loadingHide() {//接口载出
      Toast.hide()
   },
   Confirm(title:String,content:String,callBack:any) {
      Dialog.alert({
        title,
        content,
        confirmText: '确定',
        onConfirm: () => callBack|| {},
      })
   }
}

export default ui