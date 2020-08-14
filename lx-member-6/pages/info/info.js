import app from "../../App.vue"
import {EXIT,UPDATE_USER,IMG_UPLOAD} from '../../api/index.js';
import {SUCCESS} from '../../api/errorcode.js';
	// 定义全局参数,控制数据加载
	var _self, timer = null;

	export default {
		data() {
			return {
				user:uni.getStorageSync("user") || {}
			}
		},
		components:{
		},
		onLoad(options) {
			_self = this;
			console.log("用户信息:");
			console.log(_self.user);
			console.log("头像信息:",options.avatar);
			if(options.avatar){
				this.user.avatar = options.avatar;
				//修改头像 headPortrait
				//图片上传服务器
				uni.uploadFile({
					url: IMG_UPLOAD, 
					filePath: options.avatar,
					method: 'post',
					name: 'file', 
					success: (res) => {
						console.log("头像上传结果:",res.data);
						var imgSrc = JSON.parse(res.data).src;
						//更新头像路径
						uni.request({
							url:UPDATE_USER,
							method:"POST",
							data:{
								id:_self.user.id+"",
								headPortrait:imgSrc
							},
							header:{
								'ACCESS-CONTROL-ALLOW-TOKEN':uni.getStorageSync(_self.sessionKey)
							},
							complete: (res) => {
								console.log("保存头像信息结果: ",res);
								if(res.data.code==SUCCESS){
									this.user.avatar=imgSrc;
									uni.setStorageSync("user",this.user);
								}
							}
						})
					},
					fail: (res) => {
						console.log("longyoung.uploadFile.fail=", res);
						uni.showToast({
							title:'头像上传错误',
							icon: "none"
						})
					}
				});
			}
		},
		onShow() {
			console.log("on show");
			this.user=uni.getStorageSync("user") || {}
		},
		onPullDownRefresh: function() {
			//下拉刷新的时候请求一次数据
			// this.Refresh();
		},
		methods: {
			exit(){
				let _this = this;
				uni.showModal({
				    title: '提示',
				    content: '确认要退出当前账号?',
				    success: function (res) {
				        if (res.confirm) {
				            uni.request({
				            	url:EXIT+"/"+uni.getStorageSync("user").id,
											header:{
												'ACCESS-CONTROL-ALLOW-TOKEN':uni.getStorageSync(_this.sessionKey)
											},
				            	method:"GET",
				            	complete: function(res){
				            		console.log("===退出登录===")
				            		console.log(res);
				            		if(res.data.code==SUCCESS){
				            			uni.removeStorageSync(_this.sessionKey);
				            			uni.removeStorageSync("user");
				            			uni.switchTab({
				            				url:"/pages/mine/mine"
				            			})
				            		}
				            	}
				            })
				        } else if (res.cancel) {
				            console.log('用户点击取消');
				        }
				    }
				});
			},
			/**
			* photo_63处理函数
			* 数据绑定  data-index="{{index}}" 
			* 数据取值  var index = e.currentTarget.dataset.index; var cata = this.list_cata_list[index];
			*/
			photo_63_click:function(src){
				uni.navigateTo({
					url:'/pages/echo-cropper/echo-cropper?src='+src
				})
			},
			
			/**
			* row4_65处理函数
			* 数据绑定  data-index="{{index}}" 
			* 数据取值  var index = e.currentTarget.dataset.index; var cata = this.list_cata_list[index];
			*/
			row4_65_click:function(name){
			  uni.navigateTo({
					url:'/pages/modify/modify?name='+name
				})
			},
			
			/**
			* info_68_68处理函数
			* 数据绑定  data-index="{{index}}" 
			* 数据取值  var index = e.currentTarget.dataset.index; var cata = this.list_cata_list[index];
			*/
			info_68_68_click:function(event){
			
			},
			
			/**
			* row3_70处理函数
			* 数据绑定  data-index="{{index}}" 
			* 数据取值  var index = e.currentTarget.dataset.index; var cata = this.list_cata_list[index];
			*/
			row3_70_click:function(event){
			
			   uni.navigateTo({
			   url:'/pages/nav/nav'
			  })
			},
			
			/**
			* info_73_73处理函数
			* 数据绑定  data-index="{{index}}" 
			* 数据取值  var index = e.currentTarget.dataset.index; var cata = this.list_cata_list[index];
			*/
			info_73_73_click:function(event){
			
			},
			
			/**
			* row2_75处理函数
			* 数据绑定  data-index="{{index}}" 
			* 数据取值  var index = e.currentTarget.dataset.index; var cata = this.list_cata_list[index];
			*/
			row2_75_click:function(event){
			
			   uni.navigateTo({
			   url:'/pages/nav/nav'
			  })
			},
			
			/**
			* row1_80处理函数
			* 数据绑定  data-index="{{index}}" 
			* 数据取值  var index = e.currentTarget.dataset.index; var cata = this.list_cata_list[index];
			*/
			row1_80_click:function(event){
			
			   uni.navigateTo({
			   url:'/pages/nav/nav'
			  })
			}
		}
	}
