<template>
	<view>
		<!-- tab栏切换 -->
		<uni-segmented-control :current="current" :values="items" @clickItem="onClickItem" style-type="button" active-color="#EE2C2C"></uni-segmented-control>
		<view class="content">
			<!-- 我的交易 -->
		    <view v-show="current === 0">
		       <mine :nowMineList="nowMineList" :completeMineList="completeMineList" :failMineList="failMineList" @showMineList="updateMineList"/>
			</view>
			<!-- 我要购买 -->
		    <view v-show="current === 1">
				<buy @getShopList="updateShopList" :tradingList="tradingList"/>
		    </view>
			<!-- 我要出售 -->
		    <view v-show="current === 2">
				<!-- 监听自定义事件，更新金币数量 -->
				<sell 	:count="count" 
						@changeSellFCount="updateSellFCount" 
						:tradingList="tradingList"
						@getShopList="updateShopList"
				/>
		    </view>
		</view>        
	</view>
</template>

<script>
	import {NOWSHOP,BUYLIST,SELLLIST} from '@/api/index.js'
	import mine from './mine.vue'
	import buy from './buy.vue'
	import sell from './sell.vue'
	export default {
		components:{
			mine,
			buy,
			sell
		},
		data() {
			return {
				current:0,
				// 外层tab栏
				items:['交易大厅','我要购入','我要出售'],
				// 用户的金币数量
				count:0,
				// 购买||出售 列表信息
				tradingListInfo:{
					// 页码
					page:1,
					// 每页显示的数据数量
					limit:5,
					// 交易类型 /* 0：购买 1：出售*/
					type:0
				},
				// 我的正在交易
				nowMineList:[],
				// 交易完成
				completeMineList:[],
				// 交易失败
				failMineList:[],
				// 购买 || 出售信息
				tradingList:[]
			};
		},
		methods:{
			onClickItem(e){
				this.current=e.currentIndex
				this.$store.commit('handleClickParent')
				// 我的交易
				if(this.current==0)  {
					// 获取正在交易的信息
					this.getTradingNow()
				}
				// 我要购买
				else if(this.current==1){
					// 获取购买列表信息
					this.getBuyList()
				}
				// 我要出售
				else {
					// 获取出售列表信息
					this.getSellList()
				}
			},
			// 获取正在交易的信息
			async getTradingNow(){
				const {data:res}=await this.$http({
					url:NOWSHOP+'?type=1'
				})
				this.nowMineList=res.data.list
				// console.log("正在交易");
				// console.log(this.nowMineList);
			},
			// 获取购买列表信息
			getBuyList(){
				this.tradingListInfo.type=0
				this.requestList(BUYLIST)
			},
			// 获取出售列表信息
			getSellList(){
				this.tradingListInfo.type=1
				this.requestList(SELLLIST)
			},
			// 发送网络列表请求
			async requestList(url){
				/* 购买列表 */
				const {data:res}=await this.$http({
					url:url+`?page=${this.tradingListInfo.page}&limit=${this.tradingListInfo.limit}&type=${this.tradingListInfo.type}&state=0`
				})
				this.tradingList=res.data.list
			},
			// 更新金币数量
			updateSellFCount(num){
				this.count=num
			},
			// 更新我的交易信息
			updateMineList(list){
				/* 正在交易 */
				this.nowMineList=list
				/* 交易完成 */
				this.completeMineList=list
				/* 交易失败 */
				this.failMineList=list
			},
			// 更新出售列表 || 
			updateShopList(type){
				this.tradingListInfo.type=type
				type==1?this.requestList(SELLLIST):this.requestList(BUYLIST)
			}
		},
		onLoad() {
			// 获取正在交易的信息
			// this.getTradingNow()
			// 获取金币数量
			this.count =uni.getStorageSync('user').coin
		}
	}
</script>

<style lang="less">

</style>
