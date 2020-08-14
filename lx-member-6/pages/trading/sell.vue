<template>
	<!-- 我要出售 -->
	<view>
		<div class="main">
			<div class="mylist">
				<p>我的出售列表</p>
				<div class="list">
					<span>时间</span>
					<span>数量</span>
					<span>单价</span>
					<span>合计金额</span>
					<span>状态</span>
					<span>操作</span>
				</div>
				
			</div>
		</div>
		<!-- <uni-segmented-control :current="$store.state.current" :values="sell" @clickItem="onClickItem" style-type="text" active-color="#9932CC"></uni-segmented-control>
		        <view class="content"> -->
					<!-- 出售列表 -->
		           <!-- <view v-show="$store.state.current === 0" >
						<view class="isEmpty" v-if="tradingList.length==0"> -->
							<!-- 目前还未有人发布出售信息 -->
						<!-- </view>
		                <view class="sellList" v-else>
								<block v-for="item in tradingList" :key="item.id"> -->
									<!-- 图文卡片模式 -->
									<!-- <uni-card  :title="'出售人:'+item.creatorUserName"  is-shadow :extra="'金币数量:'+item.currency+'个'"> -->
										<!-- <view class="sell_content">
											交易状态:<view class="state">{{item.state=="0"?'正在发布中':''}}</view>
											<button type="warn" size="mini" @click="confirmBuy($event,item.id,item.currency)">购买</button> --><!-- 
										</view>
									</uni-card>
								</block>
		                </view>
		            </view> -->
					<!-- 我要出售 -->
		            <!-- <view v-show="$store.state.current === 1">
						<view class="sellInfo"> -->
							<!-- 头部 -->
							<!-- <view class="sellInfo_title">
								您当前拥有的金币数量为:<view>{{count}}</view>
							</view> -->
							<!-- 当前金币价格区域 -->
							<!-- <view class="sellInfo_price">
								当前金币行情区域
							</view> -->
							<!-- 内容 -->
							<!-- <view class="sellInfo_content">
								<view class="content_title">
									出售信息
								</view> -->
							<!-- 	<view class="content_ipt">
									数量:
									<input type="number" v-model="sellCount" placeholder="请输入需要出售的金币数量" @blur="handleInput"/> -->
								<!-- </view>
								<view class="content_btn">
									<button type="warn" size="mini" v-show="!count" :disabled="count==0">金币不足</button>
									<button type="warn" size="mini"	v-show="count" :disabled="sellCount==0" @click="confrimSell">确认出售</button> -->
					<!-- 			</view>
							</view>
						</view>
		            </view>
		        </view> -->
	</view>
</template>

<script>
	import {RELEASESELL,USER_INFO,SELLLIST} from "@/api/index.js"
	import {SUCCESS} from "@/api/errorcode.js"
	export default {
		props:["count","tradingList"],
		data() {
			return {
				current:0,
				sell:["出售列表","发布出售"],
				// 出售的数量
				sellCount:''
			};
		},
		methods:{
			onClickItem(e){
				this.$store.commit('handleClickChildren',e.currentIndex)
				this.clearSellCount()
				// 产生自定义事件，获取出售列表
				if(e.currentIndex==0) this.$emit("getShopList",1)
			},
			/* 用户失焦事件 */
			handleInput(e){
				if(this.sellCount==0){
					this.sellCount=1; 
					return false;
				}
				this.sellCount=Math.floor(this.sellCount)
			},
			/* 确认出售 */
			confrimSell(){
				this.postSellInfo()
			},
			// 购买金币
			confirmBuy(e,id,num){
				let params={
					id,
					type:"buyWantToSell",
					num
				}
				uni.navigateTo({
					url:`/pages/pay-methods/pay-methods?params=${JSON.stringify(params)}`
				})
			},
			/* 发送网络请求 */
			async postSellInfo(){
				const {data:res}=await this.$http({
					url:RELEASESELL,
					method:"POST",
					data:{
						type:1,
						currency:this.sellCount
					}
				})
				if(res.code!==SUCCESS){
					uni.showToast({
						title:"发布出售失败",
						icon:"loading"
					})
					return false
				}
				uni.showToast({
					title:"发布出售成功"
				})
				this.getUserInfo()
				this.clearSellCount()
			},
			/* 清空出售信息 */
			clearSellCount(){
				this.sellCount=''
			},
			// 获取出售列表信息
			async getSellListInfo(){
				const {data:res}=await this.$http({
					url:SELLLIST
				})
			},
			/* 获取用户信息，更新金币数量 */
			async getUserInfo(){
				const {data:res}=await this.$http({
					url:USER_INFO+'/'+uni.getStorageSync('sess_jk')
				})
				// 存储到本地缓存中
				uni.setStorageSync('user',res.user)
				// 产生自定义事件
				this.$emit('changeSellFCount',res.user.coin)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.isEmpty{
		text-align: center;
		margin-top: $uni-spacing-col-lg;
		font-weight: 700;
		color: red;
		font-size: $uni-font-size-lg;
		opacity: .7;
	}
		
	.sellInfo{
		padding:0 $uni-spacing-col-lg ;
		padding-top: $uni-spacing-col-lg;
		.sellInfo_title{
			display: flex;
			font-size: 30rpx;
			font-weight: 700;
			justify-content: center;
			view{
				color: red;
				font-size: 30rpx;
			}
		}
		.sellInfo_price{
			margin-top: $uni-spacing-col-lg;
			text-align: center;
			height: 60px;
			line-height: 60px;
			color: #fff;
			background-color: #ccc;
		}
		.sellInfo_content{
			margin-top: 50px;
			text-align: center;
			padding: $uni-spacing-col-lg 0;
			.content_title{
				font-weight: 700;
				margin-bottom: 20px;
				font-size: 36rpx;
			}
			.content_ipt{
				display: flex;
				height: 50px;
				font-size: 14px;
				font-weight: 700;
				align-items: center;
				border-bottom: 1rpx solid $uni-border-color;
				input{
					margin-left: $uni-spacing-row-lg;
					height: 100%;
					font-size: 14px;
					font-weight: normal;
				}
			}
			.content_btn{
				margin-top: 20px;
				button{
					float: right;
				}
			}
		}
	}
	.sellList{
		.sell_content{
			display: flex;
			button{
				position: absolute;
				right: $uni-spacing-row-lg;
			}
		}
	}
	// 上面是原css
	
	.mylist{
		font-size:16px;
		font-weight:700;
		margin:0 auto;
		
		p{
			height:41px;
			font-size:16px;
			font-weight: 700;
			// font-family: "Helvetica Neue";
			text-align: center;
			margin-top:15px;
			// color:#000000;
		}
		.list{
			// background-color: #000000;
			text-align: center;
			span{
				padding-left: 15px;
			}
		}
		
		
	}
</style>
