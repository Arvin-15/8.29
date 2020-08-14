<template>
	<view class="content">
		<view style="margin-top: 20upx;">
			<zzx-tabs :items="items" :current="currentIndex" @clickItem="onClickItem" ref="mytabs">
			</zzx-tabs>
		</view>
		<view style="margin-top: 20upx;color:#999999;font-size: 24upx;">
			<view v-show="currentIndex === 0">
				<view class="member-level">
					<view class="block lv1" v-if="lv1">{{lv1}}</view>
					<view class="block lv2" v-if="lv2">{{lv2}}</view>
					<view class="block lv3" v-if="lv3">{{lv3}}</view>
					<view class="block current" v-if="current">
						<text>我</text>
						<view class="current_score"><text>{{current}}</text></view>
					</view>
					<view class="block" v-if="!current">
						<text>您当前还不是会员</text>
					</view>
					<view class="block lv4parent">
						<view class="block lv4" v-if="lv4_left">{{lv4_left}}</view>
						<view class="block lv4" v-if="lv4_right">{{lv4_right}}</view>
					</view>
					<view class="block lv5parent">
						<view class="block lv5left">
							<view class="block lv5" v-if="lv5_left">{{lv5_left}}</view>
							<view class="block lv5" v-if="lv5_right">{{lv5_right}}</view>
						</view>
						<view class="block lv5right">
							<view class="block lv5" v-if="lv6_left">{{lv6_left}}</view>
							<view class="block lv5" v-if="lv6_right">{{lv6_right}}</view>
						</view>
					</view>
				</view>
			</view>
			<view v-show="currentIndex === 1">
				<view class="member-level">
					<view class="block lv1" v-if="lv1">{{lv1}}</view>
					<view class="block lv2" v-if="lv2">{{lv2}}</view>
					<view class="block lv3" v-if="lv3">{{lv3}}</view>
					<view class="block current" v-if="current">
						<text>我</text>
						<view class="current_score"><text>{{current}}</text></view>
					</view>
					<view class="block" v-if="!current">
						<text>您当前还不是会员</text>
					</view>
					<view class="block lv4parent">
						<view class="block lv4" v-if="lv4_left">{{lv4_left}}</view>
						<view class="block lv4" v-if="lv4_right">{{lv4_right}}</view>
					</view>
					<view class="block lv5parent">
						<view class="block lv5left">
							<view class="block lv5" v-if="lv5_left">{{lv5_left}}</view>
							<view class="block lv5" v-if="lv5_right">{{lv5_right}}</view>
						</view>
						<view class="block lv5right">
							<view class="block lv5" v-if="lv6_left">{{lv6_left}}</view>
							<view class="block lv5" v-if="lv6_right">{{lv6_right}}</view>
						</view>
					</view>
				</view>
			</view>
			<view v-show="currentIndex === 2">
				<view class="member-level">
					<view class="block lv1" v-if="lv1">{{lv1}}</view>
					<view class="block lv2" v-if="lv2">{{lv2}}</view>
					<view class="block lv3" v-if="lv3">{{lv3}}</view>
					<view class="block current" v-if="current">
						<text>我</text>
						<view class="current_score"><text>{{current}}</text></view>
					</view>
					<view class="block" v-if="!current">
						<text>您当前还不是会员</text>
					</view>
					<view class="block lv4parent">
						<view class="block lv4" v-if="lv4_left">{{lv4_left}}</view>
						<view class="block lv4" v-if="lv4_right">{{lv4_right}}</view>
					</view>
					<view class="block lv5parent">
						<view class="block lv5left">
							<view class="block lv5" v-if="lv5_left">{{lv5_left}}</view>
							<view class="block lv5" v-if="lv5_right">{{lv5_right}}</view>
						</view>
						<view class="block lv5right">
							<view class="block lv5" v-if="lv6_left">{{lv6_left}}</view>
							<view class="block lv5" v-if="lv6_right">{{lv6_right}}</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		STRUCTURE,STRUCTURE_TYPE
	} from '../../api/index.js';
	import {
		SUCCESS
	} from '../../api/errorcode.js';
	import zzxTabs from "@/components/zzx-tabs/zzx-tabs.vue"
	export default {
		components: {
			zzxTabs
		},
		data() {
			return {
				user: uni.getStorageSync("user") || {},
				items: ['普卡团队', '银卡团队', '金卡团队'],
				currentIndex: 0,
				lv1: "",
				lv2: "",
				lv3: "",
				current: null,
				lv4_left: "",
				lv4_right: "",
				lv5_left: "",
				lv5_right: "",
				lv6_left: "",
				lv6_right: ""
			}
		},
		onLoad() {
			this.initTree("treeList"); //加载普卡会员信息
		},
		methods: {
			onClickItem(e) {
				if (this.currentIndex !== e.currentIndex) {
					this.currentIndex = e.currentIndex;
				}
				switch(this.currentIndex){
					case 0:
						this.initTree("treeList");
					break;
					case 1:
						this.initTree("goldTreeList");
					break;
					case 2:
						this.initTree("diamondTreeList");
					break;
					default:
						this.initTree("treeList");
				}
			},
			initTree(type) {
				uni.showLoading({
					title: "加载中..."
				})
				let _this = this;
				uni.request({
					url: STRUCTURE_TYPE + "/" + this.user.id + "/" +type,
					header: {
						'ACCESS-CONTROL-ALLOW-TOKEN': uni.getStorageSync(_this.sessionKey)
					},
					complete: function(res) {
						uni.hideLoading();
						console.log("获取会员数据:", res.data);
						if (res.data && res.data.code == SUCCESS && res.data.treeList) {
							console.log('==有会员信息==');
							let lv1 = res.data.treeList;
							_this.lv1 = lv1 ? lv1.name : "";

							let lv2 = lv1.children[0];
							_this.lv2 = lv2 ? lv2.name : "";
							
							let lv3 = lv2.children[0];
							_this.lv3 = lv3 ? lv3.name : "";

							let current = lv3.children[0];
							_this.current = current ? current.name : "";

							let lv4_left = current.children[0];
							_this.lv4_left = lv4_left ? lv4_left.name : "";

							let lv4_right = current.children[1];
							_this.lv4_right = lv4_right ? lv4_right.name : "";

							if (lv4_left != null) {
								let lv5_left = lv4_left.children[0];
								_this.lv5_left = lv5_left ? lv5_left.name : "";

								let lv5_right = lv4_left.children[1];
								_this.lv5_right = lv5_right ? lv5_right.name : "";
							}
							if (lv4_right != null) {
								let lv6_left = lv4_right.children[0];
								_this.lv6_left = lv6_left ? lv6_left.name : "";

								let lv6_right = lv4_right.children[1];
								_this.lv6_right = lv6_right ? lv6_right.name : "";
							}
						}else{
							console.log('==没有会员信息==');
							_this.lv1= "";
							_this.lv2= "";
							_this.lv3= "";
							_this.current= null;
							_this.lv4_left= "";
							_this.lv4_right= "";
							_this.lv5_left= "";
							_this.lv5_right= "";
							_this.lv6_left= "";
							_this.lv6_right= "";
						}
					}
				})
			}
		}
	}
</script>

<style scoped>
	.member-level {
		padding: 20upx 30upx 0upx;
		display: flex;
		flex-direction: column;
		align-items: center;
		overflow: hidden;
		height: 85vh;
		background-size: 100% 100%;
	}

	.block {
		margin-bottom: 35upx;
		font-size: 40upx;
		text-align: center;
		line-height: 100upx;
		border-radius: 8px;
	}

	.lv1,
	.lv2,
	.lv3,
	.lv4,
	.lv5 {
		width: 250upx;
		height: 100upx;
		background-color: #E8F4D9;
	}

	.lv4parent,
	.lv5parent {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		width: 100%;
		margin-bottom: 0;
	}

	.lv4 {
		background-color: #E8F4D9;
	}

	.current {
		width: 300upx;
		height: 200upx;
		background-color: #fd9914;
		color: black;
	}

	.lv5 {
		background-color: #E8F4D9;
	}

	.current_score {
		border-top: 1px solid #EEE;
		font-size: 40upx;
	}
</style>
