/**
 * 显示消息提示框
 * @param content 提示的标题
 */
export function toast(content) {
	uni.showToast({
		icon: 'none',
		title: content,
	});
}

/**
 * 显示模态弹窗
 * @param content 提示的标题
 */
export function showConfirm(content) {
	return new Promise((resolve, reject) => {
		uni.showModal({
			title: '提示',
			content: content,
			cancelText: '取消',
			confirmText: '确定',
			confirmColor: '#c73d3d',
			success: function(res) {
				resolve(res);
			},
		});
	});
}

/**
 * 参数处理
 * @param params 参数
 */
export function tansParams(params) {
	let result = '';
	for (const propName of Object.keys(params)) {
		const value = params[propName];
		var part = encodeURIComponent(propName) + '=';
		if (value !== null && value !== '' && typeof value !== 'undefined') {
			if (typeof value === 'object') {
				for (const key of Object.keys(value)) {
					if (value[key] !== null && value[key] !== '' && typeof value[key] !== 'undefined') {
						let params = propName + '[' + key + ']';
						var subPart = encodeURIComponent(params) + '=';
						result += subPart + encodeURIComponent(value[key]) + '&';
					}
				}
			} else {
				result += part + encodeURIComponent(value) + '&';
			}
		}
	}
	return result;
}

export function generateNumbers(totalSum) {
	// 计算每个数字的平均值
	let avg = totalSum / 5;

	// 生成5个数字
	let numbers = [];
	for (let i = 0; i < 5; i++) {
		// 生成随机偏移量，保证每个数字相差不超过80
		let offset = Math.random() * 160 - 80;

		// 计算当前数字
		let num = avg + offset;

		// 将数字保留两位小数
		// num = p ** ** Float(num.toFixed(2));
		num = num.toFixed(2)

		// 将数字添加到数组中
		numbers.push(num);
	}

	return numbers;
}

/**
 * 将数字取整为10的倍数
 * @param {Number} num 需要取整的值
 * @param {Boolean} ceil 是否向上取整
 * @param {Number} prec 需要用0占位的数量
 */
export function formatInt(num, prec = 2, ceil = true) {
  const len = String(num).length;
  if (len <= prec) { return num }; 

  const mult = Math.pow(10, prec);
  return ceil ? Math.ceil(num / mult) * mult : Math.floor(num / mult) * mult;
} 
// formatInt(2345, 2, true)  -> 2400
// formatInt(2345, 2. false) -> 2300
// formatInt(2345, 3, true)  -> 3000
// formatInt(2345, 3, false) -> 2000

// 获取html代码中第一张图片
export function getHtmlImgUrl(content) {
	//匹配图片（g表示匹配所有结果i表示区分大小写）
	let imgReg = /<img.*?(?:>|\/>)/gi
	//匹配src属性 
	let srcReg = /src=[\'\"]?([^\'\"]*)[\'\"]?/i
	let arr = content.match(imgReg)
	if (arr != null) {
		return arr[0].match(srcReg)[1]
	}

	return false
}


// export function generateRandomUpperCaseLetterFromString(str) {
//     // 使用字符串的哈希码来生成一个随机索引
//     const hash = hashCode(str);
// 	return hash
//     // 将哈希码转换为在 0 到 25 之间的整数
//  //    const index = Math.abs(hash % 26);
// 	// return index
//     // 将索引转换为大写字母
//     // const char = String.fromCharCode(65 + index); // 65 是大写字母 A 的 Unicode 编码
//     // return char;
// }

// // // 辅助函数：计算字符串的哈希码
// function hashCode(str) {
//     let hash = 0;
//     for (let i = 0; i < str.length; i++) {
//         hash = str.charCodeAt(i) + ((hash << 5) - hash);
//     }
//     return hash;
// }

export function generateTrackingNumber(str) {
	// 获取当前日期和时间的时间戳
	const timestamp = new Date(str).toISOString();
	
	// 将时间戳中的字符替换为适合快递单号的格式
	const formattedTimestamp = timestamp.replace(/[-T:.Z]/g, '');
	
	// 生成一个随机数（可以根据需要调整长度）
	// const randomPart = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
	
	const randomPart = generate2(str)
	
	// 合并时间戳和随机数生成快递单号
	const trackingNumber = `${formattedTimestamp}${randomPart}`;
	
	return trackingNumber;
}

function generate2(id){
    var sum = 0;
    for(var i = 0; i < id.length; i++){
        sum += id.charCodeAt(i);
    }
	
	return sum
    // return (sum % 10) + 1;
}

export function fixedRandom(seed) {
    // 使用一个简单的哈希算法来生成一个伪随机数
    const hash = Array.from(seed.toString()).reduce((acc, char) => {
        return acc + char.charCodeAt(0);
    }, 0);

    // 将哈希值映射到0到4之间
    return Math.abs(hash) % 5; // 0到4之间的随机数
}
