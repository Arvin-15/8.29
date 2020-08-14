<template>
	<view class="hm-goods-card">
		<view class="box" v-for="(p,i) in options" :key="i">
			<view class="titleClass">
				<text class="title">{{ p.name }}</text>
			</view>
			<view class="goods" v-for="(goods,index) in p.data" :key="goods.id">
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
</template>
<script>
	export default {
		name: 'HmGoodsCard',
		props: {
			dataId: {
				type: String,
				default: 'hm-goods-card'
			},
			options: {
				type: Array,
				default: function() {
					return [{
						name: '热门产品',
						id:123,
						data:[
							{
								id:123,
								thumbnail: './images/img_25335_0_1.png',
								name: '圆形户外搁脚凳',
								describe: '搁脚凳',
								commodity: '凳子'
							}
						]
					}];
				}
			}
		},
		data() {
			return {};
		},
		methods: {}
	};
</script>
<style>
	@import './index.response.css';
</style>
