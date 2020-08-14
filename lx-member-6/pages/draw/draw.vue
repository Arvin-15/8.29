<template>
	<view class="content">
		<LotteryDraw :disabled="disabled" :grid_info_arr="grid_info_arr" :lottery_draw_param="lottery_draw_param" @get_winingIndex='get_winingIndex' @luck_draw_finish='luck_draw_finish'></LotteryDraw>
		<view id="tips">
			<view class="tip_title">抽奖须知:</view>
			<view class="tip_title">1.每次抽奖扣除10积分</view>
			<view class="tip_title">2.抽中的积分会充值到账户中</view>
			<view class="tip_title">3.每天公益抽奖最多5次,今天还有<text class="count">{{count}}</text>次机会</view>
		</view>
	</view>
</template>
<script>
	import {LOTTERY_RES,LOTTERY_COUNT} from '../../api/index.js';
	import {SUCCESS} from '../../api/errorcode.js';
	import LotteryDraw from '../../components/SJ-LotteryDraw/SJ-LotteryDraw.vue';
	export default {
		components: {
			LotteryDraw
		},
		data() {
			return {
				user:uni.getStorageSync("user") || {},
				day:'',
				isRun:false,
				count:5,
				disabled:false,
				grid_info_arr:[
						{
						        logo:"../../static/money.png",//每个格子显示的图片
						        text:"5积分",//每个格子的文字（奖品名称）
										number:5,
						    },
						    {
						        logo:"../../static/money.png",
						        text:"20积分",
										number:20
						    },
						    {
						        logo:"../../static/money.png",
						        text:"50积分",
										number:50
						    },
						    {
						        logo:"../../static/money.png",
						        text:"无",
										number:0
						    },
						    {
						        logo:"../../static/money.png",
						        text:"10积分",
										number:10
						    },
						    {
						        logo:"../../static/money.png",
						        text:"5积分",
										number:5
						    },
						    {
						        logo:"../../static/money.png",
						        text:"200积分",
										number:200
						    },
						    {
						        logo:"../../static/money.png",
						        text:"无",
										number:0
						    },
						    {
						        logo:"../../static/money.png",
						        text:"50积分",
										number:50
						    }
					],
				lottery_draw_param: {
					startIndex: 0, //开始抽奖位置，从0开始
					totalCount: 4, //一共要转的圈数
					winingIndex: 4, //中奖的位置，从0开始
					speed: 50 //抽奖动画的速度 [数字越大越慢,默认100]
				}
			};
		},
		onLoad() {
			this.getCount();
			// 本地计数器(抽奖次数)
			// var date= new Date();
			// this.day = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
			// var _this = this;
			// uni.getStorage({
			// 	key:this.day,
			// 	complete:function(res){
			// 		_this.count = res.data;
			// 			if(_this.count===0){
			// 				console.log(_this.count);
			// 				_this.disabled = true;
			// 			}else{
			// 				if(_this.count==""){
			// 					_this.count=5;
			// 				}
			// 				_this.disabled = false;
			// 			}
			// 			console.log(_this.count);
			// 	}
			// })
		},
		methods: {
			getCount(){
				let _this = this;
				//远程计数器 LOTTERY_COUNT
				uni.request({
					url:LOTTERY_COUNT+"/"+_this.user.id,
					header:{
						'ACCESS-CONTROL-ALLOW-TOKEN':uni.getStorageSync(_this.sessionKey)
					},
					method:"GET",
					complete:function(res){
						console.log("查询今日剩余抽奖次数:");
						console.log(res);
						if(res.statusCode == 200){
							if(res.data.code === SUCCESS){
								_this.count = res.data.number;
								if(_this.count<=0){
									_this.count = 0;
									_this.disabled = true;
								}
							}else{
								uni.showToast({
									title:res.data.msg
								})
								_this.count = 0;
							}
						}
					}
				})
			},
			// 修改获奖位置（可以在这里获取后台的数据
			get_winingIndex(callback) {
				let _this = this;
				uni.request({
					url:LOTTERY_RES+"/"+_this.user.id,
					header:{
						'ACCESS-CONTROL-ALLOW-TOKEN':uni.getStorageSync(_this.sessionKey)
					},
					method:"GET",
					complete:function(res){
						console.log("查询本次抽奖结果:");
						console.log(res);
						if(res.statusCode == 200){
							if(res.data.code === SUCCESS){
								let drawNumber = res.data.number;
								let index = _this.grid_info_arr.findIndex((item,index)=>{
									return item.number == drawNumber;
								})
								_this.lottery_draw_param.winingIndex=index;
								//props修改在小程序和APP端不成功，所以在这里使用回调函数传参，
								callback(_this.lottery_draw_param);
							}else{
								uni.showToast({
									title:res.data.msg,
									icon:"none"
								})
							}
						}
					}
				})
			},
			// 抽奖完成
			luck_draw_finish(param) {
				this.getCount();
				// this.count--;
				// console.log(this.count);
				// console.log("key:"+this.day);
				// uni.setStorage({
				// 	key:this.day,
				// 	data:this.count,
				// 	complete: (res) => {
				// 		console.log("==setStorage=" ,res);
				// 		uni.getStorage({
				// 			key:this.day,
				// 			complete:function(res){
				// 				console.log(res);
				// 			}
				// 		})
				// 	}
				// })
				if(param.text!="无"){
					uni.showToast({
						title:`恭喜:${param.text}!`,
						icon:"success"
					})
				}else{
					uni.showToast({
						title:`遗憾:再接再厉!`,
						icon: "none"
					})
				}
			}
		}
	}
</script>
<style scoped>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		margin-top: 100upx;
	}

	#tips {
		width: 600upx;
		margin: 100upx auto;
		font-weight: bold;
	}
	.tip_title{
		font-size: 32upx;
	}
	.count{
		font-weight: bold;
		color: red;
	}
</style>
