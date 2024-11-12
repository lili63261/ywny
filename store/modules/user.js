import config from '@/config'
import storage from '@/utils/storage'
import constant from '@/utils/constant'
import { login, logout, getInfo, getH5Url } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'

const baseUrl = config.baseUrl

const user = {
	state: {
		token: getToken(),
		inviteCode: storage.get(constant.inviteCode),
		H5Url: storage.get(constant.H5Url),
		phone: storage.get(constant.phone),
		name: storage.get(constant.name),
		certificationImg: '',
		acc: storage.get(constant.acc) || {},
		adr: storage.get(constant.adr) || {}
	},

	mutations: {
		SET_TOKEN: (state, token) => {
			state.token = token
		},
		SET_INVITECODE: (state, inviteCode) => {
			state.inviteCode = inviteCode
			storage.set(constant.inviteCode, inviteCode)
		},
		SET_H5URL: (state, H5Url) => {
			state.H5Url = H5Url
			// console.log("H5Url",H5Url)
			storage.set(constant.H5Url, H5Url)
		},
		SET_PHONE: (state, phone) => {
			state.phone = phone
			storage.set(constant.phone, phone)
		},
		SET_NAME: (state, name) => {
			state.name = name
			storage.set(constant.name, name)
		},
		SET_CERTIFICATIONIMG(state, certificationImg) {
			state.certificationImg = certificationImg
		},
		SET_ACC: (state, acc) => {
			state.acc = acc
			storage.set(constant.acc, acc)
		},
		SET_ADR: (state, adr) => {
			state.adr = adr
			storage.set(constant.adr, adr)
		}
	},
	// 操作异步操作mutation
	actions: {
		// 登录
		Login({ commit }, userInfo) {
			const username = userInfo.phone.trim()
			const password = userInfo.password
			return new Promise((resolve, reject) => {
				login(username, password).then(res => {
					setToken(res.data)
					commit('SET_TOKEN', res.data)
					resolve()
				}).catch(error => {
					reject(error)
				})
			})
		},
		
		//获取h5地址
		initH5Url({ commit, state }){
			return new Promise((resolve, reject) => {
				try{
					getH5Url().then(result=>{
						console.log("result",result.Url)
						result && commit('SET_H5URL', result.Url || '')
						resolve(result)
					})
				}catch(error){
					reject(error)
				}
			})
		},

		// 获取用户信息
		GetInfo({ commit, state }) {
			return new Promise((resolve, reject) => {
				getInfo().then(res => {
					const user = res.data
					commit('SET_INVITECODE', user.inviteCode)
					commit('SET_PHONE', user.phone)
					commit('SET_NAME', user.name)
					resolve(res)
				}).catch(error => {
					reject(error)
				})
			})
		},
		
		// 退出系统
		LogOut({ commit, state }) {
			return new Promise((resolve, reject) => {
				logout(state.token).then(() => {
					commit('SET_TOKEN', '')
					commit('SET_INVITECODE', '')
					commit('SET_ACC', {})
					commit('SET_ADR', {})
					removeToken()
					storage.clean()
					resolve()
				}).catch(error => {
					reject(error)
				})
			})
		}
	}
}

export default user