<template>
	<view class="car_container">
		<uni-swipe-action v-show="isempty">
			<!-- 购物车列表 -->
			<block v-for="item in cartList" :key="item.id">
				<!-- 滑动删除 -->
				<uni-swipe-action-item :options="options" @click="deleteShop($event,item.ids,item.id)">
					<view class="car_list">
						<view class="list_left">
							<!-- 单选框 -->
							<!-- goShopDetail($event,item.id) -->
							<evan-checkbox v-model="item.isChecked" @change="changeCheck($event,item.id)" :label="item.id"></evan-checkbox>
							<image :src="item.url" open="()" ></image>
						</view>
						<view class="list_right">
							<!-- 商品名称 -->
							<view class="right_shoptitle">
								{{item.title}}
							</view>
							<!-- 商品数量 -->
							<view class="right_shopnum">
								x {{item.count}}
							</view>
							<!-- 商品价格 -->
							<view class="right_shopprice">
								<!-- 步进器 -->
								<lxc-count class="price_step" @handleCount="updateCount($event,item.ids)" :min="1" :max="999" :value="item.count"
								 :index="item.ids-0" :delayed="100">
								</lxc-count>
								<view class="shopprice">
									￥{{item.price}}
								</view>
							</view>
						</view>
					</view>
				</uni-swipe-action-item>
			</block>
			<!-- 全选下单 -->
			<view class="check_all">
				<view class="all_content">
					<evan-checkbox v-model="checkAll" @change="changeCheckAll"></evan-checkbox>
					<!-- 商品总价 -->
					<view class="all_total">总计:</view>
					<view class="total_money">￥{{totalMoney}}</view>
					<button class="all_btn" type="warn" :loading="false" @click="goOrders" :disabled="isDisabled">立即下单</button>
				</view>
			</view>
		</uni-swipe-action>
		<!-- 购物车为空 -->
		<view class="shopcar_empty" v-show="!isempty">
			<view class="empty_title">
				<image src="../../static/empty_shopcar.png" @tap="goShop"></image>
			</view>
			<view>
				购物车为空
			</view>
		</view>

	</view>
