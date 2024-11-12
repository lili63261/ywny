<template>
	<u-popup
		:show="show"
		mode="center"
		round="16rpx"
		:closeOnClickOverlay="false"
		@close="close"
		@open="open">
		<view class="title">
			{{ ititle }}
		</view>
		<view class="content">
			<text>{{ icontent }}</text>
		</view>
		<view class="btns">
			<view v-if="icancelshow" class="btn cancel" @click="close()">{{ icancel }}</view>
			<view class="btn confirm" @click="confirm()">{{ iconfirm }}</view>
		</view>
	</u-popup>
</template>

<script>
	export default {
		name: 'iupop',
		props: {
			ititle: {
				type: String,
				default: '温馨提示'
			},
			icontent: {
				type: String,
				default: '确定执行此操作吗?'
			},
			icancel: {
				type: String,
				default: '取消'
			},
			icancelshow: {
				type: Boolean,
				default: true
			},
			iconfirm: {
				type: String,
				default: '确定'
			}
		},
		data() {
			return {
				show: false
			}
		},
		methods: {
			open() {
				this.show = true
			},
			close() {
				this.show = false
				this.$emit('closed')
			},
			confirm() {
				this.show = false
				this.$emit('confd')
			}
	  }
	}
</script>

<style lang="scss" scoped>
.title {
	margin: 20rpx 20rpx 0 20rpx;
	padding: 10rpx 20rpx 20rpx 20rpx;
	text-align: center;
	font-weight: bold;
	font-size: 30rpx;
	border-bottom: 1px solid #efefef;
}
.content {
	width:80vw;
	padding: 50rpx 20rpx;
	text-align: center;
}
.btns {
	display: flex;
	align-items: center;
	justify-content: space-around;
	.btn {
		width: 40%;
		margin: 20rpx 0;
		padding: 25rpx 0;
		text-align: center;
		border-radius: 30rpx;
		font-weight: bold;
		font-size: 30rpx;
		&.cancel {
			background-image: linear-gradient(to bottom, #fdfbfb 0%, #ebedee 100%);
		}
		&.confirm {
			background-image: linear-gradient(45deg, #2979ff 50%, #609cff);
			color: #fff;
		}
	}
}
</style>