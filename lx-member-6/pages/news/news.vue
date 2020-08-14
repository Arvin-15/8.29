<template>
	<view class="content">
		<view class="title">
			{{title}}
		</view>
		<view class="art-content">
			<rich-text :nodes="strings" class="richText"></rich-text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: '',
				strings: ''
			}
		},
		onLoad(e) {
			console.log('新闻ID：', e.newsid);
			let news = uni.getStorageSync("news");
			this.title = news.title;
			this.strings = news.content;
			// uni.showLoading({
			// 	title: '加载中',
			// 	mask: true
			// })
			// uni.request({
			// 	url: 'https://unidemo.dcloud.net.cn/api/news/36kr/' + e.newsid,
			// 	method: 'GET',
			// 	data: {},
			// 	header:{
			// 		'ACCESS-CONTROL-ALLOW-TOKEN':uni.getStorageSync(this.sessionKey)
			// 	},
			// 	success: (res) => {
			// 		uni.hideLoading();
			// 		this.title = res.data.title;
			// 		this.strings = res.data.content;
			// 	}
			// })
		},
		methods: {

		}
	}
</script>

<style>
	.content {
		padding: 10upx 2%;
		width: 96%;
		flex-wrap: wrap;
	}

	.title {
		line-height: 2em;
		font-weight: 700;
		font-size: 38upx;
		margin: 20upx auto;
		text-align: center;
	}

	.art-content image{
		max-width: 100%;
	}
</style>
