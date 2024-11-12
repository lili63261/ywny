import request from '@/utils/request';

// 商品信息列表
export function goodsList() {
  return request({
    url: '/shop/goodsList',
    method: 'get',
  });
}

// 商品信息详情
export function getDetail(id) {
  return request({
    url: '/shop/detail/' + id,
    method: 'get',
  });
}

// 积分兑换
export function exchange(id) {
  return request({
    url: '/shop/exchange/' + id,
    method: 'get',
  });
}

// 积分兑换列表
export function exchangeList(id) {
  return request({
    url: '/shop/exchangeList',
    method: 'get',
  });
}

// 积分兑换详情
export function exchangeDetail(id) {
  return request({
    url: '/shop/exchangeDetail/'+id,
    method: 'get',
  });
}

// 删除积分兑换记录
export function delExchange(id) {
  return request({
    url: '/shop/delExchange/'+id,
    method: 'delete',
  });
}
