<template>
	<view class="ibg">
		<z-paging ref="paging" v-model="dataList" hide-no-more-inside @query="queryList">
			<view slot="top">
				<uni-nav-bar class="uniNavBar" title="我的团队" :border="false" color="#fff" backgroundColor="#ffffff00"
					left-icon="left" @clickLeft="$tab.navigateBack()" />
				<!-- 正式 -->
				<!-- #ifdef !IS-PORD -->
				<view class="head">
					<view class="teamMoney">
						<view class="name">
							团队佣金 (元)
						</view>
						<view class="num">
							<u-count-to :endVal="teamMoney" autoplay :decimals="2" color="#fff" />
						</view>
					</view>
					<view class="btn" @click="$tab.navTo('/pages/user/team/poster')">
						<view class="iconxy iconxy-dianzan"></view>
						<view class="txt">邀请好友</view>
						<u-icon name="arrow-right" color="#fff" />
					</view>
				</view>

				<view class="btns">
					<view class="btn" @click="onTake()">
						<view class="iconxy iconxy-tixianjilu"></view>
						<view>佣金提现</view>
					</view>
					<view class="btn" @click="$tab.navTo('/pages/user/log?type=teamAward')">
						<view class="iconxy iconxy-yundanmingxitongji"></view>
						<view>佣金明细</view>
					</view>
				</view>
				<!-- #endif -->

				<view class="iTab">
					<z-tabs :list="tabList" :current="tabCurrent" :bar-width="tabBarWidth" @change="changeTab" />
				</view>
			</view>

			<view class="list">
				<uni-list :border="true">
					<template v-for="(item, index) in dataList">
						<uni-list-chat :avatar-circle="true" :title="item.name"
							avatar="/static/images/icon/avatar.png"
							:note="item.phone">
							<view class="chat-custom-right">
								<text class="chat-custom-text unpass" v-if="item.name=='未实名'">未实名</text>
								<text class="chat-custom-text pass" v-else>已实名认证</text>
							</view>
						</uni-list-chat>
					</template>
				</uni-list>
			</view>

			<view slot="empty">
				<u-empty icon="/static/images/common/empty1.png" text="暂无数据" />
			</view>
		</z-paging>
	</view>
</template>

<script>
	import {
		total
	} from '@/api/system/user.js'
	import {
		myInviteList,
		inviteNum,
		receiveList
	} from '@/api/reward/reward.js'

	export default {
		data() {
			return {
				teamMoney: 0,
				regCount: 0,
				accCount: 0,
				tabList: [{
						name: '一级邀请'
					},
					{
						name: '二级邀请'
					},
					{
						name: '三级邀请'
					}
				],
				tabCurrent: 0,
				tabBarWidth: 0,
				dataList: []
			}
		},
		onReady() {
			this.$u.getRect('.iTab').then(res => {
				this.tabBarWidth = res.width / 3 - 20 + 'px'
			})
		},
		onShow() {
			this.getTotal()
			// this.getInviteNum()
		},
		methods: {
			onTake() {
				if (!this.isAcc) {
					this.checkAuth('acc')
					return false
				}

				if (!this.isAdr) {
					this.checkAuth('adr')
					return false
				}

				if (this.teamMoney <= 0) {
					this.$refs.uToast.error('暂无可提现佣金')
					return false
				}

				this.$tab.navTo('/pages/user/take?type=teamAward')
			},
			getInviteNum() {
				inviteNum().then(res => {
					this.regCount = res.data.inviteNum
					this.accCount = res.data.certificationNum
				})
			},
			// 资金统计
			getTotal() {
				total().then((res) => {
					this.teamMoney = res.data.teamAward
				})
			},
			changeTab(idx) {
				this.tabCurrent = idx
				this.$refs.paging.reload()
			},
			mock() {
				const list = [{
						name: "一级邀请人",
						phone: "12345678"
					},
					{
						name: '未实名',
						phone: "12345678"
					}
				]
				this.$refs.paging.complete(list)
			},
			async queryList(pageNo, pageSize) {
				this.$refs.uToast.loading('加载中...')

				// const params = {
				// 	pageNum: pageNo,
				// 	pageSize: pageSize,
				// 	type: this.tabCurrent + 1
				// }

				const res = await receiveList(this.tabCurrent + 1)

				const list = res.data
				this.$refs.paging.complete(list)

				this.$refs.uToast.hide()
			},
		}
	}
