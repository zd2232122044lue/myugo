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
</style>
