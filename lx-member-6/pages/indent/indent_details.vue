<template>
	<view class="containt">
		<view class="site">
			<image class="site_pic" src="../../static/location.png" mode=""></image>
			<view class="site_detail">
					小王<text class="phone">13288888888</text>
					<view class="">地址陕西省</view>
			</view>
		</view>
		<view class="main">
			<view class="content">
				<image class="pic" src="../../static/goods/p3.jpg" mode=""></image>
				<view class="details">
					<view class="details_1">
						<view class="goods_name">商品名称商品名称商品名称商品名称商品名称商品名称商品名称</view>
						<view class="money">￥20000</view>
					</view>
				<!-- 	<view class="details_2">
						<text class="size">尺寸</text>
						<text class="quantity">x1</text>
					</view> -->
				</view>
			</view>
			<view class="money">
				<view class="total_price">商品总价￥2000.00</view>
				<view class="out_of_pocket">实付款￥1980.00</view>
			</view>
		</view>
		<view class="orderInfo">
			<view class="title">订单信息</view>
			<view class="">
				<view class="info_detail">订单编号：</view>
				12345432342
			</view>
			<view class="">
				<view class="info_detail">支付宝交易账号：</view>
				67890987654
			</view>
			<view class="">
				<view class="info_detail">创建时间：</view>
				67890987654
			</view>
			<view class="">
				<view class="info_detail">发货时间：</view>
				67890987654
			</view>
			<view class="">
				<view class="info_detail">成交时间：</view>
				67890987654
			</view>
		</view>
	</view>
</template>

<script></script>

<style>
	.site{
		height:100upx ;
	}
.site_pic {
	height: 100upx;
	width: 100upx;
	display: inline-block;
	overflow: hidden;
	float: left;
}
.site_detail {
	height: 110upx;
	margin-left: 20upx;
	display: inline-block;
	float: left;
}
.phone{
	margin-left: 40upx;
}
.main {
	padding: 20upx;
	overflow: hidden;
	margin: 20upx;
	/* border: 1px solid #e5e5e5; */
	font-size: 50upx;
	/* box-shadow:0 0 5px rgba(0,0,0,0.3); */
}
.content {
	/* border-bottom: #8799a3 solid 1px; */
	margin-bottom: 20upx;
}
.pic {
	border-radius: 10px;
	height: 180upx;
	width: 180upx;
	display: inline-block;
}
.details {
	display: inline-block;
	float: right;
}
.goods_name {
	display: inline-block;
	margin-right: 50upx;
	width: 300upx;
	height: 100upx;
	float: left;
	overflow: hidden;
}
.money {
	display: inline-block;
	float: right;
}
.details_1 {
	display: inline-block;
}

.quantity {
	float: right;
}
.orderInfo {
	margin: 20upx;
}
.title {
	font-size: 18px;
}
.info_detail {
	display: inline-block;
	width: 260upx;
	padding-top: 5upx;
	padding-bottom: 5upx;
}
</style>
