<script>
	import {
		APP_VERSION,USER_INFO
	} from './api/index.js';
	import {
		SUCCESS
	} from './api/errorcode.js';
	export default {
		onLaunch: function() {
			//#ifdef APP-PLUS  
			var server = ""; //检查更新地址  
			var req = { // 升级检测数据  
				"appid": plus.runtime.appid,
				"version": plus.runtime.version
			};
			// uni.showToast({
			// 	title:"当前版本号:"+plus.runtime.version
			// })
			console.log(req);
			uni.request({
				url: APP_VERSION,
				data: req,
				method: "POST",
				success: (res) => {
					console.log(typeof res);
					if (res.data.code === SUCCESS) {
						console.log("APP需要更新");
						uni.showModal({ //提醒用户更新  
							title: "更新提示",
							content: res.data.note,
							success: (result) => {
								if (result.confirm) {
									// console.log(res.data);
									plus.runtime.openURL(res.data.path);
								}
							}
						})
					} else {
						//无需更新
						console.log("APP无需更新");
					}
				}
			})
			//#endif 
			//重新获取最新用户信息
			let token = uni.getStorageSync(this.sessionKey);
			if(token!=null && token!=''){
				console.log('===App(重新获取最新用户信息)===')
				uni.request({
					url: USER_INFO + "/" + token,
					header: {
						'ACCESS-CONTROL-ALLOW-TOKEN': token
					},
					complete: (res) => {
						if (res.data.code == SUCCESS) {
							uni.setStorageSync("user", res.data.user);
						}
					},
				})
			}
		},
		onShow: function() {
			console.log('App Show');
		},
		onHide: function() {
			console.log('App Hide');
		}
	};
</script>

<style>
	@import "/common/uni.css";
	@import "/common/animate.css";
	@import "/common/zcm-main.css";
	@import "/common/common.css";
	/*每个页面公共css */
	@import "common/colorui/main.css";
	@import "common/colorui/icon.css";
	@import "common/icon/iconfont.css";
	@import "/common/icon.css";
	/* 解决头条小程序组件内引入字体不生效的问题 */
	/* #ifdef MP-TOUTIAO */
	@font-face {
		font-family: uniicons;
		src: url('/static/uni.ttf');
	}

	/* #endif */
	page {
		overflow-y: scroll !important;
		height: 100%;
	}
</style>
