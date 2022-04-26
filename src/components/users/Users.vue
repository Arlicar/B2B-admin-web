<template>
  <div>
    <!-- <h1>用户列表</h1> -->

    <!-- 顶部面包屑导航区域 -->
    <div class="top">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/Welcome' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
        <el-breadcrumb-item>用户列表</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <!-- 列表区 -->
    <div class="card">
      <el-card>
        <el-table :data="userlist" border stripe>
          <el-table-column type="index" label="#"></el-table-column>
          <el-table-column label="用户ID" prop="userId"></el-table-column>
          <el-table-column label="用户名" prop="userName"></el-table-column>
          <el-table-column
            label="手机号"
            prop="phone"
            width="120px"
          ></el-table-column>
          <el-table-column label="头像" width="70px">
            <template scope="scope">
              <img :src="scope.row.imgUrl" alt="" />
            </template>
          </el-table-column>
          <el-table-column label="状态">
            <template scope="scope">
              <el-select
                v-model="scope.row.state"
                placeholder="请选择"
                @change="changeState($event, scope.row)"
              >
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                  :disabled="item.disabled"
                >
                </el-option>
              </el-select>
            </template>
          </el-table-column>
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
import { getUsers, changeUserState } from "@/api/users";
export default {
  data() {
    //! 0正常，1停用，2注销
    return {
      options: [
        {
          value: "0",
          label: "正常",
        },
        {
          value: "1",
          label: "停用",
        },
        {
          value: "2",
          label: "注销",
          disabled: true,
        },
      ],
      query: {
        page: 1,
        rows: 10,
        goodsId: null,
        state: "",
      },
      userlist: [],
      total: 0,
    };
  },
  created() {
    this.getUserList();
  },
  methods: {
    async getUserList() {
      const { data: res } = await getUsers({ params: this.query });
      if (res.code !== 200) {
        return this.$message.error("用户列表请求失败~");
      }

      this.$message.success("用户列表获取成功！");
      this.userlist = res.data.data;
      this.total = res.data.count;
    },
    handleSizeChange(newSize) {
      this.query.rows = newSize;
      this.getUserList();
    },
    handleCurrentChange(newPage) {
      this.query.page = newPage;
      this.getUserList();
    },
    async changeState(e, b) {
      const { data: res } = await changeUserState({
        state: e,
        userId: b.userId,
      });
      if (res.code !== 200) {
        return this.$message.error("修改失败~");
      }

      this.$message.success("修改成功");
      this.getUserList();
    },
  },
};
</script>

<style scoped = "scoped">
* {
  padding: 0;
  margin: 0;
}

img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  box-shadow: 5px 5px 10px -3px rgba(0, 0, 0, 0.3);
  border: 1px solid #fff;
  box-sizing: border-box;
}
</style>