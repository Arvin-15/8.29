// 路由规则
const routes = [
	// tabbar-start
	{
		path: 'pages/index/index',
		name: '我的首页',
		isTab: true
	},
	{
		path: 'pages/category/shop',
		name: '商城首页',
		isTab: true
	},
	{
		path: 'pages/mine/mine',
		name: '个人中心',
		isTab: true
	},
	{
		path: 'pages/activity/activity',
		name: '新闻资讯',
		isTab: true
	},
	{
		path: 'pages/category/shopcar',
		name: '购物车',
		isTab: true
	},
	// tabbar-end
	{
		path: 'pages/feedback/feedback',
		name: '问题反馈'
	},
	{
		path: 'pages/echo-cropper/echo-cropper',
		name: '头像上传'
	},
	{
		path: 'pages/info/info',
		name: '个人信息'
	},
	{
		path: 'pages/login/login',
		name: '登录'
	},
	{
		path: 'pages/login/register',
		name: '注册'
	},
	{
		path: 'pages/login/login',
		name: '登录'
	},
	{
		path: 'pages/bdocr/bdocres',
		name: '身份验证'
	},
	{
		path: 'pages/field/field',
		name: '矿机中心'
	},
	{
		path: 'pages/trading/trading',
		name: '交易中心'
	},
	{
		path: 'pages/buseiness/buseiness',
		name: '推广信息'
	},
	{
		path: 'pages/login/forget',
		name: '找回密码'
	},
	{
		path: 'pages/AlipayAccount/AlipayAccount',
		name: '提现'
	},
	{
		path: 'pages/publish/publish',
		name: '公告管理'
	},
	{
		path: 'pages/package/package',
		name: '套餐列表'
	},
	{
		path: 'pages/help/needhelp',
		name: '申请帮扶'
	},
	{
		path: 'pages/help/help',
		name: '公益帮扶'
	},
	{
		path: 'pages/member/member',
		name: '会员信息'
	},
	{
		path: 'pages/about/about',
		name: '关于我们'
	},
	{
		path: 'pages/news/news',
		name: '新闻详情'
	},
	{
		path: 'pages/order/order',
		name: '订单信息'
	},
	{
		path: 'pages/address/address_edit',
		name: '编辑收货地址'
	},
	{
		path: 'pages/address/address',
		name: '收货地址管理'
	},
	{
		path: 'pages/modify/modify',
		name: '昵称修改'
	},
	{
		path: 'pages/product/product',
		name: '产品详情'
	},
	{
		path: 'pages/category/category',
		name: '产品列表'
	},
	{
		path: 'pages/pay-result/pay-result',
		name: '支付结果'
	},
	{
		path: 'pages/pay-methods/pay-methods',
		name: '支付方式'
	},
	{
		path: 'pages/draw/draw',
		name: '公益抽奖'
	},
	{
		path: 'pages/share/share',
		name: '好友推广'
	},
	{
		path: 'pages/score/withdraw',
		name: '积分兑换'
	},
	{
		path: 'pages/score/score',
		name: '积分管理'
	},
	{
		path: 'pages/face/faces',
		name: '人脸识别'
	}
]
routes.forEach(item => item.path = '/' + item.path)

export default routes
