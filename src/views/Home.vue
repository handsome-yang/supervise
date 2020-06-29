<template>
  <div class="home">
    <header></header>
    <section>
      <div class="left-pannel">
        <div class="left-top">
          <p class="title-text">油耗排行榜</p>
          <div class="content">
            <el-dropdown trigger="click" @command="selectItem">
              <span class="el-dropdown-link">
                节油榜/耗油榜
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="1">节油排行</el-dropdown-item>
                <el-dropdown-item command="2">耗油排行</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>

            <table border="0" cellpadding="0" cellspacing="0">
              <tr class="table-head">
                <th>车牌号</th>
                <th>驾驶员</th>
                <th>百公里油耗</th>
              </tr>
              <tbody>
                <tr>
                  <td>xxx</td>
                  <td>xxx</td>
                  <td class="oil-normal-style" :style="{'color':oilColor}">xxx</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="left-bottom">
          <p class="title-text">月平均油耗统计</p>
          <div class="content">
            <div id="echarts-bar"></div>
            <div id="echarts-line"></div>
          </div>
        </div>
      </div>

      <div class="center-pannel">
        <div class="search">
          <div class="search-left">
            <span>车牌号</span>
            <img src="../assets/images/圆角矩形 1 拷贝 8@2x.png" alt />
          </div>
          <div class="search-right">
            <input class="search-input" type="text" />
          </div>
        </div>
        <div class="search-result">
           <el-scrollbar style="height:100%">
          <table border="0" cellpadding="0" cellspacing="0" class="min-table">
            <tr class="thead">
              <th>编号</th>
              <th>车牌号</th>
              <th>驾驶员</th>
              <th>电话</th>
              <th>报警类型</th>
              <th>报警地点</th>
              <th>报警时间</th>
              <th>操作</th>
            </tr>
            <tbody>
              <tr class="list-item" v-for="(row,rowIndex) in tableData" :key="rowIndex">
                <td>{{rowIndex+1}}</td>
                <td v-for="(cell,cellIndex) in row" :key="cellIndex">{{cell}}</td>
                <td>
                  <el-button type="primary" size="mini">处理</el-button>
                </td>
              </tr>
            </tbody>
          </table>
           </el-scrollbar>
        </div>
      </div>
      <div class="right-pannel">
        <div class="right-top">
          <p class="title-text">报警统计</p>
          <div id="echarts-warn-total" class="content"></div>
        </div>
        <div class="right-center">
          <p class="title-text">保险理赔</p>
          <div class="content">
            <el-dropdown trigger="click" @command="selectInsurer">
              <span class="el-dropdown-link">
                {{currenInSurer}}
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item
                  v-for="(obj,oIndex) in safeList"
                  :key="oIndex"
                  :command="obj.name"
                >{{obj.name}}</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <div class="content-main">
              <p v-for="(item,index) in safeInfo[currenInSurer]" :key="index">
                <img :src="item.img" alt />
                <span class="key-style">{{item.key}}：</span>
                <span
                  class="value-style"
                  :style="{'color':item.color}"
                >{{item.value}} &nbsp;{{item.unit}}</span>
              </p>
            </div>
          </div>
        </div>
        <div class="right-bottom">
          <p class="title-text">路况感知</p>
          <div class="content">
            <el-dropdown trigger="click" @command="roadFilter">
              <span class="el-dropdown-link">
                {{currentTraffic}}
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item v-for="(val,key,i) in traffic" :key="i" :command="key">{{key}}</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <el-scrollbar style="height:100%">
              <ul class="content-main">
                <li v-for="(item,index) in traffic[currentTraffic]" :key="index">
                  <img v-if="index > 2 " src="../assets/images/dingwei 拷贝 4@2x.png" alt />
                  <img v-else src="../assets/images/dingwei@2x.png" alt />
                  <span>{{item}}</span>
                </li>
              </ul>
            </el-scrollbar>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "Home",
  components: {},
  data() {
    return {
      oilColor: "#00D98B",
      tableData: [
        {
          carId: "沪A·66666",
          driver: "刘飞",
          phone: 123456789,
          warnType: "油量液位低",
          warnpos: "云南某地",
          warnTime: "2020年6月29日11:32:34"
        },
        {
          carId: "沪A·66666",
          driver: "刘飞",
          phone: 123456789,
          warnType: "油量液位低",
          warnpos: "云南某地",
          warnTime: "2020年6月29日11:32:34"
        },
        {
          carId: "沪A·66666",
          driver: "刘飞",
          phone: 123456789,
          warnType: "油量液位低",
          warnpos: "云南某地",
          warnTime: "2020年6月29日11:32:34"
        },
        {
          carId: "沪A·66666",
          driver: "刘飞",
          phone: 123456789,
          warnType: "油量液位低",
          warnpos: "云南某地",
          warnTime: "2020年6月29日11:32:34"
        },
        {
          carId: "沪A·66666",
          driver: "刘飞",
          phone: 123456789,
          warnType: "油量液位低",
          warnpos: "云南某地",
          warnTime: "2020年6月29日11:32:34"
        },
        {
          carId: "沪A·66666",
          driver: "刘飞",
          phone: 123456789,
          warnType: "油量液位低",
          warnpos: "云南某地",
          warnTime: "2020年6月29日11:32:34"
        },
        {
          carId: "沪A·66666",
          driver: "刘飞",
          phone: 123456789,
          warnType: "油量液位低",
          warnpos: "云南某地",
          warnTime: "2020年6月29日11:32:34"
        },
        {
          carId: "沪A·66666",
          driver: "刘飞",
          phone: 123456789,
          warnType: "油量液位低",
          warnpos: "云南某地",
          warnTime: "2020年6月29日11:32:34"
        },
        {
          carId: "沪A·66666",
          driver: "刘飞",
          phone: 123456789,
          warnType: "油量液位低",
          warnpos: "云南某地",
          warnTime: "2020年6月29日11:32:34"
        },
        {
          carId: "沪A·66666",
          driver: "刘飞",
          phone: 123456789,
          warnType: "油量液位低",
          warnpos: "云南某地",
          warnTime: "2020年6月29日11:32:34"
        },
        {
          carId: "沪A·66666",
          driver: "刘飞",
          phone: 123456789,
          warnType: "油量液位低",
          warnpos: "云南某地",
          warnTime: "2020年6月29日11:32:34"
        },
        {
          carId: "沪A·66666",
          driver: "刘飞",
          phone: 123456789,
          warnType: "油量液位低",
          warnpos: "云南某地",
          warnTime: "2020年6月29日11:32:34"
        },
        {
          carId: "沪A·66666",
          driver: "刘飞",
          phone: 123456789,
          warnType: "油量液位低",
          warnpos: "云南某地",
          warnTime: "2020年6月29日11:32:34"
        },
        {
          carId: "沪A·66666",
          driver: "刘飞",
          phone: 123456789,
          warnType: "油量液位低",
          warnpos: "云南某地",
          warnTime: "2020年6月29日11:32:34"
        },
        {
          carId: "沪A·66666",
          driver: "刘飞",
          phone: 123456789,
          warnType: "油量液位低",
          warnpos: "云南某地",
          warnTime: "2020年6月29日11:32:34"
        },
        {
          carId: "沪A·66666",
          driver: "刘飞",
          phone: 123456789,
          warnType: "油量液位低",
          warnpos: "云南某地",
          warnTime: "2020年6月29日11:32:34"
        }
      ],
      currenInSurer: "中国人寿",
      safeList: [
        {
          id: 1,
          name: "中国人寿"
        },
        {
          id: 2,
          name: "中国平安"
        }
      ],
      safeInfo: {
        中国人寿: [
          {
            img: require("../assets/images/矩形 414@2x.png"),
            key: "保险车辆数",
            value: "8.658",
            color: "#00D98B",
            unit: "辆"
          },
          {
            img: require("../assets/images/矩形 414 拷贝 2@2x.png"),
            key: "投保金额",
            value: "¥128.658",
            color: "#D99900",
            unit: ""
          },
          {
            img: require("../assets/images/矩形 414 拷贝 3@2x.png"),
            key: "理赔次数",
            value: "12",
            color: "#00BAFF",
            unit: "次"
          },
          {
            img: require("../assets/images/矩形 414 拷贝 4@2x.png"),
            key: "理赔金额",
            value: "¥121,930",
            color: "#9C35DD",
            unit: ""
          }
        ]
      },
      currentTraffic: "易超速路段",
      traffic: {
        易超速路段: [
          "固戍二路街道口 500米",
          "固戍二路街道口 500米",
          "固戍二路街道口 500米x",
          "固戍二路街道口 500米",
          "固戍二路街道口 500米",
          "固戍二路街道口 500米",
          "固戍二路街道口 500米",
          "固戍二路街道口 500米",
          "固戍二路街道口 500米",
          "固戍二路街道口 500米",
          "固戍二路街道口 500米x",
          "固戍二路街道口 500米",
          "固戍二路街道口 500米",
          "固戍二路街道口 500米",
          "固戍二路街道口 500米",
          "固戍二路街道口 500米"
        ],
        地面易滑路段: ["wwwww", "wwwwww", "wwwwww", "wwwww", "wwwwww", "wwwwww"]
      }
    };
  },
  created() {},
  mounted() {
    this.loadLeftCharts();
    this.loadRightCharts();
    window.addEventListener("resize", () => {
      this.myChartBar.resize();
      this.myChartLine.resize();
      this.myChartRightBar.resize();
    });
  },
  methods: {
    selectItem(com) {
      this.oilColor = com == 2 ? "#FF4049" : "#00D98B";
    },
    loadLeftCharts() {
      // 柱状图
      let myChartBar = this.$echarts.init(
        document.getElementById("echarts-bar")
      );
      this["myChartBar"] = myChartBar;
      const dataAxis = [
        "xxx路线",
        "xxx路线",
        "xxx路线",
        "xxx路线",
        "xxx路线",
        "xxx路线",
        "xxx路线"
      ];
      let dataShadow = [];
      let yMax = 500;
      const data = [
        220,
        182,
        191,
        234,
        290,
        330,
        310,
        123,
        442,
        321,
        90,
        149,
        210,
        122,
        133,
        334,
        198,
        123,
        125,
        220
      ];

      for (var i = 0; i < data.length; i++) {
        dataShadow.push(yMax);
      }
      const optionBar = {
        xAxis: {
          name: "路线",
          nameLocation: "end",
          nameTextStyle: {
            color: "#9CAEE5",
            verticalAlign: "top",
            fontSize: 10,
            align: "center"
          },
          splitLine: { show: false }, //去除网格线
          data: dataAxis,
          axisLabel: {
            inside: false,
            textStyle: {
              color: "#9CAEE5"
            },
            interval: 0,
            rotate: -40
          },
          axisTick: {
            show: false
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: "#212230",
              width: "2"
            }
          },
          z: 10
        },
        yAxis: {
          splitLine: {
            show: true,
            lineStyle: {
              type: "dashed",
              color: ["#315070"]
            }
          }, //网格线
          axisLine: {
            show: true,
            lineStyle: {
              color: "#212230",
              width: "2"
            }
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            textStyle: {
              color: "#999"
            }
          }
        },
        dataZoom: [
          {
            type: "inside"
          }
        ],
        series: [
          {
            // For shadow
            type: "bar",
            itemStyle: {
              color: "rgba(0,0,0,0.05)"
            },
            barGap: "-100%",
            barCategoryGap: "40%",
            data: dataShadow,
            animation: false
          },
          {
            type: "bar",
            itemStyle: {
              color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: "#83bff6" },
                { offset: 0.5, color: "#188df0" },
                { offset: 1, color: "#188df0" }
              ])
            },
            emphasis: {
              itemStyle: {
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: "#2378f7" },
                  { offset: 0.7, color: "#2378f7" },
                  { offset: 1, color: "#83bff6" }
                ])
              }
            },
            data: data
          }
        ]
      };

      myChartBar.setOption(optionBar);

      // 折线图
      let myChartLine = this.$echarts.init(
        document.getElementById("echarts-line")
      );
      this["myChartLine"] = myChartLine;

      const optionLine = {
        xAxis: {
          type: "category",
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: "line"
          }
        ]
      };
      myChartLine.setOption(optionLine);
    },
    loadRightCharts() {
      // 柱状图
      let myChartRightBar = this.$echarts.init(
        document.getElementById("echarts-warn-total")
      );
      this["myChartRightBar"] = myChartRightBar;
      const dataAxis = [
        "超速",
        "急加速",
        "急减速",
        "疲劳驾驶",
        "设备拔出",
        "路线"
      ];
      let dataShadow = [];
      let yMax = 500;
      const data = [
        220,
        182,
        191,
        234,
        290,
        330,
        310,
        123,
        442,
        321,
        90,
        149,
        210,
        122,
        133,
        334,
        198,
        123,
        125,
        220
      ];

      for (var i = 0; i < data.length; i++) {
        dataShadow.push(yMax);
      }
      const optionRightBar = {
        xAxis: {
          // name: "路线",
          // nameLocation: "end",
          // nameTextStyle: {
          //   color: "#9CAEE5",
          //   verticalAlign: "top",
          //   fontSize: 10,
          //   align: "center"
          // },
          splitLine: { show: false }, //去除网格线
          data: dataAxis,
          axisLabel: {
            inside: false,
            textStyle: {
              color: "#9CAEE5"
            },
            interval: 0,
            rotate: 0
          },
          axisTick: {
            show: false
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: "#212230",
              width: "2"
            }
          },
          z: 10
        },
        yAxis: {
          splitLine: {
            show: true,
            lineStyle: {
              type: "dashed",
              color: ["#315070"]
            }
          }, //网格线
          axisLine: {
            show: true,
            lineStyle: {
              color: "#212230",
              width: "2"
            }
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            textStyle: {
              color: "#999"
            }
          }
        },
        dataZoom: [
          {
            type: "inside"
          }
        ],
        series: [
          {
            // For shadow
            type: "bar",
            itemStyle: {
              color: "rgba(0,0,0,0.05)"
            },
            barGap: "-100%",
            barCategoryGap: "40%",
            data: dataShadow,
            animation: false
          },
          {
            type: "bar",
            itemStyle: {
              color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: "#83bff6" },
                { offset: 0.5, color: "#188df0" },
                { offset: 1, color: "#188df0" }
              ])
            },
            emphasis: {
              itemStyle: {
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: "#2378f7" },
                  { offset: 0.7, color: "#2378f7" },
                  { offset: 1, color: "#83bff6" }
                ])
              }
            },
            data: data
          }
        ]
      };

      myChartRightBar.setOption(optionRightBar);
    },
    selectInsurer(ins) {
      this.currenInSurer = ins;
    },
    roadFilter(ins) {
      this.currentTraffic = ins;
    }
  }
};
</script>

