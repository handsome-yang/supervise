<template>
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
</template>

<script>
export default {
  name: "leftpanel",
  data() {
    return {
      oilColor: "#00D98B",
    };
  },
  created() {},
  mounted() {
    this.loadLeftCharts();
    // window.addEventListener("resize", this.resizeCharts);
    // this.$once("hook:beforeDestroy",() => {
    //     window.removeEventListener("resize",this.resizeCharts)
    // })
  },
  methods: {
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
            inside: false,
            textStyle: {
              color: "#9CAEE5"
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
          splitLine: { show: false }, //去除网格线
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
          axisLine: {
            show: true,
            lineStyle: {
              color: "#212230",
              width: "2"
            }
          },
          axisLabel: {
            inside: false,
            textStyle: {
              color: "#9CAEE5"
            },
            interval: 0,
            rotate: -40
          }
        },
        yAxis: {
          type: "value",
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
          axisLabel: {
            inside: false,
            textStyle: {
              color: "#9CAEE5"
            }
          }
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
    resizeCharts() {
      this.myChartBar.resize();
      this.myChartLine.resize();
    },
    selectItem(com) {
      this.oilColor = com == 2 ? "#FF4049" : "#00D98B";
    },
  }
};
</script>
<style lang="less" scoped>
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
.left-pannel {
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
</style>