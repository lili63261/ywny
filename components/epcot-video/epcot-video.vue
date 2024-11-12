<template>
	<view class="sunny-video" :style="{width:elVideoWidth.strNum,height:elVideoHeight.strNum}">
		<video :style="{width:elVideoWidth.strNum,height:elVideoHeight.strNum}" id="epcotVideo" :data-id="ikey" ref="epcotVideo" play-strategy="1" :title="title" :src="src" :show-center-play-btn="false" :controls="controls" :enable-play-gesture="enablePlayGesture" :loop="loop" :muted="muted" :autoplay="autoplay" @timeupdate="timeupdate" enable-play-gesture :show-mute-btn="showMuteBtn" @play="play" @pause="pause" @ended="ended" @error="playError" @fullscreenchange="fullscreenchange">
			<cover-view v-if="!isPlay" class="banner-view" :style="{width:elVideoWidth.strNum,height:elVideoHeight.strNum}">
				<cover-image class="banner" :style="{width:elVideoWidth.strNum,height:elVideoHeight.strNum}" :src="poster" mode="" @click="changePlay"></cover-image>
				<cover-image class="imgPal" :style="{width:playBtnHeight.strNum,height:playBtnHeight.strNum,top:`${elVideoHeight.intNum/2}px`,left:`50%`,transform:`translate(-${playBtnHeight.intNum/2}px,-${playBtnHeight.intNum/2}px)`}" @click="changePlay" :src="playImg"></cover-image>
			</cover-view>
			<!-- 倍速标记 -->
			<cover-view v-if="isPlay&&!isShowRateBox" class="speedText" :style="{top:`${isFullScreen?(screenInfo.width/2) - 14.5 +'px':(elVideoHeight.intNum/2)- 14.5+'px'}`}" @click="isShowRateBox = true">
				<!-- #ifdef APP-NVUE -->
				<text class="text">{{rateText}}X</text>
				<!-- #endif -->
				<!-- #ifndef APP-NVUE -->
				<cover-view class="text" @click="isShowRateBox = true">{{rateText}}X</cover-view>
				<!-- #endif -->
			</cover-view>
			<cover-view v-if="isShowRateBox" class="vertical" :class="{'vertical-full':isFullScreen}"  :style="[verticalStyle.vertical]">
				<cover-view class="options" :style="[verticalStyle.options]" @click="isShowRateBox=false"></cover-view>
				<!-- #ifdef APP-NVUE -->
				<view class="speed-box" :style="[verticalStyle.speedBox]">
					<text class="speed-text" :class="{act:item.isTo}" v-for="(item,index) in rateList" :key="item.name" @click="changeRate(item,index)">{{item.name}}X</text>
				</view>
				<!-- #endif -->
				<!-- #ifndef APP-NVUE -->
				<cover-view class="speed-box" :style="[verticalStyle.speedBox]">
					<cover-view class="speed-text" :class="{act:item.isTo}" v-for="(item,index) in rateList" :key="item.name" @click="changeRate(item,index)">{{item.name}}X</cover-view>
				</cover-view>
				<!-- #endif -->
			</cover-view>
			<!-- 试看盒子 -->
			<cover-view v-if="visibleTrialEndBox" class="trialEndBox" :style="{width:trialStyle.width,height:trialStyle.height}">
				<!-- #ifdef APP-NVUE -->
				<text class="tipText">{{tipText}}</text>
				<text class="closeBtn" @click.stop="handleClickTrialEnd">{{btnText}}</text>
				<!-- #endif -->
				<!-- #ifndef APP-NVUE -->
				<cover-view class="tipText">{{tipText}}</cover-view>
				<cover-view class="closeBtn" @click.stop="handleClickTrialEnd">{{btnText}}</cover-view>
				<!-- #endif -->
			</cover-view>
			<!-- 跳转提示 -->
			<cover-view class="mplayer-toast" :class="{'mplayer-show':showMplayerToast}">
				<!-- #ifdef H5 -->
				<text class="text">记忆你上次看到{{seecondsHMS(seekTime)}}<text class="btn_text" @click="handelSeek(3)">跳转</text></text>
				<!-- #endif -->
				<!-- #ifndef H5 | APP-NVUE -->
				<cover-view v-if="showMplayerToast" class="text">已为您定位至{{seecondsHMS(seekTime)}}</cover-view>
				<!-- #endif -->
				<!-- #ifdef APP-NVUE -->
				<text class="text">已为您定位至{{seecondsHMS(seekTime)}}</text>
				<!-- #endif -->
			</cover-view>
		</video>
	</view>
