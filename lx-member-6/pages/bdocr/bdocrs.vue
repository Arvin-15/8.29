<template>
	<view class="container">
		<view class='line'>
			<view class='lineLeft'>姓名</view>
			<view class="lineRight">
				<!-- data-name为自定义参数名称,同时也会以此为参数名存入data的form中-->
				<input class="input" v-model="form.name" placeholder-class="plaClass" placeholder='请输入姓名'></input>
			</view>
		</view>
		<view class='line'>
			<view class='lineLeft'>性别</view>
			<view class="lineRight gender">
				<radio-group @change="changeRadio" class="radio">
					<view><text>男:</text>
						<radio value="1" :checked="form.sex=='男'?true:false" />
					</view>
					<view><text>女:</text>
						<radio value="0" />
					</view>
				</radio-group>
			</view>
		</view>
		<view class='line'>
			<view class='lineLeft'>民族</view>
			<view class="lineRight">
				<input type="text" v-model="form.national" placeholder-class="plaClass" placeholder='请确认您的名族' />
			</view>
		</view>
		<view class='line'>
			<view class='lineLeft'>身份证</view>
			<view class="lineRight">
				<input class="input" type="number" v-model="form.idcard" placeholder-class="plaClass" placeholder='请输入您的身份证号码'></input>
			</view>
		</view>
		<view class='line' @click="handleAddress">
			<view class='lineLeft'>所在地区</view>
			<input class="input" v-model="area"  placeholder-class="plaClass" placeholder='请选择身份证所在地区'></input>
			<uni-icons class="address" type="arrowright"></uni-icons>
		</view>
		<view class='line'>
			<view class='lineLeft'>详细地址</view>
			<input class="input" v-model="detailAddress" placeholder-class="plaClass" placeholder='请填写详细地址'></input>
		</view>
		<view class="buttonBox" @click="submit">
			提交
		</view>
		<!-- 省市区底部弹出框 -->
		<uni-popup ref="popup" type="bottom" position="bottom" mode="fixed" msg="选择收货地址" @hidePopup="togglePopup('')">
			<semp-city @confirm="onCityCviewck" platform="jd"></semp-city>
		</uni-popup>
	</view>
</template>

<script>
	import {IDCARD_VALID} from '@/api/index.js';
	export default {
		data() {
			return {
				form: {
					// 用户的id
					id: "",
					// 名字
					name: "",
					// 名族
					national: "汉族",
					// 性别
					sex: '男',
					// 身份证号
					idcard: "",
					// 身份证地址
					address: ""
					// 生日
					// birthDate: ""
				},
				// 所在地区：
				area: "",
				detailAddress: ""
			};
		},
		methods: {
			// 性别触发事件
			changeRadio(e) {
				// 说明是男生
				if (e.detail.value == '1') this.form.sex = "男"
				else this.form.sex = "女"
			},
			// 正则校验身份证
			regIdCard(val) {
				var reg = /^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/
				if (!reg.test(val)) {
					uni.showToast({
						title: "身份证号码不正确",
						icon: "loading"
					})
					return false
				}
				return true
			},
			// 判断是否为空
			isEntry(title) {
				uni.showToast({
					title: "请您填写" + title,
					icon: 'loading'
				})
				return false
			},
			// 整理表单数据发送请求
			async postUserInfo() {
				this.form.address = this.area.split('/').join('') + this.detailAddress
				console.log(this.form);
				const {
					data: res
				} = await this.$http({
					url: IDCARD_VALID,
					method: "POST",
					data: this.form
				})
				console.log(res);
			},
			// 提交
			submit(e) {
				if (!this.form.name) return this.isEntry('姓名')
				if (!this.form.national) return this.isEntry('名族')
				if (!this.form.idcard) return this.isEntry('身份证号')
				if (!this.area) return this.isEntry('所在地区')
				if (!this.detailAddress) return this.isEntry('详细地址')
				if (!this.regIdCard(this.form.idcard)) return false
				this.postUserInfo()
				uni.navigateTo({
					url: "/pages/validPay/validPay"
				})
			},
			// 打开级联选择器
			handleAddress() {
				this.$refs.popup.open()
				// 禁止弹出软键盘
				uni.hideKeyboard()
			},
			// 选择城市
			onCityCviewck(e) {
				var arr = []
				for (let k in e) {
					if (k == 'town') break;
					arr.push(e[k]['label'])
				}
				this.area = arr.join('/')
				this.togglePopup()
			},
			//关闭弹窗
			togglePopup() {
				this.$refs.popup.close()
			}
			// ,
			// // 获取身份证信息的token (鉴权)
			// async getUserInfoToken(){
			// 	/* 
			// 		grant_type		(固定格式) 	：client_credentials
			// 		client_id		(应用API key)		
			// 		client_secret 	(应用Secret Key)		
			// 	*/
			// 	const data=await uni.request({
			// 		url:"https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&client_id=6jwZ93CtK9kItpjAUgVjN2g2&client_secret=mSAIFQGEskQkWZA6i2xcVlKpGhRFvlK9",
			// 		method:"POST"
			// 	})
			// 	// 百度云鉴权返回token信息
			// 	const tokenInfo=data[1].data
			// 	console.log(tokenInfo);
			// }
		},
		onLoad() {
			// this.getUserInfoToken()
			this.form.id = uni.getStorageSync('user').id
		}
	}
</script>

<style lang="scss">
	.plaClass {
		color: #dbdbdb;
	}

	.container {
		.title {
			height: 80rpx;
			line-height: 80rpx;
			padding-left: 4%;
			border-bottom: 1px solid #f5f5f5;
		}

		.radio {
			display: flex;
			justify-content: space-around;
			padding-right: 50%;

			text {
				margin-right: $uni-spacing-row-sm;
			}
		}

		.buttonBox {
			width: 91%;
			margin: 0 auto;
			height: 84rpx;
			border-radius: 84rpx;
			color: white;
			display: flex;
			align-items: center;
			justify-content: center;
			position: fixed;
			bottom: 100rpx;
			left: 0;
			right: 0;
			background-color: #4a8be9;
		}

		.tri {
			width: 0;
			height: 0;
			border-left: 8rpx solid transparent;
			border-right: 8rpx solid transparent;
			right: 30rpx !important;
			border-top: 16rpx solid #545151;
		}

		.line {
			margin-top: 30rpx;
			height: 100rpx;
			width: 92%;
			margin: 0 auto;
			border-bottom: 1px solid #f5f5f5;
			display: flex;

			.lineRight {
				.tips {
					color: #9a9a9c;
					font-weight: bold;
				}

				flex: 1;
				height: 100%;
				display: flex;
				align-items: center;
				justify-content: space-between;
				position: relative;
			}

			.lineLeft {
				display: flex;
				width: 20%;
				align-items: center;
				height: 100%;
				font-weight: bold;
				color: #000000;
			}

			.input {
				padding-right: 20rpx;
				height: 100%;
				width: 70%;
				text-align: left;
				font-size: 28rpx;
				color: #545151;
			}

			.picker {
				height: 100%;
				justify-content: flex-start;
				display: flex;
				align-content: center;
				width: 500rpx;
			}

			picker {
				height: 84rpx;
				line-height: 84rpx;
			}
			.address{
				line-height: 50px;
			}
			.gender{
				margin-left: -10px;
			}
		}
		
		width: 100vw;
		font-size: 28upx;
		min-height: 100vh;
		overflow: hidden;
		color: #6b8082;
		position: relative;
	}
</style>
