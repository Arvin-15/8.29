import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
	state: {
		user: {
			"id": null,
			"name": null,
			"phone": null,
			"memberType": null,
			"avatar": null,
			"nickname": null,
			"memberExpireDate": null,
			"score": null
		},
		// 购物车列表
		cartList: uni.getStorageSync('cart') || [],
		// 商品总数
		total: null,
		// tab栏的索引页面
		current: 0,
		// 矿机列表
		fieldList: [],
		// 正在使用的矿机
		fieldNowList:[],
		// 已废弃的矿机
		failFieldList:[]
	},
	mutations: {
		setUser(state, user) {
			state.user = user;
		},
		// 添加商品
		addCartList(state, options) {
			// 判断是否存在商品
			let index = state.cartList.findIndex(item => item.id === options.id);
			if (index >= 0) {
				state.cartList[index].count = state.cartList[index].count + options.count;
				this.commit("saveToLocal", state.cartList);
				return false;
			}
			state.cartList.push(options)
			this.commit('saveToLocal', state.cartList)
		},
		// 更新商品
		updateCartList(state, options) {
			state.cartList.some(item => {
				if (item.ids == options.id) {
					item.count = options.count
					return true
				}
			})
			this.commit('saveToLocal', state.cartList)
		},
		// 删除商品
		deleteCartList(state, id) {
			state.cartList = state.cartList.filter(item => item.id !== id)
			this.commit('saveToLocal', state.cartList)
		},
		// 实时计算更新购物车数据  总数
		saveToLocal(state, options) {
			uni.setStorageSync('cart', options)
			// 选中的商品
			let isCheck = options.filter(item => item.isChecked)
			let total = 0
			isCheck.forEach(item => total += item.count)
			state.total = total
			state.checkStateAll = options.length === options.filter(item => item.isChecked).length
		},
		// 更改单选框的状态
		updateCheckState(state, options) {
			state.cartList.some(item => {
				if (item.id === options.id) {
					item.isChecked = options.state
					return true
				}
			})
			this.commit('saveToLocal', state.cartList)
		},
		// 更改全选框的状态
		updateCheckAllState(state, status) {
			state.cartList.forEach(item => item.isChecked = status)
			this.commit('saveToLocal', state.cartList)
		},
		// 子tab栏切换的时候
		handleClickChildren(state, current) {
			state.current = current
		},
		// 父tab栏切换的时候
		handleClickParent(state) {
			state.current = 0
		},
		// 保存矿机列表
		saveFieldList(state, options) {
			// 说明是已完成的矿机
			if(!(Array.isArray(options))) {
				if(options.data.length==0) {
					state.failFieldList=options.data
					return false
				}
				options=options.data
			}
			// console.log(options)
			// 正在使用的矿机
			if(options.length==0) {
				state.fieldNowList=options
				return false
			}
			if(options[0].createDate){
				// 正在使用的矿机
				options=options.map(item=>{
					return {
						// 矿机id
						id:item.id,
						// 矿机名称
						title:item.taskName,
						// 矿机成长速度
						speed:item.singleIntegral,
						// 可以领取的积分
						count:item.state!=2?item.integral:'',
						// 可以领取的资格
						isget:true,
						// 矿机图片
						url: 'http://pic.51yuansu.com/pic3/cover/03/00/61/5ae1bb0316e8d_610.jpg',
						// 矿机的状态
						state:item.state
					}
				})
				state.fieldNowList=options
				// 已完成的矿机
				state.failFieldList=options.filter(item=>item.state==2)
				return false
			}
			// 隐射处理矿机列表
			options=options.map(item => {
				return{
					// 矿机id
					id: item.id,
					// 矿机名称
					title: item.name,
					// 矿机图片
					url: 'http://pic.51yuansu.com/pic3/cover/03/00/61/5ae1bb0316e8d_610.jpg',
					// 矿机速度
					speed: item.singleIntegral,
					// 矿机价格
					price: item.money,
					// 是否可购买
					state:item.state
				}
			}).filter(item=>item.state=='0')
			state.fieldList = options
		}
	},
	actions: {
		setUser(context, user) {
			context.commit("setUser", user);
		},
		// 请求网络数据得到的购物车
		requestCartList(context, options) {
			context.commit("saveToLocal", options)
		},
		// 添加商品
		add(context, options) {
			context.commit('addCartList', options)
		},
		// 更新商品
		update(context, options) {
			context.commit('updateCartList', options)
		},
		// 删除商品
		delete(context, id) {
			context.commit('deleteCartList', id)
		},
		// 更改单选框状态
		updateState(context, options) {
			context.commit('updateCheckState', options)
		},
		// 更改全选框状态
		updateStateAll(context, state) {
			context.commit('updateCheckAllState', state)
		}
	}
})
export default store
