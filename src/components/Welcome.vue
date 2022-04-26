<template>
  <div class="main">
    <!-- 顶部区域 -->
    <div class="top">
      WELCOME！
      <div class="headPortrait">
        {{ userName }}
        <img src="../assets/imgs/HeadPortrait.jpg" />
      </div>
    </div>

    <!-- 中间主体区 -->
    <div class="main1">
      早安，管理员，请开始一天的工作吧
      <img src="../assets/imgs/welcome-bgc1.png" />
    </div>

    <!-- 数据视图区 -->
    <div class="chart">
      数据统计:<em style="font-size: 20px">用户访问量</em>
      <hr />

      <div id="main"></div>
    </div>
    <!-- 快捷入口区 -->
    <div class="enter">
      <div class="left"></div>
      <div class="right"></div>
      快捷入口
      <hr />
      <el-row :gutter="12">
        <el-col :span="4">
          <el-card shadow="hover"
            ><i class="el-icon-s-goods"></i> 商品管理
          </el-card>
        </el-col>

        <el-col :span="4">
          <el-card shadow="hover"
            ><i class="el-icon-s-order"></i> 订单管理
          </el-card>
        </el-col>

        <el-col :span="4">
          <el-card shadow="hover"
            ><i class="el-icon-edit"></i> 用户管理
          </el-card>
        </el-col>

        <el-col :span="4">
          <el-card shadow="hover"
            ><i class="el-icon-s-marketing"></i> 统计报表
          </el-card>
        </el-col>

        <el-col :span="4">
          <el-card shadow="hover"
            ><i class="el-icon-user-solid"></i> 关于我们
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import * as echarts from "echarts";
import { getChart } from "@/api/chart";
import store from "@/store";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      userName: this.$store.getters.userInfo.userName,
    };
  },
  computed: {
    ...mapGetters(["userInfo"]),
  },
  async mounted() {
    var myChart = echarts.init(document.getElementById("main"));

    const { data: res } = await getChart();

    if (res.code !== 200) {
      return this.$message.error("获取折线图数据失败~");
    }

    var option = {
      xAxis: {
        type: "category",
        data: [],
        name: "日期",
        boundaryGap: false,
      },
      yAxis: {
        type: "value",
        name: "次数",
      },
      series: [
        {
          data: [],
          type: "line",
          lineStyle: {
            normal: {
              color: "#24550c",
              width: 3,
              type: "dashed",
            },
          },
          itemStyle: {
            color: "#fff",
          },
          stack: "Total",
          areaStyle: {},
          emphasis: {
            focus: "series",
          },
        },
      ],
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "cross",
          label: {
            backgroundColor: "#7fb068",
          },
        },
      },
    };
    option.xAxis.data = res.data.date;
    option.series[0].data = res.data.times;
    myChart.setOption(option);
  },
  methods: {},
};
</script>

<style scoped="scoped">
* {
  padding: 0;
  margin: 0;
}

.top {
  position: relative;
  height: 60px;
  background-color: #fff;
  border-radius: 15px;
  box-shadow: 10px 10px 10px -4px rgba(0, 0, 0, 0.3);
  line-height: 60px;
  padding-left: 30px;
  font-weight: 600;
  font-size: 25px;
  color: #80b168;
  margin-bottom: 20px;
}

.headPortrait {
  position: absolute;
  padding-top: 10px;
  top: 0px;
  height: 50px;
  line-height: 50px;
  right: 15px;
  font-size: 18px;
}

.headPortrait img {
  width: 40px;
  border-radius: 50%;
}

.main1 {
  position: relative;
  height: 200px;
  background-color: #fff;
  border-radius: 15px;
  box-shadow: 10px 10px 10px -4px rgba(0, 0, 0, 0.3);
  overflow: hidden;
  margin-bottom: 20px;
  font-weight: 600;
  font-size: 25px;
  color: #80b168;
  padding-left: 10px;
}

.main1 img {
  position: absolute;
  right: 80px;
  top: -90px;
  height: 400px;
}

.enter {
  position: relative;
  height: 250px;
  background-color: #fff;
  border-radius: 15px;
  box-shadow: 0px 20px 10px -10px rgba(0, 0, 0, 0.3);
  font-weight: 600;
  font-size: 25px;
  color: #80b168;
  padding-left: 20px;
  margin-bottom: 20px;
}

hr {
  border: 1px solid #80b168;
  width: 98%;
  margin-bottom: 3px;
}

.el-row {
  padding-top: 50px;
  padding-left: 150px;
}

.el-card {
  text-align: center;
  cursor: pointer;
  color: #80b168;
}

.chart {
  height: 400px;
  width: 98.5%;
  background-color: #fff;
  border-radius: 15px;
  box-shadow: 10px 10px 10px -4px rgba(0, 0, 0, 0.3);
  font-weight: 600;
  font-size: 25px;
  color: #80b168;
  padding-left: 20px;
  margin-bottom: 20px;
}

#main {
  width: 98%;
  height: 88%;
  background-color: rgba(66, 145, 64, 0.5);
  border-radius: 15px;
  box-shadow: 10px 10px 10px -4px rgba(0, 0, 0, 0.4);
}

.enter .left {
  position: absolute;
  top: 50px;
  left: 0;
  width: 0;
  height: 0;
  line-height: 0;
  font-size: 0;
  border: 80px solid transparent;
  border-left-color: #80b168;
}

.enter .right {
  position: absolute;
  top: 50px;
  right: 0;
  width: 0;
  height: 0;
  line-height: 0;
  font-size: 0;
  border: 80px solid transparent;
  border-right-color: #80b168;
}
</style>