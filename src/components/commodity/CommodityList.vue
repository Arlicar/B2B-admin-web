<template>
  <div>
    <!-- 顶部面包屑导航区域 -->
    <div class="top">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/Welcome' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>商品管理</el-breadcrumb-item>
        <el-breadcrumb-item>商品列表</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <!-- 卡片视图区域 -->
    <div class="card">
      <div class="card">
      <el-card>
        <el-row>
          <el-col :span="8">
            <el-input
              placeholder="请输入内容"
              v-model="query.search"
              clearable
              @clear="getCommodityList"
            >
              <el-button slot="append" icon="el-icon-search" @click="getCommodityList"></el-button>
            </el-input>
          </el-col>

          <el-select
            v-model="query.state"
            placeholder="请选择"
            @change="getCommodityList"
          >
            <el-option
              v-for="item in option"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-row>

        <!-- table表格区域 -->
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
          <el-table-column label="商品状态" prop="state">
            <template slot-scope="scope">
              <span v-if="scope.row.state == '1'">未上架</span>
              <span v-else-if="scope.row.state == '2'">销售中</span>
            </template>
          </el-table-column>
          <el-table-column label="商品详情">
            <template slot-scope="scope">
              <a href="Javascript:;" @click="showDetail(scope.row.goodsId)"
                >点击了解</a
              >
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <span v-if="scope.row.state == '1'">无</span>
              <span v-else-if="scope.row.state == '2'"><el-popconfirm
                confirm-button-text="是的"
                cancel-button-text="不用了"
                icon="el-icon-info"
                icon-color="red"
                title="确定强制下架吗？"
                @confirm="changeDown(scope.row.goodsId)"
              >
                <a href="Javascript:;"  slot="reference" >强制下架</a>
              </el-popconfirm></span>
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

    <!-- 详细信息对话框 -->
    <el-dialog title="该商品详细信息" :visible.sync="dialogVisible" width="50%">
      <span>这是一段信息</span>
      <span slot="footer" class="dialog-footer"> </span>
    </el-dialog>
  </div>
</template>

<script>
import Template from "../contract/Template.vue";
export default {
  components: { Template },
  data() {
    return {
      option: [
        {
          value: "1",
          label: "未上架",
        },
        {
          value: "2",
          label: "销售中",
        },
      ],
      //查询参数对象
      query: {
        //1是未上架,2是销售中,0是待审核
        search: "",
        state: "2",
        page: 1,
        rows: 10,
        goodsId: null,
      },
      goodslist: [],
      total: 0,
      //控制详细信息对话框的出现
      dialogVisible: false,
    };
  },
  created() {
    this.getCommodityList();
  },
  methods: {
    //根据分页获取对应的商品列表
    async getCommodityList() {
      const { data: res } = await this.$http.get("/admin/goodsList", {
        params: this.query,
      });
      if (res.data.code == 200) {
        return this.$message.error("获取商品列表失败!");
      }

      this.$message.success("获取商品列表成功!");

      this.goodslist = res.data.goodsList;
      this.total = res.data.count;
    },
    handleSizeChange(newSize) {
      this.query.rows = newSize;
      this.getCommodityList();
    },
    handleCurrentChange(newPage) {
      this.query.page = newPage;
      this.getCommodityList();
    },
    //!展示商品详细信息
    async showDetail(id) {

      this.dialogVisible = true;
    },
    //!强制下架功能
    async changeDown(id) {

      this.$http.put('/goods/off',{goodsId:id})
      getCommodityList()
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
span {
  color: #67c23a;
  font-weight: 600;
  font-size: 20px;
}
</style>