<template>
  <div>
      <!-- <h1>竞价</h1> -->

      <!-- 顶部面包屑导航区域 -->
    <div class="top">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/Welcome' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>订单管理</el-breadcrumb-item>
        <el-breadcrumb-item>竞价</el-breadcrumb-item>
      </el-breadcrumb>
    </div>


    <!-- 列表区 -->
    <div class="card">
      <el-card>
        <el-table :data="biddingList" border stripe>
          <el-table-column type="index" label="#"></el-table-column>
          <el-table-column label="竞价信息ID" prop="biddingId" width="100px"></el-table-column>
          <el-table-column label="公司ID" prop="companyId" width="100px"></el-table-column>
          <el-table-column label="公司名称" prop="companyName"></el-table-column>
          <el-table-column label="商品ID" prop="goodsId" width="100px"></el-table-column>
          <el-table-column label="商品名称" prop="goodsName" width="300px"></el-table-column>
          <el-table-column label="截至时间" prop="biddingDeadline"></el-table-column>
          <el-table-column label="当前最高报价" width="100px">
            <template scope="scope">
              {{scope.row.currentPrice}}元
            </template>
          </el-table-column>
          <el-table-column label="竞价人数" prop="quotationNuber" width="90px"></el-table-column>
        </el-table>
      </el-card>
    </div>

    <!-- 底部分页栏区域 -->
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
    
  </div>
</template>

<script>
import { getBiddings } from "@/api/orders";
export default {
  data(){
    return{
      query:{
        page:1,
        rows:10,
        biddingId:null
      },
      biddingList:[],
      total:0
    }
  },
  created(){
    this.getBiddingList()
  },
  methods:{
    async getBiddingList(){
      const {data:res} = await getBiddings({params:this.query})
      if(res.code !== 200)
        return this.$message.error('获取竞价列表失败~')
      this.$message.success('获取竞价列表成功！')
      this.biddingList = res.data.data
      this.total = res.data.count
    },
    handleSizeChange(newSize) {
      this.query.rows = newSize;
      this.getBiddingList();
    },
    handleCurrentChange(newPage) {
      this.query.page = newPage;
      this.getBiddingList();
    },
  }
}
</script>

<style>
</style>