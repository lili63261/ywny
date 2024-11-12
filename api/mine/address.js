import request from '@/utils/request'



// 查询地址列表
export function listAddress() {
  return request({
    url: '/userAddress/list',
    method: 'get'
  })
}

// 新增地址
export function addAddressn(data) {
  return request({
    url: '/userAddress/add',
    method: 'post',
    data: data
  })
}

// 地址详情
export function detailAddress(id) {
  return request({
    url: '/userAddress/detail/'+id,
    method: 'get'
  })
}

// 修改地址
export function editAddress(data) {
  return request({
    url: '/userAddress/edit',
    method: 'put',
    data: data
  })
}

// 删除地址
export function delAddress(id) {
  return request({
    url: '/userAddress/'+id,
    method: 'DELETE',
  })
}

