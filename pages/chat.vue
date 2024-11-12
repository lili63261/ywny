<template>
	<view class="ibg">
		<view v-for="item in list" :key="item.noticeId" class="item">
			<mp-html :content="item.noticeContent" />
		</view>
	</view>
</template>

<script>
	import { listNotice } from '@/api/index.js'
	import mpHtml from 'mp-html/dist/uni-app/components/mp-html/mp-html'
	
	export default {
		components: {
			mpHtml
		},
		data() {
			return {
				list: []
			}
		},
		onLoad(e) {
			this.getList()
		},
		methods: {
			getList() {
				listNotice(3).then(res => {
					this.list = res.data
				})
			}
		}
	}
</script>

<style>
.ibg {
	margin: 20rpx;
	padding: 20rpx;
	border-radius: 16rpx;
	background: #fff;
	box-shadow: 0 0 10rpx rgba(0,0,0,.06);
	.item {
		border-bottom: 1px solid #eee;
		&:last-child{
			border: 0;
		}
	}
	img {
		display: block;
		margin: 0 auto;
	}
}
</style>
