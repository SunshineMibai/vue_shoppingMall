
import globalConfig from '@/utils/global_data'
import axios from 'axios';
// import { AxiosResponse, AxiosRequestConfig } from 'axios';
let REQURLCODE = ''
axios.interceptors.request.use((config: any) => {
  if (config && config.params && config.params.axiosParams) {
    (<any>window).utils.ui.loadingShow(config.params.axiosParams.resquestLoaddingText)
  }

  let urlArr = config.url.split('/')
  REQURLCODE = (urlArr[urlArr.length - 1]).split('.')[0]
  // if (!(<any>window).utils.globalConfig.isDebug) {
    console.log('%c ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ ' + REQURLCODE + ' 请求数据OBJECT↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓', 'color:#ffcc00')
    console.log('%c requestData>>>>>>', 'color:green', config.params)
    console.log('%c ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑' + REQURLCODE + ' 请求数据OBJECT↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑', 'color:#ffcc00')
  // }
  return config;
}, (error: any) => {
  Promise.reject(error);
})
axios.interceptors.response.use(
  (response: any) => {
    if (response.responseCode && response.responseCode !== 200 && response.responseCode !== 0) {
      (<any>window).utils.ui.Title('系统网络连接异常，请稍后重试！')
    } else {
      (<any>window).utils.ui.loadingHide()
      // if (!(<any>window).utils.globalConfig.isDebug) {
        console.log('%c ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ ' + REQURLCODE + ' 返回数据OBJECT↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓', 'color:#CD00CD', "")
        console.log('%c responseData>>>>>>', 'color:green', response.data)
        console.log('%c ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑ ' + REQURLCODE + ' 返回数据OBJECT↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑', 'color:#CD00CD', "")
      // }
      return response.data;
    }
  },
  (err: any) => {
    return Promise.reject(err);
  });
export function post(request_url: any, params = {}) {
   let new_rquest_url = request_url.indexOf('http://')>-1?request_url:`${globalConfig.rootUrl}${request_url}`
  return new Promise((resolve, reject) => {
    axios({
      url: new_rquest_url,
      method: 'post',
      params: params
    }).then(response => {
      resolve(response)
    }).catch(error => {
      reject(error)
    })
  })
}
export default {
  post(service: any, params: any) {
    return post(service, params);
  }
}