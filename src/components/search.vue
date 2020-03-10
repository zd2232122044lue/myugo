<template>
  <!-- 监听输入框事件,获取焦点时,输入框背景变成灰色 -->
  <view class="search" :class="{focused: isFocused}">
    <!-- 搜索框 -->
    <view class="input-box">
      <input type="text" @focus="goSearch" :placeholder="placeholder" v-model="keyword" @input="handleQuery" @confirm="goList"/>
      <text class="cancel" @click="handleCancel">取消</text>
    </view>
    <!-- 搜索结果 -->
    <view class="content">
      <div class="title">
        搜索历史
        <span class="clear"></span>
      </div>
      <div class="history">
        <navigator url>小米</navigator>
        <navigator url>大米</navigator>
        <navigator url>红米</navigator>
      </div>
      <!-- 结果 -->
      <scroll-view scroll-y class="result" v-if="qlist.length>0">
        <navigator url='' v-for="item in qlist" :key="item.goods_id">{{item.goods_name}}</navigator>
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
      keyword: ''
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
    async handleQuery(){
      const {message} = await this.$request({
        path: 'goods/qsearch?query=' + this.keyword
      })
      this.qlist = message
    }
  }
};
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
 