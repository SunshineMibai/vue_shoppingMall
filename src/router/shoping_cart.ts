
const ShopingCartList = () => import('@/views/ShopingCart/ShopingCartList.vue')
const ShoppingOrder = () => import('@/views/ShopingCart/ShoppingOrder.vue')
const AdressList = () => import('@/views/ShopingCart/AdressList.vue')
const AddressDetail = ()=> import('@/views/ShopingCart/AddressDetail.vue');

export default [
  {
    name: 'ShopingCartList',
    path: '/ShopingCartList',
    component: ShopingCartList,
    meta: {
      title: '购物车',
      isLogin: true
    }
  },
  {
    name: 'ShoppingOrder',
    path: '/ShoppingOrder',
    component: ShoppingOrder,
    meta: {
      title: '订单结算',
      isLogin: true
    }
  },
  {
    name: 'AdressList',
    path: '/AdressList',
    component: AdressList,
    meta: {
      title: '我的收货地址',
      isLogin: true
    }
  },
  {
    name: 'AddressDetail',
    path: '/AddressDetail',
    component: AddressDetail,
    meta: {
      title: '收货地址',
      isLogin: true
    }
  }
]