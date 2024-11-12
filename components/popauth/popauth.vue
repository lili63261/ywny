<template>
	<view v-if="isShow">
		公共
	</view>
</template>

<script>
	export default {
		name: 'pop-auth',
		data() {
			return {
				isShow: false
			}
		},
		methods: {
			show() {
				// this.isShow = true
				console.log(1111);
			}
		}
	}
</script>

<style lang="scss" scoped>

</style>