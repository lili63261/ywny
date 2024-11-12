import request from '@/utils/request'


// 房屋补助金
export function houseGrant(data) {
  return request({
    url: '/user/houseGrant',
    method: 'post',
    data: data
  })
}

// 股权明细
export function stock(data) {
  return request({
    url: '/user/stock',
    method: 'post',
    data: data
  })
}
