<template>
	<view class="view-modal" v-if="showSheetView" :class="[modalAnimation?'ani_start':'ani_end']">
		<view class="sheet-view" :class="[modalAnimation?'ani-top':'ani-btm']">
<!-- 			<view class="head-view">
				<view class="cancel-view" @click="cancelAction">
					<text>取消</text>
				</view>
				<view class="title-view">
					<text>{{sheetTitle}}</text>
				</view>
				<view class="ok-view" @click="okAction">
					<text>确定</text>
				</view>
			</view> -->
			<scroll-view scroll-y="true" class="scroll-view">
				<view class="cell-row" :class="[alignment==='left'?'align-left':alignment==='right'?'align-right':'']"
					v-for="(item,index) in dataList" :key="index" @click.stop="didSelectedRow(index)">
					<image v-if="item[`${iconKey}`]" class="cell-icon" :src="item[`${iconKey}`]"></image>
					<text class="cell-label"
						:class="[index===selectIndex?'hilight-label':'',item[`${iconKey}`]?'':'cell-lb-pad']">{{item[`${titleKey}`]}}</text>
					<image v-if="displayCheckedIcon && index===selectIndex" class="cell-check-icon"
						:src="'data:image/png;base64,' + checkIconData"></image>
				</view>
			</scroll-view>
			<view class="foot-view">
				<text>取消</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				viewTitle: null,
				selectIndex: 0,
				dataList: [],
				modalAnimation: false,
				checkIconData: ''
			};
		},
		props: {
			showSheetView: {
				type: Boolean,
				default: false
			},
			optionsList: {
				type: Array,
				default: []
			},
			titleKey: {
				type: String,
				default: ""
			},
			iconKey: {
				type: String,
				default: ""
			},
			defaultIndex: {
				type: Number,
				default: 0
			},
			sheetTitle: {
				type: String,
				default: "请选择"
			},
			alignment: {
				type: String,
				default: "center"
			},
			displayCheckedIcon: {
				type: Boolean,
				default: false
			},
			autoConfirm: {
				type: Boolean,
				default: true
			},
		},
		created() {
			this.viewTitle = this.sheetTitle
			this.selectIndex = this.defaultIndex
			this.dataList = this.optionsList

			let icon =
				'iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAAAchJREFUeF7tmUFywjAMReXQi+QkDceCLgqLwrHgJrkIE3fClA5DE5AcyZJrsXZivecvOwkBKv+FyvnBBXgCKjfgLVB5AHwT9BbwFqjcgLdA5QHwU8BbwFugcgP/ogWar34HAT4jwHkVYH/ZtGfsuhYvIBz6UwDo7oGHbYvmQg/EGs05bgp+nL8JsMamoFgBc/BVCHgGDxH2w0e7wyaxuARwwo+SihLADV+UAAn4YgRIwRchQBKeLODt2HfY8xW7Cz8bJw2PFjCCDxFOv8USj5oUGTng0QImixGUkAseLaA59HFyFQUk5ITHC/h525KWkBseLeA6cOKti3NPkL7/3D5EehKUKlLqvpjNlyRAIgma8KQWuLfJVTTXfTArzdICnBIswCcn4CYiFSL1uiUrzZ6AVAmW4BcngCrBGjybAMzpEAO8P3695XyOSG0P8jGY/PY2d6HA4zRFBquAl0l4rEwZnrUF0EfkbaABeDEBL5NgBF5UwKwEQ/DiAv5IMAafRcA4yfWT2gAd5R8byk6+ZCz7KbCkGI1rXYCGdUtzegIsrYZGLZ4ADeuW5vQEWFoNjVo8ARrWLc3pCbC0Ghq1eAI0rFuas/oEfAN/0AhQ3IEvrwAAAABJRU5ErkJggg=='

			this.checkIconData = icon.replace(/[\r\n]/g, "");
		},
		computed: {},
		watch: {
			showSheetView: {
				handler: function(flag) {
					this.modalAnimation = flag
					this.dataList = this.optionsList
				},
				immediate: true
			}
		},
		methods: {
			cancelAction: function() {
				this.modalAnimation = false
				let self = this
				setTimeout(() => {
					// self.showSheetView = false
					self.$emit('onSelected', {
						'cancel': true
					})
				}, 350);
			},
			okAction: function() {
				this.modalAnimation = false
				let data = this.dataList[this.selectIndex]
				let self = this
				setTimeout(() => {
					// self.showSheetView = false
					self.$emit('onSelected', {
						data: data,
						'cancel': false,
						'confirm': true
					})
				}, 350);
			},
			didSelectedRow(row) {
				this.selectIndex = row
				if (this.autoConfirm) {
					this.okAction()
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.scroll-view {
		width: 100%;
		// height: 540upx;

		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: center;
	}

	.cell-row {
		width: 100%;
		height: 88upx;
		border-bottom: 1px solid #eee;
		padding: 0upx 20upx;

		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
	}

	.cell-icon {
		width: 40upx;
		height: 40upx;
	}

	.cell-check-icon {
		position: absolute;
		right: 30upx;
		width: 40upx;
		height: 40upx;
	}

	.cell-label {
		padding: 0upx 50upx 0upx 20upx;
		font-size: 14px;
		color: #333333;

		display: inline-block;
		overflow: hidden !important;
		text-overflow: ellipsis !important;
		white-space: nowrap !important;
		line-clamp: 1 !important;
	}

	.cell-lb-pad {
		padding: 0upx 50upx;
	}

	.hilight-label {
		color: #0286df;
	}

	.align-left {
		justify-content: flex-start;
	}

	.align-right {
		justify-content: flex-end;
	}

	.ani_start {
		animation: animationShow 0.4s;
	}

	.ani_end {
		animation: animationHide 0.4s;
	}

	@keyframes animationShow {
		from {
			background-color: rgba(0, 0, 0, 0);
			opacity: 0;
		}

		to {
			background-color: rgba(0, 0, 0, 0.2);
			opacity: 1;
		}
	}

	@keyframes animationHide {
		from {
			background-color: rgba(0, 0, 0, 0.2);
			opacity: 1;
		}

		to {
			background-color: rgba(0, 0, 0, 0);
			opacity: 0;
		}
	}

	@keyframes slideBottom {
		0% {
			transform: translateY(100%)
		}

		100% {
			transform: translateY(0)
		}
	}


	.view-modal {
		position: fixed;
		top: calc(var(--status-bar-height) + 44px);
		// bottom: 0;
		height: calc(100% - var(--status-bar-height) - 44px);
		width: 100%;
		z-index: 1;

		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: center;
		background-color: rgba(0, 0, 0, 0.2);
	}

	.ani-btm {
		transform: translateY(640upx);
	}

	.ani-top {
		animation: slideBottom 0.4s;
	}


	.sheet-view {
		position: absolute;
		bottom: 0upx;
		height: 640upx;
		width: 100%;
		transition: all 0.25s;
		background-color: white;

		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: center;
	}

	.head-view {
		position: relative;
		width: calc(100% - 70upx);
		height: 100upx;

		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}
	
	.foot-view {
		position: relative;
		width: calc(100% - 70upx);
		height: 100upx;
		
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}

	.cancel-view {
		position: relative;
		width: 124upx;
		height: 100%;

		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;

		text {
			position: relative;
			width: 100%;
			font-size: 32upx;
			color: #333333;

			text-align: left;
		}
	}

	.title-view {
		position: relative;
		height: 100%;

		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;

		text {
			position: relative;
			width: 100%;
			font-size: 30upx;
			color: #999999;

			text-align: left;
		}
	}

	.ok-view {
		position: relative;
		width: 124upx;
		height: 100%;

		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;

		text {
			position: relative;
			width: 100%;
			font-size: 32upx;
			color: #2197FF;

			text-align: right;
		}
	}

	.mid-view {
		position: relative;
		width: 100%;
		height: 106upx;

		border-bottom: 1upx solid rgb(235, 235, 235);
		border-top: 1upx solid rgb(235, 235, 235);
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
	}

	.btn-view {
		position: relative;
		width: 50%;
		height: 100%;

		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
	}

	.tt-view {
		position: relative;
		width: 100%;
		height: 100%;

		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.normal-text {
		position: relative;
		width: 100%;
		font-size: 32upx;
		color: #555555;
		text-align: center;
	}

	.hili-text {
		position: relative;
		width: 100%;
		font-size: 32upx;
		color: #2197FF;
		text-align: center;
	}

	.active {
		background-color: white;
	}

	.non-active {
		background-color: rgb(245, 245, 245);
	}
</style>