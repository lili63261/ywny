<template>
	<view class="ibg">
		<view class="container">
			<uni-nav-bar class="uniNavBar" :border="false" title="实名认证" color="#333" backgroundColor="#ffffff"
				left-icon="left" @clickLeft="$tab.navigateBack()" />
			<view class="hd tip flexRow">
				<view class="tag"></view>
				<view>请您使用有效身份证信息认证</view>
			</view>
			<view class="head">
				<view class="title">亲爱的用户</view>
				<view class="desc">中国央网农业将依法保护您的隐私与安全</view>
			</view>
		</view>
		<view class="main">
			<view class="bd">
				<view class="iform" v-if="isShowAuth">
					<uni-forms ref="valiForm" :rules="rules" :model="valiFormData" label-align="left" border>
						<uni-forms-item label="真实姓名" required name="name" class="item">
							<uni-easyinput placeholderStyle="font-size: 28rpx;" primaryColor="#ef2932"
								:inputBorder="false" :maxlength="40" type="text" v-model="valiFormData.name"
								placeholder="请输入真实姓名" />
						</uni-forms-item>
						<uni-forms-item label="身份证号" required name="idCard" class="item">
							<uni-easyinput placeholderStyle="font-size: 28rpx;" primaryColor="#ef2932"
								:inputBorder="false" :maxlength="18" type="idcard" v-model="valiFormData.idCard"
								placeholder="请输入身份证号" />
						</uni-forms-item>
						<uni-forms-item label="开  户  行" required name="bankName" class="item">
							<uni-easyinput placeholderStyle="font-size: 28rpx;" primaryColor="#ef2932"
								:inputBorder="false" v-model="valiFormData.bankName" placeholder="请输入开户行" />
						</uni-forms-item>
						<uni-forms-item label="银行卡号" required name="bankNo" class="item">
							<uni-easyinput placeholderStyle="font-size: 28rpx;" primaryColor="#ef2932"
								:inputBorder="false" :maxlength="19" type="number" v-model="valiFormData.bankNo"
								placeholder="请输入银行卡号" />
						</uni-forms-item>
					</uni-forms>
				</view>
				<view v-else class="showformInfo">
					<view class="msg flexColumn">
						<image src="/static/images/user/pass.png" mode="widthFix"></image>
						<text>账号已实名</text>
					</view>
					<view class="info">
						<view class="li">
							<span>真实姓名</span>
							<span class="v">{{ valiFormData.name }}</span>
						</view>
						<view class="li">
							<span>身份证号</span>
							<span class="v">{{ valiFormData.idCard }}</span>
						</view>
						<view class="li">
							<span>开  户  行</span>
							<span class="v">{{ valiFormData.bankName }}</span>
						</view>
						<view class="li">
							<span>银行卡号</span>
							<span class="v">{{ valiFormData.bankNo }}</span>
						</view>
					</view>
				</view>
			</view>
		</view>

		<view v-if="isShowAuth" class="btn submit-btn" @click="submit('valiForm')">
			<view class="iconxy iconxy-baocun"></view>
			<view>确定</view>
		</view>
		
		<view class="tipText">若需要修改实名信息，请联系在线客服</view>
		<!-- <view v-else class="btn submit-btn orange-btn" @click="isShowAuth=true">
			<view>更新实名信息</view>
		</view> -->
	</view>
</template>

