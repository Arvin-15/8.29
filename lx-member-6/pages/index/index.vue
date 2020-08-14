<template>
	<view class="container">
		<!-- 头部信息 -->
		<view class="header">
			<view class="logo"><image src="../../favicon.png"></image></view>
			<view class="information">
				<view class="information1">
					<text class="one">昵称：{{ user.nickname }}</text>
					<text class="two">推广：{{ user.promote || 0 }}人</text>
				</view>
				<view class="information2">
					<text class="one">手机：{{ user.phone || '未登录' }}</text>
					<text class="two">状态：{{ user.isPayValidation == 'Y' ? '已认证' : '未认证' }}</text>
				</view>
				<view class="btngroup"><button type="default" class="validation" v-if="user.isPayValidation != 'Y'" @click="open('/pages/bdocr/bdocres')">立即认证</button></view>
			</view>
		</view>
		<!-- 会员卡购买 -->
		<view class="vip">
			<view class="vip_buy">
				<view class="vip_buy_title">会员卡</view>
				<view class="vip_buy_line"></view>
			</view>

			<view class="vip_card">
				<view v-for="(item, id) in cardList" :key="id" class="card" @tap="buyCard(item.id, item.name, item.price, item.img)">
					<image :src="item.img"></image>
					<text>{{ item.description }}</text>
				</view>
			</view>
			<!-- <view @tap="buy">
				<navigator :url='"/pages/order/order?id="+goodsData.id+"&number="+goodsData.number+"&money="+goodsData.price' class="buy">立即购买</navigator>
			</view> -->
		</view>
		<!-- 首页菜单 -->
		<view class="menu">
			<view class="menu_wrap">
				<view class="menu_item" @click="open('/pages/draw/draw')">
					<image src="../../static/index2/cj.png" class="menu_icon"></image>
					<view class="menu_title">公益箱</view>
				</view>
			</view>
			<view class="menu_wrap">
				<view class="menu_item" @click="open('/pages/help/help')">
					<image src="../../static/index2/cs.png" class="menu_icon"></image>
					<view class="menu_title">慈善帮扶</view>
				</view>
			</view>
			<view class="menu_wrap">
				<view class="menu_item" @click="open('/pages/publish/publish')">
					<image src="../../static/index2/gg.png" class="menu_icon"></image>
					<view class="menu_title">最新公告</view>
				</view>
			</view>
			<view class="menu_wrap">
				<view class="menu_item" @click="open('/pages/feedback/feedback')">
					<image src="../../static/index2/fk.png" class="menu_icon"></image>
					<view class="menu_title">意见反馈</view>
				</view>
			</view>
			<view class="menu_wrap">
				<view class="menu_item" @click="open('/pages/share/share')">
					<image src="../../static/index2/zm.png" class="menu_icon"></image>
					<view class="menu_title">好友推广</view>
				</view>
			</view>
			<view class="menu_wrap">
				<view class="menu_item" @click="exit">
					<image src="../../static/index2/zx.png" class="menu_icon"></image>
					<view class="menu_title">退出登录</view>
				</view>
			</view>
		</view>
		<!-- 轮播图 -->
		<view class="banner">
			<view class="page-section swiper">
				<view class="page-section-spacing">
					<swiper class="swiper" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration">
						<swiper-item v-for="(item, index) in bannerList" :key="index">
							<view class="swiper-item"><image :src="item.img"></image></view>
							<text class="swiper-title">{{ item.title }}</text>
						</swiper-item>
					</swiper>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import { MEMBER_LIST, NEWS_LIST, BANNER_LIST, EXIT, CARTDELETE } from '../../api/index.js';
