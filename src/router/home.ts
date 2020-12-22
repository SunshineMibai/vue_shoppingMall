
const Home = () => import('@/views/Home/Home.vue')


export default [
  {
    name: 'home',
    path: '/',
    component: Home,
    meta: {
      title: '首页',
      isLogin: false
    }
  },
  {
    name: 'home',
    path: '/home',
    component: Home,
    meta: {
      title: '首页',
      isLogin: false
    }
  }
]