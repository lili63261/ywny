<template>
	<view class="wrap">
		<template>
			<view class="wrapper">
				<view class="layout">
					<view class="logo">
						<image src="/static/images/common/logo.png" mode="widthFix"></image>
					</view>
					<uni-view class="site" style="color: #00548e;"><span>您好,</span>
						<p>欢迎来到中国央网农业</p>
					</uni-view>
					<view class="main">
						<view class="iform">
							<view class="ipt">
								<view class="lable">手机号码</view>
								<input v-model="registerForm.phone" type="number" maxlength="11" placeholder="请输入手机号码"
									placeholder-class="ph" />
							</view>
							<view class="ipt validate validateCode">
								<view class="lable">
									验&nbsp; 证 码
								</view>
								<input v-model="registerForm.code" type="text" placeholder="请输入验证码"
									placeholder-class="ph" />
								<image :src="codeUrl" mode="scaleToFill" @click="getCode()"></image>
								<view v-show="codeShow==false" class="codeShowView" @click="showCode()">点击获取验证码</view>
							</view>
							<view class="ipt password">
								<view class="lable">
									登录密码
								</view>
								<input type="password" v-model="registerForm.password" maxlength="18"
									placeholder="请输入登录密码" placeholder-class="ph" />
							</view>
							<view class="ipt password">
								<view class="lable">
									确认密码
								</view>
								<input type="password" v-model="registerForm.confirmPassword" maxlength="18"
									placeholder="请输入确认密码" placeholder-class="ph" />
							</view>
							<view class="ipt">
								<view class="lable">
									邀&nbsp; 请 码
								</view>
								<input v-model="registerForm.inviteCode" type="text" placeholder="请输入邀请码 ( 必填 )"
									placeholder-class="ph" />
							</view>
							<view class="protocol">
								<uni-icons :type="selected ? 'checkmarkempty' : 'smallcircle'" size="20"
									color="#fff" @click="selected = !selected">
								</uni-icons>
								<text>我已阅读并同意</text>
								<text @click="navTo('/pages/protocol')" class="active">《用户协议》</text>
							</view>
							<view class="reg" @click="handleRegister()">注 册</view>
							<view class="login" @click="navTo('/pages/login')">登 录</view>
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
		</template>
		<uni-popup ref="popup" background-color="transparent" :mask-click="false">
			<view class="popup-box shadow">
				<view class="popup-msg">恭喜注册完成，现在就去登录</view>
				<view class="popup-button">
					<view class="btn" @click="handleLogin()">确定</view>
				</view>
			</view>
		</uni-popup>

		<download-app ref="downloadApp" />
		<!-- 微信展示浏览器打开 -->
		<wxTip />
	</view>
</template>

