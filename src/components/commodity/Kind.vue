<template>
  <div>
    <!-- 顶部面包屑导航区域 -->
    <div class="top">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/Welcome' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>商品管理</el-breadcrumb-item>
        <el-breadcrumb-item>分类管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <!-- 列表区 -->
    <div class="card">
      <el-card>
        <el-row>
          <el-button type="success" round :disabled="Data.currentLevel <= 1" @click="toBeforeLevel">查看上级</el-button>
          <el-button
            type="success"
            icon="el-icon-circle-plus"
            @click="showAddDialog"
            >新建分类</el-button
          >
        </el-row>
        <el-table :data="Data.categoryList" border stripe>
          <el-table-column type="index" label="#"></el-table-column>
          <el-table-column label="ID" prop="categoryId"></el-table-column>
          <el-table-column
            label="类别级数"
            prop="categoryLevel"
          ></el-table-column>
          <el-table-column
            label="类别名称"
            prop="categoryName"
          ></el-table-column>
          <el-table-column label="操作">
            <template scope="scope">
              <el-button type="success" :disabled="Data.currentLevel >= 3" round @click="toNextLevel(scope.row.categoryId)">查看下级</el-button>
              <a href="javascript:;" class="edit" @click="showUpdateDialog(scope.row.categoryId,scope.row.categoryName)"
                >编辑</a
              >
              <el-popconfirm
                confirmButtonText="好的"
                cancelButtonText="不用了"
                icon="el-icon-warning"
                iconColor="red"
                title="确定删除吗？"
                @confirm="deleteKind(scope.row.categoryId)"
              >
                <a href="javascript:;" class="delete" slot="reference"
                  ><i class="el-icon-delete-solid"></i
                ></a>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </div>

    <!-- 新增按钮对话框 -->
    <el-dialog title="新建分类" :visible.sync="addDialogVisible" width="50%" @close="closeAddDialog">
      <el-form ref="addCategoryFormRef" :model="addCategoryForm" label-width="70px">
        <el-form-item label="父分类ID" prop="parentId" >
          <el-input v-model="addCategoryForm.parentId" disabled></el-input>
        </el-form-item>
        <el-form-item label="分类名称" prop="categoryName">
          <el-input v-model="addCategoryForm.categoryName"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false" icon="el-icon-error">取 消</el-button>
        <el-button type="success" @click="submitAddCategory"
          icon="el-icon-s-promotion">提 交</el-button
        >
      </span>
    </el-dialog>

    <!-- 编辑按钮对话框 -->
    <el-dialog title="编辑" :visible.sync="updateDialogVisible" width="50%">
      
      <el-form ref="updateCategoryFormRef" :model="updateCategoryForm" label-width="70px">
        <el-form-item label="分类ID" prop="categoryId">
          <el-input v-model="updateCategoryForm.categoryId" disabled></el-input>
        </el-form-item>
        <el-form-item label="分类名称" prop="categoryName">
          <el-input v-model="updateCategoryForm.categoryName"></el-input>
        </el-form-item>
      </el-form>
      
      
      <span slot="footer" class="dialog-footer">
        <el-button @click="updateDialogVisible = false" icon="el-icon-error">取 消</el-button>
        <el-button type="success" @click="submitUpdateCategory"
          icon="el-icon-edit">修 改</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getCategory, deleteCategory,addCategory,updateCategory } from "@/api/goods";
export default {
  data() {
    return {
      addDialogVisible: false,
      updateDialogVisible: false,
      Data: {
        preParentId: 0,
        parentId: 0,
        currentLevel: 1,
        categoryList: [],
      },
      query: {},
      addCategoryForm:{
        parentId:null,
        categoryName:''
      },
      updateCategoryForm:{
        categoryId:null,
        categoryName:''
      }
    };
  },
  created() {
    this.getCategoryList();
  },
  mounted() {},
  methods: {
    async getCategoryList() {
      const { data: res } = await getCategory({ parentId:this.Data.parentId });
      if (res.code !== 200) {
        return this.$message.error("获取分类信息失败~");
      }

      this.$message.success("获取分类信息成功!");
      this.Data.categoryList = res.data;
    },
    //*展示添加分类对话框
    showAddDialog() {
      this.addCategoryForm.parentId = this.Data.parentId
      this.addDialogVisible = true;
    },
    showUpdateDialog(id,name) {
      this.updateCategoryForm.categoryId = id
      this.updateCategoryForm.categoryName = name
      this.updateDialogVisible = true;
    },
    //*关闭对话框后重置输入
    closeAddDialog(){
      this.$refs.addCategoryFormRef.resetFields()
    },
    //*删除分类
    async deleteKind(i) {
      const { data: res } = await deleteCategory({ categoryId: i });
      if (res.code !== 200) {
        return this.$message.error("删除失败~");
      }
      this.$message.success("删除成功!");
      this.getCategoryList();
    },
    //* 提交新分类
    async submitAddCategory(){
      if(this.addCategoryForm.parentId == null)
        return this.$message.error('请填写父分类ID')
      if(this.addCategoryForm.categoryName == '')
        return this.$message.error('请填写分类名称!')
      const {data:res} = await addCategory(this.addCategoryForm)
      if(res.code !== 200)
        return this.$message.error('提交失败~')
      
      this.$message.success('提交成功!')
      this.addDialogVisible = false
      this.getCategoryList()
    },
    //*提交修改的信息
    async submitUpdateCategory(){
      const {data:res} = await updateCategory(this.updateCategoryForm)
      if(res.code !== 200)
        return this.$message.error('更新失败~')
      this.$message.success('更新成功!')
      this.updateDialogVisible = false
      this.getCategoryList()
    },
    //*查看下级
    async toNextLevel(id){
      const {data:res} = await getCategory({parentId: id})
      if(res.code !== 200)
        return this.$message.error('查询失败 Σ(っ °Д °;)っ')
      this.$message.success('成功啦 ✧(≖ ◡ ≖✿)')
      if(this.Data.currentLevel == 1){
        this.Data.preParentId = 0
      }else{
        this.Data.preParentId = this.Data.parentId
      }
      this.Data.parentId = id
      this.Data.currentLevel++
      this.Data.categoryList = res.data
    },
    //*查看上级
    async toBeforeLevel(){
      const {data:res} = await getCategory({ parentId: this.Data.parentId })
      if(res.code !== 200)
        return this.$message.error('查询失败 Σ(っ °Д °;)っ')
      this.$message.success('成功啦(๑•̀ㅂ•́)و✧')
      if(this.Data.currentLevel == 2){
        this.Data.parentId = 0
        this.Data.preParentId = 0
        this.Data.categoryList = res.data
      }else{
        this.Data.parentId = this.Data.preParentId
        this.Data.preParentId = 0
        this.Data.categoryList = res.data
      }
      this.Data.currentLevel--
    }
}
}
</script>

<style scoped>
a {
  text-decoration: none;
  font-size: 18px;
  margin: 0 15px;
  font-weight: 600;
}
.edit {
  color: #80b168;
}
.edit:hover {
  color: #306d11;
}
.delete {
  color: #80b168;
}
.delete:hover {
  color: #e93137;
}
</style>