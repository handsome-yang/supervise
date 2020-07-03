<template>
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
            <!-- <span
                  class="value-style"
                  :style="{'color':item.color}"
            >{{item.value}} &nbsp;{{item.unit}}</span>-->
            <count-to
              :style="{'color':item.color}"
              class="value-style"
              :start-val="0"
              :end-val="item.value"
              :duration="4000"
              :decimals="0"
              separator=","
              :prefix="[1,3].includes(index) ? '¥' : ''"
              :suffix="item.unit"
              :autoplay="true"
            ></count-to>
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
</template>

<script>
import countTo from "vue-count-to";
import { QueryWeekAlarmStatistics } from "@/api";
export default {
  name: "rightpanel",
  data() {
    return {
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
      },
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
            value: 8658,
            color: "#00D98B",
            unit: "辆"
          },
          {
            img: require("../assets/images/矩形 414 拷贝 2@2x.png"),
            key: "投保金额",
            value: 128658,
            color: "#D99900",
            unit: ""
          },
          {
            img: require("../assets/images/矩形 414 拷贝 3@2x.png"),
            key: "理赔次数",
            value: 12,
            color: "#00BAFF",
            unit: "次"
          },
          {
            img: require("../assets/images/矩形 414 拷贝 4@2x.png"),
            key: "理赔金额",
            value: 121930,
            color: "#9C35DD",
            unit: ""
          }
        ]
      }
    };
  },
  components: {
    countTo
  },
  mounted() {
    this.loadRightCharts();
  },
  methods: {
    selectInsurer(ins) {
      this.currenInSurer = ins;
    },
    roadFilter(ins) {
      this.currentTraffic = ins;
    },
    loadRightCharts() {
      QueryWeekAlarmStatistics().then(res => {
          console.log(res);
          
      });
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

      myChartRightBar.setOption(optionRightBar);
    },
    resizeCharts() {
      this.myChartRightBar.resize();
    }
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
.right-pannel {
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
</style>