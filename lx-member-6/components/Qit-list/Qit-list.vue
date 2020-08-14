<template>
	<view>
		<!-- 搜索条 -->
		<view class="cu-bar tabbar bg-white fixed" :style="[{top:CustomBar + 'px'}]">
			<view class="action">
				<view @click="synthesizeClick" class="" :class="index==1?'text-red':''" style=" dvertical-align: bottom;">
					<text class="text-xl">{{syntText}}</text>
					<text class="iconfont" v-show="c">&#xe68e;</text>
					<text class="iconfont" v-show="!c">&#xe68d;</text>
				</view>
			</view>
			<view class="action">
				<view class="text-xl" @click="salesClick" :class="index==2?'text-red':''">销量</view>
			</view>
			<view class="action">
				<view class="" @click="listTypeClick">
					<!-- 一行两个 -->
					<text v-if="listType==2" class="iconfont text-xxl ">&#xe7f9;</text>
					<!-- 一行一个 -->
					<text v-if="listType==1" class="iconfont text-xxl ">&#xe625;</text>
				</view>
			</view>
			<view class="action" @click="showFilter=true">
				<view class="text-xl">更多<text class="iconfont">&#xe6a0;</text></view>
			</view>
		</view>

		<!-- 综合搜索栏选项 -->
		<view class="tools-alert" @click="c=!c" v-show="c" :style="[{top:(CustomBar+45)+'px'}]">
			<view class="cu-list menu text-left solid-top">
				<view class="cu-item solid-bottom" v-for="(item,i) in cList" :key="i" @click.stop="choose(item)">
					<view class="content padding-sm">
						<text class="">{{item}}</text>
					</view>
					<view v-if="item==syntText" class="action padding-sm">
						<text class="iconfont text-red">&#xe60b;</text>
					</view>
				</view>
			</view>
		</view>
		<!-- 过滤选项内容 -->
		<view class="cu-modal drawer-modal justify-end" style="overflow: hidden;" :class="showFilter?'show':''" @tap="showFilter=false">
			<view class="cu-dialog basis-xl" @tap.stop="" @touchmove.stop="" :style="[{top:CustomBar+'px',height:'calc(100vh - ' + CustomBar + 'px)'}]">
				<!-- :style="[{height:'calc(100vh - '+(CustomBar+120)+'px)'}]" -->
				<view class="filter-content">
					<view class="cu-bar bg-white ">
						<view class="action">
							<text class="text-blue"></text>类别
						</view>
					</view>
					<view class="bg-white solid-bottom">
						<button class="cu-btn bg-gray margin-right-sm margin-tb-sm">玉米</button>
						<button class="cu-btn bg-gray margin-right-sm margin-tb-sm">菠菜</button>
						<button class="cu-btn bg-gray margin-right-sm margin-tb-sm">土豆</button>
						<button class="cu-btn bg-gray margin-right-sm margin-tb-sm">黄瓜</button>
						<button class="cu-btn bg-gray margin-right-sm margin-tb-sm">玉米</button>
						<button class="cu-btn bg-gray margin-right-sm margin-tb-sm">菠菜</button>
						<button class="cu-btn bg-gray margin-right-sm margin-tb-sm">土豆</button>
						<button class="cu-btn bg-gray margin-right-sm margin-tb-sm">黄瓜</button>
						<button class="cu-btn bg-gray margin-right-sm margin-tb-sm">玉米</button>
						<button class="cu-btn bg-gray margin-right-sm margin-tb-sm">菠菜</button>
						<button class="cu-btn bg-gray margin-right-sm margin-tb-sm">土豆</button>
						<button class="cu-btn bg-gray margin-right-sm margin-tb-sm">黄瓜</button>
					</view>
					<view class="cu-bar bg-white ">
						<view class="action">
							<text class="text-blue"></text>价格
						</view>
					</view>
					<view class="bg-white solid-bottom">
						<view class="flex justify-center">
							<input type="digit" class="filter-price-input bg-gray" placeholder-class="placeholder-input" placeholder="最低价"></input>
							<view class="solids-center margin-lr"></view>
							<input type="digit" class="filter-price-input bg-gray" placeholder-class="placeholder-input" placeholder="最高价"></input>
						</view>
						<view class="flex">
							<view class="bg-gray flex-sub padding-sm margin-sm">
								<view>10-19</view>
								<view class="text-gray">15%选择</view>
							</view>
							<view class="bg-gray flex-sub padding-sm margin-sm">
								<view>19-31</view>
								<view class="text-gray">33%选择</view>
							</view>
							<view class="bg-gray flex-sub padding-sm margin-sm">
								<view>31-120</view>
								<view class="text-gray">35%选择</view>
							</view>
						</view>
					</view>
				</view>
				<view class="flex">
					<view class="flex-sub bg-gray padding-lg" @click="showFilter=false">
						<text class="iconfont">&#xe605;</text>
					</view>
					<view class="flex-twice bg-orange padding-lg">重置</view>
					<view class="flex-treble bg-red padding-lg">确认</view>
				</view>
			</view>
		</view>
		<!-- 数据列表 -->
		<view v-if="listType==2" class="grid col-2  padding-sm">
			<view class="padding-lr-xs margin-tb-xs" v-for="(item,idx) in list" :key="idx">
				<view class="bg-white">
					<image class="basic-df" src="https://static.szxx2018.com/upload/2020/3/17/0543a858f3b642ca86a6e78fc6c4e2d4.jpg"></image>
				</view>
				<view class="content bg-white padding-lr-sm padding-tb-xs">
					<text class="text-ellipsis2">商品标题商品标题商品标题商品标题商品标题商品标题商品标题商品标题商品标题商品标题商品标题</text>
					<view class="margin-bottom-xs">
						<view class='cu-tag radius sm text-gray'>标签1</view>
						<view class='cu-tag radius sm text-gray'>标签2</view>
						<view class='cu-tag radius sm text-gray'>标签3</view>
						<view class='cu-tag radius sm text-gray'>标签4</view>
					</view>
					<view class="flex">
						<view class="text-red">
							<text class="text-df">￥</text>
							<text class="text-xxl">99.99</text>
						</view>
						<!-- <view class="margin-left-sm">
							<text class="line-through line-height-xxl text-sm text-gray">￥100.00</text>
						</view> -->
					</view>
					<view class="flex justify-between">
						<view class="">
							<text class="text-sm text-gray">已售：88份</text>
						</view>
						<view class="">
							<text class="text-red iconfont icongouwuche"></text>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 数据列表 -->
		<view class="cu-list menu sm-border padding-tb-sm bg-white" v-if="listType==1">
			<view class="cu-item solid-bottom" v-for="(item,idx) in list" :key="idx">
				<view class="flex justify-start">
					<view>
						<image class="basic" src="https://static.szxx2018.com/upload/2020/3/17/0543a858f3b642ca86a6e78fc6c4e2d4.jpg"></image>
					</view>
					<view class="content margin-left-sm">
						<text class="text-ellipsis2">商品标题商品标题商品标题商品标题商品标题商品标题商品标题商品标题商品标题商品标题商品标题</text>
						<view class="margin-bottom-xs">
							<view class='cu-tag radius sm text-gray'>标签1</view>
							<view class='cu-tag radius sm text-gray'>标签2</view>
							<view class='cu-tag radius sm text-gray'>标签3</view>
							<view class='cu-tag radius sm text-gray'>标签4</view>
						</view>
						<view class="flex">
							<view class="text-red">
								<text class="text-df">￥</text>
								<text class="text-xxl">99.99</text>
							</view>
							<view class="margin-left-sm">
								<text class="line-through line-height-xxl text-sm text-gray">￥100.00</text>
							</view>
						</view>
						<view class="flex justify-between">
							<view class="">
								<text class="text-sm text-gray">已售：88份</text>
							</view>
							<view class="">
								<text class="text-red iconfont icongouwuche"></text>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			list: { // 数据列表
				type: Array,
				default () {
					return []
				}
			}
		},
		data() {
			return {
				CustomBar: this.CustomBar,
				StatusBar: this.StatusBar,
				/* 搜索条默认选中项 */
				index: 1,
				/* 搜索条综合是否展开 */
				c: false,
				/* 搜索条综合搜索选项 */
				cList: ['综合', '最新上架', '价格最低', '价格最高', '评价最多'],
				/* 搜索条 综合显示文本 */
				syntText: '综合',
				/* 列表类型 1一行一个，2一行两个*/
				listType: 1,
				/* 更多过滤 */
				showFilter: false
			}
		},
		methods: {
			/* 点击综合 */
			synthesizeClick() {
				this.c = !this.c
			},
			/* 点击销量 */
			salesClick() {
				this.index = 2
			},
			/* 综合 点击选项 */
			choose(item) {
				this.syntText = item
				this.c = false
				this.index = 1
			},
			/*列表类型点击  */
			listTypeClick() {
				this.listType = this.listType == 1 ? 2 : 1
			}
		}

	}
</script>

<style>
	page {
		/* background-color: #FFFFFF; */
		overflow: hidden;
	}

	.tools-alert {
		height: 100%;
		position: fixed;
		width: 100%;
		left: 0;
		box-sizing: border-box;
		background-color: rgba(0, 0, 0, 0.4);
		z-index: 100;
	}

	.filter-content {
		overflow-y: auto;
		/* #ifdef H5 */
		height: calc(100vh - 105px);
		/* #endif */
		/* #ifdef MP-WEIXIN */
		height: calc(100vh - 125px);
		/* #endif */
		/* #ifdef APP-VUE */
		height: calc(100vh - 145px);
		/* #endif */
	}

	.filter-price-input {
		width: 232upx;
		height: 80upx;
		border-radius: 6upx;
	}

	.solids-center {
		height: 4upx;
		background-color: #eee;
		width: 30upx;
		margin-top: 38upx;
	}
</style>
