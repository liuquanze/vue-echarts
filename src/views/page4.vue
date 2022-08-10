<template>
  <div class="page2">

    <!--内容部分-->
    <div class="con left">
      <!--数据总概-->
      <div class="con_div">
        <div class="con_div_text left">
          <div class="con_div_text01 left">
            <div class="left text01_div">
              <p>指标1</p>

              <p>指标1对应数量</p>

            </div>
          </div>
          <div class="con_div_text01 right">
            <div class="left text01_div">
              <p>指标2</p>
              <p>指标2对应数量</p>
            </div>
          </div>
        </div>
        <div class="con_div_text left">
          <div class="con_div_text01 left">
            <div class="left text01_div">
              <p>指标3</p>
              <p class="sky">指标3对应数量</p>
            </div>
          </div>
          <div class="con_div_text01 right">
            <div class="left text01_div">
              <p>指标4</p>
              <p class="sky">指标4对应数量</p>
            </div>
          </div>
        </div>
        <div class="con_div_text left">

          <div class="con_div_text01 left">
            <div class="left text01_div">
              <p>指标5</p>
              <p class="org">指标5对应数量</p>
            </div>
          </div>
          <div class="con_div_text01 right">
            <div class="left text01_div">
              <p>指标6</p>
              <p class="org">指标6对应数量</p>
            </div>
          </div>
        </div>
      </div>
      <!--统计分析图-->
      <div class="div_any">
        <div class="left div_any01">
          <div class="div_any_child">
            <div class="div_any_title">图表1</div>
<!--            <span class="angle1"></span>-->
<!--            <span class="angle2"></span>-->
<!--            <span class="angle3"></span>-->
<!--            <span class="angle4"></span>-->

          </div>
          <div class="div_any_child">
            <div class="div_any_title">图表2</div>

          </div>
        </div>
        <div class="div_any02 left ">
          <div class="div_any_child div_height">
            <div class="div_any_title any_title_width">拓扑发现</div>
            <iframe :src='address' style="height: 100%;width:100%;border-radius:20px;border: none"></iframe>
          </div>
        </div>
        <div class="right div_any01">
          <div class="div_any_child">
            <div class="div_any_title">图表4</div>
          </div>
          <div class="div_any_child">
            <div class="div_any_title">图表5</div>
          </div>
        </div>
      </div>

<!--      <div id="el-dialog" class="">-->
<!--        <div class="xc_layer"></div>-->
<!--        <div class="popBox" id="printView">-->
<!--          <div class="ttBox"><span class="tt" id="reportTitle">第一医院</span><img src="../images/close.png" style="width: 30px;float: right;cursor: pointer;" title="关闭弹窗" class="close"/></div>-->
<!--          <div class="txtBox" id="el-dialog_body">-->
<!--            <div style="height:100%;width: 98%;margin-left: 1%;">-->
<!--              <div class="left div_any01" style="width: 64%;">-->
<!--                <div class="div_any_child">-->
<!--                  <div class="div_any_title"><div type="text" class="demo-input" id="date1" style="display: inline-block;cursor: pointer;margin-right: 16px;"></div><img src="../images/title_4.png">门诊住院人次</div>-->
<!--                  <p id="lineChart3" class="p_chart"></p>-->
<!--                </div>-->
<!--                <div class="div_any_child">-->
<!--                  <div class="div_any_title"><div type="text" class="demo-input" id="date2" style="display: inline-block;cursor: pointer;margin-right: 16px;"></div><img src="../images/title_7.png">医疗费用</div>-->
<!--                  <p id="lineChart4" class="p_chart"></p>-->
<!--                </div>-->
<!--              </div>-->
<!--              <div class="left div_any01"  style="width: 32%;">-->
<!--                <div class="div_any_child">-->
<!--                  <div class="div_any_title"><div type="text" class="demo-input" id="date3" style="display: inline-block;cursor: pointer;margin-right: 16px;"></div><img src="../images/title_18.png">病人年龄段分布</div>-->
<!--                  <p id="pieChart2" class="p_chart"></p>-->
<!--                </div>-->
<!--                <div class="div_any_child">-->
<!--                  <div class="div_any_title"><div type="text" class="demo-input" id="date4" style="display: inline-block;cursor: pointer;margin-right: 16px;"></div><img src="../images/title_20.png">医疗费用组成</div>-->
<!--                  <p id="pieChart3" class="p_chart"></p>-->
<!--                </div>-->
<!--              </div>-->

<!--            </div>-->
<!--          </div>-->
<!--        </div>-->
<!--      </div>-->

    </div>



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
<style>
@import "../static/css/common.css";
</style>
<style>
.angle1 {
  display: inline-block;
  position: absolute;
  width: 10px;
  height: 10px;
  top: 0;
  left: 0;
  border-top: 2px solid grey;
  border-left: 2px solid grey;

}

.angle2 {
  display: inline-block;
  position: absolute;
  width: 10px;
  height: 10px;
  top: 0;
  right: 0;
  border-top: 2px solid grey;
  border-right: 2px solid grey;

}

.angle3 {
  display: inline-block;
  position: absolute;
  width: 10px;
  height: 10px;
  bottom: 0;
  left: 0;
  border-bottom: 2px solid grey;
  border-left: 2px solid grey;

}

.angle4 {
  display: inline-block;
  position: absolute;
  width: 10px;
  height: 10px;
  bottom: 0;
  right: 0;
  border-bottom: 2px solid grey;
  border-right: 2px solid grey;

}
</style>
