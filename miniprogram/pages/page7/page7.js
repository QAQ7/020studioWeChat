// miniprogram/pages/page7/page7.js
import * as echarts from '../../ec-canvas/echarts';

var Chart = null;

const app = getApp();

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
    var self = this;
    var data = wx.getStorageSync("MarkDatas");
    console.log(data);

    var option = {
      title: {
        top: 30,
        text: '2016年某人每天的步数',
        subtext: '数据纯属虚构',
        left: 'center',
        textStyle: {
          color: '#fff'
        }
      },
      tooltip: {
        trigger: 'item'
      },
      legend: {
        top: '30',
        left: '100',
        data: ['步数', 'Top 12'],
        textStyle: {
          color: '#fff'
        }
      },
      calendar: [{
        top: 100,
        left: 'center',
        range: ['2016-01-01', '2016-06-30'],
        splitLine: {
          show: true,
          lineStyle: {
            color: '#000',
            width: 4,
            type: 'solid'
          }
        },
        yearLabel: {
          formatter: '{start}  1st',
          textStyle: {
            color: '#fff'
          }
        },
        itemStyle: {
          normal: {
            color: '#323c48',
            borderWidth: 1,
            borderColor: '#111'
          }
        }
      }, {
        top: 340,
        left: 'center',
        range: ['2016-07-01', '2016-12-31'],
        splitLine: {
          show: true,
          lineStyle: {
            color: '#000',
            width: 4,
            type: 'solid'
          }
        },
        yearLabel: {
          formatter: '{start}  2nd',
          textStyle: {
            color: '#fff'
          }
        },
        itemStyle: {
          normal: {
            color: '#323c48',
            borderWidth: 1,
            borderColor: '#111'
          }
        }
      }],
      series: [{
          name: '步数',
          type: 'scatter',
          coordinateSystem: 'calendar',
          data: data,
          itemStyle: {
            normal: {
              color: '#ddb926'
            }
          }
        },
        {
          name: '步数',
          type: 'scatter',
          coordinateSystem: 'calendar',
          calendarIndex: 1,
          itemStyle: {
            normal: {
              color: '#ddb926'
            }
          }
        },
        {
          name: 'Top 12',
          type: 'effectScatter',
          coordinateSystem: 'calendar',
          calendarIndex: 1,
          data,
          showEffectOn: 'render',
          rippleEffect: {
            brushType: 'stroke'
          },
          hoverAnimation: true,
          itemStyle: {
            normal: {
              color: '#f4e925',
              shadowBlur: 10,
              shadowColor: '#333'
            }
          },
          zlevel: 1
        },
        {
          name: 'Top 12',
          type: 'effectScatter',
          coordinateSystem: 'calendar',
          showEffectOn: 'render',
          rippleEffect: {
            brushType: 'stroke'
          },
          hoverAnimation: true,
          itemStyle: {
            normal: {
              color: '#f4e925',
              shadowBlur: 10,
              shadowColor: '#333'
            }
          },
          zlevel: 1
        }
      ]
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