<template>
	<view class="main-list oBorder">
		<view class="uni-form-item uni-column">
			<input type="text" v-model="nickname" style="border: 1px solid #eee;height: 80upx;text-indent: 0.8em;">
			<view class="btn">
				<button type="primary" style="background-color: #FD6801;" @click="update">确定</button>
			</view>
		</view>
	</view>
</template>

<script>
	import wInput from '../../components/watch-login/watch-input.vue' //input
	import wButton from '../../components/watch-login/watch-button.vue' //button
	import {EXIT,UPDATE_USER,IMG_UPLOAD} from '../../api/index.js';
	import {SUCCESS} from '../../api/errorcode.js';
	export default {
		data() {
			return {
				nickname: '',
				user:uni.getStorageSync("user") || {}
			}
		},
		components: {
			wInput,
			wButton
		},
		onLoad: function(event) {
			this.nickname = event.name;
		},
		methods: {
			update(){
				console.log("用户ID:"+this.user.id);
				uni.request({
					url:UPDATE_USER,
					method:"POST",
					data:{
						id:this.user.id,
						nickname:this.nickname
					},
					header:{
						'ACCESS-CONTROL-ALLOW-TOKEN':uni.getStorageSync(this.sessionKey)
					},
					complete: (res) => {
						console.log("修改昵称结果:",res);
						if(res.data.code==SUCCESS){
							this.user.nickname=this.nickname;
							uni.setStorageSync("user",this.user);
							uni.navigateBack({
								delta:1
							})
							// uni.redirectTo({
							// 	url:"/pages/info/info"
							// })
						}
					}
				})
			}
		}
	}
</script>

<style>
	.main-list {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		color: #333333;
		padding: 32upx;
		margin-top: 34upx;
	}

	.btn {
		margin-top: 50upx;
	}
	.dlbutton{
		width: 700upx;
	}
</style>
