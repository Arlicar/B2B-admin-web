<template>
  <div
    id="mywordcloud"
    style="width: 1200px; height: 600px; "
    :data="worddata"
  ></div>
</template>


<script>
import * as echarts from "echarts";
import "echarts-wordcloud/dist/echarts-wordcloud";
import "echarts-wordcloud/dist/echarts-wordcloud.min";
import { getWords } from "@/api/chart";
export default {
  data() {
    return {
      worddata: [
      ],
    };
  },
  created() {},
  mounted() {
    this.initChart();
  },
  methods: {
    async initChart() {

      const { data: res } = await getWords();
      this.worddata = res.data;

      this.chart = echarts.init(document.getElementById("mywordcloud"));
      const option = {
        //! 标题
        title: {
          text: "",
          x: "center",
        },
        backgroundColor: "#fff",
        tooltip: {
          pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>",
        },
        series: [
          {
            type: "wordCloud",
            //用来调整词之间的距离
            gridSize: 30,
            //用来调整字的大小范围
            // Text size range which the value in data will be mapped to.
            // Default to have minimum 12px and maximum 60px size.
            sizeRange: [15, 60],
            // Text rotation range and step in degree. Text will be rotated randomly in range [-90,                                                                             90] by rotationStep 45
            //用来调整词的旋转方向，，[0,0]--代表着没有角度，也就是词为水平方向，需要设置角度参考注释内容
            // rotationRange: [-45, 0, 45, 90],
            // rotationRange: [ 0,90],
            rotationRange: [0, 0],
            //随机生成字体颜色
            // maskImage: maskImage,

            textStyle: {
              normal: {
                color: function () {
                  return (
                    "rgb(" +
                    Math.round(Math.random() * 255) +
                    ", " +
                    Math.round(Math.random() * 255) +
                    ", " +
                    Math.round(Math.random() * 255) +
                    ")"
                  );
                },
              },
            },
            //位置相关设置
            // Folllowing left/top/width/height/right/bottom are used for positioning the word cloud
            // Default to be put in the center and has 75% x 80% size.
            left: "center",
            top: "center",
            right: null,
            bottom: null,
            width: "400%",
            height: "300%",
            //数据
            data: this.worddata,
          },
        ],
      };
      this.chart.setOption(option);
    },
  },
};
</script>

<style scoped>
</style>