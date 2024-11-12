import request from '@/utils/request'

// 新增&修改申报
export function saveAssess(data) {
  return request({
    url: '/assess',
    method: 'post',
    data: data
  })
}
// 申报列表
export function getAssessList() {
  return request({
    url: '/assess/list',
    method: 'get',
  })
}
// 申报详细
export function getAssess(id) {
  return request({
    url: '/assess/' + id,
    method: 'get'
  })
}

// 股东登记
export function shareholderSign() {
  return request({
    url: '/user/shareholderSign',
    method: 'get',
  })
}


// 公告详情
export function detailNotice(noticeId) {
  return request({
    url: '/notice/detail/'+noticeId,
    method: 'get',
	headers: {
	  isToken: false
	}
  })
}

// 公告列表
export function listNotice(type) {
  return request({
    url: '/notice/list/'+type,
    method: 'get',
    headers: {
      isToken: false
    }
  })
}
// banner列表
export function listBanner(type) {
  return request({
    url: '/banner/list',
    method: 'get',
    headers: {
      isToken: false
    }
  })
}

// 平台视频
export function getVideo(place) {
  return request({
    url: '/video/getVideo/'+place,
    method: 'get',
    headers: {
      isToken: false
    }
  })
}

// 车列表
export function cars() {
	return request({
		url: '/car/list',
		method: 'get'
	})
}

// 我的车列表
export function myCars() {
	return request({
		url: '/car/record/list',
		method: 'get'
	})
}

// 新增出行票务
export function addTravelTicket(data) {
	return request({
		url: '/travelTicket',
		method: 'post',
		data: data
	})
}

// 我的出行票务详细
export function travelTicket() {
	return request({
		url: '/travelTicket/myDetail',
		method: 'get'
	})
}

// 删除出行票务
export function delTravelTicket(id) {
	return request({
		url: '/travelTicket/'+id,
		method: 'delete'
	})
}


//领取通行证
export function isReceiveTravelTicket() {
	return request({
		url: '/user/isReceive',
		method: 'get'
	})
}

//领取通行证
export function signTravelTicket() {
	return request({
		url: '/user/platformSign',
		method: 'get'
	})
}