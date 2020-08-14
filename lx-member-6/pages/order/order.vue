<template>
	<view class="content">
		<view class="order_details_1">
			<view class="order_details_7">
				<text decode="true" class="status">待支付</text>
				<text decode="true" class="smallTitle">请确认需要购买的商品</text>
			</view>
			<view class="order_details_2">				
				<view class="goods">
					<view class="row" v-for="item in orderList" :key="item.id">
						<image :src="item.url" class="pic"></image>
						<view class="order_details_10">
							<text decode="true" class="good">{{item.title}}</text>
							<text decode="true" class="num">数量:{{item.count}}</text>
						</view>
						<text decode="true" class="money">¥{{item.price}}</text>
					</view>
				</view>
				<view class="order_details_15">
					<text decode="true" class="order_details_16">
						小计¥{{totalMoney}}
					</text>
				</view>
			</view>
			<!-- 收货地址选择 -->
			<view class="address" @click="chooseAddress">
				<view class="location" :style="address_desc?style:''">
					<image src="../../static/location.png"></image>
				</view>
				<view class="info" :style="address_desc?'margin-left:20px':''">
					<view class="address_name">{{address_name}}-{{address_phone}}</view>
					<view class="address_desc">{{address_desc}}</view>
				</view>
			</view>
			<!-- 备注栏 -->
			<view class="remark">
				<textarea autocomplete="off" @input="onKeyUserNameInput" v-model="remarks"    placeholder="请输入备注信息(最多输入100字)" />
			</view>
			<!-- 提交订单按钮 -->
			<button v-on:click="submitOrder()" class="btAdd">提交订单
			</button>
		</view>
		<view class="loading">{{loadingText}}</view>
		<view class="ymBbottom"></view>
	</view>
</template>