</script>

<style lang="scss" scoped>
	.ibg {
		min-height: 100vh;
		// background: url('/static/images/common/bg.png') top center no-repeat;
		// background-size: contain;

		.uniNavBar {
			background-image: linear-gradient(45deg, $btn-linear-gradient-color-1 0%, $btn-linear-gradient-color-2 100%);
			text-align: center;
			margin-bottom: 20rpx;
		}
	}

	.head {
		position: relative;
		margin: 0 16rpx 16rpx 16rpx;
		padding: 40rpx;
		border-radius: 16rpx;
		background: url('/static/images/common/tbg.jpg') center bottom no-repeat;
		background-size: cover;
		color: #fff;

		.teamMoney {
			.num {
				margin-top: 10rpx;

				.u-count-num {
					font-size: 60rpx !important;
				}
			}
		}

		.count {
			display: flex;
			align-items: center;
			margin-top: 40rpx;

			view {
				display: flex;
				align-items: center;

				&:first-child {
					margin-right: 40rpx;
				}

				.name {
					padding-right: 10rpx;
				}

				.u-count-num {
					font-size: 40rpx !important;
				}
			}
		}

		.btn {
			position: absolute;
			top: calc(50% - 30rpx);
			right: 0;
			display: flex;
			align-items: center;
			justify-content: center;
			padding: 0 20rpx 0 30rpx;
			height: 60rpx;
			line-height: 60rpx;
			border-radius: 30rpx 0 0 30rpx;
			background-image: linear-gradient(45deg, #2979ff 50%, #609cff 100%);

			.txt {
				margin: 0 10rpx;
			}
		}
	}

	.btns {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin: 20rpx;

		.btn {
			display: flex;
			align-items: center;
			justify-content: center;
			width: 45%;
			padding: 25rpx 0;
			text-align: center;
			border-radius: 30rpx;
			font-weight: bold;
			font-size: 30rpx;
			background-image: linear-gradient(45deg, #2979ff 50%, #609cff 100%);
			color: #fff;

			.iconxy {
				margin-right: 10rpx;
				font-size: 40rpx;
			}
		}
	}

	.iTab {
		margin: 0 20rpx;
		border-radius: 16rpx 16rpx 0 0;
		overflow: hidden;
	}

	.list {
		margin: 0 20rpx 20rpx 20rpx;
		padding-top: 20rpx;
		border-radius: 0 0 16rpx 16rpx;
		background: #fff;

		.item {
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 10rpx 40rpx;
			border-bottom: 1px solid #efefef;

			&:last-child {
				border-bottom: 0;
			}
		}

		.userinfo {
			.name {
				padding-bottom: 15rpx;
				font-size: 32rpx;
				font-weight: 500;
			}

			.phone {
				display: flex;
				align-items: center;

				.iconxy {
					padding-right: 6rpx;
					color: $pbc;
				}
			}
		}

		.acc {
			width: 140rpx;

			image {
				display: block;
				width: 100%;
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

			.chat-custom-text {
				font-size: 12px;
				color: #999;
			}
			.unpass{
				border:1px solid #f00;
				color:#f00;padding:0 10rpx;
				border-radius: 10rpx;
			}
			.pass{
				border:1px solid #55aa00;
				color:#55aa00;padding:0 10rpx;
				border-radius: 10rpx;
			}
		}

	}
</style>