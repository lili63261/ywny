<template>
	<view class="show">
		<view class="title">{{ detail.noticeTitle}}</view>
		<view class="time">{{ detail.createTime }}</view>
		<view class="newShow">
			<mp-html :content="detail.noticeContent" />
		</view>
	</view>
</template>

<script>
	import { detailNotice } from '@/api/index.js'
	import mpHtml from 'mp-html/dist/uni-app/components/mp-html/mp-html'
	
	export default {
		components: {
			mpHtml,
		},
		data() {
			return {
				detail: {}
			}
		},
		onLoad(e) {
			this.getDetail(e.id)
		},
		methods: {
			// 新闻详情
			getDetail(noticeId) {
				detailNotice(noticeId).then((res) => {
					this.detail = res?.data
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
.show {
	padding: 20rpx;
	background-color: #fff;
}
.title {
	font-size: 32rpx;
	font-weight: bold;
}
.time {
	padding: 30rpx 0;
	text-align: right;
	color: #999;
}
.newShow {
	/deep/ {
		._root {
			font-size: 28rpx !important;
			text-align: left;
		}
		h1, h2, h3, h4, h5, h6 {
			font-size: 28rpx !important;
		}
		.ql-align-justify {
			text-indent: 2em;
		}
	}
}
</style>
