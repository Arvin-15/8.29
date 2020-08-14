<template>
	<view class="container">
		<!-- 标题栏 -->
		<!-- <view class="navBar">
			<image src="../../favicon.png" class="nav-bar-img"></image>
			<text class="nav-bar-title">菩提慈善</text>
		</view> -->
		<!-- 会员卡购买 -->
		<view class="vip">
			<view class="vip_buy">
				<view class="vip_buy_title">
					会员卡
				</view>
				<view class="vip_buy_line">
				</view>
			</view>
			<view class="vip_card">
				<view  v-for="(item,id) in cardList" :key="id" class="card" @tap="buyCard(item.id,item.name,item.price)">
					<image :src="item.img"></image>
					<text>{{item.description}}</text>
				</view>
			</view>
		</view>
		<!-- 公告栏 -->
		<view class="notice">
			<uni-notice-bar showIcon="true" single="true" scrollable="true" :speed="20"
				backgroundColor="#e7e7e7" :text="notice"></uni-notice-bar>
		</view>
		<!-- 会员套餐 -->
		<view class="suit">
			<view class="suit_item" @click="openPackage('普卡')">
				<view class="sui_title normal_card">普卡套餐</view>
				<view class="product">
					<view class="product-item" @tap="">
						<image class="product-img" src="../../static/banner/4.jpeg"></image>
						<text class="product-title">理疗腰带</text>
						<text class="product-price">¥1300</text>
					</view>
					<view class="product-item" @tap="">
						<image class="product-img" src="../../static/banner/14.jpeg"></image>
						<text class="product-title">护膝</text>
						<text class="product-price">¥1800</text>
					</view>
					<view class="product-item" @tap="">
						<image class="product-img" src="../../static/banner/18.jpeg"></image>
						<text class="product-title">太阳镜</text>
						<text class="product-price">¥2800</text>
					</view>
				</view>
			</view>
			<view class="suit_item" @click="openPackage('银卡')">
				<view class="sui_title sliver_card">银卡套餐</view>
				<view class="product">
					<view class="product-item" @tap="">
						<image class="product-img" src="../../static/banner/15.jpeg"></image>
						<text class="product-title">负离子眼镜</text>
						<text class="product-price">¥1500</text>
					</view>
					<view class="product-item" @tap="">
						<image class="product-img" src="../../static/banner/26.jpeg"></image>
						<text class="product-title">磁疗枕</text>
						<text class="product-price">¥3500</text>
					</view>
					<view class="product-item" @tap="">
						<image class="product-img" src="../../static/banner/18.jpeg"></image>
						<text class="product-title">太阳镜</text>
						<text class="product-price">¥2800</text>
					</view>
				</view>
			</view>
			<view class="suit_item" @click="openPackage('金卡')">
				<view class="sui_title gold_card">金卡套餐</view>
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
		</view>
		<!-- 项目介绍 -->
		<view class="introduce">
			<view class="vip_buy">
				<view class="vip_buy_title">
					莱旭生物科技
				</view>
				<view class="vip_buy_line">
				</view>
			</view>
			<view class="content">
				陕西莱旭生物科技有限公司是一家集研发，生产，经营为一体的高新技术企业，坐落于关中平原城市群核心城市，丝绸之路起点城市，“一带一路”核心区，中国西部地区重要的中心城市，国家重要的科研，教育，工业基地，四大文明古都之一的西安。
			</view>
			<view class="content">
				公司成立于2017年，注册资金300万人民币，由陕西西安工商局核准注册的具有独立法人资格的企业。莱旭量子超前的形象思维，充满活力和凝聚力。我们坚持“以大健康为基础，以质量求生存，以服务求信誉，以信誉求发展”为宗旨，尽力为所需要的客户提供更优秀的服务。
			</view>
			<view class="content">
				我们的目标是要在健康的路上顺便把钱挣了，不要在追求财富的路上把健康丢了!
			</view>
		</view>
		<!-- 空白行 -->
		<view class="white-line">
		</view>
	</view>
</template>

