<template>
	<view>
		<!-- 新闻列表 -->
		<!-- <view class="news">
			<view class="vip_buy">
				<view class="vip_buy_title">
					健康知识
				</view>
				<view class="vip_buy_line">
				</view>
			</view>
		</view> -->
		<!-- 列表 -->
		<view class="list">
			<view class="cu-list menu sm-border bg-white">
				<view class="cu-item" v-for="(item,idx) in newsList" :key="idx" @click="openNews(item.id)">
					<view class="flex justify-start">
						<image class="basic" :src="item.img || '../../static/goods/p1.jpg'" style="height: 150upx;line-height: 150upx;vertical-align: middle;"></image>
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
	import {NEWS_LIST} from '../../api/index.js';
	import {SUCCESS} from '../../api/errorcode.js';
	export default {
		data() {
			return {
				user:uni.getStorageSync("user") || {},
				newsList: []
			}
		},
		created(){
			this.user=uni.getStorageSync("user");
			this.initNewsList();//加载新闻列表
		},
		methods: {
			go(link){
				if(!this.validState()){
					return uni.showToast({
						title:"请您先登录!",
						icon:"none"
					})
				}
				uni.navigateTo({
					url:link
				})
			},
			validState(){
				if(!this.user.id){
					return false;
				}else{
					return true;
				}
			},
			openNews(id){
				let news =  this.newsList.find((item,index)=>{
					return item.id == id;
				})
				uni.setStorageSync("news",news);
				//跳转到新闻详情页
				uni.navigateTo({
					url:"/pages/news/news?newsid="+id
				})
			},
			initNewsList(){
				//加载新闻列表
				let _this = this;
				uni.request({
					url: NEWS_LIST,
					header:{
						'ACCESS-CONTROL-ALLOW-TOKEN':uni.getStorageSync(_this.sessionKey)
					},
					success(res) {
						console.log("新闻列表:")
						// console.log(res.data);
						if (res.data.code == SUCCESS) {
							_this.newsList = res.data.newsVOList;
							// console.log(_this.newsList);
						}
					}
				})
			}
		}
	}
</script>

<style scoped>
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
