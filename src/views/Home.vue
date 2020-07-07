<template>
  <div class="home">
    <header></header>
    <section>
      <left-panel ref="left-panel"></left-panel>

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
          <el-table
            :data="tableData"
            :max-height="mainTableHeight"
            header-row-class-name="table-header-class"
            style="width: 100%"
          >
            <el-table-column
              type="index"
              :show-overflow-tooltip="true"
              label="序 号"
              min-width="10%"
              align="center"
            ></el-table-column>
            <el-table-column prop="vno" label="车牌号" min-width="10%" align="center"></el-table-column>
            <el-table-column prop="driver_name" label="驾驶员" min-width="10%" align="center"></el-table-column>
            <el-table-column prop="terminal_sim" label="电话" min-width="15%" align="center"></el-table-column>
            <el-table-column
              prop="alarm_type_name"
              :show-overflow-tooltip="true"
              label="报警类型"
              min-width="10%"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="address"
              label="报警地点"
              :show-overflow-tooltip="true"
              align="center"
              min-width="20%"
            ></el-table-column>
            <el-table-column
              label="报警时间"
              :show-overflow-tooltip="true"
              min-width="15%"
              align="center"
            >
              <template slot-scope="scope">
                <span>{{unixTimeformat(scope.row.gps_time)}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="driver" label="操作" min-width="10%" align="center">
              <el-button @click="handlerDialog = true" type="primary" size="mini">处理</el-button>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <right-panel ref="right-panel"></right-panel>
    </section>

    <el-dialog :visible.sync="handlerDialog">
      <el-table :data="historyPunish" style="width: 100%">
        <el-table-column prop="date" label="日期" width="180"></el-table-column>
        <el-table-column prop="name" label="姓名" width="180"></el-table-column>
        <el-table-column prop="address" label="地址"></el-table-column>
      </el-table>
      <el-radio-group size="medium" v-model="punishRadio">
        <el-radio :label="3" border>提醒</el-radio>
        <el-radio :label="6" border>罚款</el-radio>
        <el-radio :label="9" border>停运</el-radio>
      </el-radio-group>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handlerDialog = false">取 消</el-button>
        <el-button type="primary" @click="handlerDialog = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
// @ is an alias to /src
import { login, initBaseAlarm, QuerySpecifyTypeCarAlarm } from "@/api";
import { transportInitWebSocket } from "@/api/aspnetSignalR";

import leftPanel from "@/components/LeftPanel";
import RightPanel from "@/components/RightPanel";
export default {
  name: "Home",
  components: {
    leftPanel,
    RightPanel
  },
  data() {
    return {
      loginInfo: {
        username: "admin",
        password: "xiaoma256178"
      },
      mainTableHeight: 0,
      handlerDialog: false,
      punishRadio: 3,
      tableData: [
      ],
      historyPunish: [{
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-08',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-06',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-07',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }]
    };
  },
  created() {
    login(this.loginInfo).then(res => {
      sessionStorage.setItem("token", res);
      this.getAlarm();
      transportInitWebSocket(this);
      this.$refs["right-panel"].loadRightCharts();
    });
    // this.initWebsocket();
    this.$nextTick(() => {
      this.resizeTable();
    });
  },
  mounted() {
    var resizeTimer = null;
    window.addEventListener("resize", () => {
      if (resizeTimer) {
        clearTimeout(resizeTimer);
      }
      resizeTimer = setTimeout(() => {
        this.resizeTotal();
      }, 310);
    });

    this.$once("hook:beforeDestory", () => {
      window.removeEventListener("resize", this.resizeTotal);
    });
  },
  computed: {},
  methods: {
    unixTimeformat(time) {
      return this.$moment.unix(time).format("YYYY-MM-DD HH:mm");
    },
    resizeTable() {
      let desHeight =
        document.querySelector(".search-result").offsetHeight - "10";
      this.mainTableHeight = desHeight;
    },
    initWebsocket() {
      let token = sessionStorage.getItem("token");
      const ws = new WebSocket(
        `ws:map.guojutech.net/PositionHub?Bearer=${token}`
      );
      ws.onopen = () => {
        console.log("连接成功");
      };
      ws.onmessage = msg => {
        console.log(msg);
      };
      ws.onerror = err => {
        console.log(err);
      };
    },
    getAlarm() {
      // const rules = ["超速报警", "疲劳驾驶报警", "终端插入报警"];
      QuerySpecifyTypeCarAlarm().then(res => {
        for (let key in res) {
          res[key]["terminal_sim"] = res[key].sim;
        }
        this.tableData = res;
      });
    },
    resizeTotal() {
      this.resizeTable();
      this.$refs["left-panel"].resizeCharts();
      this.$refs["right-panel"].resizeCharts();
    },
    labelHead(h, { column, index }) {
      let l = column.label.length;
      let f = 54; //每个字大小，其实是每个字的比例值，大概会比字体大小差不多大一点，
      column.minWidth = f * l; //字大小乘个数即长度 ,注意不要加px像素，这里minWidth只是一个比例值，不是真正的长度 //然后将列标题放在一个div块中，注意块的宽度一定要100%，否则表格显示不完全
      return h("div", { class: "table-head", style: { width: "100%" } }, [
        column.label
      ]);
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

      // ele样式覆盖
      /deep/.el-table th,
      /deep/.el-table tr {
        background: transparent;
      }
      /deep/.el-table,
      /deep/.el-table__expanded-cell {
        background: transparent;
        font-size: 16px;
        color: white;
      }
      /deep/.el-table td,
      /deep/.el-table th.is-leaf {
        border-bottom: 0;
      }
      /deep/.el-table--enable-row-hover .el-table__body tr:hover > td {
        background: transparent;
        // pointer-events: none;
      }

      /deep/.el-table::before {
        height: 0;
      }

      /deep/.table-header-class {
        font-size: 16px;
        color: white;
        background: url("../assets/images/矩形 412 拷贝 6@2x.png") no-repeat !important;
        filter: "progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod='scale')";
        background-size: 100% 100% !important;
        // background-size: cover;
        th {
          height: 49px;
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
