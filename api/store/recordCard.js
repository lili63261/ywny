import request from '@/utils/request'

// 房产红本登记
export function addHouseLicense(data) {
  return request({
    url: '/houseLicense/add',
    method: 'post',
    data: data
  })
}

// 房产红本列表
export function houseLicenseList() {
  return request({
    url: '/houseLicense/list',
    method: 'get',
  })
}


// 房产红本详情
export function getDetail(id) {
  return request({
    url: '/houseLicense/detail/'+id,
    method: 'get',
  })
}
