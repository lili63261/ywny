<script>
	import config from './config';
	import { getToken } from '@/utils/auth';

	export default {
		globalData: {
			platform: '',
		},
		onLaunch: function(e) {
			let platform = uni.getSystemInfoSync().platform;
			this.globalData.platform = platform;
			this.initApp(e);
		},
		onShow() {},
		methods: {
			// 初始化应用
			initApp(e) {
				// 初始化应用配置
				this.initConfig();
				// 检查用户登录状态
				//#ifdef H5
				this.checkLogin(e);
				//#endif
				
				// #ifdef IS-PORD
					uni.setTabBarItem({
						index: 2,
						visible: false
					})
					uni.setTabBarItem({
						index: 3,
						visible: false
					})
					uni.setTabBarItem({
						index: 4,
						visible: false
					})
				// #endif
				
				// #ifdef !IS-PORD
					uni.setTabBarItem({
						index: 5,
						visible: false
					})
				// #endif
			},
			initConfig() {
				this.globalData.config = config
			},
			checkLogin(e) {
				if (e.query != null && e.query.inviteCode != null) {
					this.$tab.reLaunch('/pages/register?inviteCode=' + e.query.inviteCode);
				} else {
					// 把这里屏蔽一下 H5就不校验登陆
					if (!getToken()) {
						this.$tab.reLaunch('/pages/login');
					}
				}
			},
		},
	};
</script>

<style lang="scss">
	@import './uni.scss';
	@import '@/static/scss/index.scss';
	@import "@/uni_modules/uview-ui/index.scss";
	::v-deep {
		.u-toast__content {
			max-width: 95vw !important;
			.u-toast__content__text {
				max-width: 90vw !important;
			}
		}
	}
</style>