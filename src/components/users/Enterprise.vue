<template>
  <div>
      <!-- <h1>企业认证记录</h1> -->
      <!-- 顶部面包屑导航区域 -->
    <div class="top">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/Welcome' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
        <el-breadcrumb-item>企业认证记录</el-breadcrumb-item>
      </el-breadcrumb>
    </div>


    <div class="card">
      <el-card>
        <el-table :data="companiesList" border stripe>
          <el-table-column type="index" label="#"></el-table-column>
          <el-table-column label="企业名称"  prop="companyName"></el-table-column>
          <el-table-column label="发起时间"  prop="authenticationTime"></el-table-column>
          <el-table-column label="信用代码"  prop="business_license"></el-table-column>
          <el-table-column label="法人姓名"  prop="corporationName"></el-table-column>
          <el-table-column label="年限"  prop="businessYear"></el-table-column>
          <el-table-column label="状态"  >
            <template scope="scope">
              <span v-if="scope.row.state == 1" class="finish">已认证</span>
              <span v-else-if="scope.row.state == 0" class="none">未认证</span>
            </template>
          </el-table-column>
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
  </div>
</template>

<script>
import { getCompanies } from "@/api/users";
export default {
  data(){
    return{
      query:{
        page: 1,
        rows: 10,
        state: "",
      },
      companiesList:[],
      total:0
    }
  },
  created(){
    this.getCompaniesList()
  },
  methods:{
    async getCompaniesList(){
      const {data:res} = await getCompanies({params:this.query})
      if(res.code !== 200){
        return this.$message.error('获取企业记录失败~')
      }
      this.$message.success('获取企业记录成功！')
      this.companiesList = res.data.authenticationList
      this.total = res.data.count
    },
    handleSizeChange(newSize) {
      this.query.rows = newSize;
      this.getCompaniesList();
    },
    handleCurrentChange(newPage) {
      this.query.page = newPage;
      this.getCompaniesList();
    },
  }
}
</script>

<style scoped="scoped">
.finish{
  font-size: 15px;
  font-weight: 600;
  color: #80b168;
}
.none{
  font-size: 15px;
  font-weight: 600;
  color: #df8787;
}
</style>