<script>
	import {
		addCertification,
		editCertification,
		detailCertification
	} from '@/api/mine/certification.js'

	export default {
		data() {
			return {
				isShowAuth:false,
				valiFormData: {
					bankNo: ''
				},
				rules: {
					name: {
						rules: [{
							required: true,
							errorMessage: "真实姓名不能为空",
						}, ],
					},
					idCard: {
						rules: [{
							required: true,
							errorMessage: "身份证号不能为空",
						}, ],
					},
					bankName: {
						rules: [{
							required: true,
							errorMessage: "开户行不能为空",
						}, ],
					},
					bankNo: {
						rules: [{
							required: true,
							errorMessage: "银行卡号不能为空",
						}, ],
					},
				}
			}
		},
		onShow() {
			if (this.isAcc) {
				this.valiFormData = this.acc
				this.isShowAuth = false
			}
			else{
				this.isShowAuth = true
			}
		},
		methods: {
			// 表单提交
			submit(ref) {
				this.$refs[ref].validate().then(res => {
					if (this.valiFormData.id) {
						this.$refs.uToast.error('若需修改实名认证信息请联系在线客服')

						// editCertification(this.valiFormData).then((resp) => {
						// 	this.SET_ACC({})

						// 	this.$refs.uToast.show({
						// 		type: 'success',
						// 		message: '修改成功',
						// 		complete: () => {
						// 			this.$tab.switchTab('/pages/user/index')
						// 		}
						// 	})
						// })
					} else {
						addCertification(this.valiFormData).then((resp) => {
							this.SET_ACC({})

							this.$refs.uToast.show({
								type: 'success',
								message: '提交成功',
								complete: () => {
									this.$tab.switchTab('/pages/user/index')
								}
							})
						})
					}
				}).catch((err) => {
					console.log(err)
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	::v-deep {
		.is-required {
			opacity: 0;
		}

		.uni-forms-item__label {
			width: 150rpx !important;
		}

		.uni-forms-item--border {
			border: 0;
		}
	}

	.ibg {
		position: relative;
		min-height: 100vh;
		background: $default-color;

		.container {
			position: relative;
			background: linear-gradient(45deg, #E1E5EA, #fff 20%, #D0E5FC 60%);

			&::before {
				content: '';
				position: absolute;
				right: 20rpx;
				top: 50%;
				width: 300rpx;
				height: 180rpx;
				background: url('/static/images/user/authenticate.png') right center no-repeat;
				background-size: contain;
			}
		}

		.tip {
			margin: $page-padding;
			background-color: #fff;
			padding: 20rpx;
			border-radius: 30rpx;

			.tag {
				width: 30rpx;
				height: 30rpx;
				background: url("/static/images/user/tag.png") no-repeat;
				background-size: 100%;
				margin-right: 10rpx;
			}
		}
	}

	.head {
		padding: 80rpx 0 80rpx 40rpx;
		color: #333;

		.title {
			font-size: 36rpx;
			font-weight: 500;
		}

		.desc {
			margin-top: 20rpx;
			font-size: 26rpx;
			width: 50%;
		}
	}

	.main {
		position: relative;
		z-index: 2;
		margin: $page-padding;
		margin-top: -50rpx;
		border-radius: $common-border-radius;

		// box-shadow: 0 0 6px 0px rgba(0,0,0,.17);
		.hd {
			display: flex;
			align-items: center;
			padding: 30rpx;
			background: #fff;
			// background: linear-gradient(45deg, #dae8ff, #d3d7ff);
			font-weight: 500;

			.iconxy {
				color: orange;
				margin-right: 10rpx;
			}
		}

		.bd {
			border-radius: $common-border-radius $common-border-radius;
			background: #fff;
			padding-top: 0;

			.item {
				padding-left: 20rpx;
				padding-right: 20rpx;
				border-bottom: 1px solid #ddd;

				&:last-child {
					border-bottom: 0;
				}
			}
		}
		
		.showformInfo{
			padding-bottom: 20rpx;
			.msg{
				padding: 60rpx;
				align-items: center;
				image{
					width:100rpx;
				}
				text{
					margin-top:20rpx;
					font-weight: bold;
				}
			}
			.info{
				background-color: #F8F9FA;
				margin: 20rpx;
				padding: 20rpx;
				font-size: 26rpx;
				.li{
					margin-bottom: 30rpx;
					span{
						color:#666;
					}
					.v{
						margin-left: 30rpx;
						color:#000;
					}
				}
			}
		}
	}

	.submit-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		margin: $page-padding;
		margin-top: 100rpx;
		padding: 25rpx 0;
		border-radius: 60rpx;
		font-weight: 500;
		font-size: 30rpx;
		background-image: linear-gradient(45deg, $btn-linear-gradient-color-1 0%, $btn-linear-gradient-color-2 100%);
		text-align: center;
		color: #fff;

		.iconxy {
			margin-right: 10rpx;
			font-size: 0rpx;
			font-weight: normal;
		}
	}
	.orange-btn{
		background-image: linear-gradient(45deg, $btn-linear-gradient-orange-color-1 0%, $btn-linear-gradient-orange-color-2 100%);
	}
	.tipText{
		margin: 30rpx;
		color:#999;
		text-align: center;
		font-size: 26rpx;
	}
</style>