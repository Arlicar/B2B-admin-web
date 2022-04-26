<template>
  <div>
      <!-- <h1>访问统计</h1> -->
    <!-- 顶部面包屑导航区域 -->
    <div class="top">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/Welcome' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>统计报表</el-breadcrumb-item>
        <el-breadcrumb-item>访问统计</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    

    <div class="chart" >
      数据统计:<em style="font-size: 20px">用户访问量</em>
      <hr />

      <div id="main"></div>
    </div>
  </div>
</template>

<script>
import * as echarts from "echarts";
import { getChart } from "@/api/chart";
export default {
  data() {
    return {};
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
    console.log(option.xAxis.data);
    option.series[0].data = res.data.times;
    myChart.setOption(option);
  },
  methods: {},
};
</script>

<style  scoped>
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

hr {
  border: 1px solid #80b168;
  width: 98%;
  margin-bottom: 3px;
}
</style>