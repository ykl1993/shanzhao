
Page({

  data: {
    mohudu:"6px",
    imageInfo: "../resource/images/dsp.jpg",
    showView: true,
    shareId: '',
    sliderValue: 1,    // 默认1
    status: 1,     // 1 允许客户看图片, 0, 销毁图片
    imageMoHu: "",   // 显示模糊的图片
    imageGaoQin: "", // 存在清晰图片
  },
  slider3change : function(e) {
    console.log(e);
    console.log(e.detail.value);
    var that = this
    that.data.sliderValue = e.detail.value
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
        wx.uploadFile({
          url: 'https://www.yingkailing.com/shanzhao/share/uploadImage', //仅为示例，非真实的接口地址
          filePath: tempFilePaths[0],
          name: 'file',
          formData: {
            'sliderValue': that.data.sliderValue
          },
          success(res) {
            debugger
            const data = res.data
            const imageMap = JSON.parse(data);
            that.setData({
              imageInfo: imageMap.data.imageUrl,
              shareId: imageMap.data.shareId,
              status: imageMap.data.status,
              imageGaoQin: imageMap.data.imageUrl,
              imageMoHu: imageMap.data.imageMoHuUrl
            })
            // that.data.shareId = imageMap.data.shareId
            // that.data.status = imageMap.data.status
            // that.data.imageInfo = imageMap.data.imageUrl

            //do something
          }
        })

        // 选择图片成功时, 调用后台请求
        // wx.request({
        //   url: 'http://127.0.0.1:8098/shanzhao/share/updateStatus',
        //   data: {
        //     username: 'admin',
        //     password: 'admin'
        //   },
        //   method: 'POST',
        //   header: {
        //     'content-type': 'application/json'
        //   },
        //   success: function (res) {
        //     console.log(res.data);
        //     that.data.shareId = res.data.shareId
        //   },
        //   fail: function (res) {
        //     console.log("--------fail--------");
        //   }
        // })
        
      }
    })
  },
  fail: function (res) {
    console.log(res.errMsg)
  },
  handleTouchStart : function(e) {
    console.log("字体长按中....")
    var that = this
    this.setData({
      showView:  false
    })
  },
  handleLongPress : function(e) {
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
    var that = this
    var shareId = that.data.shareId
    return {
      title: '您的好友给您分享了一张闪照,快来瞧瞧吧',
      path: 'pages/showImage/showImage?shareId=' + shareId,
      imageUrl: this.data.imageMoHu,
      success: (res) => {
        // 分享成功
        console.log("分享成功" + res)
      },
      fail: (res) => {
        // 分享失败
        console.log("分享失败" + res)
      }
    }
  }

  
})