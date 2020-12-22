
import axiosHttp from './index'


//接口模块
const REQCATALOG = '/user'

//接口地址
const SHOPPINGLOGIN = '/shoppingLogin.php'
const SETUSERDATA = '/setUserData.php'
const GETUSERDATA = '/getUserData.php'
const GETADDRESSLIST = '/getAddressList.php'
const GETADDRESSACTIVE = '/getAddressActive.php'
const SETADDRESSITEM = '/addAddress.php'
const DELADDRESSITEM = '/delAddress.php'


/**
 * 用户登录
 * @url {String} 请求url
 * @module {String} 接口模块
 * @params {String} 接口参数
 */
export const userLogin = (param: any) => axiosHttp.post(REQCATALOG + SHOPPINGLOGIN, param);
/**
 * 获取用户资料
 * @url {String} 请求url
 * @module {String} 接口模块
 * @params {String} 接口参数
 */
export const getUserData = (param: any) => axiosHttp.post(REQCATALOG + GETUSERDATA, param);
/**
 * 修改用户资料
 * @url {String} 请求url
 * @module {String} 接口模块
 * @params {String} 接口参数
 */
export const setUserData = (param: any) => axiosHttp.post(REQCATALOG + SETUSERDATA, param);
/**
 * 获取收货地址列表
 * @url {String} 请求url
 * @module {String} 接口模块
 * @params {String} 接口参数
 */
export const getAddressList = (param: any) => axiosHttp.post(REQCATALOG + GETADDRESSLIST, param);
/**
 * 获取收货地址详情
 * @url {String} 请求url
 * @module {String} 接口模块
 * @params {String} 接口参数
 */
export const getAddressActive= (param: any) => axiosHttp.post(REQCATALOG + GETADDRESSACTIVE, param);
/**
 * 修改/新增收货地址
 * @url {String} 请求url
 * @module {String} 接口模块
 * @params {String} 接口参数
 */
export const setAddressItem = (param: any) => axiosHttp.post(REQCATALOG + SETADDRESSITEM, param);
/**
 * 删除收货地址
 * @url {String} 请求url
 * @module {String} 接口模块
 * @params {String} 接口参数
 */
export const delAddressItem = (param: any) => axiosHttp.post(REQCATALOG + DELADDRESSITEM, param);