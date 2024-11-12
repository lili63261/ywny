<template>
  <uni-popup
    ref="uniPopup"
    background-color="transparent"
    type="center"
    @maskClick="$emit('maskClick')"
    :mask-click="false"
    style="z-index: 99999">
    <view class="popup">
      <view class="popup-head">
        <view class="popup-head-title flex-l-v">
          <view class="popup-head-title-text">{{ title }}</view>
        </view>
      </view>
      <view class="popup-note-image">
        <image src="/static/images/epcotImg/popup/popup-note.png" mode="widthFix" />
      </view>
      <view class="popup-content">
        <slot></slot>
      </view>
      <view class="popup-footer">
        <view class="popup-footer-btn">{{ closeBtnText }}</view>
      </view>
    </view>
  </uni-popup>
</template>
<script>
export default{
  props:{
    type: {
      type: String,
      default: 'confirm'
    },
    title: {
      type: String,
      default: '公告'
    },
    closeBtnText:{
      type: String,
      default: '关闭'
    }
  },
  methods:{
    open(){
      this.$refs['uniPopup'].open()
    },
    close(){
      this.$refs['uniPopup'].close();
    }
  }
}
</script>
<style lang="scss" scoped>
.popup{
  background-color: #fff;
  width: 90%;
  min-height: 330rpx;
  border-radius: 24rpx;
  position: relative;
  &-head{
    width: 330rpx;
    height: 330rpx;
    border-radius: 50%;
    background-color: #fff;
    position: absolute;
    top: -30%;
    left: 50%;
    transform: translate(-50%,0);
    &-title{
      // display: flex;
      // justify-content: flex-end;
      &-text{
        font-size: 30rpx;
        display: block;
        width: 140rpx;
        height: 60rpx;
        line-height: 60rpx;
        background: url(/static/images/epcotImg/popup/title-bg.png) no-repeat;
        background-size: cover;
        border-radius: 30rpx;
        color: #fff;
        text-align: center;
      }
    }
  }
  &-note-image{
    width: 220rpx;
    height: 220rpx;
    position: absolute;
    left: 146rpx;
    top: -41rpx;
    image{
      width: 100%;
      height: 100%;
    }
  }
}
</style>