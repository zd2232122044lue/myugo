<template>
<!-- 监听输入框事件,获取焦点时,输入框背景变成灰色 -->
  <view class="search" :class="{focused: isFocused}">
    <!-- 搜索框 -->
    <view class="input-box">
      <input type='text' @focus="goSearch"/>
      <text class="cancel" @click="handleCancel">取消</text>
    </view>
    <!-- 搜索结果 -->
    <view class="content"></view>
  </view>
</template>
<script>
export default {
  data () {
    return {
        isFocused: false
    }
  },
  methods:{
      goSearch(){
          // 当输入框获取焦点时,在父元素上添加一个类名
          this.isFocused = true
      },
      handleCancel(){
          // 点击取消按钮,搜索栏恢复初始状态
          this.isFocused = false
      }
  }
}
</script>
<style lang='less'>
  .search {
    .input-box {
      display: flex;
      background-color: #FF2D4A;
      padding: 20rpx 16rpx;
      input {
        background-color: #fff;
        flex: 1;
      }
      .cancel {
          display: none;
      }
    }
    &.focused {
        .input-box {
            background-color: #eee;
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