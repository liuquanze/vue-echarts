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
              <div style="height: 50%;width: 100%;font-size: 17px">{{ switch_nums }}</div>
              <div style="height: 50%;width: 100%;font-size: 17px">交换机数</div>
            </div>
            <div class="topo">
              <div style="height: 50%;width: 100%;font-size: 17px">{{ hosts_nums }}</div>
              <div style="height: 50%;width: 100%;font-size: 17px">主机数</div>
            </div>
            <div class="topo">
              <div style="height: 50%;width: 100%;font-size: 17px">{{ links_nums }}</div>
              <div style="height: 50%;width: 100%;font-size: 17px">链路数</div>
            </div>
          </div>

        </div>
        <div class="con_div_text left" style="text-align: center">

          <p style="font-size: 15px;font-weight:bold;margin-top: 10px">基础信息</p>
          <div style="margin-top: 35px">
            <!--                <div style=" display:inline-block;">交换机数</div>     |-->
            <!--                <div style=" display:inline-block;">主机数</div>     |-->
            <!--                <div style=" display:inline-block;">链路数</div>-->
            <div class="topo">
              <div style="height: 50%;width: 100%;font-size: 17px">{{ role }}</div>
              <div style="height: 50%;width: 100%;font-size: 17px">控制器角色</div>
            </div>
            <div class="topo">
              <div style="height: 50%;width: 100%;font-size: 17px">{{ switch_desc.hw_desc }}</div>
              <div style="height: 50%;width: 100%;font-size: 17px">switch名称</div>
            </div>
            <div class="topo">
              <div style="height: 50%;width: 100%;font-size: 17px">{{ switch_desc.sw_desc }}</div>
              <div style="height: 50%;width: 100%;font-size: 17px">switch版本</div>
            </div>
          </div>

        </div>
        <div class="con_div_text left" style="text-align: center">

          <p style="font-size: 15px;font-weight:bold;margin-top: 10px">流量信息</p>
          <div style="margin-top: 35px">
            <!--                <div style=" display:inline-block;">交换机数</div>     |-->
            <!--                <div style=" display:inline-block;">主机数</div>     |-->
            <!--                <div style=" display:inline-block;">链路数</div>-->
            <div class="topo">
              <div style="height: 50%;width: 100%;font-size: 17px">{{ packet_count_total }}</div>
              <div style="height: 50%;width: 100%;font-size: 17px">传输数据包总数</div>
            </div>
            <div class="topo">
              <div style="height: 50%;width: 100%;font-size: 17px">{{ byte_count_total }}</div>
              <div style="height: 50%;width: 100%;font-size: 17px">传输字节总数</div>
            </div>
            <div class="topo">
              <div style="height: 50%;width: 100%;font-size: 17px">{{ flow_count_total }}</div>
              <div style="height: 50%;width: 100%;font-size: 17px">传输flow总数</div>
            </div>
          </div>
        </div>
      </div>
      <!--统计分析图-->
      <div class="div_any">
        <div class="left div_any01">
          <div class="div_any_child">
            <div class="div_any_title">flow entry统计</div>
            <!--            <bar-chart :config="configData4" :xAxis="fig_1_x"></bar-chart>-->

            <bar-chart :yAxis="fig_1_y" :xAxis="fig_1_x"></bar-chart>
          </div>
          <div class="div_any_child">
            <div class="div_any_title">图表2</div>
            <!--            <bar-chart :config="configData4"></bar-chart>-->
          </div>
        </div>
        <div class="div_any02 left ">
          <div class="div_any_child div_height">
            <div class="div_any_title any_title_width">拓扑发现</div>
            <iframe :src='address' style="height: 100%;width:100%;border-radius:20px;border: none"
                    frameborder="0"></iframe>
          </div>
        </div>
        <div class="right div_any01">
          <div class="div_any_child">
            <div class="div_any_title">数据包&flow统计</div>
            <barChar_packet_count :xAxis="fig_2_x" :y1Axis="fig_2_y1" :y2Axis="fig_2_y2"></barChar_packet_count>

          </div>
          <div class="div_any_child">
            <div class="div_any_title">Packet-in统计</div>
            <pie-chart :pie_data="packet_in_count" :packet_count_total="packet_in_total"></pie-chart>
          </div>
        </div>
      </div>


    </div>


  </div>
</template>


<script>

import axios from "axios";

