<template>
	<view class="product_container">
		<!-- 轮播图 -->
		<swiper  autoplay :interval="3000" :duration="1000">
			<swiper-item>
				<image :src="goodInfo.img" ></image>
			</swiper-item>
		</swiper>
		<!-- 商品详情 -->
		<view class="product_content">
			<!-- 价格 名称  -->
			<view class="box1">
				<view class="box1_money">
					<view>￥{{goodInfo.retailprice}}</view>
					<uni-icons type="redo"></uni-icons>
				</view>
				<view class="box1_title">{{goodInfo.name}}</view>
			</view>
			<!-- 下划线 -->
			<view class="line"></view>
			<!-- 服务 规格 收货地址-->
			<view class="box2">
				<view class="box2_fuwu">
					<view>服务:</view>
					<uni-tag text="放心购" type="error"  size="small"></uni-tag>
					<uni-tag text="极速退款" type="error"  size="small"></uni-tag>
					<uni-tag text="安全发货" type="error"  size="small"></uni-tag>
				</view>
				<!-- <view class="box2_size">
					<view>规格:</view>
					<uni-icons type="arrowright"></uni-icons>
				</view> -->
				<view class="box2_address" @click="goAddress">
					<view>收货地址:</view>
					<view class="box2_address_info" v-if="addressInfo">{{address}}</view>
					<view class="box2_address_info" v-else>请选择收货地址</view>
					<uni-icons type="arrowright"></uni-icons>
				</view>
			</view>
			<view class="line"></view>
			<!-- 图文介绍 -->
			<view>
				<view>
					{{goodInfo.detail}}
				</view>   
			</view>
		</view>
		<!-- 悬浮按钮 -->
		 <uni-fab
		            :pattern="pattern"
		            :content="content"
		            horizontal="right"
		            direction="vertical"
		            @trigger="trigger"
					v-show="flag"
		>
		</uni-fab>
		<!-- 商品dialog对话框 -->
		<uni-popup ref="popup" type="bottom"  @change="popChange">
			<view class="pop">
				<view class="pop_title">
					{{goodInfo.name}}
				</view>
				 <view class="pop_content">
					<view>数量：</view>
					<yp-number-box @change="changeCount" :min="1" :value="shopInfo.count" />
				</view>
				<view class="pop_btn">
					<view class="pop_close" @click="closeShopdialog" @touchstart="popCloseOpen" @touchend="popCloseEnd"  :style="close?'backgroundColor:#fff':''">
						取消
					</view>
					<view class="pop_comfrim" @click="confirmShop"   @touchstart="popConfrimOpen" @touchend="popConfrimEnd"  :style="confirm?'backgroundColor:#fff':''">
						确认
					</view>
				</view>
			</view>
		</uni-popup>
		
		<!-- 商品导航 -->
		<uni-goods-nav :popMenu="flag" fill :options="options" :buttonGroup="buttonGroup" @click="go" @buttonClick="addCart"></uni-goods-nav>
	</view>
</template>

