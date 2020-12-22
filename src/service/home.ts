
import axiosHttp from './index'


//接口模块
const REQMODULE_1 = '/home'
const REQMODULE_2 = '/product'


//接口地址
const REQUESTCODE = '/getHomeData.php'

/**
 * 获取主页信息
 * @url {String} 请求url
 * @module {String} 接口模块
 * @params {String} 接口参数
 */
export const getHomeData = (param: any) => axiosHttp.post(REQMODULE_1 + REQUESTCODE, param);