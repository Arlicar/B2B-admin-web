<template>
  <div>
    <!-- <h1>售后列表</h1> -->
    <!-- 顶部面包屑导航区域 -->
    <div class="top">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/Welcome' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>订单管理</el-breadcrumb-item>
        <el-breadcrumb-item>售后列表</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <!-- 列表区 -->
    <div class="card">
      <el-card>
        <el-table :data="serviceList" stripe >
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item label="ID">
                  <span>{{ props.row.serviceId }}</span>
                </el-form-item>
                <el-form-item label="买家ID">
                  <span>{{ props.row.buyerId }}</span>
                </el-form-item>
                <el-form-item label="卖家ID">
                  <span>{{ props.row.sellerId }}</span>
                </el-form-item>
                <el-form-item label="服务单类型">
                  <span v-if="props.row.type == 0" >退货</span>
                  <span v-else-if="props.row.type == 1" >换货</span>
                  <span v-else class="blue span1">维修</span>
                </el-form-item>
                <el-form-item label="申请时间">
                  <span>{{ props.row.application_time }}</span>
                </el-form-item>
                <el-form-item label="申请原因">
                  <span>{{ props.row.reason }}</span>
                </el-form-item>
                <el-form-item label="状态">
                  <span v-if="props.row.state == 0" >处理</span>
                  <span v-else-if="props.row.state == 1" >接受</span>
                  <span v-else-if="props.row.state == 2" >拒绝</span>
                  <span v-else >仲裁中</span>
                </el-form-item>
                <el-form-item label="评分">
                  <span>{{ props.row.evaluate }}</span>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column type="index" label="#"></el-table-column>
          <el-table-column label="ID" prop="serviceId"></el-table-column>
          <el-table-column label="买家ID" prop="buyerId"></el-table-column>
          <el-table-column
            label="申请时间"
            prop="application_time"
          ></el-table-column>
          <el-table-column label="服务单类型">
            <template scope="scope">
              <span v-if="scope.row.type == 0" class="red span1">退货</span>
              <span v-else-if="scope.row.type == 1" class="green span1">换货</span>
              <span v-else class="blue span1">维修</span>
            </template>
          </el-table-column>

          <el-table-column label="状态">
            <template scope="scope">
              <span v-if="scope.row.state == 0" class="green span1">处理</span>
              <span v-else-if="scope.row.state == 1" class="blue span1">接受</span>
              <span v-else-if="scope.row.state == 2" class="red span1">拒绝</span>
              <span v-else class="span1">仲裁中</span>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </div>
  </div>
</template>

<script>
import { getService } from "@/api/orders";
export default {
  data() {
    return {
      query: {
        serviceId: null,
        page: 1,
        rows: 10,
      },
      serviceList: [],
      total: 0,
    };
  },
  created() {
    this.getServiceList();
  },
  methods: {
    async getServiceList() {
      const { data: res } = await getService({ params: this.query });
      if (res.code !== 200)
        return this.$message.error("售后服务列表获取失败Σ(っ °Д °;)っ");
      this.$message.success("售后列表获取成功✧(≖ ◡ ≖)");
      this.serviceList = res.data.serviceList;
      this.total = res.data.count;
    },
  },
};
</script>

<style scoped>
.span1 {
  font-size: 18px;
  font-weight: 600;
}
.green {
  color: #80b168;
}
.red {
  color: #df8787;
}
.blue {
  color: #87b7df;
}
.demo-table-expand {
  font-size: 18px;
  font-weight: 600;
  margin-left: 55px;
}
.demo-table-expand span{
  color: #99a9bf;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}

.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>