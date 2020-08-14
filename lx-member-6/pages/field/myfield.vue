<template>
	<view>
		<uni-segmented-control :current="$store.state.current" :values="myfield" @clickItem="onClickItem" style-type="text" active-color="#4169E1"></uni-segmented-control>
		<view class="content">
			<!-- 正在使用 -->
			<view v-show="$store.state.current === 0">
				<block v-for="(item,index) in fieldNowList" :key="item.id">
					<!-- 图文卡片模式 -->
					<uni-card :title="item.title" mode="title" is-shadow :thumbnail="item.url" note="Tips">
						成长速度：{{item.speed}}/天
						<uni-badge class="field_out_badge" type="primary" :text="index<9?('0'+Number(index+1)):index+1" size="small"></uni-badge>
						<!-- 底部按钮 -->
						<template v-slot:footer>
							<view class="footer-box">
								<view v-show="item.isget && item.count!=0" class="footer_isget">可领取积分:{{item.count}}</view>
								<view v-show="item.count==0" class="footer_isend">当日该矿机积分领取完成</view>
								<view v-show="!item.isget" >该矿机不可领取积分</view>
								<button :type="item.count==0?'primary':'warn'" size="mini" :disabled="!item.isget || item.count==0" @click="handlePull($event,item.id)">{{item.isget?item.count==0?'已领取':'领取':'不可领取'}}</button>
							</view>
						</template>
					</uni-card>
				</block>
				<view class="isEmpty" v-show="fieldNowList.length==0?true:false">您正在使用的矿机为空</view>
			</view>
			<!-- 废弃矿机 -->
			<view v-show="$store.state.current === 1">
				<block v-for="item in fieldOutList" :key="item.id">
					<!-- 标题卡片模式 -->
					<uni-card class="field_out" :title="'状态:'+(item.state==2?'已使用':'')" mode="title" is-shadow :thumbnail="item.url" >
						该矿机使用次数上限
						<uni-badge class="field_out_badge" type="error" :text="item.state==2?'已废弃':''"></uni-badge>
					</uni-card>
				</block>
				<view class="isEmpty" v-show="fieldOutList.length==0?true:false">现在还未存在废弃矿机</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {GETINTEGRAL,FIELDNOW,FIELDCOMPLETE} from "@/api/index.js"
	import {
		SUCCESS
	} from '@/api/errorcode.js'
	export default {
		data() {
			return {
				myfield: ['正在使用', '废弃矿机'],
				// 领取积分的节流条件
				flag:false,
				// 废弃的矿机列表
				fieldOutList:this.$store.state.failFieldList,
				// 正在使用的矿机列表
				fieldNowList:this.$store.state.fieldNowList
			};
		},
		methods: {
			// 我的矿机发生切换的时候
			onClickItem(e) {
				this.$store.commit('handleClickChildren',e.currentIndex)
				if (this.$store.state.current == 0) {
					// 请求正在使用的矿机数据
					this.getFieldNow()
				} else {
					// 请求废弃的矿机数据
					this.getFieldOut()
				}
			},
			// 正在使用的矿机
			async getFieldNow() {
				const {data:res}=await this.$http({
					url:FIELDNOW
				})
				this.$store.commit("saveFieldList",res.date)
				this.fieldNowList=this.$store.state.fieldNowList
			},
			// 废弃的矿机
			async getFieldOut() {
				const {data:res}=await this.$http({
					url:FIELDCOMPLETE
				})
				let obj={
					data:res.date
				}
				this.$store.commit("saveFieldList",obj)
				this.fieldOutList=this.$store.state.failFieldList
			},
			// 领取积分
			async handlePull(e, id) {
				console.log(id);
				// 领取积分
				const {data:res}=await this.$http({
					url:GETINTEGRAL+`/${id}`,
					method:"PUT"
				})
				if(res.code!=SUCCESS) return false
				uni.showLoading({
					title:"正在领取",
					success() {
						uni.showToast({
							title:'领取成功'
						})
					}
				})
				
				// location.reload()
				this.getFieldNow()
			}
		}
	}
</script>

<style lang="less" scoped>
	.footer-box {
		view {
			float: left;
			color: red;
			font-weight: 700;
		}
		.footer_isget{
			color: #CD950C;
			font-weight: 700;
		}
		.footer_isend{
			color: blue;
			opacity: 0.5;
		}
		button {
			float: right;
		}
	}
	.field_out{
		color: red;
		font-weight: 700;
	}
	.field_out_badge{
		position: absolute;
		right:0;
		top: 0;
	}
	.isEmpty{
		width: 100%;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%,-50%);
		opacity: 0.6;
		color: red;
		text-align: center;
		font-size: 20px;
		font-weight: 700;
	}
</style>
