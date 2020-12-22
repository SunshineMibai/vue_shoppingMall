
const UserCenter = () => import('@/views/UserCenter/UserCenter.vue')
const UserLogin = () => import('@/views/UserCenter/UserLogin.vue')
const UserStatement = () => import('@/views/UserCenter/UserStatement.vue')
const UserData = ()=> import('@/views/UserCenter/UserData.vue')

const OrderList = ()=> import('@/views/Order/OrderList.vue')
const OrderEvaluate = ()=> import('@/views/Order/OrderEvaluate.vue')
const OrderEvaluateDetail = ()=> import('@/views/Order/OrderEvaluateDetail.vue')

export default [
  {
    name: 'UserCenter',
    path: '/UserCenter',
    component: UserCenter,
    meta: {
      title: '个人中心',
      isLogin: true
    }
  },
  {
    name: 'UserLogin',
    path: '/UserLogin',
    component: UserLogin,
    meta: {
      title: '登录商城',
      isLogin: false
    }
  },
  {
    name: 'UserStatement',
    path: '/UserStatement',
    component: UserStatement,
    meta: {
      title: '声明信息',
      isLogin: false
    }
  },
  {
    name: 'UserData',
    path: '/UserData',
    component: UserData,
    meta: {
      title: '个人资料',
      isLogin: true
    }
  },
  {
    name: 'OrderList',
    path: '/OrderList',
    component: OrderList,
    meta: {
      title: '我的订单',
      isLogin: true
    }
  },
  {
    name: 'OrderEvaluateDetail',
    path: '/OrderEvaluateDetail',
    component: OrderEvaluateDetail,
    meta: {
      title: '评价详情',
      isLogin: true
    }
  },
  {
    name: 'OrderEvaluate',
    path: '/OrderEvaluate',
    component: OrderEvaluate,
    meta: {
      title: '商品评价',
      isLogin: true
    }
  },
]