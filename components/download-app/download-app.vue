<template>
  <uni-popup ref="downPopup" background-color="transparent" type="center" class="fullscreen-popup">
    <view class="fullscreen-popup">
      <!--			<view class="downPop_head">-->
      <!--				<text>应用信息</text>-->
      <!--				<uni-icons type="closeempty" @click="close()"></uni-icons>-->
      <!--			</view>-->
      <!--			<view class="downPop_main">-->
      <!--				<image src="/static/images/common/logo.jpg"></image>-->
      <!--				<view class="title">中国央网农业</view>-->
      <!--				<view class="stars">-->
      <!--					<uni-icons type="star-filled"></uni-icons>-->
      <!--					<uni-icons type="star-filled"></uni-icons>-->
      <!--					<uni-icons type="star-filled"></uni-icons>-->
      <!--					<uni-icons type="star-filled"></uni-icons>-->
      <!--					<uni-icons type="star-filled"></uni-icons>-->
      <!--					<view>5.0</view>-->
      <!--				</view>-->
      <!--				<view class="version">版本号: 1.1.0</view>-->
      <!--				<view class="dev">开发者: 中国央网农业科技有限公司</view>-->
      <!--				<view class="tools" @click="$tab.navTo('/pages/protocol')">-->
      <!--					<text>功能</text>-->
      <!--					<text>隐私</text>-->
      <!--					<text>权限</text>-->
      <!--				</view>-->
      <!--			</view>-->
      <!--			<view class="downPop_foot">-->

      <!--				<view class="btn" @click="downLoadFun"><view class="iconxy iconxy-xiazai" style="margin: 8rpx 8rpx 0 0; "></view>下载中国央网农业APP</view>-->
      <!--			</view>-->
<view class="btn-div">
      <uni-view class="btn download"  @click="downLoadFun">
        <!-- <uni-view  class="iconxy iconxy-xiazai"></uni-view> -->
        <uni-view class="txt">下载APP</uni-view>
      </uni-view>
      <uni-view class="btn close" @click="close()">
        <!-- <uni-view class="iconxy iconxy-icon-withdraw"></uni-view> -->
        <uni-view class="txt">返回</uni-view>
      </uni-view>
</view>

    </view>
  </uni-popup>
</template>
<script>
import {downUrl} from '@/api/system/user.js'

export default {
  props: {},
  methods: {
    open() {
      this.$refs['downPopup'].open()
    },
    close() {
      this.$refs['downPopup'].close();
    },
    // 下载APP
    async downLoadFun() {
      try {
        uni.showLoading({
          title: "加载中...",
        })
        const res = await downUrl()
        window.location.href = res.data
        // window.open(res.data)
        uni.hideLoading()
      } catch (error) {
        uni.hideLoading()
      }
    }
  }
}
</script>
<style lang="scss" scoped>




.uni-popup {
  z-index: 999;

  .downPop {
    border-radius: 16rpx 16rpx 0 0;
    background: #fff;

    &_head {
      position: relative;
      padding: 25rpx 0;
      text-align: center;
      font-size: 34rpx;

      .uni-icons {
        position: absolute;
        right: 25rpx;
        font-size: 40rpx !important;
      }
    }

    &_main {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding-top: 40rpx;
      border-top: 1px solid #e5e5e5;
      border-bottom: 1px solid #e5e5e5;

      image {
        width: 140rpx;
        height: 140rpx;
        border-radius: 16rpx;
      }

      .title {
        padding-top: 15rpx;
        font-size: 30rpx;
        font-weight: bold;
      }

      .desc {
        padding: 10rpx 0;
        color: #666;
      }

      .stars {
        display: flex;
        align-items: center;
        justify-content: center;
        padding-bottom: 40rpx;

        .uni-icons {
          color: #ffca3e !important;
        }

        view {
          padding-left: 10rpx;
        }
      }

      .version, .dev {
        color: #666;
      }

      .tools {
        padding: 10rpx 0 20rpx 0;

        text {
          margin: 0 10rpx;

          &:nth-child(2) {
            padding: 0 20rpx;
            border-left: 1px solid #e5e5e5;
            border-right: 1px solid #e5e5e5;
          }
        }
      }
    }

    &_foot {
      margin: 0 20rpx;
      padding: 20rpx 0;

      .btn {
        display: flex;
        flex-direction: row;
        padding: 30rpx 0;
        margin: auto;
        border-radius: 20rpx;
        justify-content: center;
        text-align: center;
        background: linear-gradient(90deg, $pbc, #609cff);
        color: #fff;
        //font-weight: bold;
        font-size: 30rpx;
      }


    }
  }
}


.fullscreen-popup {
  display: flex;
  flex-direction: column;
  background: url("/static/images/common/downAppBg.png");
  background-size: cover; /* 使背景图片自动适应容器大小 */
  background-position: center; /* 使图片居中对齐 */
  background-repeat: no-repeat; /* 禁止图片重复 */
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  justify-content: end;
  align-items: center;
  z-index: 9999;

}
.btn-div{
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100vw;
	position: absolute;
	bottom: 100rpx;
}
.close {
  margin-top: 50rpx;
  margin-bottom: 100rpx;
  background-color: white;
  padding: 30rpx 100rpx;
  border-radius: 20rpx;
  display: flex;
  width: 70%;
  flex-direction: row;
  align-items: center;
  justify-items: center;
  justify-content: center;
  color: #000
}
.download {
  width: 70%;
  color: white;
  background: linear-gradient($btn-linear-gradient-orange-color-1 0%, $btn-linear-gradient-orange-color-2);
  padding: 30rpx 100rpx;
  border-radius: 20rpx;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-items: center;
  justify-content: center;
}

</style>