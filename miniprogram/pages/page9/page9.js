// miniprogram/pages/page9/page9.js 
import * as echarts from '../../ec-canvas/echarts';

var Chart = null;

const app = getApp();

const db = wx.cloud.database()

Page({

  /** 
   * 页面的初始数据 
   */
  data: {
    ec: {

      onInit: function (canvas, width, height) {

        chart = echarts.init(canvas, null, {

          width: width,

          height: height

        });

        canvas.setChart(chart);

        return chart;

      },

      lazyLoad: true // 延迟加载 

    },
  },

  /** 
   * 生命周期函数--监听页面加载 
   */
  onLoad: function (options) {
    this.echartsComponnet = this.selectComponent('#mychart');

    //如果是第一次绘制 

    if (!Chart) {

      this.init_echarts(); //初始化图表 

    } else {

      this.setOption(Chart); //更新数据 

    }
  },

  /** 
   * 生命周期函数--监听页面初次渲染完成 
   */
  onReady: function () {

  },

  init_echarts: function () {

    this.echartsComponnet.init((canvas, width, height) => {

      // 初始化图表 

      const Chart = echarts.init(canvas, null, {

        width: width,

        height: height

      });

      this.setOption(Chart)

      // 注意这里一定要返回 chart 实例，否则会影响事件处理等 

      return Chart;

    });

  },

  setOption: function (Chart) {

    Chart.clear(); // 清除 

    Chart.setOption(this.getOption()); //获取新数据 

  },

  // 图表配置项 

  getOption() {
    var getData = wx.getStorageSync("MarkDatas");

    var self = this;

    var option = {

      title: { //标题 

        text: '折线图',

        left: 'left',

        top: 3

      },

      renderAsImage: true, //支持渲染为图片模式 

      color: ["#FFC34F", "#FF6D60", "#44B2FB"], //图例图标颜色 

      legend: {

        show: true,

        itemGap: 15, //每个图例间的间隔 

        left: 40,

        top: 30,

        x: 30, //水平安放位置,离容器左侧的距离  'left' 

        z: 100,

        textStyle: {

          color: '#383838'

        },

        data: [ //图例具体内容 

          {

            name: '素描', //图例名字 

            textStyle: { //图例文本样式 

              fontSize: 13,

              color: '#383838'

            },

            icon: 'roundRect' //图例项的 icon，可以是图片 

          },

          {

            name: '速写',

            textStyle: {

              fontSize: 13,

              color: '#383838'

            },

            icon: 'roundRect'

          },

          {

            name: '色彩',

            textStyle: {

              fontSize: 13,

              color: '#383838'

            },

            icon: 'roundRect'

          }

        ]

      },

      grid: { //网格 

        left: 13,

        top: 80,

        bottom: 30,

        right: 40,

        containLabel: true, //grid 区域是否包含坐标轴的刻度标签 

      },

      dataZoom: [{
        type: 'slider',
        show: true, //flase直接隐藏图形 
        xAxisIndex: [0],
        left: '13%', //滚动条靠左侧的百分比 
        top: '90%',
        bottom: '5%',
        start: 75, //滚动条的起始位置 
        end: 100 //滚动条的截止位置（按比例分割你的柱状图x轴长度） 
      }],

      xAxis: { //横坐标 

        type: 'category',

        name: '日期', //横坐标名称 

        nameTextStyle: { //在name值存在下，设置name的样式 

          color: 'red',

          fontStyle: 'normal'

        },

        nameLocation: 'end',

        nameGap: 5,

        splitLine: { //坐标轴在 grid 区域中的分隔线。 

          show: true,

          lineStyle: {

            type: 'dashed'

          }

        },

        boundaryGap: false, //1.true 数据点在2个刻度直接  2.fals 数据点在分割线上，即刻度值上 

        data: getData[2],

        axisLabel: {

          textStyle: {

            fontSize: 13,

            color: '#5D5D5D'

          }

        }

      },

      yAxis: { //纵坐标 

        type: 'value',

        position: 'left',

        name: '分数', //纵坐标名称 

        nameGap: 8,

        nameTextStyle: { //在name值存在下，设置name的样式 

          color: 'red',

          fontStyle: 'normal'

        },

        splitNumber: 5, //坐标轴的分割段数 

        splitLine: { //坐标轴在 grid 区域中的分隔线。 

          show: true,

          lineStyle: {

            type: 'dashed'

          }

        },

        axisLabel: { //坐标轴刻度标签 

          formatter: function (value) {

            var xLable = [];

            if (value == 0) {

              xLable.push('0');

            }

            if (value == 20) {

              xLable.push('20');

            }

            if (value == 40) {

              xLable.push('40');

            }

            if (value == 60) {

              xLable.push('60');

            }

            if (value == 80) {

              xLable.push('80');

            }

            if (value == 100) {

              xLable.push('100');

            }

            return xLable

          },

          textStyle: {

            fontSize: 13,

            color: '#5D5D5D',

          }

        },

        min: 0,

        max: 100,

      },

      series: [{

        name: '素描',

        type: 'line',

        data: getData[3],

        symbol: 'none',

        itemStyle: {

          normal: {

            lineStyle: {

              color: '#FFC34F'

            }

          }

        }

      }, {

        name: '速写',

        type: 'line',

          data: getData[5],

        // data: ["80", "20", "50", "70", "80", "60", "70"], 

        symbol: 'none',

        itemStyle: {

          normal: {

            lineStyle: {

              color: '#FF6D60'

            }

          }

        }

      }, {

        name: '色彩',

        type: 'line',

          data: getData[4],

        // data: ["50", "30", "40", "70", "90", "30", "20"], 

        symbol: 'none',

        itemStyle: {

          normal: {

            lineStyle: {

              color: '#44B2FB'

            }

          }

        }

      }],

    }

    return option;

  },

  /** 
   * 生命周期函数--监听页面显示 
   */
  onShow: function () {

  },

  /** 
   * 生命周期函数--监听页面隐藏 
   */
  onHide: function () {

  },

  /** 
   * 生命周期函数--监听页面卸载 
   */
  onUnload: function () {

  },

  /** 
   * 页面相关事件处理函数--监听用户下拉动作 
   */
  onPullDownRefresh: function () {

  },

  /** 
   * 页面上拉触底事件的处理函数 
   */
  onReachBottom: function () {

  },

  /** 
   * 用户点击右上角分享 
   */
  onShareAppMessage: function () {

  }
})