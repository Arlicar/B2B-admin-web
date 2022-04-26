<template>
  <div>
    <!-- <h1>平台合同模板</h1> -->
    <!-- 顶部面包屑导航区域 -->
    <div class="top">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/Welcome' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>合同管理</el-breadcrumb-item>
        <el-breadcrumb-item>平台合同模板</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <!-- 列表区 -->
    <div class="card">
      <el-card>
        <el-row>
          <el-col :span="8">
            <el-input
              placeholder="请输入内容"
              v-model="query.search"
              clearable
              @clear="getContractList"
            >
              <el-button
                slot="append"
                icon="el-icon-search"
                @click="getContractList"
              ></el-button>
            </el-input>
          </el-col>
          <el-button
            type="success"
            round
            @click="drawer = true"
            style="margin-left: 700px"
            >上传模板</el-button
          >
        </el-row>
        <el-table :data="contractList" border stripe>
          <el-table-column type="index" label="#"></el-table-column>
          <el-table-column label="合同ID" prop="contractId"></el-table-column>
          <el-table-column label="合同名称" prop="fileName"></el-table-column>
          <el-table-column label="公司ID">
            <template scope="scope">
              <span v-if="scope.row.companyId == 0">系统</span>
              <span v-else>{{ scope.row.companyId }}</span>
            </template>
          </el-table-column>
          <el-table-column label="可见对象">
            <template scope="scope">
              <span v-if="scope.row.visibility == 0">所有人</span>
              <span v-else>该公司</span>
            </template>
          </el-table-column>
          <el-table-column label="合同下载">
            <template scope="scope">
              <a :href="scope.row.fileUrl">点击下载</a>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </div>

    <!-- 分页区域 -->
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

    <!-- 上传合同抽屉 -->
    <el-drawer
      title="上传模板(只能上传文档且不超过500kb)"
      :visible.sync="drawer"
      :direction="direction"
      :before-close="handleClose"
      size="24%"
    >
      <!-- 文件名输入框 -->
      <el-input
        placeholder="请输入模板名称"
        v-model="document.name"
        style="margin-top: 10px; margin-bottom: 20px"
      ></el-input>
      <!-- 文件上传 -->
      <el-upload
        class="upload-demo"
        drag
        action="https://www.fastmock.site/mock/76216c9487ff8ff706db0c754fe95f1c/lx-b2b/upload/img"
        :on-success="uploadDocument"
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">仅能上传单个文件</div>
      </el-upload>
      <!-- 提交按钮 -->
      <el-button
        type="success"
        round
        @click="submitDocument"
        style="margin-left: 130px; margin-top: 40px"
        >点击提交</el-button
      >
    </el-drawer>
  </div>
</template>

<script>
import { getTemplates, submitTemplates } from "@/api/contract";
export default {
  data() {
    return {
      query: {
        search: "",
        page: 1,
        rows: 10,
        contractId: null,
      },
      contractList: [],
      total: 0,
      drawer: false,
      direction: "rtl",
      document: {
        name: "",
        url: "",
      },
    };
  },
  created() {
    this.getContractList();
  },
  methods: {
    async getContractList() {
      const { data: res } = await getTemplates({ params: this.query });
      if (res.code !== 200) {
        return this.$message.error("合同获取失败~");
      }
      this.$message.success("合同获取成功！");
      this.contractList = res.data.data;
      this.total = res.data.count;
    },
    handleSizeChange(newSize) {
      this.query.rows = newSize;
      this.getContractList();
    },
    handleCurrentChange(newPage) {
      this.query.page = newPage;
      this.getContractList();
    },
    //!抽屉
    handleClose(done) {
      this.$confirm("确认还没提交就关闭吗？(｡･∀･)ﾉﾞ")
        .then((_) => {
          done();
          location.reload();
        })
        .catch((_) => {});
    },
    //!文件上传服务器成功后的回调函数
    uploadDocument(res) {
      this.document.url = res.data;
    },
    //!提交文件name和url到后台
    async submitDocument() {
      if (this.document.name == "") this.$message.error("请输入模板名称~");
      else if (this.document.url == "") this.$message.error("请上传文件~");
      else {
        const { data: res } = await submitTemplates({
          params: {
            name: this.document.name,
            url: this.document.url,
          },
        });
        if (res.code !== 200) {
          return this.$message.error("提交失败~");
        }

        this.$message.success("提交成功！");
        this.drawer = false;
        setInterval(function(){
          location.reload();
        },1500)
      }
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
.el-input__inner {
  width: 90% !important;
}
</style>