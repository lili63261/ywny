import { mapMutations, mapGetters } from 'vuex'
import { detailCertification } from '@/api/mine/certification.js'
import { listAddress } from '@/api/mine/address.js'

// 导出 mixin 对象
export default {
	computed: {
		...mapGetters(['acc', 'adr']),
		checkWhite() {
			// 页面白名单
			const whiteList = [
				'/pages/home',
				'/pages/login',
				'/pages/register',
				'/pages/protocol',
				'/pages/common/online',
				'/pages/common/defray',
				'/pages/chat',
				'/pages/user/authenticate',
				'/pages/user/setting',
				'/pages/user/address',
				'/pages/user/index'
			]
			
			// 获取当前打开过的页面路由数组
			let pages = getCurrentPages()
			if (pages.length > 0) {
				 // 获取当前页面路由，也就是最后一个打开的页面路由
				let path = '/' + pages[pages.length - 1].route
				return whiteList.indexOf(path) !== -1
			}
			return true
		},
		isAcc() {
			return Object.keys(this.acc).length > 0
		},
		isAdr() {
			return Object.keys(this.adr).length > 0
		}
	},
	data() {
		return {}
	},
	onLoad() {
		this.frontGetProfile()
	},
	onShow() {
		uni.$on('fronted', (type) => {
			this.checkAuth(type)
		})
	},
	onUnload() {
		uni.$off('fronted')
	},
	methods: {
		...mapMutations(['SET_ACC', 'SET_ADR']),
		async frontGetProfile() {
			// 排除白名单
			if (!this.checkWhite) {
				// 若无数据 检测收货地址并赋值到store
				if (Object.keys(this.adr).length <= 0) {
					const { data: adrs } = await listAddress()
					if (adrs.length > 0) {
						this.SET_ADR(adrs[0])
					} else {
						uni.$emit('fronted', 'adr')
					}
				}

				// 若无数据 检测实名并赋值到store
				if (Object.keys(this.acc).length <= 0) {
					const { data: acc } = await detailCertification()
					if (acc && Object.keys(acc).length > 0) {
						this.SET_ACC(acc)
					} else {
						uni.$emit('fronted', 'acc')
					}
				}
			}
		},
		checkAuth(type, msg = '') {
			const pagePath = type === 'acc' ? '/pages/user/authenticate' : '/pages/user/address'
			let message = ''
			if (msg) {
				message = msg
			} else {
				message = type === 'acc' ? '请先完成实名认证才可操作' : '请先添加收货地址才可操作'
			}
			
			this.$refs.uToast.show({
				type: 'error',
				message: message,
				complete: () => {
					this.$tab.redirectTo(pagePath)
				}
			})
		}
	}
}