import request from '@/utils/request'

// 用户邀请人数
export function inviteNum(noticeId) {
  return request({
    url: '/reward/inviteNum',
    method: 'get',
  })
}

// 团长奖励列表
export function listReward(noticeId) {
  return request({
    url: '/reward/list',
    method: 'get',
  })
}

// 领取团长奖励
export function receive(id) {
  return request({
    url: '/reward/receive/'+id,
    method: 'get',
  })
}

// 我的邀请列表
export function myInviteList(data) {
  return request({
    url: '/reward/myInviteList',
    method: 'post',
    data: data
  })
}

// 分级邀请人数查询
export function receiveList(num) {
	return request({
		url: '/reward/invite/' + num,
		method: 'get',
	})
}