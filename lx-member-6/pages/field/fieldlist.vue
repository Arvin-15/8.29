<template>
	<view>
		<!-- 普通矿机列表 -->
		<block v-for="item in fieldList" :key="item.id">
			<uni-card :title="item.title" mode="title" is-shadow :thumbnail="item.url" note="Tips">
				<view class="card_content">
					<view>成长速度: {{item.speed}}/天</view>
					<view>出售价格: {{item.price}}积分/个</view>
				</view>
				<template v-slot:footer>
					<view class="footer-box">
						<button type="warn" size="mini" @click="buyField($event,item.id)" >购买</button>
					</view>
				</template>
			</uni-card>
		</block>
		<!-- 购买的弹出层 -->
		<uni-popup ref="popup" type="bottom">
			<view class="pop">
				<!-- 用户的积分信息 -->
				<view class="user_score_info">
					<view class="user_name">
						<view>尊敬的</view>
						<view>{{userInfo.nickname}}</view>
						<view>,您好：</view>
					</view>
					<!-- <view class="user_score">
						目前可使用的积分为:
						<view>{{userInfo.score}}</view>
					</view> -->
				</view>
				<!-- 矿机信息 -->
				<view class="field_info">
					<view class="field_content">矿机信息</view>
					<!-- 矿机名称 -->
					<view class="field_title">
						<view>矿机名称:</view>
						<view>{{title}}</view>
					</view>
					<!-- 矿机成长速度 -->
					<view class="field_speed">
						<view>成长速度:</view>
						<view>{{speed}}/天</view>
					</view>
					<!-- 矿机购买价格 -->
					<view class="field_price">
						<view>购买价格:</view>
						<view>{{price}}积分/个</view>
					</view>
				</view>
				<view class="field_btn">
					<button type="warn" @click="confirmBuyField">确认购买</button>
				</view>
			</view>
		</uni-popup>
	</view>
</template>
<script>
	import {BUYFIELD} from '@/api/index.js'
	import {SUCCESS} from '@/api/errorcode.js'
	export default {
		data() {
			return {
				// 正在使用的矿机列表
				fieldList: this.$store.state.fieldList,
				// 用户的信息
				userInfo: {},
				// 矿机名称
				title: '',
				//矿机成长速度
				speed: 0,
				// 矿机购买价格
				price: 0,
				// 弹出层的矿机id
				id: null
				// ,
				// 购买按钮的状态
				// flag:false
			}
		},
		methods: {
			// 点击购买
			buyField(e, id) {
				console.log(id);
				// 用户信息
				this.userInfo = uni.getStorageSync('user')
				// 隐射数组
				this.fieldList.forEach(item => {
					if (item.id == id) {
						this.title = item.title
						this.speed = item.speed
						this.price = item.price
						this.id = item.id
						return false
					}
				})
				// 打开弹出层
				this.$refs.popup.open()
			},
			// 确认购买
			async confirmBuyField() {
				// if(this.flag) return false
				// 节流条件
				// this.flag=true
				const {data: res} = await this.$http({
					url: BUYFIELD + `/${this.id}`,
					method: "PUT"
				})
				// return false
				if(res.code==-1){
					// this.flag=true
					uni.showToast({
						title:'当前矿机不能购买',
						icon:'loading'
					})
					this.$refs.popup.close()
					return false
				}
				if (res.code != SUCCESS) return false

				uni.showToast({
					title: "购买成功"
				})
				// this.flag=false
				this.$refs.popup.close()
			}
		}
	}
</script>
<style scoped lang="scss">
	.footer-box {
		button {
			float: right;
		}
	}

	.card_content {
		display: flex;
		justify-content: space-between;
	}

	.pop {
		width: 100%;
		height: 300px;
		padding: $uni-spacing-row-sm;
		border-radius: $uni-border-radius-base;
		background-color: #fff;

		.user_score_info {
			border-bottom: 1px solid $uni-border-color;
			padding: $uni-spacing-row-sm;
		}

		.user_name {
			display: flex;
			height: 50px;
			font-size: 16px;
			font-weight: 700;
			view:nth-child(2) {
				color: red;
			}
		}

		.user_score {
			display: flex;
			justify-content: center;

			view {
				color: red;
			}
		}

		.field_info {
			text-align: center;
			padding: 16px 32px;
			margin-bottom: 30px;
			border-bottom: 1px solid $uni-border-color;

			.field_content {
				font-size: 18px;
				font-weight: 700;
			}

			.field_title,
			.field_speed,
			.field_price {
				display: flex;
				justify-content: space-between;

				view:nth-child(1) {
					font-weight: 700;
				}
			}
		}
	}
</style>