<script>
	import {PRODUCT_DETAIL,CARTADD,CARTLIST}from '@/api/index.js'
	import {SUCCESS} from '@/api/errorcode.js'
	export default{
			data(){
				return{
						// 商品详情
						goodInfo:{ 
							id:'',
							name:'',
							img:'',
							retailprice:''
						},
						// 悬浮按钮配置
						content:[
							{
								iconPath:'/static/tabbar/index.png',
								selectedIconPath:'/static/tabbar/indexSelected.png',
								text:'主页'
							},
							{
								iconPath:'/static/tabbar/cart.png',
								selectedIconPath:'/static/tabbar/cartSelected.png',
								text:'购物车'
							},
							{
								iconPath: '/static/tabbar/my.png',
								selectedIconPath: 'static/tabbar/mySelected.png',
								text:'个人中心'
							}
						],
						pattern:{
							'color':'red',
							'font-weight':700,
							'backgroundColor':'#ddd'	,
							'buttonColor':'3c3e49'	
						},
						// 商品导航配置
						options: [{
						            icon: 'headphones',
						            text: '客服'
						        }, {
						            icon: 'shop',
						            text: '店铺'
						        }, {
						            icon: 'cart',
						            text: '购物车',
									info: null
						        }],
						buttonGroup: [{
						          text: '加入购物车',
						          backgroundColor: '#ff0000',
						          color: '#fff'
						        },
						        {
						          text: '立即购买',
						          backgroundColor: '#ffa200',
						          color: '#fff'
						        }],
						// 商品数据
						shopInfo:{
							// 商品id
							id:null,
							// 删除的id
							ids:null,
							// 商品数量
							count:1,
							// 商品价格
							price:null,
							// 商品图片:
							url:null,
							// 商品名称
							title:null,
							// 商品选中状态
							isChecked:true
						},
						// 收货地址
						addressInfo:null,
						// 显示悬浮按钮的条件	
						flag:false,
						// 点击确认按钮改变样式
						confirm:false,
						//点击取消按钮改变样式
						close:false
					}
			},
			
			methods:{  
				// 获取商品详情
				async getGoodDetail(id){
					if (!id) return false
					const {data:res}=await this.$http({
						url:PRODUCT_DETAIL+`/${id}`
					})
					if(res.code !=SUCCESS) return false
					this.goodInfo=res.commodityInfo
					this.shopInfo.url=res.commodityInfo.img
					this.shopInfo.title=res.commodityInfo.name
					this.shopInfo.price=res.commodityInfo.retailprice
				},
				// 点击商品导航按钮
				addCart(e){
					// 加入购物车
					if(e.index===0){
						// 显示遮罩层
						this.$refs.popup.open()						
					}else{
						// 立即购买
						// 隐射传递参数
						// count:1,type:'commodity'
						let {id,name:title,img:url,retailprice:price}=this.goodInfo;
						let cartInfo={
							// 单个商品的id
							id,
							// 商品的名称
							title,
							// 商品图片
							url,
							// 商品价格
							price,
							// 商品数量
							count:1,
							// 商品类型
							type:'commodity'
						}
						// 跳转到订单列表
						uni.redirectTo({
							url:`/pages/order/order?params=${JSON.stringify(cartInfo)}`
						})
					}
				},
				// 商品导航左侧按钮
				go(e){
					
					if(e.index===0){
						// 客服
					}else if(e.index===1){
						// 店铺
					}else {
						// 跳转购物车
						uni.switchTab({
							url:'/pages/category/shopcar'
						})
					}
				},
				// 弹出层组件发生改变的时候
				popChange(e){
					if(!e.show) this.shopInfo.count=1
				},
				// 关闭加入购物车对话框
				closeShopdialog(){
					this.$refs.popup.close()
				},
				// 长按取消按钮
				popCloseOpen(e){
					this.close=true
				},
				// 离开取消按钮
				popCloseEnd(){
					this.close=false
				},
				// 长按确定按钮
				popConfrimOpen(){
					this.confirm=true
				},
				// 离开确定按钮
				popConfrimEnd(){
					this.confirm=false
				},
				// 点击确定加入购物车按钮
				async confirmShop(){
					this.$refs.popup.close()
					const {data:res} =await this.$http({
						url:CARTADD,
						method:'POST',
						data:{
							// 商品id
							commodityId:this.shopInfo.id,
							// 商品数量
							number:this.shopInfo.count
						}
					})
					if(res.code!==SUCCESS){
						uni.showToast({
							title:"加入购物车失败",
							icon:"loading"
						})
						return false
					}
					uni.showToast({
						title:"加入购物车成功"
					})
					this.requestCartList()
					// 缓存到本地
					this.$store.dispatch('add',this.shopInfo)
					this.options[2].info=this.$store.state.total;
				},
				// 商品数量发生改变
				changeCount(index){
					// 更新商品的数量
					this.shopInfo.count=index
				},
				// 映射商品编号id
				async requestCartList(){
					const {data:res}=await this.$http({
						url:CARTLIST
					})
					res.list.some(item=>{
						if(item.commodity_id===this.shopInfo.id){
							this.shopInfo.ids=item.id
							return true
						}
					})
				},
				// 点击悬浮按钮
				trigger(e){
					console.log(e);
					// 主页
					if(e.index==0){
						uni.switchTab({
							url:'/pages/index/index'
						})
					}else if(e.index==1){
					// 购物车
						uni.switchTab({
							url:'/pages/category/shopcar'
						})
					}else{
					// 个人中心 
						uni.switchTab({
							url:'/pages/mine/mine'
						})
					}
				},
				// 选择收货地址
				goAddress(){
					uni.navigateTo({
						url:'/pages/address/address'
					})
				}
			},
			computed:{
				// 收货地址
				address(){
					return this.addressInfo.province+' / '+this.addressInfo.city+' / '+this.addressInfo.area
				}
			},
			onLoad(options) {
				this.shopInfo.id=options.id
				this.getGoodDetail(options.id)
				this.options[2].info=this.$store.state.total;
			},
			onShow() {
				var total=0
				if(uni.getStorageSync('cart'))uni.getStorageSync('cart').filter(item=>item.isChecked).forEach(item=>total+=item.count)
				this.options[2].info=total
				if(uni.getStorageSync('addressList'))this.addressInfo=uni.getStorageSync('addressList').filter(item=>item.isMain)[0]
			},
			onPageScroll(e) {
				if(e.scrollTop>40) this.flag=true
				else this.flag=false
			}
	}
</script>
<style lang="less"  scoped>
	.product_container{
		margin-bottom: 50px;
		swiper{
			width: 100%;
			height: 375px;
			image{
				width: 100%;
				height: 100%;
			}
		}
		.product_content{
			margin-top: 2%;
			padding: 0 3%;
			.line{
				margin: 2% -3%;
				border-bottom: 10rpx solid #eee;
			}
			.box1{
				.box1_money{
					display: flex;
					justify-content: space-between;
					view{
						margin-left: -1%;
						color: red;
						font-size: 1.8em;
						font-weight: 700;
					}
				}
				.box1_title{
						font-weight: 700;
				}
			}
			.box2{
				.box2_size,
				.box2_fuwu,
				.box2_address{
					display: flex;
					view{
						margin-right: 15%;
						font-size: 0.8em;
						color: #ccc;
					}
				}
				.box2_fuwu{
					margin-bottom: 5px;
					.uni-tag{
						margin: 0 1% ;
					}
				}
				.box2_size,
				.box2_address{
					line-height: 1;
					justify-content: space-between;
					.box2_address_info{
						color: #000;
						font-size: 13px;
						font-weight: 700;
					}
				}
			}
			
		}
		.uni-goods-nav{
			position: fixed;
			bottom: 0;
			width: 100%;
			border-top: 1px solid #eee;
		}
		.uni-tab__text{
			margin-top: 1%!important;
		}
		.pop{
			width: 100%;
			height: 150px;
			background-color: #fff;
			text-align: center;
			.pop_title{
				margin: 0 10px 15px 0;
				font-weight: 700;
				font-size: 18px;
			}
			.pop_content{
				display: flex;
				justify-content: center;
			}
			.pop_btn{
				display: flex;
				width: 100%;
				height: 50px;
				position: absolute;
				bottom: 0;
				background-color: #eee;
				border-top: 1px solid #ccc;
				.pop_comfrim,
				.pop_close{
					flex: 1;
					line-height: 50px;
					text-align: center;
					font-size: 21px;
				}
			}
		}
	}
</style>