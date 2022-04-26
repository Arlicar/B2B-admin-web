<template>
  <div>
      <!-- <h1>用户路由</h1> -->

      <!-- 顶部面包屑导航区域 -->
    <div class="top">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/Welcome' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
        <el-breadcrumb-item>用户路由</el-breadcrumb-item>
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
            >新增路由</el-button
          >
        </el-row>
        <el-table :data="Data.routerList" border stripe>
          <el-table-column type="index" label="#"></el-table-column>
          <el-table-column label="ID" prop="routeId" width="70px"></el-table-column>
          <el-table-column label="名称" prop="routeName" width="90px"></el-table-column>
          <el-table-column label="图标名称" prop="iconName" width="90px"></el-table-column>
          <el-table-column label="展示名称" prop="displayedName" width="90px"></el-table-column>
          <el-table-column label="排序" prop="sortMark" width="70px"></el-table-column>
          <el-table-column label="路由路径" prop="routePath"></el-table-column>
          <el-table-column label="文件位置" prop="filePath"></el-table-column>
          <el-table-column label="操作">
            <template scope="scope">
              <el-button type="success" :disabled="Data.currentLevel >= 3" round @click="toNextLevel(scope.row.routeId)">查看下级</el-button>
              <a href="javascript:;" class="edit" @click="showUpdateDialog(scope.row.routeId,scope.row.parentId,scope.row.routeName,
              scope.row.routePath,scope.row.iconName,scope.row.displayedName,scope.row.sortMark)"
                >编辑</a
              >
              <el-popconfirm
                confirmButtonText="好的"
                cancelButtonText="不用了"
                icon="el-icon-warning"
                iconColor="red"
                title="确定删除吗？"
                @confirm="deleteRouter(scope.row.routeId)"
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
    <el-dialog title="新增路由" :visible.sync="addDialogVisible" width="50%" @close="closeAddDialog">
      <el-form ref="addRouterFormRef" :model="addRouterForm" label-width="70px">
        <el-form-item label="父路由ID" prop="parentId" >
          <el-input v-model="addRouterForm.parentId" disabled></el-input>
        </el-form-item>
        <el-form-item label="路由名称" prop="routeName">
          <el-input v-model="addRouterForm.routeName"></el-input>
        </el-form-item>
        <el-form-item label="路由路径" prop="routePath">
          <el-input v-model="addRouterForm.routePath"></el-input>
        </el-form-item>
        <el-form-item label="图标名称" prop="iconName">
          <el-input v-model="addRouterForm.iconName"></el-input>
        </el-form-item>
        <el-form-item label="展示名称" prop="displayedName">
          <el-input v-model="addRouterForm.displayedName"></el-input>
        </el-form-item>
        <el-form-item label="排序" prop="sortMark">
          <el-input v-model.number="addRouterForm.sortMark" placeholder="请输入数字"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false" icon="el-icon-error">取 消</el-button>
        <el-button type="success" @click="submitAddRoute"
          icon="el-icon-s-promotion">提 交</el-button
        >
      </span>
    </el-dialog>


    <!-- 编辑按钮对话框 -->
    <el-dialog title="编辑" :visible.sync="updateDialogVisible" width="50%">
      
      <el-form ref="updateRouterFormRef" :model="updateRouterForm" label-width="70px">
        <el-form-item label="ID" prop="routeId">
          <el-input v-model.number="updateRouterForm.routeId" disabled></el-input>
        </el-form-item>
        <el-form-item label="父类ID" prop="parentId">
          <el-input v-model.number="updateRouterForm.parentId" disabled></el-input>
        </el-form-item>
        <el-form-item label="路由名称" prop="routeName">
          <el-input v-model="updateRouterForm.routeName"></el-input>
        </el-form-item>
        <el-form-item label="路由路径" prop="routePath">
          <el-input v-model="updateRouterForm.routePath"></el-input>
        </el-form-item>
        <el-form-item label="图标名称" prop="iconName">
          <el-input v-model="updateRouterForm.iconName"></el-input>
        </el-form-item>
        <el-form-item label="展示名称" prop="displayedName">
          <el-input v-model="updateRouterForm.displayedName"></el-input>
        </el-form-item>
        <el-form-item label="排序" prop="sortMark">
          <el-input v-model="updateRouterForm.sortMark"></el-input>
        </el-form-item>
      </el-form>
      
      
      <span slot="footer" class="dialog-footer">
        <el-button @click="updateDialogVisible = false" icon="el-icon-error">取 消</el-button>
        <el-button type="success" @click="submitUpdateRoute"
          icon="el-icon-edit">修 改</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getUserRouter,addUserRouter,deleteUserRouter,updateUserRouter } from "@/api/users";
