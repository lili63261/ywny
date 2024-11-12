<template>
	<view v-if="iswx" class="wxPop">
		<view class="iconfont icon-dajiantou arrow"></view>
		<view class="popText">
			<text class="num">1</text>
			点击右上角的
			<text class="iconfont icon-gengduo"></text>
			按钮
		</view>
		<view class="popText">
			<text class="num">2</text>
			选择
			<text class="iconfont icon-liulangqi"></text>
			浏览器中打开
		</view>
	</view>
</template>

<script>
	export default {
		name:"wxTip",
		data() {
			return {
				iswx: false,
			}
		},
		onLoad() {
			this.isWx()
		},
		methods: {
			// 是否安卓
			isAndorid() {
				return uni.getSystemInfoSync().platform === 'android'
			},
			// 判断是否为微信
			isWx() {
				if (!this.isAndorid()) {
					var ua = navigator.userAgent;
					if (ua.match(/windowswechat/i) == 'windowswechat') {
						return false
					} else {
						this.iswx = false
					}
					if (ua.match(/MicroMessenger/i) == 'micromessenger') {
						this.iswx = true
					}
				}
				return false
			},
		}
	}
</script>

<style lang="scss" scoped>
	
	
	
	
	
	.wxPop {
		position: absolute;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		padding: 50rpx;
		background: rgba(0, 0, 0, .8);
		color: #fff;
		z-index: 9999;

		.arrow {
			text-align: right;
			font-size: 100rpx;
		}

		.popText {
			display: flex;
			align-items: center;
			justify-content: center;
			margin-top: 50rpx;

			.num {
				width: 50rpx;
				height: 50rpx;
				margin-right: 20rpx;
				background: #b60005;
				border-radius: 50%;
				font-size: 40rpx;
				text-align: center;
			}

			.iconfont {
				margin: 0 10rpx;
				font-size: 50rpx;
			}
		}
	}
</style>