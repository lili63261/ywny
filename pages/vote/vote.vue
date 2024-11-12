<template>
	<view class="ibg">
		<view class="container">
			<view class="title"></view>
			<view class="thead"></view>
			<view class="tbody"></view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			};
		}
	}
</script>

<style lang="scss" scoped>
	.ibg{
		background:#221c50;
	}
	.container{
		min-height: 100vh;
		background:url("/static/images/home/vote-bg.png") no-repeat;
		background-size: cover;
	}
</style>