import request from '@/utils/request'

// 奖励列表
export function signReward() {
  return request({
    url: '/signReward/list',
    method: 'get'
  })
}
// 是否打卡
export function ifSignIn() {
  return request({
    url: '/signReward/ifSignIn',
    method: 'get'
  })
}

// 是否打卡
export function signIn() {
  return request({
    url: `/signReward/signIn`,
    method: 'get'
  })
}


export function recordList() {
  return request({
    url: `/signReward/recordList`,
    method: 'get'
  })
}

export function signDay() {
  return request({
    url: `/signReward/signDay`,
    method: 'get'
  })
}