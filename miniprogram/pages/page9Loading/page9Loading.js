// miniprogram/pages/page6Loading/page6Loading.js
var getData;
var markDatasCount;

const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    
  },

  async waitMarkDatas() {
    await this.getMarkDatasCount();
    for(var i=0;i<this.markDatasCount;i+=20){
      await this.getMarkDatasBlock("卓宗儒", i);
    }
    console.log(this.getData);
    wx.setStorageSync("MarkDatas", this.getData);
    wx.navigateTo({
      url: '/pages/page9/page9',
    })
  },

  getMarkDatasCount() {
    return db.collection('Mark').count().then(count => {
      this.markDatasCount = count.total;
      this.getData = new Array(6);
      this.getData[0] = new Array(count.total);
      this.getData[1] = new Array(count.total);
      this.getData[2] = new Array(count.total);
      this.getData[3] = new Array(count.total);
      this.getData[4] = new Array(count.total);
      this.getData[5] = new Array(count.total);
    })
  },

  getMarkDatasBlock(name, num) {
    return db.collection('Mark').skip(num).where({
      姓名: name // 填入当前用户 openid
    }).get().then(res => {
      console.log(res.data);
      for (var i = 0; i < res.data.length; i++) {
        this.getData[0][i + num] = res.data[i]["_id"];
        this.getData[1][i + num] = res.data[i]["姓名"];
        this.getData[2][i + num] = res.data[i]["日期"];
        this.getData[3][i + num] = res.data[i]["素描"];
        this.getData[4][i + num] = res.data[i]["色彩"];
        this.getData[5][i + num] = res.data[i]["速写"];
      }
      console.log(this.getData);
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.waitMarkDatas();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})