<template>
	<view class="forget">
		
		<view class="content">
			<!-- 主体 -->
			<view class="main">
				<wInput
					v-model="passOldData"
					type="password"
					maxlength="11"
					placeholder="请输入原始密码"
					isShowPass
				></wInput>
				<wInput
					v-model="passData"
					type="password"
					maxlength="11"
					placeholder="请输入新密码"
					isShowPass
				></wInput>
			</view>
			
			<wButton 
				text="修改密码"
				:rotate="isRotate" 
				bgColor="#FD6801"
				@click.native="changePass()"
			></wButton>

		</view>
	</view>
</template>

<script>
	var _this;
	import wInput from '../../components/watch-login/watch-input.vue' //input
	import wButton from '../../components/watch-login/watch-button.vue' //button
	import {SMS,MODIFY_PASS} from '../../api/index.js'
	import {SUCCESS,ACCOUNT_PASSWORD_ERROR,SMS_ERROR} from '../../api/errorcode.js';
	export default {
		data() {
			return {
				passOldData:"",//原始密码
				passData: "", //密码
				isRotate: false, //是否加载旋转
			}
		},
		components:{
			wInput,
			wButton
		},
		mounted() {
			_this= this;
		},
		methods: {
			changePass() {
				//修改密码
				if(this.isRotate){
					//判断是否加载中，避免重复点击请求
					return false;
				}
			
				if (this.passOldData.length < 6) {
				    uni.showToast({
				        icon: 'none',
						position: 'bottom',
				        title: '原始密码不正确'
				    });
				    return false;
				}
			    if (this.passData.length < 6) {
			        uni.showToast({
			            icon: 'none',
						position: 'bottom',
			            title: '新输入的密码少于6位'
			        });
			        return false;
			    }
				
				 // console.log("重置密码成功")
				_this.isRotate=true
				uni.request({
					url:MODIFY_PASS,
					header:{
						'ACCESS-CONTROL-ALLOW-TOKEN':uni.getStorageSync(_this.sessionKey)
					},
					data:{
						oldpass:_this.passOldData,
						newpass:_this.passData
					},
					method:"POST",
					complete:function(res){
						console.log(res);
						if(res.data.code!=SUCCESS){
							uni.showToast({
								title:res.msg,
								icon: "none"								
							})
						}else{
							uni.showToast({
								title:"密码修改成功",
								duration:1000,
								complete() {
									
									uni.switchTab({
										url:"/pages/mine/mine"
									})
								}
							})
						}
						_this.isRotate=false;
					}
				})
			}
		}
	}
</script>

<style>
	@import url("../../components/watch-login/css/icon.css");
	@import url("./css/main.css");
</style>

