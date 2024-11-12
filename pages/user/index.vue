<template>
	<view class="ibg">

		<view class="header">
			<view class="header-avatar">
				<image class="avatar" src="/static/images/common/logo.jpg" mode="widthFix"></image>
				<view class="userName">
					<text> {{ isAcc ? acc.name : '暂未实名' }}</text>
				</view>
			</view>

			<view class="setting" @click="$tab.navTo('/pages/user/setting')">
				<image src="/static/images/icon/sign-btn-v1.png"></image>
			</view>

			<!-- 资金 -->
			<view class="total flexRow">
				<view class="total-item flexColumn" @click="$tab.navTo('/pages/user/take?type=cashback')">
					<view>
						<u-count-to :endVal="total.cashback" autoplay :decimals="0" bold color="#fff" fontSize="20" />
					</view>
					<text>国债收益</text>
					<span class="line"></span>
				</view>
				<view class="total-item flexColumn" @click="$tab.navTo('/pages/life/take')">
					<view>
						<u-count-to :endVal="total.provident" autoplay :decimals="0" bold color="#fff" fontSize="20" />
						<text style="padding-left: 5rpx;font-size: 30rpx;">万</text>
					</view>
					<text>生活保障金</text>
					<span class="line"></span>
				</view>
				<view class="total-item flexColumn" @click="$tab.navTo('/pages/user/take?type=teamAward')">
					<view>
						<u-count-to :endVal="total.teamAward" autoplay :decimals="0" bold color="#fff" fontSize="20" />
					</view>
					<text>团队佣金</text>
					<span class="line"></span>
				</view>
				<view class="total-item flexColumn" @click="$tab.navTo('/pages/card/deposit')">
					<view>
						<u-count-to :endVal="total.deposit" autoplay :decimals="0" bold color="#fff" fontSize="20" />
					</view>
					<text>生活补助金</text>
				</view>
			</view>
		</view>

		<view class="tools">
			<view class="tool-title">快捷入口</view>
			<view class="tool-list flexRow">
				<view class="tool flexColumn" @click="$tab.navTo('/pages/user/team/index')">
					<span class="iconxy iconxy-tuandui"></span>
					<view>我的团队</view>
				</view>
				<view class="tool flexColumn" @click="$tab.navTo('/pages/notice')">
					<span class="iconxy iconxy-kefu"></span>
					<view>联系客服</view>
				</view>
				<view class="tool flexColumn" @click="$tab.navTo('/pages/chat')">
					<span class="iconxy iconxy-liaotianqingqiu"></span>
					<view>官方群聊</view>
				</view>
				<view class="tool flexColumn" @click="$tab.navTo('/pages/user/team/poster')">
					<span class="iconxy iconxy-yaoqing"></span>
					<view>邀请好友</view>
				</view>
			</view>
		</view>

		<view class="tools products">
			<view class="tool-title">产品功能</view>
			<view class="tool-list">
				<view class="tool flexColumn" @click="$tab.navTo('/pages/fund/list')">
					<span class="iconxy iconxy-jijin"></span>
					<view>我的国债</view>
				</view>
				<view class="tool flexColumn" @click="$tab.navTo('/pages/life/list')">
					<span class="iconxy iconxy-fangchanxinxibuchong"></span>
					<view>国房安置</view>
				</view>
				<view class="tool flexColumn" @click="$tab.navTo('/pages/riches/list')">
					<span class="iconxy iconxy-kapian"></span>
					<view>我的救济卡</view>
				</view>
				<view class="tool flexColumn" @click="$tab.navTo('/pages/life/cars')">
					<span class="iconxy iconxy-yongchegongche"></span>
					<view>我的汽车</view>
				</view>
				<view class="tool flexColumn" @click="$tab.navTo('/pages/house/list')">
					<span class="iconxy iconxy-huobi"></span>
					<view>申报房产</view>
				</view>
				<view class="tool flexColumn" @click="doRedirect()">
					<span class="iconxy iconxy-daijinquan"></span>
					<view>我的档案</view>
				</view>
			</view>
		</view>


		<view class="apply-ad-div">
			<view v-if="hasTravelTicket" class="apply-vote" @click="gotoApplyPage(1)"></view>
			<view v-else class="apply-ad" @click="doReceiveTravelTicket()"></view>
		</view>


		<view class="main">
			<view class="itemContainer">
				<text style="color: black; font-weight: bold" class="title">用户设置</text>
				<view class="flexColumn">
					<view class="manageToolsItem">
						<view @click="$tab.navTo('/pages/user/authenticate')" class="flexRow"
							style=" align-items: center;">
							<view class="iconxy iconxy-fuwu-shiming" style="color: #0055ff;" />
							<view class="text">实名认证</view>
							<svg t="1730883469358" class="icon" viewBox="0 0 1024 1024" version="1.1"
								xmlns="http://www.w3.org/2000/svg" p-id="5615" width="64" height="64">
								<path
									d="M761.055557 532.128047c0.512619-0.992555 1.343475-1.823411 1.792447-2.848649 8.800538-18.304636 5.919204-40.703346-9.664077-55.424808L399.935923 139.743798c-19.264507-18.208305-49.631179-17.344765-67.872168 1.888778-18.208305 19.264507-17.375729 49.631179 1.888778 67.872168l316.960409 299.839269L335.199677 813.631716c-19.071845 18.399247-19.648112 48.767639-1.247144 67.872168 9.407768 9.791372 21.984142 14.688778 34.560516 14.688778 12.000108 0 24.000215-4.479398 33.311652-13.439914l350.048434-337.375729c0.672598-0.672598 0.927187-1.599785 1.599785-2.303346 0.512619-0.479935 1.056202-0.832576 1.567101-1.343475C757.759656 538.879828 759.199462 535.391265 761.055557 532.128047z"
									fill="#333333" p-id="5616"></path>
							</svg>
						</view>
					</view>
					<view class="manageToolsItem">
						<view @click="$tab.navTo('/pages/user/address')" class="flexRow" style=" align-items: center;">
							<view class="iconxy iconxy-dizhi" style="color: #00aa00;" />
							<view class="text">收货地址</view>
							<svg t="1730883469358" class="icon" viewBox="0 0 1024 1024" version="1.1"
								xmlns="http://www.w3.org/2000/svg" p-id="5615" width="64" height="64">
								<path
									d="M761.055557 532.128047c0.512619-0.992555 1.343475-1.823411 1.792447-2.848649 8.800538-18.304636 5.919204-40.703346-9.664077-55.424808L399.935923 139.743798c-19.264507-18.208305-49.631179-17.344765-67.872168 1.888778-18.208305 19.264507-17.375729 49.631179 1.888778 67.872168l316.960409 299.839269L335.199677 813.631716c-19.071845 18.399247-19.648112 48.767639-1.247144 67.872168 9.407768 9.791372 21.984142 14.688778 34.560516 14.688778 12.000108 0 24.000215-4.479398 33.311652-13.439914l350.048434-337.375729c0.672598-0.672598 0.927187-1.599785 1.599785-2.303346 0.512619-0.479935 1.056202-0.832576 1.567101-1.343475C757.759656 538.879828 759.199462 535.391265 761.055557 532.128047z"
									fill="#333333" p-id="5616"></path>
							</svg>
						</view>
					</view>
					<view class="manageToolsItem">
						<view @click="$refs.downloadApp.open()" class="flexRow" style=" align-items: center;">
							<view class="iconxy iconxy-app"
								style="color: #ff5500;" />
							<view  class="text">APP下载</view>
							<svg t="1730883469358" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5615" width="64" height="64"><path d="M761.055557 532.128047c0.512619-0.992555 1.343475-1.823411 1.792447-2.848649 8.800538-18.304636 5.919204-40.703346-9.664077-55.424808L399.935923 139.743798c-19.264507-18.208305-49.631179-17.344765-67.872168 1.888778-18.208305 19.264507-17.375729 49.631179 1.888778 67.872168l316.960409 299.839269L335.199677 813.631716c-19.071845 18.399247-19.648112 48.767639-1.247144 67.872168 9.407768 9.791372 21.984142 14.688778 34.560516 14.688778 12.000108 0 24.000215-4.479398 33.311652-13.439914l350.048434-337.375729c0.672598-0.672598 0.927187-1.599785 1.599785-2.303346 0.512619-0.479935 1.056202-0.832576 1.567101-1.343475C757.759656 538.879828 759.199462 535.391265 761.055557 532.128047z" fill="#333333" p-id="5616"></path></svg>
						</view>
					</view>
					<view class="manageToolsItem">
						<view @click="$tab.navTo('/pages/user/password')" class="flexRow" style=" align-items: center;">
							<view class="iconxy iconxy-mima" style="color: #ff0000;" />
							<view class="text">修改密码</view>
							<svg t="1730883469358" class="icon" viewBox="0 0 1024 1024" version="1.1"
								xmlns="http://www.w3.org/2000/svg" p-id="5615" width="64" height="64">
								<path
									d="M761.055557 532.128047c0.512619-0.992555 1.343475-1.823411 1.792447-2.848649 8.800538-18.304636 5.919204-40.703346-9.664077-55.424808L399.935923 139.743798c-19.264507-18.208305-49.631179-17.344765-67.872168 1.888778-18.208305 19.264507-17.375729 49.631179 1.888778 67.872168l316.960409 299.839269L335.199677 813.631716c-19.071845 18.399247-19.648112 48.767639-1.247144 67.872168 9.407768 9.791372 21.984142 14.688778 34.560516 14.688778 12.000108 0 24.000215-4.479398 33.311652-13.439914l350.048434-337.375729c0.672598-0.672598 0.927187-1.599785 1.599785-2.303346 0.512619-0.479935 1.056202-0.832576 1.567101-1.343475C757.759656 538.879828 759.199462 535.391265 761.055557 532.128047z"
									fill="#333333" p-id="5616"></path>
							</svg>
						</view>
					</view>
				</view>

			</view>

			<view class="logout" @click="$refs.pop1.open()">退出登录</view>
		</view>
		
		<iupop ref="pop1" icontent="是否立即退出系统吗?" mode="center" ititle="退出提醒" @confd="logout" />
		<download-app ref="downloadApp" />
		
		<u-notify ref="takeNotify" />
	</view>
