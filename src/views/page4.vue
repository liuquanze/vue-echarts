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
            <div class="div_any_title">端口转发速率</div>
            <!--            <bar-chart :config="configData4" :xAxis="fig_1_x"></bar-chart>-->

<!--            <bar-chart :yAxis="fig_1_y" :xAxis="fig_1_x"></bar-chart>-->
            <port_line_chart :xAxis="fig_line_port_x" :yAxis="fig_line_port_y"></port_line_chart>

          </div>
<!--          流完成时间统计-->
          <div class="div_any_child">
            <div class="div_any_title">流速率统计</div>
<!--            柱状图-->
<!--            <barchart_duration_sec :yAxis="fig_duration_sec_y" :xAxis="fig_duration_sec_x"></barchart_duration_sec>-->
          <flow_line_chart :xAxis="fig_line_flow_x" :yAxis="fig_line_flow_y"></flow_line_chart>
          </div>
        </div>
        <download-excel
            class="btn btn-default"
            :data="json_data"
            :fields="json_fields"
            worksheet="My Worksheet"
            name="dataAnalysis.xls"
        >
          下载相关数据
        </download-excel>
        <div class="div_any02 left ">
          <div class="div_any_child div_height">
            <div class="div_any_title any_title_width">拓扑发现</div>
            <iframe :src='address' style="height: 100%;width:100%;border-radius:20px;border: none"
                    frameborder="0"></iframe>
          </div>
        </div>
        <div class="right div_any01">
          <div class="div_any_child">
            <div class="div_any_title">流规则数量统计</div>
<!--            <barChar_packet_count :xAxis="fig_2_x" :y1Axis="fig_2_y1" :y2Axis="fig_2_y2"></barChar_packet_count>-->
            <table_line_chart :xAxis="fig_line_table_x" :yAxis="fig_line_table_y"></table_line_chart>


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

//vue-json-excel组件
import Vue from "vue";
import JsonExcel from "vue-json-excel";
import axios from "axios";

Vue.component("downloadExcel", JsonExcel);


