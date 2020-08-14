<template>
	<!-- 交易大厅-->
	
	<view>
		<div class="main">
			
			<p>求购信息</p>
			<div class="find">
				
					<input type="number" id="search" placeholder="请输入买家账户">
					<button class="btn">搜索</button>
				
		
				
		
			</div>
			<div class="myList">
				<!-- <div class="list">
					<span></span>
					<span></span>
					<span></span>
					<span></span>
				</div> -->
				<div class="condition">
					<table width="100%" border="0" cellpadding="0" cellspacing="0" id="table-5">
					                    <thead>
					                        <tr>
					                            <th align="center">
					                                <div align="center">数量</div>
					                            </th>
					                            <th align="center">
					                                <div align="center">单价</div>
					                            </th>
					                            <th align="center">
					                                <div align="center">金额</div>
					                            </th>
					                            <th align="center">
					                                <div align="center">操作</div>
					                            </th>
					                        </tr>
					                    </thead>
					                                        <tr>
					                        <td align="center" class="num">5.00</td>
					                        <td align="center">0.7125$</td>
					                        <td align="center" class="price">3.5625$</td>
					                        <td align="center">
					                        <button data-ordernum="20200813174800156889" class="sell button button-fill button-warning" style="width:80px;font-size:16px;">卖出</button>
					                        </td>
					                    </tr>
					                                        <tr>
					                        <td align="center" class="num">3.00</td>
					                        <td align="center">0.475$</td>
					                        <td align="center" class="price">1.425$</td>
					                        <td align="center">
					                        <button data-ordernum="20200813174717809642" class="sell button button-fill button-warning" style="width:80px;font-size:16px;">卖出</button>
					                        </td>
					                    </tr>
					                                        <tr>
					                        <td align="center" class="num">2.00</td>
					                        <td align="center">0.475$</td>
					                        <td align="center" class="price">0.95$</td>
					                        <td align="center">
					                        <button data-ordernum="20200813174650971749" class="sell button button-fill button-warning" style="width:80px;font-size:16px;">卖出</button>
					                        </td>
					                    </tr>
					                                        <tr>
					                        <td align="center" class="num">2.00</td>
					                        <td align="center">0.475$</td>
					                        <td align="center" class="price">0.95$</td>
					                        <td align="center">
					                        <button data-ordernum="20200813174648715163" class="sell button button-fill button-warning" style="width:80px;font-size:16px;">卖出</button>
					                        </td>
					                    </tr>
					                                        <tr>
					                        <td align="center" class="num">1.00</td>
					                        <td align="center">0.475$</td>
					                        <td align="center" class="price">0.475$</td>
					                        <td align="center">
					                        <button data-ordernum="20200813174648187623" class="sell button button-fill button-warning" style="width:80px;font-size:16px;">卖出</button>
					                        </td>
					                    </tr>
					                                        <tr>
					                        <td align="center" class="num">2.00</td>
					                        <td align="center">0.475$</td>
					                        <td align="center" class="price">0.95$</td>
					                        <td align="center">
					                        <button data-ordernum="20200813174647164961" class="sell button button-fill button-warning" style="width:80px;font-size:16px;">卖出</button>
					                        </td>
					                    </tr>
					                                        <tr>
					                        <td align="center" class="num">2.00</td>
					                        <td align="center">0.475$</td>
					                        <td align="center" class="price">0.95$</td>
					                        <td align="center">
					                        <button data-ordernum="20200813174646660739" class="sell button button-fill button-warning" style="width:80px;font-size:16px;">卖出</button>
					                        </td>
					                    </tr>
					                                        <tr>
					                        <td align="center" class="num">1.00</td>
					                        <td align="center">0.475$</td>
					                        <td align="center" class="price">0.475$</td>
					                        <td align="center">
					                        <button data-ordernum="20200813174515377640" class="sell button button-fill button-warning" style="width:80px;font-size:16px;">卖出</button>
					                        </td>
					                    </tr>
					                                        <tr>
					                        <td align="center" class="num">4.00</td>
					                        <td align="center">0.475$</td>
					                        <td align="center" class="price">1.9$</td>
					                        <td align="center">
					                        <button data-ordernum="20200813174515300678" class="sell button button-fill button-warning" style="width:80px;font-size:16px;">卖出</button>
					                        </td>
					                    </tr>
					                                        <tr>
					                        <td align="center" class="num">5.00</td>
					                        <td align="center">0.7125$</td>
					                        <td align="center" class="price">3.5625$</td>
					                        <td align="center">
					                        <button data-ordernum="20200813174514190757" class="sell button button-fill button-warning" style="width:80px;font-size:16px;">卖出</button>
					                        </td>
					                    </tr>
					                                        <tr>
					                        <td align="center" class="num">3.00</td>
					                        <td align="center">0.475$</td>
					                        <td align="center" class="price">1.425$</td>
					                        <td align="center">
					                        <button data-ordernum="20200813174508459437" class="sell button button-fill button-warning" style="width:80px;font-size:16px;">卖出</button>
					                        </td>
					                    </tr>
					                                        <tr>
					                        <td align="center" class="num">2.00</td>
					                        <td align="center">0.475$</td>
					                        <td align="center" class="price">0.95$</td>
					                        <td align="center">
					                        <button data-ordernum="20200813174508433045" class="sell button button-fill button-warning" style="width:80px;font-size:16px;">卖出</button>
					                        </td>
					                    </tr>
					                                        <tr>
					                        <td align="center" class="num">9.00</td>
					                        <td align="center">0.7125$</td>
					                        <td align="center" class="price">6.4125$</td>
					                        <td align="center">
					                        <button data-ordernum="20200813174504577863" class="sell button button-fill button-warning" style="width:80px;font-size:16px;">卖出</button>
					                        </td>
					                    </tr>
										</table>
										<div id="list_bottom" class="list-bottom">
												    <div align="right" class="pages">
												        <ul class="pagination"><li class="disabled"><span>上一页</span></li> <li><a href="/index/trade/index.html?page=2">下一页</a></li></ul>		    </div>
												</div>
					
				</div>
				
			</div>
		</div>