<style lang="less" scoped>
.home {
  width: 100%;
  height: 100%;
  background: url("../assets/images/背景@2x.png") no-repeat center center;
  filter: "progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod='scale')";
  background-size: 100% 100%;
}
header {
  height: 11.87%;
  background: url("../assets/images/小马国炬调度中心@2x.png") no-repeat center
    center;
  background-size: contain;
}
section {
  height: calc(~"100% - 11.87%");
  padding: 0 30px;
  display: flex;
  justify-content: space-between;
  & > .left-pannel {
    width: 450px;
    height: 100%;
    // float: left;
    display: flex;
    flex-direction: column;
    & > div {
      display: flex;
      flex-direction: column;
    }
    & > .left-top {
      flex: 3;
      background: url("../assets/images/yhphb@2x.png") no-repeat center center;
      filter: "progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod='scale')";
      background-size: 100% 100%;
      display: flex;
      & > p {
        flex: 1;
      }
      & > .content {
        flex: 7;
        position: relative;
        .el-dropdown {
          // float: right;
          position: absolute;
          right: 20px;
        }
        table {
          padding-top: 30px;
          width: 100%;
        }
        .table-head {
          font-size: 16px;
          font-family: PingFang SC;
          font-weight: 400;
          color: rgba(156, 174, 229, 1);
        }
        tbody {
          td {
            height: 30px;
            line-height: 30px;
            font-size: 16px;
            font-family: Source Han Serif CN;
            font-weight: 300;
            color: rgba(195, 202, 217, 1);
          }
          .oil-normal-style {
            font-size: 21px;
            font-family: Impact;
            font-weight: 400;
            font-style: italic;
            color: rgba(0, 217, 139, 1);
          }
        }
      }
    }
    & > .left-bottom {
      flex: 7;
      box-sizing: border-box;
      width: 100%;
      margin-top: 15px;
      margin-bottom: 15px;
      background: url("../assets/images/ypjyh@2x.png") no-repeat center center;
      filter: "progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod='scale')";
      background-size: 100% 100%;
      & > p {
        flex: 1;
      }
      & > .content {
        flex: 16;
        display: flex;
        flex-direction: column;
        & > div {
          flex: 1;
        }
      }
    }
  }

  & > .center-pannel {
    width: calc(~"100% - 900px");
    box-sizing: border-box;
    padding: 0 30px;
    padding-bottom: 15px;
    .search {
      height: 65px;
      display: flex;
      .search-left {
        flex: 1;
        background: url("../assets/images/矩形 414 拷贝 7@2x.png") no-repeat
          center center;
        background-size: 100% 100%;
        display: flex;
        justify-content: space-around;
        align-items: center;
        font-size: 20px;
        font-family: Source Han Serif CN;
        font-weight: 300;
        color: rgba(195, 202, 217, 1);
      }
      .search-right {
        flex: 4;
        background: url("../assets/images/边框@2x.png") no-repeat center center;
        background-size: 100% 85%;
        .search-input {
          background: transparent;
          border: 0;
          width: 100%;
          height: 85%;
          text-decoration: 20em;
          font-size: 20px;
          color: transparent;
          padding-left: 2em;
          text-shadow: 0 0 0 white;
        }
        .search-input:focus {
          border: 0;
          outline: none;
        }
      }
    }
    .search-result {
      height: calc(~"100% - 65px");
       .min-table {
        border-collapse: collapse;
        border-spacing: 0;
        width: 100%;
        max-height: 100%;
        padding: 0;
        margin: 0;
        .thead {
          font-size: 16px;
          color: white;
          background: url("../assets/images/矩形 412 拷贝 6@2x.png");
          th {
            height: 49px;
          }
        }
        tbody {
          tr {
            // height: 20px;
            td {
              height: 50px;
              color: white;
            }
          }
        }
        .row-class {
          // height: 40px;
          color: white;
        }
      }
    }
  }

  & > .right-pannel {
    width: 450px;
    height: 100%;
    // float: right;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    & > div {
      display: flex;
      flex-direction: column;
    }
    & > .right-top {
      flex: 3;
      background: url("../assets/images/yhphb@2x.png") no-repeat center center;
      filter: "progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod='scale')";
      background-size: 100% 100%;
      & > p {
        flex: 1;
      }
      & > .content {
        flex: 8;
      }
    }
    & > .right-center {
      flex: 3;
      margin-top: 15px;
      margin-bottom: 15px;
      background: url("../assets/images/yhphb@2x.png") no-repeat center center;
      filter: "progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod='scale')";
      background-size: 100% 100%;
      & > p {
        flex: 1;
      }
      & > .content {
        flex: 7;
        position: relative;
        .el-dropdown {
          // float: right;
          position: absolute;
          right: 20px;
        }
        .content-main {
          height: 100%;
          padding-top: 30px;
          box-sizing: border-box;
          text-align: left;
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          & > p {
            display: flex;
            align-items: center;
          }
          img {
            padding-left: 30px;
          }
          .key-style {
            padding-left: 30px;
            font-size: 18px;
            font-family: Source Han Serif CN;
            font-weight: 300;
            color: rgba(195, 202, 217, 1);
          }
          .value-style {
            padding-left: 30px;
            font-size: 30px;
            font-family: Impact;
            font-weight: 400;
            font-style: italic;
          }
        }
      }
    }
    & > .right-bottom {
      flex: 4;
      margin-bottom: 15px;
      background: url("../assets/images/yhphb@2x.png") no-repeat center center;
      filter: "progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod='scale')";
      background-size: 100% 100%;
      & > p {
        flex: 1;
      }
      & > .content {
        flex: 7;
        position: relative;
        .el-dropdown {
          position: absolute;
          right: 20px;
        }
        .content-main {
          height: 100%;
          max-height: 300px;
          padding-top: 30px;
          box-sizing: border-box;
          // overflow: hidden;
          li {
            // height: 50px;
            line-height: 40px;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            font-size: 18px;
            font-weight: 300;
            color: rgba(195, 202, 217, 1);
            img {
              margin-right: 20px;
              margin-left: 50px;
            }
          }
        }
      }
    }
  }
}

.el-table .dark-blue {
  background: #090e28;
}

.el-dropdown-link {
  cursor: pointer;
  color: white;
}
.el-icon-arrow-down {
  font-size: 12px;
}
</style>
