<template>
    <div class="doubleLine"></div>
</template>

<script>
export default {
    name: '',
    props: ['xAxis', 'yAxis'],
    data() {
        return {}
    },
    methods: {
        setChart(xAxis, yAxis) {
            let option = {
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    left: "11%",
                    top: "10%",
                    itemWidth: 7,
                    itemHeight: 7,
                    textStyle: {
                        color: '#5CB1C1',
                        fontSize: 10
                    }
                },
                grid: {
                    top: '12%',
                    left: '10%',
                    right: '10%',
                    bottom: '10%',
                    containLabel: false
                },

                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    axisLine: {
                        symbol: ['none', 'arrow'],
                        symbolSize: [6, 6],
                        symbolOffset: [0, 10],
                        lineStyle: {
                            color: '#122C49'
                        }
                    },
                    axisTick: {show: false},
                    axisLabel: {
                        color: '#61B9C8',
                        fontSize: 9
                    },
                    data: xAxis
                },
                yAxis: [
                    {//y1轴
                        type: 'value',
                        scale: true,
                        max: 50,
                        min: 0,
                        interval: 5,//y间隔数
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
                            fontSize: 9
                        },
                        name: '(个)',
                        nameGap: -10,
                        nameTextStyle: {
                            color: '#61B9C8',
                            fontSize: 9,
                            align: 'right',
                            padding: [0, 6, 0, 0]
                        },
                        splitLine: {
                            show: false,
                        },
                    },
                    // {
                    //     type: 'value',
                    //     scale: true,
                    //     max: 400,
                    //     min: 0,
                    //     axisLine: {
                    //         symbol: ['none', 'arrow'],
                    //         symbolSize: [6, 6],
                    //         lineStyle: {
                    //             color: '#122C49'
                    //         }
                    //     },
                    //     axisLabel: {
                    //         color: '#61B9C8',
                    //         showMaxLabel: false,
                    //         fontSize: 9
                    //     },
                    //     name: '(个)',
                    //     nameGap: -10,
                    //     nameTextStyle: {
                    //         color: '#61B9C8',
                    //         fontSize: 9,
                    //         align: 'left',
                    //         padding: [0, 0, 0, 6]
                    //     },
                    //     interval: 50,
                    //     splitLine: {
                    //         show: false,
                    //     },
                    // }
                ],
                series: [
                    {
                        name: '流规则数目',
                        type: 'line',
                        smooth: true,
                        symbol: 'none',
                        lineStyle: {
                            color: '#F39800',
                        },
                        itemStyle: {
                            color: '#F39800'
                        },
                        data: yAxis
                    },
                    // {
                    //     name: '违规人数',
                    //     yAxisIndex: 1,
                    //     type: 'line',
                    //     smooth: true,
                    //     symbol: 'none',
                    //     lineStyle: {
                    //         color: '#BF232A',
                    //
                    //     },
                    //     itemStyle: {
                    //         color: '#BF232A'
                    //     },
                    //     data: [330, 310, 132, 100, 300, 90, 230]
                    // },
                ]
            };
            let myChart = this.$echarts(this.$el);

            //没有动画效果会好看一点
            //myChart.clear();
            myChart.resize()
            myChart.setOption(option);
        }
    },
    mounted() {
        this.setChart(this.xAxis, this.yAxis)
    },
    watch: {
     xAxis(newVal) {
       this.setChart(newVal, this.yAxis)
     },
     yAxis(newVal) {
       this.setChart(this.xAxis, newVal)
     },
   }

}
</script>

<style lang="less" scoped>
.doubleLine {
    height: 100%;
    width: 100%;
}
</style>
