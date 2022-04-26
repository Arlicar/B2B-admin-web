<template>
  <div>
    <!-- 顶部面包屑导航区域 -->
    <div class="top">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/Welcome' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>商品管理</el-breadcrumb-item>
        <el-breadcrumb-item>商品审核</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <!-- 卡片视图区 -->
    <div class="card">
      <el-card>
        <!-- 表格区域 -->
        <el-table :data="goodslist" border stripe>
          <el-table-column type="index" label="#"></el-table-column>
          <el-table-column
            label="商品ID"
            prop="goodsId"
            width="70px"
          ></el-table-column>
          <el-table-column
            label="商品名称"
            prop="goodsName"
            width="600px"
          ></el-table-column>
          <el-table-column
            label="商品种类"
            prop="categoryName"
          ></el-table-column>
          <el-table-column label="操作">
            <template scope="scope">
              <a
                href="javascript:;"
                @click="pass(scope.row.goodsId)"
                class="pass"
              >
                <i class="el-icon-circle-check"></i>
              </a>
              <!--!拒绝时弹出提示框 -->
              <el-popconfirm
                confirm-button-text="是的"
                cancel-button-text="取消"
                icon="el-icon-info"
                icon-color="red"
                title="是否选择不通过?"
                @confirm="refuse(scope.row.goodsId)"
              >
                <a href="javascript:;" class="refuse" slot="reference">
                  <i class="el-icon-circle-close"></i>
                </a>
              </el-popconfirm>
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
import { refuseGoods,passGoods } from "@/api/goods";
export default {
  data() {
    return {
      query: {
        state: "0",
        page: 1,
        rows: 10,
        goodsId: null,
      },
      goodslist: [],
      total: 0,
    };
  },
  created() {
    this.getGoodslist();
  },
  methods: {
    async getGoodslist() {
      const { data: res } = await this.$http.get("/admin/goodsList", {
        params: this.query,
      });
      if (res.data.code == 200) {
        return this.$message.error("获取商品审查列表失败!");
      }

      this.$message.success("获取商品审查列表成功!");
      // console.log(res.data);
      this.goodslist = res.data.goodsList;
      this.total = res.data.count;
    },
    //*审核通过
    async pass(id) {
      const {data:res} = await passGoods({goodsId:id})
      if (res.code !== 200) {
        return this.$message.error("操作失败！");
      }
      this.$message.success("操作成功！");
      this.getGoodslist();
    },
    //!审核不通过
    async refuse(id) {
      const {data:res} = await refuseGoods({goodsId:id})
      if (res.code !== 200) {
        return this.$message.error("操作失败！");
      }
      this.$message.success("操作成功！");
      this.getGoodslist();
    },
    handleSizeChange(newSize) {
      this.query.rows = newSize;
      this.goodslist();
    },
    handleCurrentChange(newPage) {
      this.query.page = newPage;
      this.goodslist();
    },
  },
};
</script>

<style scoped="scoped">
a {
  text-decoration: none;
  font-weight: 600;
  font-size: 25px;
}
.pass {
  color: #67c23a;
}
.refuse {
  color: #df8787;
}
</style>