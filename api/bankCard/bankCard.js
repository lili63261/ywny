import request from '@/utils/request';

// 卡种列表
export function bankCardList() {
  return request({
    url: '/bankCard/list',
    method: 'get',
  });
}

// 我的购买记录
export function userBuyRecord() {
  return request({
    url: '/bankCard/userBuyRecord',
    method: 'get',
  });
}


// 我的代金券列表
export function userCoupons() {
	return request({
		url: '/shop/buyRecord/list',
		method: 'get',
	});
}

export function getVideo(place) {
  return request({
    url: `/video/getVideo/${place}`,
    method: 'get',
  });
}
