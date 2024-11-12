import request from '@/utils/request'

// 提现详细
export function detailWithdraw(id) {
  return request({
    url: '/withdraw/'+id,
    method: 'get'
  })
}


// 最小提现金额
export function minWithdraw(id) {
  return request({
    url: '/withdraw/minWithdrawMoney',
    method: 'get'
  })
}


// 提现列表
export function listWithdraw() {
  return request({
    url: '/withdraw/list',
    method: 'get'
  })
}

export function withdrawRecord(type) {
  return request({
    url: '/withdraw/withdrawRecord/' + type,
    method: 'get'
  })
}
 
 
//  提现申请
export function apply(data) {
  return request({
    url: '/withdraw/apply',
    method: 'post',
    data: data
  })
}

// 对应类型提现金额 {type}
export function totalByType(type) {
	return request({
	url: '/withdraw/withdrawMoney/' + type,
	method: 'get'
	})
}

// 每日利息提现
export function applyCashbackWithdraw(data) {
  return request({
    url: '/withdraw/applyCashbackWithdraw',
    method: 'post',
    data: data
  })
}

// 现金提现条件判断
export function criteria(data) {
  return request({
    url: '/withdraw/withdrawSubsidyCriteria',
    method: 'post',
    data: data
  })
}


// 提现条件隐藏
export function openCriteria(data) {
  return request({
    url: '/withdraw/openCriteria',
    method: 'get',
    data: data
  })
}


// 查询提现记录
export function listByType(type) {
	return request({
	  url: '/withdraw/listByType/' + type,
	  method: 'get'
	})
}

// 其他类型提现申请
export function ortherApply(data) {
	return request({
	  url: '/withdraw/ortherApply',
	  method: 'post',
	  data: data
	})
}