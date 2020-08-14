<template>
	<view>
		<view class="d-flex flex-column a-center j-center py-5">
			<text class="text-light-muted font-md">支付金额</text>
			<text class="price" v-if="tradingPrice">{{ tradingPrice}}</text>
			<text class="price" v-else-if="total">{{ total}}</text>
		</view>
		<radio-group @change="change">
			<view class="px-5" v-for="(item,index) in options" :key="index">
				<uni-list-item :otherIcon="item.icon" :title="item.title" 
					showExtraIcon otherIconStyle="font-size:60rpx;" :note="item.note">
					<radio slot="right" :value="item.value" color="#FD6801" :disabled="item.disabled"
					:checked="payMethod===item.value"/>
				</uni-list-item>
			</view>
		</radio-group>
		<view class="text-white font-md w-90 py-2" hover-class="main-bg-hover-color" style="margin: auto;">
			<button @click="submit" :class="loading?'bg-secondary':'main-bg-color'" style="color: white;">
				{{loading?'支付中':'确认支付'}}
			</button>
		</view>
	</view>
</template>

<script>
	import uniListItem from "@/components/uni-common/uni-list-item/uni-list-item.vue"
	import {ORDER_INFO,ORDER_CALLBACK,STRUCTURE_TYPE,SHOPPRICE} from '../../api/index.js';
	export default {
		components:{
			uniListItem
		},
		data() {
			return {
				loading:false,
				detail:{
					id:0,
					price:0,
					remarks:''
				},
				orderInfo:"",
				payMethod:"alipay",
				options:[{
					title:"支付宝支付",
					note:"推荐使用支付宝支付",
					icon:"icon-zhifubao text-primary",
					value:"alipay",
					disabled:false
				}
				// ,
				// {
				// 	title:"微信支付",
				// 	note:"",
				// 	icon:"icon-weixinzhifu text-success",
				// 	value:"wxpay",
				// 	disabled:true,
				// }
				],
				// 订单列表
				orderList:null,
				// 金币的总价
				tradingPrice:null
			}
		},
		// 计算总金额
		computed:{
			total(){
				return this.orderList.reduce((pre,next)=>pre+=next.count*next.price,0)
			}
		},
		onLoad(e) {
			
			// 查询用户会员状态
			// this.getVipUserInfo()
			// if(!e.id){
			// 	return uni.showToast({
			// 		title:"支付失败",
			// 		icon:"none"
			// 	})
			// }
			// this.detail = {
			// 	id:e.id,
			// 	price:e.money,
			// 	type:e.type,
			// 	number:e.number,
			// 	remarks:e.remarks,
			// 	userAddressId:e.userAddressId
			// }
			
			// 商品列表信息
			const cartInfo=JSON.parse(e.params)	
			this.orderList=cartInfo.data || []
			// 发布购买
			if(	cartInfo.type=="publishWantToBuy" || cartInfo.type=="buyWantToSell"){
				let data={
					// 类型
					type:cartInfo.type,
					// 数量
					coinNumber:cartInfo.num,
					// id
					TradingId:cartInfo.id 
				}
				this.getCurrencyMoney(cartInfo.num)
				this.createOrderInfo(data)
				return false
			}
			// 说明点击进来的是会员卡 或者 是单个商品
			if(cartInfo.type==="membershipCard" || cartInfo.type==="commodity"){
				let data={
					id:this.orderList[0].id,
					remarks:cartInfo.remarks,
					type:cartInfo.type,
					userAddressId:cartInfo.userAddressId
				}
				console.log(data);
				this.createOrderInfo(data)
				return false
			}
			// 这里是购物车
			let data={
				id:[],
				type:cartInfo.type,
				remarks:cartInfo.remarks,
				userAddressId:cartInfo.userAddressId
			}
			this.orderList.forEach(item=>{
				data['id'].push(item.id)
			})
			data['id']=data['id'].join()
			// 计算商品的总数
			this.createOrderInfo(data)
			console.log(data);
			
			// let data = {
			// 		// verification    验证会员信息
			// 		// membershipCard  会员卡
			// 		// commodity    商品
			// 		type:this.detail.type,
			// 		id:this.detail.id,
			// 		remarks:this.detail.remarks
			// 	}
			// 	//如果付款的是商品,则添加上数量
			// 	if(this.detail.type==='commodity'){
			// 		data['number']=this.detail.number || 1
			// 		data['userAddressId']=this.detail.userAddressId
			// 	}
			// console.log("TOKEN:"+uni.getStorageSync(this.sessionKey));
			// console.log(this.detail);
			//生成订单信息
			// uni.request({
			// 	url:ORDER_INFO,
			// 	method:"POST",
			// 	data,
			// 	header:{
			// 		'ACCESS-CONTROL-ALLOW-TOKEN':uni.getStorageSync(this.sessionKey)
			// 	},
			// 	complete: (res) => {
					
			// 		console.log("获取会员卡订单数据:",res.data);
			// 		if(res.data && res.data.code==0){
			// 			this.orderInfo = res.data.data;
				// 	}else{
				// 		uni.showToast({
				// 			title:"生成订单失败!",
				// 			icon:"none"
				// 		})
				// 		setTimeout(()=>{
				// 			uni.navigateBack({
				// 				delta:1
				// 			})
				// 		},500)
				// 	}
				// }
			// })
		},
		methods: {
			async getCurrencyMoney(num){
				// 获取金币单价
				const {data:res}=await this.$http({
					url:SHOPPRICE
				})
				this.tradingPrice=num*res.data.money
				console.log(this.tradingPrice);
			},
			submit(){
				//防止重复支付
				if(this.loading){
					return;
				}
				var _this = this;
				this.loading=true;
				//2.获取订单信息串,向支付宝发起支付请求
				uni.requestPayment({
						provider: 'alipay',
						orderInfo: this.orderInfo,
						success: function(res) {
								let result = JSON.stringify(res);
								var index1 = res.rawdata.indexOf("out_trade_no")+2;
								var index2 = res.rawdata.indexOf(",",index1);
								
								console.log('success:',res.rawdata.substring(index1+15,index2-2));
								console.log("TOKEN:"+uni.getStorageSync(_this.sessionKey));
								//给服务器回调支付结果
								uni.request({
									url:ORDER_CALLBACK,
									method:"POST",
									data:{out_trade_no:res.rawdata.substring(index1+15,index2-2)},
									header:{
										'ACCESS-CONTROL-ALLOW-TOKEN':uni.getStorageSync(_this.sessionKey),
										"content-type":"application/json;charsetset=UTF-8"
									},
									complete: (res) => {
										console.log(res.data);
										if(res.data.msg == "success"){
											console.log("服务器回传支付结果成功");
											uni.redirectTo({
												url:"/pages/pay-result/pay-result"
											})
											
											// 如果是商品，触发store中的函数，去过滤没有选中的商品
											
											
											// 如果是会员卡，则不更新
											
										}else{
											console.log("服务器回传支付结果失败");
											console.log(res.data.msg);
											uni.showToast({
												title:"服务器回传支付结果失败!",
												icon:"none"
											})
										}
										_this.loading = false;
									}
								})
						},
						fail: function(err) {
								console.log('fail:' + JSON.stringify(err));
								uni.showToast({
									title:"支付取消",
									icon:"none"
								})
								setTimeout(()=>{
									uni.switchTab({
										url:"/pages/index/index"
									})
								},1000)
								_this.loading=false;
						}
				})
			},
			change(e){
				//切换付款方式
				this.payMethod = e.detail.value;
			},
			// // 查询用户会员信息
			// async getVipUserInfo(){
			// 	// 查询用户的会员状态
			// 	const {data:res}=await this.$http({
			// 		url:`${STRUCTURE_TYPE}/${uni.getStorageSync('user').id}`
			// 	})
			// 	console.log(res);
			// },
			// 生成订单
			async createOrderInfo(data){
				const {data:res}=await this.$http({
					url:ORDER_INFO,
					method:"POST",
					data
				})
				console.log(res);
				if(!(res.data && res.code==0)){
					uni.showToast({
						title:"生成订单失败!",
						icon:"none"
					})
					setTimeout(()=>{
						uni.navigateBack({
							delta:1
						})
					},500)
					return false
				}
				this.orderInfo = res.data;
			}
		}
	}
</script>

<style scoped>
.price{
	color: red;
	font-size: 36upx!important;
}
</style>
