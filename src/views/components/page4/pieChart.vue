<template>
  <div class="pieChart"></div>
</template>

<script>
export default {
  name: '',
  props: ['pie_data','packet_count_total'],
  data() {
    return {}
  },
  methods: {
    setChart() {
      let option = {
        title: {
          // text: '',
          subtext: 'Packet_in总数：'+this.packet_count_total,
          left: 'center'
        },
        tooltip: {
          trigger: 'item'
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
          orient: 'vertical',
          left: 'left'
        },
        series: [
          {
            name: 'Packet-in 数量',
            type: 'pie',
            radius: '50%',
            data: this.pie_data,

            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)',

              }
            },
            itemStyle: {
              normal: {
                label:{
                  show:true,
                  formatter: '{d}%' //只要百分比

                },
                color: function (colors) {
                  var colorList = [
                    '#f9c956',
                    '#75bedc',
                    '#ef6567',
                    '#fc8251',
                    '#5470c6',
                    '#91cd77',
                  ];
                  return colorList[colors.dataIndex];
                }
              },
            }
          },
        ]
      };
      let myChart = this.$echarts(this.$el);

      myChart.clear();
      myChart.resize()
      myChart.setOption(option);
    }
  },
  mounted() {
    this.setChart()
  },
  watch:{
    pie_data(newVal){
      this.setChart(newVal,this.packet_count_total)
    },
    packet_count_total(newVal){
      this.setChart(this.pie_data,newVal)
    }

  }
}
</script>

<style lang="less" scoped>
.pieChart {
  height: 100%;
  width: 90%;
  //padding: 0 20px;
  //background-color: greenyellow;
  padding-top: 35px;
  padding-left: 20px;
}
</style>