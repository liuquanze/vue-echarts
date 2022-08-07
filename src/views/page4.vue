<template>
  <div class="page2">
    <Row class='content'>
      <Col span="8">
        <div class="list">
          <div class="left">
            <span class='title'><span class="title-4">采集信息01</span></span>

            echarts表1
          </div>
        </div>
        <div class="list">
          <div class="left">
            <span class='title'><span class="title-8">采集信息02</span></span>

            echarts表2
          </div>
        </div>

      </Col>
      <Col span="8" >
      中心位置：显示网络拓扑
      </Col>
      <Col span="8">
        <div class="list">
          <div class="right">
            <span class='title'><span class="title-4">采集信息03</span></span>


            echarts表3
          </div>
        </div>
        <div class="list">
          <div class="right">
            <span class='title'><span class="title-8">采集信息04</span></span>

            echarts表4
          </div>
        </div>

      </Col>
    </Row>
    <Row class="bottom-list">
      <Col span="16">
        <div class="list">
          <div class="bottom">
            <span class='title'><span class="title-10">采集信息05</span></span>

            echarts表5
          </div>
        </div>
        <div class="list">
          <div class="bottom">
            <span class='title'><span class="title-10">采集信息06</span></span>

            echarts表6
          </div>
        </div>
        <div class="list">
          <div class="bottom">
            <span class='title'><span class="title-10">采集信息07</span></span>

            echarts表7
          </div>
        </div>
      </Col>
      <Col span="8">
        <div class="list right-bottom">
          <div class="bottom bottom1">
            <span class='title'><span class="title-10">采集信息08</span></span>

            echarts表8
          </div>
        </div>
      </Col>
    </Row>
  </div>
</template>


<script>

export default {
  name: 'page4',
  props: ['selectRangeDate'],
  components: {

  },
  data() {
    return {
      everyPer: 0,
      xOffset: 0,
      circle: {
        x: 250,
        y: 250,
        radius: 218
      },
      title: [],
      configData2: {
        data: []
      },
      warea: {x: 250, y: 250, max: 700},
      dots: [],
      resizeFn: null,
      animationFrame1:null,
      animationFrame2: null,
      centerBox: {
        width: 0,
        height: 0
      }
    }
  },
  methods: {
  },

  mounted() {

  },
  beforeDestroy() {

  }
}
</script>

<style lang="less" scoped>
.page2 {
  height: 100%;
  width: 100%;
  padding: 14px 20px 20px;
  background: #F8F8FF;
  overflow: hidden;

  .content {
    height: 65%;

    .ivu-col {
      height: 100%;
    }

    .circlePie {
      height: 100%;
      padding: 0 0 40px;
      text-align: center;
      position: relative;

      canvas {
        position: absolute;
        left: 50%;
        top: 0;
        transform: translate(-50%, 0);
      }

      #dot {
        background: rgba(0, 0, 0, 0);
      }
    }

    .list {
      height: 48%;
//边框
      .left, .right {
        background: #FFFFFF;
      }

      .left, .right, .center {

        //box-shadow:inset 0px 15px 10px -15px #000;
        //box-shadow:
        //      -4px -2px 4px 0px #fff,
        //    4px 2px 8px 0px #d1d9e6;

        //box-shadow:0px 0px 10px #000;
        box-shadow:inset 2px 2px 5px #000;
        width: 100%;
        height: 90%;

        position: relative;
        background: #FFFFFF;
        border-radius: 20px;


        #left1, #left2, #left3, #right1, #right2, #right3, #center2 {
          height: 100%;
        }

        .chart-68 {
          width: 68%;
          height: 100%;
          float: left;
        }

        .chart-32 {
          width: 32%;
          height: 100%;
          float: left;
        }
      }
    }
  }

  .bottom-list {
    height: 35%;

    .ivu-col {
      height: 100%;

      .list {
        height: 100%;
        width: 33.3333%;
        padding-right: 1.5%;
        float: left;

        #bottom_4 {
          padding: 0 20px;
        }

        .bottom {
          width: 100%;
          height: 100%;
          box-shadow:inset 2px 2px 5px #000;
          background: #FFFFFF;
          position: relative;
          border-radius: 5px;
          //box-shadow:inset 0px 15px 10px -15px #000;
        }
      }

      .right-bottom {
        width: 100%;
        padding-right: 0;

        .bottom1 {
          width: 100%;
        }
      }
    }
  }

}
</style>
