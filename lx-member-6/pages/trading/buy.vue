<template>
	<!-- 我要购入-->
	<view>
		<div class="main">
			<div class="apply">
				<p>申请买入</p>
				 <form class="cmxform form-horizontal tasi-form" name="form1" id="form1" method="post" action="">
				                <ul>
				                    <li>
				                        <div class="item-content">
				                            <div class="item-media"><i class="icon icon-form-name"></i></div>
				                            <div class="item-inner">
				                                <div class="item-title label">单价</div>
				                                <div class="item-input">0.475--1.045</div>
				                            </div>
				                        </div>
				                    </li>
				                    
				                        <div class="item-content">
				                            <div class="item-media"><i class="icon icon-form-name"></i></div>
				                            <div class="item-inner">
				                                <div class="item-title label">申请数量</div>
				                                <div class="inputnumber">
				                                    <input type="number" name="num" placeholder="请输入1-300的整数">
				                                </div>
				                            </div>
				                        </div>
				                    </li>
				                    <li>
				                       <!-- <div class="item-content">
				                            <div class="item-media"><i class="icon icon-form-name"></i></div>
				                            <div class="item-inner">
				                                <div class="item-title label">交易密码</div>
				                                <div class="inputCode">
				                                    <input type="password" name="pwd_trade" placeholder="请输入交易密码">
				                                </div>
				                            </div>
				                        </div> -->
				                    </li>
				                </ul>
				            </form>
							<div class="btn">
								<button class="confirm">确认申请</button>
								<button class="cancel">取消</button>
							</div>
							
			</div>
			<div class="mylist">
				<p>我的买入列表</p>
				<div class="list">
				<span>时间</span>
				<span>数量</span>
				<span>单价</span>
				<span>合计金额</span>
				<span>状态</span>
				<span>操作</span>
				</div>
				
				
			</div>
		
		<!-- <uni-segmented-control :current="$store.state.current" :values="buy" @clickItem="onClickItem" style-type="text" -->
		<!-- active-color="#FF8C00"></uni-segmented-control> -->
		<!-- <view class="buy_content"> -->
			<!-- 购买列表 -->
			<!-- <view v-show="$store.state.current === 0" > -->
				<!-- <view class="isEmpty" v-if="tradingList.length==0"> -->
					<!-- 目前还未有人发布购买信息 -->
				<!-- </view> -->
				<!-- view class="buyList" v-else>
						<block v-for="item in tradingList" :key="item.id">-->
							<!-- 图文卡片模式 -->
						<!-- 	<uni-card :title="'求购人:'+item.userName"  is-shadow :extra="'金币数量:'+item.currency+'个'"> -->
								<!-- <view class="buy_contents"> -->
									<!-- 交易状态:<view class="state">{{item.state=="0"?'正在发布中':''}}</view>
									<button type="warn" size="mini" @click="confirmBuy($event,item.id,item.currency)">交易</button> --><!-- 
								</view>
							</uni-card>
						</block>
				 --><!-- </view> -->
			<!-- </view> -->
			<!-- 我要购买 -->
			<!-- <view class="buy_form" v-show="$store.state.current === 1"> -->
				<!-- 查询单价 -->
				<!-- <view class="search_content">
					<view class="search_btn">
						<button type="primary" size="mini" @click="handleSearch">查询单价</button>
						<button type="primary" size="mini" @click="handleConvert">兑换金币</button>
					</view> -->
				<!-- 	<view class="search_price">市场积分区域</view>
				</view> -->
				<!-- 求购表单 -->
				<!-- <view class="form_content">
					<view class="form_title">
						求购信息
					</view> -->
					<!-- 昵称 -->
					<!-- <view class="form_name">
						<view>昵称:</view>
						<input type="text" v-model="buyInfo.nickname" placeholder="请输入昵称" />
					</view> -->
					<!-- 单价 -->
					<!-- <view class="form_price">
						<view>单价:</view>
						<input type="number" v-model="buyInfo.price" @change="handlePrice" placeholder="请输入求购单价" />
					</view> -->
					<!-- 数量 -->
					<!-- <view class="form_count">
						<view style="font-weight: 700;">数量:</view>
						<input type="number" v-model="buyInfo.count" @blur="handleCount" placeholder="请输入求购金币数量" />
					</view> -->
					<!-- 总价格 -->
					<!-- <view class="form_totalmoney">
						<view>总价格:</view>
						<view>￥{{totalMoney}}元</view>
					</view> -->
					<!-- 提交按钮 -->
				<!-- 	<view class="form_btn">
						<button type="warn" size="mini"  :disabled="buyInfo.count==0" @click="submitBuyForm">确认求购</button>
					</view>
				</view>
			</view> -->
			<!-- 求购查询的弹出层 -->
			<!-- <uni-popup ref="popup" type="bottom" @change="changePop($event,true)">
				<view class="search_info">
					<view class="pop_title">
						请在下方输入您想要查询的积分编号
					</view> -->
					<!-- <view class="pop_content">
						<icon type="cancel" size="18" v-show="val" @click="reset($event,true)" color="#ccc"/>
						<uni-icons type="search" size="22" class="pop_icon"></uni-icons>
						<input type="number" v-model="val" placeholder="请输入查询积分编号">
						</input>
					</view>
					<view class="pop_btn">
						<button type="default" size="mini" @click="closePop($event,true)">取消</button>
						<button type="primary" size="mini" @click="searchPrice">查询</button> -->
				<!-- 	</view>
				</view>
			</uni-popup> -->
			<!-- 兑换金币弹出层 -->
			<!-- <uni-popup ref="popups" type="bottom" @change="changePop"> 
				<view class="search_info">
					<view class="pop_title"> -->
						<!-- 请在下方输入需要兑换的金币数量 -->
					<!-- </view>
					<view class="pop_content">
						<icon type="cancel" size="18" v-show="convert" @click="reset" color="#ccc"/>
						<input type="number" v-model="convert" placeholder="请输入需要兑换的金币数量" />
					</view>
					<view class="pop_btn">
						<button type="default" size="mini" @click="closePop">取消</button>
						<button type="warn" size="mini" @click="confirmConvert">兑换</button> -->
		<!-- 			</view>
				</view>
			</uni-popup>
		</view> -->
		</div>
	</view>
