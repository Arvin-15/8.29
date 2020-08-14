<template>
	<view>
		<view class="suit_item">
			<view class="sui_title">{{type}}套餐A</view>
			<view class="product">
				<view class="product-item" @tap="">
					<image class="product-img" src="../../static/banner/19.jpeg"></image>
					<text class="product-title">空气净化器</text>
					<text class="product-price">¥4300</text>
				</view>
				<view class="product-item" @tap="">
					<image class="product-img" src="../../static/banner/14.jpeg"></image>
					<text class="product-title">护膝</text>
					<text class="product-price">¥1800</text>
				</view>
				<view class="product-item" @tap="">
					<image class="product-img" src="../../static/banner/7.jpeg"></image>
					<text class="product-title">生物桶</text>
					<text class="product-price">¥6300</text>
				</view>
			</view>
		</view>
		<view class="suit_item">
			<view class="sui_title">{{type}}套餐B</view>
			<view class="product">
				<view class="product-item" @tap="">
					<image class="product-img" src="../../static/banner/19.jpeg"></image>
					<text class="product-title">太阳镜</text>
					<text class="product-price">¥1298</text>
				</view>
				<view class="product-item" @tap="">
					<image class="product-img" src="../../static/banner/14.jpeg"></image>
					<text class="product-title">量子喷壶</text>
					<text class="product-price">¥568</text>
				</view>
				<view class="product-item" @tap="">
					<image class="product-img" src="../../static/banner/7.jpeg"></image>
					<text class="product-title">生物桶</text>
					<text class="product-price">¥6300</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				user:uni.getStorageSync("user") || {}
			}
		},
		onLoad(opt) {
			console.log(this.user);
		},
		methods: {
			
		}
	}
</script>

<style lang="scss" scoped>
.suit_item{
		width:96%;
		border:1px solid #eee;
		border-radius: 5px;
		margin: 5upx auto 15upx;
	}
	.sui_title{
		margin-top: 10upx;
		text-align: center;
		font-weight: bold;
		font-size: 36upx;
		&.normal_card{
			color: #FD6801;
			text-shadow: 0 0 3upx #FD6801;
		}
		&.sliver_card{
			color: #c0c0c0;
			text-shadow: 0 0 3upx #C0C0C0;
		}
		&.gold_card{
			color: gold;
			text-shadow: 0 0 3upx gold;
		}
	}
	.product{
		display: flex;
		flex-direction: row;
	}
	.product-item {
		width: 33%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		margin-bottom: 20upx;
	
		.product-img {
			width: 150upx;
			height: 115upx;
			margin-bottom: 10upx;
		}
	
		.product-title {
			font-size: 28upx;
			font-weight: bold;
		}
		
		.product-price{
			color: red;
		}
	}
</style>
