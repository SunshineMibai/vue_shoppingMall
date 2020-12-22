

const reg = {
   TestName(value:any) {//用户名
      let send = true
      if(!value || value == '' || value == undefined) {
         send = false
      }else if (!/^[A-Za-z0-9]{6,11}$/.test(value)) {
         send = false
      }
      return send
   },
   TestPwd(value:any) {//密码
      let send = true
      if(!value || value == '' || value == undefined) {
         send = false
      }else if (!/^[A-Za-z0-9]{6,32}$/.test(value)) {
         send = false
      }
      return send
   },
   TestNames(value: any) {//昵称
      let send = ''
      if(!value || value == '' || value == undefined) {
         send = '昵称不能为空!'
      }else if (!/^[\uAC00-\uD7AF\u4E00-\u9FA5-a-zA-Z0-9·.]{2,20}$/.test(value)) {
         send = '昵称只能录入中文或英文字母!'
      }
      return send
   },
   Request(value: any,title:String,num:Number) {//必填项
      let send = ''
      if(!value || value == '' || value == undefined) {
         send = title+'不能为空!'
      } else if(value && value.length<5) {
         send = title+'不能少于'+num+'个字'
      }
      return send
   }
}

export default reg