</template>

<script>
	import {RELEASEBUY,BUYLIST,BUYCOIN} from "@/api/index.js"
	import {SUCCESS} from "@/api/index.js"
	export default {
		props:['tradingList'],
		data() {
			return {
				// 求购信息
				buyInfo: {
					// 昵称
					nickname: '',
					// 单价
					price: 1,
					// 数量
					count: ''
				},
				// 兑换的金币数量
				convert:'',
				current: 0,
				buy: ["购买列表", "发布购买"],
				// 查询搜索框的字段信息
				val: ''
			};
		},
		// computed: {
		// 	// 求购总价
		// 	totalMoney() {
		// 		return this.buyInfo.price * Math.floor(this.buyInfo.count)
		// 	},
		// 	//	求购按钮状态
		// 	disabled() {
		// 		return !this.totalMoney
		// 	}
		// },
		methods: {
			// 切换tab栏
			onClickItem(e) {
				this.clearBuyCount()
				this.$store.commit('handleClickChildren', e.currentIndex)
				// 产生自定义事件，获取购买列表
				if(e.currentIndex==0) this.$emit("getShopList",0)
			},
			// 清空求购数量
			clearBuyCount(){
				this.buyInfo.count=""
			},
			// 点击确认按钮
			submitBuyForm() {
				// console.log(this.buyInfo);
				const params={
					/* 类型 */
					type:'publishWantToBuy',
					/* 购买金币的数量 */
					num:this.buyInfo.count,
				}
				/* 跳转到支付接口 */
				uni.navigateTo({
					url:`/pages/pay-methods/pay-methods?params=${JSON.stringify(params)}`
				})
			},
			// 交易
			async confirmBuy(e,id){
				const {data:res}=await this.$http({
					url:RELEASEBUY,
					method:"POST",
					data:{
						id
					}
				})
				if(res.code!=SUCCESS){
					uni.showToast({
						title:"购买失败，稍微重试",
						icon:"loading"
					})
					return false
				}
				uni.showToast({
					title:"购买成功",
					icon:"loading"
				})
				// 更新购买列表
				this.$emit("getShopList",0)
			},
			//	求购数量
			handleCount() {
				if (this.buyInfo.count == 0) this.buyInfo.count = 1
				this.buyInfo.count = Math.floor(this.buyInfo.count)
			},
			// // 求购单价
			// handlePrice() {
			// 	if (this.buyInfo.price == 0) {
			// 		uni.showToast({
			// 			title: "求购单价不能为空",
			// 			icon: "loading"
			// 		})
			// 		// 这里更改为查询到单价
			// 		return false
			// 	}
			// },
			// 查询积分单价数据
			postSearchInfo(){
				console.log('发送查询请求');
			},
			// 查询市场积分单价
			searchPrice() {
				if(!this.val){
					uni.showToast({
						title:"查询编号不能为空",
						icon:"loading"
					})
					return false
				}
				this.postSearchInfo()
				console.log(this.val);
			},
			// 点击查询按钮
			handleSearch() {
				this.$refs.popup.open()
			},
			// 清空搜索框
			reset(e,flag) {
				if(flag) this.val = ''
				else this.convert=''
			},
			// 点击兑换金币
			handleConvert(){
				this.$refs.popups.open()
			},
			// 确认兑换
			async confirmConvert(){
				if(this.convert==0) this.convert=1
				this.convert=Math.floor(this.convert)
				const {data:res}=await this.$http({
					url:BUYCOIN+`/${this.convert}`,
					method:"PUT"
				})
				if(res.code==-1){
					uni.showToast({
						title:"积分不足",
						icon:"loading"
					})
					this.$refs.popups.close()
					return false;
				}
				uni.showToast({
					title:"兑换成功"
				})
				this.$refs.popups.close()
			},
			// 关闭弹出层
			closePop(e,flag){
				// 关闭查询弹出层
				if(flag){
					this.$refs.popup.close()
					this.reset(e,flag)
				}else{
					 this.$refs.popups.close()
					 this.reset()
				}
			},
			// 弹出层发生改变的时候
			changePop(e,flag){
				// 说明弹出关闭
				if(!e.show)this.reset(e,flag)
			}
		}
	}
