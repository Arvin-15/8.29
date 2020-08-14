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
					<image src="/static/fumou-center-template/setting.png" v-show="id" class="setting" @click="open('/pages/info/info')"></image>
				</view>
				<view class="order_status">
					<view v-if="id">
						<view v-if="memberExpireDate">{{memberType}}&nbsp;&nbsp;会员到期时间: {{memberExpireDate}}</view>
						<view v-if="isPayValidation!='Y'">点击下方身份认证 , 解锁更多功能</view>
						<!-- <image src="../../static/vip1.jpg" mode="aspectFit" class="vip_card"></image> -->
					</view>
				</view>
			</view>
			<!-- <button @click="send">发送</button> -->
			<view class="baiban"></view>
			<view class="center_menu">
				<view class="menu_item" v-for="item in menus" @click="open(item.href)" v-show="item.isShow">
					<image :src="item.icon" mode="aspectFill"></image>
					<text>{{item.name}}</text>
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
				menus: [{
						name: '身份认证',
						icon: '../../static/fumou-center-template/one.png',
						href: '/pages/bdocr/bdocr',
						isShow: true,
						key: 1,
					},
					{
						name: '会员信息',
						icon: '../../static/fumou-center-template/4.png',
						isShow: true,
						href:"/pages/member/member",
						key: 2,
					},{
						name: '积分管理',
						icon: '../../static/fumou-center-template/5.png',
						href: '/pages/score/score',
						isShow: true,
						key: 3,
					},
					{
						name: '地址管理',
						icon: '../../static/fumou-center-template/6.png',
						key: 4,
						isShow: true,
						href: "/pages/address/address"
					},
					{
						name: '意见反馈',
						icon: '../../static/fumou-center-template/9.png',
						href: '/pages/feedback/feedback',
						isShow: true,
						key: 5,
					},
					{
						name: '关于我们',
						icon: '../../static/fumou-center-template/10.png',
						isShow: true,
						href:"/pages/about/about",
						key: 6,
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
			open(href) {
				console.log(href);
				if(!this.validState()){
					href="/pages/login/login";
				}
				uni.navigateTo({
					url: href,
					animationType: "pop-in",
					animationDuration: 3500
				})
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
				console.log("用户信息:",user)
				if(user.id){
					this.id=user.id;
					this.nickname=user.nickname;
					this.avatar=user.avatar || this.avatar;
					this.score=user.score;
					this.memberExpireDate=user.memberExpireDate;
					this.memberType=user.memberType;
					this.isPayValidation = user.isPayValidation;
					if(this.isPayValidation=="Y"){
						this.menus[0].isShow = false;
						this.menus[1].isShow = true;
						this.menus[2].isShow = true;
					}else{
						this.menus[0].isShow = true;
						this.menus[1].isShow = false;
						this.menus[2].isShow = false;
					}
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
									if(this.isPayValidation=="Y"){
										this.menus[0].isShow = false;
										this.menus[1].isShow = true;
									}else{
										this.menus[0].isShow = true;
										this.menus[1].isShow = false;
									}
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
			background: #F9F9F9;
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

	.baiban {
		background: #FEFEFE;
		height: 200upx;
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
</style>
