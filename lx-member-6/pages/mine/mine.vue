<template>
	<view class="center">
		<view class="center_top" :style="{backgroundImage:'url('+avatar+')'}">
			<view class="mask"></view>
		</view>
		<view class="center_box_bg">
			<view class="profily">
				<view class="base">
					<view class="profily_header" :style="{backgroundImage:'url('+avatar+')'}"></view>
					<text>{{nickname}}</text>
					<navigator url="/pages/login/login" v-if="!nickname" animation-type="slide-in-bottom" animation-duration="400">点击登录</navigator>
					<image src="/static/fumou-center-template/setting.png" v-show="id" class="setting" @click="open({href:'/pages/info/info'})"></image>
				</view>
				<view class="order_status">
					<view v-if="id">
						<view v-if="memberExpireDate">会员级别：{{memberType}}&nbsp;&nbsp;会员到期时间：{{memberExpireDate}}</view>
					</view>
				</view>
			</view>
			<!-- 公告栏 -->
			<view class="notice">
				<uni-notice-bar showIcon="true" single="true" scrollable="true" :speed="20"
					 :text="notice"></uni-notice-bar>
			</view>
			<view class="baiban">
			</view>
			<!-- 菜单 -->
			<view class="menu">
				<view class="menu_wrap" v-for="item in menus" @click="open(item)" v-show="item.isShow">
					<view class="menu_item">
						<image :src="item.icon" class="menu_icon"></image>
						<view class="menu_title">{{item.name}}</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {USER_INFO,ORDER_CALLBACK} from '../../api/index.js';
	import {SUCCESS} from '../../api/errorcode.js';
	import {mapState} from 'vuex'
	export default {
		props: {
		},
		data() {
			return {
				id:"",nickname:"",memberExpireDate:null,score:0,
				avatar:"../../static/fumou-center-template/header.jpg",memberType:"",
				isPayValidation:"N",
				notice:'菩提慈善筹备平台正式启动!!!!',
				status: [{
						key: 1,
						name: '待发货',
						url: '../../static/fumou-center-template/one.png'
					},
					{
						key: 2,
						name: '待收货',
						url: '../../static/fumou-center-template/2.png'
					},
					{
						key: 3,
						name: '待评价',
						url: '../../static/fumou-center-template/3.png'
					},
					{
						key: 4,
						name: '全部订单',
						url: '../../static/fumou-center-template/4.png'
					}
				],
				menus: [
					{
						name: '团队管理',
						icon: '../../static/mine2/team.png',
						isShow: true,
						href:"/pages/member/member",
						key: 1,
					},{
						name: '积分管理',
						icon: '../../static/mine2/score.png',
						href: '/pages/score/score',
						isShow: true,
						key: 2,
					},
					{
						name: '地址管理',
						icon: '../../static/mine2/addr.png',
						key: 3,
						isShow: true,
						href: "/pages/address/address"
					},
					{
						name: '修改密码',
						icon: '../../static/mine2/xgmm.png',
						isShow: true,
						href:"/pages/login/modifypass",
						key: 4,
					},{
						name: '头像修改',
						icon: '../../static/mine2/avatar.png',
						isShow: true,
						href:"/pages/about/about",
						key: 5,
					},{
						name: '修改昵称',
						icon: '../../static/mine2/xgnc.png',
						isShow: true,
						href:"/pages/about/about",
						key: 6,
					},
					{
						name: '关于我们',
						icon: '../../static/mine2/about.png',
						isShow: true,
						href:"/pages/about/about",
						key: 7,
					},
					{
						name: '推广信息',
						icon: '../../static/mine2/tg.png',
						isShow: true,
						href:"/pages/buseiness/buseiness",
						key: 8,
					},
					{
						name:'交易中心',
						icon:'../../static/mine2/tg.png',
						isShow:true,
						href:"/pages/trading/trading",
						key: 9
					},
					{
						name:'矿机中心',
						icon:'../../static/mine2/tg.png',
						isShow:true,
						href:"/pages/field/field",
						key: 9
					}
				]
			};
		},
		methods: {
			send(){
				uni.request({
					url:ORDER_CALLBACK,
					method:"POST",
					data:{
						id:ss
					},
					complete: (res) => {
						if(res.data.code == SUCCESS){
							console.log("服务器回传支付结果成功");
						}else{
							console.log("服务器回传支付结果失败");
							console.log(res.data.msg);
							uni.showToast({
								title:"服务器回传支付结果失败!",
								icon:"none"
							})
						}
					}
				})
			},
			open(item) {
				console.log(item);
				if(!this.validState()){
					uni.navigateTo({
						url:"/pages/login/login"
					})
					return;
				}
				// if(item.key==1 || item.key==2){
				// 	if(this.isPayValidation!='Y'){
				// 		uni.showToast({
				// 			title:"请您先认证账号",
				// 			icon:"none"
				// 		})
				// 		return;
				// 	}
				// }
				if(item.key==6){
					//昵称修改
					uni.navigateTo({
						url:'/pages/modify/modify?name='+this.nickname
					})
				}else if(item.key==5){
					//user.avatar || '/static/fumou-center-template/header.jpg'
					uni.navigateTo({
						url:'/pages/echo-cropper/echo-cropper?src='+this.avatar
					})
				}else{
					uni.navigateTo({
						url:item.href
					})
				}
			},
			validState(){
				if(this.id==""){
					return false;
				}else{
					return true;
				}
			},
			init(){
				let user = uni.getStorageSync("user");
				if(user.id){
					this.id=user.id;
					this.nickname=user.nickname;
					this.avatar=user.avatar || this.avatar;
					this.score=user.score;
					this.memberExpireDate=user.memberExpireDate;
					this.memberType=user.memberType;
					this.isPayValidation = user.isPayValidation;
					// if(this.isPayValidation=="Y"){
						// this.menus[0].isShow = false;
						// this.menus[1].isShow = true;
						// this.menus[2].isShow = true;
					// }else{
						// this.menus[0].isShow = true;
						// this.menus[1].isShow = false;
						// this.menus[2].isShow = false;
					// }
				}else{
					let token = uni.getStorageSync(this.sessionKey);
					console.log("token:"+token);
					if(token){
						uni.request({
							url:USER_INFO+"/"+token,
							header:{
								'ACCESS-CONTROL-ALLOW-TOKEN':uni.getStorageSync(this.sessionKey)
							},
							complete:(res)=>{
								console.log(res.data);
								if(res.data.code==SUCCESS){
									uni.setStorageSync("user",res.data.user);
									let user = res.data.user;
									this.id=user.id;
									this.nickname=user.nickname;
									this.avatar=user.avatar || this.avatar;
									this.score=user.score;
									this.memberExpireDate=user.memberExpireDate;
									this.memberType=user.memberType;
									this.isPayValidation = user.isPayValidation;
									// if(this.isPayValidation=="Y"){
									// 	this.menus[0].isShow = false;
									// 	this.menus[1].isShow = true;
									// }else{
									// 	this.menus[0].isShow = true;
									// 	this.menus[1].isShow = false;
									// }
								}
							}
						})
					}else{
						this.id=""
						this.nickname=""
						this.memberExpireDate=null
						this.score=0
						this.avatar="../../static/fumou-center-template/header.jpg"
						this.memberType="";
						this.isPayValidation = false;
					}
				}
			}
		},
		onShow:function() {
			console.log("==onShow==")
			this.init();
			// 重置tab栏显示的子页面
			this.$store.commit('handleClickParent')
		},
		onLoad:function(){
			console.log('==onLoad==');
			this.init();
		}
	}
