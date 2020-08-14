<template>
	<view class="content">
		<view class="top"></view>
		<view class="banner">
			<dl>
				<dt>
					<image src="../../favicon.png" mode=""></image>
				</dt>
				<dd>菩提慈善</dd>
			</dl>
			<view class="img">
				<image :src="shareImg"  ref="shareImg" lazy-load></image>
			</view>
			<!-- <view class="tgtit">推广链接：<text class="tugurl">{{shareLink}}</text></view> -->
			<view class="tgtit">您的邀请码：<text class="tugurl">{{myCode}}</text></view>
			<view class="sharbuttn">
				<view class="btn" @click="save">保存二维码</view>
				<view class="btn" @click="sharurl">复制推广链接</view>
				<!-- <navigator class="btn" url="/pages/zhiwen-share/zhiwen-share">分享</navigator> -->
			</view>

			<!-- <button class="btn" @click="share">分享</button> -->
			<!-- <view class="shartitle"><view>分享</view></view>
		<view class="sharapk" @click="share">
			<view><image src="../../static/qrcode/weact.png"></image></view>
			<view><image src="../../static/qrcode/shar.png"></image></view>
			<view><image src="../../static/qrcode/qq.png"></image></view>
		</view> -->
		</view>
	</view>
</template>

<script>
	import {MY_PROMOTION} from '@/api/index.js'
	export default {
		data() {
			return {
				providerList: [],
				shareLink: '',
				shareImg: "",
				myCode: "",
				type: 0,
			}
		},
		onShow() {
			// this.openShare();
			// this.getShareInfo();
		},
		onLoad() {
			this.openShare();
			this.getShareInfo();
			this.getMyShareInfo()
		},
		methods: {
			async getMyShareInfo() {
				const {
					data: res
				} = await this.$http({
					url: MY_PROMOTION
				})
				this.shareImg = "data:image/png;base64," + res.promotion.base64
			},
			getShareInfo() {
				var _this = this;
				//获取个人分享二维码和分享链接
				let user = uni.getStorageSync("user");
				this.shareLink = user.shareSrc;
				this.myCode = user.myCode;
				// this.shareImg = user.shareImg;
				// this.baseImgFile(Math.ceil(Math.random()*1000),
				// 	"data:image/png;base64," + user.shareImg,
				// 	10,(pic)=>{
				// 		console.log(pic.target);
				// 	_this.shareImg = pic.target;
				// });
			},
			baseImgFile(uid, base64, quality, callback) {
				quality = quality || 10;
				callback = callback || $.noop;
				var bitmap = new plus.nativeObj.Bitmap();
				// 从本地加载Bitmap图片
				bitmap.loadBase64Data(base64, function() {
					//    console.log('加载图片成功');
					bitmap.save("_doc/" + uid + ".jpg", {
						overwrite: true,
						quality: quality
					}, function(i) {
						callback(i);
						//    console.log('保存图片成功：'+JSON.stringify(i));
					}, function(e) {
						console.log('保存图片失败：' + JSON.stringify(e));
					});
				}, function(e) {
					console.log('加载图片失败：' + JSON.stringify(e));
				});
			},
			openShare() {
				// this.version = plus.runtime.version;
				//获取分享通道
				uni.getProvider({
					service: 'share',
					complete: (e) => {
						console.log(e);
						let data = [];
						for (let i = 0; i < e.provider.length; i++) {
							switch (e.provider[i]) {
								case 'weixin':
									data.push({
										name: '分享到微信好友',
										id: 'weixin'
									})
									data.push({
										name: '分享到微信朋友圈',
										id: 'weixin',
										type: 'WXSenceTimeline'
									})
									break;
								case 'qq':
									data.push({
										name: '分享到QQ',
										id: 'qq'
									})
									break;
								default:
									break;
							}
						}
						this.providerList = data;
					},
					fail: (e) => {
						console.log('获取登录通道失败' + JSON.stringify(e));
					}
				});
			},
			//复制分享链接
			sharurl() {
				uni.setClipboardData({
					data: this.shareLink,
					success: function() {
						console.log('success');
						uni.showToast({
							title: '内容复制成功'
						});
					}
				});
			},
			//保存图片到相册
			save() {
				uni.showActionSheet({
					itemList: ['保存图片到相册'],
					success: () => {
						uni.saveImageToPhotosAlbum({
							filePath: this.shareImg,
							success: function() {
								uni.showToast({
									title: "保存成功",
									icon: "none"
								});
							},
							fail: function(err) {
								console.log("保存失败:", err);
								uni.showToast({
									title: "保存失败",
									icon: "none"
								});
							}
						});
					}
				})
			},
			share(e) {
				if (this.providerList.length === 0) {
					uni.showModal({
						title: '当前环境无分享渠道!',
						showCancel: false
					})
					return;
				}
				let itemList = this.providerList.map(function(value) {
					return value.name
				})

				console.log(itemList)

				uni.showActionSheet({
					itemList: itemList,
					success: (res) => {
						console.log(this.providerList[res.tapIndex].id)
						if (this.providerList[res.tapIndex].id == 'qq') {
							this.type = 1
						} else {
							this.type = 0
						}
						uni.share({
							provider: this.providerList[res.tapIndex].id,
							scene: this.providerList[res.tapIndex].type && this.providerList[res.tapIndex].type === 'WXSenceTimeline' ?
								'WXSenceTimeline' : "WXSceneSession",
							type: this.type,
							title: '菩提慈善',
							summary: '菩提慈善APP是一个专注于慈善健康事业的应用',
							imageUrl: '/favicon.png',
							href: this.shareLink,
							success: (res) => {
								console.log("success:" + JSON.stringify(res));
							},
							fail: (e) => {
								uni.showModal({
									content: e.errMsg,
									showCancel: false
								})
							}
						});
					}
				})
			},
		}
	}
