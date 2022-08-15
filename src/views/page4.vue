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
              <div style="height: 50%;width: 100%">{{ links_nums }}</div>
              <div style="height: 50%;width: 100%">链路数</div>
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
              <div style="height: 50%;width: 100%">{{ role }}</div>
              <div style="height: 50%;width: 100%">控制器角色</div>
            </div>
            <div class="topo">
              <div style="height: 50%;width: 100%;font-size: 18px">{{ switch_desc.hw_desc }}</div>
              <div style="height: 50%;width: 100%">switch名称</div>
            </div>
            <div class="topo">
              <div style="height: 50%;width: 100%">{{ switch_desc.sw_desc }}</div>
              <div style="height: 50%;width: 100%">switch版本</div>
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
              <div style="height: 50%;width: 100%">{{ links_nums }}</div>
              <div style="height: 50%;width: 100%">链路数</div>
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
            <div class="div_any_title">图表4</div>
            <!--            <bar-chart :config="configData4"></bar-chart>-->
          </div>
          <div class="div_any_child">
            <div class="div_any_title">图表5</div>
            <!--            <bar-chart :config="configData4"></bar-chart>-->
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
      //存储所有交换机的dpid
      dpid: [],
      //设置柱形图x轴
      fig_1_x: [],
      //设置柱形图y轴
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
      let response= await axios.get('/stats/switches')
          // .then(function (response) {
          //   //获取到交换机的dpid之后，请求对应的active_entry数量
          //   //创建数组存储对应的dpid以及
          //   console.log(response.data);
          //   // let dpids = response.data;
          //   //存储柱形图的x坐标
          //   // vm.xAxis = response.data;
          //   // const vm1=vm;
          //   //根据dpid发送请求，得到每个switch对应的active_entry的数量
          //   // for(let dpid=1;dpid<=dpids.length;dpid++){
          //   //
          //   //   axios.get('/stats/table/'+dpid)
          //   //     .then(response=>{
          //   //       //存储纵坐标
          //   //       console.log(vm.yAxis)
          //   //       console.log(response.data[dpid][0].active_count)
          //   //       // response.data[dpid][0].active_count
          //   //     })
          //   //     .catch(function (error){
          //   //       console.log(error)
          //   //     })
          //   // }
          // })
          // .catch(function (error) {
          //   console.log(error);
          // });
      //获取交换机dpid数组
      let dpids=response.data;
      vm.fig_1_x=dpids;
      console.log(vm.fig_1_x)
      console.log(vm.fig_1_y)
      for(let dpid=1;dpid<=dpids.length;dpid++){
        let active_entry_response=await axios.get('/stats/table/'+dpid);
        // console.log(active_entry_response.data['1'][0].active_count)
        vm.fig_1_y.push(active_entry_response.data[dpid][0].active_count)
      }
      console.warn(vm.fig_1_x)
      console.warn(vm.fig_1_y)

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
