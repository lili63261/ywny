import store from '@/store';
import config from '@/config';
import { getToken } from '@/utils/auth';
import errorCode from '@/utils/errorCode';
import { toast, showConfirm, tansParams } from '@/utils/common';

let timeout = 10000;

// const baseUrl = process.env.NODE_ENV === 'development' ? config.baseUrl : '/prod-api';
const baseUrl = config.baseUrl

const request = (config) => {
	// 是否需要设置 token
	const isToken = (config.headers || {}).isToken === false;
	config.header = config.header || {};
	config.header['platform'] = getApp().globalData.platform; //请求来源,app或者h5
	if (getToken() && !isToken) {
		config.header['Authorization'] = 'Bearer ' + getToken();
	}
	// get请求映射params参数
	if (config.params) {
		let url = config.url + '?' + tansParams(config.params);
		url = url.slice(0, -1);
		config.url = url;
	}
	return new Promise((resolve, reject) => {
		uni.request({
				method: config.method || 'get',
				timeout: config.timeout || timeout,
				url: config.baseUrl || baseUrl + config.url,
				data: config.data,
				header: config.header,
				dataType: 'json',
			}).then((response) => {
				let [error, res] = response;
				if (error) {
					toast('亲~您的网络开小差了，请稍后刷新试试~');
					reject(error);
					return;
				}
				const code = res.data.code || 200;
				const msg = errorCode[code] || res.data.msg || errorCode['default']
				// console.log('code', code);
				if (code === 401) {
					showConfirm('登录已过期，请重新登录?').then((res) => {
						if (res.confirm) {
							store.dispatch('LogOut').then((res) => {
								uni.reLaunch({
									url: '/pages/login/index'
								});
							});
						}
					});
					reject('会话已过期，请重新登录');
				} else if (code === 500) {
					toast(msg);
					reject('500');
				} else if (code !== 200) {
					toast(msg);
					reject(code);
				}
				resolve(res.data);
			}).catch((error) => {
				let { message } = error;
				if (message === 'Network Error') {
					message = '系统接口请求超时,请稍后再试';
				} else if (message.includes('timeout')) {
					message = '系统接口请求超时,请稍后再试';
				} else if (message.includes('Request failed with status code')) {
					message = '系统接口' + message.substr(message.length - 3) + '异常';
				}
				toast('亲~您的网络开小差了，请稍后刷新试试~');
				reject(message);
			});
	});
};

export default request;