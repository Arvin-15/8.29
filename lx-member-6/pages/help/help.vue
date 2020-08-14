<template>
	<view>
		<!-- 公益帮扶 -->
		<view class="news">
			<view class="vip_buy">
				<view class="vip_buy_title">
					公益帮扶
				</view>
				<view class="vip_buy_line">
				</view>
			</view>
		</view>
		<!-- 申请帮扶 -->
		<view class="help">
			<button type="primary" style="background-color: #FD6801;" @click="needHelp">申请帮扶</button>
		</view>
		<!-- 帮扶列表 -->
		<view class="list">
			<view class="cu-list menu sm-border bg-white">
				<view class="cu-item" v-for="(item,idx) in helpeList" :key="idx" @click="openHelper(item.id)">
					<view class="flex justify-start">
						<image class="basic" :src="item.logo || '../../static/goods/p1.jpg'" style="height: 150upx;line-height: 150upx;vertical-align: middle;"></image>
						<view class="content">
							<text class="text-ellipsis2">{{item.title}}</text>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				helpeList:[
					{
						id:11,
						title:"II型糖尿病求助治疗费",
						content:"",
						userId:20023121,
						logo:'../../static/order_details/order_details_3_3.jpg',
						imgs:["凭证1.jpg","凭证2.jpg","凭证3.jpg"]
					},
					{
						id:12,
						title:"求助一台轮椅",
						content:"",
						userId:20023121,
						logo:'../../static/order_details/order_details_3_3.jpg',
						imgs:["凭证1.jpg","凭证2.jpg","凭证3.jpg"]
					},
					{
						id:13,
						title:"解决老年人早餐问题",
						content:"",
						userId:20023121,
						logo:'../../static/order_details/order_details_3_3.jpg',
						imgs:["凭证1.jpg","凭证2.jpg","凭证3.jpg"]
					}
				]
			}
		},
		methods: {
			needHelp(){
				// uni.showToast({
				// 	title:"功能暂未开放",
				// 	icon:"none"
				// }),
				uni.navigateTo({
					url:"/pages/help/needhelp"
				})
			},
			openHelper(id){
				let help = this.helpeList.find((item,index)=>{
					return item.id == id;
				})
				uni.setStorageSync("help",help);
				//跳转到帮扶信息详情页
				uni.navigateTo({
					url:"/pages/help/help?helpid="+id
				})
			}
		}
	}
</script>

<style>
.vip {
		margin-top: 10upx;
		background-color: white;
	}
	.active{
		margin-top: 10upx auto;
	}
	
	.vip_buy {
		position: relative;
		height: 50upx;
	}
	
	.vip_buy_line {
		position: absolute;
		height: 1px;
		width: 375upx;
		background-color: #ccc;
		top: 50%;
		margin-top: -0.5px;
		left: 50%;
		margin-left: -185upx;
	}
	
	.vip_buy_title {
		position: absolute;
		background-color: white;
		left: 50%;
		transform: translateX(-50%);
		z-index: 99;
		padding: 2px 5px;
		color: grey;
	}
	
	.swiper-title {
		position: absolute;
		bottom: 0;
		background-color: rgba(0, 0, 0, 0.4);
		color: white;
		text-align: left;
		width: 100%;
		text-indent: 1em;
		padding: 7upx 0;
	}
	
	.vip_card,.vip_activity {
		display: flex;
		justify-content: space-around;
	}
	
	.vip_activity .activity{
		width: 120upx;
		height: 120upx;
		text-align: center;
	}
	.activity image{
		width: 80upx;
		height: 80upx;
	}
	.list{
		margin-top: 30upx;
	}
	.news{
		margin-top: 50upx;
	}
	.content{
		padding-left: 15upx;
	}
	.help{
		margin: 20upx auto;
		padding: 5upx 40upx;
	}
</style>
