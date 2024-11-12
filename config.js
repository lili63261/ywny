// 正式打包
const baseApiUrl = process.env.NODE_ENV === 'development' ? 'https://ywny.yanshizhan.icu' : ''

module.exports = {
	test: 1,
	baseUrl: baseApiUrl + '/prod-api',
	// 应用信息
	appInfo: {
		// 应用名称
		name: '中国央网农业',
		// 应用版本
		version: '1.0.0',
	},
};