axios.defaults.baseURL = '/api';
//引入柱形图:流表规则数量
const barChart = () => import('./components/page4/barChart');
//引入柱形图：数据包计数
const barChar_packet_count = () => import('./components/page4/barChart_packet_count');
//引入饼图
const pieChart=()=>import('./components/page4/pieChart')
export default {
  name: 'page4',
  props: ['selectRangeDate'],
  components: {
    barChart,
    barChar_packet_count,
    pieChart
  },
  data() {
    return {
      //packet_in数据包总数
      packet_in_total:0,
      //packet_in数据包数量
      packet_in_count:[],
      //网络总数据包数量
      packet_count_total:0,
      //网络总流数量
      flow_count_total:0,
      //网络总传输字节数
      byte_count_total:0,
      //设置柱形图(packet_count&flow_count)x轴
      fig_2_x: [],
      //设置柱形图(packet_count&flow_count)y轴
      fig_2_y1: [],
      //设置柱形图（packet_count&flow_count）y轴
      fig_2_y2:[],
      //存储所有交换机的dpid
      dpid: [],
      //设置柱形图(active_entry)x轴
      fig_1_x: [],
      //设置柱形图(active_entry)y轴
      fig_1_y: [],
      //柱形图假数据
      configData4: {
        data: [213, 190]
      },
      //交换机描述
      switch_desc: {},
      //控制器role
      role: '',
      //交换机数量
      switch_nums: 0,
      //主机数量
      hosts_nums: 0,
      //链路数量
      links_nums: 0,
      address: '',
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
      animationFrame1: null,
      animationFrame2: null,
      centerBox: {
        width: 0,
        height: 0
      }
    }
  },
  methods: {
    //获取交换机数量
    getSwitchNums() {
      const vm = this;
      axios.get('/stats/switches')
          .then(function (response) {
            // console.log(response.data.length);
            vm.switch_nums = response.data.length
            // this.dpid=response.data;
          })
          .catch(function (error) {
            console.log(error);
          });
    },
    //获取主机数量v1.0/topology/hosts
    getHostsNums() {
      const vm = this;
      axios.get('/v1.0/topology/hosts')
          .then(function (response) {
            // console.log(response.data.length);
            vm.hosts_nums = response.data.length
          })
          .catch(function (error) {
            console.log(error);
          });
    },
    //获取交换机之间链路数量
    getLinksNums() {
      const vm = this;
      axios.get('/v1.0/topology/links')
          .then(function (response) {
            // console.log(response.data.length);
            vm.links_nums = response.data.length
          })
          .catch(function (error) {
            console.log(error);
          });
    },
    //获取当前控制器的角色role
    getRole() {
      const vm = this;
      axios.get('/stats/role/1').then(function (response) {
        let data = response.data;
        // console.log(data['1'][0].role)
        vm.role = data['1'][0].role;

      })
          .catch(function (error) {
            console.log(error)
          })
    },
    //获取当前交换机描述信息
    getSwitchDesc() {
      const vm = this;
      axios.get('/stats/desc/1').then(function (response) {
        let data = response.data;
        // console.log(data["1"])
        vm.switch_desc = data['1'];

      })
          .catch(function (error) {
            console.log(error)
          })
    },
    //获取交换机数量
    getDpid() {
      const vm = this;
      axios.get('/stats/switches')
          .then(function (response) {
            // console.log(response.data);
            vm.dpid = response.data;
            // console.log(response.data.length)
            return response.data.length
          })
          .catch(function (error) {
            console.log(error);
          });
    },
    //获取各个交换机的激活流表项数量
    async getActiveEntryNum() {
      const vm = this;
      //获取所有交换机的dpid
      let response = await axios.get('/stats/switches');
      //获取交换机dpid数组
      let dpids = response.data;
      vm.fig_1_x = dpids;
      // console.log(vm.fig_1_x)
      // console.log(vm.fig_1_y)
      for (let dpid = 1; dpid <= dpids.length; dpid++) {
        let active_entry_response = await axios.get('/stats/table/' + dpid);
        // console.log(active_entry_response.data['1'][0].active_count)
        vm.fig_1_y.push(active_entry_response.data[dpid][0].active_count)
      }
      console.warn(vm.fig_1_x)
      console.warn(vm.fig_1_y)

    },
    //获取数据包总数和flow总数
    async getPacketAndFlowCount(){
      const vm = this;
      //获取所有交换机的dpid
      let response = await axios.get('/stats/switches');
      //获取交换机dpid数组
      let dpids = response.data;
      vm.fig_2_x = dpids;
      let packet_count_total=0;
      let flow_count_total=0;
      let byte_count_total=0;
      for (let dpid = 1; dpid <= dpids.length; dpid++) {
        let packet_flow_count_response = await axios.get('/stats/aggregateflow/' + dpid);
        console.log(packet_flow_count_response.data[dpid][0].flow_count)
        vm.fig_2_y1.push(packet_flow_count_response.data[dpid][0].packet_count);
        packet_count_total+=packet_flow_count_response.data[dpid][0].packet_count;
        flow_count_total+=packet_flow_count_response.data[dpid][0].flow_count;
        byte_count_total+=packet_flow_count_response.data[dpid][0].byte_count
        vm.fig_2_y2.push(packet_flow_count_response.data[dpid][0].flow_count);
        console.log()
      }
      vm.packet_count_total=packet_count_total;
      vm.flow_count_total=flow_count_total;
      vm.byte_count_total=byte_count_total;
    },
    //获取packet_in消息数量
    async getPacketInCount(){
      const vm=this;
      let packet_in_count=[];
      // let entry={};
      let response=await axios.get('/packetIn/count')
      console.error(response.data)
      let sum=0;
      for(let key in response.data){
        // console.log(key+':'+response.data[key])
        let entry={}
        sum+=response.data[key];
        entry.name=key.slice(-2);
        entry.value=response.data[key];
        packet_in_count.push(entry);
      }
      vm.packet_in_count=packet_in_count;
      vm.packet_in_total=sum;
      console.log(vm.packet_in_total+'haha ')
      // console.log(vm.packet_in_count)
    }


  },

  mounted() {
    //获取虚拟机的ip地址与端口
    this.ip = this.$route.query.ip;
    this.port = this.$route.query.port;
    this.address = 'http://' + this.$route.query.ip + ':' + this.$route.query.port;
    // console.log(this.address);
    //获取交换机总数
    this.getSwitchNums();
    //获取主机总数
    this.getHostsNums();
    //获取链路数量
    this.getLinksNums();
    //获取控制器角色
    this.getRole();
    //获取交换机描述
    this.getSwitchDesc();
    //获取活跃的流表规则数量
    this.getActiveEntryNum();
    //获取每个交换机的数据包总数和flow总数
    this.getPacketAndFlowCount();
    //获取packet_in消息数量
    this.getPacketInCount();


  },
  beforeDestroy() {

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

.topo {
  display: inline-block;
  float: left;
  margin-left: 35px;
  margin-top: -18px;
  width: 120px;
  height: 100px;
  /*background-color: yellow;*/
  font-weight: bold;
}
</style>
