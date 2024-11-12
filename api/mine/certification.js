import request from '@/utils/request'


// 新增实名认证
export function addCertification(data) {
  return request({
    url: '/certification/add',
    method: 'post',
    data: data
  })
}

// 修改实名认证
export function editCertification(data) {
  return request({
    url: '/certification/edit',
    method: 'put',
    data: data
  })
}



// 查询实名认证
export function detailCertification() {
  return request({
    url: '/certification/detail',
    method: 'get'
  })
}


// 证书所需信息
export function certificateInfo() {
  return request({
    url: '/certificate/info',
    method: 'get'
  })
}