</script>

<style scoped>
	.tugurl {
		color: #999;
	}

	.sharbuttn {
		display: flex;
		justify-content: center;
	}

	.shartitle {
		width: 80%;
		text-align: center;
		margin-left: 10%;
		border-bottom: 1px solid #dddddd;
		position: relative;
		height: 60upx;
	}

	.tgtit {
		text-align: center;
	}

	.shartitle view {
		height: 50upx;
		line-height: 50upx;
		font-size: 28upx;
		color: #999;
		width: 120upx;
		margin: 32upx auto;
		position: absolute;
		background: #fff;
		left: 50%;
		margin-left: -60upx;
	}

	.sharapk {
		display: flex;
		justify-content: center;
		margin: 20upx auto
	}

	.sharapk view {
		margin: 40upx;
	}

	.sharapk view image {
		height: 80upx;
		width: 80upx;
	}

	.content {
		width: 100%;
		background-color: #ffffff;
	}

	.top {
		width: 100%;
		height: 150upx;
	}

	.banner {
		width: 100%;
		background-color: #FFFFFF;
		border-radius: 60upx 60upx 0 0;
		margin-top: -60upx;
	}

	.banner dl {
		margin-top: -80upx;
	}

	.banner dl dt {
		text-align: center;
	}

	.banner dl dt image {
		width: 160upx;
		height: 160upx;
		border-radius: 50%;
	}

	.banner dl dd {
		text-align: center;
	}

	.img {
		width: 450upx;
		height: 450upx;
		margin: 0 auto;
		margin-top: 60upx;
	}

	.img image {
		width: 100%;
		height: 100%;
	}

	.btn {
		width: 260upx;
		height: 60upx;
		line-height: 60upx;
		margin: 0 auto;
		margin-top: 60upx;
		border-radius: 40upx;
		border: 0;
		font-size: 26upx;
		outline: 0;
		background: #33b17b;
		color: #FFFFFF;
		text-align: center;
	}

	.bottom {
		width: 100%;
		height: 400upx;
		/* 	background: url(../../static/qrcode/img/beij.png) no-repeat; */
		background-position: left bottom;
		/* 设置背景图片位置 */
		background-size: 20%;
	}

	.bottom ul {
		padding-left: 40upx;
		box-sizing: border-box;
	}

	.bottom ul li {
		width: 100%;
		height: 60upx;
	}
</style>
