import request from '@/utils/request';

// 保障计划列表
export function bondList() {
  return request({
    url: '/bond/list',
    method: 'get',
  });
}

// 具体债券的收益详情
export function userBuyRecord(bondId) {
  return request({
    url: '/yanglao/userBuyRecord/' + bondId,
    method: 'get',
  });
}

// 所有债券收益明细
export function userBuyRecordList() {
  return request({
    url: '/bond/userBuyRecord',
    method: 'get',
  });
}

// 是否支付兑换手续费
export function payExchangeFee() {
  return request({
    url: '/bond/payExchangeFee',
    method: 'get',
  });
}

// 债券兑换rmb
export function exchange(data) {
  return request({
    url: '/bond/exchange',
    method: 'post',
    data: data,
  });
}

//房屋信息列表
export function getHouseList() {
  return request({
    url: '/house/houseList',
    method: 'get',
  });
}

// 五行币曲线图
export function getKline() {
  return request({
    url: '/bond/graph',
    method: 'get',
  });
}