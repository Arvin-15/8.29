import Vue from 'vue'
import App from './App'
import store from './store'
// 封装的数据请求
import http from '@/utiles/http'	
// 注册全局组件
import install from '@/utiles/usingComponents'
// 引入axios
import axios from 'axios'
// 引入路由
import router from './router'
import { RouterMount } from 'uni-simple-router'

import {LOGIN} from '@/api/index.js'

Vue.use(install)

Vue.config.productionTip = false

// 客户端不支持axios
// 请求拦截器
axios.interceptors.request.use(req => {
	if (req.url !== LOGIN) req.headers['ACCESS-CONTROL-ALLOW-TOKEN'] = uni.getStorageSync("sess_jk")
	if (req.method=='delete') req.headers['Content-Type']='application/json'
	return req
})
// 响应拦截器
axios.interceptors.response.use(res => {
	if(res.data.code===900){
		uni.redirectTo({
			url:'/pages/login/login'
		})
		uni.clearStorageSync()
	}
	return res
})
// 挂载axios到原型
// Vue.prototype.$http = axios
// 挂载封装的请求函数
Vue.prototype.$http=http

App.mpType = 'app'
Vue.prototype.sendRequest = function(param, backpage, backtype) {
	var _self = this,
		url = param.url,
		data = param.data || {},
		header = param.header,
		token = "";

	//拼接完整请求地址
	var requestUrl = this.siteBaseUrl + url;
	//固定参数
	if (!data.token) { //如果参数中无token(除了小程序第一次通过code获取token的接口默认参数token = login,其他接口token参数都是在本地缓存中获取)
		token = uni.getStorageSync(this.sessionKey);
		if (!token) { //本地无token需重新登录
			_self.login(backpage, backtype);
			return;
		} else {
			data.token = token;
		}
	}
	var timestamp = Date.parse(new Date()); //时间戳
	data["timestamp"] = timestamp;
	data["device"] = "wxapp"; //data["device"] = "iosapp";
	data["ver"] = "1.1.30"; //data["ver"] = "1.0.0";

	//GET或POST
	if (param.method) {
		param.method = param.method.toUpperCase(); //小写改为大写
	}

	//网络请求
	uni.request({
		url: requestUrl,
		method: param.method || "GET",
		header: header || {
			'content-type': "application/json"
		},
		data: data,
		success: res => {
			console.log("网络请求success:" + JSON.stringify(res));
			if (res.statusCode && res.statusCode != 200) { //api错误
				uni.showModal({
					content: "" + res.errMsg
				});
				return;
			}
			if (res.data.code) { //返回结果码code判断:0成功,1错误,-1未登录
				if (res.data.code == "-1") {
					_self.login(backpage, backtype);
					return;
				}
				if (res.data.code != "0") {
					uni.showModal({
						showCancel: false,
						content: "" + res.data.msg
					});
					return;
				}
			} else {
				uni.showModal({
					showCancel: false,
					content: "" + res.data.msg
				});
				return;
			}
			typeof param.success == "function" && param.success(res.data);
		},
		fail: (e) => {
			console.log("网络请求fail:" + JSON.stringify(e));
			uni.showModal({
				content: "" + res.errMsg
			});
			typeof param.fail == "function" && param.fail(res.data);
		},
		complete: () => {
			console.log("网络请求complete");
			uni.hideLoading();

			typeof param.complete == "function" && param.complete(res.data);
			return;
		}
	});
}

Vue.prototype.login = function(backpage, backtype) {
	var _self = this;
	uni.login({
		success: function(res) {
			_self.requestData({
				url: "user/login",
				data: {
					code: res.code,
					token: "login"
				},
				success: function(res2) {
					if (res2.data.errCode == "0") { //用户存在:存储token
						uni.setStorageSync(_self.sessionKey, res2.data.token);
					} else if (res2.data.errCode == "0") { //用户不存在:调转到绑定页面
						uni.redirectTo({
							url: '../binding/binding?backpage=' + backpage + '&backtype=' + backtype
						});
						return false;
					}
				}
			}, backpage, backtype)
		},
		fail: function(e) {
			console.log("微信login接口调用失败:" + JSON.stringify(e));
		}
	});
	return;
}


// Vue.prototype.siteBaseUrl = 'https://api.uchat.com.cn/';
Vue.prototype.siteBaseUrl = 'http://localhost:8080/';
Vue.prototype.$store = store;
Vue.prototype.sessionKey = "sess_jk";

const app = new Vue({
	...App,
	store
})
//v1.3.5起 H5端 你应该去除原有的app.$mount();使用路由自带的渲染方式
// #ifdef H5
	RouterMount(app,'#app');
// #endif

// #ifndef H5
	app.$mount(); //为了兼容小程序及app端必须这样写才有效果
// #endif
 