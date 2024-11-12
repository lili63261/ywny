<template>
	<view>
		<view class="logo flexRow">
			<image class="img" src="/static/images/common/logo.png" mode="widthFix"></image>
		</view>
		<view class="banner">
			<view class="cover-video-warp">
				<!-- 图片封面 -->
				<view class="cover-image-warp" v-if="!isPlaying" @click="playVideo">
					<image :src="videoObj.cover" class="cover-image" />
					<image src="@/static/images/home/play.png" class="stop-image"></image>
				</view>
				<!-- 视频播放 -->
				<video ref="videoPlayer" v-show="isPlaying" :src="videoObj.videoUrl" controls
					:show-fullscreen-btn="false" object-fit="contain" @click="pausePlay" class="video-player"
					:class="{'fullScreen':isFullScreen}"></video>
			</view>
		</view>
		<view class="btn-block mt flexRow">
			<view class="chat">在线客服</view>
			<view class="teamChat">官方社群</view>
		</view>

		<!-- 文件 -->
		<view class="ad mt" v-show="Object.keys(adData).length > 0">
			<mp-html :content="adData.noticeContent" />
		</view>

		<!-- 投票 -->
		<view class="vote mt" @click="$tab.navTo('/pages/vote/vote')">
			<view class="vote-img">国函下方放一个张健大人物投票模版，点击进去可以投票张健的</view>
			<view class="vote-video">国函下方放一个张健视频，文字内容，大家好我是张健:家人们抓紧注册中国央网农业，领取股权和鸟巢见面会门票。</view>
		</view>

		<view class="foot flexColumn">
			<view class="content">主办单位：国务院办公厅</view>
			<view class="content">版权所有：中国央网农业</view>
			<view class="content">网站标识码bm021000030</view>
			<view class="content">京ICP备05070916号-2　京公网安备11010502039001号</view>
			<view class="flexRow" style="align-content: center;margin-top: 50rpx;">
				<image src="/static/images/home/sc_home_1.png" mode="widthFix" style="width: 180rpx;" />
				<image src="/static/images/home/sc_home_2.png" mode="widthFix" style="width: 100rpx;margin: 0 80rpx;" />
				<image src="/static/images/home/sc_home_3.png" mode="widthFix" style="width: 180rpx;" />
			</view>
		</view>

		<!-- 微信展示浏览器打开 -->
		<wxTip />
	</view>
</template>

<script>
	import {
		listBanner,
		listNotice,
		getVideo
	} from '@/api/index.js'
	import mpHtml from 'mp-html/dist/uni-app/components/mp-html/mp-html'
	import wxTip from "@/components/wxTip.vue"
	export default {
		filters: {
			filterHTML(html) {
				return html.replace(/&nbsp;/g, '').replace(/(<([^>]+)>)/gi, '')
			}
		},
		computed: {
			period() {
				let date = (new Date()).getHours()
				let hoursTip = ''
				if (date >= 0 && date < 12) {
					hoursTip = '上午好'
				} else if (date >= 12 && date < 18) {
					hoursTip = '下午好'
				} else {
					hoursTip = '晚上好'
				}
				return hoursTip
			}
		},
		components: {
			wxTip,
			mpHtml
		},

		data() {
			return {
				isApp: true,
				noticeArray: [],
				notice: {},
				contactArray: [],
				contact: {},
				adData: {},
				// 视频
				videoObj: {
					title: "",
					cover: "",
					videoUrl: "",
				},
				isPlaying: false, // 控制显示图片还是视频
				isFullScreen: true, // 控制显示图片还是视频
			}
		},
		onLoad() {
			this.getVideoFun();
		},
		onShow() {
			// 5 首页红头文件
			this.getNote(5)
		},
		methods: {
			getNote(e) {
				listNotice(e).then((res) => {
					if (res.data.length > 0) {
						switch (e) {
							case 1:
								break
							case 2:
								this.noticeArray = res.data
								this.notice = this.noticeArray[0]
								this.$refs.popupNotice.open()
								break
							case 3:
								this.contactArray = res.data
								this.contact = this.contactArray[0]
								break
							case 5:
								this.adData = res.data.length > 0 ? res.data[0] : {}
								break
						}
					}
				})
			},
			// 关闭公告
			closeNotice() {
				this.noticeArray = this.noticeArray.filter(item => item.noticeId !== this.notice.noticeId)
				if (this.noticeArray.length > 0) {
					this.notice = this.noticeArray[0]
				} else {
					this.$refs.popupNotice.close()
					this.$refs.popupContact.open()
				}
			},
			//关闭客服
			closeContact() {
				this.contactArray = this.contactArray.filter(item => item.noticeId !== this.contact.noticeId)

				if (this.contactArray.length > 0) {
					this.contact = this.contactArray[0]
				} else {
					this.$refs.popupContact.close()
				}
			},
			//获取视频
			getVideoFun() {
				getVideo(1).then((res) => {
					this.videoObj = {
						...this.videoObj,
						...res.data,
					};
				});
			},
			playVideo() {
				this.isPlaying = true;
				this.$nextTick(() => {
					// 确保 video 元素已经渲染，然后手动播放
					const video = this.$refs.videoPlayer;
					if (video && video.play) {
						try {
							video.play();
							this.isFullScreen = true
						} catch (error) {
							console.error("播放失败:", error);
						}
					}
				});
			},
			//全屏
			pausePlay(e) {
				console.log("fullscreenchange", e)
				//改video
				// this.isFullScreen = e.fullScreen
				const video = this.$refs.videoPlayer;
				try {
					video.pause();
					this.isFullScreen = false
					this.isPlaying = false;
				} catch (error) {
					console.error("播放失败:", error);
				}
			},
			initIsApp() {
				let hostName = location.hostname;
				//判断域名内是否有app
				if (hostName.indexOf('app') > -1) {
					this.isApp = true
				} else {
					this.isApp = false
				}
			},
		}
	}
</script>

<style lang="scss" scoped>
	.logo {
		justify-content: center;

		.img {
			width: 200px;
		}
	}

	.banner {
		min-height: 300rpx;
		.cover-video-warp {
			width: 100vw;
			.cover-image {
				width: 100%;
				height: 380rpx;
			}
			.video-player {
				width: 100% !important;
				height: 380rpx;
			}
			.fullScreen {
				position: fixed;
				left: 0;
				top: 0;
				z-index: 999;
				width: 100% !important;
				height: 100% !important;
				background-color: #000;
				// transform: rotate(90deg);
			}
			.cover-image-warp {
				position: relative;
				.stop-image {
					width: 80rpx;
					height: 80rpx;
					position: absolute;
					top: 50%;
					left: 50%;
					transform: translate(-50%, -50%);
				}
			}
		}
	}

	.mt {
		margin-top: $page-padding;
	}
	
	.vote{
		min-height: 300rpx;
	}

	.btn-block {
		justify-content: space-between;
	}

	.foot {
		min-height: 300rpx;
		background: url("/static/images/home/footer-750.png");
		box-sizing: border-box;
		background-size: auto 100%;
		align-content: center;
		align-items: center;
		padding: 30rpx;
		padding-top: 100rpx;

		.content {
			color: #000;
			margin: 6rpx 0;
			font-size: 28rpx;
			white-space: nowrap;
		}
	}
</style>