<template>
	<view class="container">
		<view class="form" v-if="hashAccount">
			<view class="title">请输入您的支付宝账号</view>
			<input type="text" placeholder="请仔细核对支付宝账号信息" v-model="account" class="account">
			<button @click="setAlipay" class="ok">确认</button>
		</view>
		<!-- <view class="submit" v-if="!hashAccount">
				<view class="d-flex flex-column a-center j-center py-5 my-3">
					<text class="iconfont icon-iconfontxuanzhong4 main-text-color" 
					style="font-size: 160rpx;"></text>
					<text class="text-dark font-lg">提现成功</text>
				</view>
				<button type="primary" @click="back" style="background-color: #FD6801;">返回</button> -->
		</view>
	</view>
</template>

<script>
	import {HASH_ALIPAY,SET_ALIPAY,WITH_DRAWAL} from '../../api/index.js';
	import {SUCCESS} from '../../api/errorcode.js';
	export default {
		data() {
			return {
				account:'',
				hashAccount:false
			}
		},
		created() {
			this.validate();
		},
		methods: {
			async validate(){
				// // 查询是否有支付宝账号信息
				// uni.request({
				// 	url:HASH_ALIPAY,
				// 	header:{
				// 		'ACCESS-CONTROL-ALLOW-TOKEN':uni.getStorageSync(this.sessionKey),
				// 	},
				// 	complete: (res) => {
				// 		console.log(res.data);
				// 		if(res.data.ok==false){
				// 			this.hashAccount=false;
				// 			this.setAlipay();
				// 		}else{
				// 			this.hashAccount=true;
				// 			this.save();
				// 		}
				// 	}
				// })
				const {data:res}=await this.$http({
					url:HASH_ALIPAY
				})
				if(!res.ok)this.hashAccount=true
			},
			async setAlipay(){
				if(!this.account){
					uni.showToast({
						title:"请填写支付宝账号",
						icon:"loading"
					})
					 return false;
				}
				const {data:res}=await this.$http({
					url:SET_ALIPAY+"/"+this.account
				})
					
				if(res.code==SUCCESS){
					this.save();
				}
			},
			// setAlipay(){
			// 	uni.request({
			// 		url:SET_ALIPAY+"/"+this.account,
			// 		header:{
			// 			'ACCESS-CONTROL-ALLOW-TOKEN':uni.getStorageSync(this.sessionKey),
			// 		},
			// 		complete: (res) => {
			// 			console.log(res.data);
			// 			if(res.data.code==SUCCESS){
			// 				this.hashAccount=true;
			// 				this.save();
			// 			}
			// 		}
			// 	})
			// },
			save(){
				uni.request({
					url:WITH_DRAWAL,
					header:{
						'ACCESS-CONTROL-ALLOW-TOKEN':uni.getStorageSync(this.sessionKey),
					},
					complete: (res) => {
						if(res.data.code==SUCCESS){
								console.log(res.data);
								uni.showToast({
									title:"申请提交成功!",
									success: () => {
										this.back()
									}
								})
								
								
						}else{
							uni.showToast({
								title:"提现失败,请联系管理员",
								icon:"none",
								success: () => {
									this.back()
								}
							})
							
						}
					}
				})
			},
			back(){
				setTimeout(()=>{
					uni.switchTab({
						url:"/pages/index/index"
					})
				},1000)
			}
		}
	}
</script>

<style scoped>
	.container{
		width:90%;
		margin: auto;
	}
	.title{
		font-size: 33upx;
	}
	.account{
		width:100%;
		border:1px solid #CCC;
		border-radius: 5px;
		height: 65upx;
		display: block;
	}
	.ok{
		margin-top: 100upx;
		background-color: #FD6801;
		color: white;
	}
</style>
