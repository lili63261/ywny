<template>
	<view class="ipg">
		<view class="layout">
			<view class="main">
				<view v-if="flag" class="balls">
					<view></view>
					<view></view>
					<view></view>
				</view>
				<view class="tips">{{ tips }}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				flag: true,
				tips: '在线客服连接中...'
			}
		},
		onLoad() {
			localStorage.setItem('salesmartly_p_f26fkyr_a_o_last', 1)

			const s = document.createElement('script')
			s.type = 'text/javascript'
			s.src = 'https://assets.salesmartly.com/js/project_89161_92963_1720509436.js'
			document.body.appendChild(s)

			s.onload = () => {
				ssq.push('chatOpen')

				ssq.push('onCloseChat', () => {
					this.flag = false
					this.tips = '点击左上角返回上一页'
					this.$tab.navigateBack()
				})
			}
		},
		methods: {}
	}
</script>

<style lang="scss" scoped>
	.ipg {
		position: relative;
		display: table;
		table-layout: fixed;
		width: 100%;
		height: calc(100vh - 44px);
		text-align: center;
		box-sizing: border-box;

		.layout {
			display: table-cell;
			vertical-align: middle;
			width: 100%;
			height: 100%;
		}

		.tips {
			padding-top: 40rpx;
			font-size: 30rpx;
			font-weight: bold;
			color: '#ab1111';
		}
	}

	.balls {
		width: 4em;
		margin: 0 auto;
		display: flex;
		flex-flow: row nowrap;
		align-items: center;
		justify-content: space-between;
	}

	.balls view {
		width: 0.8em;
		height: 0.8em;
		border-radius: 50%;
		background-color: #ab1111;
	}

	.balls view:nth-of-type(1) {
		transform: translateX(-100%);
		animation: left-swing 0.5s ease-in alternate infinite;
	}

	.balls view:nth-of-type(3) {
		transform: translateX(-95%);
		animation: right-swing 0.5s ease-out alternate infinite;
	}

	@keyframes left-swing {
		50%,
		100% {
			transform: translateX(95%);
		}
	}

	@keyframes right-swing {
		50% {
			transform: translateX(-95%);
		}

		100% {
			transform: translateX(100%);
		}
	}
</style>