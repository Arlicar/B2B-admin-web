<template>
  <div>
    <!-- <h1>Api管理</h1> -->

    <!-- 列表区 -->
    <div class="card">
      <el-card>
        <el-row>
          <el-button type="success" round @click="showDialog"
            >点击添加</el-button
          >
        </el-row>
        <el-table :data="apiList" border stripe>
          <el-table-column type="index" label="#"></el-table-column>
          <el-table-column label="ID" prop="apiId"></el-table-column>
          <el-table-column label="名称" prop="apiName"></el-table-column>
          <el-table-column label="路径" prop="apiPath"></el-table-column>
          <el-table-column label="分组" prop="apiGroup"></el-table-column>
          <el-table-column label="操作" >
            <template scope="scope">
              <a href="javascript:;" class="green" @click="showUpdateDialog(scope.row.apiId,scope.row.apiName,scope.row.apiPath,scope.row.apiGroup)">编辑</a>
              <el-popconfirm
                confirmButtonText="好的"
                cancelButtonText="不用了"
                icon="el-icon-warning"
                iconColor="red"
                title="确定删除吗？"
                @confirm="deleteApi(scope.row.apiId)"
              >
                <a href="javascript:;" class="red" slot="reference">删除</a>
              </el-popconfirm>
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



    <!-- 添加新信息 -->
    <el-dialog
      title="添加api"
      :visible.sync="addDialogVisible"
      width="50%"
      @close="closeDialog"
    >
      <!-- 内容主体区 -->
      <el-form
        :model="addForm"
        :rules="addFormRules"
        ref="addFormRef"
        label-width="70px"
      >
        <el-form-item label="名称" prop="apiName">
          <el-input v-model="addForm.apiName"></el-input>
        </el-form-item>
        <el-form-item label="路径" prop="apiPath">
          <el-input v-model="addForm.apiPath"></el-input>
        </el-form-item>
        <el-form-item label="分组" prop="apiGroup">
          <el-input v-model="addForm.apiGroup"></el-input>
        </el-form-item>
      </el-form>
      <!-- 底部按钮区 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="success" @click="addApi">确 定</el-button>
      </span>
    </el-dialog>


    <!-- 更新api信息 -->
      <el-dialog title="更新用户api" :visible.sync="updateDialogVisible" width="50%" @close="closeUpdate">
        <!-- 内容主体区 -->
      <el-form :model="updateForm" :rules="updateFormRules" ref="updateFormRef" label-width="70px">
        <el-form-item label="Id" prop="apiId">
            <el-input v-model="updateForm.apiId" disabled></el-input>
        </el-form-item>
        <el-form-item label="名称" prop="apiName">
            <el-input v-model="updateForm.apiName"></el-input>
        </el-form-item>
        <el-form-item label="路径" prop="apiPath">
            <el-input v-model="updateForm.apiPath"></el-input>
        </el-form-item>
        <el-form-item label="分组" prop="apiGroup">
            <el-input v-model="updateForm.apiGroup"></el-input>
        </el-form-item>
      </el-form>
      <!-- 底部按钮区 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="updateDialogVisible = false">取 消</el-button>
        <el-button type="success" @click="updateApi">确 定</el-button>
      </span>
      </el-dialog>

  </div>
</template>

<script>
import { getApi,addApi,deleteApi,updateApi } from "@/api/systemManagement";
export default {
  data() {
    return {
      addDialogVisible: false,
      updateDialogVisible: false,
      query: {
        rows: 10,
        page: 1,
        apiId: null,
      },
      apiList: [],
      total: 0,
      //*   添加的表单数据
      addForm:{
          apiName:'',
          apiPath:'',
          apiGroup:'',
      },
    //*   添加表单的验证规则对象
      addFormRules:{
          apiName:[
              { required: true, message: '请输入api名称', trigger: 'blur' }
          ],
          apiPath:[
              { required: true, message: '请输入路径', trigger: 'blur' }
          ],
          apiGroup:[
              { required: true, message: '请输入分组', trigger: 'blur' }
          ]
      },
      updateForm:{
          apiId:'',
          apiName:'',
          apiPath:'',
          apiGroup:'',
      },
      updateFormRules:{
          apiName:[
              { required: true, message: '请输入api名称', trigger: 'blur' }
          ],
          apiPath:[
              { required: true, message: '请输入路径', trigger: 'blur' }
          ],
          apiGroup:[
              { required: true, message: '请输入分组', trigger: 'blur' }
          ]
      }
    };
  },
  created() {
      this.getApiList()
  },
  methods: {
    async getApiList() {
      const { data: res } = await getApi({ params:this.query });
      if (res.code !== 200) {
        return this.$message.error("获取Api失败~");
      }
      this.$message.success("获取Api成功！");
      this.apiList = res.data.data;
      this.total = res.data.count;
    },
    handleSizeChange(newSize) {
      this.query.rows = newSize;
      this.getUserApiList();
    },
    handleCurrentChange(newPage) {
      this.query.page = newPage;
      this.getUserApiList();
    },
    showDialog() {
      this.addDialogVisible = true;
    },
    showUpdateDialog(id,name,path,group){
      this.updateDialogVisible = true;
      this.updateForm.apiId = id
      this.updateForm.apiName = name
      this.updateForm.apiPath = path
      this.updateForm.apiGroup = group
    },
    closeDialog() {
      this.$refs.addFormRef.resetFields();
    },
    closeUpdate(){
        this.$refs.updateFormRef.resetFields()
    },
    //*点击按钮添加api
    addApi() {
      this.$refs.addFormRef.validate(async (valid) => {
        if (!valid) return;
        //*可以发起添加用户的网络请求
        const { data: res } = await addApi(this.addForm);
        if (res.code !== 200) {
          return this.$message.error("添加失败~");
        }
        this.$message.success("添加成功!");
        this.addDialogVisible = false;
        this.getApiList();
      });
    },
    //*删除api
    async deleteApi(id){
        const {data:res} = await deleteApi({apiId:id})
        if(res.code !==200)
            return this.$message.error('删除失败了~')
        this.$message.success('删除成功啦！')
        this.getApiList()
    },
    //*更新api
    async updateApi(){
      const {data:res} = await updateApi(this.updateForm)
      if(res.code !== 200)
        return this.$message.error('修改更新失败~')
      this.$message.success('修改成功！')
      this.updateDialogVisible = false
      this.getApiList()
    }
  },
};
</script>

<style scoped>
.card{
  margin-top: 5px;
  margin-left: 7px;
  margin-right: 15px;
}
.footer{
  margin: 5px 15px 15px 7px;
}
a{
  text-decoration: none;
  margin: 0 20px;
  font-size: 15px;
  font-weight:600;
}

.green{
  color: #80b168;
}
.green:hover{
  color: #395a29;
}
.red{
  color: #df8787;
}
.red:hover{
  color: #d83636;
}
</style>