<!-- 		<uni-segmented-control :current="$store.state.current" :values="mine" @clickItem="onClickItem" style-type="text"
		 active-color="#4169E1"></uni-segmented-control> -->
		 <!-- 正在交易-->
		<!-- <view v-show="$store.state.current === 0">
			<view class="isEmpty" v-if="nowMineList.length==0">
				目前还未有正在交易的信息 -->
			<!-- </view> -->
			<!-- <block v-for="item in nowMineList" :key="item.id" v-else> -->
				<!-- 图文卡片模式 -->
	<!-- 			<uni-card  :title="'出售方:'+item.creatorUserName" mode="title" is-shadow  :extra="'交易数量:'+item.currency"> -->
			<!-- 		<view class="card_content">
						交易状态:<view class="state">{{item.state=="0"?'正在交易':''}}</view>
						<button type="warn" size="mini">取消交易</button>
					</view>
				</uni-card>
			</block> -->
		<!-- </view> -->
		<!-- 交易完成 -->
	<!-- 	<view v-show="$store.state.current === 1">
			<view class="isEmpty" v-if="completeMineList.length==0">
				目前还未有交易成功的信息
			</view> -->
			<!-- <block v-for="item in completeMineList" :key="item.id" v-else> -->
				<!-- 图文卡片模式 -->
			<!-- 	<uni-card  :title="'买方:'+item.buy" mode="title" is-shadow  :extra="'卖方:'+item.sell">
					<view class="card_content">
						交易状态:<view class="state">{{item.state=="2"?'交易完成':''}}</view>
					</view>
				</uni-card>
			</block> -->
		<!-- </view> -->
		<!-- 交易失败 -->
		<!-- <view v-show="$store.state.current === 2">
			<view class="isEmpty" v-if="failMineList.length==0">
				目前还未有交易失败的信息
			</view> -->
			<!-- <block v-for="item in failMineList" :key="item.id" v-else> -->
				<!-- 图文卡片模式 -->
		<!-- 		<uni-card  :title="'买方:'+item.buy" mode="title" is-shadow  :extra="'卖方:'+item.sell">
					<view class="card_content">
						交易状态:<view class="state">{{item.state=="3"?'交易失败':''}}</view>
					</view>
				</uni-card>
			</block>
		</view> -->
	</view>
