import request from '@/utils/request';

// 用户其他卡片记录
export function cardList() {
  return request({
    url: '/bankCard/orther/list',
    method: 'get',
  });
}

// 用户其他楼盘登记列表
export function houseList() {
  return request({
    url: '/house/levy/orther/list',
    method: 'get',
  });
}


//建档立卡
export function addLevyCard(data) {
	return request({
		url: '/house/levy/orther/add',
		method: 'post',
		data: data
	})
}

//删除建档立卡
export function delLevyCard(id) {
	return request({
		url: '/house/levy/orther/del/' + id,
		method: 'delete',
	})
}

//校验建档立卡
export function checkLevyCard(uniqueNo) {
	return request({
		url: '/house/levy/orther/check/' + uniqueNo,
		method: 'get',
	})
}