<template>
	<view class="containt">
		<!-- 循环数据 -->
		<view class="content" v-for="item in promotionList " :key="item.id">
					<view class="">
						<view class="item">
							<view class="title">
								{{item.nickname}}
								<text class="phone"> {{item.phone}}</text>
							</view>
							<view class="">
								好友状态
								<text :class="['certify',item.isAuthentication=='Y'?'g':'r']">
									{{item.isAuthentication=='Y'?'已认证':'未认证'}}
								</text>
							</view>
						</view>
						<view class="member"  v-if="item.isMember=='Y'">会员类型   
							<text class="member_card" v-if="item.isMember=='Y'">{{item.memberType}}</text> 
						</view>
					</view>
				</view>
		<view class="empty" v-if="promotionList.length==0">
			<image src="../../static/mine2/about.png" 
				style="width: 70upx;height: 70upx;vertical-align: middle;margin-right: 20upx;"></image>
			暂无推广人
		</view>
	</view>
</template>

<script>
	import {PROMOTION_LIST} from '../../api/index.js'
	import {SUCCESS} from '../../api/errorcode.js';
export default {
	data() {
		return {
			promotionList:[]
		};
	},
	methods: {
		getList(){
			uni.showLoading({
				title:"加载中..."
			})
			uni.request({
				url:PROMOTION_LIST,
				header:{
					'ACCESS-CONTROL-ALLOW-TOKEN':uni.getStorageSync(this.sessionKey)
				},
				method:"GET",
				complete:(res)=>{
					uni.hideLoading();
					console.log(res.data);
							if(res.data.code===SUCCESS){
								console.log(res.data.promotionList);
								this.promotionList=res.data.promotionList;
							}
						},
			})
		}
	},
	onShow:function(){
		console.log('==onShow==');
		this.getList();
	}
};
</script>

<style scoped>
	.containt{
		padding-left: 20upx;
		padding-right: 20upx;
	}
.content {
	padding: 50upx;
	margin: 10upx;
	border: 1px solid #e5e5e5;
	font-size: 50upx;
	border-radius: 10px;
	box-shadow:0 0 5px rgba(0,0,0,0.3);
}

.item {
	border-bottom: 1px solid #e5e5e5;
	padding-bottom: 20upx;
	font-size: 40upx;
}
 .phone , .certify , .member_card{
	 margin-left: 100upx;
 }
 .certify{
	 border:#09BB07 1px solid;
	 border-radius: 5px;
	 padding-left: 20upx;
	 padding-right: 20upx;
 }
 .g{
	 color: #09BB07;
 }
 .r{
	 color: #FF3333;
 }

.member  {
	margin-top: 20upx;
}


.scroll-top {
	position: fixed;
	right: 0;
	bottom: 0;
	width: 70upx;
	height: 70upx;
	padding: 20upx;
}
.empty{
	margin-top: 100upx;
	text-align: center;
	font-size: 32upx;
}
</style>
