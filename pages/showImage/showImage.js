
Page({
  data: {
    mohudu:"6px",
    imageInfo: "../resource/images/dsp.jpg"
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
  pic: function (options) {
    var that = this
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths
        console.log(tempFilePaths)
        that.setData({
          imageInfo : tempFilePaths[0]
        })
      }
    })
  },
  fail: function (res) {
    console.log(res.errMsg)
  },
  handleLongPress : function(e) {
    console.log("长按中....")
    var that = this
    this.setData({
      mohudu: '0px'
    })
  },
  handleTouchEnd: function (e) {
    console.log("释放按钮了....")
    var that = this
    this.setData({
      mohudu: '6px'
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