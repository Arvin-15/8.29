//测试环境
// const IP_ADDRESS = "http://192.168.0.104:8081/member-api/";
// 柯
// const IP_ADDRESS_ONLINE = "/";
// const IP_ADDRESS_ONLINE = "http://192.168.31.235:8081/";
const IP_ADDRESS_ONLINE = "http://localhost:8081/member-api/";
// 鑫
// const IP_ADDRESS_ONLINE = "http://192.168.31.205:8081/member-api/";
// 线上
// const IP_ADDRESS_ONLINE = "http://39.100.86.88:8081/member-api/";
//登录接口
export const LOGIN = IP_ADDRESS_ONLINE +"member/login";

//手机号验证
export const VALID_PHONE = IP_ADDRESS_ONLINE + "member/validphone";

//短信验证码
export const SMS = IP_ADDRESS_ONLINE +"member/sms";

//用户注册
export const REGISTER = IP_ADDRESS_ONLINE + "member/register";

//忘记密码
export const FORGET_PASS = IP_ADDRESS_ONLINE + "member/resetpass";

//退出登录
export const EXIT = IP_ADDRESS_ONLINE + "member/logout";

//会员信息修改
export const UPDATE_USER = IP_ADDRESS_ONLINE + "member/updateuser";

//会员信息展示
export const USER_INFO = IP_ADDRESS_ONLINE + "member/userinfo";

//会员反馈
export const FEEDBACK = IP_ADDRESS_ONLINE + "feedback/save";

//积分提现
export const CASH_OUT = IP_ADDRESS_ONLINE + "member/cashout";

//团队结构查询
export const STRUCTURE = IP_ADDRESS_ONLINE + "member/treeList";

//团队结构按会员卡类型查询/treeList/{userId}/{type}
//type:普卡treeList,银卡goldTreeList,金卡diamondTreeList
export const STRUCTURE_TYPE = IP_ADDRESS_ONLINE + "member/treeList"

//会员卡列表
export const MEMBER_LIST = IP_ADDRESS_ONLINE + "member/list";

//新闻列表
export const NEWS_LIST = IP_ADDRESS_ONLINE + "news/list"

//轮播图列表
export const BANNER_LIST = IP_ADDRESS_ONLINE + "banner/list"

//会员卡购买
export const BUY_VIP = IP_ADDRESS_ONLINE + "member/buyvip";

//公益抽奖(当日还能抽奖多少次)reward/userMun/{userId}
export const LOTTERY_COUNT = IP_ADDRESS_ONLINE + "reward/userMun";

//获取抽奖结果reward/reward/{userId}
export const LOTTERY_RES = IP_ADDRESS_ONLINE + "reward/reward";

//好友推广
export const INVITATION = IP_ADDRESS_ONLINE + "member/invitation";

// 我的推广
export const MY_PROMOTION = IP_ADDRESS_ONLINE + "member/promotionImg";

// //商品分类
// export const CATEGOIES = IP_ADDRESS + "commodity/classification";

// //根据商品分类ID查询商品
// export const PRODUCT_LIST = IP_ADDRESS + "commodity/commodity";

// //根据商品ID查询商品详情
export const PRODUCT_DETAIL = IP_ADDRESS_ONLINE + "commodity/details";

//商品分类与商品列表加载
export const PRODUCT_LIST = IP_ADDRESS_ONLINE + "commodity/commodityList"

//收货地址查询(/list/{userid})
export const ADDRESS_LIST = IP_ADDRESS_ONLINE + "address/list";

//收货地址添加
export const ADDRESS_NEW = IP_ADDRESS_ONLINE + "address"

//收货地址修改(PUT请求)
export const ADDRESS_MODIFY = IP_ADDRESS_ONLINE + "address/addressUp"

//删除收货地址
export const ADDRESS_DEL = IP_ADDRESS_ONLINE + "address"

//身份验证地址
export const IDCARD_VALID = IP_ADDRESS_ONLINE + "member/binding"

//图片上传地址
export const IMG_UPLOAD = IP_ADDRESS_ONLINE + "sys/oss/upload";

//获取支付订单
export const ORDER_INFO = IP_ADDRESS_ONLINE + "aliPay/appPay";

//支付结果回调给服务器
export const ORDER_CALLBACK = IP_ADDRESS_ONLINE + "/aliPay/notifyUrl";

//修改用户验证状态
export const UPDATE_STATE = IP_ADDRESS_ONLINE + "member/updatePay";

//版本升级
export const APP_VERSION = IP_ADDRESS_ONLINE + "appEdition"

//查询默认的收货地址
export const ADDRESS_DEFAULT = IP_ADDRESS_ONLINE + "address";

//查询是否有支付宝账号:member:GET无参
export const HASH_ALIPAY = IP_ADDRESS_ONLINE + "member";

//设置支付宝账号member/  setZhiFuBao/{zfb}
export const SET_ALIPAY = IP_ADDRESS_ONLINE + "member/setZhiFuBao";

//全部提现
export const WITH_DRAWAL = IP_ADDRESS_ONLINE + "member/withdrawal";

//查询积分
export const QUERY_SCORE = IP_ADDRESS_ONLINE + "member/getUserIntegral";

//公告查询
export const ANNOUNCEMENT = IP_ADDRESS_ONLINE + "announcement/list";

//推广信息
export const PROMOTION_LIST = IP_ADDRESS_ONLINE + "member/promotionList";

//重置密码
export const MODIFY_PASS = IP_ADDRESS_ONLINE + "member/uptatepass";
//积分
export const INTEGRAL = IP_ADDRESS_ONLINE + "integral";
// 购物车添加
export const CARTADD = IP_ADDRESS_ONLINE + "shoppingcart/add";
// 购物车列表
export const CARTLIST = IP_ADDRESS_ONLINE + "shoppingcart/list";
// 购物车更新和删除
export const CARTDELETE = IP_ADDRESS_ONLINE + "shoppingcart";

/* 矿机中心 start */
// 矿机列表
export const FIELDLIST = IP_ADDRESS_ONLINE+"task/list";

// 正在使用的矿机
export const FIELDNOW=IP_ADDRESS_ONLINE+"task/getMyTask";
  
// 领取积分
export const GETINTEGRAL=IP_ADDRESS_ONLINE+"task/getIntegral";

// 获取已完成的矿机
export const FIELDCOMPLETE=IP_ADDRESS_ONLINE+"task/getMyCompleteTask";

// 购买矿机
export const BUYFIELD=IP_ADDRESS_ONLINE+"task/buyTask";
/* 矿机中心 end */

/* 交易中心 start */
// 购买列表
export const BUYLIST=IP_ADDRESS_ONLINE+"Trading/buyList";

// 我要购买
export const RELEASEBUY=IP_ADDRESS_ONLINE+"Trading/releaseBuy";

// 获取单价
export const SHOPPRICE=IP_ADDRESS_ONLINE+"Trading/getCurrencyMoney"

// 出售列表
export const SELLLIST=IP_ADDRESS_ONLINE+"Trading/sellList";

// 我要出售
export const RELEASESELL=IP_ADDRESS_ONLINE+"Trading/releaseSell";

// 正在交易
export const NOWSHOP=IP_ADDRESS_ONLINE+"Trading/myNewList";

// 交易完成
export const COMPELETESHOP=IP_ADDRESS_ONLINE+"Trading/myCompleteList";

// 交易失败
export const FAILSHOP=IP_ADDRESS_ONLINE+"Trading/myFailureList";

// 兑换金币
export const BUYCOIN=IP_ADDRESS_ONLINE+"task/buyCoin";
/* 交易中心 end */