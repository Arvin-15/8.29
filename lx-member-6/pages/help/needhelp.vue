<template>
	<view class="center">
		<view class="">
			<text class="bt">需要筹集多少钱</text>
			<input type="text" value="" placeholder="还缺多少钱" />			
		</view>
		<view class="">
			<text class="bt">填写筹款标题</text> 
			<input type="text" value="" placeholder="一句话说名自己的情况"/>
		</view>
		<view class="">
			<text class="bt">填写求助说明</text>
			<view class="">
				<textarea value="" placeholder="家庭情况描述,家庭成员描述,家庭经济情况描述" />
			</view>
		</view>
		<view class="">
			<text class="bt">我承诺：</text>
			<view class="">
				1.所发起的个人大病求助项目，全部求助款项将用于求助人的治疗及康复费用，绝不挪用，如有剩余及时退还。 				2.所发布的求助信息完整、准确、真实、及时、合法，无虚构或隐瞒情形。
				3.将尊重赠与人的意愿，严格按照平台要求，及时说明求助人的治疗花费、家庭经济状况等平台要求说明的情况，并公示相应证明材料。
				若有违反，承担全部法律责任，并赔偿相关方所有损失。
			</view>
			<button type="primary">申请</button>
		</view>
	</view>
	
</template>

<script>
</script>

<style>
	.center{
		margin: 10px 20px 10px 20px;
	}
	
	.bt{
		font-size: 24px;
		selectable:false;
	}
		
	input{
		border:#2C405A 1px solid;
		height: 80rpx;
	}
	textarea{
		border:#2C405A 1px solid;
		width: 100%;
	}
</style>
