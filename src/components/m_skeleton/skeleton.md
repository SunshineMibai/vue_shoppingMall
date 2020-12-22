
##调用

import { MSkeleton } from "@/components";

<m-skeleton v-model='skeActive'>
  <div slot='skeleton' class='product-item'>

  </div>
</m-skeleton>

##参数 init
skeActive = true ;骨架状态 true为开启骨架状态
row = 2;站位条数

##methods
$nextTick(()=>{
  setTimeout(()=>{
    this.skeActive = false //false为关闭骨架状态
  },1000)
})