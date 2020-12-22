




export default {
  /** 
  * @param key
  */
  getDate: (value: any) => {
    if (value == 'date') {//获取当前时间
      let year = new Date().getFullYear();
      let mouth = new Date().getMonth() + 1;
      let data = new Date().getDate() < 10 ? ('0' + new Date().getDate()) : new Date().getDate();
      let hh = new Date().getHours() < 10 ? ('0' + new Date().getHours()) : new Date().getHours();
      let mm = new Date().getMinutes() < 10 ? ('0' + new Date().getMinutes()) : new Date().getMinutes();
      let ss = new Date().getSeconds() < 10 ? ('0' + new Date().getSeconds()) : new Date().getSeconds();
      let this_date = year + '-' + mouth + '-' + data + ' ' + hh + ':' + mm + ':' + ss;
      return this_date
    }
  },
  judgeBigScreen() {  //根据返回值 true 或false ,返回true的话 则为全面屏 
    let result = false;
    const rate = window.screen.height / window.screen.width;    
    let limit =  window.screen.height == window.screen.availHeight ? 1.8 : 1.65; // 临界判断值  
         
      // window.screen.height为屏幕高度
     //  window.screen.availHeight 为浏览器 可用高度
     
    if (rate > limit) {
    result = true;
    }
    return result;
  }
}