<script>
	import QitListScroll from '@/components/Qit-list/Qit-list-scroll.vue'
	import {MEMBER_LIST,NEWS_LIST,BANNER_LIST} from '../../api/index.js';
	import {SUCCESS} from '../../api/errorcode.js';
	export default {
		components: {
			QitListScroll
		},
		data() {
			return {
				user:uni.getStorageSync("user"),
				cardList:[],
				bannerList:[],
				indicatorDots: false,
				autoplay: true,
				interval: 4000,
				duration: 1000,
				notice:'菩提慈善筹备平台正式启动!!!!'
			}
		},
		created() {
			this.user=uni.getStorageSync("user");
			this.initBannerList();//加载轮播图列表
			this.initCardList();//加载会员卡列表
		},
		methods: {
			openPackage(type){
				uni.navigateTo({
					url:"/pages/package/package?type="+type
				})
			},
			validState(){
				if(!this.user.id){
					return false;
				}else{
					return true;
				}
			},
			initCardList(){
				let _this = this;
				//加载会员卡信息列表
				uni.request({
					url:MEMBER_LIST,
					header:{
						'ACCESS-CONTROL-ALLOW-TOKEN':uni.getStorageSync(_this.sessionKey)
					},
					success:function(res){
						console.log("==会员卡信息:");
						console.log(res.data);
						_this.cardList=res.data.memberVOList;
					}
				})
			},
			initBannerList(){
				let _this = this;
				//加载轮播图列表
				uni.request({
					url:BANNER_LIST,
					header:{
						'ACCESS-CONTROL-ALLOW-TOKEN':uni.getStorageSync(_this.sessionKey)
					},
					success:function(res){
						console.log("轮播图列表:");
						console.log(res.data);
						_this.bannerList = res.data.bannerList;
					}
				})
			},
			buyCard(id,name,money){
				if(!this.validState()){
					return uni.showToast({
						title:"请您先登录",
						icon:"none"
					})
				}
				uni.showModal({
					title:'提示',
					content:'确认要购买' + name + '吗?',
					cancelText:"取消",
					showCancel:true,
					success:function(res){
						if(res.confirm){
							uni.navigateTo({
								url:"/pages/pay-methods/pay-methods?id="+id+"&money="+money
							})
						}
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		display: flex;
		flex-direction: column;
	}

	.navBar {
		height: 100upx;
	}

	.swiper {
		height: 380upx;
	}

	.swiper-item {
		height: 100%;
	}

	.swiper-item image {
		max-height: 100%;
	}

	.nav-bar-img {
		width: 60upx;
		height: 60upx;
	}

	.nav-bar-title {
		font-size: 60upx;
	}

	.vip {
		margin-top: 10upx;
		background-color: white;
	}
	.active{
		margin-top: 0upx!important;
	}

	.vip_buy {
		position: relative;
		height: 50upx;
	}

	.vip_buy_line {
		position: absolute;
		height: 1px;
		width: 375upx;
		background-color: #ccc;
		top: 50%;
		margin-top: -0.5px;
		left: 50%;
		margin-left: -185upx;
	}

	.vip_buy_title {
		position: absolute;
		background-color: white;
		left: 50%;
		transform: translateX(-50%);
		z-index: 99;
		padding: 2px 5px;
		color: grey;
	}

	.swiper-title {
		position: absolute;
		bottom: 0;
		background-color: rgba(0, 0, 0, 0.4);
		color: white;
		text-align: left;
		width: 100%;
		text-indent: 1em;
		padding: 7upx 0;
	}

	.vip_card,.vip_activity {
		display: flex;
		justify-content: space-around;
	}
	
	.vip_activity .activity{
		width: 120upx;
		height: 120upx;
		text-align: center;
	}
	.activity image{
		width: 80upx;
		height: 80upx;
	}
	
	.card {
		width: 250upx;
		height: 150upx;
		align-items: center;
		justify-content: center;
		transform: scale(0.9);
		text-align: center;
	}
	
	.card image{
		width: 100%;
		height:100%;
	}

	.list {
		position: relative;
	}

	.cu-bar.fixed,
	.nav.fixed {
		position: absolute !important;
	}

	.text-ellipsis2 {
		font-size: 34upx;
		padding: 30upx 0upx 30upx 15upx;
	}

	/* 	.basic{
		width: 200upx;
		height: 50upx;
		line-height: 50upx;
		max-height: 80%;
		vertical-align: middle;
	} */
	.solid-bottom {
		height: 180upx;
	}

	.cu-item {
		border-bottom: 1px solid #eee;
		padding: 2px 15px;
	}
	.notice{
		position: relative;
		width: 100%;
		margin: 50upx auto 5upx;
	}
	.introduce{
		width:96%;
		margin: auto;
		border:1px solid #eee;
		border-radius: 5px;
	}
	.content{
		font-size: 30upx;
		word-spacing: 1.8;
		line-height: 1.3;
		margin: 20upx 15upx;
		text-indent: 1em;
	}
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
	.white-line{
		height: 100upx;
	}
</style>
