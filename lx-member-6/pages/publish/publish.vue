<template>
	
		<view class="content">
			<view class="notice" v-for="item in notice " >
				<view class="uni-noticebar">
					<rich-text class="title" :nodes="item.content"></rich-text>
				</view>
			</view>
		</view>
	
</template>

<script>
	import {ANNOUNCEMENT} from '../../api/index.js';
	export default {
		data() {
			return {
				notice:[]
			}
		},
		methods: {
			getList(){
				uni.request({
						url:ANNOUNCEMENT,
						method:"GET",
						data:{},
						complete:(res)=>{
							console.log(res);
							this.notice=res.data.Announcement;
						},
						
					})
			}
		},
		onLoad:function(){
			console.log('==onLoad==');
			this.getList();
		}
	}
</script>

<style>
.notice{
		width: 96%;
		top: 220upx;
		z-index: 99;
		margin-left: 10%;
	}
	.uni-noticebar{
		min-height: 50upx;
		border: #8799A3 1px solid;
		box-shadow:#8799A3 5px ;
		margin-top: 20px;
		padding-left: 40upx;
		width: 80%;
		border-radius: 8px;
		background-color: rgba($color: orange, $alpha: 0.2)!important;
	}
	.title{
		font-size: 40upx;
	}	
</style>
