<template>
	<view class="category">
		<view class="category-wrapper" v-if="categoryList.length>0">
			<!-- 左边导航 -->
			<scroll-view scroll-y="true" class="left-wrapper" scroll-with-animation="true" :scroll-top="left_scroll">
				<view class="left-content">
					<view class="title-content" :class="select_index === index?'onSelected':''" v-for="(title,index) in categoryList"
					 :key="title.id" @tap="choose(index)">{{title.name}}</view>
				</view>
			</scroll-view>
			<!-- 右边内容 -->
			<scroll-view scroll-y="true" class="right-wrapper" scroll-with-animation="true" :scroll-top="right_scroll" @scroll="myscroll">
				<view class="right-content">
					<!-- banner区域 -->
					<view class="banner-wrapper">
						<swiper class="swiper-content" :autoplay="true" :interval="3000" :circular="true">
							<swiper-item class="swiper-item" v-for="imgs in swiperList" :key="imgs.id">
								<image class="swiper-img" :src="imgs.img"></image>
							</swiper-item>
						</swiper>
					</view>
					<!-- 产品区 -->
					<view class="product-wrapper">
						<view class="category-item">
							<view class="category-title" @click="buy">{{categoryList[select_index].name}}</view>
							<view class="category-content">
								<view class="product-item" v-for="(p_item,p_index) in contentList" :key="p_item.id" @tap="openDetail(p_item)">
									<image class="product-img" :src="p_item.thumbnail"></image>
									<text class="product-title">{{p_item.name}}</text>
								</view>
							</view>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import {PRODUCT_LIST,BANNER_LIST} from '../../api/index.js';
	import {SUCCESS} from '../../api/errorcode.js';
	export default {
		data() {
			return {
				windows_height: 0, //屏幕高度
				swiperList: [
					// {
					// 	id:"kk1",
					// 	src:"/static/banner/3.jpeg"
					// },{
					// 	id:"kk2",
					// 	src:"/static/banner/4.jpeg"
					// },{
					// 	id:"kk3",
					// 	src:"/static/banner/5.jpeg"
					// },{
					// 	id:"kk4",
					// 	src:"/static/banner/6.jpeg"
					// }
				],
				categoryList: [
					{
						id:1,
						name:"床上用品",
						// src:"/static/images/bg.jpg",
						content:[{
							id:11,
							thumb:"/static/banner/25.jpeg",
							cname:"量子生态被"
						},{
							id:12,
							thumb:"/static/banner/26.jpeg",
							cname:"量子生态枕"
						},{
							id:13,
							thumb:"/static/banner/21.jpg",
							cname:"量子生态褥"
						}]
					},
					{
						id:2,
						name:"生活用具",
						// src:"/static/images/bg.jpg",
						content:[{
							id:14,
							thumb:"/static/banner/16.jpeg",
							cname:"高能氢水杯"
						},{
							id:15,
							thumb:"/static/banner/15.jpeg",
							cname:"负离子眼镜"
						},{
							id:16,
							thumb:"/static/banner/18.jpeg",
							cname:"太阳镜"
						}]
					},
					{
						id:3,
						name:"理疗设备",
						// src:"/static/images/bg.jpg",
						content:[{
							id:18,
							thumb:"/static/banner/7.jpeg",
							cname:"生物桶"
						},{
							id:19,
							thumb:"/static/banner/22.jpg",
							cname:"能量舱"
						},{
							id:20,
							thumb:"/static/banner/19.jpeg",
							cname:"空气净化器"
						},{
							id:21,
							thumb:"/static/banner/23.jpg",
							cname:"量子喷壶"
						}]
					},
					{
						id:4,
						name:"保健服饰",
						// src:"/static/images/bg.jpg",
						content:[{
							id:22,
							thumb:"/static/banner/4.jpeg",
							cname:"护腰"
						},{
							id:23,
							thumb:"/static/banner/20.jpg",
							cname:"秋衣"
						}]
					},
					{
						id:5,
						name:"精品套餐[送普卡]",
						// src:"/static/images/bg.jpg",
						content:[{
							id:24,
							thumb:"/static/banner/18.jpeg",
							cname:"太阳镜"
						},{
							id:25,
							thumb:"/static/banner/23.jpg",
							cname:"量子喷壶"
						}]
					},
					{
						id:6,
						name:"豪华套餐A[送银卡]",
						// src:"/static/images/bg.jpg",
						content:[{
							id:26,
							thumb:"/static/banner/19.jpeg",
							cname:"空气净化器"
						},{
							id:27,
							thumb:"/static/banner/21.jpg",
							cname:"量子生态褥"
						}]
					},
					{
						id:7,
						name:"豪华套餐B[送银卡]",
						// src:"/static/images/bg.jpg",
						content:[{
							id:28,
							thumb:"/static/banner/19.jpeg",
							cname:"空气净化器"
						},{
							id:29,
							thumb:"/static/banner/4.jpeg",
							cname:"护腰"
						},{
							id:30,
							thumb:"/static/banner/18.jpeg",
							cname:"太阳镜"
						}]
					},
					{
						id:8,
						name:"旗舰套餐[送金卡]",
						// src:"/static/images/bg.jpg",
						content:[{
							id:31,
							thumb:"/static/banner/7.jpeg",
							cname:"生物桶"
						},{
							id:32,
							thumb:"/static/banner/15.jpeg",
							cname:"负离子眼镜"
						},{
							id:33,
							thumb:"/static/banner/23.jpg",
							cname:"量子喷壶"
						}]
					}
				],
				contentList:[],
				select_index: 0,
				right_height: [], //右侧每个内容的高度集合
				right_scroll: 0, //右侧的滑动值
				left_height: 0, //左侧总高度
				left_scroll: 0, //左侧滑动值
				last: 0,
			}
		},
		onLoad() {
			this.init();
			this.windows_height = uni.getSystemInfoSync().windowHeight;
		},
		methods: {
			buy(){
				uni.navigateTo({
					url:"/pages/order/order"
				})
			},
			openDetail(item){
				uni.setStorageSync("product",item);
				uni.navigateTo({
					url:"/pages/product/product?id="+item.id
				})
			},
			init() {
				//加载产品分类与产品数据
				uni.request({
					url: PRODUCT_LIST,
					method: 'POST',
					header:{
						'ACCESS-CONTROL-ALLOW-TOKEN':uni.getStorageSync(this.sessionKey)
					},
					success: (res) => {
						// console.log(res.data);
						if (res.data.code === SUCCESS) {
							this.categoryList = res.data.commodity;
							// this.$nextTick(() => {
							// 	this.getHeightList();
							// })
							if(this.categoryList.length>0){
								this.contentList = this.categoryList[0].data;
								console.log(this.contentList);
							}
						}
					}
				});
				
				//加载轮播图数据
				uni.request({
					url:BANNER_LIST,
					header:{
						'ACCESS-CONTROL-ALLOW-TOKEN':uni.getStorageSync(this.sessionKey)
					},
					success:(res)=>{
						// console.log("轮播图列表:");
						// console.log(res.data.bannerList);
						this.swiperList = res.data.bannerList;
					}
				})
			},
			choose(index) {
				if (this.select_index === index) {
					return;
				}
				this.select_index = index;
				// 加入防抖
				if (this.timeout) {
					clearTimeout(this.timeout); //清除计时器				
				}
				this.contentList = this.categoryList[index].data;
				// console.log(this.contentList);
			},
			myscroll(e) {
				//引入节流	
				let right_content_height = e.detail.scrollHeight - this.windows_height;
				if (right_content_height == e.detail.scrollTop) {
					return;
				}
				let scroll_top = e.detail.scrollTop + 110; //110是banner图的高度
				//判断当前的scrollTop在哪个区间内;
				let now = +new Date();
				if (now - this.last > 100) {
					this.last = now;
					let active_index = this.right_height.findIndex((value, index, arr) => value <= scroll_top && scroll_top < arr[
						index + 1]);
					this.select_index = active_index;
					if (this.left_height - this.windows_height) {
						//如果有超出部分
						let diff = this.left_height - this.windows_height
						this.left_scroll = Math.round((active_index * diff) / (this.categoryList.length - 1))
					}
				}
			}
		}
	}