<script>
	import {
		ADDRESS_DEFAULT
	} from '../../api/index.js';
	import {
		SUCCESS
	} from '../../api/errorcode.js';
	var _self, timer = null;
	export default {
		data() {
			return {
				loadingText: '',
				list_goods: {
					// id:'',
					// name: '杯鸭碟头饭',
					// pic: '/static/order_details/images/order_details_pic_9.jpg',
					// money: '￥2880'
				},
				order_details_16: '共2份小计￥57.60',
				id: '', //传值使用,方便存在本地的locakStorage  
				money: 57.60,
				number: 1,
				address_id: 0,
				address_name: '',
				address_phone: '',
				address_desc: '',
				remarks:'',
				// 订单列表
				orderList:null,
				// 样式
				style:'transform: translate(25%,25%)'
			}
		},
		onLoad(options) {
			// _self = this.list_goods;
			// //检测有没有传入id参数
			// if (options.id != null && options.id != "") {
			// 	_self.id = options.id;
			// }
			// if (options.number != null && options.number != 0) {
			// 	_self.number = options.number;
			// }
			// if (options.money != null && options.money != 0) {
			// 	_self.money = options.money;
			// }
			// this.list_goods = options;
			// 说明是购物车列表进入的订单列表
			// &&!options.shop
			if(!options.params){
				// 过滤选中的商品
				this.orderList=this.$store.state.cartList.filter(item=>item.isChecked)
				return false
			}
			// else if(options.shop){ //点击立即购买进入的订单列表
			// 	// 单个商品
			// 	this.orderList=[JSON.parse(options.shop)]	
			// 	return false
			// }
			// 会员卡和单个商品
			this.orderList=[JSON.parse(options.params)]	
		},
		onShow() {
			this.getAddress();
			
		},
		onPullDownRefresh: function() {
			//下拉刷新的时候请求一次数据
			this.Refresh();
		},
		computed:{
			totalMoney(){
				var total=0
				this.orderList.forEach(item=>{
					total+=item.count*item.price
				})
				return total
			}
		},
		methods: {
			chooseAddress(){
				uni.navigateTo({
					url:"/pages/address/address"
				})
			},
			 onKeyUserNameInput: function(event) {  
			         this.remarks = event.target.value;
					 // console.log(this.remark);
			  },  
			async getAddress() {
				//获取默认的收货地址 :address
				const {data:res}=await this.$http({
					url:ADDRESS_DEFAULT
				})
				if (res && res.code == SUCCESS) {
					let addr = res.address;
					if(addr && addr.id){
						this.address_id = addr.id;
						this.address_name = addr.name;
						this.address_phone = addr.phone;
						this.address_desc = addr.province + addr.city + addr.area + addr.street;
						return false
					}
				}
				this.address_id = '';
				this.address_name = '';
				this.address_phone = '';
				this.address_desc=''
				// uni.request({
					// url: ADDRESS_DEFAULT	,
					// header: {
					// 	'ACCESS-CONTROL-ALLOW-TOKEN': uni.getStorageSync(this.sessionKey)
					// },
					// complete: (res) => {
					// 	if (res.data && res.data.code == SUCCESS) {
					// 		let addr = res.data.address;
					// 		if(addr && addr.id){
					// 			this.address_id = addr.id;
					// 			this.address_name = addr.name;
					// 			this.address_phone = addr.phone;
					// 			this.address_desc = addr.province + addr.city + addr.area + addr.street;
					// 			console.log(this.address_desc);
					// 		}
					// 	}
					// }
				// })
			},
			/**
			 * banner_3处理函数
			 * 数据绑定  data-index="{{index}}" 
			 * 数据取值  var index = e.currentTarget.dataset.index; var cata = this.list_cata_list[index];
			 */
			banner_3_click: function(event) {

			},

			/**
			 * btAdd_4处理函数
			 * 数据绑定  data-index="{{index}}" 
			 * 数据取值  var index = e.currentTarget.dataset.index; var cata = this.list_cata_list[index];
			 */
			submitOrder: function(event) {
				if(this.address_id==0){
					uni.showToast({
						title:"请选择收货地址",
						icon:"none"
					})
					return;
				}
				// 隐射订单列表
				const mapOrderList=this.orderList.map(item=>{
					return {
						id:item.ids||item.id,
						count:item.count,
						price:item.price
					}
				})
				// commodityCart： 购物车	commodity： 单个商品		
				// 生成对象
				const params={
					// 商品信息
					data:mapOrderList,
					// 地址信息
					userAddressId:this.address_id,
					// 备注信息
					remarks:this.remarks,
					// 类型
					type:this.orderList[0].type||'commodityCart',
					// 地址id
					userAddressId:this.address_id
				}
				// return false
				// uni.navigateTo({
				// 	url: "/pages/pay-methods/pay-methods?id=" + this.list_goods.id
				// 	+ "&money=" + this.list_goods.money + "&type=commodity&number=" + this.list_goods.number
				// 	+ "&userAddressId="+this.address_id + "&remarks="+this.remarks
				// })
				uni.navigateTo({
						url: `/pages/pay-methods/pay-methods?params=${JSON.stringify(params)}`
				})
			},

			/**
			 * pic_9处理函数
			 * 数据绑定  data-index="{{index}}" 
			 * 数据取值  var index = e.currentTarget.dataset.index; var cata = this.list_cata_list[index];
			 */
			pic_9_click: function(event) {

			}
		}
	}
</script>

<style lang="scss" scoped>
	@import './order.scss';

	.address {
		white-space: normal;
		width: 690upx;
		padding: 0upx;
		margin-top: 50upx;
		margin-left: 29upx;
		background-color: #ffffff;
		text-align: left;
		border-color: #e1e1e1;
		border-width: 1upx;
		border-style: solid;
		border-radius: 0upx;
		font-size: 8upx;
		display: flex;
		flex-direction: row;
		.location{
			width: 60upx;
			height: 60upx;
			image{
				width:100%;
				height: 100%;
			}
		}
		.address_desc{
			color: grey;
		}
	}
	.remark{
		margin: 30upx;
		border: #E1D7F0 1px solid;
		background-color: #FFFFFF;
		padding: 20upx;
	}
</style>
