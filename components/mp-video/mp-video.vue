<template>
	<view>
		<div id="mui-player"></div>
	</view>
</template>

<script>
	import 'mui-player/dist/mui-player.min.css'
	import MuiPlayer from 'mui-player'
	import Hls from 'hls.js'
	
	export default {
		name:"mp-video",
		props: {
			src: {
				type: String,
				default: ''
			},
			poster: {
				type: String,
				default: ''
			},
			title: {
				type: String,
				default: ''
			},
			autoplay: {
				type: Boolean,
				default: true
			}
		},
		data() {
			return {
				mp: {}
			}
		},
		mounted() {
			const _this = this
			let ops = {
				autoplay: this.autoplay,
				muted: false,
				pageHead: false,
				title: this.title,
				container: '#mui-player',
				src: this.src,
				poster: this.poster,
				// autoFit: true,
				objectFit: 'cover'
			}
			
			// 判断m3u8  // 针对m3u8格式，服务器ng需要放开跨域
			if (this.src.toLowerCase().includes('m3u8')) {
				ops.parse = {
					type: 'hls',
					loader: Hls,
					config: {
						debug: false,
					}
				}
			}
			
			
			this.mp = new MuiPlayer(ops)
			_this.$nextTick(() => {
				// 监听播放器创建
				_this.mp.on('ready', function(event) {
					let _video = _this.mp.video();
					_video.addEventListener("play", function(e) {
						//播放开始事件
						_this.$emit('onPlayFn')
					});
					_video.addEventListener("pause", function(e) {
						//播放结束事件
						_this.$emit('onPauseFn')
					});
					_video.addEventListener("ended", function(e) {
						//播放结束事件
						_this.$emit('onEndedFn')
					});
				});
				// 播放发生错误
				_this.mp.on('error', function(event) {
					_this.refreshURLEvent();
					console.log('error', event);
					// 重新加载URL（指定一个视频地址重新加载资源，不传参则默认重新加载）
					_this.mp.reloadUrl(this.src);
				});
			})
		},
		methods: {
			changePause() {
				this.mp.destroy()
			},
			doPlay() {
				this.mp.video().play()
			}
		},
		destroyed() {
			if (this.mp) {
				this.mp.destroy(); // 销毁播放器
			}
		}
	}
</script>

<style>
/deep/ .mplayer-poster {
	img {
		object-fit: contain !important;
	}
}
</style>