</template>

<script>
	import {getPx,addUnit,sys,convertSecondsToHMS} from './function.js'
	import playIcon from '@/static/images/common/play.png'
	export default {
		props:{
			ikey: {
				type: Number,
				default: 0
			},
			// 视频地址
			src:{
				type:String,
				default:''
			},
			// 视频标题
			title:{
				type:String,
				default:''
			},
			// 视频封面
			poster:{
				type:String,
				default:''
			},
			// 视频高度
			videoHeight:{
				type: [String, Number],
				default: '230px'
			},
			/**
			 * 视频宽度 v1.1.3
			 */
			videoWidth:{
				type: [String, Number],
				default: '750rpx'
			},
			// 播放图片按钮宽高
			playImgHeight:{
				type: [String, Number],
				default: '70rpx'
			},
			// 暂停按钮
			playImg:{
				type:String,
				default:()=> playIcon
			},
			// 是否显示静音按钮
			showMuteBtn:{
				type:Boolean,
				default:false
			},
			// 播放完毕是否退出全屏
			isExitFullScreen:{
				type:Boolean,
				default:true
			},
			/**
			 * 主题色
			 */
			primaryColor:{
				type:String,
				default:'#5C91EF'
			},
			/**
			 * 试看提示的文字
			 */
			tipText:{
				type:String,
				default:'试看已结束，本片是会员专享内容'
			},
			/**
			 * 试看按钮的文字
			 */
			btnText:{
				type:String,
				default:'成为会员免费观看'
			},
			// 视频试看时间（秒）
			trialTime:{
				type:Number,
				default:0
			},
			/**
			 * 倍速盒子宽度 v1.1.3
			 */
			speedBoxWidth:{
				type: [String, Number],
				default: '160rpx'
			},
			/**
			 * 是否循环播放 v1.1.3
			 */
			loop:{
				type:Boolean,
				default:false
			},
			/**
			 * 是否静音播放 v1.1.3
			 */
			muted:{
				type:Boolean,
				default:false
			},
			/**
			 * 是否自动播放
			 */
			autoplay:{
				type:Boolean,
				default:false
			},
			/**
			 * 历史观看位置 v1.2.0
			 */
			seekTime:{
				type:Number,
				default:0
			}
		},
		data() {
			return {
				videoCtx:'', //视频上下文
				isPlay:false,// 视频是否播放过
				isShowRateBox:false,// 是否显示倍速盒子
				rateText:'1.0',// 当前倍速
				rateList: [{
					name:'0.5',
					isTo:false
				},{
					name:'0.8',
					isTo:false
				},{
					name:'1.0',
					isTo:true
				},{
					name:'1.25',
					isTo:false
				},{
					name:'1.5',
					isTo:false
				}
				// #ifdef MP-WEIXIN
				,{
					name:'2.0',
					isTo:false
				}
				// #endif
				], //倍数
				isFullScreen: false, //全屏状态
				// 屏幕信息
				screenInfo:{
					width:0,
					height:0,
				},
				visibleTrialEndBox:false,// 控制试看结束内容显示隐藏
				enablePlayGesture:false,// 是否开启播放手势，即双击切换播放/暂停
				controls:false,// 是否显示原生控件
				showMplayerToast:false,// 控制播放器提示的显示隐藏
				countPlay:0,// 视频播放次数
				playId: 0
			}
		},
		computed:{
			/**
			 * 视频单位高度信息
			 * @return {Object} {intNum:纯数字，strNum:携带rpx单位}
			 */
			elVideoHeight() {
				return {
					intNum:getPx(this.videoHeight),
					strNum:addUnit(this.videoHeight)
				}
			},
			/**
			 * 视频单位宽度信息
			 * @return {Object} {intNum:纯数字，strNum:携带rpx单位}
			 */
			elVideoWidth() {
				return {
					intNum:getPx(this.videoWidth),
					strNum:addUnit(this.videoWidth)
				}
			},
			/**
			 * 播放图片按钮宽高信息
			 * @returns {Object} { intNum:不带单位, strNum:携带rpx单位 }
			 */
			playBtnHeight(){
				return {
					intNum:getPx(this.playImgHeight),
					strNum:addUnit(this.playImgHeight)
				}
			},
			/**
			 * 试看盒子样式 V1.1.0
			 * @returns {Object} {height,width}
			 */
			trialStyle(){
				return {
					height:this.isFullScreen? `${this.screenInfo.width}px` : this.elVideoHeight.strNum,
					width: this.isFullScreen? `${this.screenInfo.height}px` : this.elVideoWidth.strNum
				}
			},
			/**
			 * 倍速盒子宽度信息 v1.1.3
			 * @return {Object} {intNum:纯数字，strNum:携带rpx单位}
			 */
			elSpeedBoxWidth() {
				return {
					intNum:getPx(this.speedBoxWidth ? this.speedBoxWidth : 160),
					strNum:addUnit(this.speedBoxWidth ? this.speedBoxWidth : 160)
				}
			},
			/**
			 * 倍速盒子样式信息 v1.1.4
			 * @return {Object} 
			 */
			verticalStyle(){
				let obj = {
					vertical:{
						width:'',
						height:''
					},
					options:{
						width:'',
						height:''
					},
					speedBox:{
						width:'',
						height:''
					},
				}
				if(this.isFullScreen){
					// 全屏时
					obj.vertical.width = `${this.screenInfo.height}px`;
					obj.vertical.height = `${this.isShowRateBox? this.screenInfo.width : this.screenInfo.width-40}px`;
					obj.options.width = `${this.screenInfo.height - this.elSpeedBoxWidth.intNum}px`;
					obj.options.height = `${this.screenInfo.width}px`;
					obj.speedBox.width = `${this.elSpeedBoxWidth.intNum}px`;
					obj.speedBox.height = `${this.screenInfo.width}px`;
					return obj
				}else{
					obj.vertical.width = this.elVideoWidth.strNum;
					obj.vertical.height = `${this.isShowRateBox ? this.elVideoHeight.intNum:this.elVideoHeight.intNum - 44}px`;
					obj.options.width = `${this.elVideoWidth.intNum - this.elSpeedBoxWidth.intNum}px`;
					obj.options.height = this.elVideoHeight.strNum;
					obj.speedBox.width = this.elSpeedBoxWidth.strNum;
					obj.speedBox.height = this.elVideoHeight.strNum;
					return obj
				}
			}
		},
		mounted() {
			this.videoCtx = uni.createVideoContext('epcotVideo', this)
			this.getScreenInfo()
		},
		methods: {
			seecondsHMS(value){
				return convertSecondsToHMS(value);
			},
			/**
			 * 点击试看结束按钮 V1.1.6
			 * @param {Event} e
			 */
			handleClickTrialEnd(e){
				if(e.hasOwnProperty('touches')){
					this.$emit('handleBtn')
				}
			},
			// 获取元素信息
			getDomInfo(elId){
				return new Promise(resolve => {
					const view = uni.createSelectorQuery().select(`#${elId}`)
					view.boundingClientRect(data=>{
						resolve(data.height)
					}).exec()
				})
			},
			/**
			 * 当开始/继续播放时触发play事件 - 会触发emit事件
			 * @param {EventHandle} e 
			 */
			play(e){
				// let currentId = e.currentTarget.dataset.id
				// console.log(currentId, this.playId)
				// if (this.playId === currentId) {
				// 	this.videoCtx.pause()
				// 	// this.$nextTick(()=>{
				// 	// 	this.videoCtx.pause()
				// 	// })
				// }
				// this.playId = currentId
				
				this.isPlay=true
				this.controls = true
				this.enablePlayGesture=true
				this.$emit('play',e)
			},
			// 监听视频暂停
			pause(){
				this.$emit('pause')
			},
			/**
			 * 视频播放出错 - 会触发emit事件
			 * @param {Object} e 错误信息
			 */
			playError(e){
				this.$emit('playError',e)
			},
			/**
			 * 监听视频结束 - 会触发emit事件
			 */
			ended(){
				this.$emit('videoEnded')
				if(!this.isExitFullScreen)return
				this.videoCtx.exitFullScreen(); //退出全屏
			},
			onBack(){
				uni.navigateBack()
			},
			/**
			 * 视频播放进度变化 - 会触发emit事件
			 * @param {Object} e event.detail = {currentTime, duration}
			 */
			timeupdate(e) {
				this.$emit('timeupdate',e)
				// 是否判断需要视频试看 V1.1.0
				if(this.trialTime<=0)return
				if(e.detail.currentTime>=this.trialTime){
					this.$emit('trialEnd')
					this.showTrialEnd()
					this.enablePlayGesture=false
					this.controls = false
				}
			},
			/**
			 * 切换倍速
			 * @param {Object} item 当前点击项
			 * @param {Object} index 倍速索引
			 */
			changeRate(item,index){
				if(item.isTo)return this.isShowRateBox = false
				this.rateList.forEach((v,i)=>{
					i==index?v.isTo=true:v.isTo=false
				})
				this.videoCtx.playbackRate(item.name*1)
				this.rateText = item.name
				this.isShowRateBox = false
			},
			/**
			 * 播放视频
			 */
			changePlay(){
				this.$nextTick(()=>{
					this.videoCtx.play()
					if(this.countPlay<=0&&this.seekTime>0){
						// 没有播放过并且需要跳转视频
						// #ifndef H5
						this.seek(this.seekTime)
						// #endif
						this.showMplayerToast = true
						setTimeout(()=>{
							this.showMplayerToast = false
						},3000)
					}
					this.countPlay++
					/* this.rateText ='1.0'
					this.videoCtx.playbackRate(1) */
				})
			},
			/**
			 * 暂停播放 v1.1.3
			 */
			changePause(){
				this.$nextTick(()=>{
					this.videoCtx.pause()
				})
			},
			/**
			 * 全屏操作 - 会触发emit
			 */
			fullscreenchange(e){
				this.isFullScreen=!this.isFullScreen
				this.$emit('fullscreenchange',e.detail)
			},
			/**
			 * 获取屏幕信息
			 */
			getScreenInfo(){
				const res = sys()
				this.screenInfo.width = res.screenWidth
				this.screenInfo.height = res.screenHeight
			},
			/**
			 * 控制试看模块显示 V1.1.0
			 */
			showTrialEnd(){
				this.visibleTrialEndBox = true
				this.videoCtx.pause()
			},
			/**
			 * 控制试看模块隐藏 V1.1.0
			 */
			closeTrialEnd(){
				this.visibleTrialEndBox = false
				this.changePlay()
			},
			/**
			 * 跳转到指定位置，单位 s
			 * @param {Object} position 
			 * @description V1.1.1
			 */
			seek(position){
				this.$nextTick(()=>{
					this.videoCtx.seek(position)
					this.$emit('changeSeek',position)
					/* uni.showToast({
						title:'已为您跳转至上次观看位置',
						icon:'none'
					}) */
				})
			},
			/**
			 * H5用户手动跳转指定位置播放 v1.2.0
			 */
			handelSeek(){
				this.seek(this.seekTime)
				this.videoCtx.play()
				this.showMplayerToast = false
			},
			/**
			 * 手动全屏方法 v1.1.8
			 * @param {Object} direction  direction取为 vertical 或 horizontal
			 * @description H5和抖音小程序不支持{direction}参数
			 */
			requestFullScreen(direction='horizontal'){
				this.videoCtx.requestFullScreen({direction})
			},
			/**
			 * 退出全屏 v1.1.8
			 */
			exitFullScreen(){
				this.videoCtx.exitFullScreen()
			},
			/**
			 * v1.1.8
			 * 显示状态栏，仅在iOS全屏下有效
			 * 平台差异：仅微信小程序、百度小程序、QQ小程序
			 */
			showStatusBar(){
				this.videoCtx.showStatusBar()
			},
			/**
			 * v1.1.8
			 * 隐藏状态栏，仅在iOS全屏下有效
			 * 平台差异：仅微信小程序、百度小程序、QQ小程序
			 */
			hideStatusBar(){
				this.videoCtx.hideStatusBar()
			},
			/**
			 * 停止视频 v1.1.8
			 */
			handelStop(){
				this.videoCtx.stop()
			}
		}
	}
