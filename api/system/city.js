import request from '@/utils/request'


// 查询省列表
export function getProvinces() {
  return request({
    url: '/city/getProvinces',
    method: 'get'
  })
}

// 查询市列表
export function getCitys(provinceCode) {
  return request({
    url: '/city/getCitys/'+provinceCode,
    method: 'get'
  })
}


// 查询区列表
export function getRegions(cityCode) {
  return request({
    url: '/city/getRegions/'+cityCode,
    method: 'get'
  })
}

