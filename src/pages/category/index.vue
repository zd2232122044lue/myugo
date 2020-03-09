<template>
  <view>
    <!-- 搜索 -->
    <search />
    <!-- 分类 -->
    <view class="category">
      <!-- 顶级分类 -->
      <view class="sup">
        <scroll-view scroll-y @click="handleChange">
          <text v-for="item in categories" :key="item.cat_id" :class="{active: currentId===item.cat_id}" :data-id="item.cat_id">{{item.cat_name}}</text>
        </scroll-view>
      </view>
      <!-- 子级分类 -->
      <view class="sub">
        <scroll-view scroll-y>
          <!-- 封面图 -->
          <image src="http://static.botue.com/ugo/uploads/category.png" class="thumb"></image>
          <view class="children" v-for="item in rightData" :key="item.cat_id">
            <view class="title">{{item.cat_name}}</view>
            <!-- 品牌 -->
            <view class="brands">
              <navigator url="/pages/list/index"  v-for="brand in item.children" :key="brand.cat_id">
                <image :src="brand.cat_icon"></image>
                <text>{{brand.cat_name}}</text>
              </navigator>
            </view>
          </view>
        </scroll-view>
      </view>
    </view>
  </view>
</template>

<script>
  import search from '@/components/search';

  export default { 
    components: {
      search
    },
    data(){
      return{
        // 分类所有数据
        categories: [],
        // 当前选中的分类id
        currentId: 1
      }
    },
    // 因为从接口中获取的是分类的全部数据,所以用计算属性筛选出右侧模板数据
    // 计算属性会对已有的数据进行缓存,而且这里边控制着id,所以点击左侧,右侧数据会相应改变
    computed:{
      rightData(){
        // 根据当前选中的一级分类id计算出二级和三级分类的数据
        const data = this.categories.filter(item=>{
          return item.cat_id === this.currentId
        })
        // []作为条件结果是true
        // data[0]如果为真,返回值,否则返回空数组
        return data[0] ? data[0].children : []
      }
    },
    onLoad(){
      this.loadData()
    },
    methods:{
      // 获取分类数据
      async loadData(){
        const {message} = await this.$request({
          path: 'categories'
        })
        this.categories = message
      },
      // 实现左侧样式切换
      handleChange(e){
        // 控制一级分类的切换 
        this.currentId = e.target.dataset.id
      }
    }
  }
</script>

<style scoped lang="less">
  scroll-view {
    height: 100%;
  }

  .category {
    display: flex;
    width: 100%;
    position: absolute;
    top: 100rpx;
    bottom: 0;

    .sup {
      width: 196rpx;
      background-color: #f4f4f4;

      text {
        display: block;
        height: 100rpx;
        text-align: center;
        line-height: 100rpx;
        font-size: 27rpx;
        color: #333;
        border-bottom: 1rpx solid #eee;

        &:last-child {
          border-bottom: none;
        }
        
        &.active {
          background-color: #FFF;
          color: #ea4451;
          position: relative;

          &::before {
            content: '';
            display: block;
            width: 8rpx;
            height: 60rpx;
            transform: translateY(-50%);
            background-color: #ea4451;

            position: absolute;
            left: 0;
            top: 50%;
          }
        }
      }
    }

    .sub {
      flex: 1;
      padding: 20rpx 18rpx;

      .thumb {
        width: 100%;
        height: 180rpx;
      }

      .children {
        text-align: center;
        color: #333;

        .title {
          display: inline-block;
          margin: 40rpx 0 20rpx;
          font-size: 30rpx;

          &::before {
            content: '/';
            margin-right: 20rpx;
            color: #666;
          }

          &::after {
            content: '/';
            margin-left: 20rpx;
            color: #666;
          }
        }
      }

      .brands {
        display: flex;
        flex-wrap: wrap;

        navigator {
          width: 33%;
          margin-bottom: 20rpx;
        }

        image {
          width: 120rpx;
          height: 120rpx;
        }

        text {
          display: block;
          font-size: 24rpx;
        }
      }
    }
  }
</style>
