<template>
	<view class="ibg">
		<uni-nav-bar class="uniNavBar" title="修改密码" :border="false" color="#fff" backgroundColor="#ffffff00"
			left-icon="left" @clickLeft="$tab.navigateBack()" />
		<view class="main">
			<view class="bd">
				<view class="iform">
					<uni-forms ref="valiForm" :rules="rules" :model="valiFormData" label-align="left" border>
						<uni-forms-item label="旧 密 码" required name="oldPassword" class="formitem">
							<uni-easyinput placeholderStyle="font-size: 28rpx;" primaryColor="#ef2932" :maxlength="11"
								type="text" v-model="valiFormData.oldPassword"	:inputBorder="false" placeholder="请输入旧密码" />
						</uni-forms-item>
						<div class="tip">请输入之前正确使用的密码</div>
						<div class="formitem">
						<uni-forms-item label="新 密 码" required name="newPassword" class="border-bt">
							<uni-easyinput placeholderStyle="font-size: 28rpx;" primaryColor="#ef2932" :maxlength="11"
								type="tel" v-model="valiFormData.newPassword"	:inputBorder="false" placeholder="请输入新密码" />
						</uni-forms-item>
						<uni-forms-item label="确认新密码" required name="confirmPassword">
							<uni-easyinput placeholderStyle="font-size: 28rpx;" primaryColor="#ef2932" :maxlength="11"
								type="tel" v-model="valiFormData.confirmPassword"	:inputBorder="false" placeholder="请输入确认新密码" />
						</uni-forms-item>
						</div>
						<div class="tip">请重复输入两次相同的密码</div>
					</uni-forms>
				</view>
			</view>
			<view class="btn" @click="submit('valiForm')">
				<view class="iconxy iconxy-baocun"></view>
				<view>确定</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		updateUserPwd
	} from '@/api/system/user'

	export default {
		data() {
			return {
				valiFormData: {
					oldPassword: undefined,
					newPassword: undefined,
					confirmPassword: undefined
				},
				rules: {
					oldPassword: {
						rules: [{
							required: true,
							errorMessage: "旧密码不能为空",
						}, ],
					},
					newPassword: {
						rules: [{
								required: true,
								errorMessage: "新密码不能为空",
							},
							{
								minLength: 6,
								maxLength: 20,
								errorMessage: "长度在 6 到 20 个字符",
							},
						],
					},
					confirmPassword: {
						rules: [{
								required: true,
								errorMessage: "确认密码不能为空",
							},
							{
								validateFunction: (rule, value, data) => data.newPassword === value,
								errorMessage: "两次输入的密码不一致",
							},
						],
					}
				}
			}
		},
		onReady() {
			this.$refs.valiForm.setRules(this.rules);
		},
		methods: {
			// 表单提交
			submit(ref) {
				this.$refs[ref].validate().then(res => {
					updateUserPwd(this.valiFormData.oldPassword, this.valiFormData.newPassword).then((
					response) => {
						this.$refs.uToast.show({
							type: 'success',
							message: '修改成功',
							complete: () => {
								this.$tab.switchTab('/pages/user/index')
							}
						})
					})
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
			width: 180rpx !important;
		}

		.uni-forms-item--border {
			border: 0;
		}
	}

	.formRegions {
		padding-left: 20rpx;
		line-height: 35px;
		height: 35px;
		border: 1px solid #dcdfe6;
		border-radius: 4px;

		.null {
			font-size: 28rpx;
			color: #999;
		}
	}

	.ibg {
		position: relative;
		min-height: 100vh;
		background: $default-color;
		.uniNavBar{
			background-image: linear-gradient(45deg, $btn-linear-gradient-color-1 0%, $btn-linear-gradient-color-2 100%);
			text-align: center;
		}
	}

	.head {
		padding: 80rpx 0 80rpx 40rpx;
		color: #fff;

		.title {
			font-size: 40rpx;
			font-weight: 500;
		}

		.desc {
			margin-top: 20rpx;
			font-size: 32rpx;
		}
	}

	.main {
		// position: relative;
		z-index: 2;
		margin: $page-padding;
		margin-top: 0;
		border-radius: $common-border-radius;

		.bd {
			margin-top:$page-padding;
			.formitem{
				background-color: #fff;
				border-radius: 16rpx;
				padding-left:$page-padding;
			}
			.border-bt{
				border-bottom: 1px solid #ddd;
			}
			.tip{
				font-size:26rpx;
				color:#999;
				margin:$page-padding 0;
				padding-left:$page-padding;
				position: relative;
				&:before{
					position: absolute;
					left:0;top:10rpx;
					content:"";
					display: block;
					width:6px;height:6px;
					background-color: orange;
					border-radius: 5px;
				}
			}
		}

		.btn {
			display: flex;
			align-items: center;
			justify-content: center;
			// margin: 20rpx 0;
			// margin-top: 100rpx;
			position: absolute;bottom:60rpx;width:calc(100% - 60rpx);
			padding: 25rpx 0;
			border-radius: 60rpx;
			font-weight: 500;
			font-size: 30rpx;
			// background-image: linear-gradient(45deg, #2979ff 50%, #609cff 100%);
			background-image: linear-gradient(45deg, $btn-linear-gradient-color-1 0%, $btn-linear-gradient-color-2 100%);text-align: center;
			text-align: center;
			color: #fff;

			.iconxy {
				margin-right: 10rpx;
				font-size: 0rpx;
				font-weight: normal;
			}
		}
	}
</style>