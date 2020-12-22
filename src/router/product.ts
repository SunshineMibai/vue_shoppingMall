
const ProductList = () => import('@/views/Product/ProductList.vue')
const ProductDetail = ()=> import('@/views/Product/ProductDetail.vue')

export default [
  {
    name: 'ProductList',
    path: '/ProductList',
    component: ProductList,
    meta: {
      title: '商品分类',
      isLogin: false
    }
  },
  {
    name: 'ProductDetail',
    path: '/ProductDetail',
    component: ProductDetail,
    meta: {
      title: '商品详情',
      isLogin: true
    }
  }
]