import request from '@/utils/request';

// 物业卡列表
export function houseCardList() {
  return request({
    url: '/houseCard/list',
    method: 'get',
  });
}
// 领取物业卡
export function receiveHouseCard(id) {
  return request({
    url: '/houseCard/receiveHouseCard/' + id,
    method: 'get',
  });
}

// 我的领取记录
export function myReceiveRecord() {
  return request({
    url: '/houseCard/myReceiveRecord',
    method: 'get',
  });
}