axios.defaults.baseURL = '/api';
//引入柱形图:流表规则数量
// const barChart = () => import('./components/page4/barChart');
//引入柱形图：数据包计数
// const barChar_packet_count = () => import('./components/page4/barChart_packet_count');
//引入饼图
const pieChart=()=>import('./components/page4/pieChart')
//引入柱状图，统计流完成时间
//const barchart_duration_sec = () => import('./components/page4/barchart_duration_sec')
//引入曲线图,统计流量
const flow_line_chart = () => import('./components/page4/lineChart_flow')
//引入曲线图，统计端口速率
const port_line_chart = () => import('./components/page4/lineChart_port')
//引入曲线图，统计流表数
const table_line_chart = () => import('./components/page4/lineChart_tablet')
export default {
  name: 'page4',
  props: ['selectRangeDate'],
  components: {
    //barchart_duration_sec,
    // barChart,
    // barChar_packet_count,
    pieChart,
    flow_line_chart,
    port_line_chart,
    table_line_chart,

  },
  data() {
    return {
      /* 流速率统计图所用参数 */
      //每次更新的packet数据包个数
      per_packet_count_total:0,
      //上一次packet总和
      last_packet_count:0,
      //当前packet总和
      cur_packet_count:0,
      //统计flow的时间间隔
      flow_count_time_interval :0,
      //用来计算上一次更新数据包使用到的flag
      packet_flag:0,
      //设置折线图（统计flow）x轴
      fig_line_flow_x:[],
      //设置折线图（统计flow）y轴
      fig_line_flow_y:[],


      /*端口转发速率所用参数*/
      //设置折线图（统计port速率）x轴
      fig_line_port_x:[],
      //设置折线图（统计port速率）y轴
      fig_line_port_y:[],
      //统计port的时间间隔
      port_count_time_interval :0,
      //每次更新的port发送的数据包数量
      per_port_count_packet:0,
      //当前数据包总数
      cur_port_count_packet:0,
      //上一次数据包总数
      last_port_count_packet:0,
      //用来计算上一次更新数据包使用到的flag
      port_flag:0,
      //端口总数
      port_num:0,


      /*流规则数目统计*/
      //设置折线图（流表数）x轴
      fig_line_table_x:[],
      //设置折线图（流表数）y轴
      fig_line_table_y:[],
      //统计流表数的时间单位
      table_time_interval:0,
      //流表总数
      table_count:0,


      /*excel下载*/
      json_fields: {
        当前时间: "time_now",
        流规则数量: "table_num",
        流速率:"packet_num",
        端口转发速率: "port_num",
      },
      //excel表格数据
      json_data:[],
      json_meta: [
        [
          {
            " key ": " charset ",
            " value ": " utf-8 "
          }
        ]
      ],





      //packet_in数据包总数
      packet_in_total:0,
      //packet_in数据包数量
      packet_in_count:[],
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
      //设置柱状图（流完成时间）x轴
      fig_duration_sec_x: [],
      //设置柱状图（流完成时间）y轴
      fig_duration_sec_y: [],
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
      },
      timer:"",
    }
  },
  methods: {

    //在excel中添加相关参数
    getExcelData(){
      //年
      let year = new Date().getFullYear();
      //月份是从0月开始获取的，所以要+1;
      let month = new Date().getMonth() +1;
      //日
      let day = new Date().getDate();
      //时
      let hour = new Date().getHours();
      //分
      let minute = new Date().getMinutes();
      //秒
      let second = new Date().getSeconds();
      //拼接当前时间
      let cur_time = year + '-' + month + '-' + day+ '   ' + hour + ':' + minute + ':' + second;
      //压入excel表格中的一行
      this.json_data.push({
        //当前时间
        time_now: cur_time,
        //流规则
        table_num: this.table_count,
        //流速率
        packet_num: this.per_packet_count_total,
        //端口速率
        port_num: this.per_port_count_packet,
      });
    },




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
      //console.warn(vm.fig_1_x)
      //console.warn(vm.fig_1_y)

    },
    //获取各个交换机的流完成时间
    async getDuration_sec() {
      const vm = this;
      //获取所有交换机的dpid
      let response = await axios.get('/stats/switches');
      //获取交换机dpid数组
      let dpids = response.data;
      //柱状图的x轴
      vm.fig_duration_sec_x = dpids;
      //console.log(dpids);


      for (let dpid = 1; dpid <= dpids.length; dpid++) {

        let duration_sec_response = await axios.get('/stats/flow/' + dpid);
        //console.log(duration_sec_response.data['1'][0].duration_sec)
        vm.fig_duration_sec_y.push(duration_sec_response.data[dpid][0].duration_sec)
      }
      //console.warn(vm.fig_duration_sec_x)
      //console.warn(vm.fig_duration_sec_y)


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
        //console.log(packet_flow_count_response.data[dpid][0].flow_count)
        vm.fig_2_y1.push(packet_flow_count_response.data[dpid][0].packet_count);
        packet_count_total+=packet_flow_count_response.data[dpid][0].packet_count;
        flow_count_total+=packet_flow_count_response.data[dpid][0].flow_count;
        byte_count_total+=packet_flow_count_response.data[dpid][0].byte_count
        vm.fig_2_y2.push(packet_flow_count_response.data[dpid][0].flow_count);
        //console.log()
      }
      vm.packet_count_total=packet_count_total;
      vm.flow_count_total=flow_count_total;
      vm.byte_count_total=byte_count_total;
      //this.timer = setInterval(this.getPacketAndFlowCount, 2000);
    },
    //获取每次更新的packet数据包个数
    async getPacketCount(){
      const vm = this;
      //获取所有交换机的dpid
      let response = await axios.get('/stats/switches');
      //获取交换机dpid数组
      let dpids = response.data;

      //压入y轴 -- 间隔时间
      vm.fig_line_flow_x.push(vm.flow_count_time_interval);
      //console.log(vm.flow_count_time_interval);

      //设置时间间隔
      vm.flow_count_time_interval += 2;

      //当前数据包个数
      vm.cur_packet_count = 0;

      for (let dpid = 1; dpid <= dpids.length; dpid++) {
        //获得dpid对应的flow
        let packet_flow_count_response = await axios.get('/stats/aggregateflow/' + dpid);
        //packet累加
        vm.cur_packet_count+=packet_flow_count_response.data[dpid][0].packet_count;
      }
      //第一次启动将当前数据包的个数付给上一次数据包的个数
      if(!vm.packet_flag) {
        vm.last_packet_count = vm.cur_packet_count;
        vm.packet_flag = 1;
      }
      //每次更新的数据包 = 当前 - 上一次
      vm.per_packet_count_total = vm.cur_packet_count - vm.last_packet_count;
      //把当前数据包个数付给上一次数据包个数，进行下一次轮询
      vm.last_packet_count = vm.cur_packet_count;

      //压入x轴
      vm.fig_line_flow_y.push(vm.per_packet_count_total);
    },
    //获取端口速率
    async getPortCount(){
      const vm = this;
      //获取所有交换机的dpid
      let response = await axios.get('/stats/switches');
      //获取交换机dpid数组
      let dpids = response.data;

      //压入x轴 -- 间隔时间
      vm.fig_line_port_x.push(vm.port_count_time_interval);
      //console.log(vm.flow_count_time_interval);

      //设置时间间隔
      vm.port_count_time_interval += 2;
      vm.port_count_packet = 0;
      vm.port_num = 0;
      for (let dpid = 1; dpid <= dpids.length; dpid++) {
        //获得dpid对应的port状态
        let packet_port_count_response = await axios.get('/stats/port/' + dpid);
        //获得相应交换机对应的端口数
        vm.port_num += packet_port_count_response.data[dpid].length-1;

        // //要计算的端口号
        // let port_id = 0;
        // for(port_id = 0; port_id < port_num - 1; port_id++)
        // {
        //   //packet累加
        //   vm.cur_port_count_packet+=packet_port_count_response.data[dpid][port_id].tx_packets;
        // }

        // //第一次启动将当前数据包的个数付给上一次数据包的个数
        // if(!vm.packet_flag) {
        //   vm.last_packet_count = vm.cur_packet_count;
        //   vm.packet_flag = 1;
        // }
        // //每次更新的数据包 = 当前 - 上一次
        // vm.per_packet_count_total = vm.cur_packet_count - vm.last_packet_count;
        // //把当前数据包个数付给上一次数据包个数，进行下一次轮询
        // vm.last_packet_count = vm.cur_packet_count;

        // if(!vm.port_flag){
        //   vm.last_port_count_packet = vm.cur_port_count_packet;
        //   vm.port_flag = 1;
        // }
        //
        // vm.per_port_count_packet = vm.cur_port_count_packet - vm.last_port_count_packet;
        // vm.last_port_count_packet = vm.cur_port_count_packet;
      }
      //压入y轴 --- 总数据包数 / 端口数
      vm.per_packet_count_total = vm.per_packet_count_total/vm.port_num;
      vm.fig_line_port_y.push(vm.per_packet_count_total/vm.port_num);
    },
    //获取流表数目
    async getTableCount(){
      const vm = this;
      //获取所有交换机的dpid
      let response = await axios.get('/stats/switches');
      //获取交换机dpid数组
      let dpids = response.data;

      //压入x轴 -- 间隔时间
      vm.fig_line_table_x.push(vm.table_time_interval);
      //console.log(vm.flow_count_time_interval);

      //设置时间间隔
      vm.table_time_interval += 2;
      vm.table_count = 0;

      for (let dpid = 1; dpid <= dpids.length; dpid++) {
        //获得dpid对应的流规则数
        let table_count_response = await axios.get('/stats/table/' + dpid);

        let table_num = table_count_response.data[dpid].length-1;
        for(let table_id = 0; table_id < table_num; table_id++)
        {
          //流规则数累加
          vm.table_count += table_count_response.data[dpid][table_id].active_count;
        }
      }
      //压入y轴
      vm.fig_line_table_y.push(vm.table_count);
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
      //console.log(vm.packet_in_total+'haha ')
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
    //this.getActiveEntryNum();
    //获取每个交换机的数据包总数和flow总数
    // this.getPacketAndFlowCount();
    //获取packet_in消息数量
    this.getPacketInCount();
    //获取流持续时间
    //this.getDuration_sec();


    this.$nextTick(() =>{
      //每2秒执行packet统计
      setInterval(this.getPacketCount, 2000);
      //每两秒执行端口速率统计
      setInterval(this.getPortCount,2000);
      //每两秒执行流规则数统计
      setInterval(this.getTableCount, 2000);
      //获取每个交换机的数据包总数和flow总数
      setInterval(this.getPacketAndFlowCount, 5000);
      //每2秒给excel表格中新增加一行
      setInterval(this.getExcelData, 2000);
    })


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
