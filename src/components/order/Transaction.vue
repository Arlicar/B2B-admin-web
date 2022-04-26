<template>
  <div>
    <!-- 顶部面包屑导航区域 -->
    <div class="top">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/Welcome' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>订单管理</el-breadcrumb-item>
        <el-breadcrumb-item>交易订单</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <!-- 卡片视图区 -->
    <div class="card">
      <el-card>
        <el-row>
          <el-col :span="10">
            <!-- 根据Id查询订单 -->
            <el-input
              placeholder="请输入订单ID"
              v-model="query.search"
              clearable
              @clear="getOrderList"
            >
              <el-button
                slot="append"
                icon="el-icon-search"
                @click="getOrderList"
              ></el-button>
            </el-input>
          </el-col>
        </el-row>

        <!-- table表格区域 -->
        <el-table border stripe :data="ordersList">
          <el-table-column type="index" label="#"></el-table-column>
          <el-table-column label="订单ID" prop="orderId"></el-table-column>
          <el-table-column label="买家名称" prop="buyerName"></el-table-column>
          <el-table-column label="卖家名称" prop="sellerName"></el-table-column>
          <el-table-column label="创建时间" prop="orderTime"></el-table-column>
          <el-table-column label="交易总额(元)" prop="dues"></el-table-column>
          <el-table-column label="订单状态" prop="orderState"></el-table-column>
          <el-table-column label="商品名称">
            <template scope="scope">
              <el-row v-for="(item, index) in scope.row.stockList" :key="index">
                {{ item.goodsName }}
              </el-row>
            </template>
          </el-table-column>
          <el-table-column label="查看详情"
            ><a href="javascript:;" @click="showDetail()"
              >点击</a
            ></el-table-column
          >
        </el-table>
      </el-card>
    </div>

    <!-- 底部分页区 -->
    <div class="footer">
      <el-card>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="query.page"
          :page-sizes="[10, 15, 30, 60]"
          :page-size="query.rows"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          background
        >
        </el-pagination>
      </el-card>
    </div>

    <!-- 详细信息对话框 -->
    <el-dialog title="该订单详细信息" :visible.sync="dialogVisible" width="50%">
      <span>这是一段信息</span>
      <span slot="footer" class="dialog-footer"> </span>
    </el-dialog>
  </div>
</template>

<script>
import { getOrders } from "@/api/orders";
export default {
  data() {
    return {
      query: {
        search: "",
        page: 1,
        row: 10,
        orderId: null,
      },
      ordersList: [],
      total: 0,
      dialogVisible: false,
    };
  },
  created() {
    this.getOrderList();
  },
  methods: {
    async getOrderList() {
      const { data: res } = await getOrders({ params: this.query });
      if (res.code !== 200) {
        return this.$message.error("订单信息获取失败~");
      }
      this.$message.success("订单信息获取成功!");
      this.ordersList = res.data.ordersList;
      this.total = res.data.count;
    },
    handleSizeChange(newSize) {
      this.query.rows = newSize;
      this.ordersList();
    },
    handleCurrentChange(newPage) {
      this.query.page = newPage;
      this.ordersList();
    },
    //! 展示订单详细信息
    showDetail() {
      this.dialogVisible = true;
    },
  },
};
</script>

<style scoped="scoped">

a {
  text-decoration: none;
  color: #67c23a;
  font-weight: 600;
  font-size: 15px;
}
</style>