<template>
  <div class="goods-detail">
    <navbar>
      <template #title>商品详情</template>
    </navbar>
    <better-scroll class="wrapper" ref="scroll" @position="Position">
      <detail-swiper :imgs="swiperImg"></detail-swiper>
      <!-- 商品的详情 -->
      <div class="goods-info">
        <div class="goods-price">
          <div class="now-price">{{ this.goodsDetail.price }}</div>
          <div class="pass-price">价格￥400</div>
        </div>
        <div class="goods-desc">
          {{ this.goodsDetail.goodsDesc }}
          <span class="discount">优惠促销</span>
        </div>
        <div class="comment">
          <span
            class="score"
            :class="this.goodsDetail.sell > 8 ? 'high' : 'normal'"
            >评分:{{ this.goodsDetail.score }}</span
          >
          <span class="sell"> 销量:{{ this.goodsDetail.sell }}</span>
        </div>
      </div>
      <!-- 商品图片详情 -->
      <div class="goods-img">
        <div class="img-detail" v-for="item in detailImg" :key="item.id">
          <img :src="item" alt="" style="width: 15rem" @load="imgLoad" />
        </div>
      </div>
    </better-scroll>
    <back-top v-if="positionY > 1000" @click.native="backTop"></back-top>
    <div class="funcions">
      <div class="functions-item">
        <img src="~@/assets/icon/store.png" alt="" />
        <p>店铺</p>
      </div>
      <div class="functions-item">
        <img src="~@/assets/icon/girl.png" alt="" />
        <p>客服</p>
      </div>
      <div class="functions-item">
        <img src="~@/assets/icon/col.png" alt="" />
        <p>收藏</p>
      </div>
      <div class="go-buy">
        <div class="buy">立即购买</div>
      </div>
      <div class="add-cart">
        <div class="cart" @click="addToCart">加入购物车</div>
      </div>
    </div>
  </div>
</template>

<script>
import navbar from "@/components/common/navbar/navbar";
import { getGoodsInfo } from "@/network";
import DetailSwiper from "@/components/common/swiper/detailSwiper.vue";

import betterScroll from "@/mixin/betterScroll";
import backTop from "@/mixin/backTop";
import localStorage from "@/mixin/localStorage";

export default {
  mixins: [backTop, betterScroll, localStorage],
  components: {
    navbar,
    DetailSwiper,
  },
  mounted() {
    DetailSwiper;
    this.id = this.$route.params.id;
    this.getGoodsDetail();
  },
  data() {
    return {
      id: "",
      goodsDetail: "",
      swiperImg: "",
      detailImg: "",
    };
  },
  methods: {
    async getGoodsDetail() {
      const res = await getGoodsInfo({ url: `/goods/${this.id}` });
      this.goodsDetail = res.data[0];
      this.swiperImg = this.goodsDetail.goodsImg.slice(0, 3);
      this.detailImg = this.goodsDetail.goodsImg.slice(2);
    },
    imgLoad() {
      this.$refs.scroll.refresh();
    },
    addToCart() {
      if (!this.token) {
        // alert("请先登录~");
        this.$message({
          type: "info",
          message: "先请登录~",
        });
        this.$router.push("/login");
      } else {
        alert("登录成功~");
      }
    },
  },
};
</script>

<style lang="less" scoped>
.goods-detail {
  position: relative;
  font-size: 0.45rem;
  height: 100vh;
  .wrapper {
    height: calc(100vh - 93px);
    overflow: hidden;
  }
  .goods-info {
    margin-top: 10px;
    padding: 5px 20px;
    border-radius: 7px;
    background-color: #fff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
    .goods-price {
      display: flex;
      //   text-align: center;
      align-content: center;
      .now-price {
        font-size: 0.7rem;
        color: orange;
      }
      .pass-price {
        margin-top: 5px;
        font-size: 0.35;
        text-decoration: line-through;
        margin-left: 15px;
      }
    }
    .goods-desc {
      margin-top: 5px;
      .discount {
        color: #fff;
        display: inline-block;
        padding: 2px;
        background-color: orange;
        border-radius: 3px;
        margin-left: 10px;
      }
    }
    .comment {
      display: flex;
      margin-top: 8px;
      justify-content: space-between;
    }
  }
  .goods-img {
    margin-top: 10px;
    .goods-detail {
      width: 15rem;
      height: 100%;
      img {
        width: 15rem;
        height: 100%;
      }
    }
  }
  .funcions {
    display: flex;
    position: fixed;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
    color: #ccc;
    width: 15rem;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    height: 49px;
    cursor: pointer;
    .functions-item {
      text-align: center;
      margin-top: 8px;
      width: 14%;
      p {
        font-size: 14px;
      }
      img {
        width: 25px;
        height: 20px;
      }
    }
    .go-buy {
      width: 29%;
      margin: 8px 0;
      height: 40px;
      background-color: orange;
      text-align: center;
      line-height: 40px;
      color: #fff;
      border-bottom-left-radius: 15px;
      border-top-left-radius: 15px;
    }
    .add-cart {
      width: 29%;
      margin: 8px 0;
      height: 40px;
      color: #fff;
      background-color: orange;
      text-align: center;
      line-height: 40px;
      background-color: red;
      margin-right: 10px;
      line-height: 40px;
      border-top-right-radius: 15px !important;
      border-bottom-right-radius: 15px !important;
    }
  }
  .high {
    color: green;
  }
  .normal {
    color: yellow;
  }
}
</style>
