<template>
  <div class="barChart"></div>
</template>

<script>
export default {
  name: '',
  props: ['xAxis', 'y1Axis', 'y2Axis'],
  data() {
    return {}
  },
  methods: {
    setChart(xAxis, y1Axis, y2Axis) {
      let option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            crossStyle: {
              color: '#999'
            }
          }
        },
        toolbox: {
          feature: {
            dataView: {show: true, readOnly: false},
            // magicType: {show: true, type: ['bar']},
            // restore: {show: true},
            // saveAsImage: {show: true}
          }
        },
        legend: {
          data: ['packet_count', 'flow_count'],
          left: "11%",
          top: "15%",
          itemWidth: 7,
          itemHeight: 7,
        },
        xAxis: [
          {
            type: 'category',
            boundaryGap: true,
            axisLine: {
              symbol: ['none', 'arrow'],
              symbolSize: [6, 6],
              symbolOffset: [0, 10],
              lineStyle: {
                color: '#122C49'
              }
            },
            splitLine: {
              show:false
            },

            axisTick: {show: false},
            axisLabel: {
              color: '#61B9C8',
              fontSize: 10,
              interval: 0,
            },
            data: xAxis
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: 'packet',
            min: 0,
            max: 10000,
            interval: 2000,
            // axisLabel: {
            //   formatter: '{value}个'
            // }
            axisLine: {
              // symbol: ['none', 'arrow'],
              symbolSize: [6, 6],
              lineStyle: {
                color: '#122C49'
              }
            },
            axisLabel: {
              color: '#61B9C8',
              showMaxLabel: false,
              fontSize: 10
            },

            splitLine:{//去除网格线
              show:false
            }

          },
          {
            type: 'value',
            name: 'flow',
            min: 0,
            max: 100,
            interval: 20,
            // axisLabel: {
            //   formatter: '{value}条'
            // }
            axisLine: {
              symbol: ['none', 'arrow'],
              symbolSize: [6, 6],
              lineStyle: {
                color: '#122C49'
              }
            },
            axisLabel: {
              color: '#61B9C8',
              showMaxLabel: false,
              fontSize: 10
            },

            splitLine:{//去除网格线
              show:false
            }
          }
        ],
        series: [
          {
            name: 'packet_count',
            type: 'bar',
            tooltip: {
              valueFormatter: function (value) {
                return value + '个';
              }
            },
            barWidth: 12,
            barCategoryGap: 10,
            itemStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [{
                  offset: 0, color: '#ff9f2e' // 0% 处的颜色
                },
                  {
                    offset: 0.4, color: '#f9bd14' // 40% 处的颜色
                  }, {
                    offset: 1, color: '#ff9f2e' // 100% 处的颜色
                  }],
                global: false // 缺省为 false
              } //背景渐变色
            },
            data: y1Axis
          },
          {
            name: 'flow_count',
            type: 'bar',
            yAxisIndex: 1,
            tooltip: {
              valueFormatter: function (value) {
                return value + '条';
              }
            },
            barWidth: 12,
            barCategoryGap: 10,
            itemStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [{
                  offset: 0, color: '#50A2F6' // 0% 处的颜色
                },
                  {
                    offset: 0.4, color: '#9490F9' // 40% 处的颜色
                  }, {
                    offset: 1, color: '#DF7DFD' // 100% 处的颜色
                  }],
                global: false // 缺省为 false
              } //背景渐变色
            },
            data: y2Axis
          },

        ]
      };
      // let option = {
      //   tooltip: {
      //     trigger: 'axis',
      //     axisPointer: {            // 坐标轴指示器，坐标轴触发有效
      //       type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
      //     },
      //     backgroundColor: '#11367a',
      //     textStyle: {
      //       color: '#6dd0e3',
      //       fontSize: 10,
      //     },
      //   },
      //   legend: {
      //     data:['数据包','flow'],
      //     left: "11%",
      //     top: "15%",
      //     itemWidth: 7,
      //     itemHeight: 7,
      //     textStyle: {
      //       color: '#5CB1C1',
      //     }
      //   },
      //   grid: {
      //     top: '12%',
      //     bottom: '12%',
      //     left: "10%",
      //     right: '10%',
      //     containLabel: false
      //   },
      //   xAxis: [
      //     {
      //       type: 'category',
      //       boundaryGap: true,
      //       axisLine: {
      //         symbol: ['none', 'arrow'],
      //         symbolSize: [6, 6],
      //         symbolOffset: [0, 10],
      //         lineStyle: {
      //           color: '#122C49'
      //         }
      //       },
      //       // splitLine: {
      //       //   lineStyle: {
      //       //     color: "#355b68"
      //       //   }
      //       // },
      //
      //       axisTick: {show: false},
      //       axisLabel: {
      //         color: '#61B9C8',
      //         fontSize: 10,
      //         interval: 0,
      //       },
      //       data: xAxis
      //     }
      //   ],
      //   yAxis: [
      //     {
      //       type: 'value',
      //       scale: true,
      //       max: 10000,
      //       min: 0,
      //       interval: 2000,
      //       axisLine: {
      //         symbol: ['none', 'arrow'],
      //         symbolSize: [6, 6],
      //         lineStyle: {
      //           color: '#122C49'
      //         }
      //       },
      //       axisLabel: {
      //         color: '#61B9C8',
      //         showMaxLabel: false,
      //         fontSize: 10
      //       },
      //       splitLine: {
      //         show: false,
      //       },
      //       name: '(个)',
      //       nameGap: -5,
      //       nameTextStyle: {
      //         color: '#61B9C8',
      //         fontSize: 9,
      //         align: 'right',
      //         padding: [0, 4, 0, 0]
      //       },
      //
      //
      //     },
      //     {
      //       type: 'value',
      //       scale: true,
      //       max: 100,
      //       min: 0,
      //       interval: 50,
      //       axisLine: {
      //         symbol: ['none', 'arrow'],
      //         symbolSize: [6, 6],
      //         lineStyle: {
      //           color: '#122C49'
      //         }
      //       },
      //       axisLabel: {
      //         color: '#61B9C8',
      //         showMaxLabel: false,
      //         fontSize: 10
      //       },
      //       splitLine: {
      //         show: false,
      //       },
      //       name: '(个)',
      //       nameGap: -5,
      //       nameTextStyle: {
      //         color: '#61B9C8',
      //         fontSize: 9,
      //         align: 'right',
      //         padding: [0, 4, 0, 0]
      //       },
      //
      //
      //     }
      //
      //   ],
      //   series: [
      //     {
      //       name: 'packet_count',
      //       type: 'bar',
      //       itemStyle: {
      //         color: {
      //           type: 'linear',
      //           x: 0,
      //           y: 0,
      //           x2: 0,
      //           y2: 1,
      //           colorStops: [{
      //             offset: 0, color: '#ff9f2e' // 0% 处的颜色
      //           },
      //             {
      //               offset: 0.4, color: '#f9bd14' // 40% 处的颜色
      //             }, {
      //               offset: 1, color: '#ff9f2e' // 100% 处的颜色
      //             }],
      //           global: false // 缺省为 false
      //         } //背景渐变色
      //       },
      //       barWidth: 12,
      //       barCategoryGap: 10,
      //       data: y1Axis
      //     },
      //     {
      //       name: 'flow_count',
      //       type: 'bar',
      //       itemStyle: {
      //         color: {
      //           type: 'linear',
      //           x: 0,
      //           y: 0,
      //           x2: 0,
      //           y2: 1,
      //           colorStops: [{
      //             offset: 0, color: '#50A2F6' // 0% 处的颜色
      //           },
      //             {
      //               offset: 0.4, color: '#9490F9' // 40% 处的颜色
      //             }, {
      //               offset: 1, color: '#DF7DFD' // 100% 处的颜色
      //             }],
      //           global: false // 缺省为 false
      //         } //背景渐变色
      //       },
      //       barWidth: 10,
      //       barCategoryGap: 10,
      //       data: y2Axis
      //     },
      //   ]
      // };
      let myChart = this.$echarts(this.$el);

      myChart.clear();
      myChart.resize()
      myChart.setOption(option, true);
    }
  },
  mounted() {
    this.setChart(this.xAxis, this.y1Axis, this.y2Axis)
  },
  watch: {
    xAxis(newVal) {
      this.setChart(newVal, this.y1Axis, this.y2Axis)
    },
    y1Axis(newVal) {
      this.setChart(this.xAxis, newVal, this.y2Axis)
    },
    y2Axis(newVal) {
      this.setChart(this.xAxis, this.y1Axis, newVal)
    }

  }
}
</script>

<style lang="less" scoped>
.barChart {
  width: 100%;
  height: 100%;
}
</style>