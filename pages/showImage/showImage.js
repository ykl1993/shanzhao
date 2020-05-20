
Page({
  onLoad: function (options) {
    var that = this
    const shareId = options.shareId
    console.log(options);
    console.log("你好");
    // 从分享的页面跳过来,调用后台去取模糊的图片
    wx.request({
      url: 'https://www.yingkailing.com/shanzhao/share/getImagePath',
      data: {
        shareId: shareId
      },
      method: 'POST',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        debugger
        console.log(res.data);
        console.log(res.data.data.imageUrl);
        that.setData({
          shareId: res.data.data.shareId,
          imageGaoQin: res.data.data.imageUrl,
          imageMoHu: res.data.data.imageMoHuUrl,
          sliderValue: res.data.data.timeNumber,
          status: res.data.data.status,
          imageInfo: res.data.data.imageMoHuUrl
        })
      },
      fail: function (res) {
        console.log("--------fail--------");
      }
    })
  },

  data: {
    mohudu:"6px",
    imageInfo: "../resource/images/dsp.jpg",
    sliderValue: 1,    // 默认1
    status: 1,     // 1 允许客户看图片, 0, 销毁图片
    imageMoHu: "",   // 显示模糊的图片
    imageGaoQin: "", // 存在清晰图片
  },
  slider3change : function(e) {
    console.log(e);
    console.log(e.detail.value);
  },
  // 登录  
  doLogin: function (e) {
    console.log(e);
    console.log(e.detail.userInfo)
    console.log(e.detail.rawData)
  },
  handleTouchStart: function (e) {
    console.log("字体长按中....")
    var that = this
    this.setData({
      showView: false
    })
  },
  handleLongPress: function (e) {
    console.log("长按中....")
    var that = this
    this.setData({
      mohudu: '0px',
      imageInfo: that.data.imageGaoQin
    })
  },
  handleTouchEnd: function (e) {
    console.log("释放按钮了....")
    var that = this
    this.setData({
      mohudu: '6px',
      showView: true,
      imageInfo: that.data.imageMoHu
    })
  },
  onShareAppMessage: function () {
    return {
      title: '您的好友给您分享了一张闪照,快来瞧瞧吧',
      path: 'pages/index/index',
      imageUrl: this.data.imageInfo,
      success: (res) => {
        // 分享成功
      },
      fail: (res) => {
        // 分享失败
      }
    }
  }

  
})