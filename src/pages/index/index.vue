<template>
	<view class="container" :style="{height: pageHeight,overflow: 'hidden'}">
		<!-- 搜索栏 -->
			<!-- 使用组件 -->
		<search @window-height="handleWindowHeight"/>

		<!-- 轮播图 -->
		<swiper indicator-dots>
			<swiper-item v-for="item in swiperData" :key="item.goods_id">
				<image :src="item.image_src">
			</swiper-item>
		</swiper>

		<!-- 导航菜单 -->
		<view class="navs">
			<navigator url="" v-for="(item,index) in navsData" :key="index">
				<image :src="item.image_src" />
			</navigator>
		</view>

		<!-- 楼层商品 -->
		<view class="floors">
			<view class="floor" v-for="(item,index) in floorsData" :key="index">
				<!-- 标题 -->
				<view class="title">
					<image :src="item.floor_title.image_src" />
				</view>
				<!-- 列表 -->
				<view class="items">
					<navigator url="" v-for="(img,i) in item.product_list" :key="i">
						<image :src="img.image_src" />
					</navigator>
				</view>
			</view>
		</view>

		<!-- 回到顶部按钮 -->
		<view class="goTop icon-top" v-if="scrollTop > 200" @click="goTop"></view>
	</view>
</template>

<script>
// 导入组件
import search from "@/components/search"
	export default {
		data() {
			return {
				title: 'Hello',
				pageHeight: 'auto',
				swiperData: [],
				navsData: [],
				floorsData: [],
				// 页面滚动的距离
				scrollTop: 0
			}
		},
		// 注册组件
		components:{
			search
		},
		onLoad() {
			// 获取轮播图数据
			this.querySwiperData()
			// 获取导航菜单数据
			this.queryNavsData()
			// 获取楼层商品数据
			this.queryFloorsData()
		},
		// 监听页面的滚动
		onPageScroll(e){
			// 获取页面滚动的距离
			this.scrollTop = e.scrollTop
		},
		methods: {
			// 点击按钮实现回到顶部功能
			goTop(){
				// 调用api,将页面滚动到顶部
				uni.pageScrollTo({scrollTop:0})
			},

			// 防止搜索栏遮罩层滚动
			handleWindowHeight(data){
				this.pageHeight = data.height+'px'
			},

			// 获取轮播图数据
			async querySwiperData(){
				const {message} = await this.$request({
					path: 'home/swiperdata'
				})
				this.swiperData = message

				// // 使用插件方法一
				// this.request()
				// // 使用插件方法二
				//this.$request()

				// wx.request({
				// 	url: 'https://api-ugo-dev.itheima.net/api/public/v1/home/swiperdata',
				// 	success: (res) => {
				// 		this.swiperData = res.data.message
				// 	}
				// })
			},
			// 获取导航菜单数据
			async queryNavsData(){
				const {message} = await this.$request({
					path: 'home/catitems'
				})
				this.navsData = message

				// wx.request({
				// 	url: 'https://api-ugo-dev.itheima.net/api/public/v1/home/catitems',
				// 	success: (res) => {
				// 		this.navsData = res.data.message
				// 	}
				// })
			},
			// 获取楼层商品数据
			async queryFloorsData(){
				const {message} = await this.$request({
					path: 'home/floordata'
				})
				this.floorsData = message

				// wx.request({
				// 	url: 'https://api-ugo-dev.itheima.net/api/public/v1/home/floordata',
				// 	success: (res) => {
				// 		this.floorsData = res.data.message
				// 	}
				// })
			},
		}
	}
</script>

<style lang="less">
	
	swiper {
		height: 340rpx;
		image {
			width: 750rpx;
			height: 340rpx;
		}
	}
	.navs {
		display: flex;
		// 项目位于各行之间留有空白的容器内
		justify-content: space-between;
		// 居中
		align-items: center;
		padding: 0 30rpx;
		height: 180rpx;
		navigator {
			width: 128rpx;
			height: 140rpx;
		}
	}
	.floor {
		.title {
			width: 750rpx;
			height: 60rpx;
			padding: 20rpx 0 0 10rpx;
			background-color: #F4F4F4;
			box-sizing: border-box;
		}
		.items {
			padding: 20rpx 16rpx;
			// 解决塌陷问题
			overflow: hidden;
			navigator {
				float: left;
				padding-left: 10rpx;
				&:first-child {
					width: 232rpx;
					height: 386rpx;
					padding-left: 0;
				}
				&:nth-child(2),
				&:nth-child(5){
					width: 273rpx;
					height: 188rpx;
				}
				&:nth-child(3),
				&:nth-child(4){
					width: 193rpx;
					height: 188rpx;
				}
				// 五个图片中,倒数第一个和倒数第二个
				&:nth-last-child(-n+2){
					padding-top: 10rpx;
				}
			}
		}
		&:first-child {
			.items {
				navigator {
				width: 232rpx;
				height: 188rpx;
				&:first-child {
					width: 232rpx;
					height: 386rpx;
					}
				}
			}
		}
	}
	.goTop {
    position: fixed;
    bottom: 30rpx;
    right: 30rpx;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100rpx;
    height: 100rpx;
    font-size: 48rpx;
    color: #666;
    border-radius: 50%;
    background-color: rgba(255, 255, 255, 0.8);
	}
</style>
