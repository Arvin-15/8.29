<template>
	<view class="register">
	
		<view class="content">
			<!-- 头部logo -->
			<view class="header">
				<image src="../../favicon.png"></image>
			</view>
			<!-- 主体 -->
			<view class="main">
				<wInput
					v-model="phoneData"
					type="text"
					maxlength="11"
					placeholder="手机号"
				></wInput>
				<wInput
					v-model="passData"
					type="password"
					maxlength="11"
					placeholder="登录密码"
					isShowPass
				></wInput>
				<wInput
					v-model="verCode"
					type="number"
					maxlength="6"
					placeholder="验证码"
					isShowCode
					ref="runCode"
					@setCode="getVerCode()"
				></wInput>
				<wInput
					v-model="nickNameData"
					type="text"
					maxlength="10"
					placeholder="昵称"
				></wInput>
				<wInput
					v-model="pCode"
					type="number"
					maxlength="10"
					placeholder="邀请码(没有可不填写)"
				></wInput>	
			</view>
				
			<wButton 
				text="注 册"
				:rotate="isRotate" 
				bgColor="#FD6801"
				@click.native="startReg()"
			></wButton>
			
			<!-- 底部信息 -->
			<view class="footer">
				<text 
					@tap="isShowAgree" 
					class="cuIcon"
					:class="showAgree?'cuIcon-radiobox':'cuIcon-round'"
				>同意</text>
				<!-- 协议地址 -->
				<navigator url="" open-type="navigate">《协议》</navigator>
			</view>
		</view>
	</view>
</template>

<script>
	var _this;
	import wInput from '../../components/watch-login/watch-input.vue' //input
	import wButton from '../../components/watch-login/watch-button.vue' //button
	import {SMS,REGISTER} from '../../api/index.js'
	import {SUCCESS,ACCOUNT_PASSWORD_ERROR,SMS_ERROR} from '../../api/errorcode.js';
 	export default {
		data() {
			return {
				phoneData:'', // 用户/电话
				passData:'', //密码
				verCode:"", //验证码
				showAgree:true, //协议是否选择
				isRotate: false, //是否加载旋转
				pCode:null,//邀请码
				nickNameData:'',//昵称
			}
		},
		components:{
			wInput,
			wButton,
		},
		mounted() {
			_this= this;
		},
		methods: {
			isShowAgree(){
				//是否选择协议
				_this.showAgree = !_this.showAgree;
			},
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
				
				// this.sendRequest({
				// 	url:SMS,
				// 	data:'',
				// 	method:'POST',
				// 	complete:function(){}
				// })
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
				// setTimeout(function(){
				// 	_this.$refs.runCode.$emit('runCode',0); //假装模拟下需要 终止倒计时
				// },8000)
			},
		    startReg() {
				//注册
				if(this.isRotate){
					//判断是否加载中，避免重复点击请求
					return false;
				}
				if (this.showAgree == false) {
				    uni.showToast({
				        icon: 'none',
						position: 'bottom',
				        title: '请先同意《协议》'
				    });
				    return false;
				}
				if (this.phoneData.length !=11) {
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
				if(this.nickNameData.length<=0){
					uni.showToast({
					    icon: 'none',
							position: 'bottom',
					    title: '请填写一个昵称'
					});
					return false;
				}
				_this.isRotate=true
				uni.request({
					url:REGISTER,
					data:{
						phone:_this.phoneData,
						code:_this.verCode,
						pass:_this.passData,
						pCode:_this.pCode,
						nickname:_this.nickNameData
					},
					method:"POST",
					complete:function(res){
						console.log(res);
						if(res.data.code==SMS_ERROR){
							uni.showToast({
								icon: "none",
								title:res.data.msg
							})
						}else{
							uni.showToast({
								title:"注册成功"
							})
							uni.navigateBack({
								delta:1
							});
						}
						_this.isRotate=false;
					}
				})
				// setTimeout(function(){
					// _this.isRotate=false
				// },3000)
				// this.sendRequest({
				// 	url:REGISTER,
				// 	data:'',
				// 	method:'',
				// 	complete:function(){}
				// })
		    }
		}
	}
</script>

<style>
	@import url("../../components/watch-login/css/icon.css");
	@import url("./css/main.css");
</style>