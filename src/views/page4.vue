<template>
  <div class="page2">
<!--    <Row class='content'>-->
<!--      <Col span="8">-->
<!--        <div class="list">-->
<!--          <div class="left">-->
<!--            <span class='title'><span class="title-4">（采集信息01）</span></span>-->

<!--            echarts表1-->
<!--          </div>-->
<!--        </div>-->
<!--        <div class="list">-->
<!--          <div class="left">-->
<!--            <span class='title'><span class="title-8">（采集信息02）</span></span>-->

<!--            echarts表2-->
<!--          </div>-->
<!--        </div>-->

<!--      </Col>-->
<!--      <Col span="8" >-->
<!--        <div class="list" style="height: 820px;">-->
<!--          <div class="left">-->
<!--            <span class='title'><span class="title-4">（拓扑信息）</span></span>-->
<!--&lt;!&ndash;            拓扑信息展示区域&ndash;&gt;-->
<!--            <div style="position: center;border-radius: 10px;">-->
<!--              <iframe src="https://www.meituan.com" style="height: 740px;width: 100%;border-radius: 10px;" ></iframe>-->
<!--&lt;!&ndash;              <p>{{this.ip}}</p>&ndash;&gt;-->
<!--&lt;!&ndash;              <p>{{this.port}}</p>&ndash;&gt;-->
<!--            </div>-->

<!--          </div>-->
<!--        </div>-->
<!--      </Col>-->
<!--      <Col span="8">-->
<!--        <div class="list">-->
<!--          <div class="right">-->
<!--            <span class='title'><span class="title-4">（采集信息03）</span></span>-->


<!--            echarts表3-->
<!--          </div>-->
<!--        </div>-->
<!--        <div class="list">-->
<!--          <div class="right">-->
<!--            <span class='title'><span class="title-8">（采集信息04）</span></span>-->

<!--            echarts表4-->
<!--          </div>-->
<!--        </div>-->

<!--      </Col>-->
<!--    </Row>-->
<!--&lt;!&ndash;    <Row class="bottom-list">&ndash;&gt;-->
<!--&lt;!&ndash;      <Col span="16">&ndash;&gt;-->
<!--&lt;!&ndash;        <div class="list">&ndash;&gt;-->
<!--&lt;!&ndash;          <div class="bottom">&ndash;&gt;-->
<!--&lt;!&ndash;            <span class='title'><span class="title-10">（采集信息05）</span></span>&ndash;&gt;-->

<!--&lt;!&ndash;            echarts表5&ndash;&gt;-->
<!--&lt;!&ndash;          </div>&ndash;&gt;-->
<!--&lt;!&ndash;        </div>&ndash;&gt;-->
<!--&lt;!&ndash;        <div class="list">&ndash;&gt;-->
<!--&lt;!&ndash;&lt;!&ndash;          <div class="bottom">&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;&lt;!&ndash;            <span class='title'><span class="title-10">（采集信息06）</span></span>&ndash;&gt;&ndash;&gt;-->

<!--&lt;!&ndash;&lt;!&ndash;            echarts表6&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;&lt;!&ndash;          </div>&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;        </div>&ndash;&gt;-->
<!--&lt;!&ndash;        <div class="list">&ndash;&gt;-->
<!--&lt;!&ndash;&lt;!&ndash;          <div class="bottom">&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;&lt;!&ndash;            <span class='title'><span class="title-10">（采集信息07）</span></span>&ndash;&gt;&ndash;&gt;-->

<!--&lt;!&ndash;&lt;!&ndash;            echarts表7&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;&lt;!&ndash;          </div>&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;        </div>&ndash;&gt;-->
<!--&lt;!&ndash;      </Col>&ndash;&gt;-->
<!--&lt;!&ndash;      <Col span="8">&ndash;&gt;-->
<!--&lt;!&ndash;        <div class="list right-bottom">&ndash;&gt;-->
<!--&lt;!&ndash;          <div class="bottom bottom1">&ndash;&gt;-->
<!--&lt;!&ndash;            <span class='title'><span class="title-10">（采集信息08）</span></span>&ndash;&gt;-->

<!--&lt;!&ndash;            echarts表8&ndash;&gt;-->
<!--&lt;!&ndash;          </div>&ndash;&gt;-->
<!--&lt;!&ndash;        </div>&ndash;&gt;-->
<!--&lt;!&ndash;      </Col>&ndash;&gt;-->
<!--&lt;!&ndash;    </Row>&ndash;&gt;-->
    <el-container>
      <el-header ><h1>网络数据采集</h1></el-header>
      <el-container>
        <el-aside width="800px">Aside</el-aside>
        <el-main style="height: 800px">
          <iframe :src='address' style="height: 680px;width:100%">

          </iframe></el-main>
      </el-container>
    </el-container>



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
      address:'',
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
    // this.getAddress();
    this.ip=this.$route.query.ip;
    this.port=this.$route.query.port;
    this.address='http://'+this.$route.query.ip+':'+this.$route.query.port;
    console.log(this.address)
  },
  beforeDestroy(){

  }
}
</script>

<style lang="less" scoped>
.el-header, .el-footer {
  background-color: #B3C0D1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #D3DCE6;
  color: #333;
  text-align: center;
  line-height: 200px;
  width: 500px;
}

.el-main {
  background-color: #E9EEF3;
  color: #333;
  text-align: center;
  line-height: 160px;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>