export default {
  data() {
    return {
      addDialogVisible: false,
      updateDialogVisible: false,
      Data: {
        preParentId: 0,
        parentId: 0,
        currentLevel: 1,
        routerList:[],
      },
      query: {},
      addRouterForm:{
        parentId:null,
        routeName:'',
        routePath:'',
        iconName:'',
        displayedName:'',
        sortMark:null
      },
      updateRouterForm:{
        routeId:null,
        parentId:null,
        routeName:'',
        routePath:'',
        iconName:'',
        displayedName:'',
        sortMark:null
      }
    };
  },
  created(){
    this.getRouterList()
  },
  methods:{
    //*获取用户路由列表
    async getRouterList(){
      const {data:res} = await getUserRouter({parentId:this.Data.parentId})
      if(res.code!==200)
        return this.$message.error('获取用户路由失败~')
      this.$message.success('获取用户路由成功！')
      this.Data.routerList = res.data
    },
    //*前往下级
    async toNextLevel(id){
      const {data:res} = await getUserRouter({parentId: id})
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
      this.Data.routerList = res.data
    },
    //*返回上级
    async toBeforeLevel(){
      const {data:res} = await getUserRouter({ parentId: this.Data.parentId })
      if(res.code !== 200)
        return this.$message.error('查询失败 Σ(っ °Д °;)っ')
      this.$message.success('成功啦(๑•̀ㅂ•́)و✧')
      if(this.Data.currentLevel == 2){
        this.Data.parentId = 0
        this.Data.preParentId = 0
        this.Data.routerList = res.data
      }else{
        this.Data.parentId = this.Data.preParentId
        this.Data.preParentId = 0
        this.Data.routerList = res.data
      }
      this.Data.currentLevel--
    },
    //*展示增添信息框
    showAddDialog(){
      this.addRouterForm.parentId = this.Data.parentId,
      this.addDialogVisible = true
    },
    //*关闭增添信息框
    closeAddDialog(){
       this.$refs.addRouterFormRef.resetFields()
    },
    //*提交新增信息
    async submitAddRoute(){
      if(this.addRouterForm.routeName == '')
        return this.$message.error('请输入路由名称~')
      if(this.addRouterForm.routePath == '')
        return this.$message.error('请输入路由路径~')
      if(this.addRouterForm.iconName == '')
        return this.$message.error('请输入图标名称~')
      if(this.addRouterForm.displayedName == '')
        return this.$message.error('请输入展示名称~')
      if(this.addRouterForm.sortMark == null)
        return this.$message.error('请输入排序~')
      if(typeof(this.addRouterForm.sortMark) != 'number')
        return this.$message.error('排序里要输入数字')
      const {data:res} = await addUserRouter(this.addRouterForm)
      if(res.code!==200)
        return this.$message.error('提交失败~')
      this.$message.success('提交成功！')
      this.getRouterList()
      this.addDialogVisible = false
    },
    //!删除用户路由
    async deleteRouter(id) {
      const { data: res } = await deleteUserRouter({ routeId: id });
      if (res.code !== 200) {
        return this.$message.error("删除失败~");
      }
      this.$message.success("删除成功!");
      this.getRouterList();
    },
    //*展示编辑对话框
    showUpdateDialog(routeId,parentId,routeName,routePath,iconName,displayedName,sortMark) {
      this.updateRouterForm.routeId = routeId
      this.updateRouterForm.parentId = parentId
      this.updateRouterForm.routeName = routeName
      this.updateRouterForm.routePath = routePath
      this.updateRouterForm.iconName = iconName
      this.updateRouterForm.displayedName = displayedName
      this.updateRouterForm.sortMark = sortMark
      this.updateDialogVisible = true;
    },
    //*提交编辑对话框
    async submitUpdateRoute(){
      const {data:res} = await updateUserRouter(this.updateRouterForm)
      if(res.code !== 200)
        return this.$message.error('更新失败~')
      this.$message.success('更新成功!')
      this.updateDialogVisible = false
      this.getRouterList()
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