</script>

<style lang="scss">
	.category {
		.category-wrapper {
			width: 100%;
			display: flex;
			flex-direction: row;
			position: absolute;
			top: 0;
			bottom: 0;

			.left-wrapper {
				width: 220upx;
				flex: 0 0 220upx;
				background-color: #f6f6f6;

				.left-content {

					.title-content {
						width: 100%;
						height: 100upx;
						display: flex;
						justify-content: center;
						align-items: center;
						font-size: 25upx;
						border-bottom: 1px solid #dedede;
						cursor: pointer;

						&:last-child {
							border-bottom: 0;
						}

						&.onSelected {
							background-color: #fff;
							position: relative;
							color: #feb436;

							&::before {
								content: '';
								position: absolute;
								left: 0;
								top: 0;
								width: 10upx;
								height: 100%;
								background: linear-gradient(124deg, #feb436 0%, #fb7c22 100%);
							}
						}
					}
				}
			}

			.right-wrapper {
				flex: 1;

				.right-content {
					width: 100%;
					padding: 20upx 0;
					border-left: 1upx solid #efefef;
					box-sizing: border-box;

					.banner-wrapper {
						padding: 0 20upx;

						.swiper-content {
							width: 100%;
							height: 180upx;
							margin-bottom: 20upx;

							.swiper-item {
								.swiper-img {
									width: 100%;
									height: 180upx;
								}
							}
						}
					}

					.product-wrapper {
						.category-item {

							.category-title {
								height: 60upx;
								font-size: 26upx;
								line-height: 60upx;
								font-weight: 500;
								background-color: #f6f6f6;
								padding-left: 20upx;
								color: #000;
							}

							.category-content {
								display: flex;
								flex-direction: row;
								flex-flow: wrap;
								padding: 20upx 20upx 0;


								.product-item {
									width: 33%;
									display: flex;
									flex-direction: column;
									justify-content: center;
									align-items: center;
									margin-bottom: 20upx;

									.product-img {
										width: 110upx;
										height: 115upx;
										margin-bottom: 10upx;
									}

									.product-title {
										font-size: 23upx;
									}
								}
							}
						}
					}
				}
			}
		}

	}
</style>
