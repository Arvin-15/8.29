/* options:发送请求传递的对象参数 */
function http(options) {	
	return new Promise((reslove, reject) => {
		uni.request({
			url: options.url,
			method: options.method || "GET",
			data: options.data || {},
			header: {
				'ACCESS-CONTROL-ALLOW-TOKEN': uni.getStorageSync(this.sessionKey) || ""
			},
			success: res => {
				if (res.statusCode !== 200) {
					return uni.showToast({
						title: "获取数据失败",
						icon: "none"
					})
				}
				// 判断token是否过期
				if(res.data.code==900){
					uni.navigateTo({
						url:'/pages/login/login'
					})
					uni.clearStorageSync()
					return false
				}
				reslove(res)
			},
			fail: err => {
				uni.showToast({
					title: "调用接口失败",
					icon: "none"
				})
				reject(err)
			}
		})
	})
}
export default http
