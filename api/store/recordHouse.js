import request from '@/utils/request'

// 收楼登记
export function addHouseLevy(data) {
  return request({
    url: '/houseLevy/add',
    method: 'post',
    data: data
  })
}

// 收房登记列表
export function houseLevyList() {
  return request({
    url: '/assess/list',
    method: 'get',
  })
}
export function delAssess(id) {
  return request({
    url: `/assess/${id}`,
    method: 'delete',
  })
}


// 详情
export function getDetail(id) {
  return request({
    url: '/houseLevy/detail/'+id,
    method: 'get',
  })
}

// 获取实名认证明细
export function certificationDetail(id) {
  return request({
    url: '/certification/detail',
    method: 'get',
  })
}