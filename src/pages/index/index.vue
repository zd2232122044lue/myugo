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
			<!-- 时尚女装 -->
			<view class="floor">
				<!-- 标题 -->
				<view class="title">
					<image src="/static/uploads/pic_floor01_title.png" />
				</view>
				<!-- 列表 -->
				<view class="items">
					<navigator url="">
						<image src="/static/uploads/pic_floor01_1@2x.png" />
					</navigator>
					<navigator url="">
						<image src="/static/uploads/pic_floor01_2@2x.png" />
					</navigator>
					<navigator url="">
						<image src="/static/uploads/pic_floor01_3@2x.png" />
					</navigator>
					<navigator url="">
						<image src="/static/uploads/pic_floor01_4@2x.png" />
					</navigator>
					<navigator url="">
						<image src="/static/uploads/pic_floor01_5@2x.png" />
					</navigator>
				</view>
			</view>
			<!-- 户外运动 -->
			<view class="floor">
				<!-- 标题 -->
				<view class="title">
					<image src="/static/uploads/pic_floor02_title.png" />
				</view>
				<!-- 列表 -->
				<view class="items">
					<navigator url="">
						<image src="/static/uploads/pic_floor02_1@2x.png" />
					</navigator>
					<navigator url="">
						<image src="/static/uploads/pic_floor02_2@2x.png" />
					</navigator>
					<navigator url="">
						<image src="/static/uploads/pic_floor02_3@2x.png" />
					</navigator>
					<navigator url="">
						<image src="/static/uploads/pic_floor02_4@2x.png" />
					</navigator>
					<navigator url="">
						<image src="/static/uploads/pic_floor02_5@2x.png" />
					</navigator>
				</view>
			</view>
			<!-- 箱包配饰 -->
			<view class="floor">
				<!-- 标题 -->
				<view class="title">
					<image src="/static/uploads/pic_floor03_title.png" />
				</view>
				<!-- 列表 -->
				<view class="items">
					<navigator url="">
						<image src="/static/uploads/pic_floor03_1@2x.png" />
					</navigator>
					<navigator url="">
						<image src="/static/uploads/pic_floor03_2@2x.png" />
					</navigator>
					<navigator url="">
						<image src="/static/uploads/pic_floor03_3@2x.png" />
					</navigator>
					<navigator url="">
						<image src="/static/uploads/pic_floor03_4@2x.png" />
					</navigator>
					<navigator url="">
						<image src="/static/uploads/pic_floor03_5@2x.png" />
					</navigator>
				</view>
			</view>
		</view>
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
				navsData: []
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
		},
		methods: {
			// 防止搜索栏遮罩层滚动
			handleWindowHeight(data){
				this.pageHeight = data.height+'px'
			},
			// 获取轮播图数据
			querySwiperData(){
				wx.request({
					url: 'https://api-ugo-dev.itheima.net/api/public/v1/home/swiperdata',
					success: (res) => {
						this.swiperData = res.data.message
					}
				})
			},
			// 获取导航菜单数据
			queryNavsData(){
				wx.request({
					url: 'https://api-ugo-dev.itheima.net/api/public/v1/home/catitems',
					success: (res) => {
						this.navsData = res.data.message
					}
				})
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
</style>
