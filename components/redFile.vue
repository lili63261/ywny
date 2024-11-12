<template>
	<view>
		<view class="redfile mt">
			<view class="title">中华人民共和国国务院</view>
			<view class="title-tip">国函[2023]009号</view>
			<view class="tag">
				<image src="/static/images/home/gh.png"></image>
			</view>
			<view class="content">
				<p class="alt">关于央网农业平台发布</p>
				<p>中国国务院，一带一路国家发展改革委双机构，集中力量，全力支持，乡村振兴，《中国央网农业》的后勤工作。且特别邀请云数贸负责人张健嘉宾入席演讲发布，此央网农业平台一经发布，由张健作为改平台总负责人，全程管理或宣传等其它工作，号召团队长跟上党，永远坚定党得思想，为人民服务，不忘初心，牢记使命。</p>
				<p>党中央特别嘱咐，全国团队长参入其中，参与《中国央网农业》让更多成员走出贫穷，走出困境，共同完成党中央下达的指令，</p>
				<div>负责人：张健</div>
			</view>
			<view class="f-t">
				<view class="img flexColumn">
					<em></em>
				</view>
				<view class="ft-text">
					<p>签发:国务院国家发展改革委</p>
					<p class="flexRow"><span>中华人民共和国国务院</span><span>2023年12月01日印发</span></p>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"redFile",
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss" scoped>

	.redfile {
		padding: $page-padding;
		width: 90%;
		margin: auto;
		.title{
			text-align: center;
			color:#f00;
			font-size: 50rpx;
		}
		.title-tip{
			padding: 20rpx;
			text-align: center;
		}
		.tag{
			margin-top:15px;
			border-top: 2px solid #f00;
			position: relative;text-align: center;
			image{
				width:50px;height:50px;border-radius: 25px;
				padding:10px;
				background-color: #f4f8fb;
				margin-top: -25px;
			}
		}
		.content {
			margin-bottom: 100rpx;
			font-size: 26rpx;
			.alt{
				text-align: center;
				font-size: 40rpx;
			}
			p{
				margin-bottom: 20rpx;
				text-indent: 2em;
			}
		}

		.f-t {
			.img{
				position: relative;
				align-items:end;
				margin-bottom: 20rpx;
				em{
					display: block;
					height:200rpx;width:200rpx;
					background:url("/static/images/home/1.gif") no-repeat;
					background-size: 100%;
				}
			}
			.ft-text {
				p {
					border-bottom: 1px solid #333;
				}

				.flexRow {
					justify-content: space-between;
				}
			}

	}
		}
</style>