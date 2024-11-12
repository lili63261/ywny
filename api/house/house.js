import request from '@/utils/request';

// 房屋专区列表
export function regionList() {
  return request({
    url: '/house/regionList',
    method: 'get',
  });
}
// 房屋合同记录
export function contractList(data) {
  return request({
    url: '/house/buyRecord/contractList',
    method: 'get',
    params: data
  });
}

// 房屋详细
export function houseDetail(id) {
  return request({
    url: '/house/' + id,
    method: 'get',
  });
}

// 房屋信息列表
export function houseList() {
  return request({
    url: '/house/houseList',
    method: 'get',
  });
}

// 是否支付1000元购房手续费
export function payBuyHouseFee(houseId) {
  return request({
    url: '/houseCost/payBuyHouseFee/' + houseId,
    method: 'get',
  });
}

// 房屋购买记录列表
export function buyList() {
  return request({
    url: '/buyRecord/list',
    method: 'get',
  });
}

// 房屋购买详情
export function buyHouseDetail(id) {
  return request({
    url: '/buyRecord/detail/' + id,
    method: 'get',
  });
}

// 房屋删除
export function delHouse(id) {
  return request({
    url: '/buyRecord/delHouseById/' + id,
    method: 'DELETE',
  });
}

// 房屋费用清单列表
export function houseCost(id) {
  return request({
    url: '/houseCost/list/' + id,
    method: 'get',
  });
}
export function houseShopsList() {
  return request({
    url: '/house/shopsList',
    method: 'get',
  });
}

// 项目登记
export function addHouse(data) {
  return request({
    url: '/house/levy/add',
    method: 'post',
    data: data
  });
}
export function shopIsBuy() {
  return request({
    url: '/house/shopIsBuy',
    method: 'get',
  });
}
export function shopList() {
  return request({
    url: '/house/buyRecord/shopList',
    method: 'get',
  });
}



// 项目登记
export function enrollInList() {
  return request({
    url: '/house/levy/list',
    method: 'get',
  });
}

// 记录详情
export function levyDetaile(id) {
  return request({
    url: '/house/levy/detail/' + id,
    method: 'get',
  });
}

// 是否已购买
export function ifIsBuy(id) {
  return request({
    url: '/house/isBuy/' + id,
    method: 'get',
  });
}

// 房屋购买记录列表
export function buyRecordList() {
  return request({
    url: '/house/buyRecord/list',
    method: 'get',
  });
}

// 房屋费用清单列表
export function listByHouseId(houseId) {
  return request({
    url: '/house/cost/listByHouseId/' + houseId,
    method: 'get',
  });
}
// 删除登记记录
export function delLevy(id) {
  return request({
    url: '/house/levy/delLevyById/' + id,
    method: 'DELETE',
  });
}

// 新增申报
export function addAssess(data) {
  return request({
    url: '/assess',
    method: 'post',
    data: data
  });
}

// 安置房购买
export function buyHouseBySubsidy(id, data = {}) {
  return request({
    url: '/house/buyHouseBySubsidy/' + id,
    method: 'get',
    params: data
  });
}

// 根据大区id获取房屋列表
export function getListByRegionId(id) {
  return request({
    url: '/house/getListByRegionId/' + id,
    method: 'get',
  });
}