</script>

<style lang="scss">
	$primary: #5C91EF;
	//css函数
	/* #ifdef APP-NVUE */
	@function tovmin($rpx){//$rpx为需要转换的字号
		/* #ifdef VUE2 */
		@return #{$rpx}rpx;
		/* #endif */
		/* #ifdef VUE3 */
		@return #{calc($rpx / 2)}px;
		/* #endif */
	}
	/* #endif */

	/* #ifndef APP-NVUE */
	@function tovmin($rpx){//$rpx为需要转换的字号
		/* #ifdef VUE2 */
		@return #{$rpx * 100 / 750}vmin;
		/* #endif */
		/* #ifdef VUE3 */
		@return #{calc($rpx * 100 / 750)}vmin;
		/* #endif */
	}
	/* #endif */
	
	.sunny-video{
		position: relative;
		z-index: 0;
		.speedText{
			position: absolute;
			top: tovmin(240);
			right: tovmin(30);
			z-index: 5;
			padding: tovmin(10);
			/* #ifndef APP-NVUE */
			box-sizing: border-box;
			/* #endif */
			.text{
				display: flex;
				width: tovmin(80);
				font-size: tovmin(32);
				color: $primary;
				text-align: center;
			}
		}
	}
	.banner-view{
		position: relative;
		z-index: 1;
		.imgPal{
			position: absolute;
			z-index: 2;
			top: 240rpx;
			left: 375rpx;
			transform: translate(-35rpx,-35rpx);
			width: 120rpx;
			height: 120rpx;
		}
	}
	.vertical{
		position: relative;
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		&.vertical-full{
			position: relative;
			.speed-box{
				padding: tovmin(50) 0;
			}
		}
		.speed-box{
			position: absolute;
			right: 0;
			top: 0;
			/* #ifndef APP-NVUE */
			display: flex;
			box-sizing: border-box;
			/* #endif */
			flex-direction: column;
			align-items: center;
			justify-content: space-between;
			/* #ifdef APP-NVUE */
			// v1.1.3
			padding: 10px 0;
			/* #endif */
			background-color: rgba(0, 0, 0, 0.7);
			.speed-text{
				width: tovmin(160);
				text-align: center;
				font-size: tovmin(28);
				color: #fff;
				/* #ifdef APP-NVUE */
				padding: tovmin(10) 0px;
				/* #endif */
				/* #ifndef APP-NVUE */
				// v1.1.3
				height: tovmin(60);
				line-height: tovmin(60);
				box-sizing: border-box;
				&:first-child{
					margin-top: 10px;
				}
				&:last-child{
					margin-bottom: 15px;
				}
				/* #endif */
				&.act{
					color: $primary;
					font-size: tovmin(32);
				}
			}
		}
	}
	// 试看结束盒子
	.trialEndBox{
		position: absolute;
		bottom: 0;
		left: 0;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		z-index: 999;
		// backdrop-filter: blur(14px);
		background-color: rgba(0, 0, 0, 0.9);
		.tipText{
			font-size: tovmin(28);
			color: #fff;
		}
		.closeBtn{
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: center;
			width: tovmin(350);
			height: tovmin(75);
			margin: tovmin(32) 0 0;
			font-size: tovmin(30);
			line-height: tovmin(75);
			border-radius: tovmin(42);
			color: #fff;
			text-align: center;
			background-color: $primary;
		}
	}
	// 位置提示
	.mplayer-toast{
		position: absolute;
		left: tovmin(20);
		bottom: tovmin(90);
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: rgba(0, 0, 0, 0.8);
		border-radius: 2px;
		opacity: 0;
		transition: opacity .3s;
		padding: 6px 8px;
		/* #ifndef APP-NVUE */
		box-sizing: border-box;
		/* #endif */
		&.mplayer-show{
			opacity: 1;
		}
		
		.text{
			color: #fff;
			font-size: 14px;
			/* #ifdef APP-PLUS */
			margin: 5px 8px 8px;
			/* #endif */
			/* #ifdef APP-NVUE */
			margin: 0;
			/* #endif */
			.btn_text{
				color: $primary;
				margin-left: 12px;
			}
		}
	}
</style>
