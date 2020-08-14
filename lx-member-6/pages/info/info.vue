<template>
	<view class="YmContent">
			<view class="info_96">
				<view class="info_61">
					<text decode="true" class="info_62">头像</text>
					<image v-on:click="photo_63_click(user.avatar || '/static/fumou-center-template/header.jpg')"  :src="user.avatar || '/static/fumou-center-template/header.jpg' " mode="scaleToFill" border="0"    class="photo"></image>
				</view>
				<view class="info_64">
				</view>
				<view v-on:click="row4_65_click(user.nickname)" class="row4">
					<text decode="true" class="info_66">昵称</text>
					<text decode="true" class="nickname">{{user.nickname}}</text>
				</view>
				<view class="info_69">
				</view>
				<view class="row3">
					<text decode="true" class="info_71">真实姓名</text>
					<text decode="true" class="name">{{user.name}}</text>
				</view>
				<view class="info_69">
				</view>
				<view v-on:click="row3_70_click()" class="row3">
					<text decode="true" class="info_71">身份证</text>
					<text decode="true" class="ids">{{user.idcard}}</text>
				</view>
				<view class="info_74">
				</view>
				<view v-on:click="row2_75_click()" class="row2">
					<text decode="true" class="info_76">手机号码</text>
					<text decode="true" class="mobile">{{user.phone}}</text>
				</view>
				<view class="info_79">
				</view>
				<!-- <view v-on:click="row1_80_click()" class="row1">
					<text decode="true" class="info_81">绑定银行</text>
					<text decode="true" class="job">中国银行</text>
				</view>
				<view class="info_79">
				</view>
				<view v-on:click="row1_80_click()" class="row1">
					<text decode="true" class="info_81">银行卡号</text>
					<text decode="true" class="job">82928*****7171</text>
				</view> -->
				<!-- <view class="info_83">
				</view> -->
				<view v-on:click="exit" class="row1">
					<button type="default" style="color: #F00;font-weight: bold;">退出登录</button>
				</view>
			</view>
		<view class="ymBbottom"></view>
	</view>
</template>

<script>
import info from "./info.js";
export default info;
</script>

<style lang="scss" scoped>
   @import './info.scss'
</style>