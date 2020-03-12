<template>
  <!-- 监听输入框事件,获取焦点时,输入框背景变成灰色 -->
  <view class="search" :class="{focused: isFocused}">
    <!-- 搜索框 -->
    <view class="input-box">
      <input type="text" @focus="goSearch" :placeholder="placeholder" v-model="keyword" @input="handleQuery" @confirm="handleEnter"/>
      <text class="cancel" @click="handleCancel">取消</text>
    </view>
    <!-- 搜索结果 -->
    <view class="content">
      <div class="title">
        搜索历史
        <span class="clear" @click="handleClear"></span>
      </div>
      <div class="history">
        <navigator :url="'/pages/list/index?kw=' + item" v-for="(item,index) in history" :key="index">{{item}}</navigator>
      </div>
      <!-- 结果 -->
      <scroll-view scroll-y class="result" v-if="qlist.length>0">
        <navigator :url="'/pages/goods/index?id='+item.goods_id" v-for="item in qlist" :key="item.goods_id">{{item.goods_name}}</navigator>
      </scroll-view>
    </view>
  </view>
</template>
<script>
export default {
  data() {
    return {
      isFocused: false,
      placeholder: "",
      qlist:[],
      keyword: '',
      // 缓存历史关键字: 先查询之前的搜索历史,如果没查到,默认为[]
      history: uni.getStorageSync('history') || []
    };
  },
  methods: {
    goSearch() {
      const { windowHeight } = uni.getSystemInfoSync();
      // 将可视区高度传递到父组件
      this.$emit("window-height", { height: windowHeight });

      // 当输入框获取焦点时,在父元素上添加一个类名
      this.isFocused = true;
      this.placeholder = "请输入";
    },
    handleCancel() {
      // 点击取消按钮,搜索栏恢复初始状态
      this.$emit("window-height", { height: "auto" });
      this.isFocused = false;
      // 清除提示信息
      this.placeholder = "";
      // 清空输入的关键字
      this.keyword = '';
      // 清空根据关键字查询的搜索结果
      this.qlist = [];
    },
    // 根据用户输入关键字查询相应结果
    handleQuery(){
      // 通过函数防抖的方式限制接口调用的频率
      clearTimeout(this.timer)
      this.timer = setTimeout(async ()=>{
          const {message} = await this.$request({
          path: 'goods/qsearch?query=' + this.keyword
        })
        this.qlist = message
      },1000) 
    },
    // 监听回车事件
    handleEnter(e){
      // 获取输入框最新的值
      let v = e.detail.value
      this.history.unshift(v)
      // 数组的去重操作
      let arr = [...new Set(this.history)]
      // 更新状态
      this.history = arr
      // 把当前历史关键字进行缓存
      uni.setStorageSync('history',arr)
      // 回车后跳转到列表页面
      uni.navigateTo({
        url: '/pages/list/index?kw=' + v
      })
    },
    // 清空搜索历史
    handleClear(){
      // 清空缓存
      uni.removeStorageSync('history')
      // 清空状态数据
      this.history = []
    }
  }
}
</script>

<style lang="less">
.search {
  .content {
    position: absolute;
    top: 94rpx;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 9;
    background-color: #fff;
    display: none;
    padding: 30rpx;
    .title {
      font-size: 27rpx;
      line-height: 1;
      color: #333;
    }
    .clear {
      display: block;
      width: 27rpx;
      height: 27rpx;
      float: right;
      background-image: url(http://static.botue.com/ugo/images/clear.png);
      background-size: cover;
    }
    .history {
      padding-top: 30rpx;
      navigator {
        display: inline-block;
        line-height: 1;
        padding: 15rpx 20rpx 12rpx;
        background-color: #ddd;
        font-size: 24rpx;
        margin-right: 20rpx;
        margin-bottom: 15rpx;
        color: #333;
      }
    }
    .result {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: #fff;
    navigator {
      line-height: 1;
      padding: 20rpx 30rpx;
      font-size: 24rpx;
      color: #666;
      border-bottom: 1px solid #eee;
      &:last-child {
        border-bottom: none;
      }
    }
  }
}
  .input-box {
    background-color: #ff2d4a;
    padding: 20rpx 16rpx;
    display: flex;
    position: relative;
    input {
      background-color: #fff;
      padding-left: 55rpx;
      height: 60rpx;
      flex: 1;
    }
    .cancel {
      display: none;
    }
    &::before {
      content: "";
      display: none;
      width: 32rpx;
      height: 32rpx;
      position: absolute;
      top: 50%;
      transform: translate(15rpx, -50%);
      background-image: url("http://static.botue.com/ugo/images/icon_search%402x.png");
      background-size: 32rpx;
    }
    &::after {
      content: "搜索";
      position: absolute;
      left: 50%;
      top: 50%;
      padding-left: 40rpx;
      transform: translate(-50%, -50%);
      font-size: 24rpx;
      color: #ccc;
      background-image: url("http://static.botue.com/ugo/images/icon_search%402x.png");
      background-size: 32rpx;
      background-repeat: no-repeat;
    }
  }
  &.focused {
    .content {
      display: block;
    }
    .input-box {
      background-color: #eee;
      &::after {
        display: none;
      }
      &::before {
        display: block;
      }
    }
    .cancel {
      display: block;
      width: 100rpx;
      height: 50rpx;
      line-height: 50rpx;
      text-align: center;
      font-size: 30rpx;
    }
  }
}
</style>
 