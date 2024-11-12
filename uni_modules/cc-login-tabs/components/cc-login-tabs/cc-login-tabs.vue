<template>

	<view class="login_method" :style="{ '--theme-color': themeColor }" >

		<view class="title" v-for="(item, index) in tabsArr" :key="index"
			:class="{ active: (selIndex == index) }" @click="tabClick(index)">{{item}}</view>

	</view>
</template>

<script>
	export default {
		props: {
			selIndex: {
				type: [Number, String],
				default: 1000
			},
			tabsArr: {
				type: Array,
				default: function() {
					return [];
				}
			},
			themeColor: {
			  type: String,
			  default: '#eaff2d' // 默认值为橙红色
			}
		},

		methods: {

			tabClick(tag) {

				this.$emit('tabClick', tag)

			},

		}


	}
</script>



<style lang="scss" scoped>
	//主题色 #ea552d
	// $themeColor: #ea552d;

	.login_method {
		margin-top: 60rpx;
    margin-left: 100rpx;
    margin-right: 100rpx;
		display: flex;
		justify-content: space-between;
		padding: 0 96rpx;
		padding-bottom: 20rpx;

		.title {
			font-size: 32rpx;
			color: grey;

			&.active {
				position: relative;
				color: var(--theme-color);
				display: flex;
				padding-bottom: 28rpx;
			}

			&.active::after {
				bottom: 0rpx;
				left: 50%;
				transform: translateX(-50%) translateY(-50%);
				position: absolute;
				content: '';
				width: 240rpx;
				height: 6rpx;
				background-color: var(--theme-color);
			}
		}
	}
</style>