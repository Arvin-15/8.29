<template>
	<div class="test-component">
		<view class="hm-goods-card">
			<view class="box" v-for="(p,i) in options" :key="i">
				<view class="titleClass">
					<text class="title">{{ p.name }}</text>
				</view>
				<view class="goods" v-for="(goods,index) in p.data" :key="goods.id"  @click="openDetail(goods)">
					<view class="wrap">
						<image class="pic" :src="goods.thumbnail" />
					</view>
					<view class="block">
						<text class="tradeName">{{ goods.name }}</text>
						<text class="describe">{{ goods.describe }}</text>
						<text class="commodity">{{ goods.commodity }}</text>
					</view>
				</view>
				<view class="row"></view>
			</view>
		</view>
	</div>
</template>

<script>
	import HmGoodsCard from '@/components/hm-goods-card/index.vue';
	import {PRODUCT_LIST} from '../../api/index.js';
	import {SUCCESS} from '../../api/errorcode.js';
	export default {
		components: {
			HmGoodsCard
		},
		data() {
			return {
				user: uni.getStorageSync("user") || {},
				options: [{
					name: '',
					id:'',
					data: []
				}]
			};
		},
		onLoad() {
			this.init();
		},
		onShow() {
			this.user = uni.getStorageSync("user");
			this.init();
		},
		methods: {
			validState() {
				if (!this.user.id) {
					return false;
				} else {
					return true;
				}
			},
			openDetail(item){
				if (!this.validState()) {
					let url = "/pages/login/login";
					uni.navigateTo({
						url
					})
					return;
				}
				uni.setStorageSync("product",item);
				uni.navigateTo({
					url:"/pages/product/product?id="+item.id
				})
			},
			init(){
				uni.showLoading({
					title:"加载中..."
				})
				//加载产品分类与产品数据
				uni.request({
					url: PRODUCT_LIST,
					method: 'POST',
					header:{
						'ACCESS-CONTROL-ALLOW-TOKEN':uni.getStorageSync(this.sessionKey)
					},
					success: (res) => {
						console.log(res.data);
						uni.hideLoading();
						if (res.data.code === SUCCESS) {
							this.options = res.data.commodity;
							// 处理线上地址的商品列表信息
							// var arr=this.options[0].data.filter(item=>{
							// 	return item.thumbnail
							// })
							// this.options[0].data=arr
							// console.log(this.options);
						}
					}
				})
			}
		}
	}
</script>

<style>
	@import '../../components/hm-goods-card/index.response.css';
</style>
