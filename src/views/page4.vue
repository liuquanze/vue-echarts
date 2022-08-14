<template>
  <div class="page2">

    <!--内容部分-->
    <div class="con left">
      <!--数据总概-->
      <div class="con_div">
        <div class="con_div_text left" style="text-align: center">

              <p style="font-size: 15px;font-weight:bold;margin-top: 10px">拓扑数据</p>
              <div style="margin-top: 35px">
<!--                <div style=" display:inline-block;">交换机数</div>     |-->
<!--                <div style=" display:inline-block;">主机数</div>     |-->
<!--                <div style=" display:inline-block;">链路数</div>-->
                <div class="topo">
                  <div style="height: 50%;width: 100%">{{ switch_nums }}</div>
                  <div style="height: 50%;width: 100%">交换机数</div>
                </div>
                <div class="topo">
                  <div style="height: 50%;width: 100%">{{ hosts_nums }}</div>
                  <div style="height: 50%;width: 100%">主机数</div>
                </div>
                <div class="topo">
                  <div style="height: 50%;width: 100%">{{links_nums}}</div>
                  <div style="height: 50%;width: 100%">链路数</div>
                </div>
              </div>

        </div>
        <div class="con_div_text left" style="text-align: center">

          <p style="font-size: 15px;font-weight:bold;margin-top: 10px">拓扑数据</p>
          <div style="margin-top: 35px">
            <!--                <div style=" display:inline-block;">交换机数</div>     |-->
            <!--                <div style=" display:inline-block;">主机数</div>     |-->
            <!--                <div style=" display:inline-block;">链路数</div>-->
            <div class="topo">
              <div style="height: 50%;width: 100%">{{ switch_nums }}</div>
              <div style="height: 50%;width: 100%">交换机数</div>
            </div>
            <div class="topo">
              <div style="height: 50%;width: 100%">{{ hosts_nums }}</div>
              <div style="height: 50%;width: 100%">主机数</div>
            </div>
            <div class="topo">
              <div style="height: 50%;width: 100%">{{links_nums}}</div>
              <div style="height: 50%;width: 100%">链路数</div>
            </div>
          </div>

        </div>
        <div class="con_div_text left" style="text-align: center">

          <p style="font-size: 15px;font-weight:bold;margin-top: 10px">拓扑数据</p>
          <div style="margin-top: 35px">
            <!--                <div style=" display:inline-block;">交换机数</div>     |-->
            <!--                <div style=" display:inline-block;">主机数</div>     |-->
            <!--                <div style=" display:inline-block;">链路数</div>-->
            <div class="topo">
              <div style="height: 50%;width: 100%">{{ switch_nums }}</div>
              <div style="height: 50%;width: 100%">交换机数</div>
            </div>
            <div class="topo">
              <div style="height: 50%;width: 100%">{{ hosts_nums }}</div>
              <div style="height: 50%;width: 100%">主机数</div>
            </div>
            <div class="topo">
              <div style="height: 50%;width: 100%">{{links_nums}}</div>
              <div style="height: 50%;width: 100%">链路数</div>
            </div>
          </div>
        </div>
      </div>
      <!--统计分析图-->
      <div class="div_any">
        <div class="left div_any01">
          <div class="div_any_child">
            <div class="div_any_title">flow统计</div>
            <bar-chart :config="configData4"></bar-chart>

          </div>
          <div class="div_any_child">
            <div class="div_any_title">图表2</div>
            <bar-chart :config="configData4"></bar-chart>
          </div>
        </div>
        <div class="div_any02 left ">
          <div class="div_any_child div_height">
            <div class="div_any_title any_title_width">拓扑发现</div>
            <iframe :src='address' style="height: 100%;width:100%;border-radius:20px;border: none" frameborder="0"></iframe>
          </div>
        </div>
        <div class="right div_any01">
          <div class="div_any_child">
            <div class="div_any_title">图表4</div>
            <bar-chart :config="configData4"></bar-chart>
          </div>
          <div class="div_any_child">
            <div class="div_any_title">图表5</div>
            <bar-chart :config="configData4"></bar-chart>
          </div>
        </div>
      </div>


    </div>



  </div>
</template>


<script>

import axios from "axios";
axios.defaults.baseURL = '/api';
//引入柱形图
const barChart = () => import('./components/page4/barChart');
export default {
  name: 'page4',
  props: ['selectRangeDate'],
  components: {
    barChart
  },
  data() {
    return {
      //柱形图假数据
      configData4: {
        data: [213, 190, 137, 99, 63, 196, 248, 212, 248, 112]
      },
      //交换机数量
      switch_nums:0,
      //主机数量
      hosts_nums:0,
      //链路数量
      links_nums:0,
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
    //获取交换机数量
    getSwitchNums(){
      const vm = this;
      axios.get('/stats/switches')
          .then(function (response) {
            console.log(response.data.length);
            vm.switch_nums=response.data.length
          })
          .catch(function (error) {
            console.log(error);
          });
    },
    //获取主机数量v1.0/topology/hosts
    getHostsNums(){
      const vm = this;
      axios.get('/v1.0/topology/hosts')
          .then(function (response) {
            console.log(response.data.length);
            vm.hosts_nums=response.data.length
          })
          .catch(function (error) {
            console.log(error);
          });
    },
    //获取交换机之间链路数量
    getLinksNums(){
      const vm = this;
      axios.get('/v1.0/topology/links')
          .then(function (response) {
            console.log(response.data.length);
            vm.links_nums=response.data.length
          })
          .catch(function (error) {
            console.log(error);
          });
    }
  },

  mounted() {
    //获取虚拟机的ip地址与端口
    this.ip=this.$route.query.ip;
    this.port=this.$route.query.port;
    this.address='http://'+this.$route.query.ip+':'+this.$route.query.port;
    console.log(this.address);
    this.getSwitchNums();
    this.getHostsNums();
    this.getLinksNums();


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
.topo{
  display:inline-block;
  float: left;
  margin-left: 35px;
  margin-top: -18px;
  width: 120px;
  height: 100px;
  /*background-color: yellow;*/
  font-weight: bold;
}
</style>
