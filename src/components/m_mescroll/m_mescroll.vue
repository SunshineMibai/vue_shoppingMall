<template>
   <div>
     <!--mescroll滚动区域的基本结构-->
    <mescroll-vue class="mescroll"
        v-if='isScroll'
        id="mescroll"
        ref="mescroll"
        :down="mescrollDown"
        :up="mescrollUp"
        @init="mescrollInit"
        :style="{height:DomHeight,paddingTop:DomTop}">
        <!--内容...-->
        <slot name="content">
        </slot>
    </mescroll-vue>
    <slot name="content" v-if='!isScroll'>

    </slot>
   </div>
</template>

<script>
   // 引入mescroll的vue组件
   import MescrollVue from "mescroll.js/mescroll.vue";

   import { mapState } from "vuex";

   export default {
      name: "m-mescroll",
      components: {
         MescrollVue // 注册mescroll组件
      },
      props: {
         isHead: {
            type: Boolean,
            default: false
         },
         value: {//加载状态 false加载中 true加载完毕
            type:Boolean,
            default: false
         },
         isScroll: {
           type: Boolean,
           default: true
         },
         scrollHeight: {
           type: String,
           default: ''
         }
      },
      watch: {
         value(old) {
            if(old) {
               console.log(1)
               this.mescroll.endSuccess(1);
            }
         }
      },
      computed: {
         ...mapState(['Common'])
      },
      data() {
         return {
            DomHeight: 0,
            DomTop: 0,
            mescroll: null, // mescroll实例对象
            mescrollDown: {}, //下拉刷新的配置. (如果下拉刷新和上拉加载处理的逻辑是一样的,则mescrollDown可不用写了)
            mescrollUp: {
              use:true,
               // 上拉加载的配置.
               callback: this.upCallback, // 上拉回调,此处简写; 相当于 callback: function(page, mescroll) { }
               //以下是一些常用的配置,当然不写也可以的.
               page: {
                  num: 0, //当前页 默认0,回调之前会加1; 即callback(page)会从1开始
                  size: 10 //每页数据条数,默认10
               },
               htmlNodata: '<p class="upwarp-nodata">-- END --</p>',
               noMoreSize: 12, //如果列表已无数据,可设置列表的总数量要大于5才显示无更多数据;
               //避免列表数据过少(比如只有一条数据),显示无更多数据会不好看
               //这就是为什么无更多数据有时候不显示的原因
               toTop: {
                  //回到顶部按钮
                  src: require("@/assets/images/common/topimg.png"), //图片路径,默认null,支持网络图
                  offset: 10, //列表滚动1000px才显示回到顶部按钮
                  hideClass: "hide-top"
               }
            },
            dataList: [], // 列表数据
            num: 0
         };
      },
      beforeRouteEnter(to, from, next) {
        if(this.isScroll) {
          // 如果没有配置回到顶部按钮或isBounce,则beforeRouteEnter不用写
          next(vm => {
              // 找到当前mescroll的ref,调用子组件mescroll-vue的beforeRouteEnter方法
              vm.$refs.mescroll && vm.$refs.mescroll.beforeRouteEnter(); // 进入路由时,滚动到原来的列表位置,恢复回到顶部按钮和isBounce的配置
          });
        }
      },
      beforeRouteLeave(to, from, next) {
        if(this.isScroll) {
          // 如果没有配置回到顶部按钮或isBounce,则beforeRouteLeave不用写
          // 找到当前mescroll的ref,调用子组件mescroll-vue的beforeRouteLeave方法
          this.$refs.mescroll && this.$refs.mescroll.beforeRouteLeave(); // 退出路由时,记录列表滚动的位置,隐藏回到顶部按钮和isBounce的配置
          next();
        }
      },
      methods: {
         // mescroll组件初始化的回调,可获取到mescroll对象
         mescrollInit(mescroll) {
           if(this.isScroll) {
             this.mescroll = mescroll; // 如果this.mescroll对象没有使用到,则mescrollInit可以不用配置
           } else {
             this.mescroll = null;
           }
         },
         upCallback(page, mescroll) {
            this.num++
            if (this.num > 1) {
               //轮训读取读取vuex，把加载中置为加载完成
               let num = 0
               let timer = setInterval(()=>{
                  num++
                  // console.log(num)
                  if(num>2){
                    this.$emit('getMescrollData')
                     mescroll.endSuccess(1);
                     clearInterval(timer);
                  }
               },500)
            } else {
               mescroll.endSuccess(1);
            }
         }
      },
      created() {
        if(!this.isScroll) {
          this.mescrollUp = null
        }
      },
      mounted() {
        let windowHeight = utils.globalConfig.screenHeight
        console.log(this.scrollHeight);
         this.DomHeight = this.scrollHeight ? (windowHeight - parseInt(this.scrollHeight)) + 'px' : windowHeight + "px";
         this.DomTop = this.isHead ? "55px" : 0;
      },
      destroyed() {
        $(".mescroll-totop").remove();
      }
   };

</script>

<style lang='scss'
   scoped>
   /*通过fixed固定mescroll的高度*/

   .mescroll {
      //   position: fixed;
      height: auto;
      z-index: 1000;
      background: #fff;
      /*padding: 0 10px;*/
      height: 300px;
   }

   .demo {
      height: 550px;
   }
</style>