<template>
	<view class="lc-numberBox">
		<view class="lc-minus" @click="minus" :style="{'color':color,'border-color':color,'border-radius':fillet?'99px':'0rpx'}">-</view>
		<view class="lc-number"><input type="number" :disabled="isDisabled" v-model="inputValue" :style="{ width: inputValue.toString().length * 20 + 'rpx' }" /></view>
		<view class="lc-add" @click="add" :style="{'color':color,'border-color':color,'border-radius':fillet?'99px':'0rpx'}">+</view>
	</view>
</template>

<script>
export default {
	name: 'lc-number-box',
	props: {
		value: {
			type: [Number, String],
			default: 1
		},
		min: {
			type: Number,
			default: -999999
		},
		max: {
			type: Number,
			default: 999999
		},
		step: {
			type: Number,
			default: 1
		},
		disabled: {
			type: Boolean,
			default: false
		},
		color: {
			type: [Number, String],
			default: '#57d07f'
		},
		fillet:{
			type: Boolean,
			default: true
		},
	},
	created() {
		this.inputValue = +this.value;
		this.isDisabled = this.disabled;
		this.inputStep=parseFloat(this.step);
	},
	data() {
		return {
			inputValue: 0,
			isDisabled:false,
			inputStep:1
		};
	},
	watch: {
		value(val) {
			this.inputValue = +val;
		},
		inputValue(newVal, oldVal) {
			if (+newVal !== +oldVal) {
				this.$emit('change', newVal);
			}
		}
	},
	methods: {
		minus() {
			if(parseInt(this.inputValue)-parseInt(this.inputStep)<this.min){
				return;
			}
			this.inputValue=parseInt(this.inputValue)-parseInt(this.inputStep);
		},
		add() {
			if(parseInt(this.inputValue)+parseInt(this.inputStep)>this.max){
				return;
			}
			this.inputValue=parseInt(this.inputValue)+parseInt(this.inputStep);
		}
	}
};
</script>

<style lang="scss">
$themeColor: rgb(87, 208, 127);
.lc-numberBox {
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	.lc-minus,
	.lc-add {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 40rpx;
		height: 40rpx;
		border-radius: 50rpx;
		font-size: 40rpx;
		color: $themeColor;
		border: 1px solid $themeColor;
	}
	.lc-number {
		padding: 0 30rpx;
	}
}
</style>
