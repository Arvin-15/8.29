<template>
	<view>
		<!-- 默认显示相机 -->
	</view>
</template>

<script>
	import { pathToBase64 } from 'image-tools'
	export default {
		data() {
			return {
				// 百度人脸识别的token
				token:null,
				// 设备高度
				// wh:null,
				// 照片信息
				imgInfo:null,
				// 照片尺寸
				imgSize:null
			}
		},
		methods: {
			getPhotoImage(){
				uni.chooseImage({
					// 选择照片的数量
					count:1,
					// 类型:拍摄照片
					sourceType:['camera'],
					success:(res)=>{
						console.log(res);
						this.imgInfo=res.tempFilePaths[0]
						this.imgSize=res.tempFiles[0].size
						this.faceToPhoto()
					}
				})
			},
			// 人脸识别
			async faceToPhoto(){
				const imgBase64=await pathToBase64(this.imgInfo)
				// 截取64位的图片
				let image=imgBase64.split(',')[1]
				// 说明选择图片大于10M
				if(this.imgSize>10240000){
					uni.showLoading({
						title:"图片过大，重新选择"
					})
					setTimeout(()=>{
						// 跳转会当前页面
						uni.navigateTo({
							url:'/pages/face/faces'
						})
					},1000)
					return false
				}
				const data=await uni.request({
					url:`https://aip.baidubce.com/rest/2.0/face/v3/faceverify?access_token=${this.token}`,
					header:{
						'Content-Type':'application/json'
					},
					method:"POST",
					data:[
						{
							// base64位图片信息
							image,
							// 图片类型
							"image_type":"BASE64"
						}
					]
				})
				const face=data[1].data.result
				// 证明是活体
				if(face['face_liveness']>(1-face['thresholds']['frr_1e-4'])){
					uni.navigateTo({
						url:"/pages/validPay/validPay"
					})
					return false
				}
				uni.showToast({
					title:"人脸认证失败",
					icon:"loading"
				})
				setTimeout(()=>{
					uni.switchTab({
						url:"/pages/index/index"
					})
				},1000)
			}
		},
		onLoad(options) {
			this.token=options.token;
			// this.wh=options.wh
			this.getPhotoImage()
		}
	}
</script>

<style>

</style>
