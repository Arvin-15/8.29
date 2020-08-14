<template>
	<view class="forget">
		
		<view class="content">
			<!-- 主体 -->
			<view class="main">
				<view class="tips">若你忘记了密码，可在此重置新密码。</view>
				<wInput
					v-model="phoneData"
					type="text"
					maxlength="11"
					placeholder="请输入手机号码"
				></wInput>
				<wInput
					v-model="passData"
					type="password"
					maxlength="11"
					placeholder="请输入新密码"
					isShowPass
				></wInput>
				
				<wInput
					v-model="verCode"
					type="number"
					maxlength="6"
					placeholder="验证码"
					isShowCode
					codeText="获取重置码"
					setTime="30"
					ref="runCode"
					@setCode="getVerCode()"
				></wInput>
			</view>
			
			<wButton 
				text="重置密码"
				:rotate="isRotate" 
				bgColor="#FD6801"
				@click.native="startRePass()"
			></wButton>

		</view>
	</view>
</template>

<script>
	var _this;
	import wInput from '../../components/watch-login/watch-input.vue' //input
	import wButton from '../../components/watch-login/watch-button.vue' //button
	import {SMS,FORGET_PASS} from '../../api/index.js'
	import {SUCCESS,ACCOUNT_PASSWORD_ERROR,SMS_ERROR} from '../../api/errorcode.js';
	export default {
		data() {
			return {
				phoneData: "", //电话
				passData: "", //密码
				verCode:"", //验证码
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
			getVerCode(){
				//获取验证码
				if (_this.phoneData.length != 11) {
				     uni.showToast({
				        icon: 'none',
						position: 'bottom',
				        title: '手机号不正确'
				    });
				    return false;
				}
				console.log("获取验证码")
				this.$refs.runCode.$emit('runCode'); //触发倒计时（一般用于请求成功验证码后调用）
				uni.request({
					url:SMS+"/"+_this.phoneData,
					method:"GET",
					complete:function(res){
						console.log(res);
						if(res.data.code==SUCCESS){
							uni.showToast({
							    icon: 'none',
									position: 'bottom',
							    title: '验证码已发送至您的手机'
							});
						}else{
							uni.showToast({
							    icon: 'none',
									position: 'bottom',
							    title: res.data.msg
							});
						}
					}
				})	
				
			},
			startRePass() {
				//重置密码
				if(this.isRotate){
					//判断是否加载中，避免重复点击请求
					return false;
				}
				if (this.phoneData.length != 11) {
				    uni.showToast({
				        icon: 'none',
						position: 'bottom',
				        title: '手机号不正确'
				    });
				    return false;
				}
			    if (this.passData.length < 6) {
			        uni.showToast({
			            icon: 'none',
						position: 'bottom',
			            title: '密码不正确'
			        });
			        return false;
			    }
				if (this.verCode.length != 6) {
				    uni.showToast({
				        icon: 'none',
						position: 'bottom',
				        title: '验证码不正确'
				    });
				    return false;
				}
				console.log("重置密码成功")
				_this.isRotate=true
				uni.request({
					url:FORGET_PASS,
					data:{
						phone:_this.phoneData,
						code:_this.verCode,
						pass:_this.passData
					},
					method:"POST",
					complete:function(res){
						console.log(res);
						if(res.data.code==SMS_ERROR){
							uni.showToast({
								title:res.data.msg,
								icon: "none"
							})
						}else{
							uni.showToast({
								title:"密码重置成功"
							})
							uni.navigateBack({
								delta:1
							});
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