</script>

<style lang="scss" scoped>
	// .buy_content {
	// 	padding: 0 10px;
	// 	text-align: center;
	// 	.isEmpty{
	// 		text-align: center;
	// 		margin-top: $uni-spacing-col-lg;
	// 		font-weight: 700;
	// 		color: red;
	// 		font-size: $uni-font-size-lg;
	// 		opacity: .7;
	// 	}
		// .buyList{
		// 	.buy_contents{
		// 		display: flex;
		// 		button{
		// 			position: absolute;
		// 			right: $uni-spacing-row-lg;
		// 		}
		// 	}
		// }
		// .search_content {
		// 	margin: 15px 0;
		// 	.search_btn{
		// 		display: flex;
				// justify-content: space-between;
		// 	}
		// 	.search_price{
		// 		margin-top: $uni-spacing-col-lg;
		// 		text-align: center;
		// 		height: 60px;
		// 		line-height: 60px;
		// 		color: #fff;
		// 		background-color: #ccc;
		// 	}
		// }

		// .form_content {
		// 	font-size: 12px;
		// 	margin-top: 50px;
		// 	.form_title {
		// 		font-size: 20px;
		// 		font-weight: 700;
		// 		margin-bottom: 20px;
		// 	}

			// .form_name,
			// .form_count,
			// .form_price,
			// .form_totalmoney {
			// 	display: flex;
			// 	height: 30px;
			// 	justify-content: space-between;
			// 	border-bottom: 1px solid #eee;
			// }

			// .form_name,
			// .form_count,
			// .form_price {
			// 	input {
			// 		font-size: 14px;
			// 		flex: 1;
			// 		height: 100%;
			// 	}
			// }

			// .form_totalmoney {
			// 	view:nth-child(2) {
			// 		flex: 1;
			// 		font-weight: 700;
			// 		font-size: 18px;
			// 		color: red;
			// 	}
			// }

		// 	.form_count {}

		// 	.form_totalmoney {}

		// 	.form_btn {
		// 		margin: 10px 10px 10px 0;
		// 		float: right;
		// 	}
		// }

		// .search_info {
		// 	width: 100%;
		// 	height: 200px;
		// 	background-color: #fff;
		// 	padding: $uni-spacing-row-base;

		// 	.pop_title {
		// 		font-size: 18px;
		// 		font-weight: 700;
		// 		border-bottom: 1px solid $uni-border-color;
		// 		padding-bottom: 10px;
		// 	}

		// 	.pop_content {
		// 		display: flex;
		// 		align-items: center;
	// 			height: 80px;
	// 			padding: $uni-spacing-col-sm $uni-spacing-col-lg;
	// 			border-bottom: 1px solid $uni-border-color;

	// 			input {
	// 				flex: 1;
	// 				height: 50%;
	// 				font-size: $uni-font-size-base;
	// 				border: 1px solid $uni-border-color;
	// 				background-color: #f5f5f5;
	// 				border-radius: 20px;
	// 			}

	// 			icon {
	// 				z-index: 2;
	// 				position: absolute;
	// 				right: 60rpx;
	// 			}
	// 			.pop_icon{
	// 				position: absolute;
	// 				left: 80rpx;
	// 			}
	// 		}

	// 		.pop_btn {
	// 			display: flex;
	// 			padding-top: 20px;
	// 			justify-content: space-between;
	// 			button{
	// 				flex: 1;
	// 			}
	// 		}
	// 	}
	// }
	.main{
		position:relative;
		width:335px;
		
		margin: 0 auto;
		p{
			font-size:16px;
			font-weight: 700;
			// font-family: "Helvetica Neue";
			text-align: center;
			margin-top:15px;
			// color:#000000;
		}
		ul{
			list-style: none;
			// background-color:#000000;
			height:126.7px;
			weight:335px;
			padding:0;
			margin:0;
			li{
				height:43.27px;
				weight:335px;
				// background-color: #007AFF;
			}
			.item-content{
				// background-color: #334444;
				
			}
			.item-input{
				position:absolute;
				top:29px;
				left:100px;
				// background-color: #F9221D;
				width:220.48px;
				height:41px;
				font-size:16px;
				text-align: center;
				line-height:41px;
			}
			
			.item-inner{
				height:41px;
			}
			.item-title.label{
				width:86px;
				// background-color: #111111;
				height:41px;
				font-size:16px;
				text-align: center;
				line-height:41px;
			}
			.inputnumber{
				position:absolute;
				top:70px;
				left:100px;
				// background-color: #525252;
				width:220.47px;
				height:41px;
				line-height: 41px;
				
				line-height:41px;
				}
				
				.uni-input-wrapper{
					// margin-top:10px;
					
					// text-align:center;
					// line-height:41px;
				}
				.inputCode{
					position:absolute;
					top:111px;
					left:100px;
					width:220.47px;
					height:41px;
					
				}
				uni-input{
					position: absolute;
					top:10px;
				}
			
		}
		.btn{
			// padding-top: 25px;
			width:235px;
			height:100px;
			margin:0 auto;
			// background-color: #221122;
		}
		.confirm{
			// margin-top: 30px;
			width:230px;
			height:40px;
			text-align: center;
			line-height:40px;
			border:1px solid #000000;
			background-color: #FF4040;
		}
		.cancel{
			width:230px;
			height:40px;
			// border-top: none;
			// border:1px solid #000000;
			// background-color: #28A745;
		}
		.mylist{
			font-size:16px;
			font-weight:700;
			margin:0 auto;
			.list{
				margin:0 auto;
				// background-color: #222222;
			}
			.list>span{
				padding:9px;
			}
		}
		
		
	}
</style>