</script>

<style lang="scss">
	page {
		height: 100%;
	}

	.profily,
	.profily_header {
		border-radius: 8px;
	}

	.center {
		height: 100%;

		&_top {
			height: 18%;
			background: url('../../static/fumou-center-template/header.jpg') no-repeat 0% 50%;
			background-size: cover;

			// background: #E6E6E6;
			.mask {
				background: rgba(0, 0, 0, .4);
				height: 100%;
			}
		}

		&_box_bg {
			// background: #F9F9F9;
			position: relative;

			.profily {
				position: absolute;
				width: 90%;
				// border:1px solid #F7F7F7;
				margin: 0 auto;
				top: -100upx;
				left: 5%;
				background: #FEFEFE;
				padding: 35upx;
				box-sizing: border-box;
				box-shadow: 0px 2px 5px #EDEDED;
			}
		}
	}

	.base {
		display: flex;
		align-items: center;
		border-bottom: 2px solid #F6F6F6;
		padding-bottom: 35upx;
		position: relative;

		.profily_header {
			height: 150upx;
			width: 150upx;
			background-image: url('../../static/fumou-center-template/header.jpg');
			background-size: 100%;
		}

		text {
			margin-left: 20px;
			font-size: 30upx;
		}

		image.setting {
			position: absolute;
			height: 40upx;
			width: 40upx;
			right: 0px;
			top: 0px;
		}
	}

	image.vip_card {
		width: 150upx;
		height: 70upx;
		top: -10px;
		right: -10px;
	}

	.order_status {
		display: flex;
		justify-content: space-between;
		margin-top: 35upx;

		.status {
			width: 140upx;
			font-size: 24upx;
			text-align: center;
			letter-spacing: .5px;
			display: flex;
			flex-direction: column;

			.icon {
				width: 50upx;
				height: 50upx;
				margin: 0 auto;
				margin-bottom: 5px;

			}
		}
	}
	
	.notice{
		position: absolute;
		width: 96%;
		top: 220upx;
		z-index: 99;
		margin-left: 50%;
		transform: translateX(-50%);
		.uni-noticebar{
			border-radius: 5px;
			background-color: rgba($color: orange, $alpha: 0.2)!important;
		}
	}

	.baiban {
		background: #FEFEFE;
		height: 280upx;
		position: relative;
		z-index: -88;
	}

	.center_menu {
		width: 100%;
		display: inline-block;

		.menu_item {
			font-size: 28upx;
			letter-spacing: 1px;
			padding: 14px 5%;
			background: #FEFEFE;
			overflow: hidden;
			box-sizing: border-box;
			display: flex;
			align-items: center;
			position: relative;
			border-bottom: 1px solid #EFEFEF;

			&:hover {
				background: #F6F6F6 !important;
			}

			&::after {
				content: '';
				width: 30upx;
				height: 30upx;
				position: absolute;
				right: 5%;
				background: url('../../static/fumou-center-template/right.png') no-repeat;
				background-size: 100%;
			}

			text:nth-of-type(1) {
				margin-left: 10px;
			}

			image {
				width: 40upx;
				height: 40upx;
			}

			&:nth-of-type(4) {
				margin-top: 10px;
			}
		}
	}
	
	.menu {
		display: grid;
		grid-template-columns: 250upx 250upx 250upx;
		grid-template-rows: 230upx 230upx;
		text-align: center;
		margin: 20upx auto;
		// background-color: rgba($color: #eee, $alpha: 0.6);
		.menu_wrap {
			padding: 8px;
			&:nth-child(odd){
				.menu_item{
					background-color: rgba($color: orange, $alpha: 0.2);
				}
			}
			&:nth-child(even){
				.menu_item{
					background-color: rgba($color: greenyellow, $alpha: 0.2);
				}
			}
			.menu_item{
				width: 100%;
				height: 100%;
				padding-top: 30upx;
				line-height: 3;
				view{
					font-size: 34upx;
				}
				border-radius: 10px;
				image{
					width:70upx;
					height:70upx;
				}
			}
		}
	}
</style>
