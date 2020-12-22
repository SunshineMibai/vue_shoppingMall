
import axiosHttp from './index'


//接口模块
const REQMODULE = '/product'


//接口地址
const GETSHOPPINGCART = '/getShoppingCart.php'
const ADDSHOPPINGCART = '/addShoppingCart.php'
const DELSHOPPINGCART = '/delShoppingCart.php'
const ADDORDERLIST = '/addOrderList.php'
const GETORDERLIST = '/getOrderList.php'
const GETPRODUCTDETAIL = '/getProductDetail.php'
const SAVEORDER = '/saveOrder.php'
const SETORDERACTIVE = '/setOrderActive.php'
const GETPRODUCTEVA = '/getProductEva.php'
const GETUSEREVALUATEDETAIL = '/getUserEvaluateDetail.php'
const GETPRODUCTTYPES = '/getProductTypes.php'

/**
 * 添加购物车
 * @url {String} 请求url
 * @module {String} 接口模块
 * @params {String} 接口参数
 */
export const addShoppingCart = (param: any) => axiosHttp.post(REQMODULE + ADDSHOPPINGCART, param);
/**
 * 查询购物车
 * @url {String} 请求url
 * @module {String} 接口模块
 * @params {String} 接口参数
 */
export const getShoppingCart = (param: any) => axiosHttp.post(REQMODULE + GETSHOPPINGCART, param);
/**
 * 删除购物车商品
 * @url {String} 请求url
 * @module {String} 接口模块
 * @params {String} 接口参数
 */
export const delShoppingCart = (param: any) => axiosHttp.post(REQMODULE + DELSHOPPINGCART, param);
/**
 * 购物车结算
 * @url {String} 请求url
 * @module {String} 接口模块
 * @params {String} 接口参数
 */
export const addOrderList = (param: any) => axiosHttp.post(REQMODULE + ADDORDERLIST, param);
/**
 * 查看订单
 * @url {String} 请求url
 * @module {String} 接口模块
 * @params {String} 接口参数
 */
export const getOrderList = (param: any) => axiosHttp.post(REQMODULE + GETORDERLIST, param);
/**
 * 查看商品详情
 * @url {String} 请求url
 * @module {String} 接口模块
 * @params {String} 接口参数
 */
export const getProductDetail = (param: any) => axiosHttp.post(REQMODULE + GETPRODUCTDETAIL, param);
/**
 * 提交订单评价
 * @url {String} 请求url
 * @module {String} 接口模块
 * @params {String} 接口参数
 */
export const saveOrder = (param: any) => axiosHttp.post(REQMODULE + SAVEORDER, param);

/**
 * 修改订单状态
 * @url {String} 请求url
 * @module {String} 接口模块
 * @params {String} 接口参数
 */
export const setOrderActive = (param: any) => axiosHttp.post(REQMODULE + SETORDERACTIVE, param);

/**
 * 查看商品详情页面-评价
 * @url {String} 请求url
 * @module {String} 接口模块
 * @params {String} 接口参数
 */
export const getProductEva = (param: any) => axiosHttp.post(REQMODULE + GETPRODUCTEVA, param);

/**
 * 查看用户-订单商品评价详情
 * @url {String} 请求url
 * @module {String} 接口模块
 * @params {String} 接口参数
 */
export const getUserEvaluateDetail = (param: any) => axiosHttp.post(REQMODULE + GETUSEREVALUATEDETAIL, param);

/**
 * 查看商品列表
 * @url {String} 请求url
 * @module {String} 接口模块
 * @params {String} 接口参数
 */
export const getProductTypes = (param: any) => axiosHttp.post(REQMODULE + GETPRODUCTTYPES, param);