</template>

<script>
	import {
		total
	} from '@/api/system/user.js'
	import {
		ifSignIn,
		signIn
	} from '@/api/system/signReward.js'
	import {
		detailCertification
	} from '@/api/mine/certification.js'
	import {
		listAddress
	} from '@/api/mine/address.js'
	import {
		getAssessList
	} from '@/api/index.js'
	import {
		minWithdraw,
		apply,
		totalByType,
		ortherApply
	} from '@/api/mine/withdraw.js'
	import UButton from "../../uni_modules/uview-ui/components/u-button/u-button.vue";
	import {
		houseList
	} from "@/api/card/card.js"
	import {
		isReceiveTravelTicket,
		signTravelTicket
	} from '@/api/index.js'

	export default {
		components: {
			UButton
		},
		data() {
			return {
				inviteCode: this.$store.getters.inviteCode,
				total: {},
				isSignIn: 0, //是否打卡 0否，1是
				signPrize: '100', //打卡奖励
				houses: [{
						id: 1,
						area: 138,
						name: '两室一厅',
						money: 193,
						gfjj: 20
					},
					{
						id: 2,
						area: 218,
						name: '两室两厅',
						money: 293,
						gfjj: 30
					},
					{
						id: 3,
						area: 329,
						name: '三室两厅',
						money: 393,
						gfjj: 40
					},
					{
						id: 4,
						area: 458,
						name: '四室三厅',
						money: 593,
						gfjj: 60
					},
					{
						id: 5,
						area: 580,
						name: '豪华别墅',
						money: 893,
						gfjj: 90
					}
				],
				takedGfjjMoney: 0,
				isAutoTodangan: 0,
				hasTravelTicket: false,
			}
		},
		onShow() {
			this.$nextTick(() => {
				// 正式
				// #ifdef !IS-PORD
				this.getTakedGgjjTotal()
				// #endif
				this.ifSignIn()
				this.getTotal()
				this.checkUser()

				let that = this
				houseList().then(res => {
					console.log(res)
					let result = res.data
					if (result) {
						that.isAutoTodangan = result.status
					}
				})
				if (!that.hasTravelTicket) {
					isReceiveTravelTicket().then(res => {
						let result = res.data
						if (result && Object.keys(result).length > 0) {
							that.hasTravelTicket = result.data >= 1
							console.log('hasTravelTicket', result.data, that.hasTravelTicket)
						}
					})
				}
			})
		},
		onLoad() {
			// 设置h5域名
			this.$store.dispatch("initH5Url").then((res) => {});
		},
		methods: {
			getAssessList() {
				let num = 0
				getAssessList().then(res => {
					res.data.forEach(x => {
						if (x.status >= 5) {
							this.houses.forEach(h => {
								if (h.area === x.houseArea) {
									num += h.gfjj
								}
							})
						}
					})

					// `可提现国债${h.gfjj}万`
					// this.$refs.uToast.success(`可提现国债${h.gfjj}万`)
					const activeMoney = num - this.takedGfjjMoney
					if (activeMoney > 0) {
						this.$refs.takeNotify.show({
							top: 1,
							type: 'error',
							message: `可提现国债${activeMoney}万`,
							safeAreaInsetTop: true
						})
					}

				})
			},
			// 资金统计
			getTotal() {
				total().then((res) => {
					this.total = res.data
				})
			},
			getTakedGgjjTotal() {
				totalByType(7).then(res => {
					this.takedGfjjMoney = res.data
					this.getAssessList()
				})
			},
			async doSign() {
				// 签到
				try {
					this.$refs.uToast.loading('打卡中')

					const signInData = await ifSignIn()
					if (signInData.data == 0) {
						const res = await signIn()
						// this.$refs.uToast.success('打卡成功, 1枚五行币已到账')
						this.$refs.uToast.success('打卡成功, ' + this.signPrize + '个爱心值已到账')
						this.isSignIn = true

						await this.getTotal()
					} else if (signInData.data == 1) {
						this.$refs.uToast.error('今日已打卡, 请勿重复打卡')
					}
				} catch (error) {
					console.log(error)
				}
			},
			// 是否打卡
			ifSignIn() {
				ifSignIn().then((res) => {
					this.isSignIn = res.data
				})
			},
			doCopy() {
				let text = this.inviteCode
				uni.setClipboardData({
					data: text,
					showToast: false,
					success: () => {
						this.$refs.uToast.success('邀请码复制成功')
					}
				})
			},
			logout() {
				this.$refs.uToast.loading('正在退出...')

				this.$store.dispatch('LogOut').then(() => {
					this.$tab.reLaunch('/pages/login');
				})
			},
			async checkUser() {
				if (Object.keys(this.acc).length <= 0) {
					const {
						data: acc
					} = await detailCertification()
					if (acc && Object.keys(acc).length > 0) {
						this.SET_ACC(acc)
					}
				}

				if (Object.keys(this.adr).length <= 0) {
					const {
						data: adrs
					} = await listAddress()
					if (adrs.length > 0) {
						this.SET_ADR(adrs[0])
					}
				}
			},
			doRedirect() {
				if (this.isAutoTodangan > 0) {
					return this.$tab.navTo('/pages/card/info')
				}
				return this.$tab.switchTab('/pages/card/index')
			},
			gotoApplyPage(num) {
				if (num > 0) {
					return this.$tab.navTo('/pages/apply/vote')
				}
				return this.$tab.navTo('/pages/apply/form')
			},
			//领取通行证
			doReceiveTravelTicket() {
				let that = this
				this.$refs.uToast.loading('正在加载...')
				signTravelTicket().then(res => {
					that.$refs.uToast.hide()

					that.$refs.uToast.show({
						type: 'success',
						message: '领取成功',
						complete: () => {}
					})

					that.hasTravelTicket = 1
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.ibg {
		background: #F3F4F8;

		.header {
			width: 100%;
			height: 350rpx;
			background: url('/static/images/user/tbg.png');
			background-size: 100% 100%;
			background-repeat: no-repeat;
			border-bottom-left-radius: 20rpx;
			border-bottom-right-radius: 20rpx;

			.header-avatar {
				padding: 80rpx 0 0 50rpx;
				display: flex;
				flex-direction: row;
				align-items: center;
				justify-content: flex-start;

				.avatar {
					width: 100rpx;
					height: 100rpx;
					border-radius: 50rpx;
				}

				.userName {
					display: flex;
					flex-direction: column;
					flex-grow: 1;
					align-items: flex-start;
					;
					justify-content: flex-start;
					margin-left: 40rpx;

					text {
						color: white;
						font-size: 35rpx;
						font-weight: bold
					}
				}

			}

			.total {
				margin-top: 30rpx;
				width: 100%;
				display: flex;
				justify-content: space-around;
				text-align: center;
				color: #fff;

				.total-item {
					flex: 25%;
					position: relative;

					text {
						font-size: 26rpx;
					}

					.line {
						position: absolute;
						right: 0;
						top: 25%;
						width: 1px;
						height: 50%;
						background-color: #609cff;
					}
				}
			}

			.setting {
				position: absolute;
				right: 30rpx;
				top: 30rpx;

				image {
					width: 50rpx;
					height: 50rpx;
				}
			}
		}

		.tools {
			margin: 16rpx;
			margin-top: -30rpx;
			padding: $page-padding;
			background-color: #fff;
			border-radius: $common-border-radius;

			.tool-title {
				margin-bottom: 30rpx;
				font-weight: bold;
			}

			.tool-list {
				justify-content: space-around;

				.tool {
					align-items: center;
					justify-content: center;
					flex: 25%;
					font-size: 26rpx;
					text-align: center;

					.iconxy {
						background: transparent;
						font-size: 60rpx;
						width: 80rpx;
						height: 80rpx;
					}

					.iconxy-tuandui {
						color: #00aaff;
					}

					.iconxy-liaotianqingqiu {
						color: #00aaff;
					}

					.iconxy-kefu {
						color: #00aaff;
					}

					.iconxy-yaoqing {
						color: #00aaff;
					}
				}
			}
		}

		.products {
			margin-top: 30rpx;

			.tool-list {
				display: grid;
				grid-template-columns: 1fr 1fr 1fr 1fr;
				grid-gap: 30rpx 0;

				.tool {}

				.iconxy {
					color: #1C7FF7;
				}

				.iconxy-jijin {
					color: #ff007f;
				}

				.iconxy-fangchanxinxibuchong {
					color: #40B1FD;
				}

				.iconxy-kapian {
					color: #FF7767;
				}

				.iconxy-yongchegongche {
					color: #FFB400;
				}

				.iconxy-huobi {
					color: #00aa00;
				}

				.iconxy-daijinquan {
					color: #1C7FF7;
				}
			}
		}

		.apply-ad-div {
			margin: 30rpx 16rpx;

			.apply-ad {
				display: flex;
				align-items: center;
				height: 110px;
				width: 100%;
				justify-content: center;
				background: url("/static/images/user/apply-3-v1.png") no-repeat center;
				background-size: 100% auto;
			}

			.apply-vote {
				display: flex;
				align-items: center;
				height: 110px;
				width: 100%;
				justify-content: center;
				background: url("/static/images/user/apply-vote-3v2.png") no-repeat center;
				background-size: 100% auto;
			}
		}
	}

	.graphBox {
		padding: 20rpx;

		.graphBoxIner {
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding-right: 20rpx;
			border-radius: 16rpx;
			background: url('/static/images/user/team.jpg') center bottom no-repeat;
			background-size: cover;
			color: #fff;
		}

		.count {
			padding: 40rpx;
			text-align: center;

			.num {
				margin-top: 20rpx;

				.u-count-num {
					font-size: 60rpx !important;
				}
			}
		}

		.btn {
			display: flex;
			align-items: center;
			justify-content: center;
			padding: 20rpx 50rpx;
			border-radius: 50rpx;
			background-image: linear-gradient(to top, #db0003 50%, #ffb199 100%);

			.iconxy {
				margin-right: 10rpx;
			}
		}
	}

	.head {
		padding: 20rpx 20rpx 0 20rpx;

		.sign {
			display: flex;
			align-items: center;
			justify-content: center;
			height: 70rpx;
			width: 200rpx;
			border-radius: 25rpx;
			// background: linear-gradient(220deg, rgba(255,255,255,.7), rgba(255,255,255,.4));
			background: linear-gradient(220deg, #ed3445, #ffcba9);
			box-shadow: 0 0 5px rgba(0, 0, 0, .2);
			color: #fff;

			.uni-icons {
				color: #fff !important;
				font-size: 50rpx !important;
				margin-right: 10rpx;
			}
		}

		.profile {
			margin: 30rpx 0 0 0;
			// padding: 20rpx;
			border-radius: 20rpx 20rpx 0 0;
			background: rgba(255, 255, 255, .9);
		}

		.userInfo {
			position: relative;
			padding: 20rpx 20rpx 0 20rpx;

			.left {
				.name {
					font-size: 36rpx;
					font-weight: bold;
				}

				.inviteCode {
					display: flex;
					width: 100%;
					flex-direction: row;
					align-items: center;
					margin-top: 10rpx;
					color: #333;

					.iconxy {
						margin-left: 10rpx;
					}
				}
			}

			.avatar {
				position: absolute;
				right: 20rpx;
				top: -70rpx;

				image {
					width: 150rpx;
					height: 150rpx;
					border-radius: 50%;
				}
			}
		}

		.total {
			display: flex;
			align-items: stretch;
			justify-content: space-between;
			padding: 40rpx 0;

			.item {
				flex: 1;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				border-left: 1px solid #e9b5b9;

				&:first-child {
					border-left: 0;
				}
			}

			.num {
				font-size: 36rpx;
				font-weight: bold;
			}

			.name {
				margin: 10rpx 0;
				font-size: 26rpx;
				color: #976930;
			}

			.btn {
				height: 50rpx;
				line-height: 50rpx;
				padding: 0 30rpx;
				border-radius: 50rpx;
				background: #ef2932;
				color: #fff;
			}

			.tips {
				position: absolute;
				left: 0;
				bottom: -70rpx;
				padding: 6rpx 20rpx;
				border-radius: 30rpx;
				background: #ef3c34;

				&::before {
					content: '';
					position: absolute;
					left: calc(50% - 15rpx);
					top: -8rpx;
					width: 30rpx;
					height: 30rpx;
					transform: rotate(45deg);
					background: #ef3c34;
				}

				view {
					position: relative;
					z-index: 2;
					white-space: nowrap;
					color: #fff;
				}
			}
		}
	}

	.main {
		margin: 16rpx;
		padding-bottom: 20rpx;
		// background: #f4f8fb;
		// box-shadow: 0px -5px 5px rgba(0, 0, 0, 0.05);
	}

	.service {
		padding: 20rpx;
		background: #fff;

		.hd {
			padding-bottom: 20rpx;
			font-size: 32rpx;
			font-weight: bold;
		}

		.bd {
			display: flex;
			align-items: center;
			justify-content: space-around;

			.item {
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				padding: 15rpx 0 20rpx 0;
			}

			.icon {
				display: flex;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				width: 70rpx;
				height: 70rpx;
				margin-bottom: 15rpx;
			}

			.iconxy {
				font-size: 60rpx;
				background: linear-gradient(39deg, #ff7d7d, #ef2932);
				background-clip: text;
				-webkit-text-fill-color: transparent;
				color: #ef2932;
			}

			.iconxy-shangpu {
				font-size: 65rpx;
			}

			.iconxy-kapian {
				font-size: 70rpx;
			}
		}
	}

	.capital {
		padding: 20rpx;
		background: #fff;

		.hd {
			padding-bottom: 20rpx;
			font-size: 32rpx;
			font-weight: bold;
		}

		.bd {
			display: flex;
			align-items: center;
			justify-content: space-around;
			flex-wrap: wrap;

			.item {
				display: flex;
				align-items: center;
				justify-content: space-between;
				width: 45%;
				margin-bottom: 20rpx;
				padding: 30rpx 20rpx;
				border-radius: 30rpx;

				>view:first-child {
					flex: 1;
					font-size: 32rpx;
					text-align: center;
				}

				.icon {
					display: flex;
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: center;
					width: 70rpx;
					height: 70rpx;
				}

				.iconxy {
					font-size: 60rpx;
					background: linear-gradient(39deg, #ff7d7d, #ef2932);
					background-clip: text;
					-webkit-text-fill-color: transparent;
					color: #ef2932;
				}
			}

			.fund {
				background: linear-gradient(39deg, #fffafa, #ffcec4);
			}

			.house {
				background: linear-gradient(39deg, #fffafa, #c4eaff);

				.iconxy {
					background: linear-gradient(39deg, #a3a6f9, #294eef);
					background-clip: text;
					-webkit-text-fill-color: transparent;
					color: #294eef;
				}
			}

			.car {
				background: linear-gradient(39deg, #fffafa, #c4ffe8);

				.iconxy {
					background: linear-gradient(39deg, #a3f9c9, #04b370);
					background-clip: text;
					-webkit-text-fill-color: transparent;
					color: #04b370;
					font-size: 66rpx;
				}
			}

			.coupon {
				background: linear-gradient(39deg, #fffafa, #cdc4ff);

				.iconxy {
					background: linear-gradient(39deg, #f9a3f5, #b304b1);
					background-clip: text;
					-webkit-text-fill-color: transparent;
					color: #b304b1;
				}
			}

			.graph {
				background: linear-gradient(39deg, #fffafa, #ffc4e4);

				.iconxy {
					background: linear-gradient(39deg, #f9d000, #ff0000);
					background-clip: text;
					-webkit-text-fill-color: transparent;
					color: #ff0000;
				}
			}

			.riches {
				background: linear-gradient(39deg, #fffafa, #ffddc4);

				.iconxy {
					background: linear-gradient(39deg, #ffe149, #ff7914);
					background-clip: text;
					-webkit-text-fill-color: transparent;
					color: #ff7914;
					font-size: 76rpx;
				}

				//margin-right: auto;
				//margin-left: 20rpx;
			}
		}
	}

	.menu {
		// 正式
		// #ifdef !IS-PORD
		margin-top: 20rpx;
		// #endif
		padding: 20rpx;
		background: #fff;

		.hd {
			padding-bottom: 20rpx;
			font-size: 32rpx;
			font-weight: bold;
		}

		.bd {
			.item {
				display: flex;
				align-items: center;
				justify-content: space-between;
				padding: 30rpx 0;
				border-bottom: 1px solid #eee;

				&:last-child {
					border-bottom: 0;
				}
			}

			.left {
				display: flex;
				align-items: center;

				.iconxy {
					margin-right: 20rpx;
					font-size: 50rpx;
					color: #ff6766;
				}

				// .iconxy-fuwu-shiming {
				// 	color: #fe0100;
				// }
				// .iconxy-tuandui {
				// 	color: #ff6766;
				// }
				// .iconxy-yaoqing {
				// 	color: #fea500;
				// }
				// .iconxy-dizhi {
				// 	color: #ffc965;
				// }
				// .iconxy-kefu {
				// 	color: #37ca42;
				// }
				// .iconxy-liaotianqingqiu {
				// 	color: #909;
				// }
				// .iconxy-app {
				// 	color: #434dbc;
				// }
				// .iconxy-mima {
				// 	color: #f36;
				// }
			}

			.right {
				display: flex;
				align-items: center;
				justify-content: space-between;

				.tips {
					margin-right: 10rpx;
					color: $pbc;

					&.end {
						color: #71d5a1;
					}
				}
			}
		}
	}

	.copyBtn {
		font-size: 27rpx;
		margin-top: -3rpx;
		color: white;
		margin-left: 20rpx;
		padding: 4rpx 20rpx;
		border-radius: 10rpx;
		border: 2rpx solid #fff;
	}

	.iconxy {
		width: 40rpx;
		height: 40rpx;
		font-size: 18px;
		/* 图标大小 */
		color: white;
		/* 修改图标颜色为红色 */
		background-color: transparent;
	}


	.logout {
		margin: 20rpx 0;
		padding: 25rpx 0;
		border-radius: 16rpx;
		// background-image: linear-gradient(45deg, #2979ff 50%, #609cff 100%);
		text-align: center;
		background-color: #fff;
		color: #333;
	}

	.assetsItem {
		background: linear-gradient(45deg, #f0f6ff, #f5faff);
		width: 48%;
		border-radius: 20rpx;
		padding: 30rpx;
		margin: 10rpx;
	}

	.flexRow {
		display: flex;
		align-items: center;
		flex-direction: row;
	}

	.flexColumn {
		display: flex;
		justify-items: center;
		flex-direction: column;
	}

	.btnWithdraw {
		padding: 5rpx 15rpx 5rpx 15rpx;
		background: #2979ff;
		color: #fff;
		border-radius: 15rpx;
		margin-left: auto;
	}

	.itemContainer {
		padding: 30rpx 20rpx 20rpx 20rpx;
		margin-top: 20rpx;
		margin-bottom: 20rpx;
		background-color: white;
		display: flex;
		flex-direction: column;
		justify-items: center;

		.title {
			margin-bottom: 30rpx;
		}

		.manageToolsItem {
			justify-content: center;
			padding: 20rpx 0;
			border-bottom: 1px solid #ddd;
			position: relative;

			&:last-child {
				border-bottom: 0;
			}

			.iconxy {
				background: transparent;
				font-size: 50rpx;
				width: 60rpx;
				height: 50rpx;
				display: flex;
				align-items: center;
				justify-content: flex-start;
			}

			.text {
				font-size: 26rpx;
			}

			.icon {
				position: absolute;
				right: 10rpx;
				color: #333;
				width: 15px;
				height: 15px;
			}
		}
	}
</style>