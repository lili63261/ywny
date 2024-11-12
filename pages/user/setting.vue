<template>
	<view class="container">
		<uni-nav-bar class="uniNavBar" title="设置" :border="false" backgroundColor="#ffffff" left-icon="left"
			@clickLeft="$tab.navigateBack()" />
		<uni-list border class="uniListDiv">
			<uni-list-item title="官方公告" link to="/pages/notice" @click="onClick($event,1)"></uni-list-item>
			<uni-list-item link title="App下载" clickable @click="$refs.downloadApp.open()"></uni-list-item>
			<uni-list-item class="tc" title="退出登录" clickable @click="$refs.pop1.open()"></uni-list-item>
		</uni-list>

		<iupop ref="pop1" icontent="是否立即退出系统吗?" ititle="退出提醒" @confd="logout" />
		<download-app ref="downloadApp" />
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {
			logout() {
				this.$refs.uToast.loading('正在退出...')

				this.$store.dispatch('LogOut').then(() => {
					this.$tab.reLaunch('/pages/login');
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.container {}

	.uniListDiv {
		margin-top: 20rpx;

		.tc {
			border-top: 20rpx solid #f4f8fb;
			text-align: center;
		}
	}

	.chat-custom-right {
		flex: 1;
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: column;
		justify-content: space-between;
		align-items: flex-end;
	}

	.chat-custom-text {
		font-size: 12px;
		color: #999;
	}
</style>