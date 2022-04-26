<template>
  <div>
    <!-- <h1>个人认证记录</h1> -->
    <!-- 顶部面包屑导航区域 -->
    <div class="top">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/Welcome' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
        <el-breadcrumb-item>个人认证记录</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <!-- 列表区 -->
    <div class="card">
      <el-card>
        <el-table :data="personList" border stripe>
          <el-table-column type="index" label="#"></el-table-column>
          <el-table-column label="身份证号" prop="IDNumber"></el-table-column>
          <el-table-column label="真实姓名" prop="name"></el-table-column>
          <el-table-column label="状态">
            <template scope="scope">
              <span class="pass" v-if="scope.row.state == 1">已通过</span>
              <span class="none" v-else>未通过</span>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </div>



      <div class="footer">
        <el-card>
          <!-- 分页区域 -->
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
import { getPersons } from "@/api/users";
export default {
  data() {
    return {
      query: {
        page: 1,
        rows: 10,
      },
      personList: [],
      total: 0,
    };
  },
  created() {
    this.getPersonList();
  },
  methods: {
    async getPersonList() {
      const { data: res } = await getPersons({ params: this.query });
      if (res.code !== 200) {
        return this.$message.error("获取个人认证信息失败~");
      }

      this.$message.success("获取个人认证信息成功!");
      this.personList = res.data.AuthenticationList;
      this.total = res.data.count;
    },
    handleSizeChange(newSize) {
      this.query.rows = newSize;
      this.getPersonList();
    },
    handleCurrentChange(newPage) {
      this.query.page = newPage;
      this.getPersonList();
    },
  },
};
</script>

<style scoped="scoped">
.pass{
  color: #67c23a;
  font-weight: 600;
  font-size: 15px;
}
.none{
  color: #df8787;
  font-weight: 600;
  font-size: 15px;
}
</style>