const globalConfig = {
   isDebug: false,//是否开启debug
   timeout: 1000 * 30,
   rootUrl: 'http://www.jiaoguoliang.com/php_project/vue3_shopping',//服务器地址
   system: (!!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) ? 'ios' : 'android',//手机系统
   screenWidth: document.documentElement.clientWidth,
   screenHeight: document.documentElement.clientHeight
}

export default globalConfig