import request from '@/utils/request'

// 支付下单
export function createOrder(data) {
  return request({
    url: '/order/createOrder',
    method: 'post',
    data: data
  })
}
