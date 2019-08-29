// miniprogram/pages/page6/page6.js
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

      onInit: function(canvas, width, height) {

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

  getMarkDatas: function(name) {
    var getres;
    db.collection('Mark').where({
      姓名: name // 填入当前用户 openid
    }).get().then(res => {
      getres = new Array(res.data.length);
      for(var i=0;i<res.data.length;i++){
        getres[i] = new Array(6)
        getres[i][0] = res.data[i]["_id"];
        getres[i][1] = res.data[i]["姓名"];
        getres[i][2] = res.data[i]["日期"];
        getres[i][3] = res.data[i]["素描"];
        getres[i][4] = res.data[i]["色彩"];
        getres[i][5] = res.data[i]["速写"];
      }
    })
    return getres;
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
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
  onReady: function() {

  },

  init_echarts: function() {

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

  setOption: function(Chart) {

    Chart.clear(); // 清除

    Chart.setOption(this.getOption()); //获取新数据

  },

  // 图表配置项

  getOption() {
    var zzr = this.getMarkDatas('卓宗儒');

    var self = this;

    var option = {

      title: { //标题

        text: '折线图',

        left: 'left',

      },

      renderAsImage: true, //支持渲染为图片模式

      color: ["#FFC34F", "#FF6D60", "#44B2FB"], //图例图标颜色

      legend: {

        show: true,

        itemGap: 25, //每个图例间的间隔

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

        left: 30,

        top: 100,

        containLabel: true, //grid 区域是否包含坐标轴的刻度标签

      },

      dataZoom: [{
        type: 'slider',
        show: true, //flase直接隐藏图形
        xAxisIndex: [0],
        left: '15%', //滚动条靠左侧的百分比
        top: '90%',
        bottom: '5%',
        start: 25, //滚动条的起始位置
        end: 75 //滚动条的截止位置（按比例分割你的柱状图x轴长度）
      }],

      xAxis: { //横坐标

        type: 'category',

        name: '日期', //横坐标名称

        nameTextStyle: { //在name值存在下，设置name的样式

          color: 'red',

          fontStyle: 'normal'

        },

        nameLocation: 'end',

        splitLine: { //坐标轴在 grid 区域中的分隔线。

          show: true,

          lineStyle: {

            type: 'dashed'

          }

        },

        boundaryGap: false, //1.true 数据点在2个刻度直接  2.fals 数据点在分割线上，即刻度值上

        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日', 'a', 'b', 'c', 'd', 'e'],

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

          formatter: function(value) {

            var xLable = [];

            if (value == 20) {

              xLable.push('0');

            }

            if (value == 40) {

              xLable.push('20');

            }

            if (value == 60) {

              xLable.push('40');

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

        data: [18, 36, 65, 30, 78, 40, 33],

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

        data: [12, 50, 51, 35, 70, 30, 20],

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

        data: [10, 30, 31, 50, 40, 20, 10],

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
  onShow: function() {

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