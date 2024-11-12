import request from '@/utils/request';

// 用户抽奖
export function lotto() {
  return request({
    url: '/turntable/lotto',
    method: 'get',
  });
}

//抽奖记录
export function lottoRecord() {
  return request({
    url: '/turntable/lottoRecord',
    method: 'get',
  });
}

// 中奖名单
export function luckyRecord() {
  return request({
    url: '/turntable/luckyRecord',
    method: 'get',
  });
}

// 转盘选项
export function optionList() {
  return request({
    url: '/turntable/optionList',
    method: 'get',
  });
}

// 用户转盘次数
export function userCounts() {
  return request({
    url: '/turntable/userCounts',
    method: 'get',
  });
}



// 激励金提现
export function stimulateWithdraw() {
  return request({
    url: '/turntable/stimulateWithdraw',
    method: 'get',
  });
}

// 激励金提现记录
export function withdrawRecord() {
  return request({
    url: '/withdraw/withdrawRecord/8',
    method: 'get',
  });
}
