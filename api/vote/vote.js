import request from '@/utils/request';

// 我的出行票务详细
export function myDetail() {
  return request({
    url: '/travelTicket/myDetail',
    method: 'get',
  });
}

// 新增出行票务
export function addVote(data) {
  return request({
    url: '/travelTicket',
    method: 'post',
    data: data,
  });
}

//删除出行票务
export function deleteVote(id) {
  return request({
    url: '/travelTicket/' + id,
    method: 'DELETE',
  });
}
