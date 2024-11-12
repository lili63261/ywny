import request from '@/utils/request'


// 现金明细
export function subsidy(data) {
  return request({
    url: '/user/subsidy',
    method: 'post',
    data: data
  })
}

// 分红明细
export function cashback(data) {
  return request({
    url: '/user/cashback',
    method: 'post',
    data: data
  })
}


// 账目明细
export function accountLog(data) {
  return request({
    url: '/user/accountLog',
    method: 'post',
    data: data
  })
}

