<template>
	<view class="bdocres_container" :style="'height:' + wh + 'px'">
		<!-- 身份证照片位置 -->
		<image :src="imgInfo"  v-show="imgInfo" :style="'height:' + wh + 'px'"></image>
		<button type="primary" v-show="imgInfo" @click="postUserInfo" class="next_btn">下一步</button>
		<!-- 默认显示的盒子 -->
		<view class="preview_img" :style="'height:' + wh + 'px'" v-show="!imgInfo">
			请拍摄身份证正面照
			<!-- 默认显示的图片 -->
			<image class="default_img" src="../../static/img_nodata.png"></image>
			<view class="preview_btn">
				<button type="warn" size="mini" @click="getPhotoImage">拍摄照片</button>
				<button type="primary" size="mini" @click="getChooseImage">选择图片</button>
			</view>
		</view>
	</view>
</template>

<script>
// 图片转换为base64位
import { pathToBase64 } from 'image-tools'
import {IDCARD_VALID} from '@/api/index.js'
import {SUCCESS} from '@/api/errorcode.js'
export default {
	data() {
		return {
			// 设备高度
			wh: null,
			// 百度云鉴权token信息
			tokenInfo: null,
			// 图片信息
			imgInfo:null,
			// 限制图片大小
			imgSize:null,
			//用户的个人信息
			userInfo:{
				// 用户的id
				id:null,
				// 身份证号
				idcard:null,
				// 性别
				sex:null,
				// 姓名
				name:null,
				// 名族
				national:null,
				//	身份地址
				address:null
			}
			// ,
			// // 图片的高度和宽度
			// ih:null,
			// iw:null
		};
	},
	methods: {
		// 获取系统信息
		getSystemInfo() {
			uni.getSystemInfo({
				success: res => {
					this.wh = res.windowHeight;
				}
			});
		},
		// // 获取图片信息
		// getImageInfo(){
		// 	uni.getImageInfo({
		// 		src:this.imgInfo,
		// 		success: (res) => {
		// 			console.log(res);
		// 			this.ih=res.height;
		// 			this.iw=res.width;
		// 			console.log(this.ih);
		// 		}
		// 	})
		// },
		// 从本地选择照片
		getChooseImage() {
			uni.chooseImage({
				// 选择照片的数量
				count:1,
				// 类型:选择照片
				sourceType:['album'],
				success:(res)=>{
					console.log(res);
					this.imgInfo=res.tempFilePaths[0]
					this.imgSize=res.tempFiles[0].size
					// this.getImageInfo()
				}
			})
			
		},
		// 拍摄照片
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
					// this.getImageInfo()
				}
			})
		},
		// 百度云身份识别获取信息
		async postUserInfo(){
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
						url:'/pages/bdocr/bdocres'
					})
				},1000)
				return false
			}
			const data=await uni.request({
				url:`https://aip.baidubce.com/rest/2.0/ocr/v1/idcard?access_token=${this.tokenInfo.access_token}`,
				method:"POST",
				header:{
					'Content-Type':'application/x-www-form-urlencoded'
				},
				data:{
					// 图像数据 base64位
					image,
					// 身份证正面
					'id_card_side':'front'
				}
			})
			if(data[1].data['error_msg']){
				uni.showToast({
					title:"上传图片失败",
					icon:"loading"
				})
				setTimeout(()=>{
					// 跳转会当前页面
					uni.navigateTo({
						url:'/pages/bdocr/bdocres'
					})
				},1000)
				return false
			}
			let res=data[1].data['words_result']
			// 用户的id
			// id:null,
			// 身份证号
			// idcard:null,
			// 性别
			// sex:null,
			// 姓名
			// name:null,
			// 名族
			// national:null,
			//	身份地址
			// address:null
			for(let k in res){
				if(!res[k]['words']){
					uni.showToast({
						title:"图片信息有误，重新拍摄",
						icon:"loading"
					})
					setTimeout(()=>{
						// 跳转会当前页面
						uni.navigateTo({
							url:'/pages/bdocr/bdocres'
						})
					},1000)
					return false
				}
			}
			this.userInfo.address=res['住址']['words'];
			this.userInfo.idcard=res['公民身份号码']['words'];
			this.userInfo.name=res['姓名']['words'];
			this.userInfo.sex=res['性别']['words'];
			this.userInfo.national=res['民族']['words'];
			this.bindUserInfo()
		},
		// 
		// 获取身份证信息的token (鉴权)
		async getUserInfoToken() {
			/*
				grant_type		(固定格式) 	：client_credentials
				client_id		(应用API key)
				client_secret 	(z)
			*/
			const data = await uni.request({
				url: 'https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&client_id=6jwZ93CtK9kItpjAUgVjN2g2&client_secret=mSAIFQGEskQkWZA6i2xcVlKpGhRFvlK9',
				method: 'POST'
			});
			// 百度云鉴权返回token信息
			this.tokenInfo = data[1].data;
		},
		// 身份验证
		async bindUserInfo(){
			const {data: res} = await this.$http({
				url: IDCARD_VALID,
				method: "POST",
				data: this.userInfo
			})
			if(res.code!=SUCCESS)return false
			// 跳转到人脸识别页面
			uni.navigateTo({
				url: `/pages/face/faces?token=${this.tokenInfo.access_token}&wh=${this.wh}`
			})
		},
		// 人脸识别
	},
	onLoad() {
		this.getSystemInfo();
		this.getUserInfoToken();
		// 本地获取用户id
		this.userInfo.id=uni.getStorageSync('user').id;
	}
};
</script>

<style style="less" scoped>
.bdocres_container {
	width: 100%;
}
.preview_img {
	width: 100%;
	text-align: center;
	
}
.default_img{
	width: 400px;
	height: 376px;
}
.preview_btn {
	width: 100%;
	position: fixed;
	bottom: 20px;
	left: 50%;
	transform: translateX(-50%);
	display: flex;
}
.next_btn{
	/* display: block; */
	width: 100%;
	position: fixed;
	bottom: 0;
}
</style>
