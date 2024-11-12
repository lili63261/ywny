import upload from '@/utils/upload'
import request from '@/utils/request'

// 用户密码重置
export function updateUserPwd(oldPassword, newPassword) {
  const data = {
    oldPassword,
    newPassword
  }
  return request({
    url: '/user/upPwd',
    method: 'post',
    data: data
  })
}

// 查询用户个人信息
export function getUserProfile() {
  return request({
    url: '/system/user/profile',
    method: 'get'
  })
}

// 获取下载地址
export function downUrl() {
  return request({
    url: '/apk/downUrl',
    method: 'get'
  })
}

// 打卡
export function signIn() {
  return request({
    url: '/user/signInx',
    method: 'get'
  })
}

// 是否打卡
export function ifSignIn() {
  return request({
    url: '/user/ifSignInx',
    method: 'get'
  })
}
// 是否签署保密协议
export function isOperation() {
  return request({
    url: '/user/operation',
    method: 'get'
  })
}

// 资金统计
export function total() {
  return request({
    url: '/user/total',
    method: 'get'
  })
}

// 修改用户个人信息
export function updateUserProfile(data) {
  return request({
    url: '/system/user/profile',
    method: 'put',
    data: data
  })
}

// 用户头像上传
export function uploadAvatar(data) {
  return upload({
    url: '/system/user/profile/avatar',
    name: data.name,
    filePath: data.filePath
  })
}

// 在线客服地址
export function csUrl() {
  return request({
    url: '/common/csUrl',
    method: 'get',
    headers: {
      isToken: false
    }
  })
}


// 团队佣金是否开启
export function teamAwardOpen() {
  return request({
    url: '/yanglao/teamAwardOpen',
    method: 'get'
  })
}


// 用户基本信息
export function userDetail() {
  return request({
    url: '/user/detail',
    method: 'get'
  })
}


// 业务登记
export function platformSign() {
  return request({
    url: '/user/platformSign',
    method: 'get'
  })
}

export function isReceive() {
  return request({
    url: '/user/isReceive',
    method: 'get'
  })
}