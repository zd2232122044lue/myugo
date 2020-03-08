<template>
	<view class="container">
		<!-- 搜索栏 -->
		<view class="search">
			<!-- 搜索栏标签 -->
			<view class="input-box">
				<input type="text" name="" id="">
			</view>
			<!-- 搜索的结果 -->
			<view class="content"></view>
		</view>

		<!-- 轮播图 -->
		<swiper indicator-dots>
			<swiper-item>
				<image src="/static/uploads/banner1.png">
			</swiper-item>
			<swiper-item>
				<image src="/static/uploads/banner2.png">
			</swiper-item>
			<swiper-item>
				<image src="/static/uploads/banner3.png">
			</swiper-item>
		</swiper>

		<!-- 导航菜单 -->
		<view class="navs">
			<navigator url="">
				<image src="/static/uploads/icon_index_nav_1@2x.png" />
			</navigator>
			<navigator url="">
				<image src="/static/uploads/icon_index_nav_2@2x.png" />
			</navigator>
			<navigator url="">
				<image src="/static/uploads/icon_index_nav_3@2x.png" />
			</navigator>
			<navigator url="">
				<image src="/static/uploads/icon_index_nav_4@2x.png" />
			</navigator>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello'
			}
		},
		onLoad() {

		},
		methods: {

		}
	}
</script>

<style lang="less">
	.search {
		.input-box {
			background-color: #FF2D4A;
			padding: 20rpx 16rpx;
			input {
				background-color: #fff;
			}
		}
	}
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
</style>
