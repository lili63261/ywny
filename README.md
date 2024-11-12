
## 项目结构
### api
Api接口存放目录
### static
静态资源存放目录
- favicon.ico 网页图标
- images 图片存放目录
    tabbar 底部导航栏图片存放目录
    level 等级图标存放
    level_bg 邀请页等级卡片背景
- login 登录页图片存放目录
- 
### components
- echarts-uniapp 图标组件
- Y-Steps 步骤条组件
### pages
项目页面存放目录
### plugins
插件存放目录
- auth 路由权限判断
- modal 弹窗封装
- tab 跳转封装
### store
项目store数据存储
### utils
项目工具类存放目录
- auth 用户登录token获取
- common 公共方法
- errorCode 错误码
- request 请求封装
- permission 登录权限判断函数
- storage 本地存储封装
- md5 MD5加密
- upload 上传方法
## permission.js
登录权限判断，白名单页面配置

## config.js
项目配置文件
```
 {
	//接口信息
	baseUrl: 'https://ysqsapp.yanshizhan.bond/prod-api',
	// 应用信息
	appInfo: {
		// 应用名称
		name: '云数清算',
		// 应用版本
		version: '1.0.0',
	},
	//二维码邀请地址--->>>>配置h5前端地址
	codeurl: 'https://www.ysmqs.cyou/', 
};
```

## test.txt
项目地址加密后文件，加密解密方法在安卓套壳项目内


## 注意点
