<template>
  <view class="wrapper">
    <!-- 收货信息 -->
    <view class="shipment">
      <template>
        <view class="dt">收货人: </view>
        <view class="dd meta">
          <text class="name"></text>
          <text class="phone"></text>
        </view>
        <view class="dt">收货地址:</view>
        <view class="dd"></view>
      </template>
      <button>获取收货地址</button>
    </view>
    <!-- 购物车 -->
    <view class="carts">
      <view class="item">
        <!-- 店铺名称 -->
        <view class="shopname">优购生活馆</view>
        <view class="goods" v-for="(item,index) in shopcar" :key="item.goods_id">
          <!-- 商品图片 -->
          <image class="pic" :src="item.goods_img"></image>
          <!-- 商品信息 -->
          <view class="meta">
            <view class="name">{{item.goods_name}}</view>
            <view class="price">
              <text>￥</text>{{item.goods_price}}<text>.00</text>
            </view>
            <!-- 加减 -->
            <view class="amount">
              <text class="reduce" @click="changeNum(index,-1)">-</text>
              <input type="number" class="number" :value="item.goods_num">
              <text class="plus" @click="changeNum(index,1)">+</text>
            </view>
          </view>
          <!-- 选框 -->
          <view class="checkbox">
            <icon type="success" size="20" @click="toggleItem(index)" :color="item.goods_check?'#EA4451':'#ccc'"></icon>
          </view>
        </view>
      </view>
    </view>
    <!-- 其它 -->
    <view class="extra">
      <label class="checkall">
        <!-- 三目运算符的条件不支持判断(uni-app存在的bug) -->
        <!-- <icon type="success" size="20" :color="this.checkedProducts.length === this.shopcar.length?'#EA4451':'#ccc'"></icon> -->
        <icon type="success" size="20" @click="toggleAll" :color="isAll?'#EA4451':'#ccc'"></icon>
        全选
      </label>
      <view class="total">
        合计: <text>￥</text><label></label><text>.00</text>
      </view>
      <view class="pay">结算()</view>
    </view>
  </view>
</template>

<script>
  export default {
    data () {
      return {
        // 购物车数据
        shopcar: []
      }
    },
    computed:{
      // 过滤出所有选中的商品
      checkedProducts(){
        return this.shopcar.filter(item=>item.goods_check)
      },
      // 解决uni-app中三目运算符条件不支持判断的bug
      isAll(){
        return this.checkedProducts.length === this.shopcar.length
      }
    },
    // 初始化购物车数据
    // -用onShow,每次页面显示时都要重新获取缓存最新的数据
    onShow(){
      this.shopcar = uni.getStorageSync('myshopcar') || []
    },
    methods: {
      // 修改购物车商品的数量
      changeNum(index,n){
        // 商品数量最少为1
        if(n===-1&&this.shopcar[index].goods_num<=1){
          return
        }
        // 商品数量不能超过库存
        if(n===1&&this.shopcar[index].goods_num>5){
          return
        }
        this.shopcar[index].goods_num += n
        // 把修改后的数据重新同步到缓存
        uni.setStorageSync('myshopcar',this.shopcar)
      },

      // 控制单个商品的选中状态
      toggleItem(index){
        this.shopcar[index].goods_check = !this.shopcar[index].goods_check
        // 把状态同步到缓存
        uni.setStorageSync('myshopcar',this.shopcar)
      },

      // 控制所有商品的选中状态
      toggleAll(){
        let flag = !this.isAll
        this.shopcar.forEach(item=>{
          // 把所有的商品状态修改为全选按钮相反的状态
          item.goods_check = flag
        })
        // 把全选的状态同步到缓存
        uni.setStorageSync('myshopcar',this.shopcar)
      }
  }
}
</script>

<style scoped lang="less">
  .shipment {
    height: 100rpx;
    line-height: 2;
    padding: 30rpx 30rpx 40rpx 30rpx;
    font-size: 27rpx;
    color: #333;
    background-color: #fff;
    background-image: url(http://static.botue.com/ugo/images/cart_border%402x.png);
    background-size: contain;
    background-repeat: no-repeat;
    background-position: bottom;
    .dt {
      width: 140rpx;
      float: left;
      clear: both;
    }
    .dd {
      padding-left: 160rpx;
    }
    .meta {
      padding-right: 50rpx;
    }
    text.phone {
      float: right;
    }
  }
  .carts {
    background-color: #f4f4f4;
    padding-bottom: 110rpx;
    overflow: hidden;
    .shopname {
      padding: 30rpx;
      margin-top: 20rpx;
      font-size: 30rpx;
      color: #333;
      background-color: #fff;
      border-top: 1rpx solid #eee;
      border-bottom: 1rpx solid #eee;
    }
    .goods {
      display: flex;
      padding: 30rpx 20rpx 30rpx 0;
      margin-left: 100rpx;
      border-bottom: 1rpx solid #eee;
      background-color: #fff;
  
      position: relative;
      .checkbox {
        width: 101rpx;
        height: 100%;
        background-color: #fff;
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        left: -100rpx;
        top: 0;
      }
      &:last-child {
        border-bottom: none;
      }
      .pic {
        width: 200rpx;
        height: 200rpx;
        margin-right: 30rpx;
      }
      .meta {
        flex: 1;
        font-size: 27rpx;
        color: #333;
        position: relative;
      }
      .name {
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
      .price {
        position: absolute;
        bottom: 0;
        color: #ea4451;
        font-size: 33rpx;
        text {
          font-size: 22rpx;
        }
      }
      .amount {
        position: absolute;
        bottom: 0;
        right: 20rpx;
        height: 48rpx;
        text-align: center;
        border: 1rpx solid #ddd;
        border-radius: 8rpx;
        display: flex;
        align-items: center;
        text {
          display: block;
          width: 60rpx;
          line-height: 48rpx;
          font-size: 36rpx;
          color: #ddd;
          text-align: center;
        }
        input {
          width: 60rpx;
          height: 48rpx;
          min-height: 48rpx;
          font-size: 27rpx;
          border-left: 1rpx solid #ddd;
          border-right: 1rpx solid #ddd;
        }
      }
    }
  }
  .extra {
    position: fixed;
    bottom: 0;
    /* #ifdef H5 */
    bottom: 50px;
    /* #endif */
    left: 0;
    z-index: 9;
    width: 750rpx;
    height: 96rpx;
    text-align: center;
    line-height: 96rpx;
    font-size: 36rpx;
    border-top: 1rpx solid #eee;
    background-color: #fff;
    color: #333;
    display: flex;
    .checkall {
      width: 140rpx;
      line-height: 1;
      margin-left: 25rpx;
      display: flex;
      align-items: center;
      icon {
        margin-right: 20rpx;
      }
    }
    .total {
      display: flex;
      justify-content: center;
      flex: 1;
      label, text {
        color: #ea4451;
        vertical-align: bottom;
        position: relative;
        bottom: -2rpx;
      }
      text {
        position: relative;
        bottom: -3rpx;
        font-size: 24rpx;
        &:first-child {
          margin-left: 10rpx;
        }
      }
    }
    .pay {
      width: 200rpx;
      background-color: #ea4451;
      color: #fff;
    }
  }
</style>