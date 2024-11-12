<template>
	<view class="wrap">
		<template>
			<view class="wrapper">
				<view class="layout">
					<view class="logo">
						<image src="/static/images/common/logo.png" mode="widthFix"></image>
					</view>
					<view class="login-div">
						<uni-view class="site" style="color: #00548e;"><span>您好,</span>
							<p>欢迎来到中国央网农业</p>
						</uni-view>
						<view class="main">
							<view class="iform">
								<view class="ipt">
									<!-- <view class="lable">
									手机号码
								</view> -->
									<input v-model="loginForm.username" type="number" maxlength="11"
										placeholder="请输入手机号" placeholder-class="ph" />
								</view>
								<view class="ipt">
									<!-- <view class="lable">
									登录密码
								</view> -->
									<input type="password" v-model="loginForm.password" maxlength="18"
										placeholder="请输入登录密码" placeholder-class="ph" />
								</view>
								<view class="router">
									<text @click="$tab.navigateTo('/pages/common/online')">忘记密码?</text>
								</view>
								<view class="login" @click="handleLogin()">登&nbsp;&nbsp;录</view>
								<view class="reg" @click="$tab.navigateTo('/pages/register')">注&nbsp;&nbsp;&nbsp;&nbsp;册
								</view>
							</view>
							<view class="other">
								<u-divider text="快捷服务" textColor="#fff" lineColor="#fff"></u-divider>
								<view class="btns">
									<view class="btn" @click="$tab.navigateTo('/pages/notice')">
										<view class="icon">
											<view class="iconxy iconxy-kefu"></view>
										</view>
										<view class="name">平台客服</view>
									</view>
									<view class="btn" @click="$tab.navigateTo('/pages/chat')">
										<view class="icon">
											<view class="iconxy iconxy-liaotianqingqiu"></view>
										</view>
										<view class="name">官方群聊</view>
									</view>
									<view class="btn" @click="$refs.downloadApp.open()">
										<view class="icon">
											<view class="iconxy iconxy-app"></view>
										</view>
										<view class="name">APP下载</view>
									</view>

								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</template>

		<download-app ref="downloadApp" />

		<!-- 微信展示浏览器打开 -->
		<wxTip />
	</view>
</template>

<script>
	import wxTip from "@/components/wxTip.vue"
	export default {
		components: {
			wxTip,
		},
		data() {
			return {
				isApp: false,
				loginForm: {
					username: '',
					password: ''
				},
				tabArr: ["登录", "注册"],
				tabType: 0,
			}
		},
		onLoad() {
			this.initIsApp();
			try {
				const value = uni.getStorageSync('LoginData')
				if (value) {
					this.loginForm = value
				}
			} catch (e) {
				console.log(95, e)
			}
		},
		methods: {
			async handleLogin() {
				if (this.loginForm.username === '') {
					this.$refs.uToast.error('请输入您的手机号')
				} else if (this.loginForm.password === '') {
					this.$refs.uToast.error('请输入您的密码')
				} else {
					this.$refs.uToast.loading('正在登录...')
					this.pwdLogin()
				}
			},
			async pwdLogin() {
				this.$store.dispatch('Login', {
					password: this.loginForm.password,
					phone: this.loginForm.username,
				}).then(() => {
					try {
						uni.setStorageSync('LoginData', this.loginForm)
					} catch (e) {
						console.log(143, e)
					}

					this.loginSuccess()
				}).catch(() => {})
			},
			loginSuccess(result) {
				// 设置用户信息
				this.$store.dispatch('GetInfo').then((res) => {
					this.$tab.reLaunch('/pages/home')
				})
			},
			initIsApp() {
				let hostName = location.hostname
				// 判断域名内是否有app
				if (hostName.indexOf('app') > -1) {
					this.isApp = true
				} else {
					this.isApp = false
				}
			},
			tabClick(type) {
				if (type === 1) {
					this.$tab.navigateTo('/pages/register')
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.wrap {
		width: 100%;
		background: url('/static/images/common/login-bg-v1.png') left top no-repeat;
		background-size: cover;
	}

	.wrapper {
		position: relative;
		display: table;
		table-layout: fixed;
		width: 100%;
		height: 100%;
		text-align: center;
		box-sizing: border-box;

		.layout {
			display: table-cell;
			vertical-align: middle;
			width: 100%;
			height: 100%;
		}
	}

	.logo {
		display: flex;
		align-items: center;
		justify-content: center;
		margin-top: 100rpx;
		margin-left: 50rpx;
		width: 300rpx;
		background-color: #fff;
		padding: 0 10rpx;
		border-radius: 10rpx;

		image {
			width: 100%;
			border-radius: 20rpx;
		}
	}
	.login-div{
	}
	.site {
		margin-top: 50rpx;
		margin-left: 50rpx;
		color: #fff;
		font-size: 40rpx;
		text-align: left;

		span,
		p {
			color: #fff;
		}

		p {
			margin-top: 10rpx;
			font-weight: 100;
			font-size: 30rpx;
		}
	}

	.main {
		position: relative;
		margin: 0 50rpx;
		padding-top: 50rpx;
	}

	.iform {
		text-align: left;

		.ipt {
			display: flex;
			align-items: center;
			margin-bottom: 20rpx;
			border-bottom: 1px solid #fff;
			padding: 30rpx;
			padding-left: 0rpx;
			padding-bottom: 10rpx;

			.lable {
				padding: 30rpx;
			}

			input {
				color: #fff;
				flex: 1;
				font-size: 28rpx;
			}

			.ph {
				color: #fff;
			}
		}

		.router {
			display: flex;
			align-items: center;
			justify-content: flex-start;
			margin-top: 30rpx;
			color: #E2F0FF;
		}

		.login {
			padding: 30rpx 0;
			margin: 60rpx 0 20rpx 0;
			border-radius: 50rpx;
			text-align: center;
			// background: linear-gradient(90deg, #2979ff, #2979ff);
			background: #fff;
			color: #099AFF;
			font-weight: bold;
			font-size: 30rpx;
		}

		.reg {
			padding: 30rpx 0;
			text-align: center;
			color: #fff;
			font-weight: bold;
			font-size: 30rpx;
		}
	}

	.other {
		margin-top: 50rpx;
		padding-bottom: 50rpx;

		.u-divider {
			margin-top: 0;
		}

		.btns {
			display: flex;
			align-items: center;
			justify-content: space-around;
			color: #A4E7FF;

			.icon {
				margin: 0 auto;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				border-radius: 50%;
				background: #ffffff;
				width: 64rpx;
				height: 64rpx;

				.iconxy {
					font-size: 60rpx;
				}
			}

			.name {
				padding-top: 10rpx;
				color: #fff;
			}
		}
	}
</style>