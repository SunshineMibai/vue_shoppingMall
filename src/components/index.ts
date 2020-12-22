import MHead from './m_head/m_head.vue'
import MMescroll from "@/components/m_mescroll/m_mescroll.vue"
import MContent from "@/components/m_content/m_content.vue"
import MImg from "@/components/m_img/m_img.vue"
import MNothing from '@/components/m_nothing/m_nothing.vue'
import MSwiper from '@/components/m_swiper/m_swiper.vue'
import MSkeleton from '@/components/m_skeleton/m_skeleton.vue'
import MSearchProduct from '@/components/m_searchProduct/m_searchProduct.vue'
import MLoadingIcon from '@/components/m_loadingIcon/m_loadingIcon.vue'
import MFooter from '@/components/m_footer/m_footer.vue'
import MVerify from '@/components/m_verify/m_verify.vue'
import MDialog from '@/components/m_dialog/m_dialog.vue'
import MEmpty from '@/components/m_empty/m_empty.vue'
import MComment from '@/components/m_comment/m_comment.vue'
import MAlert from '@/components/m_alert/m_alert.vue'

export const components = {
   MHead,
   MMescroll,
   MContent,
   MImg,
   MNothing,
   MSwiper,
   MSkeleton,
   MSearchProduct,
   MLoadingIcon,
   MFooter,
   MVerify,
   MDialog,
   MEmpty,
   MComment,
   MAlert
}
// 定义插件安装方法
const install = function (Vue: any) {
   if (!Vue || install.installed) {
      return
   }
   const componentsNames = Object.keys(components)
   componentsNames.forEach(name => {
      const component = components[name]
      component.name && Vue.component(component.name, component)
   })
}
if (typeof window !== 'undefined' && window.Vue) {
   install(window.Vue)
}

export {
   MHead,
   MMescroll,
   MContent,
   MImg,
   MNothing,
   MSwiper,
   MSkeleton,
   MSearchProduct,
   MLoadingIcon,
   MFooter,
   MVerify,
   MDialog,
   MEmpty,
   MComment,
   MAlert
}

export default {
   install
}