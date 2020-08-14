<template>
	<view class="withdraw">
		<view class="withdraw-head">
			<view class="withdraw-head-to">验证渠道</view>
			<view class="withdraw-head-way">
				<view class="withdraw-head-way-1">
					<image class="way-icon" src="/static/images/money.png"></image>
					<text class="way-text">支付宝</text>
				</view>
			</view>
		</view>
		<view class="withdraw-body">
			<text>支付金额</text>
			<view class="input-money">
				<text class="rmb">￥</text>
				<input v-model.number="extract" disabled type="text" class="t-input" />
			</view>
			<view class="tx-active"><button @click="getMoney">支付</button></view>
		</view>
	</view>
</template>

<script>
	import {ORDER_INFO,UPDATE_STATE,ORDER_CALLBACK} from '../../api/index.js';
	import {SUCCESS} from '../../api/errorcode.js';
export default {
	data() {
		return {
			extract: 0.1,
			is_out: false,
			is_lowest: false,
			is_post: false,
			lowest: 0,
			fee: 0,
			money: '',
			orderInfo:'',//订单信息
		};
	},
	watch: {
		extract(oldVal, newVal) {}
	},
	onLoad() {
		//1.调用后端接口,生成订单信息串
		uni.request({
			url:ORDER_INFO,
			method:"POST",
			data:{
				// verification    验证会员信息				// membershipCard    会员卡				// commodity    商品
				type:"verification"
			},
			header:{
				'ACCESS-CONTROL-ALLOW-TOKEN': uni.getStorageSync(this.sessionKey)
			},
			complete: (res) => {
				console.log(res.data);
				if(res.data && res.data.code==0){
					this.orderInfo = res.data.data;
				}else{
					uni.showToast({
						title:"生成订单失败",
						icon:"none"
					})
				}
			}
		})
	},
	methods: {
		getMoney() {
			var _this = this;
			//2.获取订单信息串,向支付宝发起支付请求
			uni.requestPayment({
					provider: 'alipay',
					orderInfo: _this.orderInfo,
					success: function(res) {
							let result = JSON.stringify(res);
							
							//3.去后端修改该用户的验证状态
							uni.request({
								url:UPDATE_STATE,
								method:"POST",
								data:{
									id:uni.getStorageSync("user").id || 0
								},
								complete: (res) => {
									if(res.data.code == SUCCESS){
										// let user = uni.getStorageSync("user");
										// user.isPayValidation = "Y";
										// uni.setStorageSync("user",user);
										//清空storage,重新获取
										uni.removeStorageSync("user");
										//在tabBar配置的页面,需要使用switchTab进行跳转,navigateTo和redirectTo都无效
										uni.showLoading({
											title:"请稍后",
											complete() {
												uni.hideLoading();
												uni.switchTab({
													url:"/pages/mine/mine"
												})
											}
										})
									}else{
										console.log(res.data.msg);
										uni.showToast({
											title:"验证失败,请稍后再试!",
											icon:"none"
										})
									}
								}
							})
							var index1 = res.rawdata.indexOf("out_trade_no")+2;
							
							var index2 = res.rawdata.indexOf(",",index1);
							
							// console.log(res.rawdata.substring(index1+15,index2-2));
							console.log('success:',res.rawdata.substring(index1+15,index2-2));
							//给服务器回调支付结果
							uni.request({
								url:ORDER_CALLBACK,
								method:"POST",
								data:{out_trade_no:res.rawdata.substring(index1+15,index2-2)},
								header:{
									"content-type":"application/json;charsetset=UTF-8",
									'ACCESS-CONTROL-ALLOW-TOKEN':uni.getStorageSync(_this.sessionKey)
								},
								complete: (res) => {
									console.log(res.data);
									if(res.data.msg == "success"){
										console.log("服务器回传支付结果成功");
										uni.switchTab({
											url:"/pages/mine/mine"
										})
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
					fail: function(err) {
							console.log('fail:' + JSON.stringify(err));
							console.log('取消支付');
							/* 返回首页 */
							uni.switchTab({
								url:"/pages/index/index"
							})
					}
			});
		}
	},
	onPullDownRefresh() {
		this.extract = '';
		this.loadData();
		this.is_out = false;
		this.is_lowest = false;
		this.is_post = false;
		setTimeout(function() {
			uni.stopPullDownRefresh();
		}, 500);
	}
};
</script>

<style lang="scss" scoped>
page {
	background-color: #ededed;
}
.withdraw {
	padding: 20px;
	&-head {
		background-color: #f7f7f7;
		display: flex;
		align-content: center;
		padding: 20px 30px;
		font-size: 14px;
		&-to {
		}
		&-way {
			display: flex;
			flex-direction: column;
			align-content: center;
			margin-left: 20px;
			&-1 {
				color: #576b95;
				margin-bottom: 10px;
				.way-icon {
					width: 16px;
					height: 16px;
					margin-right: 5px;
					top: 2px;
				}
			}
			&-2 {
				color: #acacac;
				font-size: 12px;
			}
		}
	}
	&-body {
		background-color: #fff;
		padding: 20px 30px;
		font-size: 14px;
		.input-money {
			display: flex;
			align-content: center;
			font-weight: 600;
			border-bottom: 0.5px solid #eaeef1;
			.rmb {
				font-size: 2em;
				top: 10px;
				position: relative;
			}
			.t-input {
				height: 1.9em;
				font-size: 2.5em;
				border: none;
				position: relative;
				left: 3.5%;
				outline: none;
			}
		}
		.info-money {
			margin-top: 10px;
			font-size: 12px;
			margin-bottom: 20px;
			&-num {
				color: #b2b2b2;
			}
			&-all {
				color: #576b95;
			}
		}
		.tx {
			button {
				color: #b2b2b2;
			}
		}
		.tx-active {
			button {
				color: #fff;
				background: #07c160;
			}
		}
	}
	.keyboard {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		background: #ebebeb;
		display: flex;
		justify-content: center;
		z-index: 2;
		flex-wrap: wrap;
		transition: all 0.2s ease-in 0.2s;
	}
	.active {
		bottom: -400rpx;
	}
	.keyboard-item {
		box-sizing: border-box;
		width: 250rpx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		background: #fff;
		font-size: 40rpx;
		color: #333;
		height: 99rpx;
		border: 1rpx solid #ebebeb;
		border-top: none;
		border-left: none;
	}
	.hide {
		opacity: 0;
	}
	.delte {
		background: none;
		box-shadow: none;
	}
	.delte image {
		width: 60rpx;
		height: 60rpx;
	}
	.isIphone {
		padding-bottom: 68rpx !important;
	}
	.fee {
		em {
			font-size: 0.5rem;
			font-style: normal;
		}
	}
}
</style>
