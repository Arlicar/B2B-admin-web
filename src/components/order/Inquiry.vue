<template>
  <div>
    <!-- 询比价order/inquiry/getAll -->
    <!-- 顶部面包屑导航区域 -->
    <div class="top">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/Welcome' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>订单管理</el-breadcrumb-item>
        <el-breadcrumb-item>询比价</el-breadcrumb-item>
      </el-breadcrumb>
    </div>



    <div class="card">
      <el-card>
        <!-- 表格区域 -->
        <el-table :data="inquiryList" border stripe>
          <el-table-column type="index" label="#"></el-table-column>
          <el-table-column  label="ID" prop="inquiryId" width="60px"></el-table-column>
          <el-table-column  label="标题" prop="inquiryTitle"></el-table-column>
          <el-table-column  label="公司名称" prop="companyName" ></el-table-column>
          <el-table-column  label="开始时间" prop="inquiryTime"></el-table-column>
          <el-table-column  label="结束时间" prop="inquiryDeadline"></el-table-column>
          <el-table-column  label="物料名称">
            <template scope="scope">
              <el-row v-for="(item,index) in scope.row.requirementOfMaterialDtos" :key="index">
                {{item}}
              </el-row>
            </template>
          </el-table-column>
          <el-table-column  label="操作" >
            <a href="javascript:;"><i class="el-icon-circle-close"></i></a>
          </el-table-column>
        </el-table>
      </el-card>
    </div>


    <!-- 底部分页区域 -->
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
import {getInquiry} from "@/api/orders"
export default {
  data() {
    return {
      query:{
        page: 1,
        rows: 10,
        inquiryId:null
      },
      inquiryList:[],
      total:0
    };
  },
  created() {
    this.getInquiryList()
  },
  methods:{
    async getInquiryList(){
      const {data:res} = await getInquiry({params:this.query})
      // console.log(res);
      if(res.code !== 200){
        return this.$message.error('询价信息获取失败~')
      }
      this.$message.success('询价信息获取成功！')
      this.inquiryList = res.data.data
      this.total = res.data.count
    },
    handleSizeChange(newSize) {
      this.query.rows = newSize;
      this.goodslist();
    },
    handleCurrentChange(newPage) {
      this.query.page = newPage;
      this.goodslist();
    },
  }
};
</script>

<style scoped = "scoped">
.footer{
  border-radius: 15px;
  box-shadow: 10px 10px 10px -4px rgba(0, 0, 0, 0.3);
}
a {
  text-decoration: none;
  font-weight: 600;
  font-size: 40px;
  color: #df8787;
}
</style>