import { SUCCESS } from '../../api/errorcode.js';
export default {
	components: {},
	data() {
		return {
			user: uni.getStorageSync('user') || {},
			cardList: [],
			bannerList: [],
			indicatorDots: false,
			autoplay: true,
			interval: 4000,
			duration: 1000,
			notice: '菩提慈善筹备平台正式启动!!!!'
		};
	},
	onShow() {
		console.log('===onShow(index)===');
		this.user = uni.getStorageSync('user');
		console.log(this.user);
	},
	created() {
		console.log('===created(index)===');
		this.initBannerList(); //加载轮播图列表
		this.initCardList(); //加载会员卡列表
	},
	methods: {
		exit() {
			if (!uni.getStorageSync('user')) return false;
			uni.showModal({
				title: '提示',
				content: '确认要退出当前账号?',
				success: async res => {
					if (res.confirm) {
						// 防止重复请求
						if (Object.keys(this.user).length == 0) return false;
						const { data: res } = await this.$http({
							url: EXIT + '/' + this.user.id
						});
						if (res.code !== SUCCESS) return false;
						uni.clearStorageSync();
						uni.switchTab({
							url: '/pages/mine/mine'
						});
					} 
				}
			});
			// let _this = this;
			// uni.showModal({
			//     title: '提示',
			//     content: '确认要退出当前账号?',
			//     success: function (res) {
			//         if (res.confirm) {
			// 			// 防止重复请求
			// 			if(Object.keys(_this.user).length==0) return false
			//             uni.request({
			//             	url:EXIT+"/"+_this.user.id,
			// 							header:{
			// 								'ACCESS-CONTROL-ALLOW-TOKEN':uni.getStorageSync(_this.sessionKey)
			// 							},
			//             	method:"GET",
			//             	complete: function(res){
			//             		console.log("===退出登录===")
			//             		console.log(res);
			//             		if(res.data.code==SUCCESS){
			// 						// 网络清空购物车
			// 						// _this.entryCartList()
			//             			uni.removeStorageSync(_this.sessionKey);
			//             			uni.removeStorageSync("user");
			//             			_this.user = {};//用户信息置空
			//             			// 清空购物车
			//             			uni.setStorageSync('cart',[])
			//             			uni.switchTab({
			//             				url:'/pages/mine/mine'
			//             			})
			//             		}
			//             	}
			//             })
			//         } else if (res.cancel) {
			//             console.log('用户点击取消');
			//         }
			//     }
			// });
		},
		open(url) {
			if (!this.validState()) {
				url = '/pages/login/login';
			}
			// if(this.user.isPayValidation!='Y'){
			// 	uni.showToast({
			// 		title:"请您先认证账号",
			// 		icon:"none"
			// 	})
			// 	return;
			// }
			uni.navigateTo({
				url: url
			});
		},
		// open2(url){
		// 	if (!this.validState()) {
		// 		url = "/pages/login/login";
		// 	}
		// 	uni.navigateTo({
		// 		url: url
		// 	})
		// },
		validState() {
			if (!this.user.id) {
				return false;
			} else {
				return true;
			}
		},
		initCardList() {
			let _this = this;
			//加载会员卡信息列表
			uni.request({
				url: MEMBER_LIST,
				header: {
					'ACCESS-CONTROL-ALLOW-TOKEN': uni.getStorageSync(_this.sessionKey)
				},
				success: function(res) {
					// console.log("==会员卡信息:");
					// console.log(res.data);
					_this.cardList = res.data.memberVOList;
					// console.log(_this.cardList);
				}
			});
		},
		initBannerList() {
			let _this = this;
			//加载轮播图列表
			uni.request({
				url: BANNER_LIST,
				header: {
					'ACCESS-CONTROL-ALLOW-TOKEN': uni.getStorageSync(_this.sessionKey)
				},
				success: function(res) {
					// console.log("轮播图列表:");
					// console.log(res.data);
					_this.bannerList = res.data.bannerList;
				}
			});
		},
		buyCard(id, name, money, img) {
			if (!this.validState()) {
				uni.showToast({
					title: '请您登录后购买',
					icon: 'loading'
				});
				return false;
			}
			// if (!this.validState()) {
			// 	// let url = "/pages/login/login";
			// 	let url = "/pages/order/order";
			// 	uni.navigateTo({
			// 		url
			// 	})
			// 	return;
			// }
			// if(this.user.isPayValidation!='Y'){
			// 	uni.showToast({
			// 		title:"请您先认证账号",
			// 		icon:"none"
			// 	})
			// 	return;
			// }
			// id, name, money,img
			// 会员卡信息
			let vip = {
				// 	会员卡id
				id,
				// 会员卡名称
				title: name,
				// 	会员卡数量
				count: 1,
				// 	会员卡图片
				url: img,
				// 	会员卡价格
				price: money,
				// 区分会员卡和商品的类型
				type: 'membershipCard'
			};
			uni.showModal({
				title: '提示',
				content: '确认要购买' + name + '吗?',
				cancelText: '取消',
				showCancel: true,
				success: function(res) {
					if (res.confirm) {
						uni.navigateTo({
							url: `/pages/order/order?params=${JSON.stringify(vip)}`
						});
					}
				}
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.container {
	display: flex;
	flex-direction: column;
}

.header {
	display: flex;
	vertical-align: top;

	.logo {
		flex: 1.2;
		text-align: center;

		image {
			width: 166upx;
			height: 166upx;
		}
	}

	.information {
		flex: 4;

		.information1,
		.information2 {
			font-size: 32upx;
			display: flex;
			padding-left: 10upx;
		}

		.one {
			flex: 2;
		}

		.two {
			flex: 1.3;
		}
	}

	.validation {
		// float: right;
		width: 97%;
		color: white;
		background-color: #fd6801;
		border: 1px solid #eee;
		border-radius: 5px;
		height: 60upx;
		line-height: 60upx;
		font-size: 30upx;
	}
}

.menu {
	display: grid;
	grid-template-columns: 250upx 250upx 250upx;
	grid-template-rows: 250upx 250upx;
	text-align: center;
	margin: 20upx auto;
	background-color: rgba($color: #eee, $alpha: 0.6);
	.menu_wrap {
		padding: 5px;
		border: 1px solid pink;
		.menu_item {
			width: 100%;
			height: 100%;
			padding-top: 15upx;
			line-height: 3;
			view {
				font-size: 34upx;
			}
			// background-color: red;
			image {
				width: 80upx;
				height: 80upx;
			}
		}
	}
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

.nav-bar-title {
	font-size: 60upx;
}

.vip {
	margin-top: 10upx;
	background-color: white;
}

.active {
	margin-top: 0upx !important;
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

.vip_card,
.vip_activity {
	display: flex;
	justify-content: space-around;
}

.vip_activity .activity {
	width: 120upx;
	height: 120upx;
	text-align: center;
}

.activity image {
	width: 80upx;
	height: 80upx;
}

.card {
	width: 250upx;
	align-items: center;
	justify-content: center;
	transform: scale(0.9);
	text-align: center;
}

.card image {
	width: 100%;
	height: 150upx;
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

.notice {
	position: relative;
	width: 100%;
	margin: 50upx auto 5upx;
}

.introduce {
	width: 96%;
	margin: auto;
	border: 1px solid #eee;
	border-radius: 5px;
}

.content {
	font-size: 30upx;
	word-spacing: 1.8;
	line-height: 1.3;
	margin: 20upx 15upx;
	text-indent: 1em;
}

.suit_item {
	width: 96%;
	border: 1px solid #eee;
	border-radius: 5px;
	margin: 5upx auto 15upx;
}

.sui_title {
	margin-top: 10upx;
	text-align: center;
	font-weight: bold;
	font-size: 36upx;

	&.normal_card {
		color: #fd6801;
		text-shadow: 0 0 3upx #fd6801;
	}

	&.sliver_card {
		color: #c0c0c0;
		text-shadow: 0 0 3upx #c0c0c0;
	}

	&.gold_card {
		color: gold;
		text-shadow: 0 0 3upx gold;
	}
}

.product {
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

	.product-price {
		color: red;
	}
}

.white-line {
	height: 100upx;
}
</style>
