<template>
	<view class="container">
		<view id="rotary-table">
			<view class="award" v-for="(award,index) in awards" :class="['award'+index,{'active': index==current}]">
				<image :src="award.award" 
				style="width: 50upx;height: 50upx;position: absolute;left: 50%;transform: translate(-50%);top:30upx;"></image>
				{{award.name}}
			</view>
			<view id="start-btn" @click="start">开始</view>
		</view>
		<view id="tips">
			<view><text>抽奖须知:</text></view>
			<view>1.每次抽奖扣除30积分</view>
			<view>1.抽到的积分会直接充值到自己的账户中</view>
		</view>
	</view>
</template>
<script>
	export default {
		name: 'raffle',
		data() {
			return {
				current: 0,
				awards: [{
						id: 1,
						name: '空',
						award:''
					},
					{
						id: 2,
						name: '50积分',
						award:'../../static/money.png'
					},
					{
						id: 3,
						name: '空',
						award:''
					},
					{
						id: 4,
						name: '200积分',
						award:'../../static/money.png'
					},
					{
						id: 5,
						name: '空',
						award:''
					},
					{
						id: 6,
						name: '10积分',
						award:'../../static/money.png'
					},
					{
						id: 7,
						name: '空',
						award:''
					},
					{
						id: 8,
						name: '100积分',
						award:'../../static/money.png'
					}
				],
				speed: 200,
				diff: 15,
				award: {},
				time: 0
			};
		},
		methods: {
			start() {
				// 开始抽奖
				this.drawAward();
				this.time = Date.now();
				this.speed = 200;
				this.diff = 15;
			},
			drawAward() {
				// 请求接口, 这里我就模拟请求后的数据(请求时间为2s)
				setTimeout(() => {
					this.award = {
						id: '4',
						name: '200积分',
					};
				}, 3000);
				this.move();
			},
			move() {
				window.timeout = setTimeout(() => {
					this.current++;
					if (this.current > 7) {
						this.current = 0;
					}
					if (this.award.id && (Date.now() - this.time) / 1000 > 2) {
						this.speed += this.diff;
						if ((Date.now() - this.time) / 1000 > 4 && this.award.id == this.awards[this.current].id) {
							clearTimeout(window.timeout);
							setTimeout(() => {
								uni.showToast({
									title:'恭喜你，抽中' + this.award.name,
									icon:"success"
								})
							}, 0);
							return;
						}
					} else {
						this.speed -= this.diff;
					}
					console.log(this.speed);
					this.move();
				}, this.speed);
			}
		}
	};
</script>

<style lang="scss">
	* {
		margin: 0;
		padding: 0;
		list-style: none;
		outline: none;
	}
	#tips{
		width:340px;
		margin: 100upx auto;
	}
	#rotary-table {
		width: 340px;
		height: 349px;
		position: relative;
		margin: auto;
		background-color: antiquewhite;
		margin-top: 100upx;
		.award {
			width: 90px;
			height: 96px;
			line-height: 110px;
			text-align: center;
			float: left;
			position: absolute;
			overflow: hidden;
			background-color: gold;
			font-size: 30upx;
			&.active {
				background-color: red;
				color: white;
			}

			&.award0 {
				top: 21px;
				left: 21px;
			}

			&.award1 {
				top: 21px;
				left: 125px;
			}

			&.award2 {
				top: 21px;
				right: 22px;
			}

			&.award3 {
				top: 126px;
				right: 22px;
			}

			&.award4 {
				bottom: 22.5px;
				right: 22px;
			}

			&.award5 {
				bottom: 22.5px;
				right: 125.5px;
			}

			&.award6 {
				bottom: 22.5px;
				left: 21px;
			}

			&.award7 {
				top: 126px;
				left: 21px;
			}
		}

		#start-btn {
			position: absolute;
			top: 125px;
			left: 124px;
			width: 90px;
			height: 96px;
			line-height: 90px;
			text-align: center;
			background-color: #FD6801;
			color: white;
			font-weight: bold;
			font-size: 50upx;
		}
	}
</style>