<script>
	import {
		getCodeImg,
		register
	} from '@/api/login'
	import CcLoginTabs from "../uni_modules/cc-login-tabs/components/cc-login-tabs/cc-login-tabs.vue";
	import wxTip from "@/components/wxTip.vue"
	export default {
		components: {
			wxTip,
			CcLoginTabs
		},
		data() {
			return {
				isApp: false,
				iswx: false,
				selected: false,
				codeUrl: '',
				captchaEnabled: true,
				registerForm: {
					phone: '',
					password: '',
					confirmPassword: '',
					code: '',
					uuid: '',
					inviteCode: ''
				},
				tabArr: ["登录", "注册"],
				tabType: 1,
				codeShow: true
			}
		},
		created() {
			this.getCode()
		},
		onLoad(e) {
			this.isWx()
			this.initIsApp()
			if (e.inviteCode) {
				this.registerForm.inviteCode = e.inviteCode
			}
		},
		methods: {
			async handleRegister() {
				if (!this.selected) {
					return this.$refs.uToast.error("请先阅读并同意《用户协议》");
				}
				if (this.registerForm.phone === "") {
					this.$refs.uToast.error("请输入您的手机号");
				} else if (this.registerForm.phone.length !== 11) {
					this.$refs.uToast.error("请输入11位正确手机号");
				} else if (this.registerForm.password === "") {
					this.$refs.uToast.error("请输入您的密码");
				} else if (this.registerForm.confirmPassword === "") {
					this.$refs.uToast.error("请再次输入您的密码");
				} else if (this.registerForm.password !== this.registerForm.confirmPassword) {
					this.$refs.uToast.error("两次输入的密码不一致");
				} else if (this.registerForm.code === "" && this.captchaEnabled) {
					this.$refs.uToast.error("请输入验证码");
				} else if (this.registerForm.inviteCode === "") {
					this.$refs.uToast.error("请输入邀请码");
				} else {
					this.$refs.uToast.loading("注册中，请耐心等待...");
					this.register();
				}
			},
			async register() {
				register({
					phone: this.registerForm.phone,
					password: this.registerForm.password,
					inviteCode: this.registerForm.inviteCode,
					code: this.registerForm.code,
					uuid: this.registerForm.uuid,
					platform: uni.getSystemInfoSync().platform,
				}).then((res) => {
					this.$refs.uToast.show({
						type: 'success',
						message: "恭喜注册完成，正在前往登录",
						complete: () => {
							this.$tab.reLaunch('/pages/login')
						}
					})
				}).catch(() => {
					if (this.captchaEnabled) {
						this.getCode()
					}
				})
			},
			showCode() {
				this.codeShow = true
			},
			getCode() {
				getCodeImg().then((res) => {
					this.captchaEnabled = res.captchaEnabled === undefined ? true : res.captchaEnabled
					if (this.captchaEnabled) {
						this.codeUrl = 'data:image/gif;base64,' + res.img
						this.registerForm.uuid = res.uuid
					}
				})
			},
			handleLogin() {
				uni.redirectTo({
					url: `/pages/login`
				})
			},
			initIsApp() {
				let hostName = location.hostname
				// 判断域名内是否有app
				if (hostName.indexOf("app") > -1) {
					this.isApp = true
				} else {
					this.isApp = false
				}
			},
			navTo(url) {
				this.$tab.navigateTo(url)
			},
			isAndorid() {
				return uni.getSystemInfoSync().platform === 'android'
			},
			//判断是否为微信
			isWx() {
				if (!this.isAndorid()) {
					var ua = navigator.userAgent.toLowerCase();
					if (ua.match(/windowswechat/i) === 'windowswechat') {
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

			tabClick(type) {
				if (type == 0) {
					this.navTo('/pages/login')
				}
			}
		}
	}
</script>

<style lang="scss">
	@import "/static/font/iconxy.css";

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
		min-height: 100vh;
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
		color: #fff;
		.ipt {
			display: flex;
			align-items: center;
			margin-bottom: 20rpx;
			border-bottom: 1px solid #fff;
			padding: 30rpx;
			padding-left: 0rpx;
			padding-bottom: 10rpx;

			.lable {
				display: none;
				padding: 20rpx;
			}

			input {
				flex: 1;
				font-size: 28rpx;
			}

			.ph {
				color: #fff;
			}

			.validateCode {
				position: relative;
			}

			.codeShowView {
				position: absolute;
				z-index: 99;
				right: 20rpx;
				width: 200rpx;
				height: 70rpx;
				line-height: 70rpx;
				border-radius: 10rpx;
				background-color: #fff;
				color: #2979ff;
			}

			&.validate {
				position: relative;

				image {
					position: absolute;
					z-index: 9;
					right: 0rpx;
					bottom: 10rpx;
					width: 160rpx;
					height: 70rpx;
					border-radius: 10rpx;
				}
			}
		}

		.reg {
			padding: 30rpx 0;
			margin: 60rpx 0 30rpx 0;
			border-radius: 50rpx;
			text-align: center;
			// background: linear-gradient(90deg, #2979ff, #2979ff);
			background: #fff;
			color: #099AFF;
			font-weight: bold;
			font-size: 30rpx;
		}

		.login {
			padding: 30rpx 0;
			text-align: center;
			color: #fff;
			font-weight: bold;
			font-size: 30rpx;
			border:1px solid  #fff;
			border-radius: 50rpx;
		}

		.router {
			display: flex;
			align-items: center;
			justify-content: center;
			margin-top: 50rpx;
			color: #2979ff;
			text-align: center;
		}
	}

	.protocol {
		display: flex;
		align-items: center;
		align-items: center;
		justify-content: flex-start;
		color: #fff;
		font-size: 24rpx;

		.uni-icons {
			padding-right: 10rpx;
		}

		.active {
			margin: 0 10rpx;
			text-decoration: underline;
			color: #fff;
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

	.popup-box {
		background: rgba(255, 255, 255, .9);
		width: 640rpx;
		border-radius: 32rpx;

		.popup-header {
			padding-top: 52rpx;
			text-align: center;
			font-weight: bold;
			font-size: 32rpx;
		}

		.popup-msg {
			padding: 52rpx 0;
			text-align: center;
			color: #646566;
		}

		.popup-button {
			display: flex;
			align-items: center;
			justify-content: center;
			padding-bottom: 40rpx;

			.btn {
				width: 200rpx;
				height: 80rpx;
				line-height: 80rpx;
				border-radius: 40rpx;
				background-color: #2979ff;
				color: #fff;
				text-align: center;
			}
		}
	}
</style>