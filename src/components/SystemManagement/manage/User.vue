<template>
  <div>
    <div class="card">
      <el-card>
        <el-row>
          <el-col :span="4"></el-col>
          <el-col :span="2">
            <el-button
              @click="isShowAdd = true"
              size="medium"
              type="success"
              round
              plain
              >新建用户</el-button
            >
          </el-col>
        </el-row>
        <!-- <el-divider></el-divider> -->
        <el-table :data="adminList" style="width: 100%" border stripe>
          <el-table-column prop="adminId" label="用户ID" width="width">
          </el-table-column>
          <el-table-column prop="userName" label="用户名" width="width">
          </el-table-column>
          <el-table-column label="角色" width="width">
            <template #default="scope">
              <el-select
                v-model="scope.row.roleId"
                @change="updateRole($event, scope.$index, scope.row)"
                placeholder=""
                size="small"
              >
                <el-option
                  v-for="item in roleOptions"
                  :key="item.roleId"
                  :label="item.roleName"
                  :value="item.roleId"
                >
                </el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="width">
            <template #default="scope">
              <el-popconfirm
                confirmButtonText="确定"
                cancelButtonText="取消"
                icon="el-icon-info"
                iconColor="red"
                title="确定删除该员工吗？"
                @confirm="deleteEmployee(scope.$index, scope.row.adminId)"
              >
                <template #reference>
                  <el-button type="danger" size="small" plain>删除</el-button>
                </template>
              </el-popconfirm></template
            >
          </el-table-column>
        </el-table>
      </el-card>
    </div>
    <el-dialog title="新建用户" :visible.sync="isShowAdd" @close="closeDialog">
      <el-form :model="userAddForm" label-width="80px">
        <el-form-item label="用户名">
          <el-input v-model="userAddForm.userName"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="userAddForm.password"></el-input>
        </el-form-item>
        <el-form-item label="角色">
          <el-select v-model="userAddForm.roleId" placeholder="请选择员工角色">
            <el-option
              v-for="item in roleOptions"
              :key="item.roleId"
              :label="item.roleName"
              :value="item.roleId"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button @click="addEmployee" type="success" round plain
            >立即添加</el-button
          >
        </el-form-item>
      </el-form>
    </el-dialog>

    <div class="footer">
      <el-card>
        <el-pagination
          :current-page.sync="query.page"
          :page-size="query.rows"
          layout="total, sizes, prev, pager, next, jumper"
          :total="count"
          @current-change="handleCurrentChange"
          background=""
        >
        </el-pagination>
      </el-card>
    </div>
  </div>
</template>

<script>
// import { store } from "@/store/index";
import {
  getAdmin,
  updateAdmin,
  deleteAdmin,
  addAdmin,
} from "@/api/systemManagement";
import { getRole } from "@/api/systemManagement";

export default {
  data() {
    return {
      adminList: [],
      count: 0,
      roleOptions: [],
      roleUpdateForm: {
        adminId: null,
        roleId: null,
      },
      userAddForm: {
        userName: "",
        password: "",
        roleId: null,
      },
      isShowAdd: false,
      query: {
        page: 1,
        rows: 15,
      },
    };
  },
  methods: {
    getadminList() {
      getAdmin(this.query)
        .then((response) => {
          if (response.data.code == 200) {
            this.count = response.data.data.count;
            this.adminList = response.data.data.data;
          } else {
            console.log(response.data.message);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    updateRole(event, index, row) {
      this.roleUpdateForm.adminId = row.adminId;
      this.roleUpdateForm.roleId = row.roleId;
      updateAdmin(this.roleUpdateForm)
        .then((response) => {
          if (response.data.code == 200) {
            this.$message.success({
              message: response.data.message,
            });
          } else {
            ElMessage.error({
              message: response.data.message,
              type: "error",
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    deleteEmployee(index, id) {
      deleteAdmin({ adminId: id })
        .then((response) => {
          if (response.data.code == 200) {
            this.adminList.splice(index, 1);
            this.$message.success({
              message: response.data.message,
            });
          } else {
            ElMessage.error({
              message: response.data.message,
              type: "error",
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    handleCurrentChange(val) {
      this.query.page = val;
      this.getadminList();
    },
    closeDialog() {
      this.userAddForm.userName = "";
      this.userAddForm.password = "";
      this.userAddForm.roleId = null;
    },
    addEmployee() {
      if (this.userAddForm.userName == "")
        return this.$message.error("请输入用户名~");
      if (this.userAddForm.phone == "")
        return this.$message.error("请输入手机~");
      if (this.userAddForm.password == "")
        return this.$message.error("请输入密码~");
      addAdmin(this.userAddForm)
        .then((response) => {
          if (response.data.code == 200) {
            this.isShowAdd = false;
            this.$message.success({
              message: response.data.message,
            });
            this.getadminList();
            // this.adminList.push({
            //   adminId: this.userAddForm.adminId,
            //   userName: this.userAddForm.userName,
            //   roleId: this.userAddForm.roleId,
            // });
            this.userAddForm.userName = "";
            this.userAddForm.phone = "";
            this.userAddForm.password = "";
            this.userAddForm.roleId = null;
          } else {
            ElMessage.error({
              message: response.data.message,
              type: "error",
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  created() {
    getRole()
      .then((response) => {
        if (response.data.code == 200) {
          this.roleOptions = response.data.data;
        } else {
          ElMessage.error({
            message: response.data.message,
            type: "error",
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
    this.getadminList();
  },
};
</script>

<style scoped>
.card {
  margin-top: 5px;
  margin-left: 7px;
  margin-right: 15px;
}
.footer {
  margin: 5px 15px 15px 7px;
}
</style>