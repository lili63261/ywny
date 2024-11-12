<template>
	<view class="ibg">
		<uni-nav-bar class="uniNavBar" title="收货地址" :border="false" color="#ffffff" backgroundColor="#ffffff00" left-icon="left"
			@clickLeft="$tab.navigateBack()" />
		<view class="main">
			<view class="bd">
				<view class="iform">
					<uni-forms ref="valiForm" :rules="rules" :model="valiFormData" label-align="left" border>
						<uni-forms-item label="收货人" required name="name" class="formItem">
							<uni-easyinput placeholderStyle="font-size: 28rpx;" primaryColor="#ef2932"
								:maxlength="6" type="text"	:inputBorder="false" v-model="valiFormData.name" placeholder="请输入收货人姓名" />
						</uni-forms-item>
						<uni-forms-item label="手机号码" required name="phone" class="formItem">
							<uni-easyinput placeholderStyle="font-size: 28rpx;" primaryColor="#ef2932"
								:maxlength="11" type="tel"	:inputBorder="false" v-model="valiFormData.phone" placeholder="请输入收货人手机号码" />
						</uni-forms-item>
						<uni-forms-item label="所在地区" required name="province" class="formItem">
							<view class="formRegions">
								<pick-regions :defaultRegion="this.valiFormData.region" @getRegion="handleGetRegion">
									<view v-if="regionName" class="default">
										<view>{{ regionName }}</view>
										<view class="uni-icons content-clear-icon uniui-clear" @click.stop="clearRegions">
										</view>
									</view>
									<view v-else class="null">请选择收货地址</view>
								</pick-regions>
								<svg t="1730883469358" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5615" width="64" height="64"><path d="M761.055557 532.128047c0.512619-0.992555 1.343475-1.823411 1.792447-2.848649 8.800538-18.304636 5.919204-40.703346-9.664077-55.424808L399.935923 139.743798c-19.264507-18.208305-49.631179-17.344765-67.872168 1.888778-18.208305 19.264507-17.375729 49.631179 1.888778 67.872168l316.960409 299.839269L335.199677 813.631716c-19.071845 18.399247-19.648112 48.767639-1.247144 67.872168 9.407768 9.791372 21.984142 14.688778 34.560516 14.688778 12.000108 0 24.000215-4.479398 33.311652-13.439914l350.048434-337.375729c0.672598-0.672598 0.927187-1.599785 1.599785-2.303346 0.512619-0.479935 1.056202-0.832576 1.567101-1.343475C757.759656 538.879828 759.199462 535.391265 761.055557 532.128047z" fill="#333333" p-id="5616"></path></svg>
							</view>
						</uni-forms-item>
						<uni-forms-item label="详细地址" required name="address" class="formItem">
							<uni-easyinput placeholderStyle="font-size: 28rpx;"	:inputBorder="false" primaryColor="#ef2932"
								v-model="valiFormData.address" placeholder="街道, 门牌号等" />
						</uni-forms-item>
					</uni-forms>
				</view>
			</view>
			<view class="address-tip flexRow">
				<view class="text">
					<p>默认地址</p>
					<span>提醒:若存在产品发货，则默认使用该地址</span>
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
import { addAddressn, editAddress, detailAddress, listAddress } from '@/api/mine/address.js'
	
export default {
	computed: {
		regionName() {
			if (this.valiFormData.provinceCityRegion) {
				return this.valiFormData.provinceCityRegion
			}
			// 转为字符串
			return this.regionArr.map((item) => item.name).join(" ")
		}
	},
	data() {
		return {
			isDefault:true,
			valiFormData: {
				province: "",
				region: "",
			},
			regionArr: [],
			rules: {
				name: {
					rules: [{
						required: true,
						errorMessage: "收货人姓名不能为空",
					}]
				},
				phone: {
					rules: [
						{ required: true, errorMessage: "收货人电话不能为空" },
						{ format: "number", errorMessage: "收货人电话只能输入数字" },
						{ pattern: /^1(3|4|5|6|7|8|9)\d{9}$/, errorMessage: "手机号格式错误", trigger: "blur" }
					],
				},
				province: {
					rules: [{ required: true, errorMessage: "请选择收货地址" }]
				},
				address: {
					rules: [{ required: true, errorMessage: "详细地址不能为空" }]
				}
			}
		}
	},
	onShow() {
		if (this.isAdr) {
			this.valiFormData = this.adr
		}
	},
	methods: {
		asyncChange(e){
			this.isDefault = e
		},
		// 表单提交
		submit(ref) {
			this.$refs[ref].validate().then(res => {
				this.valiFormData.isDefault = 1
				this.valiFormData.provinceCityRegion = this.regionName
				
				if (this.valiFormData.id) {
					editAddress(this.valiFormData).then((res) => {
						this.SET_ADR({})
						this.$refs.uToast.show({
							type: 'success',
							message: '修改成功',
							complete: () => {
								this.$tab.switchTab('/pages/user/index')
							}
						})
					})
				} else {
					addAddressn(this.valiFormData).then((res) => {
						this.SET_ADR({})
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
		},
		// 获取选择的地区
		handleGetRegion(region) {
			this.valiFormData.province = region[0].code
			this.valiFormData.city = region[1].code
			this.valiFormData.region = region[2].code
			this.regionArr = region
			this.valiFormData.provinceCityRegion = ''
		},
		clearRegions(event) {
			event.stopPropagation()
			this.regionArr = []
			this.valiFormData.region = ''
			this.valiFormData.province = ''
			this.valiFormData.provinceCityRegion = ''
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
	border-radius: 4px;
	position:relative;
	.null {
		font-size: 28rpx;
		color: #999;
	}
	
	.icon {
		display: flex;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width: 30rpx;
		height: 30rpx;
		position: absolute;right:15rpx;top:50%;margin-top:-16rpx;
	}
}

.ibg {
	position: relative;
	min-height: 100vh;
	background: $default-color;
	.uniNavBar{
		background-image: linear-gradient(45deg, $btn-linear-gradient-color-1 0%, $btn-linear-gradient-color-2 100%);text-align: center;
	}
}
.main {
	margin-top:0;
	border-radius: $common-border-radius;
	
	.bd {
		border-radius: 0 0 16rpx 16rpx;
		background: #fff;
		padding-top: 0;
		.formItem{
			border-bottom: 1px solid #ddd;
			padding-left:20rpx;
			&:last-child{
				border: 0;
			}
		}
	}
	.address-tip{
		justify-content: space-between;
		background-color: #fff;
		
		margin-top:30rpx;
		padding:30rpx 20rpx;
		.text{
			p{
				font-size:28rpx;
				margin-bottom: 10rpx;
			}
			span{
				font-size:26rpx;
				color:#999;
			}
		}
	}
	.btn {
		display: flex;
		align-items: center;
		justify-content: center;
		// margin: 20rpx 0;
		// margin-top: 100rpx;
		position: absolute;bottom:60rpx;left:30rpx;;width:calc(100% - 60rpx);
		padding: 25rpx 0;
		border-radius: 60rpx;
		font-weight: 500;
		font-size: 30rpx;
		// background-image: linear-gradient(45deg, #2979ff 50%, #609cff 100%);
		background-image: linear-gradient(45deg, $btn-linear-gradient-color-1 0%, $btn-linear-gradient-color-2 100%);text-align: center;
		color: #fff;
		.iconxy {
			margin-right: 10rpx;
			font-size: 0rpx;
			font-weight: normal;
		}
	}
}
</style>