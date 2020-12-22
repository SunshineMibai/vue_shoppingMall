<template>
  <div>
    <m-head title='评价详情' @headBack='goToBack' />
    <m-content :isHead='true' @getMescrollData='getMescrollData'>
      <div slot='all_content' class="content">
        <p class='detail-switch comment-top'>订单编号：{{$route.query.id}}</p>
        <div v-for="(item, index) in evaluateList" :key="index" class="comment">
          <div class="comment_top">
            <img :src="item.evaluate_img" />
            <div>
              <span>{{item.evaluate_name}}</span>
              <span>￥{{item.evaluate_price}}</span>
              <span>x{{item.evaluate_count}}</span>
            </div>
          </div>
          <div class='detail-switch'>
            <p class=''>评价详情</p>
            <p :class="[item.show?'iconfont iconfanhui item-open':'iconfont iconfanhui item-close']" @click='toggoItem(index)'></p>
          </div>
          <!-- 显示评分{{item.show}} -->
          <div class="comment_bot" v-show='item.show'>
                <div class="m-comment">
                  <img
                    v-for="(citem,cindex) in (1,5)"
                    :key="cindex"
                    :src="(parseInt(item.star_data.pro_star))>=cindex+1?selected:select"
                  />
                  <span>商品评分{{item.star_data.pro_star}}分</span>
                </div>
                <div class="m-comment">
                  <img
                    v-for="(citem,cindex) in (1,5)"
                    :key="cindex"
                    :src="(parseInt(item.star_data.express_star))>=cindex+1?selected:select"
                  />
                  <span>快递评分{{item.star_data.express_star}}分</span>
                </div>
                <div class="m-comment">
                  <img
                    v-for="(citem,cindex) in (1,5)"
                    :key="cindex"
                    :src="(parseInt(item.star_data.serve_star))>=cindex+1?selected:select"
                  />
                  <span>服务评分{{item.star_data.serve_star}}分</span>
                </div>
                <textarea v-model="item.star_data.evaluate_content" rows="4" maxlength="150" placeholder="请填写评价内容" disabled></textarea>
          </div>
        </div>
        <div class='comment-btm'>
          <p v-if='evalData.order_date'>下单时间：{{evalData.order_date}}</p>
          <p v-if='evalData.order_address'>收货地址：{{evalData.order_address}}</p>
        </div>
      </div>
    </m-content>
  </div>
</template>

<script lang='ts'>
import { Component, Prop, Vue } from "vue-property-decorator";
import { MHead, MContent, MEmpty } from "@/components";
import { TabBar, Swiper, SwiperItem } from "mand-mobile";
import { State, Mutation } from "vuex-class";
import { getUserEvaluateDetail } from "@/service/product";

@Component({
  components: {
    MHead,
    MContent
  }
})
export default class OrderEvaluateDetail extends Vue {
  title: string = "评价详情";
  evaluateList: object = [];
  evalData: object = {};
  select: any = require("@/assets/images/user/star.png");
  selected: any = require("@/assets/images/user/star_active.png");

  @State("Common") stateCommon: any;

  mounted() {
    this.getMescrollData();
  }

  goToBack() {
    this.$router.push(`/OrderList?type=evaluate`);
  }
  getMescrollData() {
    let req = {
      userCode: this.stateCommon.user_code,
      orderCode: this.$route.query.id
    };
    getUserEvaluateDetail(req).then((res: object) => {
      console.log(res);
      if (res.responseCode == 1000) {
        res.responseData.order_list.forEach((item: objct) => {
          item.show = false;
        });
        this.evaluateList = res.responseData.order_list;
        this.evalData = res.responseData
      }
    });
  }
  toggoItem(num: number) {
    console.log(1);
    this.evaluateList.forEach((tpl: object, index: number) => {
      if (index == num) {
        tpl.show = !tpl.show;
      }
      this.$set(this.evaluateList, index, tpl);
    });
  }
}
</script>

<style scoped lang='scss'>
.comment-top {
  font-size: 15px;
}
.content {
  width: 100%;
  padding: 5% 5% 0;
  box-sizing: border-box;
  .comment {
    width: 100%;
    box-shadow: 0 0 5px #ddd;
    padding: 5%;
    margin-bottom: 10px;
    border-radius: 5px;
    .comment_top {
      display: flex;
      align-items: center;
      img {
        width: 20%;
        box-shadow: 0 0 1px #ddd;
      }
      div {
        width: 100%;
        height: 100%;
        padding: 2% 0 2% 5%;
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        span {
          font-size: 15px;
        }
      }
    }
    .comment_bot {
      width: 100%;
      textarea {
        width: 95%;
        border: 1px solid #ddd;
        margin: 4% 1% 2%;
        border-radius: 5px;
        padding: 5px;
        font-size: 14px;
        outline: none;
        resize: none;
      }
      textarea:focus {
        box-shadow: 0 0 5px #ddd;
        // outline: #ddd solid;
      }
      textarea[disabled] {
        background:#fff;
      }
    }
  }
  .bot-submit {
    font-size: 14px;
    width: 120px;
    height: 35px;
    text-align: center;
    line-height: 35px;
    background: $theme-active;
    color: #fff;
    border-radius: 3px;
    margin: 10px 0 20px 65%;
  }
}
.detail-switch {
  border-bottom: 1px solid #ccc;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 40px;
  margin-bottom: 10px;
  p:first-child {
    font-size: 14px;
  }
  p:last-child {
    font-size: 24px;
    color: #333;
    width: 30px;
    transition: all 0.1s linear;
  }
}
.item-open {
  transform: rotate(90deg);
}
.item-close {
  transform: rotate(270deg);
}
.comment-btm {
  p {
    font-size: 14px;
    text-align: right;
  }
}
.m-comment {
  width: 100%;
  display: flex;
  align-items: center;
  // justify-content: flex-end;
  margin-bottom: 10px;
  img {
    width: 22px;
  }
  span {
    margin-left: 5%;
    font-size: 14px;
  }
}
</style>