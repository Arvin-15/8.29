<template>
	<view>
		<!-- tab栏切换 -->
		<uni-segmented-control :current="current" :values="filed" @clickItem="onClickItem" style-type="button" active-color="#EE2C2C"></uni-segmented-control>
		<view class="content">
			<!-- 我的矿机 -->
			<view v-show="current === 0">
				<myfield ref="myfield"/>
			</view>
			<!-- 矿机列表 -->
			<view v-show="current === 1">
				<fieldlist ref="list" />
			</view>
		</view>
	</view>
</template>

<script>
	import myfield from './myfield.vue'
	import fieldlist from './fieldlist.vue'
	import {FIELDLIST,FIELDNOW} from '@/api/index.js'
	import {SUCCESS} from '@/api/errorcode.js'
	export default {
		components: {
			myfield,
			fieldlist
		},
		data() {
			return {
				// 矿机信息
				filed: ['我的矿机', '矿机信息'],
				// 默认显示我的矿机
				current: 0
			};
		},
		methods: {
			// 矿机中心发生切换的时候
			onClickItem(e) {
				console.log(e.currentIndex);
				this.current = e.currentIndex
				this.$store.commit("handleClickParent")
				// 我的矿机
				if (this.current == 0) {
					// 请求正在使用的矿机
					this.getFieldNow()
				}
				// 矿机信息
				else {
					// 请求普通矿机列表数据
					this.getFieldList()
				}	
			},
			// 获取正在使用的矿机
			async getFieldNow() {
				const {data:res}=await this.$http({
					url:FIELDNOW
				})
				if (res.code != SUCCESS) return false
				this.$store.commit("saveFieldList",res.date)
				// 更新数据
				this.$refs.myfield.fieldNowList=this.$store.state.fieldNowList
			},
			// 获取普通矿机列表
			async getFieldList() {
				const {data: res} = await this.$http({
					url: FIELDLIST
				})				
				if (res.code != SUCCESS) return false
				this.$store.commit("saveFieldList", res.date)
				// 更新数据
				this.$refs.list.fieldList=this.$store.state.fieldList
				console.log(this.$store.state.fieldList);
			}
		},
		onLoad() {
			// 获取正在使用的矿机数据
			this.getFieldNow()
			// 请求普通矿机列表数据
			this.getFieldList()
		}
	}
</script>

<style lang="less">

</style>
