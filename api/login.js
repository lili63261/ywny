import request from '@/utils/request'
import config from '@/config';

// 登录方法
export function login(phone, password) {

	const data = {
		phone,
		password
	}
	return request({
		'url': '/login',
		headers: {
			isToken: false
		},
		'method': 'post',
		'data': data
	})
}

// 注册方法
export function register(data) {
	return request({
		url: '/register',
		headers: {
			isToken: false
		},
		method: 'post',
		data: data
	})
}

// 获取用户详细信息
export function getInfo() {
	return request({
		'url': '/user/detail',
		'method': 'get'
	})
}

// 退出方法
export function logout() {
	return request({
		'url': '/logout',
		'method': 'post'
	})
}

// 获取验证码
export function getCodeImg() {
	return request({
		'url': '/captchaImage',
		headers: {
			isToken: false
		},
		method: 'get',
		timeout: 20000
	})
}

// 忘记密码
export function forgetPwd(data) {
	return request({
		url: '/findPwd',
		headers: {
			isToken: false
		},
		method: 'post',
		data: data
	})
}

// 登录方法
export function getH5Url() {
	return request({
		"baseUrl": config.baseUrl.replace("/prod-api", '/djson.json'),
		headers: {
			isToken: false
		},
		'method': 'get',
	})
}