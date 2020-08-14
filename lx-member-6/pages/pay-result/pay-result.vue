<template>
	<view>
		<view class="d-flex flex-column a-center j-center py-5 my-3">
			<text class="iconfont icon-iconfontxuanzhong4 main-text-color" 
			style="font-size: 160rpx;"></text>
			<text class="text-dark font-lg">支付成功</text>
		</view>
		<view class="px-5">
			<view class="main-bg-color text-white font-md w-100 py-2 mt-3 text-center" 
				hover-class="main-bg-hover-color" @tap="goIndex" style="border-radius: 10px;">
				返回首页	
			</view>
			<!-- <view class="rounded border font-md w-100 py-2 mt-3 text-center"
				hover-class="main-bg-hover-color">
				返回首页
			</view> -->
		</view>
	</view>
</template>

<script>
	import {LOGIN,USER_INFO} from '../../api/index.js'
	import {ACCOUNT_PASSWORD_ERROR,SUCCESS} from '../../api/errorcode.js'
	export default {
		data() {
			return {
			}
		},
		methods: {
			goIndex(){
				// uni.removeStorageSync("user");//清空用户信息,拉取最新值
				let token = uni.getStorageSync(this.sessionKey);
				uni.request({
					url:USER_INFO+"/"+token,
					header:{
						'ACCESS-CONTROL-ALLOW-TOKEN':token
					},
					complete:(res)=>{
						console.log(res.data);
						if(res.data.code==SUCCESS){
							uni.setStorageSync("user",res.data.user);
							uni.switchTab({
								url:"/pages/index/index"
							})
						}
					}
				})
			}
		}
	}
</script>

<style>

</style>
