<template>
	<view class="wrap">
		<!-- 微信展示浏览器打开 -->
		<view v-if="iswx" class="wxPop">
			<view class="iconfont icon-dajiantou arrow"></view>
			<view class="popText"><text class="num">1</text>点击右上角的<text class="iconfont icon-gengduo"></text>按钮</view>
			<view class="popText"><text class="num">2</text>选择<text class="iconfont icon-liulangqi"></text>浏览器中打开</view>
		</view>
		<template v-else>
			<view class="wrapper">
				<view class="layout">
					<view class="logo">
						<image src="/static/images/common/logo1.png" mode="widthFix"></image>
					</view>
					<!-- <view class="site">
						应用描述
					</view> -->
					<view class="main">
						<view class="iform">
							<view class="ipt">
								<view class="lable">手机号码</view>
								<input 
									v-model="registerForm.phone" 
									type="number" 
									maxlength="11" 
									placeholder="请输入手机号码"
									placeholder-class="ph" />
							</view>
							<view class="ipt password">
								<view class="lable">
									登录密码
								</view>
								<input 
									type="password"
									v-model="registerForm.password" 
									maxlength="18" 
									placeholder="请输入登录密码" 
									placeholder-class="ph" />
							</view>
							<view class="ipt password">
								<view class="lable">
									确认密码
								</view>
								<input 
									type="password"
									v-model="registerForm.confirmPassword"
									maxlength="18" 
									placeholder="请输入确认密码" 
									placeholder-class="ph" />
							</view>
							<view class="ipt validate">
								<view class="lable">
									验&nbsp; 证 码
								</view>
								<input 
									v-model="registerForm.code" 
									type="text" 
									placeholder="请输入验证码" 
									placeholder-class="ph" />
								<image :src="codeUrl" mode="scaleToFill" ></image>
							</view>
							<view class="ipt">
								<view class="lable">
									邀&nbsp; 请 码
								</view>
								<input 
									v-model="registerForm.inviteCode" 
									type="text" 
									placeholder="请输入邀请码 ( 必填 )" 
									placeholder-class="ph" />
							</view>
							<view class="protocol">
								<uni-icons 
									:type="selected ? 'smallcircle' : 'smallcircle-filled'" 
									size="20" color="#feedbb" 
									@click="selected = !selected">
								</uni-icons>
								<text>我已阅读并同意</text>
								<text @click="navTo('/pages/protocol')" class="active">《中国央网农业用户协议》</text>
							</view>
							<view class="reg" @click="handleRegister()">立 即 注 册</view>
							<view class="login" @click="navTo('/pages/login')">前 往 登 录</view>
						</view>
						<view class="other">
							<u-divider text="快捷入口" textColor="#fff" lineColor="#fff"></u-divider>
							<view class="btns">
								<view class="btn" @click="$tab.navigateTo('/pages/common/online')">
									<view class="icon">
										<view class="iconxy iconxy-kefu"></view>
									</view>
									<view class="name">客服</view>
								</view>
								<view class="btn" @click="$refs.downloadApp.open()">
									<view class="icon">
										<view class="iconxy iconxy-app"></view>
									</view>
									<view class="name">APP</view>
								</view>
								<view class="btn" @click="$tab.navigateTo('/pages/chat')">
									<view class="icon">
										<view class="iconxy iconxy-liaotianqingqiu"></view>
									</view>
									<view class="name">群聊</view>
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
	</view>
</template>

<script>
	import { getCodeImg, register } from '@/api/login'

	export default {
		data() {
			return {
				isApp: false,
				iswx: false,
				selected: true,
				codeUrl: '',
				captchaEnabled: true,
				registerForm: {
					phone: '',
					password: '',
					confirmPassword: '',
					code: '',
					uuid: '',
					inviteCode: ''
				}
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
					return this.$refs.uToast.error("请先阅读并同意《云数新时代用户协议》");
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
			getCode() {
				getCodeImg().then((res) => {
					this.captchaEnabled = res.captchaEnabled === undefined ? true : res.captchaEnabled
					if (this.captchaEnabled) {
						this.codeUrl = 'data:image/gif;base64,' + res.img
						this.registerForm.uuid = res.uuid
					}
				})
			},
			handleLogin(){
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
			}
		}
	}
</script>

<style lang="scss">
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
				background: #ef2932;
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

	.wrap {
		width: 100%;
		min-height: 100vh;
		background: url('/static/images/common/bg.jpg') center no-repeat;
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
		margin: 20rpx auto;
		width: 400rpx;
		image {
			width: 100%;
		}
	}
	
	.site {
		color: #fff;
		font-size: 40rpx;
		font-weight: bold;
	}
	
	.main {
		position: relative;
		margin: 0 50rpx;
		padding-top: 20rpx;
	}

	.iform {
		text-align: left;
		.ipt {
			display: flex;
			align-items: center;
			margin-bottom: 20rpx;
			border-bottom: 1px solid #efefef;
			border-radius: 20rpx;
			background: #fff;
			.lable {
				padding: 30rpx;
			}
			input {
				flex: 1;
				font-size: 28rpx;
			}
			
			.ph {
				color: #666;
			}
			
			&.validate {
				position: relative;
				image {
					position: absolute;
					right: 20rpx;
					width: 160rpx;
					height: 70rpx;
					border-radius: 10rpx;
				}
			}
		}

		.reg {
			padding: 30rpx 0;
			margin: 40rpx 0 0 0;
			border-radius: 20rpx;
			text-align: center;
			background: linear-gradient(90deg, #feedbb, #fffdee);
			color: #ef2932;
			font-weight: bold;
			font-size: 30rpx;
		}
		
		.login {
			padding: 30rpx 0;
			text-align: center;
			color: #feedbb;
			font-weight: bold;
			font-size: 30rpx;
		}

		.router {
			display: flex;
			align-items: center;
			justify-content: center;
			margin-top: 50rpx;
			color: #ef2932;
			text-align: center;
		}
	}
	
	.protocol {
		display: flex;
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
			color: #feedbb;
		}
	}

	.other {
		// margin-top: 50rpx;
		padding-bottom: 50rpx;
		.u-divider {
			margin-top: 0;
		}
		.btns {
			display: flex;
			align-items: center;
			justify-content: space-around;
			color: #ef2932;
			.icon {
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				border-radius: 50%;
				background: #fff;
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
	
	.popup-box{
		background: rgba(255,255,255,.9);
		width: 640rpx;
		border-radius: 32rpx;
		.popup-header{
			padding-top: 52rpx;
			text-align: center;
			font-weight: bold;
			font-size: 32rpx;
		}
		.popup-msg{
			padding: 52rpx 0;
			text-align: center;
			color: #646566;
		}
		.popup-button{
			display: flex;
			align-items: center;
			justify-content: center;
			padding-bottom: 40rpx;
			.btn {
				width: 200rpx;
				height: 80rpx;
				line-height: 80rpx;
				border-radius: 40rpx;
				background-color: #ef2932;
				color: #fff;
				text-align: center;
			}
		}
	}
</style>