</template>
<script>
	import {
		CARTLIST,
		CARTDELETE
	} from '@/api/index.js'
	import {
		SUCCESS
	} from '@/api/errorcode.js'
	export default {
		data() {
			return {
				// 购物车列表
				cartList: null,
				// 滑动删除组
				options: [{
					text: '删除',
					style: {
						backgroundColor: '#dd524d'
					}
				}],
				// 限流计数器
				arr:[]
			}
		},
		methods: {
			// 获取商品列表
			async getCartList() {
				const {
					data: res
				} = await this.$http({
					url: CARTLIST
				})
				// 对购物车数组进行增加部分属性
				this.cartList = res.list.map(item => {
					return {
						id: item.commodity_id,
						ids: item.id,
						count: item.number,
						price: item.retailPrice,
						url: item.img,
						title: item.name,
						isChecked: true
					}
				})
				this.$store.dispatch('requestCartList', this.cartList)
			},
			// 跳转到商品详情页面
			goShopDetail(e, id) {
				uni.navigateTo({
					url: `/pages/product/product?id=${id}`
				})
			},
			// 计数器触发
			async updateCount(num, id) {
				const number = Math.floor(num)
				// 限流判断计数器为1
				if(number==1)this.arr.push(number)
				else this.arr=[]
				if(this.arr.length>1) return false
				// 商品的数量
				const {
					data: res
				} = await this.$http({
					method: 'PUT',
					url: CARTDELETE,
					data: {
						id,
						number
					}
				})
				if (res.code != SUCCESS) return false
				// 更新数量的商品信息
				let shopInfo = {
					id,
					count: number
				}
				this.cartList.some(item => {
					if (item.ids === id) {
						item.count = number
						return true
					}
				})
				uni.showToast({
					title: '更改数量成功'
				})
				this.$store.dispatch('update', shopInfo)
			},
			// 点击滑动删除
			async deleteShop(e, ids, id) {
				const {
					data: res
				} = await this.$http({
					method: 'DELETE',
					url: CARTDELETE,
					data:ids
				})
				if (res.code !== SUCCESS) {
					uni.showToast({
						title: "删除失败,稍后再试",
						icon: "none",
						duration: 2000
					})
					return false
				}
				uni.showToast({
					title: "删除商品成功"
				})
				this.cartList = this.cartList.filter(item => item.id !== id)
				this.$store.dispatch('delete', id);
			},
			// 单选框发生改变的时候
			changeCheck(state, id) {
				let check = {
					state,
					id
				}
				this.$store.dispatch('updateState', check)
			},
			// 全选框发生改变的时候
			changeCheckAll(state) {
				this.cartList.forEach(item => item.isChecked = state)
				this.$store.dispatch('updateStateAll', state)
			},
			// 映射增加商品编号id
			async requestCartList() {
				const {
					data: res
				} = await this.$http({
					url: CARTLIST
				})
				res.list.forEach(item => {
					let items = item;
					this.cartList.forEach(ele => {
						let eles = ele;
						if (items.commodity_id == eles.id || !eles.ids) {
							eles.ids = items.id
						}
					})
				})
				this.$store.dispatch('requestCartList', this.cartList)
			},
			// 跳转到订单页面
			goOrders() {
				uni.redirectTo({
					url: '/pages/order/order'
				})
			},
			// 跳转到商品首页
			goShop() {
				uni.switchTab({
					url: '/pages/category/shop'
				})
			}
		},
		computed: {
			// 判断购物车是否为空
			isempty() {
				return this.cartList.length && uni.getStorageSync('user')
			},
			// 立即下单按钮状态
			isDisabled() {
				return !this.cartList.filter(item => item.isChecked).length
			},
			// 商品总价
			totalMoney() {
				return this.cartList.filter(item => item.isChecked).reduce((pre, next) => pre += next.count * next.price, 0)
			},
			// 全选框状态
			checkAll() {
				if (this.cartList.length == 0) return false
				return this.cartList.length == this.cartList.filter(item => item.isChecked).length
			}
		},
		onLoad() {
			if (uni.getStorageSync('user')) this.getCartList()
		},
		onShow() {
			this.cartList = uni.getStorageSync('cart') || []
			if (this.isempty) {
				this.requestCartList()
				this.cartList = uni.getStorageSync('cart')
			}
		}
	}
</script>
<style lang="less" scoped>
	.car_container {
		padding-bottom: 49px;

		.car_list {
			display: flex;
			padding-right: 2%;
			width: 100%;
			height: 100px;
			background-color: #eee;
			margin-bottom: 2px;

			.list_left {
				flex: 3;
				display: flex;
				padding-left: 2%;
				margin-right: 2%;

				image {
					width: 100%;
					height: 100%;
					border-radius: 5px;
					transform: scale(0.8);
					margin: 0 2%;
				}
			}

			.list_right {
				flex: 6;

				.right_shoptitle {
					font-weight: 700;
					margin-top: 3%;
				}

				.right_shopprice {
					.shopprice {
						position: absolute;
						bottom: 10%;
						font-size: 1.3em;
						color: red;
					}

					.price_step {
						position: absolute;
						right: 2%;
						bottom: 15%;
						z-index: 1;
					}
				}

				.right_shopnum {
					float: right;
					margin-top: -10px;
				}
			}
		}

		.check_all {
			box-sizing: border-box;
			position: fixed;
			width: 100%;
			bottom: 0;
			border-top: 1rpx solid #DCDCDC;
			background-color: #FFFFFF;
			padding: 0 2%;

			.all_content {
				display: flex;
				align-items: center;

				.all_total {
					margin-left: 5px;
				}

				.total_money {
					flex: 1;
					margin-left: -5%;
					text-align: center;
					color: red;
					font-size: 1.5em;
				}

				.all_btn {
					width: 50%;
					height: 100%;
					border-radius: 25px;
				}
			}
		}

		.shopcar_empty {
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			font-weight: 700;

			.empty_title {
				width: 70px;
				height: 70px;
				margin-bottom: 5px;

				image {
					width: 100%;
					height: 100%;
				}
			}
		}
	}
</style>
