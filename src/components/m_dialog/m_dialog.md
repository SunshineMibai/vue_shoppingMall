


#调用实例
import { MDialog } from '@/components'
<m-dialog :title='dialogTitle' @getSendDialog='getSendDialog' v-if='dialogActive' :type='dialogType'/>

#参数说明
|   字段  |    类型  |    说明    |
|  title  |  string  |  弹框内容  |
|dialogActive |  Boolean  |  是否显示  |
|type |  string  |  类型  |  #output/location

#交互事件
getSendDialog (){}

