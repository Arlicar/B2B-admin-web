<template>
  <div>
    <!-- <h1>销售统计</h1> -->
    <!-- 顶部面包屑导航区域 -->
    <div class="top">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/Welcome' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>统计报表</el-breadcrumb-item>
        <el-breadcrumb-item>销售统计</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <!-- tab分页区 -->
    <div class="tabs">
      <el-tabs v-model="activeName">
        <el-tab-pane label="分类词云" name="third"
          :lazy="true"><kindWordCloud></kindWordCloud
        ></el-tab-pane>
        <el-tab-pane label="商品统计" name="first"
          :lazy="true"><goodStatistics></goodStatistics
        ></el-tab-pane>
        <el-tab-pane label="订单统计" name="second"
          :lazy="true"><orderStatistics></orderStatistics
        ></el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import goodStatistics from "./sale_components/goodStatistics.vue";
import orderStatistics from "./sale_components/orderStatistics.vue";
import kindWordCloud from "./sale_components/kindWordCloud.vue";
export default {
  components: {
    goodStatistics,
    orderStatistics,
    kindWordCloud,
  },
  data() {
    return {
      activeName: "third",
      
    };
  },
};
</script>

<style scoped>

</style>