</template>

<script>
	import {NOWSHOP,COMPELETESHOP,FAILSHOP} from "@/api/index.js"
	export default {
		props:['nowMineList','completeMineList','failMineList'],
		data() {
			return {
				current: 0,
				// 我的交易
				mine: ['正在交易', '完成交易', '交易失败']
			};
		},
		methods: {
			// 切换子tab栏
			onClickItem(e) {
				this.$store.commit('handleClickChildren', e.currentIndex)
				// 正在交易
				if (this.$store.state.current == 0) {
					// 获取正在交易信息
					this.getTradingNow()
				}
				// 完成交易
				else if (this.$store.state.current == 1) {
					// 获取完成交易信息
					this.getTradingFinish()
				}
				// 交易失败
				else {
					// 获取交易失败信息
					this.getTradingField()
				}
			},
			// 正在交易信息
			getTradingNow() {
				this.requestMineList(NOWSHOP,1)
			},
			// 获取完成交易信息
			getTradingFinish() {
				this.requestMineList(COMPELETESHOP,2)
			},
			// 获取交易失败信息
			getTradingField() {
				this.requestMineList(FAILSHOP,3)
			},
			// 发起请求
			async requestMineList(url,type){
				const {data:res}=await this.$http({
					url:url+'?type='+type
				})
				/* 产生自定义事件，更新交易数组 */
				this.$emit("showMineList",res.data.list)
			}
		},
		created() {
			/* 发起请求 */
			this.getTradingNow()
			this.getTradingFinish()
			this.getTradingField()
		}
	}
</script>

<style lang="scss" scoped>
	// .card_content{
	// 	display: flex;
	// 	.state{
	// 		color: red;
	// 		font-weight: 700;
	// 	}
	// 	button{
	// 		position: absolute;
	// 		right: $uni-spacing-col-lg;
	// 	}
	// }
	// .isEmpty{
	// 	text-align: center;
	// 	margin-top: $uni-spacing-col-lg;
	// 	font-weight: 700;
	// 	color: red;
	// 	font-size: $uni-font-size-lg;
	// 	opacity: .7;
	// }
	
.main{
	position: relative;
	
	p{
		font-size:18px;
		font-weight:800;
		text-align: center;
		margin:15px;
		color:#000000;
		font-family: "Helvetica Neue", Helvetica, sans-serif;
		// background-color: #000000;
		
	}

		.find{
			position:relative;
			top:0px;
			left:25px;
			width:200px;
			height:33px;
			border-radius: 5px;
			border:1px solid #000000;
			// background-color: #28A745;
			
			// .finding{
			// 	position: absolute;
			// 	top:20px;
			// 	left:30px;
			// 	height:35px;
			// 	}
				}
				#search{
					position: absolute;
					top:0px;
					left:0px;
					width:200px;
					height:35px;
					
					
				}
				.btn{
					position:absolute;
					background-color: #FF4040;
					left:206px;
					top:0px;
					width:70px;
					height:35px;
					text-align: center;
					line-height: 35px;
				}
			
			
			// .uni-input-input{
			// 	position:absolute;
			// 	left:0px;
				
			// 	height:35px;
			// }
			#table-5{
				padding-top:20px;
				color:#000000;
				font-size: 18px;
				
			}
			.sell.button.button-fill.button-warning{
				background-color: #FF4040;
				height:35px;
				margin-top:5px;
			}
			// tr{
			// 	margin-top:15px;
			// }
			ul li{
				padding:0;
				margin:0;
				list-style:none;
				
			}
			span{
				position:absolute;
				bottom:-30px;
				left:70px;
				background-color: #FF4040;
				height:25px;
				width:60px;
				text-align: center;
				line-height: 25px;
				border: 1px solid #000000;
				border-radius: 5px;
			}
			a{
				position:absolute;
				bottom:-30px;
				right:150px;
				background-color: #FF4040;
				height:25px;
				width:60px;
				text-align: center;
				line-height: 25px;
				border: 1px solid #000000;
				border-radius: 5px;
				text-decoration: none;
				
			}
		
		
	}
</style>
