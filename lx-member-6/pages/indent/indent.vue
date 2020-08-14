<template>
	<view class="containt" @tap="datails">
		<view class="">
			下单时间：
			
		</view>
		<view class="content">
			<image class="pic" src="../../static/goods/p3.jpg" mode=""></image>
			<view class="details">				
					<view class="goods_name">
						商品名称商品名称商品名称商品名称商品名称商品名称商品名称
					</view>				
				<view class="money">￥20000 </view>				
			</view>
		</view>
		<view class="money">
			<text class="total_price">总价￥2000.00</text>
			<text class="out_of_pocket">实付款￥1980.00</text>			
		</view>
		
	</view>
	
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			datails() {
				uni.navigateTo({
					url:"./indent_details"
				})
			}
		}
	}
</script>

<style>
.containt{
		padding: 20upx;
		overflow: hidden;
		margin: 20upx;
		border: 1px solid #e5e5e5;
		font-size: 50upx;
		border-radius: 10px;
		/* box-shadow:0 0 5px rgba(0,0,0,0.3); */
	}
.content {
	border-bottom: #8799A3 solid 1px;
	margin-bottom: 20upx;
}
.pic{
	border-radius: 10px;
	height: 180upx;
	width: 180upx;
	display: inline-block;
}
.details{
	display: inline-block;
	float: right;
}
.goods_name{
	display: inline-block;
	margin-right: 50upx;
	width: 300upx;
	height: 100upx;
	float: left;
	overflow: hidden;
}
.money{
	display: inline-block;
	float: right;
}
.out_of_pocket{
	margin-left: 10upx;
}
</style>
